import { twMerge } from 'tailwind-merge';
import type { Currency } from '../types';

export const cn = (...classes: (string | false | null | undefined)[]): string =>
twMerge(classes.filter(Boolean).join(' '));

export const truncateAddress = (address: string, lead = 6, tail = 4): string =>
address.length <= lead + tail ? address : `${address.slice(0, lead)}…${address.slice(-tail)}`;

export const formatPrice = (price: number, currency: Currency): string => {
  if (currency === 'ETH') return `${price} ETH`;
  if (currency === 'XTZ') return `${price} ꜩ`;
  return `${price} MATIC`;
};

export const formatNumber = (value: number): string => value.toLocaleString('en-US');

export const formatDate = (iso: string): string =>
new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

export const formatDateTime = (iso: string): string => {
  const d = new Date(iso);
  return `${d.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })} · ${d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} UTC`;
};

export const pad = (n: number): string => String(Math.max(0, n)).padStart(2, '0');

export const systemTimestamp = (d: Date = new Date()): string =>
`${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())} ${pad(
  d.getUTCHours()
)}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`;

export const indexLabel = (n: number, width = 3): string => String(n).padStart(width, '0');

/** Deterministic PRNG so mocked data is stable between renders. */
export const mulberry32 = (seed: number): (() => number) => {
  let a = seed >>> 0;
  return () => {
    a = a + 0x6d2b79f5 >>> 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};

export const hashString = (value: string): number => {
  let h = 2166136261;
  for (let i = 0; i < value.length; i += 1) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};