import Kicker from './Kicker'
import githubIcon from '../assets/icons/github.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import mediumIcon from '../assets/icons/medium.svg'

const LINKS = [
  { href: 'https://github.com/SunghunP', label: 'GitHub', icon: githubIcon },
  { href: 'https://medium.com/@joeparkda', label: 'Medium', icon: mediumIcon },
  { href: 'https://www.linkedin.com/in/sunghunp/', label: 'LinkedIn', icon: linkedinIcon },
]

function EmailIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

export default function Contact() {
  return (
    <div className="text-center">
      <Kicker>Contact</Kicker>

      <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-6xl">
        Let's talk.
      </h2>

      <p className="mx-auto mt-4 max-w-[48ch] text-lg text-muted">
        Open to data-analyst roles in Seattle, WA or remote. Email is the fastest way to reach me.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`${import.meta.env.BASE_URL}Joe_Park_Resume.pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-strong"
        >
          Download Résumé
        </a>

        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary-tint"
          >
            <img src={link.icon} alt="" className="h-4 w-4" />
            {link.label}
          </a>
        ))}

        <a
          href="mailto:joeparkda@gmail.com"
          className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-3 text-sm font-semibold text-primary transition hover:bg-primary-tint"
        >
          <EmailIcon className="h-4 w-4" />
          Email
        </a>
      </div>
    </div>
  )
}
