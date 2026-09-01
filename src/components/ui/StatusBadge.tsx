import React from 'react';
import type { CollectionStatus, DropPhase } from '../../types';
import { cn } from '../../utils/format';

interface StatusBadgeProps {
  status: CollectionStatus | DropPhase;
  className?: string;
}

const TONE: Record<string, {dot: string;text: string;pulse: boolean;}> = {
  Live: { dot: 'bg-volt', text: 'text-volt', pulse: true },
  Allowlist: { dot: 'bg-accent', text: 'text-accent', pulse: true },
  Upcoming: { dot: 'bg-paper', text: 'text-paper', pulse: false },
  'Sold Out': { dot: 'bg-steel', text: 'text-smoke', pulse: false },
  Closed: { dot: 'bg-steel', text: 'text-smoke', pulse: false },
  'Recently Closed': { dot: 'bg-steel', text: 'text-smoke', pulse: false }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const tone = TONE[status] ?? TONE.Upcoming;
  return (
    <span
      className={cn('inline-flex items-center gap-1.5 font-mono text-10 uppercase tracking-meta', tone.text, className)}>
      
      <span
        className={cn('h-1.5 w-1.5 rounded-full', tone.dot, tone.pulse && 'animate-blink')}
        aria-hidden="true" />
      
      {status}
    </span>);

};