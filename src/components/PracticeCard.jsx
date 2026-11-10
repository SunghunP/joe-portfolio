import Chips from './Chips';
import SqlArt from './SqlArt';

// Sits in the project grid as its own card, laid out like a ProjectCard
export default function PracticeCard({ title, description, tags, focusAreas, repoUrl }) {
  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition hover:border-primary hover:shadow-lg hover:shadow-primary/20 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary motion-reduce:transition-none">
      <Chips items={tags} className="items-start" />

      <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-surface [&>svg]:transition-transform [&>svg]:duration-300 group-hover:[&>svg]:scale-[1.02] motion-reduce:[&>svg]:transition-none">
        <SqlArt />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <h3 className="text-lg font-bold text-ink group-hover:text-primary">{title}</h3>
        <p className="text-sm text-muted">{description}</p>

        <div className="mt-auto flex flex-col gap-3">
          <Chips items={focusAreas} />
          {/* Stretched link: the whole card opens the repo */}
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary after:absolute after:inset-0 after:rounded-xl hover:underline"
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </article>
  )
}
