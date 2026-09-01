import React from 'react';
import { cn } from '../../utils/format';

interface PillMarkProps {
  className?: string;
  /** Fills the capsule — used for the active / live indicator. */
  active?: boolean;
}

/**
 * The Black Pill capsule: a compact technological object. Outlined shell,
 * segmented core, one indicator notch.
 */
export const PillMark: React.FC<PillMarkProps> = ({ className, active = false }) =>
<svg
  viewBox="0 0 28 14"
  className={cn('h-3.5 w-7', className)}
  fill="none"
  aria-hidden="true"
  focusable="false">
  
    <rect x="0.6" y="0.6" width="26.8" height="12.8" rx="6.4" stroke="currentColor" strokeWidth="1.2" />
    <rect x="4.2" y="4.2" width="7" height="5.6" fill="currentColor" opacity={active ? 1 : 0.55} />
    <rect x="13.4" y="4.2" width="1.4" height="5.6" fill="currentColor" opacity="0.35" />
    <rect x="17" y="6.4" width="6.6" height="1.2" fill="currentColor" opacity={active ? 1 : 0.45} />
  </svg>;