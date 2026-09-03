import React, { useEffect, useRef, useState } from 'react';
import { ExternalLinkIcon } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';
import { SectionHeading } from '../ui/SectionHeading';
import type { Collection } from '../../types';

interface ExploreCollectionProps {
  collection: Collection;
}

interface OpenSeaToken {
  id: string;
  name: string;
  image: string | null;
  animation: string | null;
  openseaUrl: string | null;
}

const COLLECTION_API_URL =
  import.meta.env.VITE_COLLECTION_API_URL ||
  'https://blackpill-labs-mailer.onrender.com/api/opensea/collection';

export const ExploreCollection: React.FC<ExploreCollectionProps> = ({ collection }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [tokens, setTokens] = useState<OpenSeaToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const waitingToLoad = !shouldLoad || loading;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || shouldLoad) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: '500px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || !collection.openSeaSlug) return;

    const controller = new AbortController();
    setLoading(true);
    setFailed(false);

    fetch(`${COLLECTION_API_URL}/${encodeURIComponent(collection.openSeaSlug)}?limit=10`, {
      signal: controller.signal
    })
      .then(async (response) => {
        if (!response.ok) throw new Error('COLLECTION_PREVIEW_FAILED');
        return response.json() as Promise<{tokens?: OpenSeaToken[]}>;
      })
      .then((payload) => setTokens(Array.isArray(payload.tokens) ? payload.tokens.slice(0, 10) : []))
      .catch((error) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setFailed(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [collection.openSeaSlug, shouldLoad]);

  if (!collection.openSeaSlug || !collection.marketplaceUrl) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="explore-collection-title"
      className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-20">
      <SectionHeading
        id="explore-collection-title"
        index="Tokens"
        title="Explore the Collection"
        description="A live selection of works from OpenSea." />

      {waitingToLoad &&
      <div className="mt-8 border-y bp-rule py-14 text-center">
          <p className="font-mono text-10 uppercase tracking-meta text-smoke">Loading collection</p>
        </div>
      }

      {!waitingToLoad && tokens.length > 0 &&
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

      {!waitingToLoad && (failed || tokens.length === 0) &&
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
