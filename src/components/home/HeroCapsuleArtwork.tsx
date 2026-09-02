import React from 'react';
import pillTopUrl from '../../assets/hero-pill-top.png';
import pillSphereUrl from '../../assets/hero-pill-sphere.png';
import pillBottomUrl from '../../assets/hero-pill-bottom.png';

export const HeroCapsuleArtwork: React.FC = () => (
  <div
    role="img"
    aria-label="Black Pill capsule open around a luminous digital sphere"
    className="absolute inset-0 overflow-hidden bg-ink">
    <div className="absolute left-1/2 top-1/2 aspect-[9/10] h-[78%] max-h-[640px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 lg:h-[72%]">
      <div aria-hidden="true" className="bp-hero-smoke bp-hero-smoke--cyan" />
      <div aria-hidden="true" className="bp-hero-smoke bp-hero-smoke--violet" />
      <div aria-hidden="true" className="bp-hero-smoke bp-hero-smoke--green" />

      <div aria-hidden="true" className="bp-hero-orb-glow" />
      <div aria-hidden="true" className="bp-hero-orb-spectrum" />

      <img
        data-testid="hero-pill-bottom"
        src={pillBottomUrl}
        alt=""
        aria-hidden="true"
        draggable={false}
        loading="eager"
        decoding="async"
        className="bp-hero-pill-bottom pointer-events-none absolute left-[12%] top-[43%] z-20 w-[50%] select-none object-contain drop-shadow-[0_28px_26px_rgba(0,0,0,0.7)]"
      />

      <div className="pointer-events-none absolute left-[38%] top-[32.5%] z-30 isolate w-[24%] translate-x-2.5 -translate-y-2.5">
        <div
          data-testid="hero-sphere-aura"
          aria-hidden="true"
          className="bp-hero-sphere-aura absolute -inset-[22%] z-0 rounded-full opacity-50 mix-blend-screen blur-[20px]"
        />
        <img
          data-testid="hero-sphere"
          src={pillSphereUrl}
          alt=""
          aria-hidden="true"
          draggable={false}
          loading="eager"
          decoding="async"
          className="bp-hero-sphere relative z-10 block w-full select-none object-contain drop-shadow-[0_0_18px_rgba(61,98,255,0.75)]"
        />
      </div>

      <div
        aria-hidden="true"
        className="bp-hero-sphere-ring pointer-events-none absolute left-[37.5%] top-[32%] z-40 h-[25%] w-[25%] translate-x-2.5 -translate-y-2.5 rounded-full border border-cyan-200/20 mix-blend-screen"
      />

      <img
        data-testid="hero-pill-top"
        src={pillTopUrl}
        alt=""
        aria-hidden="true"
        draggable={false}
        loading="eager"
        decoding="async"
        className="bp-hero-pill-top pointer-events-none absolute left-[43%] top-[-3%] z-20 w-[48%] select-none object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,0.55)]"
      />
    </div>
  </div>
);
