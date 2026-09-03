export type Chain = 'Ethereum' | 'Base' | 'Tezos' | 'Arbitrum' | 'Polygon' | 'Other' | 'TBA';

export type Currency = 'ETH' | 'XTZ' | 'MATIC';

export type TechTag =
'Fully On-Chain' |
'Dynamic' |
'Generative' |
'Animated' |
'Interactive' |
'Interactive HTML' |
'Game' |
'Audio' |
'Live Data' |
'AI' |
'Experimental Contract';

export type StorageMethod = 'Fully On-Chain' | 'Partially On-Chain' | 'Off-chain' | 'IPFS' | 'Arweave' | 'TBA';

export type CollectionStatus = 'Live' | 'Upcoming' | 'Allowlist' | 'Sold Out' | 'Closed';

export type ArtFormat =
'SVG / on-chain' |
'HTML / on-chain' |
'Canvas / JS' |
'WebGL / GLSL' |
'Audio / WebAudio' |
'PNG sequence' |
'GIF';

/** Identifier for the deterministic generative preview renderer used by a collection. */
export type ArtVariant =
'lattice' |
'atmosphere' |
'channel' |
'garden' |
'savepoint' |
'signal' |
'null' |
'collapse' |
'fork' |
'greyroom';

export interface CollectionArt {
  variant: ArtVariant;
  /** Single accent sampled from the artwork. Used for controlled bursts of colour. */
  accent: string;
  /** Optional secondary sampled colour. */
  accentAlt?: string;
  /** Optional self-contained HTML artwork used as a live preview. */
  htmlPreview?: string;
  /** Optional image or animated image used as the collection preview. */
  imagePreview?: string;
}

export interface TechnicalSpec {
  chain: Chain;
  contract: string;
  tokenStandard: string;
  storage: StorageMethod;
  metadataLocation: string;
  format: ArtFormat;
  rendering: string;
  dynamicBehavior: string;
  license: string;
  royalty: string;
  releaseDate: string;
}

export interface CollectionStory {
  idea: string;
  howItWorks: string;
  innovation: string;
  ownership: string;
  process: string;
  artistStatement: string;
}

export interface TraitDefinition {
  name: string;
  values: string[];
}

export interface Collection {
  id: string;
  index: number;
  slug: string;
  title: string;
  artistSlug: string;
  concept: string;
  summary: string;
  tech: TechTag[];
  categories: CategorySlug[];
  status: CollectionStatus;
  supply: number;
  minted: number;
  price: number;
  currency: Currency;
  floor?: number;
  year: number;
  /** ISO timestamp — mint open (past) or drop date (future). */
  dropDate: string;
  spec: TechnicalSpec;
  story: CollectionStory;
  traits: TraitDefinition[];
  art: CollectionArt;
  /** Editorial weight in the featured grid. */
  featured?: 'primary' | 'secondary';
}

export interface ArtistLinks {
  website?: string;
  x?: string;
  instagram?: string;
  farcaster?: string;
  foundation?: string;
}

export interface Artist {
  slug: string;
  name: string;
  profileNameLines?: string[];
  location: string;
  verified: boolean;
  disciplines: string[];
  focus: string;
  bio: string;
  longBio: string[];
  statement: string;
  links: ArtistLinks;
  wallet: string;
  ens: string;
  joined: string;
  externalWork: {title: string;venue: string;year: number;}[];
  notes?: {question: string;answer: string;}[];
  portraitImage?: string;
  portraitSeed: number;
  accent: string;
}

export type DropPhase = 'Upcoming' | 'Allowlist' | 'Live' | 'Sold Out' | 'Recently Closed';

export interface Drop {
  id: string;
  collectionSlug: string;
  date: string;
  phase: DropPhase;
  mintWindow: string;
  allowlistNote?: string;
  featured?: boolean;
}

export type CategorySlug =
'on-chain' |
'dynamic' |
'interactive' |
'generative' |
'playable' |
'data-driven' |
'audiovisual' |
'experimental-contracts';

export interface Category {
  slug: CategorySlug;
  label: string;
  count: number;
  description: string;
  tech: TechTag[];
}

export interface Token {
  id: string;
  number: number;
  owner: string;
  state: string;
  traits: {name: string;value: string;}[];
  listed: boolean;
  price?: number;
  seed: number;
}

export type WalletId = 'metamask' | 'rainbow' | 'coinbase' | 'walletconnect' | 'ledger';

export type WalletStatus = 'disconnected' | 'connecting' | 'connected' | 'error';
