import React from 'react';
import logoUrl from '../../assets/black-pill-logo.png';
import { cn } from '../../utils/format';

interface WordmarkProps {
  variant?: 'inline' | 'stacked' | 'extended';
  className?: string;
}

export const Wordmark: React.FC<WordmarkProps> = ({ variant = 'inline', className }) => (
  <img
    src={logoUrl}
    alt="Black Pill"
    className={cn(
      'block object-contain object-left',
      variant === 'stacked' ? 'h-auto w-full max-w-[180px]' :
      variant === 'extended' ? 'h-7 w-auto' :
      'h-[18px] w-auto',
      className
    )}
  />
);
