import React from 'react';

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
  className,
  as = 'div'
}) => {
  const Static = as;
  return <Static className={className}>{children}</Static>;
};
