import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from 'lucide-react';
import { Tooltip } from '../ui/Tooltip';
import { SectionHeading } from '../ui/SectionHeading';
import type { OpenSeaCollectionDetails } from '../../hooks/useOpenSeaCollection';
import type { Collection } from '../../types';
import { resolveOpenSeaSpec } from '../../utils/openSea';

interface TechnicalSpecProps {
  collection: Collection;
  openSeaDetails?: OpenSeaCollectionDetails | null;
}

const DEFINITIONS: Record<string, string> = {
  'Fully On-Chain':
  'Everything needed to display the work — the image or code, and its metadata — is stored inside the smart contract. Nothing is hosted on a server, so the artwork survives as long as the blockchain does.',
  'Partially On-Chain':
  'Some parts live in the contract (usually the traits or state) while the renderer or media is stored elsewhere, such as IPFS or Arweave.',
  'Off-chain':
  'The artwork and its interactive renderer are hosted outside the blockchain.',
  Dynamic:
  'The work changes after it is minted. Change can be triggered by transfers, a schedule, holder activity, or data from outside the blockchain.',
  Interactive:
  'The token is a document you operate rather than an image you look at — clicking, typing or playing changes what you see and hear.',
  Immutable:
  'The contract has no admin functions. Neither the artist nor the platform can alter the artwork or its rules after deployment.',
  Mutable:
  'The contract retains a limited admin function, disclosed here, that can change part of the work.'
};

const classify = (collection: Collection, storage: string): string[] => {
  const labels: string[] = [];
  if (storage !== 'TBA') {
    labels.push(
      storage === 'Fully On-Chain' ?
      'Fully On-Chain' :
      storage === 'Off-chain' ?
      'Off-chain' :
      'Partially On-Chain'
    );
  }
  if (collection.tech.includes('Dynamic')) labels.push('Dynamic');
  if (collection.tech.includes('Interactive HTML') || collection.tech.includes('Game'))
  labels.push('Interactive');
  if (collection.spec.dynamicBehavior !== 'TBA') {
    labels.push(
      collection.spec.dynamicBehavior.toLowerCase().includes('oracle') ? 'Mutable' : 'Immutable'
    );
  }
  return labels;
};

export const TechnicalSpec: React.FC<TechnicalSpecProps> = ({ collection, openSeaDetails }) => {
  const [copied, setCopied] = useState(false);
  const resolvedSpec = resolveOpenSeaSpec(openSeaDetails, collection.spec);

  const rows: {k: string;v: string;term?: string;}[] = [
  { k: 'Blockchain', v: resolvedSpec.chain },
  { k: 'Contract address', v: resolvedSpec.contract },
  { k: 'Storage method', v: resolvedSpec.storage, term: resolvedSpec.storage },
  { k: 'Artwork format', v: resolvedSpec.format },
  { k: 'Rendering method', v: resolvedSpec.rendering },
  { k: 'Dynamic behaviour', v: resolvedSpec.dynamicBehavior, term: 'Dynamic' }];


  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(resolvedSpec.contract);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      aria-labelledby="spec-title"
      className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-20">
      
      <SectionHeading
        id="spec-title"
        index="Technical"
        title="Specification"
        description="Everything a collector needs to verify what they are buying — and what happens to it after the mint." />
      

      <div className="mt-8 flex flex-wrap gap-2">
        {classify(collection, resolvedSpec.storage).map((label) =>
        <Tooltip key={label} content={DEFINITIONS[label] ?? ''}>
            <span className="rounded-full border border-white/25 px-3.5 py-2 font-mono text-[8px] uppercase tracking-[0.18em] text-paper">
              {label}
            </span>
          </Tooltip>
        )}
      </div>

      <dl className="mt-8 grid gap-x-10 md:grid-cols-2">
        {rows.map((row) =>
        <div
          key={row.k}
          className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t bp-rule py-3.5">
          
            <dt className="font-mono text-10 uppercase tracking-label text-steel">
              {row.term && DEFINITIONS[row.term] ?
            <Tooltip content={DEFINITIONS[row.term]}>
                  <span className="font-mono text-10 uppercase tracking-label text-smoke">
                    {row.k}
                  </span>
                </Tooltip> :

            row.k
            }
            </dt>
            <dd className="max-w-[60%] break-words text-right font-mono text-[13px] text-paper">
              {row.k === 'Contract address' && row.v !== 'TBA' ?
            <button
              type="button"
              onClick={copyContract}
              className="inline-flex items-center gap-2 hover:text-accent"
              aria-label="Copy contract address">
              
                  <span className="hidden sm:inline">{row.v}</span>
                  <span className="sm:hidden">{row.v.slice(0, 10)}…{row.v.slice(-6)}</span>
                  {copied ?
              <CheckIcon className="h-3.5 w-3.5 shrink-0 text-volt" strokeWidth={2} /> :

              <CopyIcon className="h-3.5 w-3.5 shrink-0 text-steel" strokeWidth={1.5} />
              }
                </button> :

            row.v
            }
            </dd>
          </div>
        )}
      </dl>

    </section>);

};
