import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { MenuIcon, SearchIcon } from 'lucide-react';
import { Wordmark } from '../brand/Wordmark';
import { PillMark } from '../brand/PillMark';
import { MobileMenu } from './MobileMenu';
import { NetworkPulse } from './NetworkPulse';
import { SearchOverlay } from './SearchOverlay';
import { useWallet } from '../../contexts/WalletContext';
import { useScrolled } from '../../hooks/useUi';
import { cn, truncateAddress } from '../../utils/format';

const LINKS: {to: string;label: string;soon?: boolean;}[] = [
{ to: '/drops', label: 'Drops' },
{ to: '/collections', label: 'Collections', soon: true },
{ to: '/artists', label: 'Artists' },
{ to: '/about', label: 'About' }];


export const Nav: React.FC = () => {
  const scrolled = useScrolled(40);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { status, ens, address, openModal } = useWallet();
  const reduce = useReducedMotion();

  const connected = status === 'connected';

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40">
        {/* Technical rail — retracts on scroll */}
        <motion.div
          initial={false}
          animate={{ height: scrolled ? 0 : 28, opacity: scrolled ? 0 : 1 }}
          transition={reduce ? { duration: 0 } : { duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className={cn(
            'overflow-hidden bg-void',
            scrolled ? 'border-b-0' : 'border-b bp-rule'
          )}>
          
          <div className="mx-auto flex h-7 max-w-frame items-center justify-between px-5 lg:px-10">
            <span className="font-mono text-10 uppercase tracking-label text-steel">
              Black Pill Labs — Experimental Digital Assets
            </span>
            <NetworkPulse />
          </div>
        </motion.div>

        <div
          className={cn(
            'border-b transition-colors duration-200 ease-swift',
            scrolled ? 'border-white/10 bg-ink/95 backdrop-blur-sm' : 'border-transparent bg-ink'
          )}>
          
          <div
            className={cn(
              'mx-auto flex max-w-frame items-center justify-between px-5 transition-[height] duration-200 ease-swift lg:px-10',
              scrolled ? 'h-[66px]' : 'h-[82px]'
            )}>
            
            <Link
              to="/"
              className="shrink-0 text-paper transition-opacity duration-150 hover:opacity-70"
              aria-label="Black Pill — home">
              
              <Wordmark />
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {LINKS.map((link) =>
                <li key={link.to}>
                    {link.soon ?
                    <span
                      aria-disabled="true"
                      className="inline-flex cursor-default items-center gap-2 font-mono text-[12px] uppercase tracking-meta text-steel">
                      <span>{link.label}</span>
                      <span className="border border-white/15 px-1.5 py-0.5 text-[7px] tracking-label text-smoke">
                        Soon
                      </span>
                    </span> :
                    <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                    cn(
                      'bp-underline-hover font-mono text-[12px] uppercase tracking-meta transition-colors duration-150',
                      isActive ? 'text-paper' : 'text-smoke hover:text-paper'
                    )
                    }>
                    
                      {link.label}
                    </NavLink>
                    }
                  </li>
                )}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex h-9 w-9 items-center justify-center border border-transparent text-smoke transition-colors duration-150 hover:border-white/20 hover:text-paper"
                aria-label="Search collections and artists">
                
                <SearchIcon className="h-4 w-4" strokeWidth={1.5} />
              </button>

              <button
                type="button"
                onClick={openModal}
                className={cn(
                  'hidden h-9 items-center gap-2 border px-4 font-mono text-[10px] uppercase tracking-meta transition-colors duration-150 ease-swift lg:flex',
                  connected ?
                  'border-white/20 text-paper hover:border-paper' :
                  'border-paper bg-paper text-ink hover:bg-chalk'
                )}>
                
                {connected ?
                <>
                    <PillMark className="h-2.5 w-5 text-volt" active />
                    <span className="tabular-nums">{ens ?? truncateAddress(address ?? '')}</span>
                  </> :

                'Connect Wallet'
                }
              </button>

              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                className="flex h-9 w-9 items-center justify-center border border-transparent text-paper transition-colors duration-150 hover:border-white/20 lg:hidden"
                aria-label="Open menu">
                
                <MenuIcon className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={LINKS}
        onSearch={() => {
          setMenuOpen(false);
          setSearchOpen(true);
        }} />
      
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>);

};
