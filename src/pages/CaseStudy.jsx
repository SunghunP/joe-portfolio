import { useParams, Link } from 'react-router-dom';
import Shell from '../components/Shell';
import { projects } from '../data/projects';

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Shell className="py-20 text-center">
        <p className="text-ink">Couldn't find that case study.</p>
        <Link to="/" className="mt-4 inline-block font-mono text-sm text-primary hover:underline">
          ← Back to portfolio
        </Link>
      </Shell>
    );
  }

  return (
    <Shell className="py-14 sm:py-20">
      <Link to="/" className="font-mono text-xs font-bold uppercase tracking-widest text-primary hover:underline">
        ← Back to portfolio
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{project.title}</h1>
      <p className="mt-3 max-w-[60ch] text-lg text-muted">{project.description}</p>

      <div className="mt-6 flex gap-2 rounded-lg bg-primary-tint p-4">
        <span className="shrink-0 text-xs font-bold uppercase tracking-wide text-primary">Key finding</span>
        <span className="text-sm text-ink">{project.finding}</span>
      </div>

      <p className="mt-10 rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
        Full write-up in progress — charts, the SQL, and the recommendation are coming next.
      </p>
    </Shell>
  )
}
