import React, { useMemo, useState } from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { ActionButton } from '../ui/ActionButton';
import { FeaturedDrop } from '../drops/FeaturedDrop';
import { Reveal } from '../ui/Reveal';
import { drops } from '../../data/drops';
import { getCollection } from '../../data/collections';
import { cn } from '../../utils/format';

type Tab = 'Upcoming' | 'Live' | 'Recently Closed';

const TABS: Tab[] = ['Upcoming', 'Live', 'Recently Closed'];

export const NextDrops: React.FC = () => {
  const [tab, setTab] = useState<Tab>('Upcoming');
  const [reminders, setReminders] = useState<string[]>([]);

  const list = useMemo(() => {
    const matches = drops.filter((d) =>
    tab === 'Upcoming' ?
    d.phase === 'Upcoming' || d.phase === 'Allowlist' :
    tab === 'Live' ?
    d.phase === 'Live' :
    d.phase === 'Recently Closed'
    );
    return matches.
    map((d) => ({ drop: d, collection: getCollection(d.collectionSlug)! })).
    filter((x) => Boolean(x.collection)).
    sort((a, b) => {
      if (tab === 'Upcoming' && a.drop.featured !== b.drop.featured) {
        return a.drop.featured ? -1 : 1;
      }
      return tab === 'Recently Closed' ?
      new Date(b.drop.date).getTime() - new Date(a.drop.date).getTime() :
      new Date(a.drop.date).getTime() - new Date(b.drop.date).getTime();
    });
  }, [tab]);

  const feature = list[0];

  return (
    <section aria-labelledby="drops-title" className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-24">
      <SectionHeading
        id="drops-title"
        index="003 — Drops"
        title="Genesis Drop"
        className="border-t-0" />
      

      <div
        role="tablist"
        aria-label="Drop status"
        className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-b bp-rule pb-4">
        
        {TABS.map((t) => {
          const count = drops.filter((d) =>
          t === 'Upcoming' ?
          d.phase === 'Upcoming' || d.phase === 'Allowlist' :
          t === 'Live' ?
          d.phase === 'Live' :
          d.phase === 'Recently Closed'
          ).length;
          const active = tab === t;
          return (
            <button
              key={t}
              role="tab"
              type="button"
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
      <div className="mt-10">
          <Reveal key={`${tab}-feature`}>
            <FeaturedDrop
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
          
          </Reveal>

        </div> :

      <div className="mt-10 border bp-rule px-6 py-16 text-center">
          <Label>Nothing here</Label>
          <p className="mx-auto mt-4 max-w-sm text-lg text-bone">
            No {tab.toLowerCase()} drops right now. New releases are announced roughly twice a month.
          </p>
          <ActionButton variant="outline" size="sm" className="mt-6" onClick={() => setTab('Live')}>
            See live mints
          </ActionButton>
        </div>
      }
    </section>);

};
