import http from 'node:http';

const port = Number(process.env.PORT || 8787);
const resendApiKey = process.env.RESEND_API_KEY;
const openSeaApiKey = process.env.OPENSEA_API_KEY;
const recipient = process.env.SUBMISSION_TO_EMAIL || 'javdamico@gmail.com';
const sender = process.env.SUBMISSION_FROM_EMAIL || 'Black Pill <onboarding@resend.dev>';

const allowedOrigins = new Set([
  'https://blackpill-labs.com',
  'https://www.blackpill-labs.com',
  'https://blackpill-labs.onrender.com',
  'http://127.0.0.1:5175',
  'http://localhost:5175'
]);

const rateLimits = new Map();
const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT = 5;
const openSeaCache = new Map();
const OPENSEA_CACHE_MS = 10 * 60 * 1000;

const classifyStorage = (metadataUrl) => {
  const value = String(metadataUrl || '').toLowerCase();
  if (!value) return null;
  if (value.startsWith('data:')) return 'Fully On-Chain';
  if (value.startsWith('ipfs:') || value.includes('/ipfs/')) return 'IPFS';
  if (value.startsWith('ar:') || value.includes('arweave.net')) return 'Arweave';
  if (value.startsWith('http://') || value.startsWith('https://')) return 'Off-chain';
  return null;
};

const classifyArtwork = (nft) => {
  const mediaUrl = nft.display_animation_url || nft.animation_url ||
    nft.display_image_url || nft.image_url || '';
  let extension = '';

  try {
    extension = new URL(mediaUrl).pathname.split('.').pop()?.toLowerCase() || '';
  } catch {
    extension = String(mediaUrl).split('?')[0].split('.').pop()?.toLowerCase() || '';
  }

  const formats = {
    gif: 'GIF',
    png: 'PNG',
    jpg: 'JPG',
    jpeg: 'JPG',
    svg: 'SVG',
    mp4: 'MP4',
    webm: 'WEBM',
    html: 'HTML'
  };
  const artworkFormat = formats[extension] || null;
  const renderingMethod = extension === 'gif' ? 'Animated image' :
    ['mp4', 'webm'].includes(extension) ? 'Video' :
    extension === 'svg' ? 'Vector image' :
    extension === 'html' ? 'Interactive HTML' :
    artworkFormat ? 'Static image' : null;

  return { artworkFormat, renderingMethod };
};

const normalizeStandard = (value) => {
  const standard = String(value || '').toUpperCase();
  if (!standard) return null;
  if (standard === 'ERC721') return 'ERC-721';
  if (standard === 'ERC1155') return 'ERC-1155';
  return standard;
};

const json = (response, status, payload, origin = '') => {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...(origin ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {})
  });
  response.end(JSON.stringify(payload));
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const readJsonBody = (request) =>
  new Promise((resolve, reject) => {
    let body = '';

    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 32_000) reject(new Error('PAYLOAD_TOO_LARGE'));
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        reject(new Error('INVALID_JSON'));
      }
    });
    request.on('error', reject);
  });

const isRateLimited = (request) => {
  const now = Date.now();
  const forwarded = request.headers['x-forwarded-for'];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim() ||
    request.socket.remoteAddress || 'unknown';
  const previous = rateLimits.get(ip) || [];
  const recent = previous.filter((timestamp) => now - timestamp < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    rateLimits.set(ip, recent);
    return true;
  }

  recent.push(now);
  rateLimits.set(ip, recent);
  return false;
};

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`);
  const requestOrigin = request.headers.origin || '';
  const origin = allowedOrigins.has(requestOrigin) ? requestOrigin : '';

  if (request.method === 'GET' && url.pathname === '/health') {
    return json(response, 200, { status: 'ok' });
  }

  if (requestOrigin && !origin) {
    return json(response, 403, { error: 'Origin not allowed.' });
  }

  if (request.method === 'OPTIONS' &&
      (url.pathname === '/api/submissions' || url.pathname.startsWith('/api/opensea/collection/'))) {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin'
    });
    return response.end();
  }

  const openSeaMatch = url.pathname.match(/^\/api\/opensea\/collection\/([a-z0-9-]+)$/);
  if (request.method === 'GET' && openSeaMatch) {
    const slug = openSeaMatch[1];
    const limit = Math.min(10, Math.max(1, Number(url.searchParams.get('limit')) || 10));

    if (!openSeaApiKey) {
      console.error('OPENSEA_API_KEY is not configured.');
      return json(response, 503, { error: 'Collection preview is not configured.' }, origin);
    }

    const cacheKey = `${slug}:${limit}`;
    const cached = openSeaCache.get(cacheKey);
    if (cached && Date.now() - cached.createdAt < OPENSEA_CACHE_MS) {
      return json(response, 200, cached.payload, origin);
    }

    try {
      const headers = { 'X-API-KEY': openSeaApiKey };
      const [openSeaResponse, collectionResponse] = await Promise.all([
        fetch(
          `https://api.opensea.io/api/v2/collection/${encodeURIComponent(slug)}/nfts?limit=${limit}`,
          { headers, signal: AbortSignal.timeout(8000) }
        ),
        fetch(
          `https://api.opensea.io/api/v2/collections/${encodeURIComponent(slug)}`,
          { headers, signal: AbortSignal.timeout(8000) }
        )
      ]);

      if (!openSeaResponse.ok) {
        const details = await openSeaResponse.text();
        console.error(`OpenSea rejected the collection request (${openSeaResponse.status}): ${details}`);
        return json(response, 502, { error: 'Collection preview is temporarily unavailable.' }, origin);
      }

      const data = await openSeaResponse.json();
      const collectionData = collectionResponse.ok ? await collectionResponse.json() : {};
      const nfts = Array.isArray(data.nfts) ? data.nfts.slice(0, limit) : [];
      const firstNft = nfts[0] || {};
      const primaryContract = Array.isArray(collectionData.contracts) ? collectionData.contracts[0] || {} : {};
      const chain = primaryContract.chain || firstNft.chain || null;
      const contractAddress = primaryContract.address || firstNft.contract || null;
      let contractData = {};

      if (chain && contractAddress) {
        try {
          const contractResponse = await fetch(
            `https://api.opensea.io/api/v2/chain/${encodeURIComponent(chain)}/contract/${encodeURIComponent(contractAddress)}`,
            { headers, signal: AbortSignal.timeout(8000) }
          );
          if (contractResponse.ok) contractData = await contractResponse.json();
        } catch (error) {
          console.error('OpenSea contract metadata request failed:', error instanceof Error ? error.message : error);
        }
      }

      const { artworkFormat, renderingMethod } = classifyArtwork(firstNft);
      const totalSupplyValue = collectionData.total_supply ?? contractData.total_supply;
      const totalSupply = Number.isFinite(Number(totalSupplyValue)) ? Number(totalSupplyValue) : null;
      const payload = {
        collection: {
          slug,
          totalSupply,
          chain,
          contractAddress,
          tokenStandard: normalizeStandard(contractData.contract_standard || primaryContract.contract_standard),
          storageMethod: classifyStorage(firstNft.metadata_url),
          artworkFormat,
          renderingMethod,
          releaseDate: contractData.deployed_date || collectionData.created_date || null,
          openseaUrl: collectionData.opensea_url || null
        },
        tokens: nfts.map((nft) => ({
          id: String(nft.identifier || ''),
          name: String(nft.name || `Blotters #${nft.identifier || ''}`),
          image: nft.display_image_url || nft.image_url || null,
          animation: nft.display_animation_url || null,
          openseaUrl: nft.opensea_url || null
        }))
      };

      openSeaCache.set(cacheKey, { createdAt: Date.now(), payload });
      return json(response, 200, payload, origin);
    } catch (error) {
      console.error('OpenSea collection request failed:', error instanceof Error ? error.message : error);
      return json(response, 502, { error: 'Collection preview is temporarily unavailable.' }, origin);
    }
  }

  if (request.method !== 'POST' || url.pathname !== '/api/submissions') {
    return json(response, 404, { error: 'Not found.' }, origin);
  }

  if (isRateLimited(request)) {
    return json(response, 429, { error: 'Too many submissions. Please try again later.' }, origin);
  }

  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured.');
    return json(response, 503, { error: 'Email service is not configured.' }, origin);
  }

  try {
    const payload = await readJsonBody(request);
    const artist = String(payload.artist || '').trim();
    const email = String(payload.email || '').trim();
    const link = String(payload.link || '').trim();
    const idea = String(payload.idea || '').trim();
    const website = String(payload.website || '').trim();

    // A filled honeypot is treated as a successful submission without sending mail.
    if (website) return json(response, 202, { ok: true }, origin);

    let submittedUrl;
    try {
      submittedUrl = new URL(link);
    } catch {
      submittedUrl = null;
    }

    if (!artist || artist.length > 120 ||
        !email || email.length > 254 || !/^\S+@\S+\.\S+$/.test(email) ||
        !link || link.length > 500 || !submittedUrl || !['http:', 'https:'].includes(submittedUrl.protocol) ||
        !idea || idea.length > 5000) {
      return json(response, 400, { error: 'Please complete every field with valid information.' }, origin);
    }

    const sentAt = new Date().toISOString();
    const subjectArtist = artist.replace(/[\r\n]+/g, ' ');
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Black Pill submission — ${subjectArtist}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#111;line-height:1.55;max-width:680px">
            <h1 style="font-size:22px;margin:0 0 24px">New project submission</h1>
            <p><strong>Artist or studio</strong><br>${escapeHtml(artist)}</p>
            <p><strong>Email</strong><br><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
            <p><strong>Collection, repository or prototype</strong><br><a href="${escapeHtml(link)}">${escapeHtml(link)}</a></p>
            <p><strong>What does the work do that a static file cannot?</strong><br>${escapeHtml(idea).replaceAll('\n', '<br>')}</p>
            <hr style="border:0;border-top:1px solid #ddd;margin:28px 0 16px">
            <p style="color:#666;font-size:12px">Submitted from blackpill-labs.com on ${escapeHtml(sentAt)}</p>
          </div>
        `,
        text: [
          'New project submission',
          '',
          `Artist or studio: ${artist}`,
          `Email: ${email}`,
          `Collection, repository or prototype: ${link}`,
          '',
          'What does the work do that a static file cannot?',
          idea,
          '',
          `Submitted: ${sentAt}`
        ].join('\n')
      })
    });

    if (!resendResponse.ok) {
      const details = await resendResponse.text();
      console.error(`Resend rejected the submission (${resendResponse.status}): ${details}`);
      return json(response, 502, { error: 'The email could not be sent. Please try again.' }, origin);
    }

    return json(response, 200, { ok: true }, origin);
  } catch (error) {
    const status = error instanceof Error && error.message === 'PAYLOAD_TOO_LARGE' ? 413 : 400;
    console.error('Submission request failed:', error instanceof Error ? error.message : error);
    return json(response, status, { error: 'The submission could not be processed.' }, origin);
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Black Pill submission API listening on port ${port}.`);
});
