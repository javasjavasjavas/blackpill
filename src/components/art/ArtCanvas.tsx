import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { ArtVariant } from '../../types';
import { renderers } from './renderers';
import { cn } from '../../utils/format';

interface ArtCanvasProps {
  variant: ArtVariant;
  accent: string;
  seed?: number;
  /** Weight of line work + detail. */
  size?: 'thumb' | 'card' | 'hero';
  /** Animate while in view. Static single frame otherwise. */
  animate?: boolean;
  className?: string;
  /** Accessible description; omit for decorative duplicates of adjacent text. */
  label?: string;
}

const SCALE: Record<NonNullable<ArtCanvasProps['size']>, number> = {
  thumb: 0.55,
  card: 1,
  hero: 1.6
};

/**
 * Deterministic generative preview. Runs only while visible and falls back to a
 * static hairline field when 2D canvas is unavailable.
 */
export const ArtCanvas: React.FC<ArtCanvasProps> = ({
  variant,
  accent,
  seed = 1,
  size = 'card',
  animate = true,
  className,
  label
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number>();
  const [failed, setFailed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      setFailed(true);
      return;
    }

    let visible = true;
    let running = animate && !reduceMotion;
    const start = performance.now();

    const paint = (now: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width));
      const h = Math.max(1, Math.floor(rect.height));
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      renderers[variant]({
        ctx,
        w,
        h,
        t: running ? (now - start) / 1000 : 0,
        accent,
        seed,
        scale: SCALE[size]
      });
    };

    const loop = (now: number) => {
      if (visible && running) paint(now);
      frame.current = requestAnimationFrame(loop);
    };

    paint(performance.now());
    if (running) frame.current = requestAnimationFrame(loop);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: '120px' }
    );
    io.observe(wrap);

    const ro = new ResizeObserver(() => paint(performance.now()));
    ro.observe(wrap);

    return () => {
      running = false;
      if (frame.current) cancelAnimationFrame(frame.current);
      io.disconnect();
      ro.disconnect();
    };
  }, [variant, accent, seed, size, animate, reduceMotion]);

  return (
    <div ref={wrapRef} className={cn('relative overflow-hidden bg-ink', className)}>
      {failed ?
      <div className="bp-dots absolute inset-0 opacity-60" aria-hidden="true" /> :

      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        role={label ? 'img' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true} />

      }
    </div>);

};