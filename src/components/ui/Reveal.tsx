import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  /** Seconds. Keep stagger tight — 0.04 per sibling. */
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'span' | 'section';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  delay = 0,
  y = 14,
  className,
  as = 'div'
}) => {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  if (reduce) {
    const Static = as as 'div';
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-64px' }}
      transition={{ duration: 0.3, delay, ease: [0.23, 1, 0.32, 1] }}>
      
      {children}
    </Comp>);

};