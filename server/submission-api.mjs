import http from 'node:http';

const port = Number(process.env.PORT || 8787);
const resendApiKey = process.env.RESEND_API_KEY;
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

  if (request.method === 'OPTIONS' && url.pathname === '/api/submissions') {
    response.writeHead(204, {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin'
    });
    return response.end();
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
