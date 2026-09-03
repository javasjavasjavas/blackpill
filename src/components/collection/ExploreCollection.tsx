import React from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';
import { SectionHeading } from '../ui/SectionHeading';
import type { OpenSeaToken } from '../../hooks/useOpenSeaCollection';
import type { Collection } from '../../types';

interface ExploreCollectionProps {
  collection: Collection;
  tokens: OpenSeaToken[];
  loading: boolean;
  failed: boolean;
}

export const ExploreCollection: React.FC<ExploreCollectionProps> = ({
  collection,
  tokens,
  loading,
  failed
}) => {

  if (!collection.openSeaSlug || !collection.marketplaceUrl) return null;

  return (
    <section
      aria-labelledby="explore-collection-title"
      className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-20">
      <SectionHeading
        id="explore-collection-title"
        index="Tokens"
        title="Explore the Collection"
        description="A live selection of works from OpenSea." />

      {loading &&
      <div className="mt-8 border-y bp-rule py-14 text-center">
          <p className="font-mono text-10 uppercase tracking-meta text-smoke">Loading collection</p>
        </div>
      }

      {!loading && tokens.length > 0 &&
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {tokens.map((token) =>
          <a
            key={`${token.id}-${token.name}`}
            href={token.openseaUrl || collection.marketplaceUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="group block border bp-rule p-2 transition-colors duration-150 hover:border-paper">
              <div className="aspect-square overflow-hidden bg-void">
                {token.image ?
                <img
                  src={token.image}
                  alt={token.name}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-300 ease-expo group-hover:scale-[1.02]" /> :
                <div className="flex h-full items-center justify-center font-mono text-10 uppercase tracking-meta text-steel">
                    No preview
                  </div>
                }
              </div>
              <p className="mt-3 truncate text-[13px] font-bold uppercase text-paper">{token.name}</p>
              <p className="mt-1 font-mono text-10 uppercase tracking-meta text-steel">#{token.id}</p>
            </a>
          )}
        </div>
      }

      {!loading && (failed || tokens.length === 0) &&
      <div className="mt-8 border-y bp-rule py-14 text-center">
          <p className="text-[15px] text-bone">
            {failed ? 'The live collection preview is temporarily unavailable.' : 'No tokens available yet.'}
          </p>
        </div>
      }

      <ActionButton href={collection.marketplaceUrl} variant="outline" className="mt-8">
        View full collection
        <ExternalLinkIcon className="h-4 w-4" strokeWidth={1.5} />
      </ActionButton>
    </section>
  );
};
