import React from 'react';
import { Label } from './Label';
import { cn } from '../../utils/format';

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * Shared section masthead: index number, oversized title, optional aside.
 * Sits on a hairline so sections read as registers in one document.
 */
export const SectionHeading: React.FC<SectionHeadingProps> = ({
  index,
  title,
  description,
  action,
  className,
  id
}) =>
<div className={cn('border-t bp-rule pt-5', className)}>
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col items-start gap-4">
        <Label className="tabular-nums">{index}</Label>
        <h2 id={id} className="max-w-[15ch] text-section font-extrabold uppercase text-paper">
          {title}
        </h2>
      </div>
      <div className="flex flex-col items-start gap-5 md:max-w-md md:items-end">
        {description &&
      <p className="max-w-sm text-[15px] leading-relaxed text-bone md:text-right">{description}</p>
      }
        {action}
      </div>
    </div>
  </div>;
