import React, { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRightIcon } from 'lucide-react';
import { ActionButton } from '../ui/ActionButton';
import { HeroCapsuleArtwork } from './HeroCapsuleArtwork';
import { LineReveal } from '../ui/LineReveal';
import { Label } from '../ui/Label';
import { Marquee } from '../ui/Marquee';
import type { Drop } from '../../types';

interface HeroProps {
  nextDrop: Drop;
  variant: 'split' | 'full-bleed';
}

const HEADLINE = ['More than', 'just a JPG'];

export const Hero: React.FC<HeroProps> = ({ nextDrop, variant }) => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const parallax = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const px = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 });
  const py = useSpring(useMotionValue(0), { stiffness: 120, damping: 24 });

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 16);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 12);
  };

  const artwork =
  <motion.div
    style={reduce ? undefined : { y: parallax, x: px }}
    className="absolute inset-0">
    
      <HeroCapsuleArtwork />
    </motion.div>;


  const copy =
  <>
      <Label className="text-paper">Curated Digital Collectibles</Label>

      <h1 className="mt-7 text-[clamp(2.75rem,7vw,7rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em] text-paper">
        <LineReveal lines={HEADLINE} lineClassName="pr-2" />
      </h1>

      <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone md:text-xl">
        A curated gallery and showcase for artists building the next generation of unique digital
        artifacts.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <ActionButton to="/collections" size="lg" magnetic className="!text-ink">
          Explore Collections
          <ArrowRightIcon className="h-4 w-4" strokeWidth={1.5} />
        </ActionButton>
        <ActionButton to="/drops" size="lg" variant="outline">
          View Next Drop
        </ActionButton>
      </div>
    </>;


  return (
    <section ref={ref} onMouseMove={onMove} aria-label="Black Pill introduction" className="relative">
      {variant === 'split' ?
      <div className="relative lg:min-h-[840px]">
          {/* Artwork panel — bleeds to the right edge on desktop */}
          <div className="relative h-[58vh] min-h-[400px] w-full overflow-hidden border-b bp-rule lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-[46%] lg:border-b-0">
            {artwork}
          </div>

          <div className="mx-auto max-w-frame px-5 lg:px-10">
            <div className="grid lg:grid-cols-12">
              <div className="relative z-10 py-20 lg:col-span-7 lg:py-40 xl:py-44">
                {copy}
              </div>
            </div>
          </div>
        </div> :

      <div className="relative">
          <div className="relative h-[62vh] min-h-[420px] w-full overflow-hidden border-b bp-rule lg:h-[78vh]">
            {artwork}
            <div className="absolute inset-x-0 bottom-0">
              <div className="mx-auto max-w-frame px-5 lg:px-10">
                <div className="max-w-3xl bg-ink/95 p-6 lg:p-10">{copy}</div>
              </div>
            </div>
          </div>
        </div>
      }

      <div className="border-y bp-rule py-3">
        <Marquee
          items={[
          'Curated experiments 001—∞',
          `Next drop — ${nextDrop.collectionSlug.replace(/-/g, ' ')}`,
          'Fully on-chain storage',
          'Dynamic token state',
          'Interactive HTML',
          'Live data oracles',
          'Playable contracts',
          'Audio synthesis at render']
          } />
        
      </div>
    </section>);

};
