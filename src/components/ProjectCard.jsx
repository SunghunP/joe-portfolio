export default function ProjectCard({ title, description, tags, finding, repoUrl, caseStudyUrl }) {
  return (
    <article className="grid gap-6 rounded-xl border border-border bg-card p-6 shadow-sm sm:grid-cols-2 sm:items-center">
      <div className="flex h-48 items-center justify-center rounded-lg bg-surface text-sm text-muted sm:h-full">
        Chart coming next
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl font-bold text-ink">{title}</h3>
        <p className="text-sm text-muted">{description}</p>

        <div className="flex gap-2 rounded-lg bg-primary-tint p-3">
          <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-primary">Key finding</span>
          <span className="text-sm text-ink">{finding}</span>
        </div>

        <div className="mt-2 flex gap-5 font-mono text-sm">
          <a href={repoUrl} className="text-primary hover:underline">GitHub →</a>
          <a href={caseStudyUrl} className="text-primary hover:underline">Read the analysis →</a>
        </div>
      </div>
    </article>
  )
}
