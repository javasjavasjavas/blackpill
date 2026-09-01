import React, { useId, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '../../utils/format';

interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

/** Keyboard and pointer accessible definition tooltip for technical terms. */
export const Tooltip: React.FC<TooltipProps> = ({ children, content, className }) => {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className={cn('relative inline-flex', className)}>
      <button
        type="button"
        aria-describedby={open ? id : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 border-b border-dotted border-smoke text-left">
        
        {children}
      </button>
      <AnimatePresence>
        {open &&
        <motion.span
          id={id}
          role="tooltip"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4 }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className="absolute bottom-full left-0 z-40 mb-2 w-64 border border-white/15 bg-carbon p-3 font-sans text-[12px] normal-case leading-snug tracking-normal text-bone shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
          
            {content}
          </motion.span>
        }
      </AnimatePresence>
    </span>);

};