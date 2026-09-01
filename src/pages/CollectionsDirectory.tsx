import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LayoutGridIcon, ListIcon, SearchIcon, SlidersHorizontalIcon, XIcon } from 'lucide-react';
import { CollectionCard } from '../components/collections/CollectionCard';
import { CollectionRow } from '../components/collections/CollectionRow';
import { FilterPanel } from '../components/collections/FilterPanel';
import { Label } from '../components/ui/Label';
import { ActionButton } from '../components/ui/ActionButton';
import { Skeleton } from '../components/ui/Skeleton';
import { collections } from '../data/collections';
import { categories } from '../data/categories';
import {
  PRICE_ANY,
  SORT_LABELS,
  activeFilterCount,
  emptyFilters,
  filterCollections,
  sortCollections,
  type FilterState,
  type SortKey } from
'../utils/filters';
import { useEscape, useLockBodyScroll, useSimulatedLoad } from '../hooks/useUi';
import { cn, formatNumber } from '../utils/format';

export const CollectionsDirectory: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const reduce = useReducedMotion();
  useLockBodyScroll(drawerOpen);
  useEscape(drawerOpen, () => setDrawerOpen(false));

  // Category deep links map onto the technology filter.
  const categoryParam = params.get('category');
  useEffect(() => {
    if (!categoryParam) return;
    const category = categories.find((c) => c.slug === categoryParam);
    if (category) setFilters((f) => ({ ...f, tech: [...category.tech] }));
  }, [categoryParam]);

  const patch = (next: Partial<FilterState>) => {
    setFilters((f) => ({ ...f, ...next }));
    if (categoryParam) {
      params.delete('category');
      setParams(params, { replace: true });
    }
  };

  const results = useMemo(
    () => sortCollections(filterCollections(collections, filters), filters.sort),
    [filters]
  );
  const loading = useSimulatedLoad([filters], 380);
  const total = activeFilterCount(filters);

  const chips = [
  ...filters.status.map((v) => ({ label: v, remove: () => patch({ status: filters.status.filter((x) => x !== v) }) })),
  ...filters.tech.map((v) => ({ label: v, remove: () => patch({ tech: filters.tech.filter((x) => x !== v) }) })),
  ...filters.chain.map((v) => ({ label: v, remove: () => patch({ chain: filters.chain.filter((x) => x !== v) }) })),
  ...filters.storage.map((v) => ({ label: v, remove: () => patch({ storage: filters.storage.filter((x) => x !== v) }) })),
  ...filters.format.map((v) => ({ label: v, remove: () => patch({ format: filters.format.filter((x) => x !== v) }) })),
  ...filters.years.map((v) => ({ label: String(v), remove: () => patch({ years: filters.years.filter((x) => x !== v) }) })),
  ...(filters.maxPrice < PRICE_ANY ?
  [{ label: `≤ ${filters.maxPrice.toFixed(2)} ETH`, remove: () => patch({ maxPrice: PRICE_ANY }) }] :
  [])];


  const panel =
  <FilterPanel
    state={filters}
    onChange={patch}
    onClear={() => setFilters({ ...emptyFilters, sort: filters.sort })} />;



  return (
    <div className="mx-auto max-w-frame px-5 pb-24 pt-10 lg:px-10">
      <header className="border-b bp-rule pb-10">
        <Label>Directory — Index 001—010</Label>
        <h1 className="mt-5 text-title font-extrabold uppercase text-paper">Collections</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone">
          Every collection on Black Pill is reviewed for technical originality before it is listed.
          Filter by how the work behaves — on-chain, dynamic, interactive, playable — rather than by
          what it looks like.
        </p>
      </header>

      {/* Toolbar */}
      <div className="sticky top-14 z-30 -mx-5 border-b bp-rule bg-ink/95 px-5 py-3 backdrop-blur-sm lg:-mx-10 lg:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex min-w-[180px] flex-1 items-center gap-2.5 border border-white/20 px-3 focus-within:border-paper">
            <SearchIcon className="h-4 w-4 shrink-0 text-smoke" strokeWidth={1.5} />
            <label htmlFor="directory-search" className="sr-only">
              Search collections
            </label>
            <input
              id="directory-search"
              value={filters.query}
              onChange={(e) => patch({ query: e.target.value })}
              placeholder="Search title, artist, technology…"
              className="h-10 w-full bg-transparent font-mono text-11 text-paper placeholder:text-steel focus:outline-none" />
            
            {filters.query &&
            <button
              type="button"
              onClick={() => patch({ query: '' })}
              aria-label="Clear search"
              className="text-smoke hover:text-paper">
              
                <XIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
              </button>
            }
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="sr-only">
              Sort collections
            </label>
            <select
              id="sort"
              value={filters.sort}
              onChange={(e) => patch({ sort: e.target.value as SortKey })}
              className="h-10 border border-white/20 bg-ink px-3 font-mono text-10 uppercase tracking-meta text-paper focus:border-paper focus:outline-none">
              
              {(Object.keys(SORT_LABELS) as SortKey[]).map((key) =>
              <option key={key} value={key}>
                  {SORT_LABELS[key]}
                </option>
              )}
            </select>

            <div className="flex border border-white/20" role="group" aria-label="View mode">
              <button
                type="button"
                onClick={() => setView('grid')}
                aria-pressed={view === 'grid'}
                aria-label="Grid view"
                className={cn(
                  'flex h-10 w-10 items-center justify-center transition-colors duration-150',
                  view === 'grid' ? 'bg-paper text-ink' : 'text-smoke hover:text-paper'
                )}>
                
                <LayoutGridIcon className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => setView('list')}
                aria-pressed={view === 'list'}
                aria-label="List view"
                className={cn(
                  'flex h-10 w-10 items-center justify-center transition-colors duration-150',
                  view === 'list' ? 'bg-paper text-ink' : 'text-smoke hover:text-paper'
                )}>
                
                <ListIcon className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="flex h-10 items-center gap-2 border border-white/20 px-3 font-mono text-10 uppercase tracking-meta text-paper transition-colors duration-150 hover:border-paper lg:hidden">
              
              <SlidersHorizontalIcon className="h-4 w-4" strokeWidth={1.5} />
              Filters
              {total > 0 && <span className="text-accent">{total}</span>}
            </button>
          </div>
        </div>

        {chips.length > 0 &&
        <ul className="mt-3 flex flex-wrap items-center gap-2">
            {chips.map((chip) =>
          <li key={chip.label}>
                <button
              type="button"
              onClick={chip.remove}
              className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.18em] text-bone transition-colors duration-150 hover:border-accent hover:text-paper">
              
                  {chip.label}
                  <XIcon className="h-3 w-3 text-steel group-hover:text-accent" strokeWidth={2} />
                </button>
              </li>
          )}
            <li>
              <button
              type="button"
              onClick={() => setFilters({ ...emptyFilters, sort: filters.sort })}
              className="px-2 font-mono text-10 uppercase tracking-meta text-steel underline hover:text-paper">
              
                Reset
              </button>
            </li>
          </ul>
        }
      </div>

      <div className="grid gap-10 pt-8 lg:grid-cols-12 lg:gap-x-8">
        <aside className="hidden lg:col-span-3 lg:block">
          <div className="sticky top-32">{panel}</div>
        </aside>

        <div className="lg:col-span-9">
          <div className="flex items-baseline justify-between pb-5">
            <Label>
              {loading ?
              'Loading index…' :
              `${formatNumber(results.length)} ${results.length === 1 ? 'collection' : 'collections'}`}
            </Label>
            <Label className="hidden md:inline">
              Registry synced · {view === 'grid' ? 'Grid' : 'List'} view
            </Label>
          </div>

          {loading ?
          <div
            className={cn(
              view === 'grid' ? 'grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3' : 'space-y-px'
            )}>
            
              {Array.from({ length: view === 'grid' ? 6 : 8 }).map((_, i) =>
            view === 'grid' ?
            <div key={i}>
                    <Skeleton className="aspect-[4/5] w-full" />
                    <Skeleton className="mt-4 h-6 w-2/3" />
                    <Skeleton className="mt-2 h-3 w-1/3" />
                    <Skeleton className="mt-4 h-3 w-full" />
                  </div> :

            <Skeleton key={i} className="h-20 w-full" />

            )}
            </div> :
          results.length === 0 ?
          <div className="border bp-rule px-6 py-20 text-center">
              <Label>Empty result</Label>
              <p className="mx-auto mt-5 max-w-md text-2xl font-bold uppercase tracking-tight text-paper">
                No collection matches this combination
              </p>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-smoke">
                The index holds ten collections. Try removing the narrowest filter — storage and
                format are the most restrictive.
              </p>
              <ActionButton
              variant="outline"
              className="mt-8"
              onClick={() => setFilters({ ...emptyFilters, sort: filters.sort })}>
              
                Clear all filters
              </ActionButton>
            </div> :
          view === 'grid' ?
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((collection, i) =>
            <motion.div
              key={collection.slug}
              layout={!reduce}
              initial={reduce ? undefined : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: Math.min(i * 0.03, 0.18), ease: [0.23, 1, 0.32, 1] }}>
              
                  <CollectionCard collection={collection} />
                </motion.div>
            )}
            </div> :

          <div className="border-b bp-rule">
              {results.map((collection, i) =>
            <CollectionRow key={collection.slug} collection={collection} position={i + 1} />
            )}
            </div>
          }
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {drawerOpen &&
        <div className="fixed inset-0 z-[65] lg:hidden">
            <motion.button
            type="button"
            aria-label="Close filters"
            onClick={() => setDrawerOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-void/80" />
          
            <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            initial={reduce ? { opacity: 0 } : { y: '100%' }}
            animate={reduce ? { opacity: 1 } : { y: 0 }}
            exit={reduce ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
            className="absolute inset-x-0 bottom-0 max-h-[86vh] overflow-y-auto border-t border-white/20 bg-carbon p-5">
            
              <div className="mb-2 flex items-center justify-between">
                <Label className="text-paper">Filter collections</Label>
                <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close filters"
                className="flex h-9 w-9 items-center justify-center border border-white/15 text-paper">
                
                  <XIcon className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              {panel}
              <ActionButton className="mt-6 w-full" size="lg" onClick={() => setDrawerOpen(false)}>
                Show {results.length} results
              </ActionButton>
            </motion.div>
          </div>
        }
      </AnimatePresence>
    </div>);

};
