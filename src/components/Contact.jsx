import Kicker from './Kicker'
import githubIcon from '../assets/icons/github.svg'
import linkedinIcon from '../assets/icons/linkedin.svg'
import mediumIcon from '../assets/icons/medium.svg'

const LINKS = [
  { href: 'https://github.com/SunghunP?tab=repositories', label: 'GitHub', icon: githubIcon },
  { href: 'https://medium.com/@joeparkda', label: 'Medium', icon: mediumIcon },
  { href: 'https://www.linkedin.com/in/sunghunp/', label: 'LinkedIn', icon: linkedinIcon },
]

export default function Contact() {
  return (
    <div className="text-center">
      <Kicker>Contact</Kicker>

      <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-6xl">
        Let's Connect
      </h2>

      <div className="mt-4 flex flex-col items-center gap-1 font-mono text-xl text-muted sm:text-2xl">
        <a href="mailto:joeparkda@gmail.com" className="hover:text-primary">
          joeparkda@gmail.com
        </a>
        <a href="tel:+12063937479" className="hover:text-primary">
          206-393-7479
        </a>
      </div>

      <p className="mx-auto mt-6 max-w-[48ch] text-lg text-muted">
        Open to data-analyst roles in Seattle, WA or remote. Email is the fastest way to reach me.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          href={`${import.meta.env.BASE_URL}Joe_Park_Resume.pdf`}
          download="Joe_Park_Resume.pdf"
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
      </div>
    </div>
  )
}
