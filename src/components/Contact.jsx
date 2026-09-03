import Kicker from './Kicker'

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
        <a
          href="https://www.linkedin.com/in/sunghunp/"
          className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary-tint"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/SunghunP"
          className="rounded-full border border-primary px-6 py-3 text-sm font-semibold text-primary transition hover:bg-primary-tint"
        >
          GitHub
        </a>
      </div>

      <p className="mt-8">
        <a
          href="mailto:sunghun.josephp@gmail.com"
          className="font-mono text-sm text-primary underline underline-offset-4 hover:text-primary-strong"
        >
          joeparkda@gmail.com
        </a>
      </p>
    </div>
  )
}
