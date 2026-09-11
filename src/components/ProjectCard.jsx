import { Link } from 'react-router-dom';

export default function ProjectCard({ title, description, tags, finding, repoUrl, caseStudyUrl, media }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface">
        {media}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-ink">{title}</h3>
        <p className="text-sm text-muted">{description}</p>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex gap-2 rounded-lg bg-primary-tint p-3">
            <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-primary">Key finding</span>
            <span className="text-sm text-ink">{finding}</span>
          </div>

          <div className="flex gap-5 font-mono text-sm">
            <a href={repoUrl} className="text-primary hover:underline">GitHub →</a>
            <Link to={caseStudyUrl} className="text-primary hover:underline">Read the analysis →</Link>
          </div>
        </div>
      </div>
    </article>
  )
}
