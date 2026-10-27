import { Link } from 'react-router-dom';
import Shell from '../components/Shell';
import ShortAnswer from '../components/ShortAnswer';
import Details from '../components/Details';
import { Cover, Deck, MetaStrip, Slide } from '../components/Deck';
import NextCaseStudy from '../components/NextCaseStudy';
import { BiDashboard, ChartCard, Columns, DashboardFrame, HBar, Heatmap, Legend, TrendLine } from '../components/Charts';
import dashboardImage from '../assets/images/pho/sales_dashboard.png';
import { projects } from '../data/projects';
import { phoByOrderType, phoDays, phoHeatmap, phoHours, phoTopItems, phoWeekly } from '../data/phoData';

const money = (n) => `$${(n / 1000).toFixed(1)}K`
const hourLabel = (h) => (h === 12 ? '12p' : h > 12 ? `${h - 12}p` : `${h}a`)
const weeklyAverage = phoWeekly.reduce((sum, w) => sum + w.revenue, 0) / phoWeekly.length

const META = [
  { label: 'Prepared by', value: 'Joe Park' },
  { label: 'Tools', value: 'SQL Server (SSMS), Pandas, Seaborn, Matplotlib' },
  { label: 'Data', value: '~3 months of POS exports, 38,293 line items' },
  { label: 'Scope', value: "Local pho restaurant, June 3 – Sept 2, 2026" },
]

const QUESTIONS = [
  'When is the restaurant busiest, by day and hour?',
  'Which menu items are the most popular and most profitable, and are they the same?',
  'Is revenue trending up, down, or holding steady?',
]

const FINDINGS = [
  'Demand peaks around 12PM, 5PM, and 9PM, and is driven mostly by to-go orders rather than dine-in.',
  'Friday, Saturday, and Sunday are the busiest days. Tuesday is the slowest.',
  'Steak (Pho) is both the top seller and the top revenue item. Some items are popular but don’t make much money. Appetizers like Spring Roll sell a lot but rank lower in revenue.',
]

const RECOMMENDATIONS = [
  '1PM–4PM is where a lot of the dead time occurs. We should run a targeted special sale/happy hour to drive more traffic to the store.',
  'Tuesday specifically is the slowest day. A special promotion to get customers in on Tuesdays should help.',
  'Since the peaks are mostly to-go orders, extra help at 5PM and 9PM should focus on packing to-go orders instead of table service.',
]

const LIMITATIONS = [
  'No baseline for comparison. This is a single quarter with no prior period (last year, last quarter) to benchmark against, so "flat" describes this 13-week window only.',
  'Small sample per heatmap cell. Each day-and-hour average is built from only 13–14 data points (one per matching weekday in the quarter), so a single unusual day could shift a cell more than a real pattern would.',
]

export default function PhoAnalysis() {
  const project = projects.find((p) => p.slug === 'pho-restaurant-analysis');

  return (
    <Shell className="py-14 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className="text-sm font-semibold text-primary hover:underline">
          ← Back to portfolio
        </Link>

        <Cover title="Pho Restaurant Exploratory Data Analysis: Did Business Actually Slow Down?" />

        <Deck project={project.title}>
        <BiDashboard kpis={[
            { label: 'Avg weekly revenue', value: money(weeklyAverage) },
            { label: 'Line items analyzed', value: '38,293' },
            { label: 'Slow-hour revenue lift', value: '+10%', sub: 'after a targeted promotion' },
          ]}>
        <ChartCard className="lg:col-span-2" label="Weekly revenue" caption="Weekly revenue, holding steady across the quarter rather than trending up or down.">
          <TrendLine data={phoWeekly} valueKey="revenue" labelKey="week" average={weeklyAverage} ariaLabel="Weekly revenue trend showing a flat line around $26,000 per week across the quarter" />
        </ChartCard>
        <ChartCard className="lg:col-span-2" label="Average sales by day and hour" caption="Average sales by day and hour across the quarter. Darker blue marks the busiest slots.">
          <Heatmap
            rows={phoDays}
            cols={phoHours.map((h) => ({ key: h, label: hourLabel(h) }))}
            values={phoHeatmap}
            mark={{ from: phoHours.indexOf(13), to: phoHours.indexOf(16), label: '1–4 PM' }}
            ariaLabel="Average sales by day of week and hour, showing peaks at lunch, early dinner, and late night"
          />
        </ChartCard>
          <ChartCard label="Dine-in vs. to-go" caption="Average sales per day by hour, split by dine-in vs. to-go. To-go consistently outpaces dine-in at the peak hours.">
            <Legend items={[{ name: 'To-go', className: 'bg-primary' }, { name: 'Dine-in', className: 'bg-bar' }]} />
            <Columns
              labels={phoHours.map(hourLabel)}
              series={[
                { name: 'To-go', values: phoByOrderType.toGo, className: 'bg-primary' },
                { name: 'Dine-in', values: phoByOrderType.dineIn, className: 'bg-bar' },
              ]}
              axisFormat={(n) => `$${Math.round(n)}`}
              height={190}
              ariaLabel="Average sales per day by hour, dine-in vs. to-go, showing to-go outpacing dine-in at peak hours"
            />
          </ChartCard>
          <ChartCard label="Top 15 items by revenue" caption="Top 15 items by revenue. Steak (Pho) leads by a wide margin.">
            <HBar
              data={phoTopItems.map((d) => ({ ...d, note: d.category, display: `$${(d.value / 1000).toFixed(1)}K` }))}
              highlight={(_, i) => i === 0}
              labelWidth="9rem"
              ariaLabel="Top 15 items by revenue, led by Steak (Pho)"
            />
          </ChartCard>
          </BiDashboard>

        <Slide title="The Conclusion">
        <ShortAnswer finding={project.finding} />

        <div className="mt-6 rounded-lg bg-primary-tint p-5">
          <p className="text-xl font-bold text-ink sm:text-2xl">
            Revenue stayed flat across the quarter at roughly $26,000 per week.
          </p>
          <p className="mt-2 text-ink">
            This contradicts what the owners assumed going in. The data doesn't support "business is slowing down."
            That changes the conversation from "how do we stop the decline" to "how do we grow from a stable
            baseline."
          </p>
        </div>

        </Slide>

        <Slide title="Business recommendations">
        <ul className="mt-3 flex flex-col gap-3">
          {RECOMMENDATIONS.map((item) => (
            <li key={item} className="flex gap-3 text-ink">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bar" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        </Slide>

        <Slide title="Key findings">
        <ul className="mt-3 flex flex-col gap-3">
          {FINDINGS.map((item) => (
            <li key={item} className="flex gap-3 text-ink">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        </Slide>

        <Details>
        <Slide title="Dashboard in Python" appendix>
          <DashboardFrame src={dashboardImage} alt="Pho restaurant sales dashboard with a day-by-hour sales heatmap and the top and bottom selling items" />
        </Slide>

        <Slide title="The Business Question" appendix>
        <MetaStrip meta={META} />
        <p className="mt-3 text-ink">
          The owners felt like business had been slowing down and wanted a specific number they could see, rather
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
        </Slide>

        <Slide title="The Methodology" appendix>
        <p className="mt-3 text-ink">
          I imported the raw POS export into a local SQL Server Express database and did all of the cleaning in
          SSMS on a copy of the table, so the raw data stayed untouched (both tables have 38,293 rows). Columns
          that were redundant, constant, or order-level totals repeated on every line item (e.g. Order Subtotal,
          which would double-count revenue) were dropped. Table and Invoice were renamed with{' '}
          <code className="font-mono text-sm">sp_rename</code>, Invoice_Number was converted to text since it's an
          identifier, and checks confirmed there were no zero/negative prices or stray whitespace.
        </p>
        <p className="mt-3 text-ink">
          Inconsistent category names (<code className="font-mono text-sm">pho</code>,{' '}
          <code className="font-mono text-sm">Noodle Salad|Bowl</code>) were standardized, Day_Of_Week and
          Order_Hour were rebuilt as computed columns from Order_Date so they can never drift out of sync, and
          QUICK ORDER was merged into TO GO since they're the same thing operationally. The cleaned table was then
          exported and loaded into pandas.
        </p>
        <p className="mt-3 text-ink">
          The core analysis builds a day-by-hour sales heatmap (averaged per weekday occurrence rather than by
          item count, so it reflects how busy the restaurant actually is rather than the average price of items
          sold), then splits it by dine-in vs. to-go, ranks menu items by both units sold and revenue (excluding
          the $0.50 to-go bag fee and side orders), and tracks total revenue week over week, trimming the partial
          first and last weeks.
        </p>
        </Slide>

        <Slide title="Limitations" appendix>
        <ul className="mt-3 flex flex-col gap-3">
          {LIMITATIONS.map((item) => (
            <li key={item} className="flex gap-3 text-ink">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        </Slide>
        </Details>
        </Deck>

        <div className="mt-10 flex flex-wrap gap-5 border-t border-border pt-6 text-sm font-semibold">
          <a href={project.repoUrl} className="text-primary hover:underline">Full write-up &amp; notebook on GitHub →</a>
          <a href="https://medium.com/@joeparkda/pho-restaurant-exploratory-data-analysis-did-business-actually-slow-down-f7f9bd60bddb" className="text-primary hover:underline">Read on Medium →</a>
        </div>

        <NextCaseStudy currentSlug={project.slug} />
      </div>
    </Shell>
  )
}
