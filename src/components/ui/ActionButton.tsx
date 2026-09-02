import React from 'react';
import { Link } from 'react-router-dom';
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
  type = 'button',
  ariaLabel
}) => {
  const classes = cn(
    'group relative inline-flex items-center justify-center gap-2 font-mono uppercase tracking-meta transition-colors duration-150 ease-swift',
    VARIANT[variant],
    SIZE[size],
    disabled && 'pointer-events-none opacity-40',
    className
  );

  const inner =
  <span className="pointer-events-none inline-flex items-center gap-2">
    
      {children}
    </span>;


  if (to && !disabled) {
    return (
      <Link
        to={to}
        className={classes}
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
      aria-label={ariaLabel}>
      
      {inner}
    </button>);

};
