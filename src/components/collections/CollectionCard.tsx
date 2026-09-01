import React from 'react';
import { Link } from 'react-router-dom';
import { ArtCanvas } from '../art/ArtCanvas';
import { Tag } from '../ui/Tag';
import { StatusBadge } from '../ui/StatusBadge';
import { getArtist } from '../../data/artists';
import type { Collection } from '../../types';
import { cn, formatNumber, formatPrice } from '../../utils/format';

interface CollectionCardProps {
  collection: Collection;
  /** Editorial weight — drives preview proportion and type scale. */
  scale?: 'feature' | 'standard' | 'compact';
  className?: string;
}

const RATIO: Record<NonNullable<CollectionCardProps['scale']>, string> = {
  feature: 'aspect-[16/11]',
  standard: 'aspect-[4/5]',
  compact: 'aspect-[16/10]'
};

export const CollectionCard: React.FC<CollectionCardProps> = ({
  collection,
  scale = 'standard',
  className
}) => {
  const artist = getArtist(collection.artistSlug);
  const priceLabel =
  collection.status === 'Sold Out' || collection.status === 'Closed' ?
  collection.floor ?
  `Floor ${formatPrice(collection.floor, collection.currency)}` :
  'Secondary only' :
  `Mint ${formatPrice(collection.price, collection.currency)}`;

  return (
    <article className={cn('group flex h-full flex-col', className)}>
      <Link
        to={`/collection/${collection.slug}`}
        className="flex h-full flex-col focus-visible:outline-offset-4">
        
        <div className={cn('relative w-full overflow-hidden border bp-rule', RATIO[scale])}>
          <ArtCanvas
            variant={collection.art.variant}
            accent={collection.art.accent}
            seed={collection.index * 53 + 7}
            size={scale === 'feature' ? 'hero' : 'card'}
            className="absolute inset-0 h-full w-full transition-transform duration-300 ease-expo group-hover:scale-[1.02]" />
          
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-3">
            <span className="bg-ink/80 px-1.5 py-0.5 font-mono text-10 uppercase tracking-meta tabular-nums text-bone">
              {collection.id}
            </span>
            <span className="bg-ink/80 px-1.5 py-0.5">
              <StatusBadge status={collection.status} />
            </span>
          </div>
          <span
            className="pointer-events-none absolute bottom-0 left-0 h-[3px] w-0 transition-[width] duration-300 ease-expo group-hover:w-full"
            style={{ backgroundColor: collection.art.accent }}
            aria-hidden="true" />
          
        </div>

        <div className="flex flex-1 flex-col pt-4">
          <div className="flex items-baseline justify-between gap-4">
            <h3
              className={cn(
                'font-extrabold uppercase leading-none tracking-tightest text-paper transition-colors duration-150',
                scale === 'feature' ?
                'text-[clamp(1.75rem,3vw,2.75rem)]' :
                'text-[clamp(1.25rem,1.8vw,1.6rem)]'
              )}>
              
              {collection.title}
            </h3>
            <span className="shrink-0 font-mono text-10 uppercase tracking-meta text-steel">
              {collection.year}
            </span>
          </div>

          <p className="mt-2 font-mono text-10 uppercase tracking-meta text-smoke">
            {artist?.name}
          </p>

          <p
            className={cn(
              'mt-3 leading-relaxed text-bone',
              scale === 'feature' ? 'max-w-xl text-[15px]' : 'text-[13px]'
            )}>
            
            {collection.concept}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {collection.tech.slice(0, scale === 'compact' ? 2 : 3).map((t, i) =>
            <Tag key={t} tone={i === 0 ? 'accent' : 'outline'} accent={collection.art.accent}>
                {t}
              </Tag>
            )}
          </div>

          <div className="mt-auto flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t bp-rule pt-4">
            <span className="font-mono text-10 uppercase tracking-meta text-smoke">
              {collection.spec.chain} · {collection.supply ? formatNumber(collection.supply) : 'Open'}{' '}
              {collection.supply ? 'editions' : 'edition'}
            </span>
            <span className="font-mono text-10 uppercase tracking-meta text-paper">{priceLabel}</span>
          </div>
        </div>
      </Link>
    </article>);

};
