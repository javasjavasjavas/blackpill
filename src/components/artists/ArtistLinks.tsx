import React from 'react';
import { SocialIcon, type SocialNetwork } from '../ui/SocialIcon';
import type { Artist } from '../../types';
import { cn } from '../../utils/format';

interface ArtistLinksProps {
  artist: Artist;
  className?: string;
}

const MAP: {key: keyof Artist['links'];network: SocialNetwork;label: string;}[] = [
{ key: 'website', network: 'website', label: 'Website' },
{ key: 'x', network: 'x', label: 'X' },
{ key: 'instagram', network: 'instagram', label: 'Instagram' },
{ key: 'farcaster', network: 'farcaster', label: 'Farcaster' },
{ key: 'foundation', network: 'foundation', label: 'Foundation' }];


export const ArtistLinks: React.FC<ArtistLinksProps> = ({ artist, className }) =>
<ul className={cn('flex flex-wrap items-center gap-2', className)}>
    {MAP.filter((m) => artist.links[m.key]).map((m) =>
  <li key={m.key}>
        <a
      href={`https://${String(artist.links[m.key]).replace(/^@/, '')}`}
      target="_blank"
      rel="noreferrer noopener"
      className="group inline-flex items-center gap-2 border border-white/20 px-3 py-2 font-mono text-10 uppercase tracking-meta text-bone transition-colors duration-150 hover:border-paper hover:text-paper"
      aria-label={`${artist.name} on ${m.label}`}>
      
          <SocialIcon network={m.network} className="h-3.5 w-3.5" />
          <span>{artist.links[m.key]}</span>
        </a>
      </li>
  )}
  </ul>;