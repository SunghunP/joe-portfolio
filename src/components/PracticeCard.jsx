import githubIcon from '../assets/icons/github.svg';

export default function PracticeCard({ title, description, tags, focusAreas, repoUrl }) {
  return (
    <article className="relative flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-sm transition hover:border-primary hover:shadow-lg hover:shadow-primary/20 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary motion-reduce:transition-none sm:col-span-2 md:flex-row md:items-center md:justify-between md:gap-8">
      <div className="flex items-start gap-3">
        <img src={githubIcon} alt="" className="icon-mono mt-1 h-5 w-5 shrink-0" />
        <div>
          <h3 className="text-lg font-bold text-ink">
            {/* Stretched link: the whole card opens the repo */}
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:rounded-xl hover:text-primary"
            >
              {title}
            </a>
          </h3>
          <p className="mt-1 text-sm text-muted">{description}</p>
          <p className="mt-2 text-sm font-semibold text-primary">View on GitHub →</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 md:max-w-[50%] md:justify-end">
        {[...tags, ...focusAreas].map((chip) => (
          <span key={chip} className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted">
            {chip}
          </span>
        ))}
      </div>
    </article>
  )
}
