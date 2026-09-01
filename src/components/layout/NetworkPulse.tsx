import React, { useEffect, useState } from 'react';
import { DiamondIcon, FlameIcon } from 'lucide-react';

const ETH_PRICE_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd';
const ETH_RPC_URL = 'https://ethereum-rpc.publicnode.com';
const REFRESH_INTERVAL = 60_000;

interface NetworkMetrics {
  ethUsd: number | null;
  gasGwei: number | null;
}

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const formatGas = (value: number | null) => {
  if (value === null) return '—';
  if (value < 1) return value.toFixed(2);
  if (value < 10) return value.toFixed(1);
  return Math.round(value).toString();
};

export const NetworkPulse: React.FC = () => {
  const [metrics, setMetrics] = useState<NetworkMetrics>({
    ethUsd: null,
    gasGwei: null,
  });

  useEffect(() => {
    let active = true;

    const updateMetrics = async () => {
      const [priceResult, gasResult] = await Promise.allSettled([
        fetch(ETH_PRICE_URL).then(async (response) => {
          if (!response.ok) throw new Error('ETH price request failed');
          const data = (await response.json()) as { ethereum?: { usd?: number } };
          const price = data.ethereum?.usd;
          if (typeof price !== 'number') throw new Error('Invalid ETH price');
          return price;
        }),
        fetch(ETH_RPC_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_gasPrice',
            params: [],
            id: 1,
          }),
        }).then(async (response) => {
          if (!response.ok) throw new Error('Gas price request failed');
          const data = (await response.json()) as { result?: string };
          if (typeof data.result !== 'string') throw new Error('Invalid gas price');
          return Number(BigInt(data.result)) / 1_000_000_000;
        }),
      ]);

      if (!active) return;

      setMetrics((current) => ({
        ethUsd: priceResult.status === 'fulfilled' ? priceResult.value : current.ethUsd,
        gasGwei: gasResult.status === 'fulfilled' ? gasResult.value : current.gasGwei,
      }));
    };

    void updateMetrics();
    const interval = window.setInterval(updateMetrics, REFRESH_INTERVAL);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="hidden items-center gap-5 font-mono text-10 uppercase tracking-label md:flex"
      aria-label={`Ethereum price ${metrics.ethUsd === null ? 'unavailable' : usdFormatter.format(metrics.ethUsd)}. Gas price ${metrics.gasGwei === null ? 'unavailable' : `${formatGas(metrics.gasGwei)} Gwei`}`}>
      <span className="inline-flex items-center gap-1.5" title="Current ETH price in USD">
        <span className="flex h-4 w-4 items-center justify-center border border-[#818cf8]/35 bg-[#818cf8]/10 text-[#a5b4fc]">
          <DiamondIcon className="h-2.5 w-2.5" strokeWidth={1.7} />
        </span>
        <span className="text-steel">ETH</span>
        <span className="tabular-nums text-paper">
          {metrics.ethUsd === null ? '—' : usdFormatter.format(metrics.ethUsd)}
        </span>
      </span>

      <span className="inline-flex items-center gap-1.5" title="Current Ethereum gas price">
        <span className="flex h-4 w-4 items-center justify-center border border-[#ff4d00]/35 bg-[#ff4d00]/10 text-[#ff6b2c]">
          <FlameIcon className="h-2.5 w-2.5" strokeWidth={1.7} />
        </span>
        <span className="text-steel">Gas</span>
        <span className="tabular-nums text-paper">{formatGas(metrics.gasGwei)} Gwei</span>
      </span>
    </div>
  );
};
