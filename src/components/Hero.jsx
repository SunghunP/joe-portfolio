import { Link } from 'react-router-dom';
import Shell from './Shell';
import Stats from './Stats';
import profilePhoto from '../assets/images/profile.jpg';
import { resumeUrl, socialLinks } from '../data/social';

export default function Hero() {
  return (
    <div className="hero-gradient border-b border-border lg:relative lg:flex lg:min-h-[80vh] lg:items-center">
      <Shell className="w-full py-14 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_440px] lg:items-center">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Open to analyst roles | Seattle, WA &amp; Remote
            </span>

            <h1 className="mx-auto mt-4 max-w-[18ch] text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:mx-0">
              Joe Park
            </h1>
            <p className="mt-2 text-lg text-muted">
              SQL | Power BI | Analytics
            </p>

            <p className="mx-auto mt-4 max-w-[48ch] text-lg text-muted lg:mx-0">
              3+ years in data operations and QA, paired with SQL and Power BI skills built through Google's Data Analytics Certificate and my own project work.
            </p>
            <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="grid h-11 w-11 place-items-center rounded-full sm:h-9 sm:w-9 border border-border bg-card text-muted transition hover:border-primary hover:text-primary"
                >
                  <img src={link.icon} alt="" className="icon-mono h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Link to="/#projects" className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-on-primary">
                View Projects
              </Link>
              <a href={resumeUrl}
                download="Joe_Park_Resume.pdf"
                className="rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary">
                Resume (PDF)
              </a>
            </div>
          </div>

          <div className="order-first mx-auto w-full max-w-[15rem] overflow-hidden rounded-[2.5rem] border border-border bg-card photo-aura sm:max-w-sm sm:rounded-[3rem] lg:order-none lg:max-w-none">
            <img
              src={profilePhoto}
              alt="Portrait of Joe Park"
              className="dim-in-dark aspect-square w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <Stats />
        </div>
      </Shell>

      <div className="hidden lg:absolute lg:bottom-6 lg:left-1/2 lg:flex lg:-translate-x-1/2 lg:flex-col lg:items-center lg:gap-1 lg:text-muted">
        <span className="text-xs font-medium">Scroll</span>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 animate-bounce motion-reduce:animate-none"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}
