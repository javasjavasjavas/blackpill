import React from 'react';
import { cn } from '../../utils/format';

interface TagProps {
  children: React.ReactNode;
  /** Solid tags mark the defining technology of a work. */
  tone?: 'outline' | 'solid' | 'accent';
  className?: string;
  accent?: string;
}

export const Tag: React.FC<TagProps> = ({ children, tone = 'outline', className, accent }) =>
<span
  className={cn(
    'inline-flex items-center whitespace-nowrap rounded-full border px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.18em]',
    tone === 'outline' && 'border-white/20 text-bone',
    tone === 'solid' && 'border-paper bg-paper text-ink',
    tone === 'accent' && 'border-transparent text-ink',
    className
  )}
  style={tone === 'accent' && accent ? { backgroundColor: accent } : undefined}>
  
    {children}
  </span>;
