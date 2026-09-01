import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { CustomCursor } from './CustomCursor';
import { WalletModal } from '../wallet/WalletModal';

export const Shell: React.FC = () => {
  const { pathname, hash } = useLocation();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash, reduce]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:border focus:border-paper focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-11 focus:uppercase focus:tracking-meta focus:text-paper">
        
        Skip to content
      </a>
      <Nav />
      <motion.main
        id="main"
        key={pathname}
        initial={reduce ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
        className={pathname === '/' ? 'flex-1 pt-[100px]' : 'flex-1 pt-[112px]'}>
        
        <Outlet />
      </motion.main>
      <Footer />
      <WalletModal />
      <CustomCursor />
    </div>);

};
