import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { cn } from '../../utils/format';

type Variant = 'primary' | 'outline' | 'accent' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface ActionButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  className?: string;
  /** Reactive pull toward the cursor. Reserve for a page's primary action. */
  magnetic?: boolean;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}

const VARIANT: Record<Variant, string> = {
  primary: 'bg-paper text-ink hover:bg-chalk border border-paper',
  outline: 'border border-white/25 text-paper hover:border-paper hover:bg-white/5',
  accent: 'bg-accent text-chalk border border-accent hover:bg-[#ff5526]',
  ghost: 'border border-transparent text-paper hover:bg-white/5'
};

const SIZE: Record<Size, string> = {
  sm: 'h-8 px-3 text-[10px]',
  md: 'h-11 px-5 text-[10px]',
  lg: 'h-14 px-7 text-[10px]'
};

export const ActionButton: React.FC<ActionButtonProps> = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled,
  className,
  magnetic = false,
  type = 'button',
  ariaLabel
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 26, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 320, damping: 26, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    if (!magnetic || reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - (r.left + r.width / 2)) / r.width * 10);
    rawY.set((e.clientY - (r.top + r.height / 2)) / r.height * 8);
  };
  const handleLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2 font-mono uppercase tracking-meta transition-colors duration-150 ease-swift',
    VARIANT[variant],
    SIZE[size],
    disabled && 'pointer-events-none opacity-40',
    className
  );

  const inner =
  <motion.span
    ref={ref}
    style={magnetic && !reduce ? { x, y } : undefined}
    className="pointer-events-none inline-flex items-center gap-2">
    
      {children}
    </motion.span>;


  if (to && !disabled) {
    return (
      <Link
        to={to}
        className={classes}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        aria-label={ariaLabel}>
        
        {inner}
      </Link>);

  }

  if (href && !disabled) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className={classes}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        aria-label={ariaLabel}>
        
        {inner}
      </a>);

  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      aria-label={ariaLabel}>
      
      {inner}
    </button>);

};
