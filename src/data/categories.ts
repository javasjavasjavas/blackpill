import type { Category } from '../types';
import { collections } from './collections';

const definitions: Omit<Category, 'count'>[] = [
{
  slug: 'on-chain',
  label: 'On-Chain',
  description: 'Nothing hosted. Image, logic and metadata live in contract storage.',
  tech: ['Fully On-Chain']
},
{
  slug: 'dynamic',
  label: 'Dynamic',
  description: 'Works that change after mint — by transfer, schedule or external state.',
  tech: ['Dynamic']
},
{
  slug: 'interactive',
  label: 'Interactive',
  description: 'Documents you operate. HTML artefacts, instruments, tools.',
  tech: ['Interactive HTML']
},
{
  slug: 'generative',
  label: 'Generative',
  description: 'Rule systems where the artist authors the process, not the output.',
  tech: ['Generative']
},
{
  slug: 'playable',
  label: 'Playable',
  description: 'Games with the cartridge, the save file and the rules all on-chain.',
  tech: ['Game']
},
{
  slug: 'data-driven',
  label: 'Data-Driven',
  description: 'Tokens wired to live feeds: climate, network, market, sensor.',
  tech: ['Live Data']
},
{
  slug: 'audiovisual',
  label: 'Audiovisual',
  description: 'Sound as primary material. Synthesised at render, never as a file.',
  tech: ['Audio']
},
{
  slug: 'experimental-contracts',
  label: 'Experimental Contracts',
  description: 'The mechanism is the artwork. Burns, forks, autonomous behaviour.',
  tech: ['Experimental Contract']
}];


export const categories: Category[] = definitions.map((d) => ({
  ...d,
  count: collections.filter((c) => c.categories.includes(d.slug)).length
}));

export const chains = ['Ethereum', 'Base', 'Tezos', 'Arbitrum', 'Polygon', 'Other'] as const;

export const techOptions = [
'Fully On-Chain',
'Dynamic',
'Generative',
'Animated',
'Interactive',
'Interactive HTML',
'Game',
'Audio',
'Live Data',
'AI',
'Experimental Contract'] as
const;

export const storageOptions = ['Fully On-Chain', 'Partially On-Chain', 'IPFS', 'Arweave'] as const;

export const statusOptions = ['Live', 'Upcoming', 'Allowlist', 'Sold Out', 'Closed'] as const;

export const formatOptions = [
'SVG / on-chain',
'HTML / on-chain',
'Canvas / JS',
'WebGL / GLSL',
'Audio / WebAudio'] as
const;

export const yearOptions = [2026, 2025, 2024] as const;
