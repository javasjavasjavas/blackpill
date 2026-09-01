import React, { useMemo } from 'react';
import { mulberry32 } from '../../utils/format';
import { cn } from '../../utils/format';

interface PortraitProps {
  seed: number;
  accent: string;
  name: string;
  src?: string;
  className?: string;
  /** Denser scanlines for large editorial use. */
  detail?: 'low' | 'high';
}

/**
 * Abstract scanline portrait — a deterministic silhouette study rather than a
 * photograph, so every artist reads as part of one system.
 */
export const Portrait: React.FC<PortraitProps> = ({
  seed,
  accent,
  name,
  src,
  className,
  detail = 'high'
}) => {
  const lines = useMemo(() => {
    const rand = mulberry32(seed);
    const count = detail === 'high' ? 46 : 26;
    return Array.from({ length: count }, (_, i) => {
      const p = i / (count - 1);
      // Silhouette envelope: narrow at crown, wide at shoulders.
      const head = Math.sin(Math.min(1, p * 1.45) * Math.PI) * 0.62;
      const shoulder = p > 0.72 ? (p - 0.72) * 2.4 : 0;
      const width = Math.min(0.96, head + shoulder + 0.06);
      return {
        y: p * 100,
        width: width * 100,
        jitter: (rand() - 0.5) * 5,
        opacity: 0.18 + rand() * 0.62,
        accent: rand() > 0.9
      };
    });
  }, [seed, detail]);

  return (
    <div className={cn('relative overflow-hidden bg-ink', className)}>
      {src ?
      <img
        src={src}
        alt={`Portrait of ${name}`}
        className="absolute inset-0 h-full w-full object-contain" /> :
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label={`Abstract scanline portrait of ${name}`}>
        
        {lines.map((l, i) =>
        <rect
          key={i}
          x={50 - l.width / 2 + l.jitter}
          y={l.y}
          width={l.width}
          height={detail === 'high' ? 1.5 : 2.8}
          fill={l.accent ? accent : '#F2F1ED'}
          opacity={l.accent ? 0.95 : l.opacity} />

        )}
      </svg>
      }
    </div>);

};
