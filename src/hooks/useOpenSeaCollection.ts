import { useEffect, useState } from 'react';

export interface OpenSeaToken {
  id: string;
  name: string;
  image: string | null;
  animation: string | null;
  openseaUrl: string | null;
}

export interface OpenSeaCollectionDetails {
  slug: string;
  totalSupply: number | null;
  chain: string | null;
  contractAddress: string | null;
  tokenStandard: string | null;
  storageMethod: string | null;
  artworkFormat: string | null;
  renderingMethod: string | null;
  releaseDate: string | null;
  openseaUrl: string | null;
}

export interface OpenSeaCollectionPayload {
  collection: OpenSeaCollectionDetails | null;
  tokens: OpenSeaToken[];
}

interface OpenSeaCollectionState {
  data: OpenSeaCollectionPayload | null;
  loading: boolean;
  failed: boolean;
}

const COLLECTION_API_URL =
  import.meta.env.VITE_COLLECTION_API_URL ||
  'https://blackpill-labs-mailer.onrender.com/api/opensea/collection';

const requests = new Map<string, Promise<OpenSeaCollectionPayload>>();

const loadCollection = (slug: string): Promise<OpenSeaCollectionPayload> => {
  const cached = requests.get(slug);
  if (cached) return cached;

  const request = fetch(`${COLLECTION_API_URL}/${encodeURIComponent(slug)}?limit=10`)
    .then(async (response) => {
      if (!response.ok) throw new Error('COLLECTION_PREVIEW_FAILED');
      const payload = await response.json() as Partial<OpenSeaCollectionPayload>;
      return {
        collection: payload.collection || null,
        tokens: Array.isArray(payload.tokens) ? payload.tokens.slice(0, 10) : []
      };
    })
    .catch((error) => {
      requests.delete(slug);
      throw error;
    });

  requests.set(slug, request);
  return request;
};

export const useOpenSeaCollection = (slug?: string): OpenSeaCollectionState => {
  const [state, setState] = useState<OpenSeaCollectionState>({
    data: null,
    loading: Boolean(slug),
    failed: false
  });

  useEffect(() => {
    if (!slug) {
      setState({ data: null, loading: false, failed: false });
      return;
    }

    let active = true;
    setState({ data: null, loading: true, failed: false });

    loadCollection(slug)
      .then((data) => {
        if (active) setState({ data, loading: false, failed: false });
      })
      .catch(() => {
        if (active) setState({ data: null, loading: false, failed: true });
      });

    return () => {
      active = false;
    };
  }, [slug]);

  return state;
};
