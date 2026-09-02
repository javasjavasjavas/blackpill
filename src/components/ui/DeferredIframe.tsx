import React, { useEffect, useState } from 'react';

interface DeferredIframeProps
  extends Omit<React.IframeHTMLAttributes<HTMLIFrameElement>, 'src'> {
  src: string;
}

export const DeferredIframe: React.FC<DeferredIframeProps> = ({ src, ...props }) => {
  const [activeSrc, setActiveSrc] = useState<string>();

  useEffect(() => {
    let timer: number | undefined;

    const loadPreview = () => {
      timer = window.setTimeout(() => setActiveSrc(src), 0);
    };

    if (document.readyState === 'complete') {
      loadPreview();
    } else {
      window.addEventListener('load', loadPreview, { once: true });
    }

    return () => {
      window.removeEventListener('load', loadPreview);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [src]);

  return <iframe {...props} src={activeSrc} data-deferred-src={src} />;
};
