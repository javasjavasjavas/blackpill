import React, { useMemo, useState } from 'react';
import { FeaturedDrop } from '../components/drops/FeaturedDrop';
import { DropRow } from '../components/drops/DropRow';
import { Label } from '../components/ui/Label';
import { ActionButton } from '../components/ui/ActionButton';
import { drops } from '../data/drops';
import { getCollection } from '../data/collections';
import { cn } from '../utils/format';

type Tab = 'Upcoming' | 'Live' | 'Recently Closed';

const TABS: Tab[] = ['Upcoming', 'Live', 'Recently Closed'];

const matches = (phase: string, tab: Tab) =>
tab === 'Upcoming' ?
phase === 'Upcoming' || phase === 'Allowlist' :
tab === 'Live' ?
phase === 'Live' :
phase === 'Recently Closed';

export const Drops: React.FC = () => {
  const [tab, setTab] = useState<Tab>('Upcoming');
  const [reminders, setReminders] = useState<string[]>([]);

  const list = useMemo(
    () =>
    drops.
    filter((d) => matches(d.phase, tab)).
    map((d) => ({ drop: d, collection: getCollection(d.collectionSlug)! })).
    filter((x) => Boolean(x.collection)).
    sort((a, b) =>
    tab === 'Recently Closed' ?
    new Date(b.drop.date).getTime() - new Date(a.drop.date).getTime() :
    new Date(a.drop.date).getTime() - new Date(b.drop.date).getTime()
    ),
    [tab]
  );

  const [feature, ...rest] = list;

  return (
    <div className="mx-auto max-w-frame px-5 pb-24 pt-10 lg:px-10">
      <header className="border-b bp-rule pb-10">
        <Label>Upcoming and live projects</Label>
        <h1 className="mt-5 text-title font-extrabold uppercase text-paper">Drops</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone">
          One release at a time, reviewed for technical originality before it is scheduled. Mint
          windows, allowlist phases and exact countdowns are listed below.
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Drop status"
        className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b bp-rule py-4">
        
        {TABS.map((t) => {
          const count = drops.filter((d) => matches(d.phase, t)).length;
          const active = tab === t;
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t)}
              className={cn(
                'group flex items-baseline gap-2 font-mono text-[10px] uppercase tracking-meta transition-colors duration-150',
                active ? 'text-paper' : 'text-steel hover:text-bone'
              )}>
              
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-colors duration-150',
                  active ? 'bg-accent' : 'bg-steel group-hover:bg-smoke'
                )}
                aria-hidden="true" />
              
              {t}
              <span className="tabular-nums text-steel">{count}</span>
            </button>);

        })}
      </div>

      {feature ?
      <>
          <div className="py-12">
            <FeaturedDrop
            key={feature.drop.id}
            drop={feature.drop}
            collection={feature.collection}
            reminded={reminders.includes(feature.drop.id)}
            onRemind={() =>
            setReminders((r) =>
            r.includes(feature.drop.id) ?
            r.filter((x) => x !== feature.drop.id) :
            [...r, feature.drop.id]
            )
            } />
          
          </div>

          {rest.length > 0 &&
        <div className="border-t bp-rule pt-8">
              <Label as="div">
                {tab === 'Recently Closed' ? 'Earlier releases' : 'Also in the schedule'}
              </Label>
              <div className="mt-4">
                {rest.map((item) =>
            <DropRow key={item.drop.id} drop={item.drop} collection={item.collection} />
            )}
              </div>
            </div>
        }
        </> :

      <div className="my-12 border bp-rule px-6 py-20 text-center">
          <Label>Nothing scheduled</Label>
          <p className="mx-auto mt-5 max-w-md text-2xl font-bold uppercase tracking-tight text-paper">
            No {tab.toLowerCase()} drops
          </p>
          <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-smoke">
            New releases are announced roughly twice a month. Subscribe below to hear first.
          </p>
          <ActionButton variant="outline" className="mt-8" onClick={() => setTab('Live')}>
            See live mints
          </ActionButton>
        </div>
      }
    </div>);

};
