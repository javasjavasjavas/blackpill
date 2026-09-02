import type { Drop } from '../types';

/**
 * Drop schedule. Dates are ISO strings so this array can later be replaced by an
 * API response or a subgraph query without changing consumers.
 */
export const drops: Drop[] = [
{
  id: 'DROP-014',
  collectionSlug: 'districts',
  date: '2026-09-09T15:32:00.000Z',
  phase: 'Allowlist',
  mintWindow: '48h mint window',
  allowlistNote: 'Allowlist opens 2h early — 808 instruments, one per wallet.',
  featured: true
},
{
  id: 'DROP-015',
  collectionSlug: 'weather-protocol',
  date: '2026-09-08T15:00:00.000Z',
  phase: 'Upcoming',
  mintWindow: 'Open edition, 72h'
},
{
  id: 'DROP-016',
  collectionSlug: 'hard-fork',
  date: '2026-09-19T16:00:00.000Z',
  phase: 'Upcoming',
  mintWindow: '24h mint window'
},
{
  id: 'DROP-011',
  collectionSlug: 'latent-machines',
  date: '2026-08-12T17:00:00.000Z',
  phase: 'Live',
  mintWindow: 'Open until sold out'
},
{
  id: 'DROP-010',
  collectionSlug: 'the-last-save-point',
  date: '2026-07-02T16:00:00.000Z',
  phase: 'Live',
  mintWindow: 'Open until sold out'
},
{
  id: 'DROP-012',
  collectionSlug: 'model-collapse',
  date: '2026-05-19T17:00:00.000Z',
  phase: 'Live',
  mintWindow: 'Open until sold out'
},
{
  id: 'DROP-009',
  collectionSlug: 'consensus-garden',
  date: '2026-03-21T12:00:00.000Z',
  phase: 'Live',
  mintWindow: 'Open edition — no close date'
},
{
  id: 'DROP-008',
  collectionSlug: 'dead-channel',
  date: '2025-11-14T18:00:00.000Z',
  phase: 'Recently Closed',
  mintWindow: 'Sold out in 11 minutes'
},
{
  id: 'DROP-007',
  collectionSlug: 'null-object',
  date: '2025-06-06T14:00:00.000Z',
  phase: 'Recently Closed',
  mintWindow: 'Sold out in 3 hours'
},
{
  id: 'DROP-005',
  collectionSlug: 'grey-room',
  date: '2024-10-31T20:00:00.000Z',
  phase: 'Recently Closed',
  mintWindow: 'Sold out in 2 days'
}];


export const featuredDrop = drops.find((d) => d.featured) ?? drops[0];

export const dropForCollection = (slug: string): Drop | undefined =>
drops.find((d) => d.collectionSlug === slug);
