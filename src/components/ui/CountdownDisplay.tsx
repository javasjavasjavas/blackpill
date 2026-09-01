import React from 'react';
import { useCountdown } from '../../hooks/useCountdown';
import { pad, cn } from '../../utils/format';

interface CountdownDisplayProps {
  date: string;
  size?: 'sm' | 'lg';
  className?: string;
  liveLabel?: string;
}

const Unit: React.FC<{value: string;unit: string;size: 'sm' | 'lg';}> = ({ value, unit, size }) =>
<span className="flex flex-col items-start">
    <span
    className={cn(
      'font-display font-extrabold tabular-nums tracking-tightest text-paper',
      size === 'lg' ? 'text-[clamp(2rem,4.5vw,3.5rem)] leading-none' : 'text-2xl leading-none'
    )}>
    
      {value}
    </span>
    <span className="mt-1 font-mono text-10 uppercase tracking-label text-smoke">{unit}</span>
  </span>;


export const CountdownDisplay: React.FC<CountdownDisplayProps> = ({
  date,
  size = 'sm',
  className,
  liveLabel = 'Mint open'
}) => {
  const { days, hours, minutes, seconds, isPast } = useCountdown(date);

  if (isPast) {
    return (
      <span className={cn('font-mono text-11 uppercase tracking-meta text-volt', className)}>
        {liveLabel}
      </span>);

  }

  return (
    <div
      className={cn('flex items-end gap-5', className)}
      role="timer"
      aria-live="off"
      aria-label={`Opens in ${days} days ${hours} hours ${minutes} minutes`}>
      
      <Unit value={pad(days)} unit="Days" size={size} />
      <span className={cn('font-display text-steel', size === 'lg' ? 'text-3xl' : 'text-xl')} aria-hidden="true">
        :
      </span>
      <Unit value={pad(hours)} unit="Hrs" size={size} />
      <span className={cn('font-display text-steel', size === 'lg' ? 'text-3xl' : 'text-xl')} aria-hidden="true">
        :
      </span>
      <Unit value={pad(minutes)} unit="Min" size={size} />
      <span className={cn('font-display text-steel', size === 'lg' ? 'text-3xl' : 'text-xl')} aria-hidden="true">
        :
      </span>
      <Unit value={pad(seconds)} unit="Sec" size={size} />
    </div>);

};