import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * Desktop-only cursor companion. Stays a hairline square until it enters an
 * element that declares a label, then becomes that label.
 */
export const CustomCursor: React.FC = () => {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 700, damping: 42, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 700, damping: 42, mass: 0.35 });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine);
    if (!fine) return;

    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      setVisible(true);
      const target = (e.target as HTMLElement | null)?.closest?.('[data-cursor]');
      setLabel(target ? target.getAttribute('data-cursor') : null);
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', leave);
    };
  }, [reduce, rawX, rawY]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, opacity: visible ? 1 : 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[80] -translate-x-1/2 -translate-y-1/2 mix-blend-difference">
      
      {label ?
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-center font-mono text-10 uppercase tracking-meta text-ink">
          {label}
        </span> :

      <span className="block h-2 w-2 border border-paper" />
      }
    </motion.div>);

};