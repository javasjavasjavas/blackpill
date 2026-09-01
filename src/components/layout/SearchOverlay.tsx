import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CornerDownLeftIcon, SearchIcon, XIcon } from 'lucide-react';
import { Label } from '../ui/Label';
import { StatusBadge } from '../ui/StatusBadge';
import { collections } from '../../data/collections';
import { registryArtists } from '../../data/artists';
import { categories } from '../../data/categories';
import { useEscape, useLockBodyScroll } from '../../hooks/useUi';
import { cn, indexLabel } from '../../utils/format';

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

interface Result {
  key: string;
  kind: 'Collection' | 'Artist' | 'Category';
  title: string;
  meta: string;
  to: string;
  status?: string;
  accent?: string;
}

export const SearchOverlay: React.FC<SearchOverlayProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  useLockBodyScroll(open);
  useEscape(open, onClose);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      window.setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    const collectionResults: Result[] = collections.
    filter(
      (c) =>
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.concept.toLowerCase().includes(q) ||
      c.tech.some((t) => t.toLowerCase().includes(q)) ||
      c.spec.chain.toLowerCase().includes(q)
    ).
    map((c) => ({
      key: `c-${c.slug}`,
      kind: 'Collection' as const,
      title: c.title,
      meta: `${c.id} · ${c.spec.chain} · ${c.tech.join(' / ')}`,
      to: `/collection/${c.slug}`,
      status: c.status,
      accent: c.art.accent
    }));

    const artistResults: Result[] = registryArtists.
    filter(
      (a) =>
      !q ||
      a.name.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q) ||
      a.disciplines.some((d) => d.toLowerCase().includes(q))
    ).
    map((a) => ({
      key: `a-${a.slug}`,
      kind: 'Artist' as const,
      title: a.name,
      meta: `${a.location} · ${a.disciplines.join(' / ')}`,
      to: `/artist/${a.slug}`,
      accent: a.accent
    }));

    const categoryResults: Result[] = categories.
    filter((c) => q && (c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q))).
    map((c) => ({
      key: `cat-${c.slug}`,
      kind: 'Category' as const,
      title: c.label,
      meta: `${c.count} collections`,
      to: `/collections?category=${c.slug}`
    }));

    return [...collectionResults, ...artistResults, ...categoryResults].slice(0, 12);
  }, [query]);

  const go = (to: string) => {
    onClose();
    navigate(to);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => Math.min(results.length - 1, c + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === 'Enter' && results[cursor]) {
      go(results[cursor].to);
    }
  };

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Search"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-0 z-[60] flex flex-col bg-void/97"
        onKeyDown={onKeyDown}>
        
          <div className="border-b bp-rule">
            <div className="mx-auto flex max-w-frame items-center gap-4 px-5 py-5 lg:px-10">
              <SearchIcon className="h-5 w-5 shrink-0 text-smoke" strokeWidth={1.5} />
              <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              placeholder="Search collections, artists, technologies…"
              aria-label="Search collections, artists, technologies"
              className="w-full bg-transparent font-display text-xl font-medium tracking-tight text-paper placeholder:text-steel focus:outline-none md:text-3xl" />
            
              <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-white/15 text-paper transition-colors duration-150 hover:border-paper">
              
                <XIcon className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="mx-auto w-full max-w-frame flex-1 overflow-y-auto px-5 py-6 lg:px-10">
            {results.length === 0 ?
          <div className="border bp-rule p-10 text-center">
                <Label>No results</Label>
                <p className="mx-auto mt-4 max-w-md text-lg text-bone">
                  Nothing in the index matches “{query}”. Try a technology — on-chain, dynamic,
                  audio, game — or an artist name.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {['On-chain', 'Dynamic', 'Interactive', 'Audio'].map((s) =>
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="rounded-full border border-white/20 px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.18em] text-bone transition-colors duration-150 hover:border-paper hover:text-paper">
                
                      {s}
                    </button>
              )}
                </div>
              </div> :

          <>
                <div className="flex items-center justify-between pb-3">
                  <Label>{query ? `${results.length} results` : 'Index — all entries'}</Label>
                  <Label className="hidden md:inline">↑ ↓ to navigate · ⏎ to open</Label>
                </div>
                <ul>
                  {results.map((r, i) =>
              <li key={r.key}>
                      <button
                  type="button"
                  onMouseEnter={() => setCursor(i)}
                  onClick={() => go(r.to)}
                  className={cn(
                    'group flex w-full items-center gap-4 border-t bp-rule py-4 text-left transition-colors duration-150',
                    i === cursor ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'
                  )}>
                  
                        <span className="w-10 shrink-0 pl-1 font-mono text-10 tabular-nums text-steel">
                          {indexLabel(i + 1)}
                        </span>
                        <span
                    className="h-6 w-1 shrink-0"
                    style={{ backgroundColor: r.accent ?? '#4D4D4D' }}
                    aria-hidden="true" />
                  
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-display text-lg font-bold tracking-tight text-paper">
                            {r.title}
                          </span>
                          <span className="mt-0.5 block truncate font-mono text-10 uppercase tracking-meta text-steel">
                            {r.kind} — {r.meta}
                          </span>
                        </span>
                        {r.status &&
                  <span className="hidden shrink-0 md:block">
                            <StatusBadge status={r.status as never} />
                          </span>
                  }
                        <CornerDownLeftIcon
                    className={cn(
                      'h-4 w-4 shrink-0 text-steel transition-opacity duration-150',
                      i === cursor ? 'opacity-100' : 'opacity-0'
                    )}
                    strokeWidth={1.5} />
                  
                      </button>
                    </li>
              )}
                </ul>
              </>
          }
          </div>
        </motion.div>
      }
    </AnimatePresence>);

};
