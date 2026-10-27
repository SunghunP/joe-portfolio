import CaseStudyPage from '../components/CaseStudyPage';
import ShortAnswer from '../components/ShortAnswer';
import Details from '../components/Details';
import { Bullets, MetaStrip, Slide, StatGrid, Takeaway } from '../components/Deck';
import CodeBlock from '../components/CodeBlock';
import { BiDashboard, ChartCard, Columns, DashboardFrame, HBar } from '../components/Charts';
import { coffeeByCategory, coffeeByDay, coffeeByHour, coffeeByItem } from '../data/coffeeData';
import dashboardImage from '../assets/images/coffee/coffee_shop_dashboard.png';
import { projects } from '../data/projects';
import { hourLabel, thousands } from '../utils/format';

const META = [
  { label: 'Prepared by', value: 'Joe Park' },
  { label: 'Tools', value: 'Excel (PivotTables & Charts), T-SQL' },
  { label: 'Data', value: 'Practice dataset modeled on a Square POS export' },
  { label: 'Scope', value: 'Four weeks, 2,418 transactions, $19,936 in sales' },
]

const QUESTIONS = [
  'Which items and categories earned the most?',
  'What were the busiest and slowest days and hours?',
  'How do For Here and To Go orders compare?',
]

const STATS = [
  { number: '47%', label: 'Share of revenue from the Coffee category, led by the Latte at $2,924' },
  { number: '46%', label: 'Share of sales made between 7 and 9 AM. After 3 PM is only about 11%' },
  { number: '1.7x', label: 'Sales on an average weekday compared to an average weekend day' },
]

const RECOMMENDATION =
  'Offer a drink-and-pastry bundle from 3 PM to close and suggest it to single-item customers. If 10% took it, sales would rise roughly 3%.'

const FINDINGS = [
  'Half of all orders are a single item, averaging $4.70 versus $11.80 for bigger orders.',
  'Sales peak at 8 AM. 7–9 AM is about 46% of sales, and after 3 PM is only about 11%.',
  'Wednesday is the busiest day, and a weekday brings in about 1.7 times the sales of a weekend day.',
  'Coffee brings in 47% of revenue, and the Latte is the top seller at $2,924.',
  'For Here and To Go have about the same average ticket, but To Go orders drop on weekends.',
]

const SQL_BY_DAY = `SET DATEFIRST 1;

SELECT
	s.[DayName],
	SUM(s.Net_Sales) AS Total_Sales
FROM dbo.sales_clean s
GROUP BY s.[DayName]
ORDER BY MAX(DATEPART(WEEKDAY, [Date]));`

const SQL_BY_HOUR = `SELECT
	s.[Hour],
	SUM(s.Net_Sales) AS Total_Revenue
FROM dbo.sales_clean s
GROUP BY s.[Hour]
ORDER BY s.[Hour];`

const SQL_BY_ITEM = `SELECT
	Item,
	SUM(Net_Sales) AS Total_Revenue
FROM dbo.sales_clean
GROUP BY Item
ORDER BY SUM(Net_Sales) DESC;`

const SQL_CATEGORY_SHARE = `SELECT
	Category,
	SUM(Net_Sales) AS Sales,
	SUM(Net_Sales) / SUM(SUM(Net_Sales)) OVER () * 100 AS Percentage
FROM dbo.sales_clean
GROUP BY Category
ORDER BY Sales DESC;`

export default function CoffeeAnalysis() {
  const project = projects.find((p) => p.slug === 'coffee-shop-sales-analysis');

  return (
    <CaseStudyPage project={project} title="Half of This Coffee Shop's Customers Only Buy One Thing. Here's How I'd Fix That.">
      <BiDashboard kpis={[
        { label: 'Net sales', value: '$19,936' },
        { label: 'Transactions', value: '2,418' },
        { label: 'Average ticket', value: '$8.24' },
        { label: 'Items per order', value: '1.74' },
      ]}>
        <ChartCard label="Net sales by hour" caption="Sales peak at 8 AM. 7–9 AM is about 46% of sales, and after 3 PM is only about 11%.">
          <Columns
            labels={coffeeByHour.map((d) => hourLabel(d.label))}
            series={[{ name: 'Net sales', values: coffeeByHour.map((d) => d.value) }]}
            highlight={(i) => coffeeByHour[i].label >= 7 && coffeeByHour[i].label <= 9}
            height={170}
            valueLabel={thousands}
            ariaLabel="Net sales by hour, peaking at 8 AM"
          />
        </ChartCard>
        <ChartCard label="Net sales by day" caption="Wednesday is the busiest day, and a weekday brings in about 1.7 times the sales of a weekend day.">
          <Columns
            labels={coffeeByDay.map((d) => d.label)}
            series={[{ name: 'Net sales', values: coffeeByDay.map((d) => d.value) }]}
            highlight={(i) => coffeeByDay[i].label === 'Wed'}
            height={170}
            valueLabel={thousands}
            ariaLabel="Net sales by day of week, with Wednesday highest"
          />
        </ChartCard>
        <ChartCard label="Total revenue by item" caption="Top 10 items. The Latte is the top seller at $2,924.">
          <HBar data={coffeeByItem} highlight={(_, i) => i === 0} labelWidth="8rem" ariaLabel="Top 10 items by revenue, led by the Latte" />
        </ChartCard>
        <ChartCard label="Percent of revenue by category" caption="Coffee brings in 47% of revenue.">
          <HBar
            data={coffeeByCategory.map((d) => ({ ...d, display: `${d.share}%`, note: `$${d.value.toLocaleString()}` }))}
            highlight={(_, i) => i === 0}
            labelWidth="5rem"
            ariaLabel="Share of revenue by category, with Coffee at 47%"
          />
        </ChartCard>
      </BiDashboard>

      <Slide title="The Conclusion">
        <ShortAnswer finding={project.finding} />
        <Takeaway headline="Mornings and weekdays drive the business.">
          Sales peak at 8 AM, Wednesday is the busiest day, and coffee brings in 47% of revenue. The SQL queries
          matched the pivots.
        </Takeaway>
        <StatGrid stats={STATS} />
      </Slide>

      <Slide title="Business recommendation">
        <Bullets items={[RECOMMENDATION]} />
      </Slide>

      <Slide title="Key findings">
        <Bullets items={FINDINGS} />
      </Slide>

      <Details>
        <Slide title="Dashboard in Excel" appendix>
          <DashboardFrame
            src={dashboardImage}
            alt="Dashboard of four charts: net sales by day, net sales by hour, total revenue by item, and percent of revenue by category"
            caption="Dashboard built from the PivotTables."
          />
        </Slide>

        <Slide title="The Business Question" appendix>
          <MetaStrip meta={META} />
          <p className="mt-3 text-ink">
            I analyzed four weeks of sales from a coffee shop to practice pivot tables and SQL. The data is a practice
            dataset modeled on a Square POS export, not a real business. I focused on three questions:
          </p>
          <Bullets items={QUESTIONS} small />
        </Slide>

        <Slide title="The Methodology" appendix>
          <h3 className="mt-6 text-lg font-semibold text-ink">Pivot tables</h3>
          <p className="mt-2 text-ink">
            Each row in the data is one item, not one order, so I added a helper column to count real transactions.
            The first pivot gives an average ticket of $8.24 and 1.74 items per order.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-ink">Rebuilding the charts in SQL</h3>
          <p className="mt-2 text-ink">
            Each dashboard chart maps to one short query. I added two computed columns,{' '}
            <code className="font-mono text-sm">DayName</code> and <code className="font-mono text-sm">Hour</code>, to
            a copy of the table.
          </p>
          <p className="mt-3 text-ink">
            For net sales by day, sorting on the name gives alphabetical order, so I sorted on the weekday number. SQL
            Server counts Sunday as day 1, so I set <code className="font-mono text-sm">DATEFIRST</code> to 1 to put
            Monday first.
          </p>
          <CodeBlock caption="T-SQL: net sales by day" code={SQL_BY_DAY} />
          <p className="mt-3 text-ink">Net sales by hour is the same pattern, ordered by the hour.</p>
          <CodeBlock caption="T-SQL: net sales by hour" code={SQL_BY_HOUR} />
          <p className="mt-3 text-ink">Revenue by item sorts the summed sales from high to low.</p>
          <CodeBlock caption="T-SQL: total revenue by item" code={SQL_BY_ITEM} />
          <p className="mt-3 text-ink">
            For the category share, a window function gives the grand total without a second query. The empty{' '}
            <code className="font-mono text-sm">OVER ()</code> treats all the categories as one window.
          </p>
          <CodeBlock caption="T-SQL: percent of revenue by category" code={SQL_CATEGORY_SHARE} />
        </Slide>
      </Details>
    </CaseStudyPage>
  )
}
