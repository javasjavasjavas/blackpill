import type { OpenSeaCollectionDetails } from '../hooks/useOpenSeaCollection';
import type { TechnicalSpec } from '../types';

const formatChain = (value: string | null | undefined): string | null => {
  if (!value) return null;
  return value
    .split(/[-_\s]+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');
};

const formatDate = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export const resolveOpenSeaSpec = (
  details: OpenSeaCollectionDetails | null | undefined,
  fallback: TechnicalSpec
) => ({
  chain: formatChain(details?.chain) || fallback.chain,
  contract: details?.contractAddress || fallback.contract,
  tokenStandard: details?.tokenStandard || fallback.tokenStandard,
  storage: details?.storageMethod || fallback.storage,
  format: details?.artworkFormat || fallback.format,
  rendering: details?.renderingMethod || fallback.rendering,
  dynamicBehavior: fallback.dynamicBehavior,
  releaseDate: formatDate(details?.releaseDate) || fallback.releaseDate
});
