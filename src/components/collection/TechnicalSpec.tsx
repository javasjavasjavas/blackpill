import React, { useState } from 'react';
import { ChevronDownIcon, CopyIcon, CheckIcon } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Label } from '../ui/Label';
import { Tooltip } from '../ui/Tooltip';
import { SectionHeading } from '../ui/SectionHeading';
import type { Collection } from '../../types';
import { cn } from '../../utils/format';

interface TechnicalSpecProps {
  collection: Collection;
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

const classify = (collection: Collection): string[] => {
  const labels: string[] = [];
  labels.push(
    collection.spec.storage === 'Fully On-Chain' ?
    'Fully On-Chain' :
    collection.spec.storage === 'Off-chain' ?
    'Off-chain' :
    'Partially On-Chain'
  );
  if (collection.tech.includes('Dynamic')) labels.push('Dynamic');
  if (collection.tech.includes('Interactive HTML') || collection.tech.includes('Game'))
  labels.push('Interactive');
  labels.push(
    collection.spec.dynamicBehavior.toLowerCase().includes('oracle') ? 'Mutable' : 'Immutable'
  );
  return labels;
};

export const TechnicalSpec: React.FC<TechnicalSpecProps> = ({ collection }) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduce = useReducedMotion();

  const rows: {k: string;v: string;term?: string;}[] = [
  { k: 'Blockchain', v: collection.spec.chain },
  { k: 'Contract address', v: collection.spec.contract },
  { k: 'Token standard', v: collection.spec.tokenStandard },
  { k: 'Storage method', v: collection.spec.storage, term: collection.spec.storage },
  { k: 'Metadata location', v: collection.spec.metadataLocation },
  { k: 'Artwork format', v: collection.spec.format },
  { k: 'Rendering method', v: collection.spec.rendering },
  { k: 'Dynamic behaviour', v: collection.spec.dynamicBehavior, term: 'Dynamic' },
  { k: 'License', v: collection.spec.license },
  { k: 'Royalty', v: collection.spec.royalty },
  { k: 'Release date', v: collection.spec.releaseDate }];


  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(collection.spec.contract);
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
        {classify(collection).map((label) =>
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
              {row.k === 'Contract address' ?
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

      <div className="mt-8 border-t bp-rule">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between py-4 text-left">
          
          <Label className="text-paper">Raw token metadata — token #1</Label>
          <ChevronDownIcon
            className={cn(
              'h-4 w-4 text-smoke transition-transform duration-200 ease-swift',
              open && 'rotate-180'
            )}
            strokeWidth={1.5} />
          
        </button>
        <AnimatePresence initial={false}>
          {open &&
          <motion.div
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden">
            
              <pre className="mb-6 overflow-x-auto border bp-rule bg-void p-5 font-mono text-11 leading-relaxed text-bone">
{`{
  "name": "${collection.title} #1",
  "description": "${collection.concept}",
  "artist": "${collection.artistSlug}",
  "chain": "${collection.spec.chain}",
  "standard": "${collection.spec.tokenStandard}",
  "storage": "${collection.spec.storage}",
  "animation_url": "data:text/html;base64,PGh0bWw+…",
  "attributes": [
${collection.traits.
              map((t) => `    { "trait_type": "${t.name}", "value": "${t.values[0]}" }`).
              join(',\n')}
  ],
  "dynamic": ${collection.tech.includes('Dynamic')},
  "renderer": "${collection.spec.rendering}"
}`}
              </pre>
            </motion.div>
          }
        </AnimatePresence>
      </div>
    </section>);

};
