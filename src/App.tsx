import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Shell } from './components/layout/Shell';
import { WalletProvider } from './contexts/WalletContext';
import { Home } from './pages/Home';
import { CollectionsDirectory } from './pages/CollectionsDirectory';
import { CollectionDetail } from './pages/CollectionDetail';
import { ArtistsIndex } from './pages/ArtistsIndex';
import { ArtistProfile } from './pages/ArtistProfile';
import { Drops } from './pages/Drops';
import { About } from './pages/About';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { NotFound } from './pages/NotFound';

type HeroVariant = 'split' | 'full-bleed';

interface AppProps {
  /** Composition of the homepage opening screen. */
  heroVariant?: HeroVariant;
}

export function App({
  heroVariant = 'split'
}: AppProps) {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Shell />}>
            <Route
              path="/"
              element={<Home heroVariant={heroVariant} />} />
            
            <Route path="/collections" element={<CollectionsDirectory />} />
            <Route path="/collection/:slug" element={<CollectionDetail />} />
            <Route path="/artists" element={<ArtistsIndex />} />
            <Route path="/artist/:slug" element={<ArtistProfile />} />
            <Route path="/drops" element={<Drops />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WalletProvider>);

}
