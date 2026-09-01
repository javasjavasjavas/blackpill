import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import pillTopUrl from '../../assets/hero-pill-top.png';
import pillSphereUrl from '../../assets/hero-pill-sphere.png';
import pillBottomUrl from '../../assets/hero-pill-bottom.png';

const smoothLoop = {
  duration: 11,
  repeat: Infinity,
  repeatType: 'mirror' as const,
  ease: [0.45, 0, 0.55, 1] as const
};

export const HeroCapsuleArtwork: React.FC = () => {
  const reduce = useReducedMotion();

  return (
    <div
      role="img"
      aria-label="Black Pill capsule open around a luminous digital sphere"
      className="absolute inset-0 overflow-hidden bg-ink">
      <div className="absolute left-1/2 top-1/2 aspect-[9/10] h-[78%] max-h-[640px] max-w-[90%] -translate-x-1/2 -translate-y-1/2 lg:h-[72%]">
        <motion.svg
          viewBox="0 0 900 1000"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[18%] h-[136%] w-[136%] overflow-visible mix-blend-screen"
          animate={reduce ? undefined : { rotate: [-2, 2.5, -2], scale: [0.98, 1.025, 0.98] }}
          transition={smoothLoop}>
          <defs>
            <linearGradient id="hero-smoke-cyan" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#00e5ff" stopOpacity="0" />
              <stop offset="0.42" stopColor="#00d8ff" stopOpacity="0.7" />
              <stop offset="1" stopColor="#00ffa8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-smoke-violet" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8638ff" stopOpacity="0" />
              <stop offset="0.46" stopColor="#8b2fff" stopOpacity="0.8" />
              <stop offset="1" stopColor="#ff00b7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="hero-smoke-green" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#34ff80" stopOpacity="0" />
              <stop offset="0.5" stopColor="#00e59b" stopOpacity="0.52" />
              <stop offset="1" stopColor="#00b8ff" stopOpacity="0" />
            </linearGradient>
            <filter id="hero-smoke-distortion" x="-40%" y="-40%" width="180%" height="180%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.009 0.021"
                numOctaves="3"
                seed="17"
                result="noise" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="92"
                xChannelSelector="R"
                yChannelSelector="B" />
              <feGaussianBlur stdDeviation="15" />
            </filter>
          </defs>

          <motion.g
            filter="url(#hero-smoke-distortion)"
            animate={reduce ? undefined : { x: [-20, 22, -20], y: [12, -16, 12], opacity: [0.34, 0.58, 0.34] }}
            transition={{ ...smoothLoop, duration: 13 }}>
            <path
              d="M58 660 C180 480 286 650 412 470 S662 350 846 470"
              fill="none"
              stroke="url(#hero-smoke-cyan)"
              strokeWidth="42"
              strokeLinecap="round" />
            <path
              d="M100 760 C218 608 332 744 476 564 S708 484 842 352"
              fill="none"
              stroke="url(#hero-smoke-green)"
              strokeWidth="30"
              strokeLinecap="round" />
            <path
              d="M86 386 C264 248 344 440 486 302 S704 184 842 294"
              fill="none"
              stroke="url(#hero-smoke-violet)"
              strokeWidth="38"
              strokeLinecap="round" />
            <path
              d="M126 570 C242 420 348 566 474 426 S690 288 798 390"
              fill="none"
              stroke="url(#hero-smoke-violet)"
              strokeWidth="22"
              strokeLinecap="round" />
            <path
              d="M180 800 C270 664 390 810 514 654 S718 606 786 510"
              fill="none"
              stroke="url(#hero-smoke-cyan)"
              strokeWidth="18"
              strokeLinecap="round" />
          </motion.g>
        </motion.svg>

        <motion.div
          aria-hidden="true"
          className="absolute left-[31%] top-[26%] z-10 h-[38%] w-[38%] rounded-full opacity-90 mix-blend-screen blur-[34px]"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(96,45,255,.96) 0%, rgba(0,129,255,.7) 29%, rgba(255,0,184,.42) 51%, rgba(0,229,160,.2) 68%, transparent 76%)'
          }}
          animate={reduce ? undefined : { scale: [0.92, 1.08, 0.92], opacity: [0.66, 0.95, 0.66] }}
          transition={{ ...smoothLoop, duration: 5.8 }} />

        <motion.div
          aria-hidden="true"
          className="absolute left-[32.5%] top-[27.5%] z-10 h-[35%] w-[35%] rounded-full opacity-65 mix-blend-screen blur-xl"
          style={{
            background:
              'conic-gradient(from 90deg, rgba(0,229,255,.8), rgba(136,50,255,.9), rgba(255,0,180,.85), rgba(0,255,158,.62), rgba(0,229,255,.8))'
          }}
          animate={reduce ? undefined : { rotate: [0, 360], scale: [0.94, 1.04, 0.94] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />

        <motion.img
          data-testid="hero-pill-bottom"
          src={pillBottomUrl}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute left-[12%] top-[43%] z-20 w-[50%] select-none object-contain drop-shadow-[0_28px_26px_rgba(0,0,0,0.7)] will-change-transform"
          animate={reduce ? undefined : { y: [2.5, -2.5, 2.5] }}
          transition={{
            duration: 7.8,
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatType: 'loop',
            ease: [0.42, 0, 0.58, 1]
          }}
        />

        <div className="pointer-events-none absolute left-[38%] top-[32.5%] z-30 isolate w-[24%] translate-x-2.5 -translate-y-2.5">
          <motion.div
            data-testid="hero-sphere-aura"
            aria-hidden="true"
            className="absolute -inset-[22%] z-0 rounded-full opacity-50 mix-blend-screen blur-[20px] will-change-transform"
            style={{
              background:
                'conic-gradient(from 20deg, rgba(0,229,255,.62), rgba(79,60,255,.48), rgba(255,0,183,.58), rgba(0,255,157,.38), rgba(0,229,255,.62))'
            }}
            animate={reduce ? undefined : { rotate: [0, 360], scale: [0.94, 1.08, 0.94], opacity: [0.34, 0.62, 0.34] }}
            transition={{
              rotate: { duration: 14, repeat: Infinity, ease: 'linear' },
              scale: { duration: 6.8, times: [0, 0.5, 1], repeat: Infinity, ease: [0.42, 0, 0.58, 1] },
              opacity: { duration: 6.8, times: [0, 0.5, 1], repeat: Infinity, ease: [0.42, 0, 0.58, 1] }
            }}
          />
          <motion.img
            data-testid="hero-sphere"
            src={pillSphereUrl}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="relative z-10 block w-full select-none object-contain drop-shadow-[0_0_18px_rgba(61,98,255,0.75)] will-change-transform"
            animate={reduce ? undefined : { y: [-6, 7, -6] }}
            transition={{
              duration: 5.2,
              times: [0, 0.5, 1],
              repeat: Infinity,
              repeatType: 'loop',
              ease: [0.42, 0, 0.58, 1]
            }}
          />
        </div>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute left-[37.5%] top-[32%] z-40 h-[25%] w-[25%] translate-x-2.5 -translate-y-2.5 rounded-full border border-cyan-200/20 mix-blend-screen"
          animate={reduce ? undefined : { scale: [0.94, 1.08, 0.94], opacity: [0.2, 0.58, 0.2] }}
          transition={{ ...smoothLoop, duration: 4.8 }} />

        <motion.img
          data-testid="hero-pill-top"
          src={pillTopUrl}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="pointer-events-none absolute left-[43%] top-[-3%] z-20 w-[48%] select-none object-contain drop-shadow-[0_24px_24px_rgba(0,0,0,0.55)] will-change-transform"
          animate={reduce ? undefined : { y: [-2.5, 2.5, -2.5] }}
          transition={{
            duration: 7.2,
            times: [0, 0.5, 1],
            repeat: Infinity,
            repeatType: 'loop',
            ease: [0.42, 0, 0.58, 1]
          }}
        />
      </div>

    </div>
  );
};
