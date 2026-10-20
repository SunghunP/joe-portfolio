import { Link } from 'react-router-dom';
import pomPhoto from '../assets/images/pomeranian.jpg';

const strengths = [
  {
    title: 'Catch bad data before it gets used',
    body: 'Cut a client project’s data rejection rate from about 50% to 30% in three months by rewriting the standards incoming data had to meet.',
  },
  {
    title: 'Make numbers comparable across teams',
    body: 'Wrote the data collection guide that six teams in Tokyo, London, and the US followed, so their results could be compared side by side.',
  },
  {
    title: 'Explain it to people who don’t live in spreadsheets',
    body: 'Built a Power BI dashboard on Washington analyst wages for a non-technical decision maker choosing where to open an office.',
  },
]

export default function About() {
  return (
    <div className="grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">About</h2>

        <div className="mt-5 space-y-4 text-base leading-relaxed text-muted">
          <p>
            For three-plus years I worked on the quality side of data: on Meta programs through Qualitest, then at
            Applause, my job was to make sure the data teams collected was accurate before anyone used it.
          </p>
          <p>
            Collecting all that data, I kept wondering what story it was telling. That curiosity pulled me into
            analysis, and the habit of checking the number first came with me. The Google Data Analytics
            Certificate gave me SQL and Power BI, and I picked up Python through my own projects.
          </p>
          <p>
            One of those projects started at a local pho restaurant, where the owners believed sales were
            slipping. The data said otherwise: revenue was holding at about $26K a week. An afternoon promotion I
            recommended then lifted their slowest hours by 10%.
          </p>
          <p className="font-medium text-ink">
            Now I'm looking for an analyst role where getting the number right matters.
          </p>
        </div>

        <Link
          to="/projects/pho-restaurant-analysis"
          className="mt-6 inline-block text-sm font-semibold text-primary hover:underline"
        >
          See the pho analysis →
        </Link>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted">What I bring</p>
        <ol className="mt-3 flex flex-col gap-3">
          {strengths.map((item, i) => (
            <li
              key={item.title}
              className="flex gap-4 rounded-xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-1.5 hover:border-bar hover:shadow-lg hover:shadow-primary/20 motion-reduce:transform-none motion-reduce:transition-none"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-tint text-sm font-bold text-primary">
                {i + 1}
              </span>
              <div>
                <b className="block text-sm font-bold text-ink">{item.title}</b>
                <span className="mt-1 block text-sm text-muted">{item.body}</span>
              </div>
            </li>
          ))}
        </ol>

        <figure className="mt-6 flex items-center gap-4 rounded-xl border border-border bg-card p-3 shadow-sm">
          <img
            src={pomPhoto}
            alt="Joe holding his Pomeranian in a tulip field"
            loading="lazy"
            className="h-32 w-32 shrink-0 rounded-lg object-cover sm:h-36 sm:w-36"
          />
          <figcaption>
            <b className="block text-sm font-bold text-ink">Off the clock</b>
            <span className="mt-1 block text-sm text-muted">Proud dad to my Pomeranian.</span>
          </figcaption>
        </figure>
      </div>
    </div>
  )
}
