import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2Icon, Globe2Icon, Layers3Icon } from 'lucide-react';
import { Portrait } from '../components/art/Portrait';
import { CollectionCard } from '../components/collections/CollectionCard';
import { DropRow } from '../components/drops/DropRow';
import { SocialIcon } from '../components/ui/SocialIcon';
import { Label } from '../components/ui/Label';
import { Tag } from '../components/ui/Tag';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Reveal } from '../components/ui/Reveal';
import { NotFound } from './NotFound';
import { getArtist } from '../data/artists';
import { collectionsByArtist } from '../data/collections';
import { drops } from '../data/drops';

export const ArtistProfile: React.FC = () => {
  const { slug } = useParams<{slug: string;}>();
  const artist = slug ? getArtist(slug) : undefined;

  if (!artist) {
    return (
      <NotFound
        title="Artist not in registry"
        message="No artist profile matches that identifier. Browse the full roster instead." />);


  }

  const works = collectionsByArtist(artist.slug);
  const websiteUrl = artist.links.website ?
    artist.links.website.startsWith('http') ? artist.links.website : `https://${artist.links.website}` :
    null;
  const xHandle = artist.links.x?.replace(/^@/, '');
  const xUrl = xHandle ? `https://x.com/${xHandle}` : null;
  const upcoming = drops.filter(
    (d) =>
    (d.phase === 'Upcoming' || d.phase === 'Allowlist') &&
    works.some((w) => w.slug === d.collectionSlug)
  );

  return (
    <div>
      {/* Header */}
      <header className="border-b bp-rule">
        <div className="mx-auto max-w-frame px-5 lg:px-10">
          <nav aria-label="Breadcrumb" className="border-b bp-rule py-4">
            <ol className="flex items-center gap-2 font-mono text-10 uppercase tracking-meta text-steel">
              <li>
                <Link to="/artists" className="hover:text-paper">
                  Artists
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-bone">{artist.name}</li>
            </ol>
          </nav>

          <div className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-x-10 lg:py-16">
            <div className="lg:col-span-4">
              <Portrait
                seed={artist.portraitSeed}
                accent={artist.accent}
                name={artist.name}
                src={artist.portraitImage}
                className={`${artist.portraitImage ? 'aspect-square' : 'aspect-[4/5]'} w-full border bp-rule`} />
              
            </div>

            <div className="lg:col-span-8">
              <Label>
                Artist profile · {artist.location} · Joined{' '}
                {new Date(artist.joined).getFullYear()}
              </Label>
              <div className="mt-5 flex items-start gap-4">
                <h1 className="text-mega font-extrabold uppercase text-paper">{artist.name}</h1>
                {artist.verified &&
                <CheckCircle2Icon
                  className="mt-3 h-6 w-6 shrink-0 text-volt"
                  strokeWidth={1.75}
                  aria-label="Verified artist" />

                }
              </div>

              <p className="mt-8 max-w-2xl text-2xl leading-snug tracking-tight text-paper">
                {artist.focus}
              </p>

              <div className="mt-8 flex flex-wrap gap-1.5">
                {artist.disciplines.map((d) =>
                <Tag key={d}>{d}</Tag>
                )}
              </div>

              <ul className="mt-10 grid border-y bp-rule sm:grid-cols-3">
                <li className="border-b bp-rule sm:border-b-0 sm:border-r">
                  <a
                    href="#works-title"
                    className="group flex min-h-24 items-center gap-4 px-4 py-5 transition-colors duration-150 hover:bg-white/[0.03]">
                    <Layers3Icon className="h-5 w-5 shrink-0 text-steel group-hover:text-paper" strokeWidth={1.5} />
                    <span>
                      <span className="block font-mono text-10 uppercase tracking-label text-steel">Collections</span>
                      <span className="mt-1.5 block font-display text-xl font-extrabold tabular-nums text-paper">
                        {works.length}
                      </span>
                    </span>
                  </a>
                </li>

                <li className="border-b bp-rule sm:border-b-0 sm:border-r">
                  {websiteUrl ?
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex min-h-24 items-center gap-4 px-4 py-5 transition-colors duration-150 hover:bg-white/[0.03]">
                      <Globe2Icon className="h-5 w-5 shrink-0 text-steel group-hover:text-paper" strokeWidth={1.5} />
                      <span className="min-w-0">
                        <span className="block font-mono text-10 uppercase tracking-label text-steel">Website</span>
                        <span className="mt-1.5 block truncate font-mono text-[12px] text-paper">{artist.links.website}</span>
                      </span>
                    </a> :
                  <div className="flex min-h-24 items-center gap-4 px-4 py-5">
                      <Globe2Icon className="h-5 w-5 shrink-0 text-steel" strokeWidth={1.5} />
                      <span>
                        <span className="block font-mono text-10 uppercase tracking-label text-steel">Website</span>
                        <span className="mt-1.5 block font-mono text-[12px] text-smoke">—</span>
                      </span>
                    </div>
                  }
                </li>

                <li>
                  {xUrl ?
                  <a
                    href={xUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex min-h-24 items-center gap-4 px-4 py-5 transition-colors duration-150 hover:bg-white/[0.03]">
                      <SocialIcon network="x" className="h-5 w-5 shrink-0 text-steel group-hover:text-paper" />
                      <span className="min-w-0">
                        <span className="block font-mono text-10 uppercase tracking-label text-steel">X account</span>
                        <span className="mt-1.5 block truncate font-mono text-[12px] text-paper">{artist.links.x}</span>
                      </span>
                    </a> :
                  <div className="flex min-h-24 items-center gap-4 px-4 py-5">
                      <SocialIcon network="x" className="h-5 w-5 shrink-0 text-steel" />
                      <span>
                        <span className="block font-mono text-10 uppercase tracking-label text-steel">X account</span>
                        <span className="mt-1.5 block font-mono text-[12px] text-smoke">—</span>
                      </span>
                    </div>
                  }
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* Biography + statement */}
      <section aria-labelledby="bio-title" className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Label as="div" className="lg:sticky lg:top-32">
              Biography
            </Label>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <h2 id="bio-title" className="sr-only">
              Biography
            </h2>
            {artist.longBio.map((paragraph, i) =>
            <Reveal key={i} delay={i * 0.03}>
                <p className="mb-6 max-w-2xl text-[17px] leading-relaxed text-bone">{paragraph}</p>
              </Reveal>
            )}

            <blockquote className="mt-6 border-t bp-rule pt-10">
              <Label as="div">Featured statement</Label>
              <p className="mt-5 max-w-3xl text-[clamp(1.5rem,2.8vw,2.5rem)] font-medium leading-[1.08] tracking-tight text-paper">
                “{artist.statement}”
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Published collections */}
      <section
        aria-labelledby="works-title"
        className="mx-auto max-w-frame px-5 py-8 lg:px-10 lg:py-12">
        
        <SectionHeading
          id="works-title"
          index="Published"
          title="Collections"
          description={`${works.length} ${works.length === 1 ? 'release' : 'releases'} on Black Pill.`} />
        
        <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((c, i) =>
          <Reveal key={c.slug} delay={i * 0.04}>
              <CollectionCard collection={c} />
            </Reveal>
          )}
        </div>
      </section>

      {/* Upcoming drops */}
      {upcoming.length > 0 &&
      <section
        aria-labelledby="artist-drops-title"
        className="mx-auto max-w-frame px-5 py-12 lg:px-10 lg:py-16">
        
          <SectionHeading id="artist-drops-title" index="Scheduled" title="Upcoming drops" />
          <div className="mt-8">
            {upcoming.map((d) => {
            const collection = works.find((w) => w.slug === d.collectionSlug);
            return collection ?
            <DropRow key={d.id} drop={d} collection={collection} /> :
            null;
          })}
          </div>
        </section>
      }

      {/* External work + notes */}
      <section className="mx-auto max-w-frame px-5 py-12 lg:px-10 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <SectionHeading index="Elsewhere" title="Selected work" />
            <ul className="mt-6">
              {artist.externalWork.map((w) =>
              <li
                key={`${w.title}-${w.year}`}
                className="flex items-baseline justify-between gap-6 border-t bp-rule py-4">
                
                  <span>
                    <span className="block text-[15px] font-bold uppercase tracking-tight text-paper">
                      {w.title}
                    </span>
                    <span className="mt-1 block font-mono text-10 uppercase tracking-meta text-smoke">
                      {w.venue}
                    </span>
                  </span>
                  <span className="font-mono text-10 tabular-nums text-steel">{w.year}</span>
                </li>
              )}
            </ul>
          </div>

          {artist.notes &&
          <div className="lg:col-span-6 lg:col-start-7">
              <SectionHeading index="Studio notes" title="In conversation" />
              <dl className="mt-6">
                {artist.notes.map((note) =>
              <div key={note.question} className="border-t bp-rule py-6">
                    <dt className="max-w-lg text-lg font-bold leading-snug tracking-tight text-paper">
                      {note.question}
                    </dt>
                    <dd className="mt-3 max-w-2xl text-[15px] leading-relaxed text-bone">
                      {note.answer}
                    </dd>
                  </div>
              )}
              </dl>
            </div>
          }
        </div>
      </section>
    </div>);

};
