import { Link } from 'react-router-dom';
import Kicker from './Kicker';
import { featuredVideo } from '../data/projects';

export default function FeaturedVideo() {
  return (
    <div>
      <Kicker>Featured</Kicker>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Watch me present my work</h2>

      <div className="mt-8">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${featuredVideo.youtubeId}`}
            title={featuredVideo.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-full w-full"
          />
        </div>

        <div className="mt-6 flex flex-col gap-3">
          {featuredVideo.highlights.map((highlight) => (
            <div key={highlight.label} className="flex flex-col gap-1 rounded-lg bg-primary-tint p-4 sm:flex-row sm:gap-3">
              <span className="shrink-0 text-sm font-bold text-ink">{highlight.label}:</span>
              <span className="text-sm text-muted">{highlight.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link to="/#projects" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary">
            View My Projects ↓
          </Link>
        </div>
      </div>
    </div>
  )
}
