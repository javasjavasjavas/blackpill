import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../utils/format';

interface LineRevealProps {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}

/** Per-line clip reveal for display type. Each line moves once, briefly. */
export const LineReveal: React.FC<LineRevealProps> = ({
  lines,
  className,
  lineClassName,
  delay = 0
}) => {
  const reduce = useReducedMotion();

  return (
    <span className={cn('block', className)}>
      {lines.map((line, i) =>
      <span key={line + i} className="block overflow-hidden">
          {reduce ?
        <span className={cn('block', lineClassName)}>{line}</span> :

        <motion.span
          className={cn('block', lineClassName)}
          initial={{ y: '106%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 0.3, delay: delay + i * 0.06, ease: [0.23, 1, 0.32, 1] }}>
          
              {line}
            </motion.span>
        }
        </span>
      )}
    </span>);

};