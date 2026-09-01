import React from 'react';
import { GlobeIcon } from 'lucide-react';
import { cn } from '../../utils/format';

export type SocialNetwork = 'x' | 'discord' | 'farcaster' | 'instagram' | 'website' | 'foundation';

interface SocialIconProps {
  network: SocialNetwork;
  className?: string;
}

/** Single-weight monochrome marks so every network reads as one set. */
export const SocialIcon: React.FC<SocialIconProps> = ({ network, className }) => {
  const cls = cn('h-4 w-4', className);

  if (network === 'website') return <GlobeIcon className={cls} strokeWidth={1.5} aria-hidden="true" />;

  if (network === 'x') {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M17.53 3H21l-7.19 8.21L21.75 21H15.6l-4.82-6.3L5.2 21H1.72l7.5-8.57L2.5 3h6.15l4.5 5.94L17.53 3Zm-1.2 16h1.92L7.77 4.93H5.72L16.33 19Z" />
      </svg>);

  }

  if (network === 'discord') {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M19.3 5.34A16.3 16.3 0 0 0 15.3 4.1l-.32.65a12.2 12.2 0 0 1 3.44 1.36 11.6 11.6 0 0 0-8.85 0A12.2 12.2 0 0 1 13 4.75L12.7 4.1a16.3 16.3 0 0 0-4 1.24C6 9.4 5.3 13.4 5.65 17.3A16.1 16.1 0 0 0 10.5 20l.6-1.1a10 10 0 0 1-1.9-.9l.4-.3a12.6 12.6 0 0 0 9 0l.4.3a10 10 0 0 1-1.9.9l.6 1.1a16.1 16.1 0 0 0 4.85-2.7c.4-4.4-.6-8.35-2.25-11.96ZM9.7 14.7c-.95 0-1.72-.87-1.72-1.94 0-1.07.75-1.94 1.72-1.94.97 0 1.75.88 1.73 1.94 0 1.07-.76 1.94-1.73 1.94Zm4.6 0c-.95 0-1.72-.87-1.72-1.94 0-1.07.75-1.94 1.72-1.94.98 0 1.75.88 1.73 1.94 0 1.07-.75 1.94-1.73 1.94Z" />
      </svg>);

  }

  if (network === 'farcaster') {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="currentColor" aria-hidden="true">
        <path d="M5 3h14v2.2h-2.1v13.5H19V21h-5.4v-2.3h1.4v-5.1c0-1.6-1.3-2.9-3-2.9s-3 1.3-3 2.9v5.1h1.4V21H5v-2.3h2.1V5.2H5V3Z" />
      </svg>);

  }

  if (network === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4.6" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>);

  }

  return (
    <svg viewBox="0 0 24 24" className={cls} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" />
      <path d="M8.5 17V7h7M8.5 12h5.5" />
    </svg>);

};