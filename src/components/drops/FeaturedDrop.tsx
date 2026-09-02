import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BellIcon } from 'lucide-react';
import { ArtCanvas } from '../art/ArtCanvas';
import { ActionButton } from '../ui/ActionButton';
import { CountdownDisplay } from '../ui/CountdownDisplay';
import { DistrictsPreview } from '../ui/DistrictsPreview';
import { Label } from '../ui/Label';
import { Tag } from '../ui/Tag';
import { getArtist } from '../../data/artists';
import type { Collection, Drop } from '../../types';
import { cn, formatNumber, formatPrice } from '../../utils/format';

interface FeaturedDropProps {
  drop: Drop;
  collection: Collection;
  onRemind?: () => void;
  reminded?: boolean;
  autoLoadHtmlPreview?: boolean;
}

export const FeaturedDrop: React.FC<FeaturedDropProps> = ({
  drop,
  collection,
  onRemind,
  reminded,
  autoLoadHtmlPreview = false
}) => {
  const artist = getArtist(collection.artistSlug);
  const upcoming = drop.phase === 'Upcoming' || drop.phase === 'Allowlist';
  const htmlPreviewUrl = collection.art.htmlPreview ?
    `${import.meta.env.BASE_URL}${collection.art.htmlPreview}` :
    null;
  const metrics = [
    { k: 'Chain', v: collection.spec.chain },
    { k: 'Supply', v: collection.slug === 'districts' ? 'TBA' : collection.supply ? formatNumber(collection.supply) : 'Open' },
    { k: 'Price', v: collection.slug === 'districts' ? 'TBA' : formatPrice(collection.price, collection.currency) },
    ...(collection.slug === 'districts' ? [] : [{ k: 'Category', v: collection.tech[0] }])
  ];

  return (
    <article className="grid gap-8 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-7">
        <Link
          to={`/collection/${collection.slug}`}
          className="group block">
          
          <div
            className={cn(
              'relative w-full overflow-hidden border bp-rule',
              htmlPreviewUrl ? 'aspect-square' : 'aspect-[16/11]'
            )}>
            {htmlPreviewUrl ?
            <DistrictsPreview
              title={collection.title}
              className="absolute inset-0"
              interactive={autoLoadHtmlPreview}
              autoLoad={autoLoadHtmlPreview}
            /> :
            <ArtCanvas
              variant={collection.art.variant}
              accent={collection.art.accent}
              seed={collection.index * 91 + 3}
              size="hero"
              className="absolute inset-0 h-full w-full"
              label={`Preview of ${collection.title}`} />
            }
            
            <span
              className="pointer-events-none absolute bottom-0 left-0 h-1 w-0 transition-[width] duration-300 ease-expo group-hover:w-full"
              style={{ backgroundColor: collection.art.accent }}
              aria-hidden="true" />
            
          </div>
        </Link>
      </div>

      <div className="flex flex-col lg:col-span-5">
        {!upcoming && <Label>Now minting</Label>}
        <h3
          className={cn(
            'text-[clamp(2rem,4vw,3.25rem)] font-extrabold uppercase leading-[0.9] tracking-tightest text-paper',
            !upcoming && 'mt-4'
          )}>
          <Link to={`/collection/${collection.slug}`} className="hover:text-accent">
            {collection.title}
          </Link>
        </h3>
        {collection.slug === 'districts' ?
        <p className="mt-3 font-mono text-[11px] uppercase tracking-meta text-smoke">
            By Jav -{' '}
            <a
              href="https://x.com/javpixel_art"
              target="_blank"
              rel="noreferrer noopener"
              className="text-paper transition-colors duration-150 hover:text-accent">
              @javpixel_art
            </a>
          </p> :
        <p className="mt-3 font-mono text-11 uppercase tracking-meta text-smoke">
            {artist?.name} · {artist?.location}
          </p>
        }
        <p className="mt-5 max-w-md text-[15px] leading-relaxed text-bone">{collection.concept}</p>

        <div className="mt-7 flex flex-wrap gap-1.5">
          {collection.tech.map((t, i) =>
          <Tag key={t} tone={i === 0 ? 'accent' : 'outline'} accent={collection.art.accent}>
              {t}
            </Tag>
          )}
        </div>

        <div className="mt-8 border-t bp-rule pt-6">
          <Label>{upcoming ? 'Opens in' : 'Mint window'}</Label>
          <div className="mt-4">
            <CountdownDisplay date={drop.date} size="lg" />
          </div>
        </div>

        <dl
          className={cn(
            'mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t bp-rule pt-6',
            collection.slug === 'districts' ? 'sm:grid-cols-3' : 'sm:grid-cols-4'
          )}>
          {metrics.map((m) =>
          <div key={m.k}>
              <dt className="font-mono text-10 uppercase tracking-label text-steel">{m.k}</dt>
              <dd className="mt-1 font-mono text-[13px] uppercase text-paper">{m.v}</dd>
            </div>
          )}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          <ActionButton to={`/collection/${collection.slug}`}>
            View Drop
            <ArrowRightIcon className="h-4 w-4" strokeWidth={1.5} />
          </ActionButton>
          {upcoming && onRemind &&
          <ActionButton variant="outline" onClick={onRemind}>
              <BellIcon className="h-4 w-4" strokeWidth={1.5} />
              {reminded ? 'Reminder set' : 'Get Reminder'}
            </ActionButton>
          }
        </div>
      </div>
    </article>);

};
