import { useEffect, useRef, useState } from 'react';
import type { PortfolioMedia } from '@/hooks/useUniqueCreatorPortfolio';

interface FeedViewerVideoProps {
  media: PortfolioMedia;
  active: boolean;
}

/** Own playback inside the portal: the parent effect can run before its videos mount. */
export const FeedViewerVideo = ({ media, active }: FeedViewerVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [media.url]);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (active) {
      // A browser may reject autoplay (e.g. Low Power Mode). Native controls remain
      // available for a user gesture; don't swallow the only way to start playback.
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
    return () => video.pause();
  }, [active, media.url]);

  return (
    <div className="relative h-full w-full pt-12 pb-24">
      <video
        ref={ref}
        src={media.url}
        aria-label={`Video by ${media.creatorName}`}
        className="h-full w-full object-contain"
        autoPlay={active}
        controls
        muted
        loop
        playsInline
        preload={active ? 'auto' : 'metadata'}
        onLoadedData={() => setFailed(false)}
        onError={() => setFailed(true)}
      />
      {failed && (
        <p role="alert" className="absolute inset-x-4 top-1/2 text-center text-sm text-white">
          This video couldn’t load. Close it and try again.
        </p>
      )}
    </div>
  );
};
