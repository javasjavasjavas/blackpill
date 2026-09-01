import React from 'react';
import { cn } from '../../utils/format';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) =>
<div className={cn('bp-skeleton', className)} aria-hidden="true" />;