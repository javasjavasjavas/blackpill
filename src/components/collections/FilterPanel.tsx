import React, { useState } from 'react';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { Label } from '../ui/Label';
import {
  chains,
  formatOptions,
  statusOptions,
  storageOptions,
  techOptions,
  yearOptions } from
'../../data/categories';
import { collections } from '../../data/collections';
import { PRICE_ANY, activeFilterCount, type FilterState } from '../../utils/filters';
import { cn } from '../../utils/format';

interface FilterPanelProps {
  state: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onClear: () => void;
}

type Key = 'status' | 'tech' | 'chain' | 'storage' | 'format';

const countFor = (key: Key, value: string): number =>
collections.filter((c) => {
  if (key === 'status') return c.status === value;
  if (key === 'tech') return c.tech.includes(value as never);
  if (key === 'chain') return c.spec.chain === value;
  if (key === 'storage') return c.spec.storage === value;
  return c.spec.format === value;
}).length;

const Group: React.FC<{
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
}> = ({ title, children, defaultOpen = true, count }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t bp-rule py-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between text-left">
        
        <span className="flex items-center gap-2 font-mono text-10 uppercase tracking-label text-paper">
          {title}
          {count ? <span className="text-accent">{count}</span> : null}
        </span>
        {open ?
        <MinusIcon className="h-3.5 w-3.5 text-smoke" strokeWidth={1.5} /> :

        <PlusIcon className="h-3.5 w-3.5 text-smoke" strokeWidth={1.5} />
        }
      </button>
      {open && <div className="mt-4 space-y-2.5">{children}</div>}
    </div>);

};

const Check: React.FC<{
  label: string;
  checked: boolean;
  count?: number;
  onToggle: () => void;
}> = ({ label, checked, count, onToggle }) =>
<label className="group flex cursor-pointer items-center gap-3">
    <input
    type="checkbox"
    checked={checked}
    onChange={onToggle}
    className="peer sr-only" />
  
    <span
    className={cn(
      'flex h-3.5 w-3.5 shrink-0 items-center justify-center border transition-colors duration-150 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent',
      checked ? 'border-paper bg-paper' : 'border-white/30 group-hover:border-paper'
    )}
    aria-hidden="true">
    
      {checked && <span className="h-1.5 w-1.5 bg-ink" />}
    </span>
    <span
    className={cn(
      'flex-1 font-mono text-11 tracking-tight transition-colors duration-150',
      checked ? 'text-paper' : 'text-bone group-hover:text-paper'
    )}>
    
      {label}
    </span>
    {count !== undefined &&
  <span className="font-mono text-10 tabular-nums text-steel">{count}</span>
  }
  </label>;


export const FilterPanel: React.FC<FilterPanelProps> = ({ state, onChange, onClear }) => {
  const toggle = (key: Key | 'years', value: string | number) => {
    if (key === 'years') {
      const list = state.years.includes(value as number) ?
      state.years.filter((v) => v !== value) :
      [...state.years, value as number];
      onChange({ years: list });
      return;
    }
    const current = state[key];
    const list = current.includes(value as string) ?
    current.filter((v) => v !== value) :
    [...current, value as string];
    onChange({ [key]: list } as Partial<FilterState>);
  };

  const total = activeFilterCount(state);

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <Label as="div" className="text-paper">
          Filters {total > 0 && <span className="text-accent">{total}</span>}
        </Label>
        <button
          type="button"
          onClick={onClear}
          disabled={total === 0}
          className="font-mono text-10 uppercase tracking-meta text-smoke transition-colors duration-150 hover:text-paper disabled:opacity-30">
          
          Clear all
        </button>
      </div>

      <Group title="Status" count={state.status.length}>
        {statusOptions.map((s) =>
        <Check
          key={s}
          label={s}
          checked={state.status.includes(s)}
          count={countFor('status', s)}
          onToggle={() => toggle('status', s)} />

        )}
      </Group>

      <Group title="Technology" count={state.tech.length}>
        {techOptions.map((t) =>
        <Check
          key={t}
          label={t}
          checked={state.tech.includes(t)}
          count={countFor('tech', t)}
          onToggle={() => toggle('tech', t)} />

        )}
      </Group>

      <Group title="Blockchain" count={state.chain.length}>
        {chains.map((c) =>
        <Check
          key={c}
          label={c}
          checked={state.chain.includes(c)}
          count={countFor('chain', c)}
          onToggle={() => toggle('chain', c)} />

        )}
      </Group>

      <Group title="Storage" count={state.storage.length} defaultOpen={false}>
        {storageOptions.map((s) =>
        <Check
          key={s}
          label={s}
          checked={state.storage.includes(s)}
          count={countFor('storage', s)}
          onToggle={() => toggle('storage', s)} />

        )}
      </Group>

      <Group title="Format" count={state.format.length} defaultOpen={false}>
        {formatOptions.map((f) =>
        <Check
          key={f}
          label={f}
          checked={state.format.includes(f)}
          count={countFor('format', f)}
          onToggle={() => toggle('format', f)} />

        )}
      </Group>

      <Group title="Price ceiling" defaultOpen={false}>
        <div>
          <div className="flex items-center justify-between font-mono text-11 text-paper">
            <span>{state.maxPrice >= PRICE_ANY ? 'Any price' : `≤ ${state.maxPrice.toFixed(2)} ETH`}</span>
            <span className="text-steel">ETH equiv.</span>
          </div>
          <input
            type="range"
            min={0.01}
            max={PRICE_ANY}
            step={0.01}
            value={state.maxPrice}
            onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
            aria-label="Maximum price in ETH equivalent"
            className="mt-3 h-1 w-full cursor-pointer appearance-none bg-ash accent-accent" />
          
        </div>
      </Group>

      <Group title="Release year" count={state.years.length} defaultOpen={false}>
        {yearOptions.map((y) =>
        <Check
          key={y}
          label={String(y)}
          checked={state.years.includes(y)}
          count={collections.filter((c) => c.year === y).length}
          onToggle={() => toggle('years', y)} />

        )}
      </Group>
    </div>);

};