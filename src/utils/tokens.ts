import type { Collection, Token } from '../types';
import { hashString, mulberry32 } from './format';

const OWNER_NAMES = [
'vault.eth',
'kestrel.eth',
'm.arai',
'longform.eth',
'0x9d1f…4b02',
'harrow.eth',
'noon.eth',
'delta9.eth',
'0x41cc…7e88',
'archive.eth',
'tobi.eth',
'0xf20a…19cd',
'greyroom.eth',
'ivo.eth',
'0x77b3…c401',
'nandan.eth'];


const STATES = ['Resting', 'Mutating', 'Reporting', 'Playing', 'Offline', 'Sealed'];

/**
 * Deterministically derives the token list for a collection. Replace with a
 * subgraph query or contract read when integrating for real.
 */
export const generateTokens = (collection: Collection, count = 48): Token[] => {
  const total = collection.minted > 0 ? Math.min(count, collection.minted) : count;
  const rand = mulberry32(hashString(collection.slug));

  return Array.from({ length: total }, (_, i) => {
    const number = i + 1;
    const seed = Math.floor(rand() * 100000);
    const listed = rand() > 0.66;
    const basePrice = collection.floor ?? collection.price;
    return {
      id: `${collection.slug}-${number}`,
      number,
      owner: OWNER_NAMES[Math.floor(rand() * OWNER_NAMES.length)],
      state: STATES[Math.floor(rand() * STATES.length)],
      traits: collection.traits.map((t) => ({
        name: t.name,
        value: t.values[Math.floor(rand() * t.values.length)]
      })),
      listed,
      price: listed ? Number((basePrice * (0.9 + rand() * 1.6)).toFixed(3)) : undefined,
      seed
    };
  });
};