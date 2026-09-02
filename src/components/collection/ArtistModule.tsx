import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, ArrowUpRightIcon, CheckCircle2Icon } from 'lucide-react';
import { Portrait } from '../art/Portrait';
import { SectionHeading } from '../ui/SectionHeading';
import { ActionButton } from '../ui/ActionButton';
import { Label } from '../ui/Label';
import { Tag } from '../ui/Tag';
import { ArtistLinks } from '../artists/ArtistLinks';
import { collectionsByArtist } from '../../data/collections';
import type { Artist } from '../../types';
import { formatPrice } from '../../utils/format';

interface ArtistModuleProps {
  artist: Artist;
  currentSlug?: string;
}

export const ArtistModule: React.FC<ArtistModuleProps> = ({ artist, currentSlug }) => {
  const others = collectionsByArtist(artist.slug).filter((c) => c.slug !== currentSlug);

  return (
    <section
      aria-labelledby="artist-module-title"
      className="border-t bp-rule bg-void">
      
      <div className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-20">
        <SectionHeading index="Artist" title="Behind the work" />

        <div className="mt-8 grid gap-8 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <Portrait
              seed={artist.portraitSeed}
              accent={artist.accent}
              name={artist.name}
              src={artist.portraitImage}
              detail="low"
              className={`${artist.portraitImage ? 'aspect-square' : 'aspect-[4/5]'} w-full border bp-rule`} />
            
          </div>

          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <h3
                id="artist-module-title"
                className="text-[clamp(1.75rem,3vw,2.5rem)] font-extrabold uppercase leading-none tracking-tightest text-paper">
                
                {artist.name}
              </h3>
              {artist.verified &&
              <CheckCircle2Icon
                className="h-4 w-4 shrink-0 text-volt"
                strokeWidth={1.75}
                aria-label="Verified artist" />

              }
            </div>
            <p className="mt-3 font-mono text-10 uppercase tracking-meta text-smoke">
              {artist.location} · Joined {new Date(artist.joined).getFullYear()}
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-bone">{artist.bio}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {artist.disciplines.map((d) =>
              <Tag key={d}>{d}</Tag>
              )}
            </div>

            <ArtistLinks artist={artist} className="mt-6" />

            <ActionButton to={`/artist/${artist.slug}`} variant="outline" className="mt-7">
              View Full Profile
              <ArrowRightIcon className="h-4 w-4" strokeWidth={1.5} />
            </ActionButton>
          </div>

          <div className="lg:col-span-4">
            <Label as="div">Other collections on Black Pill</Label>
            {others.length === 0 ?
            <p className="mt-4 text-[13px] leading-relaxed text-smoke">
                This is {artist.name}’s only release on Black Pill so far.
              </p> :

            <ul className="mt-4">
                {others.map((c) =>
              <li key={c.slug}>
                    <Link
                  to={`/collection/${c.slug}`}
                  className="group flex items-center justify-between gap-4 border-t bp-rule py-3.5 transition-colors duration-150 hover:bg-white/[0.03]">
                  
                      <span className="min-w-0">
                        <span className="block truncate text-[15px] font-bold uppercase tracking-tight text-paper">
                          {c.title}
                        </span>
                        <span className="mt-1 block font-mono text-10 uppercase tracking-meta text-steel">
                          {c.year} · {c.spec.chain} ·{' '}
                          {c.status === 'Sold Out' || c.status === 'Closed' ?
                      c.floor ?
                      `Floor ${formatPrice(c.floor, c.currency)}` :
                      'Secondary' :
                      formatPrice(c.price, c.currency)}
                        </span>
                      </span>
                      <ArrowUpRightIcon
                    className="h-4 w-4 shrink-0 text-steel transition-colors duration-150 group-hover:text-paper"
                    strokeWidth={1.5} />
                  
                    </Link>
                  </li>
              )}
              </ul>
            }
          </div>
        </div>
      </div>
    </section>);

};
