import type { Collection } from '../types';

export type SortKey = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'supply' | 'az';

export const SORT_LABELS: Record<SortKey, string> = {
  newest: 'Newest first',
  oldest: 'Oldest first',
  'price-asc': 'Price — low to high',
  'price-desc': 'Price — high to low',
  supply: 'Smallest edition',
  az: 'A — Z'
};

export interface FilterState {
  query: string;
  status: string[];
  tech: string[];
  chain: string[];
  storage: string[];
  format: string[];
  years: number[];
  /** ETH-equivalent ceiling. PRICE_ANY means no ceiling. */
  maxPrice: number;
  sort: SortKey;
}

export const PRICE_ANY = 0.5;

export const emptyFilters: FilterState = {
  query: '',
  status: [],
  tech: [],
  chain: [],
  storage: [],
  format: [],
  years: [],
  maxPrice: PRICE_ANY,
  sort: 'newest'
};

/** Rough normalisation so a single price control can span chains. */
export const toEth = (c: Collection): number => {
  if (c.currency === 'ETH') return c.price;
  if (c.currency === 'XTZ') return c.price * 0.0004;
  return c.price * 0.0002;
};

export const activeFilterCount = (f: FilterState): number =>
f.status.length +
f.tech.length +
f.chain.length +
f.storage.length +
f.format.length +
f.years.length + (
f.maxPrice < PRICE_ANY ? 1 : 0) + (
f.query ? 1 : 0);

export const filterCollections = (list: Collection[], f: FilterState): Collection[] => {
  const q = f.query.trim().toLowerCase();
  return list.filter((c) => {
    if (
    q &&
    !c.title.toLowerCase().includes(q) &&
    !c.concept.toLowerCase().includes(q) &&
    !c.artistSlug.replace(/-/g, ' ').includes(q) &&
    !c.tech.some((t) => t.toLowerCase().includes(q)))

    return false;
    if (f.status.length && !f.status.includes(c.status)) return false;
    if (f.tech.length && !f.tech.some((t) => c.tech.includes(t as never))) return false;
    if (f.chain.length && !f.chain.includes(c.spec.chain)) return false;
    if (f.storage.length && !f.storage.includes(c.spec.storage)) return false;
    if (f.format.length && !f.format.includes(c.spec.format)) return false;
    if (f.years.length && !f.years.includes(c.year)) return false;
    if (f.maxPrice < PRICE_ANY && toEth(c) > f.maxPrice) return false;
    return true;
  });
};

export const sortCollections = (list: Collection[], sort: SortKey): Collection[] => {
  const out = [...list];
  switch (sort) {
    case 'newest':
      return out.sort((a, b) => new Date(b.dropDate).getTime() - new Date(a.dropDate).getTime());
    case 'oldest':
      return out.sort((a, b) => new Date(a.dropDate).getTime() - new Date(b.dropDate).getTime());
    case 'price-asc':
      return out.sort((a, b) => toEth(a) - toEth(b));
    case 'price-desc':
      return out.sort((a, b) => toEth(b) - toEth(a));
    case 'supply':
      return out.sort((a, b) => (a.supply || 1e9) - (b.supply || 1e9));
    case 'az':
      return out.sort((a, b) => a.title.localeCompare(b.title));
    default:
      return out;
  }
};