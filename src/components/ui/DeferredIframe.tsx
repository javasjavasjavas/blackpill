import React, { useEffect, useRef, useState } from 'react';

interface DeferredIframeProps
  extends Omit<React.IframeHTMLAttributes<HTMLIFrameElement>, 'src'> {
  src: string;
  delayMs?: number;
  rootMargin?: string;
}

export const DeferredIframe: React.FC<DeferredIframeProps> = ({
  src,
  delayMs = 250,
  rootMargin = '300px 0px',
  loading = 'lazy',
  ...props
}) => {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [activeSrc, setActiveSrc] = useState<string>();

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame || !('IntersectionObserver' in window)) {
      setNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setNearViewport(true);
        observer.disconnect();
      },
      { rootMargin }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [rootMargin]);

  useEffect(() => {
    if (!nearViewport) return;

    let timer: number | undefined;
    let idle: number | undefined;

    const loadPreview = () => {
      const activate = () => {
        timer = window.setTimeout(() => setActiveSrc(src), delayMs);
      };

      if ('requestIdleCallback' in window) {
        idle = window.requestIdleCallback(activate, { timeout: 2000 });
      } else {
        activate();
      }
    };

    if (document.readyState === 'complete') {
      loadPreview();
    } else {
      window.addEventListener('load', loadPreview, { once: true });
    }

    return () => {
      window.removeEventListener('load', loadPreview);
      if (timer !== undefined) window.clearTimeout(timer);
      if (idle !== undefined && 'cancelIdleCallback' in window) window.cancelIdleCallback(idle);
    };
  }, [delayMs, nearViewport, src]);

  return (
    <iframe
      {...props}
      ref={frameRef}
      src={activeSrc}
      loading={loading}
      data-deferred-src={src}
      data-preview-state={activeSrc ? 'loading' : 'queued'} />
  );
};
