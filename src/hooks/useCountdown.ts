import { useEffect, useState } from 'react';

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
  isPast: boolean;
}

const compute = (target: number): Countdown => {
  const total = target - Date.now();
  const clamped = Math.max(0, total);
  return {
    days: Math.floor(clamped / 86400000),
    hours: Math.floor(clamped / 3600000 % 24),
    minutes: Math.floor(clamped / 60000 % 60),
    seconds: Math.floor(clamped / 1000 % 60),
    total,
    isPast: total <= 0
  };
};

export const useCountdown = (iso: string): Countdown => {
  const target = new Date(iso).getTime();
  const [state, setState] = useState<Countdown>(() => compute(target));

  useEffect(() => {
    setState(compute(target));
    const id = window.setInterval(() => setState(compute(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return state;
};