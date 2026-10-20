import { experience, education } from '../data/experience'

export default function Experience() {
  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">Experience</h2>

      {/* Timeline: a rule down the left with a dot per role, no cards */}
      <ol className="mt-8 border-l-2 border-border">
        {experience.map((job) => (
          <li key={job.role} className="relative pb-10 pl-6 last:pb-0 sm:pl-8">
            <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-bg bg-primary" />
            <div className="sm:flex sm:items-baseline sm:justify-between sm:gap-6">
              <h3 className="text-lg font-bold text-ink">{job.role}</h3>
              <span className="text-sm text-muted sm:shrink-0">{job.period}</span>
            </div>
            <p className="text-sm font-medium text-primary">{job.company}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {job.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-ink">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="mt-12">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Education &amp; Certification</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {education.map((item) => (
            <div key={item.credential} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-bold text-ink">{item.credential}</span>
                <span className="shrink-0 text-sm text-muted">{item.period}</span>
              </div>
              {item.detail && <p className="mt-1 text-sm text-muted">{item.detail}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
