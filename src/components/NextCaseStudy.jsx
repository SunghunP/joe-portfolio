import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

// Closes a case study with a link to the next project, wrapping back to the first.
export default function NextCaseStudy({ currentSlug }) {
  const index = projects.findIndex((p) => p.slug === currentSlug);
  const next = projects[(index + 1) % projects.length];

  return (
    <Link
      to={next.caseStudyUrl}
      className="group mt-10 block rounded-xl border border-border bg-card p-6 shadow-sm transition hover:border-primary hover:shadow-lg hover:shadow-primary/20 motion-reduce:transition-none"
    >
      <p className="text-xs font-bold uppercase tracking-widest text-primary">Next project</p>
      <p className="mt-2 text-xl font-bold text-ink group-hover:text-primary">{next.title} →</p>
      <p className="mt-2 text-sm text-muted">{next.finding}</p>
    </Link>
  )
}
