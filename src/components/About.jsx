import Kicker from './Kicker';

const highlights = [
  {
    title: 'Protects data integrity',
    body: 'Checks for outliers, duplicates, and double-counts before trusting a number — sometimes with a phone call to confirm it.',
  },
  {
    title: 'Partners across teams',
    body: 'Six teams, three time zones, one SOP: I write process docs and reports the whole group can actually use.',
  },
  {
    title: 'Built for the non-technical',
    body: 'Dashboards and recommendations aimed at the person making the call, not just other analysts.',
  },
]

export default function About() {
  return (
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <Kicker>About</Kicker>
        <div className="mt-3 space-y-4 text-base text-ink">
          <p>
            Before analytics, I spent three-plus years partnering across departments in Fortune 500 programs — Meta,
            Amazon, Google, Microsoft — on data collection, QA, and reporting: writing SOPs, running structured test
            plans, chasing down data-integrity issues. The Google Data Analytics Certificate turned that instinct for
            "is this number actually right" into formal SQL, Python, and BI training.
          </p>
          <p>
            I like the problems where the hard part is deciding what to measure and trust. Based in Seattle, WA;
            open to data-analyst roles.
          </p>
        </div>
      </div>

      <div className=" flex flex-col gap-3">
        {highlights.map((item) => (
          <div key={item.title} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <b className="block text-sm font-bold text-ink">{item.title}</b>
            <span className="mt-1 block text-sm text-muted">{item.body}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
