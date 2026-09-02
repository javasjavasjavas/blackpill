import React, { useMemo, useState } from 'react';
import { SearchIcon, XIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { Label } from '../ui/Label';
import { ActionButton } from '../ui/ActionButton';
import { Skeleton } from '../ui/Skeleton';
import { TokenCard } from './TokenCard';
import { TokenModal } from './TokenModal';
import { generateTokens } from '../../utils/tokens';
import { useSimulatedLoad } from '../../hooks/useUi';
import type { Collection } from '../../types';
import { cn } from '../../utils/format';

interface TokenBrowserProps {
  collection: Collection;
}

type Sort = 'number-asc' | 'number-desc' | 'price-asc' | 'price-desc';

const SORTS: {key: Sort;label: string;}[] = [
{ key: 'number-asc', label: 'Token # ascending' },
{ key: 'number-desc', label: 'Token # descending' },
{ key: 'price-asc', label: 'Price low to high' },
{ key: 'price-desc', label: 'Price high to low' }];


export const TokenBrowser: React.FC<TokenBrowserProps> = ({ collection }) => {
  const all = useMemo(() => generateTokens(collection), [collection]);
  const [query, setQuery] = useState('');
  const [traitFilter, setTraitFilter] = useState<Record<string, string>>({});
  const [listedOnly, setListedOnly] = useState(false);
  const [sort, setSort] = useState<Sort>('number-asc');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const results = useMemo(() => {
    let list = all.filter((t) => {
      if (query && !String(t.number).includes(query.replace('#', '').trim())) return false;
      if (listedOnly && !t.listed) return false;
      return Object.entries(traitFilter).every(
        ([name, value]) => !value || t.traits.find((tr) => tr.name === name)?.value === value
      );
    });
    list = [...list].sort((a, b) => {
      if (sort === 'number-asc') return a.number - b.number;
      if (sort === 'number-desc') return b.number - a.number;
      const ap = a.price ?? Infinity;
      const bp = b.price ?? Infinity;
      return sort === 'price-asc' ? ap - bp : bp - ap;
    });
    return list;
  }, [all, query, traitFilter, listedOnly, sort]);

  const loading = useSimulatedLoad([query, traitFilter, listedOnly, sort], 320);
  const activeTraits = Object.values(traitFilter).filter(Boolean).length;
  const listedCount = all.filter((t) => t.listed).length;
  const isDistricts = collection.slug === 'districts';
  const displayResults = isDistricts ? results.slice(0, 6) : results;

  return (
    <section
      aria-labelledby="tokens-title"
      className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-20">
      
      <SectionHeading
        id="tokens-title"
        index="Tokens"
        title={isDistricts ? 'Browse the collection' : 'Browse the edition'}
        description={isDistricts ?
        'A selection of example cities from the collection.' :
        `${all.length} indexed tokens · ${listedCount} currently listed. Every preview is rendered from that token's own seed.`} />
      

      {!isDistricts &&
      <div className="mt-8 flex flex-wrap items-center gap-3 border-b bp-rule pb-4">
        <div className="flex min-w-[160px] flex-1 items-center gap-2.5 border border-white/20 px-3 focus-within:border-paper">
          <SearchIcon className="h-4 w-4 shrink-0 text-smoke" strokeWidth={1.5} />
          <label htmlFor="token-search" className="sr-only">
            Search by token ID
          </label>
          <input
            id="token-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            inputMode="numeric"
            placeholder="Token ID…"
            className="h-10 w-full bg-transparent font-mono text-11 text-paper placeholder:text-steel focus:outline-none" />
          
          {query &&
          <button type="button" onClick={() => setQuery('')} aria-label="Clear token search">
              <XIcon className="h-3.5 w-3.5 text-smoke hover:text-paper" strokeWidth={1.5} />
            </button>
          }
        </div>

        {collection.traits.slice(0, 3).map((trait) =>
        <div key={trait.name}>
            <label htmlFor={`trait-${trait.name}`} className="sr-only">
              Filter by {trait.name}
            </label>
            <select
            id={`trait-${trait.name}`}
            value={traitFilter[trait.name] ?? ''}
            onChange={(e) => setTraitFilter((f) => ({ ...f, [trait.name]: e.target.value }))}
            className="h-10 border border-white/20 bg-ink px-3 font-mono text-10 uppercase tracking-meta text-paper focus:border-paper focus:outline-none">
            
              <option value="">{trait.name} — any</option>
              {trait.values.map((v) =>
            <option key={v} value={v}>
                  {v}
                </option>
            )}
            </select>
          </div>
        )}

        <button
          type="button"
          onClick={() => setListedOnly((v) => !v)}
          aria-pressed={listedOnly}
          className={cn(
            'h-10 border px-3 font-mono text-[10px] uppercase tracking-meta transition-colors duration-150',
            listedOnly ?
            'border-paper bg-paper text-ink' :
            'border-white/20 text-bone hover:border-paper hover:text-paper'
          )}>
          
          Listed only
        </button>

        <div>
          <label htmlFor="token-sort" className="sr-only">
            Sort tokens
          </label>
          <select
            id="token-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-10 border border-white/20 bg-ink px-3 font-mono text-10 uppercase tracking-meta text-paper focus:border-paper focus:outline-none">
            
            {SORTS.map((s) =>
            <option key={s.key} value={s.key}>
                {s.label}
              </option>
            )}
          </select>
        </div>
      </div>
      }

      {!isDistricts &&
      <div className="flex items-baseline justify-between py-4">
        <Label>
          {loading ? 'Reading contract…' : `${results.length} tokens`}
          {activeTraits > 0 && !loading && <span className="ml-2 text-accent">{activeTraits} traits</span>}
        </Label>
        {(activeTraits > 0 || listedOnly || query) &&
        <button
          type="button"
          onClick={() => {
            setTraitFilter({});
            setListedOnly(false);
            setQuery('');
          }}
          className="font-mono text-10 uppercase tracking-meta text-smoke underline hover:text-paper">
          
            Reset token filters
          </button>
        }
      </div>
      }

      {loading ?
      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: isDistricts ? 6 : 12 }).map((_, i) =>
        <div key={i}>
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="mt-2.5 h-3 w-1/2" />
              <Skeleton className="mt-1.5 h-3 w-2/3" />
            </div>
        )}
        </div> :
      results.length === 0 ?
      <div className="border bp-rule px-6 py-16 text-center">
          <Label>No tokens</Label>
          <p className="mx-auto mt-4 max-w-sm text-lg text-bone">
            No token in this edition matches that combination of traits.
          </p>
          <ActionButton
          variant="outline"
          size="sm"
          className="mt-6"
          onClick={() => {
            setTraitFilter({});
            setListedOnly(false);
            setQuery('');
          }}>
          
            Reset filters
          </ActionButton>
        </div> :

      <ul className={cn('grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6', isDistricts && 'mt-8')}>
          {displayResults.map((token, i) =>
        <li key={token.id}>
              <TokenCard token={token} collection={collection} onOpen={() => setOpenIndex(i)} />
            </li>
        )}
        </ul>
      }

      <TokenModal
        token={openIndex === null ? null : displayResults[openIndex] ?? null}
        collection={collection}
        onClose={() => setOpenIndex(null)}
        onPrev={() =>
        setOpenIndex((i) => i === null ? null : (i - 1 + displayResults.length) % displayResults.length)
        }
        onNext={() => setOpenIndex((i) => i === null ? null : (i + 1) % displayResults.length)} />
      
    </section>);

};
