import { Link } from 'react-router-dom';
import Shell from '../components/Shell';
import heatmapImage from '../assets/images/pho/sales_heatmap.png';
import revenueTrendImage from '../assets/images/pho/weekly_revenue_trend.png';
import orderTypeHeatmapImage from '../assets/images/pho/sales_heatmap_by_order_type.png';
import topItemsImage from '../assets/images/pho/top15_items_revenue.png';
import { projects } from '../data/projects';

const META = [
  { label: 'Prepared by', value: 'Joe Park' },
  { label: 'Tools', value: 'Python, Pandas, Seaborn, Matplotlib' },
  { label: 'Data', value: '~3 months of POS exports, 38,293 line items' },
  { label: 'Scope', value: "Parents' restaurant, June 3 – Sept 2, 2026" },
]

const QUESTIONS = [
  'When is the restaurant busiest, by day and hour?',
  'Which menu items are the most popular and most profitable, and are they the same?',
  'Is revenue trending up, down, or holding steady?',
]

const FINDINGS = [
  'Demand peaks around 12PM, 5PM, and 9PM, and is driven mostly by to-go orders rather than dine-in.',
  'Friday, Saturday, and Sunday are the busiest days. Tuesday is the slowest.',
  'Steak (Pho) is both the top seller and the top revenue item. Some items are popular but don’t make much money — appetizers like Spring Roll sell a lot but rank lower in revenue.',
]

const RECOMMENDATIONS = [
  'Run a targeted special/happy hour during 1PM–4PM, the slowest window of the day.',
  'Run a Tuesday-specific promotion, since it’s consistently the slowest day.',
  'Since the 5PM and 9PM peaks are mostly to-go orders, focus extra staffing there on packing to-go orders rather than table service.',
]

const LIMITATIONS = [
  'No baseline for comparison. This is a single quarter with no prior period (last year, last quarter) to benchmark against, so "flat" describes this 13-week window only.',
  'Small sample per heatmap cell. Each day-and-hour average is built from only 13–14 data points (one per matching weekday in the quarter), so a single unusual day could shift a cell more than a real pattern would.',
  'Revenue is marginally understated. The 89 removed post-midnight records were legitimate sales (~$700), so totals in this analysis slightly undercount the restaurant’s actual books.',
]

export default function PhoAnalysis() {
  const project = projects.find((p) => p.slug === 'pho-restaurant-analysis');

  return (
    <Shell className="py-14 sm:py-20">
      <Link to="/" className="font-mono text-xs font-bold uppercase tracking-widest text-primary hover:underline">
        ← Back to portfolio
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        Pho Restaurant Sales Analysis
      </h1>
      <p className="mt-2 font-mono text-sm italic text-muted">
        Checking whether "business feels slower" actually shows up in the sales data
      </p>

      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
        {META.map((item) => (
          <div key={item.label} className="bg-card p-3">
            <div className="text-[0.65rem] font-bold uppercase tracking-wide text-muted">{item.label}</div>
            <div className="mt-1 text-sm text-ink">{item.value}</div>
          </div>
        ))}
      </div>

      <figure className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <img
          src={heatmapImage}
          alt="Average sales by day of week and hour, showing peaks at lunch, early dinner, and late night"
          className="w-full"
        />
        <figcaption className="border-t border-border px-4 py-2 font-mono text-xs text-muted">
          Average sales by day and hour across the quarter — darker green marks the busiest slots.
        </figcaption>
      </figure>

      <h2 className="mt-12 text-xl font-bold text-ink">The Question</h2>
      <p className="mt-3 text-ink">
        My parents felt like business had been slowing down and wanted a specific number they could see, rather
        than just a feeling from being there every day. This analysis was meant to check that feeling against the
        actual data, along with:
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {QUESTIONS.map((q) => (
          <li key={q} className="flex gap-3 text-sm text-ink">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{q}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-bold text-ink">The Conclusion</h2>

      <div className="mt-4 rounded-lg bg-primary-tint p-5">
        <p className="text-xl font-bold text-ink sm:text-2xl">
          Revenue stayed flat at roughly $26,000 per week.
        </p>
        <p className="mt-2 text-ink">
          That contradicts what my parents assumed going in. The conversation changes from "how do we stop the
          decline" to "how do we grow from a stable baseline."
        </p>
      </div>

      <figure className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <img
          src={revenueTrendImage}
          alt="Weekly revenue trend showing a flat line around $26,000 per week across the quarter"
          className="w-full"
        />
        <figcaption className="border-t border-border px-4 py-2 font-mono text-xs text-muted">
          Weekly revenue, holding steady across the quarter rather than trending up or down.
        </figcaption>
      </figure>

      <h3 className="mt-10 font-semibold text-ink">Key findings</h3>
      <ul className="mt-3 flex flex-col gap-3">
        {FINDINGS.map((item) => (
          <li key={item} className="flex gap-3 text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <figure className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <img
          src={orderTypeHeatmapImage}
          alt="Sales heatmap split into dine-in and to-go, showing to-go outpacing dine-in at peak hours"
          className="w-full"
        />
        <figcaption className="border-t border-border px-4 py-2 font-mono text-xs text-muted">
          Same day/hour breakdown, split by dine-in vs. to-go — to-go consistently outpaces dine-in at the peak hours.
        </figcaption>
      </figure>

      <figure className="mt-6 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <img
          src={topItemsImage}
          alt="Top 15 items by revenue, led by Steak (Pho)"
          className="w-full"
        />
        <figcaption className="border-t border-border px-4 py-2 font-mono text-xs text-muted">
          Top 15 items by revenue — Steak (Pho) leads by a wide margin.
        </figcaption>
      </figure>

      <h3 className="mt-10 font-semibold text-ink">Business recommendations</h3>
      <ul className="mt-3 flex flex-col gap-3">
        {RECOMMENDATIONS.map((item) => (
          <li key={item} className="flex gap-3 text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bar" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-bold text-ink">The Methodology</h2>
      <p className="mt-3 text-ink">
        Starting from the raw POS export, columns that were redundant, unused, or order-level values duplicated
        across every line item (e.g. Order Subtotal) were dropped, and remaining columns were renamed and
        retyped. Category values were standardized, and 89 line items timestamped after midnight (when the
        restaurant is closed) were removed from the source data.
      </p>
      <p className="mt-3 text-ink">
        The core analysis builds a day-by-hour sales heatmap — averaged per weekday occurrence rather than by
        item count, so it reflects how busy the restaurant actually is rather than the average price of items
        sold — then splits it by dine-in vs. to-go, ranks menu items by both units sold and revenue, and tracks
        total revenue week over week.
      </p>

      <h2 className="mt-12 text-xl font-bold text-ink">Limitations</h2>
      <ul className="mt-3 flex flex-col gap-3">
        {LIMITATIONS.map((item) => (
          <li key={item} className="flex gap-3 text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-5 border-t border-border pt-6 font-mono text-sm">
        <a href={project.repoUrl} className="text-primary hover:underline">Full write-up &amp; notebook on GitHub →</a>
      </div>
    </Shell>
  )
}
