import React from 'react';
import { Label } from '../ui/Label';
import { Reveal } from '../ui/Reveal';

/** Inverted editorial break between the hero and the marketplace registers. */
export const Manifesto: React.FC = () =>
<section aria-labelledby="manifesto-title" className="bg-paper text-ink">
    <div className="mx-auto max-w-frame px-5 py-16 lg:px-10 lg:py-28">
      <div className="flex items-start justify-between border-b border-ink/20 pb-4">
        <span className="font-mono text-10 uppercase tracking-label text-ink/50">
          Manifesto — 002
        </span>
        <span className="font-mono text-10 uppercase tracking-label text-ink/50">
          Black Pill® / Curatorial
        </span>
      </div>

      <Reveal className="pt-10 lg:pt-16">
        <h2
        id="manifesto-title"
        className="text-[clamp(1.5rem,6vw,6rem)] font-extrabold uppercase leading-[0.86] tracking-tightest">
        
          <span className="block">Showcasing the</span>
          <span className="block pl-[8%]">new generation of</span>
          <span
          className="block whitespace-nowrap pl-0 text-transparent sm:pl-[6%] lg:pl-[10%]"
          style={{ WebkitTextStroke: '1.5px #0A0A0A' }}>
          
            Digital Collectibles
          </span>
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-8 border-t border-ink/20 pt-8 lg:mt-20 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Label className="text-ink/50">Position</Label>
        </div>
        <p className="text-xl font-medium leading-snug tracking-tight lg:col-span-8 lg:text-3xl">
          Black Pill exists for work that explores what an NFT can actually be beyond an image, a
          art experiment, a tool, a game, a live measurement or any innovative mechanism or
          creative process.
        </p>
      </div>
    </div>
  </section>;
