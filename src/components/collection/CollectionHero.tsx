import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BellIcon,
  CheckIcon,
  ExternalLinkIcon,
  LoaderIcon,
  MinusIcon,
  PlusIcon,
  Share2Icon } from
'lucide-react';
import { ArtCanvas } from '../art/ArtCanvas';
import { ActionButton } from '../ui/ActionButton';
import { CountdownDisplay } from '../ui/CountdownDisplay';
import { DistrictsPreview } from '../ui/DistrictsPreview';
import { Label } from '../ui/Label';
import { StatusBadge } from '../ui/StatusBadge';
import { Tag } from '../ui/Tag';
import { useWallet } from '../../contexts/WalletContext';
import { dropForCollection } from '../../data/drops';
import type { Artist, Collection } from '../../types';
import { cn, formatDateTime, formatNumber, formatPrice, truncateAddress } from '../../utils/format';

interface CollectionHeroProps {
  collection: Collection;
  artist: Artist;
}

type MintState = 'idle' | 'minting' | 'success' | 'error';

export const CollectionHero: React.FC<CollectionHeroProps> = ({ collection, artist }) => {
  const { status: walletStatus, openModal } = useWallet();
  const [mintState, setMintState] = useState<MintState>('idle');
  const [quantity, setQuantity] = useState(1);
  const [reminded, setReminded] = useState(false);
  const [shared, setShared] = useState(false);
  const htmlPreviewUrl = collection.art.htmlPreview ?
    `${import.meta.env.BASE_URL}${collection.art.htmlPreview}` :
    null;
  const imagePreviewUrl = collection.art.imagePreview ?? null;
  const scheduledDrop = dropForCollection(collection.slug);
  const editorialCollection = !scheduledDrop;

  const upcoming = !!scheduledDrop &&
    (scheduledDrop.phase === 'Upcoming' || scheduledDrop.phase === 'Allowlist');
  const closed = collection.status === 'Sold Out' || collection.status === 'Closed';
  const progress = collection.supply ?
  Math.round(collection.minted / collection.supply * 100) :
  100;

  const mint = () => {
    if (walletStatus !== 'connected') {
      openModal();
      return;
    }
    setMintState('minting');
    window.setTimeout(() => setMintState('success'), 1800);
  };

  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      window.setTimeout(() => setShared(false), 1800);
    } catch {
      setShared(false);
    }
  };

  return (
    <section aria-labelledby="collection-title" className="mx-auto max-w-frame px-5 pt-5 lg:px-10">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bp-rule py-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 font-mono text-10 uppercase tracking-meta text-steel">
            <li>
              <Link to={editorialCollection ? '/collections' : '/drops'} className="hover:text-paper">
                {editorialCollection ? 'Collections' : 'Drops'}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-bone">{collection.title}</li>
          </ol>
        </nav>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 font-mono text-10 uppercase tracking-meta text-bone transition-colors duration-150 hover:border-paper hover:text-paper">
            
            {shared ?
            <CheckIcon className="h-3.5 w-3.5 text-volt" strokeWidth={2} /> :

            <Share2Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
            }
            {shared ? 'Link copied' : 'Share'}
          </button>
          {collection.spec.contract !== 'TBA' &&
          <a
            href="https://etherscan.io"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 font-mono text-10 uppercase tracking-meta text-bone transition-colors duration-150 hover:border-paper hover:text-paper">
            
            <ExternalLinkIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
            View Contract
          </a>
          }
        </div>
      </div>

      <div className="grid gap-8 py-10 lg:grid-cols-12 lg:gap-x-10">
        {/* Artwork */}
        <div className={editorialCollection ? 'lg:col-span-5' : 'lg:col-span-7 xl:col-span-8'}>
          <div className={cn('relative w-full overflow-hidden border bp-rule', htmlPreviewUrl || imagePreviewUrl ? 'aspect-square' : 'aspect-[4/3]')}>
            {htmlPreviewUrl ?
            <DistrictsPreview
              title={collection.title}
              className="absolute inset-0"
              interactive
              autoLoad
            /> : imagePreviewUrl ?
            <img
              src={imagePreviewUrl}
              alt={`Preview of ${collection.title}`}
              decoding="async"
              className="absolute inset-0 h-full w-full bg-ink object-contain" /> :
            <ArtCanvas
              variant={collection.art.variant}
              accent={collection.art.accent}
              seed={collection.index * 13 + 21}
              size="hero"
              className="absolute inset-0 h-full w-full"
              label={`Live preview of ${collection.title} by ${artist.name}`} />
            }
            {!htmlPreviewUrl &&
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4">
              <span className="bg-ink/85 px-2 py-1 font-mono text-10 uppercase tracking-meta text-bone">
                {collection.spec.format} · live render
              </span>
              <span className="bg-ink/85 px-2 py-1">
                {editorialCollection ?
                <span className="font-mono text-10 uppercase tracking-meta text-bone">Collection</span> :
                <StatusBadge status={collection.status} />}
              </span>
            </div>
            }
          </div>
          <p className="mt-3 font-mono text-10 uppercase tracking-label text-steel">
            {htmlPreviewUrl ?
            'Interactive HTML preview rendered live in the browser.' : imagePreviewUrl ?
            'Animated collection preview.' :
            'Preview generated in-browser from the same rule set as the contract renderer. Interaction and audio are available inside the token view.'}
          </p>
        </div>

        {/* Title + mint */}
        <div className={editorialCollection ? 'lg:col-span-7' : 'lg:col-span-5 xl:col-span-4'}>
          <h1
            id="collection-title"
            className="text-[clamp(2.25rem,4.5vw,3.75rem)] font-extrabold uppercase leading-[0.88] tracking-tightest text-paper">
            
            {collection.title}
          </h1>
          <p className="mt-4 font-mono text-11 uppercase tracking-meta text-smoke">
            <Link to={`/artist/${artist.slug}`} className="text-paper hover:text-accent">
              {artist.name}
            </Link>
            {' · '}
            {artist.location}
          </p>

          <p className="mt-6 text-lg leading-relaxed text-bone">{collection.concept}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {collection.tech.map((t, i) =>
            <Tag key={t} tone={i === 0 ? 'accent' : 'outline'} accent={collection.art.accent}>
                {t}
              </Tag>
            )}
          </div>

          {/* Mint panel */}
          <div className="mt-8 border bp-rule">
            {editorialCollection ?
            <div className="p-5">
                <Label>Published collection</Label>
                {collection.marketplaceUrl &&
                <div className="mt-4">
                    <ActionButton href={collection.marketplaceUrl}>
                      View on OpenSea
                      <ExternalLinkIcon className="h-4 w-4" strokeWidth={1.5} />
                    </ActionButton>
                  </div>
                }
              </div> :
            upcoming ?
            <div className="p-5">
                <Label>Opens</Label>
                <div className="mt-3">
                  <CountdownDisplay date={collection.dropDate} />
                </div>
                <p className="mt-4 font-mono text-10 uppercase tracking-label text-steel">
                  {formatDateTime(collection.dropDate)}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <ActionButton onClick={() => setReminded((r) => !r)}>
                    <BellIcon className="h-4 w-4" strokeWidth={1.5} />
                    {reminded ? 'Reminder set' : 'Get Reminder'}
                  </ActionButton>
                  {collection.slug !== 'districts' &&
                  <ActionButton variant="outline" onClick={openModal}>
                      Check allowlist
                    </ActionButton>
                  }
                </div>
              </div> :

            <div className="p-5">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <Label>{closed ? 'Floor' : 'Mint price'}</Label>
                    <p className="mt-2 font-display text-3xl font-extrabold tabular-nums tracking-tightest text-paper">
                      {closed ?
                    collection.floor ?
                    formatPrice(collection.floor, collection.currency) :
                    '—' :
                    formatPrice(collection.price, collection.currency)}
                    </p>
                  </div>
                  <div className="text-right">
                    <Label>Minted</Label>
                    <p className="mt-2 font-mono text-[13px] tabular-nums text-paper">
                      {formatNumber(collection.minted)}
                      {collection.supply ? ` / ${formatNumber(collection.supply)}` : ' / open'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-[3px] w-full bg-ash" role="presentation">
                  <div
                  className="h-full transition-[width] duration-300 ease-expo"
                  style={{ width: `${progress}%`, backgroundColor: collection.art.accent }} />
                
                </div>
                <p className="mt-2 font-mono text-10 uppercase tracking-label text-steel">
                  {progress}% minted · {collection.spec.chain}
                </p>

                {!closed &&
              <>
                    <div className="mt-5 flex items-center justify-between border-t bp-rule pt-5">
                      <Label>Quantity</Label>
                      <div className="flex items-center border border-white/20">
                        <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="flex h-9 w-9 items-center justify-center text-smoke hover:text-paper">
                      
                          <MinusIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                        <span className="w-10 text-center font-mono text-[13px] tabular-nums text-paper">
                          {quantity}
                        </span>
                        <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(5, q + 1))}
                      aria-label="Increase quantity"
                      className="flex h-9 w-9 items-center justify-center text-smoke hover:text-paper">
                      
                          <PlusIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>

                    <div className="mt-5">
                      {mintState === 'success' ?
                  <div className="border border-volt/40 bg-volt/[0.07] p-4">
                          <p className="inline-flex items-center gap-2 font-mono text-10 uppercase tracking-meta text-volt">
                            <CheckIcon className="h-3.5 w-3.5" strokeWidth={2} />
                            Mint confirmed
                          </p>
                          <p className="mt-2 text-[13px] leading-relaxed text-bone">
                            {quantity} {quantity === 1 ? 'token' : 'tokens'} minted. Transaction{' '}
                            {truncateAddress('0x91fA2c78De0b41539Ac7e2F108d6B47a3C5e9D02', 10, 8)}.
                          </p>
                        </div> :

                  <ActionButton
                    size="lg"
                    className="w-full"
                    onClick={mint}
                    disabled={mintState === 'minting'}>
                    
                          {mintState === 'minting' ?
                    <>
                              <LoaderIcon className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                              Confirm in wallet
                            </> :
                    walletStatus === 'connected' ?
                    `Mint — ${(collection.price * quantity).toFixed(3)} ${collection.currency}` :

                    'Connect wallet to mint'
                    }
                        </ActionButton>
                  }
                    </div>
                  </>
              }

                {closed &&
              <div className="mt-5 border-t bp-rule pt-5">
                    <ActionButton variant="outline" size="lg" className="w-full" disabled>
                      {collection.status === 'Sold Out' ? 'Sold out' : 'Mint closed'}
                    </ActionButton>
                    <p className="mt-3 font-mono text-10 uppercase tracking-label text-steel">
                      Available on secondary — see token browser below
                    </p>
                  </div>
              }
              </div>
            }
          </div>

          <dl
            className={cn(
              'mt-6 grid grid-cols-2 gap-x-6 gap-y-5 border-t bp-rule pt-6'
            )}>
            
            {[
            { k: 'Supply', v: editorialCollection || collection.slug === 'districts' ? 'TBA' : collection.supply ? formatNumber(collection.supply) : 'Open edition' },
            { k: 'Storage', v: collection.spec.storage },
            editorialCollection || collection.slug === 'districts' ?
            { k: 'Chain', v: collection.spec.chain } :
            { k: 'Standard', v: collection.spec.tokenStandard },
            editorialCollection ?
            { k: 'Released', v: collection.spec.releaseDate } :
            collection.slug === 'districts' ?
            { k: 'Price', v: 'TBA' } :
            { k: 'Released', v: collection.spec.releaseDate }].
            map((m) =>
            <div key={m.k}>
                <dt className="font-mono text-10 uppercase tracking-label text-steel">{m.k}</dt>
                <dd className="mt-1.5 font-mono text-[13px] uppercase text-paper">{m.v}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </section>);

};
