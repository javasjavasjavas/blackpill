import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { SearchIcon, XIcon } from 'lucide-react';
import { Wordmark } from '../brand/Wordmark';
import { Label } from '../ui/Label';
import { ActionButton } from '../ui/ActionButton';
import { useWallet } from '../../contexts/WalletContext';
import { useEscape, useFocusTrap, useLockBodyScroll } from '../../hooks/useUi';
import { categories } from '../../data/categories';
import { cn, systemTimestamp, truncateAddress } from '../../utils/format';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  links: {to: string;label: string;soon?: boolean;}[];
  onSearch: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose, links, onSearch }) => {
  const reduce = useReducedMotion();
  const { pathname } = useLocation();
  const { status, ens, address, openModal } = useWallet();
  useLockBodyScroll(open);
  useEscape(open, onClose);
  const trapRef = useFocusTrap(open);

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        ref={trapRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={reduce ? { duration: 0 } : { duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        className="fixed inset-0 z-50 flex flex-col bg-void lg:hidden">
        
          <div className="flex h-[72px] shrink-0 items-center justify-between border-b bp-rule px-5">
            <Link to="/" onClick={onClose} className="text-paper" aria-label="Black Pill — home">
              <Wordmark />
            </Link>
            <div className="flex items-center gap-2">
              <button
              type="button"
              onClick={onSearch}
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center border border-white/15 text-paper">
              
                <SearchIcon className="h-4 w-4" strokeWidth={1.5} />
              </button>
              <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center border border-white/15 text-paper">
              
                <XIcon className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-8">
            <ul>
              {links.map((link, i) =>
            <motion.li
              key={link.to}
              initial={reduce ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.04 * i, ease: [0.23, 1, 0.32, 1] }}
              className="border-b bp-rule">
              
                  {link.soon ?
                  <div
                    aria-disabled="true"
                    className="flex cursor-default items-baseline justify-between py-5 text-steel">
                    <span className="flex items-center gap-3 text-[clamp(1.9rem,9.5vw,3rem)] font-extrabold uppercase leading-none tracking-tightest">
                      {link.label}
                      <span className="border border-white/15 px-2 py-1 font-mono text-[7px] font-normal tracking-label text-smoke">
                        Soon
                      </span>
                    </span>
                    <Label className="tabular-nums text-steel">{`0${i + 1}`}</Label>
                  </div> :
                  <Link
                to={link.to}
                onClick={onClose}
                className={cn(
                  'flex items-baseline justify-between py-5 transition-colors duration-150',
                  pathname === link.to ? 'text-paper' : 'text-smoke hover:text-paper'
                )}>
                
                    <span className="text-[clamp(1.9rem,9.5vw,3rem)] font-extrabold uppercase leading-none tracking-tightest">
                      {link.label}
                    </span>
                    <Label
                      className={cn(
                        'tabular-nums transition-colors duration-150',
                        pathname === link.to ? 'text-paper' : 'text-steel'
                      )}>
                      {`0${i + 1}`}
                    </Label>
                  </Link>
                  }
                </motion.li>
            )}
            </ul>

            <div className="mt-10">
              <Label>Curatorial index</Label>
              <ul className="mt-4 flex flex-wrap gap-2">
                {categories.map((c) =>
              <li key={c.slug}>
                    <Link
                  to={`/collections?category=${c.slug}`}
                  onClick={onClose}
                  className="inline-flex rounded-full border border-white/20 px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.18em] text-bone">
                  
                      {c.label}
                    </Link>
                  </li>
              )}
              </ul>
            </div>
          </nav>

          <div className="shrink-0 border-t bp-rule p-5">
            <ActionButton
            variant={status === 'connected' ? 'outline' : 'primary'}
            size="lg"
            className="w-full"
            onClick={() => {
              onClose();
              openModal();
            }}>
            
              {status === 'connected' ?
            ens ?? truncateAddress(address ?? '') :
            'Connect Wallet'}
            </ActionButton>
            <p className="mt-4 font-mono text-10 uppercase tracking-label text-steel">
              {systemTimestamp()}
            </p>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

};
