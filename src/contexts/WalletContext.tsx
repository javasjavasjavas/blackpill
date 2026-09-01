import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import type { WalletId, WalletStatus } from '../types';

export interface WalletOption {
  id: WalletId;
  name: string;
  detail: string;
  installed: boolean;
}

export const walletOptions: WalletOption[] = [
{ id: 'metamask', name: 'MetaMask', detail: 'Browser extension', installed: true },
{ id: 'rainbow', name: 'Rainbow', detail: 'Mobile / QR', installed: true },
{ id: 'coinbase', name: 'Coinbase Wallet', detail: 'Extension / Smart Wallet', installed: true },
{ id: 'walletconnect', name: 'WalletConnect', detail: '400+ wallets', installed: true },
{ id: 'ledger', name: 'Ledger', detail: 'Hardware — device not detected', installed: false }];


interface WalletState {
  status: WalletStatus;
  address?: string;
  ens?: string;
  balance?: string;
  wallet?: WalletOption;
  error?: string;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  connect: (id: WalletId) => void;
  disconnect: () => void;
  reset: () => void;
}

const WalletContext = createContext<WalletState | null>(null);

const MOCK_ACCOUNT = {
  address: '0xC41d7A9f0b2E6538aB1c4D7e09F3b62a5E8d1C04',
  ens: 'collector.eth',
  balance: '3.482 ETH'
};

export const WalletProvider: React.FC<{children: React.ReactNode;}> = ({ children }) => {
  const [status, setStatus] = useState<WalletStatus>('disconnected');
  const [wallet, setWallet] = useState<WalletOption | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [isModalOpen, setModalOpen] = useState(false);
  const timer = useRef<number>();

  const clear = () => {
    if (timer.current) window.clearTimeout(timer.current);
  };

  const connect = useCallback((id: WalletId) => {
    const option = walletOptions.find((w) => w.id === id);
    if (!option) return;
    clear();
    setWallet(option);
    setError(undefined);
    setStatus('connecting');
    timer.current = window.setTimeout(() => {
      if (!option.installed) {
        setStatus('error');
        setError(`${option.name} could not be reached. Connect and unlock your device, then retry.`);
        return;
      }
      setStatus('connected');
    }, 1400);
  }, []);

  const disconnect = useCallback(() => {
    clear();
    setStatus('disconnected');
    setWallet(undefined);
    setError(undefined);
  }, []);

  const reset = useCallback(() => {
    clear();
    setStatus('disconnected');
    setError(undefined);
  }, []);

  const value = useMemo<WalletState>(
    () => ({
      status,
      wallet,
      error,
      isModalOpen,
      address: status === 'connected' ? MOCK_ACCOUNT.address : undefined,
      ens: status === 'connected' ? MOCK_ACCOUNT.ens : undefined,
      balance: status === 'connected' ? MOCK_ACCOUNT.balance : undefined,
      openModal: () => setModalOpen(true),
      closeModal: () => setModalOpen(false),
      connect,
      disconnect,
      reset
    }),
    [status, wallet, error, isModalOpen, connect, disconnect, reset]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = (): WalletState => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used inside WalletProvider');
  return ctx;
};