import { Link } from 'react-router-dom';
import Shell from './Shell';
import profilePhoto from '../assets/images/profile.jpg';
import EmailIcon from './EmailIcon';
import { socialLinks, email } from '../data/social';

export default function Hero() {
  return (
    <Shell className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1fr_440px] lg:items-center lg:py-24">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          Open to analyst roles | Seattle, WA &amp; Remote
        </span>

        <h1 className="mt-4 max-w-[18ch] text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
          Joe Park
        </h1>
        <p className="mt-2 text-lg text-muted">
          SQL | Power BI | Analytics
        </p>

        <p className="mt-4 max-w-[48ch] text-lg text-muted">
          3+ years in data operations and QA, formalized through Google's Data Analytics Certificate. SQL and Power BI for the build — a clear recommendation for the room.
        </p>
        <div className="mt-4 flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted transition hover:border-primary hover:text-primary"
            >
              <img src={link.icon} alt="" className="h-4 w-4" />
            </a>
          ))}
          <a
            href={`mailto:${email}`}
            aria-label="Email"
            className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-muted transition hover:border-primary hover:text-primary"
          >
            <EmailIcon className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/#projects" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white">
            View Projects
          </Link>
          <a href={`${import.meta.env.BASE_URL}Joe_Park_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary">
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
