import React from 'react';
import { ArtCanvas } from '../art/ArtCanvas';
import type { Collection, Token } from '../../types';
import { formatPrice } from '../../utils/format';

interface TokenCardProps {
  token: Token;
  collection: Collection;
  onOpen: () => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token, collection, onOpen }) =>
<button
  type="button"
  onClick={onOpen}
  data-cursor="Inspect"
  className="group block w-full text-left"
  aria-label={`Open ${collection.title} token ${token.number}`}>
  
    <div className="relative aspect-square w-full overflow-hidden border bp-rule">
      <ArtCanvas
      variant={collection.art.variant}
      accent={collection.art.accent}
      seed={token.seed}
      size="thumb"
      className="absolute inset-0 h-full w-full transition-transform duration-300 ease-expo group-hover:scale-[1.03]" />
    
      {token.listed &&
    <span className="absolute right-2 top-2 bg-paper px-1.5 py-0.5 font-mono text-10 uppercase tracking-meta text-ink">
          Listed
        </span>
    }
    </div>
    <div className="mt-2.5 flex items-baseline justify-between gap-2">
      <span className="font-mono text-11 tabular-nums text-paper">#{token.number}</span>
      <span className="truncate font-mono text-10 uppercase tracking-meta text-steel">
        {token.state}
      </span>
    </div>
    <div className="mt-1 flex items-baseline justify-between gap-2">
      <span className="truncate font-mono text-10 text-smoke">{token.owner}</span>
      <span className="shrink-0 font-mono text-10 tabular-nums text-bone">
        {token.listed && token.price ? formatPrice(token.price, collection.currency) : '—'}
      </span>
    </div>
  </button>;