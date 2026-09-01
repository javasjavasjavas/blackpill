import React from 'react';
import { cn } from '../../utils/format';

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  as?: 'span' | 'div' | 'h2' | 'p';
}

/** Monospace technical eyebrow used across every module. */
export const Label: React.FC<LabelProps> = ({ children, className, as = 'span' }) => {
  const Comp = as;
  return (
    <Comp className={cn('font-mono text-10 uppercase tracking-label text-smoke', className)}>
      {children}
    </Comp>);

};