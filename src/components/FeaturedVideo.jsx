import { useEffect, useRef } from 'react';
import { featuredVideo } from '../data/projects';
import { SectionTitle } from './Section';

const YOUTUBE_ORIGIN = 'https://www.youtube-nocookie.com';
const START_VOLUME = 50;

export default function FeaturedVideo() {
  const iframeRef = useRef(null);

  const sendToPlayer = (message) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(message), YOUTUBE_ORIGIN);
  };

  // The player announces onReady once we register as a listener; set the volume then.
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== YOUTUBE_ORIGIN || event.source !== iframeRef.current?.contentWindow) return;
      let data;
      try {
        data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
      } catch {
        return;
      }
      if (data?.event === 'onReady') {
        sendToPlayer({ event: 'command', func: 'setVolume', args: [START_VOLUME] });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className="text-center">
      <SectionTitle>Watch me present my work</SectionTitle>

      <div className="mx-auto mt-8 max-w-4xl">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg shadow-primary/10">
          <iframe
            ref={iframeRef}
            src={`${YOUTUBE_ORIGIN}/embed/${featuredVideo.youtubeId}?enablejsapi=1`}
            onLoad={() => sendToPlayer({ event: 'listening', id: 1, channel: 'widget' })}
            title={featuredVideo.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full"
          />
        </div>

      </div>
    </div>
  )
}
