import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { ActionButton } from '../ui/ActionButton';
import { CollectionCard } from '../collections/CollectionCard';
import { Reveal } from '../ui/Reveal';
import { collections } from '../../data/collections';

interface FeaturedCollectionsProps {
  excludeSlug: string;
}

export const FeaturedCollections: React.FC<FeaturedCollectionsProps> = ({ excludeSlug }) => {
  const list = collections.filter((c) => c.slug !== excludeSlug).slice(0, 6);
  const grid = list.slice(3);

  return (
    <section
      aria-labelledby="collections-title"
      className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-24">
      
      <SectionHeading
        id="collections-title"
        index="004 — Collections"
        title="Curated experiments"
        description="Ten collections in the index. Each one had to prove it could not have existed as a static image."
        action={
        <ActionButton to="/collections" variant="outline" size="sm">
            View All Collections
            <ArrowRightIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
          </ActionButton>
        } />
      

      <div className="mt-10 grid gap-x-8 gap-y-14 lg:grid-cols-12">
        {grid.map((collection, i) =>
        <Reveal key={collection.slug} delay={0.04 * i} className="lg:col-span-4">
            <CollectionCard collection={collection} />
          </Reveal>
        )}
      </div>
    </section>);

};
