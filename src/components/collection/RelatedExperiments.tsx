import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { CollectionCard } from '../collections/CollectionCard';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';
import { collections } from '../../data/collections';
import type { Collection } from '../../types';

interface RelatedExperimentsProps {
  collection: Collection;
}

interface Related {
  collection: Collection;
  relation: string;
}

/** Related by shared method or curatorial line — never by popularity. */
const relate = (current: Collection): Related[] => {
  const scored = collections.
  filter((c) => c.slug !== current.slug).
  map((c) => {
    const sharedTech = c.tech.filter((t) => current.tech.includes(t));
    const sharedCategory = c.categories.filter((cat) => current.categories.includes(cat));
    const sameArtist = c.artistSlug === current.artistSlug;
    const score = sharedTech.length * 2 + sharedCategory.length + (sameArtist ? 1 : 0);
    const relation = sameArtist ?
    `Same artist · ${sharedTech[0] ?? c.tech[0]}` :
    sharedTech.length > 0 ?
    `Shares ${sharedTech.slice(0, 2).join(' + ')}` :
    `Adjacent method · ${c.tech[0]}`;
    return { collection: c, relation, score };
  }).
  sort((a, b) => b.score - a.score);

  return scored.slice(0, 3).map(({ collection, relation }) => ({ collection, relation }));
};

export const RelatedExperiments: React.FC<RelatedExperimentsProps> = ({ collection }) => {
  const related = relate(collection);

  return (
    <section
      aria-labelledby="related-title"
      className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-24">
      
      <SectionHeading
        id="related-title"
        index="Related"
        title="Related experiments"
        description="Selected by shared method and curatorial relationship, not by trading volume." />
      

      <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
        {related.map((item, i) =>
        <Reveal key={item.collection.slug} delay={i * 0.04}>
            <Label as="div" className="mb-3 text-accent">
              {item.relation}
            </Label>
            <CollectionCard collection={item.collection} scale="compact" />
          </Reveal>
        )}
      </div>
    </section>);

};