import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRightIcon, CheckCircle2Icon } from 'lucide-react';
import { Portrait } from '../components/art/Portrait';
import { Label } from '../components/ui/Label';
import { Reveal } from '../components/ui/Reveal';
import { SocialIcon } from '../components/ui/SocialIcon';
import { registryArtists } from '../data/artists';
import { collectionsByArtist } from '../data/collections';
import { indexLabel } from '../utils/format';

export const ArtistsIndex: React.FC = () =>
<div className="mx-auto max-w-frame px-5 pb-24 pt-10 lg:px-10">
    <header className="pb-10">
      <Label>Featured Artists</Label>
      <h1 className="mt-5 text-title font-extrabold uppercase text-paper">Artists</h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-bone">
        Meet the featured artists whose distinctive ideas, practices and perspectives are shaping
        the next generation of digital collectibles.
      </p>
    </header>

    <ul className="pt-6">
      {registryArtists.map((artist, i) => {
      const works = collectionsByArtist(artist.slug);
      const xHandle = artist.links.x?.replace(/^@/, '');
      return (
        <li key={artist.slug}>
            <Reveal delay={Math.min(i * 0.03, 0.15)}>
              <div className="group grid grid-cols-12 items-center gap-6 border-t bp-rule p-8 transition-colors duration-150 hover:bg-white/[0.03]">
              
                <span className="col-span-1 hidden font-mono text-10 tabular-nums text-steel lg:block">
                  {indexLabel(i + 1)}
                </span>

                <Link
                  to={`/artist/${artist.slug}`}
                  className="col-span-4 block w-full max-w-[160px] sm:col-span-3 lg:col-span-2">
                  <Portrait
                    seed={artist.portraitSeed}
                    accent={artist.accent}
                    name={artist.name}
                    src={artist.portraitImage}
                    detail="low"
                    className="aspect-square w-full border bp-rule" />
                </Link>
              

                <span className="col-span-8 min-w-0 sm:col-span-3 lg:col-span-2">
                  <span className="flex items-center gap-2">
                    <Link
                      to={`/artist/${artist.slug}`}
                      className={`${artist.name.length > 13 ? 'text-base' : 'text-xl'} truncate font-extrabold uppercase leading-none tracking-tightest text-paper transition-colors duration-150 group-hover:text-accent`}>
                      {artist.name}
                    </Link>
                    {artist.verified &&
                  <CheckCircle2Icon
                    className="h-3.5 w-3.5 shrink-0 text-volt"
                    strokeWidth={2}
                    aria-label="Verified" />

                  }
                  </span>
                  <span className="mt-1.5 block font-mono text-10 uppercase tracking-meta text-smoke">
                    {artist.location}
                  </span>
                </span>

                <span className="col-span-12 text-[13px] leading-relaxed text-bone sm:col-span-4 lg:col-span-3">
                  {artist.focus}
                </span>

                <span className="col-span-8 sm:col-span-2 lg:col-span-2">
                  {xHandle ?
                  <a
                    href={`https://x.com/${xHandle}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center gap-2 font-mono text-10 tracking-meta text-smoke transition-colors duration-150 hover:text-paper">
                      <SocialIcon network="x" className="h-3.5 w-3.5" />
                      <span>{artist.links.x}</span>
                    </a> :
                  <span className="font-mono text-10 text-smoke">—</span>
                  }
                </span>

                <span className="col-span-2 font-mono text-10 uppercase tracking-meta tabular-nums text-smoke sm:col-span-1 lg:col-span-1">
                  {works.length} {works.length === 1 ? 'work' : 'works'}
                </span>

                <Link
                  to={`/artist/${artist.slug}`}
                  aria-label={`View ${artist.name}`}
                  className="col-span-2 flex justify-end sm:col-span-1">
                  <ArrowUpRightIcon
                  className="h-4 w-4 text-steel transition-colors duration-150 group-hover:text-paper"
                  strokeWidth={1.5} />
                
                </Link>
              </div>
            </Reveal>
          </li>);

    })}
    </ul>
  </div>;
