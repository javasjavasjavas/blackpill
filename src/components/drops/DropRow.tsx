import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon } from 'lucide-react';
import { ArtCanvas } from '../art/ArtCanvas';
import { StatusBadge } from '../ui/StatusBadge';
import { useCountdown } from '../../hooks/useCountdown';
import { getArtist } from '../../data/artists';
import type { Collection, Drop } from '../../types';
import { formatDate, formatPrice, pad } from '../../utils/format';

interface DropRowProps {
  drop: Drop;
  collection: Collection;
}

export const DropRow: React.FC<DropRowProps> = ({ drop, collection }) => {
  const artist = getArtist(collection.artistSlug);
  const { days, hours, minutes, seconds, isPast } = useCountdown(drop.date);

  return (
    <Link
      to={`/collection/${collection.slug}`}
      className="group flex items-center gap-4 border-t bp-rule py-4 transition-colors duration-150 hover:bg-white/[0.03]">
      
      <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden border bp-rule sm:block">
        <ArtCanvas
          variant={collection.art.variant}
          accent={collection.art.accent}
          seed={collection.index * 29 + 5}
          size="thumb"
          className="absolute inset-0 h-full w-full" />
        
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3">
          <h4 className="truncate text-lg font-bold uppercase leading-none tracking-tight text-paper">
            {collection.title}
          </h4>
          <span className="shrink-0 font-mono text-10 tabular-nums text-steel">{drop.id}</span>
        </div>
        <p className="mt-1.5 truncate font-mono text-10 uppercase tracking-meta text-smoke">
          {artist?.name} · {collection.spec.chain} ·{' '}
          {formatPrice(collection.price, collection.currency)}
        </p>
      </div>

      <div className="hidden shrink-0 text-right sm:block">
        <p className="font-mono text-[13px] tabular-nums text-paper">
          {isPast ? formatDate(drop.date) : `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`}
        </p>
        <p className="mt-1">
          <StatusBadge status={drop.phase} />
        </p>
      </div>

      <ArrowUpRightIcon
        className="h-4 w-4 shrink-0 text-steel transition-colors duration-150 group-hover:text-paper"
        strokeWidth={1.5} />
      
    </Link>);

};
