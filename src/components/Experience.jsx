import Kicker from './Kicker'
import { experience, education } from '../data/experience'

export default function Experience() {
  return (
    <div>
      <Kicker>Experience</Kicker>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Path here</h2>

      <div className="mt-8 flex flex-col gap-4">
        {experience.map((job) => (
          <div
            key={job.role}
            className={`rounded-xl border p-5 shadow-sm transition hover:-translate-y-1.5 hover:border-bar hover:shadow-lg motion-reduce:transform-none motion-reduce:transition-none sm:grid sm:grid-cols-[9rem_1fr] sm:gap-5 ${job.featured ? 'border-primary bg-primary-tint' : 'border-border bg-card'
              }`}
          >
            <div className="font-mono text-xs text-muted">{job.period}</div>
            <div>
              <h3 className="font-bold text-ink">{job.role}</h3>
              <p className="text-xs text-muted">{job.company}</p>
              <p className="mt-2 text-sm text-ink">{job.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-border pt-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-muted">Education &amp; Certification</h3>
        <div className="mt-3 flex flex-col gap-2">
          {education.map((item) => (
            <div key={item.credential} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm">
              <span className="font-semibold text-ink">
                {item.credential}
                {item.detail && <span className="font-normal text-muted"> — {item.detail}</span>}
              </span>
              <span className="font-mono text-xs text-muted">{item.period}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
