import { Link } from 'react-router-dom';
import Shell from './Shell';
import profilePhoto from '../assets/images/profile.jpg';

export default function Hero() {
  return (
    <Shell className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_440px] lg:items-center lg:py-24">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
          <span className="h-2 w-2 rounded-full bg-success" />
          Open to analyst roles | Kirkland, WA &amp; Remote
        </span>

        <h1 className="mt-4 max-w-[18ch] text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          A data analyst who takes the question all the way to the answer.
        </h1>

        <p className="mt-4 max-w-[48ch] text-lg text-muted">
          3+ years in data operations and QA, formalized through Google's Data Analytics Certificate. SQL and Power BI for the build — a clear recommendation for the room.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/#projects" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white">
            View Projects
          </Link>
          <a href="/Joe_Park_Resume.pdf" className="rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary">
            Resume (PDF)
          </a>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <img
          src={profilePhoto}
          alt="Portrait of Joe Park"
          className="aspect-square w-full object-cover"
        />
      </div>

    </Shell>
  )
}
