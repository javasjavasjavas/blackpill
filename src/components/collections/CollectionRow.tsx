import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { ArtCanvas } from '../art/ArtCanvas';
import { Tag } from '../ui/Tag';
import { StatusBadge } from '../ui/StatusBadge';
import { getArtist } from '../../data/artists';
import type { Collection } from '../../types';
import { formatNumber, formatPrice, indexLabel } from '../../utils/format';

interface CollectionRowProps {
  collection: Collection;
  position: number;
}

/** Dense list row for the directory's list view. */
export const CollectionRow: React.FC<CollectionRowProps> = ({ collection, position }) => {
  const artist = getArtist(collection.artistSlug);
  const price =
  collection.status === 'Sold Out' || collection.status === 'Closed' ?
  collection.floor ?
  `Floor ${formatPrice(collection.floor, collection.currency)}` :
  '—' :
  formatPrice(collection.price, collection.currency);

  return (
    <Link
      to={`/collection/${collection.slug}`}
      className="group grid grid-cols-12 items-center gap-4 border-t bp-rule py-4 transition-colors duration-150 hover:bg-white/[0.03]">
      
      <span className="col-span-2 hidden font-mono text-10 tabular-nums text-steel lg:block">
        {indexLabel(position)}
        <span className="ml-3 text-smoke">{collection.id}</span>
      </span>

      <div className="col-span-4 flex min-w-0 items-center gap-4 lg:col-span-3">
        <div className="relative hidden h-14 w-20 shrink-0 overflow-hidden border bp-rule sm:block">
          <ArtCanvas
            variant={collection.art.variant}
            accent={collection.art.accent}
            seed={collection.index * 53 + 7}
            size="thumb"
            className="absolute inset-0 h-full w-full" />
          
        </div>
        <span className="min-w-0">
          <span className="block truncate text-lg font-bold uppercase tracking-tight text-paper">
            {collection.title}
          </span>
          <span className="block truncate font-mono text-10 uppercase tracking-meta text-smoke">
            {artist?.name}
          </span>
        </span>
      </div>

      <p className="col-span-4 hidden truncate text-[13px] text-bone xl:block">
        {collection.concept}
      </p>

      <div className="col-span-4 hidden flex-wrap gap-1.5 lg:flex xl:hidden">
        {collection.tech.slice(0, 2).map((t) =>
        <Tag key={t}>{t}</Tag>
        )}
      </div>

      <span className="col-span-4 text-right font-mono text-10 uppercase tracking-meta text-smoke sm:col-span-3 lg:col-span-1 lg:text-left">
        {collection.spec.chain}
      </span>

      <span className="hidden font-mono text-10 uppercase tracking-meta tabular-nums text-smoke lg:col-span-1 lg:block">
        {collection.supply ? formatNumber(collection.supply) : 'Open'}
      </span>

      <span className="col-span-4 text-right font-mono text-11 tabular-nums text-paper sm:col-span-3 lg:col-span-1">
        {price}
      </span>

      <span className="col-span-12 flex items-center justify-between sm:col-span-4 lg:col-span-2 lg:justify-end lg:gap-4">
        <StatusBadge status={collection.status} />
        <ArrowUpRightIcon
          className="h-4 w-4 text-steel transition-colors duration-150 group-hover:text-paper"
          strokeWidth={1.5} />
        
      </span>
    </Link>);

};
