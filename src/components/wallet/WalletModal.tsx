import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  AlertTriangleIcon,
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  LoaderIcon,
  XIcon } from
'lucide-react';
import { Label } from '../ui/Label';
import { ActionButton } from '../ui/ActionButton';
import { PillMark } from '../brand/PillMark';
import { useWallet, walletOptions } from '../../contexts/WalletContext';
import { useEscape, useFocusTrap, useLockBodyScroll } from '../../hooks/useUi';
import { truncateAddress } from '../../utils/format';

export const WalletModal: React.FC = () => {
  const {
    isModalOpen,
    closeModal,
    connect,
    disconnect,
    reset,
    status,
    wallet,
    error,
    address,
    ens,
    balance
  } = useWallet();
  const reduce = useReducedMotion();
  const [copied, setCopied] = useState(false);
  useLockBodyScroll(isModalOpen);
  useEscape(isModalOpen, closeModal);
  const trapRef = useFocusTrap(isModalOpen);

  const copy = async () => {
    if (!address) return;
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen &&
      <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
          <motion.button
          type="button"
          aria-label="Close wallet dialog"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.2 }}
          className="absolute inset-0 bg-void/85" />
        
          <motion.div
          ref={trapRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="wallet-title"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }}
          transition={reduce ? { duration: 0 } : { duration: 0.24, ease: [0.23, 1, 0.32, 1] }}
          className="relative z-10 w-full max-w-md border border-white/15 bg-carbon">
          
            <div className="flex items-center justify-between border-b bp-rule px-5 py-4">
              <div className="flex items-center gap-2.5">
                <PillMark className="h-3 w-6 text-paper" active={status === 'connected'} />
                <h2
                id="wallet-title"
                className="font-mono text-11 uppercase tracking-meta text-paper">
                
                  {status === 'connected' ? 'Wallet connected' : 'Connect wallet'}
                </h2>
              </div>
              <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center text-smoke transition-colors duration-150 hover:text-paper">
              
                <XIcon className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>

            {status === 'disconnected' &&
          <div className="p-5">
                <p className="text-[13px] leading-relaxed text-bone">
                  Connect to mint, hold and interact with on-chain works. Black Pill never requests
                  approval for asset transfers outside a mint transaction.
                </p>
                <ul className="mt-5">
                  {walletOptions.map((option) =>
              <li key={option.id}>
                      <button
                  type="button"
                  onClick={() => connect(option.id)}
                  className="group flex w-full items-center justify-between border-t bp-rule py-3.5 text-left transition-colors duration-150 hover:bg-white/[0.04]">
                  
                        <span>
                          <span className="block font-display text-base font-bold tracking-tight text-paper">
                            {option.name}
                          </span>
                          <span className="mt-0.5 block font-mono text-10 uppercase tracking-meta text-steel">
                            {option.detail}
                          </span>
                        </span>
                        <span className="font-mono text-10 uppercase tracking-meta text-smoke transition-transform duration-150 ease-swift group-hover:translate-x-0.5">
                          {option.installed ? 'Connect →' : 'Detect →'}
                        </span>
                      </button>
                    </li>
              )}
                </ul>
              </div>
          }

            {status === 'connecting' &&
          <div className="p-8 text-center">
                <LoaderIcon className="mx-auto h-6 w-6 animate-spin text-paper" strokeWidth={1.5} />
                <p className="mt-5 font-display text-lg font-bold tracking-tight text-paper">
                  Waiting for {wallet?.name}
                </p>
                <p className="mt-2 text-[13px] text-smoke">
                  Approve the connection request in your wallet.
                </p>
                <ActionButton variant="ghost" size="sm" className="mt-6" onClick={reset}>
                  Cancel
                </ActionButton>
              </div>
          }

            {status === 'error' &&
          <div className="p-6">
                <div className="flex items-start gap-3 border border-accent/40 bg-accent/[0.07] p-4">
                  <AlertTriangleIcon
                className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                strokeWidth={1.75} />
              
                  <div>
                    <p className="font-mono text-10 uppercase tracking-meta text-accent">
                      Connection failed
                    </p>
                    <p className="mt-2 text-[13px] leading-relaxed text-bone">{error}</p>
                  </div>
                </div>
                <div className="mt-5 flex gap-2">
                  <ActionButton onClick={() => wallet && connect(wallet.id)}>Retry</ActionButton>
                  <ActionButton variant="outline" onClick={reset}>
                    Other wallets
                  </ActionButton>
                </div>
              </div>
          }

            {status === 'connected' &&
          <div className="p-5">
                <div className="border bp-rule p-4">
                  <div className="flex items-center justify-between">
                    <Label>{wallet?.name ?? 'Wallet'}</Label>
                    <span className="inline-flex items-center gap-1.5 font-mono text-10 uppercase tracking-meta text-volt">
                      <span className="h-1.5 w-1.5 rounded-full bg-volt" aria-hidden="true" />
                      Connected
                    </span>
                  </div>
                  <p className="mt-3 font-display text-2xl font-extrabold tracking-tight text-paper">
                    {ens}
                  </p>
                  <p className="mt-1 font-mono text-11 text-smoke">{truncateAddress(address ?? '', 10, 8)}</p>
                  <dl className="mt-4 grid grid-cols-2 gap-4 border-t bp-rule pt-4">
                    <div>
                      <dt className="font-mono text-10 uppercase tracking-label text-steel">Balance</dt>
                      <dd className="mt-1 font-mono text-[13px] text-paper">{balance}</dd>
                    </div>
                    <div>
                      <dt className="font-mono text-10 uppercase tracking-label text-steel">Network</dt>
                      <dd className="mt-1 font-mono text-[13px] text-paper">Ethereum · Mainnet</dd>
                    </div>
                  </dl>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <ActionButton variant="outline" size="sm" onClick={copy}>
                    {copied ?
                <>
                        <CheckIcon className="h-3.5 w-3.5" strokeWidth={2} /> Copied
                      </> :

                <>
                        <CopyIcon className="h-3.5 w-3.5" strokeWidth={1.75} /> Copy address
                      </>
                }
                  </ActionButton>
                  <ActionButton variant="outline" size="sm" href="https://etherscan.io">
                    <ExternalLinkIcon className="h-3.5 w-3.5" strokeWidth={1.75} /> Explorer
                  </ActionButton>
                  <ActionButton variant="ghost" size="sm" onClick={disconnect}>
                    Disconnect
                  </ActionButton>
                </div>
              </div>
          }
          </motion.div>
        </div>
      }
    </AnimatePresence>);

};