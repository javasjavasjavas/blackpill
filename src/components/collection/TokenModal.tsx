import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, LoaderIcon, CheckIcon, XIcon } from 'lucide-react';
import { ArtCanvas } from '../art/ArtCanvas';
import { ActionButton } from '../ui/ActionButton';
import { Label } from '../ui/Label';
import { useWallet } from '../../contexts/WalletContext';
import { useEscape, useFocusTrap, useLockBodyScroll } from '../../hooks/useUi';
import type { Collection, Token } from '../../types';
import { formatPrice, truncateAddress } from '../../utils/format';

interface TokenModalProps {
  token: Token | null;
  collection: Collection;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

type BuyState = 'idle' | 'pending' | 'done';

export const TokenModal: React.FC<TokenModalProps> = ({
  token,
  collection,
  onClose,
  onPrev,
  onNext
}) => {
  const reduce = useReducedMotion();
  const { status, openModal } = useWallet();
  const [buyState, setBuyState] = useState<BuyState>('idle');
  useLockBodyScroll(Boolean(token));
  useEscape(Boolean(token), onClose);
  const trapRef = useFocusTrap(Boolean(token));

  const buy = () => {
    if (status !== 'connected') {
      openModal();
      return;
    }
    setBuyState('pending');
    window.setTimeout(() => setBuyState('done'), 1600);
  };

  return (
    <AnimatePresence>
      {token &&
      <div className="fixed inset-0 z-[65] flex items-center justify-center p-0 sm:p-6">
          <motion.button
          type="button"
          aria-label="Close token view"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-void/88" />
        
          <motion.div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${collection.title} token ${token.number}`}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.985 }}
          transition={{ duration: 0.26, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 flex max-h-full w-full max-w-4xl flex-col overflow-y-auto border border-white/15 bg-carbon">
          
            <div className="flex items-center justify-between border-b bp-rule px-5 py-3">
              <Label className="text-paper">
                {collection.title} · #{token.number}
              </Label>
              <div className="flex items-center gap-1">
                <button
                type="button"
                onClick={onPrev}
                aria-label="Previous token"
                className="flex h-8 w-8 items-center justify-center border border-white/15 text-smoke hover:border-paper hover:text-paper">
                
                  <ChevronLeftIcon className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                type="button"
                onClick={onNext}
                aria-label="Next token"
                className="flex h-8 w-8 items-center justify-center border border-white/15 text-smoke hover:border-paper hover:text-paper">
                
                  <ChevronRightIcon className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="ml-1 flex h-8 w-8 items-center justify-center border border-white/15 text-smoke hover:border-paper hover:text-paper">
                
                  <XIcon className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            <div className="grid gap-0 md:grid-cols-2">
              <div className="relative aspect-square w-full border-b bp-rule md:border-b-0 md:border-r">
                <ArtCanvas
                variant={collection.art.variant}
                accent={collection.art.accent}
                seed={token.seed}
                size="card"
                className="absolute inset-0 h-full w-full"
                label={`${collection.title} token ${token.number}`} />
              
              </div>

              <div className="p-5">
                <h3 className="text-3xl font-extrabold uppercase leading-none tracking-tightest text-paper">
                  #{token.number}
                </h3>
                <p className="mt-3 font-mono text-10 uppercase tracking-meta text-smoke">
                  Owner {token.owner} · State {token.state}
                </p>

                <dl className="mt-6 border-t bp-rule">
                  {token.traits.map((trait) =>
                <div
                  key={trait.name}
                  className="flex items-baseline justify-between border-b bp-rule py-2.5">
                  
                      <dt className="font-mono text-10 uppercase tracking-label text-steel">
                        {trait.name}
                      </dt>
                      <dd className="font-mono text-[13px] text-paper">{trait.value}</dd>
                    </div>
                )}
                </dl>

                <div className="mt-6">
                  <Label>{token.listed ? 'Listed at' : 'Not listed'}</Label>
                  <p className="mt-2 font-display text-2xl font-extrabold tabular-nums tracking-tightest text-paper">
                    {token.listed && token.price ?
                  formatPrice(token.price, collection.currency) :
                  '—'}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {buyState === 'done' ?
                <p className="inline-flex items-center gap-2 border border-volt/40 bg-volt/[0.07] px-4 py-3 font-mono text-10 uppercase tracking-meta text-volt">
                      <CheckIcon className="h-3.5 w-3.5" strokeWidth={2} />
                      Purchase confirmed
                    </p> :
                token.listed ?
                <ActionButton onClick={buy} disabled={buyState === 'pending'}>
                      {buyState === 'pending' ?
                  <>
                          <LoaderIcon className="h-4 w-4 animate-spin" strokeWidth={1.5} />
                          Confirming
                        </> :
                  status === 'connected' ?
                  'Buy now' :

                  'Connect to buy'
                  }
                    </ActionButton> :

                <ActionButton variant="outline" onClick={buy}>
                      Make offer
                    </ActionButton>
                }
                  <ActionButton variant="ghost" href="https://etherscan.io">
                    Token on explorer
                  </ActionButton>
                </div>

                <p className="mt-6 border-t bp-rule pt-4 font-mono text-10 uppercase leading-relaxed tracking-label text-steel">
                  Contract {truncateAddress(collection.spec.contract, 8, 6)} · {collection.spec.chain} ·{' '}
                  {collection.spec.storage}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      }
    </AnimatePresence>);

};