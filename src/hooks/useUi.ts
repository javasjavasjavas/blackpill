import { useEffect, useRef, useState } from 'react';

/** True once the window has scrolled past `threshold` pixels. */
export const useScrolled = (threshold = 24): boolean => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return scrolled;
};

/** Locks document scroll while `locked` is true. */
export const useLockBodyScroll = (locked: boolean): void => {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
};

/** Calls `onClose` on Escape. */
export const useEscape = (active: boolean, onClose: () => void): void => {
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, onClose]);
};

/** Traps tab focus inside a container while active. */
export const useFocusTrap = (active: boolean) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const node = ref.current;
    const selector =
    'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const first = node.querySelectorAll<HTMLElement>(selector)[0];
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(selector)).filter(
        (el) => el.offsetParent !== null
      );
      if (items.length === 0) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    };
    node.addEventListener('keydown', onKey);
    return () => node.removeEventListener('keydown', onKey);
  }, [active]);
  return ref;
};

/** Simulates an async fetch so filter/list transitions show real loading states. */
export const useSimulatedLoad = (deps: unknown[], delay = 420): boolean => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const id = window.setTimeout(() => setLoading(false), delay);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return loading;
};