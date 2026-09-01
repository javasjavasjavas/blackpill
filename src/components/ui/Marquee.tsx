import React from 'react';
import { cn } from '../../utils/format';

interface MarqueeProps {
  items: string[];
  className?: string;
}

/** Single-line technical ticker. Duplicated once for a seamless loop. */
export const Marquee: React.FC<MarqueeProps> = ({ items, className }) => {
  const row = [...items, ...items];
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="flex w-max animate-marquee items-center">
        {row.map((item, i) =>
        <span
          key={`${item}-${i}`}
          className="flex items-center whitespace-nowrap font-mono text-11 uppercase tracking-meta text-smoke">
          
            {item}
            <span className="mx-6 text-steel" aria-hidden="true">
              /
            </span>
          </span>
        )}
      </div>
    </div>);

};