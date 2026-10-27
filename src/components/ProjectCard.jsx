import { Link } from 'react-router-dom';
import Chips from './Chips';

// The featured (latest) project spans the full row, with the image beside the text on large screens
export default function ProjectCard({ title, description, tags, finding, repoUrl, caseStudyUrl, media, featured = false }) {
  return (
    <article className={`group relative flex h-full flex-col gap-4 rounded-xl ${featured ? 'sm:col-span-2 lg:grid lg:grid-cols-[1.3fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-8 lg:p-8 ' : ''} border border-border bg-card p-6 shadow-sm transition hover:border-primary hover:shadow-lg hover:shadow-primary/20 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary motion-reduce:transition-none`}>
      <Chips items={tags} className={`items-start ${featured ? 'lg:col-start-2 lg:row-start-1' : ''}`} />

      <div className={`aspect-[16/10] w-full overflow-hidden ${featured ? 'lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:aspect-auto lg:h-full' : ''} rounded-lg bg-surface [&>img]:transition-transform [&>img]:duration-300 group-hover:[&>img]:scale-[1.02] motion-reduce:[&>img]:transition-none`}>
        {media}
      </div>

      <div className={`flex min-w-0 flex-1 flex-col gap-3 ${featured ? 'lg:col-start-2' : ''}`}>
        <h3 className={`font-bold text-ink group-hover:text-primary ${featured ? 'text-xl sm:text-2xl' : 'text-lg'}`}>{title}</h3>
        <p className="text-sm text-muted">{description}</p>

        <div className="mt-auto flex flex-col gap-3">
          <div className={`flex flex-col gap-1 rounded-lg bg-primary-tint p-3 ${featured ? 'lg:flex-row lg:gap-2' : ''}`}>
            <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-primary">Key finding</span>
            <span className="text-sm text-ink">{finding}</span>
          </div>

          <div className="flex gap-5 text-sm font-semibold">
            {/* Stretched link: the whole card opens the case study */}
            <Link to={caseStudyUrl} className="text-primary after:absolute after:inset-0 after:rounded-xl hover:underline">
              Read the analysis →
            </Link>
            <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="relative z-10 text-muted hover:text-primary hover:underline">
              GitHub →
            </a>
          </div>
        </div>
      </div>
    </article>
  )
}
