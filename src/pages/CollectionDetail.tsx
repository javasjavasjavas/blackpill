import React from 'react';
import { useParams } from 'react-router-dom';
import { CollectionHero } from '../components/collection/CollectionHero';
import { TechnicalSpec } from '../components/collection/TechnicalSpec';
import { CollectionStory } from '../components/collection/CollectionStory';
import { TokenBrowser } from '../components/collection/TokenBrowser';
import { ArtistModule } from '../components/collection/ArtistModule';
import { ExploreCollection } from '../components/collection/ExploreCollection';
import { NotFound } from './NotFound';
import { getCollection } from '../data/collections';
import { getArtist } from '../data/artists';
import { dropForCollection } from '../data/drops';
import { useOpenSeaCollection } from '../hooks/useOpenSeaCollection';

export const CollectionDetail: React.FC = () => {
  const { slug } = useParams<{slug: string;}>();
  const collection = slug ? getCollection(slug) : undefined;
  const artist = collection ? getArtist(collection.artistSlug) : undefined;
  const openSea = useOpenSeaCollection(collection?.openSeaSlug);

  if (!collection || !artist) {
    return (
      <NotFound
        title="Collection not indexed"
        message="That collection identifier is not in the registry. It may have been renamed or never listed." />);


  }

  const scheduledDrop = dropForCollection(collection.slug);

  return (
    <>
      <CollectionHero collection={collection} artist={artist} openSeaDetails={openSea.data?.collection} />
      <TechnicalSpec collection={collection} openSeaDetails={openSea.data?.collection} />
      <CollectionStory collection={collection} artist={artist} />
      {scheduledDrop && <TokenBrowser collection={collection} />}
      {collection.openSeaSlug &&
      <ExploreCollection
        collection={collection}
        tokens={openSea.data?.tokens || []}
        loading={openSea.loading}
        failed={openSea.failed} />}
      <ArtistModule artist={artist} currentSlug={collection.slug} />
    </>);

};
