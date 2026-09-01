import React from 'react';
import { cn } from '../../utils/format';

interface MetaItemProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'right';
}

/** Label over value, monospace. The base unit of every technical readout. */
export const MetaItem: React.FC<MetaItemProps> = ({ label, children, className, align = 'left' }) =>
<div className={cn('flex flex-col gap-1', align === 'right' && 'items-end text-right', className)}>
    <span className="font-mono text-10 uppercase tracking-label text-steel">{label}</span>
    <span className="font-mono text-[13px] text-paper">{children}</span>
  </div>;