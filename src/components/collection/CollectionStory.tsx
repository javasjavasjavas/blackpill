import React from 'react';
import { ArtCanvas } from '../art/ArtCanvas';
import { DistrictsPreview } from '../ui/DistrictsPreview';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';
import type { Artist, Collection } from '../../types';

interface CollectionStoryProps {
  collection: Collection;
  artist: Artist;
}

export const CollectionStory: React.FC<CollectionStoryProps> = ({ collection, artist }) => {
  const htmlPreviewUrl = collection.art.htmlPreview ?
    `${import.meta.env.BASE_URL}${collection.art.htmlPreview}` :
    null;
  const imagePreviewUrl = collection.art.imagePreview ?? null;
  const chapters = [
  { index: '01', title: 'The idea', body: collection.story.idea },
  { index: '02', title: 'How it works', body: collection.story.howItWorks },
  { index: '03', title: 'What makes it new', body: collection.story.innovation },
  { index: '04', title: 'Ownership', body: collection.story.ownership },
  { index: '05', title: 'Technical process', body: collection.story.process }];


  return (
    <section aria-labelledby="story-title" className="border-t bp-rule bg-void">
      <div className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <div className="sticky top-32">
              <Label as="div">Collection story</Label>
              <h2
                id="story-title"
                className="mt-4 text-[clamp(1.75rem,2.6vw,2.5rem)] font-extrabold uppercase leading-[0.94] tracking-tightest text-paper">
                
                Read the
                <br />
                work
              </h2>
              <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-smoke">
                Written by the Black Pill curatorial desk with the artist, {artist.name}.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            {chapters.map((chapter, i) =>
            <Reveal key={chapter.index} className="border-t bp-rule py-8 first:border-t-0 first:pt-0">
                <div className="flex items-baseline gap-5">
                  <Label className="tabular-nums">{chapter.index}</Label>
                  <h3 className="text-xl font-bold uppercase tracking-tight text-paper">
                    {chapter.title}
                  </h3>
                </div>
                <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-bone">
                  {chapter.body}
                </p>

                {i === 1 &&
              <figure className="mt-8">
                    {collection.slug === 'districts' && htmlPreviewUrl ?
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[1, 2].map((preview) =>
                        <div
                          key={preview}
                          className="relative aspect-square w-full overflow-hidden border bp-rule">
                          <DistrictsPreview
                            title={`Districts sample ${preview}`}
                            className="absolute inset-0"
                            interactive
                          />
                        </div>
                        )}
                      </div> : imagePreviewUrl ?
                    <div className="relative aspect-square w-full max-w-xl overflow-hidden border bp-rule">
                        <img
                          src={imagePreviewUrl}
                          alt={`Preview of ${collection.title}`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 h-full w-full bg-ink object-contain" />
                      </div> :
                    <div className="relative aspect-[16/7] w-full overflow-hidden border bp-rule">
                        <ArtCanvas
                          variant={collection.art.variant}
                          accent={collection.art.accent}
                          seed={collection.index * 401 + 77}
                          size="hero"
                          className="absolute inset-0 h-full w-full"
                          label={`Diagram: a second sample from the ${collection.title} rule set`} />
                      </div>
                    }
                    <figcaption className="mt-3 font-mono text-10 uppercase tracking-label text-steel">
                      {collection.slug === 'districts' ?
                      'Two Districts previews. Load either interactive HTML only when you want to explore it.' :
                      <>Fig. 01 — Second sample from the same rule set, different seed.{' '}
                          {collection.spec.rendering}.</>
                      }
                    </figcaption>
                  </figure>
              }
              </Reveal>
            )}

            <blockquote className="mt-6 border-t bp-rule pt-10">
              <Label as="div">Artist statement</Label>
              <p className="mt-5 max-w-3xl text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.1] tracking-tight text-paper">
                “{collection.story.artistStatement}”
              </p>
              <footer className="mt-5 font-mono text-10 uppercase tracking-label text-smoke">
                {artist.name} — {artist.location}
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>);

};
