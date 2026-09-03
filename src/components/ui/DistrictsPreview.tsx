import React, { useEffect, useRef, useState } from 'react';
import { PlayIcon } from 'lucide-react';
import { cn } from '../../utils/format';

interface DistrictsPreviewProps {
  title: string;
  className?: string;
  interactive?: boolean;
  autoLoad?: boolean;
  edgeToEdge?: boolean;
}

const posterUrl = `${import.meta.env.BASE_URL}images/districts-preview.jpg`;
const livePreviewUrl = import.meta.env.PROD
  ? 'https://blackpill-labs.onrender.com/artworks/districts.html'
  : `${import.meta.env.BASE_URL}artworks/districts.html`;

export const DistrictsPreview: React.FC<DistrictsPreviewProps> = ({
  title,
  className,
  interactive = false,
  autoLoad = false,
  edgeToEdge = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [requested, setRequested] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const shouldMount = interactive && requested && visible;

  useEffect(() => {
    if (!interactive || !containerRef.current || !('IntersectionObserver' in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: '160px 0px' }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [interactive]);

  useEffect(() => {
    if (!interactive || !autoLoad) return;

    let timer: number | undefined;
    let idle: number | undefined;

    const activate = () => setRequested(true);
    const queue = () => {
      if ('requestIdleCallback' in window) {
        idle = window.requestIdleCallback(activate, { timeout: 1200 });
      } else {
        timer = window.setTimeout(activate, 150);
      }
    };

    if (document.readyState === 'complete') queue();
    else window.addEventListener('load', queue, { once: true });

    return () => {
      window.removeEventListener('load', queue);
      if (timer !== undefined) window.clearTimeout(timer);
      if (idle !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idle);
    };
  }, [autoLoad, interactive]);

  useEffect(() => {
    if (!shouldMount) setLoaded(false);
  }, [shouldMount]);

  return (
    <div ref={containerRef} className={cn('relative h-full w-full bg-[#06070a]', className)}>
      <img
        src={posterUrl}
        alt={`Preview of ${title}`}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {shouldMount &&
      <iframe
        src={livePreviewUrl}
        title={`Interactive preview of ${title}`}
        className={cn(
          'absolute z-10 border-0 bg-[#06070a]',
          edgeToEdge ?
          '-left-3 -top-3 h-[calc(100%+24px)] w-[calc(100%+24px)] sm:-left-6 sm:-top-6 sm:h-[calc(100%+48px)] sm:w-[calc(100%+48px)]' :
          'inset-0 h-full w-full'
        )}
        sandbox="allow-scripts"
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
      />
      }

      {interactive && !autoLoad && !requested &&
      <button
        type="button"
        onClick={() => setRequested(true)}
        className="absolute bottom-4 left-1/2 z-20 inline-flex -translate-x-1/2 items-center gap-2 border border-white/30 bg-ink/90 px-4 py-2.5 font-mono text-10 uppercase tracking-meta text-paper transition-colors duration-150 hover:border-paper hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper"
      >
          <PlayIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
          Load interactive preview
        </button>
      }

      {shouldMount && !loaded &&
      <span className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 bg-ink/80 px-3 py-2 font-mono text-10 uppercase tracking-meta text-bone animate-pulse">
          Loading Preview
        </span>
      }
    </div>
  );
};
