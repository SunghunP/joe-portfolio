import { useParams, Link } from 'react-router-dom';
import Shell from '../components/Shell';
import CaseStudyPage from '../components/CaseStudyPage';
import ShortAnswer from '../components/ShortAnswer';
import Details from '../components/Details';
import { Bullets, MetaStrip, Slide, StatGrid, Takeaway } from '../components/Deck';
import CodeBlock from '../components/CodeBlock';
import WageBarChart from '../components/WageBarChart';
import chartsImage from '../assets/images/wa/wa-analyst-wage-charts.png';
import shapeMapImage from '../assets/images/wa/shapemap_average_cost_of_analyst.png';
import { BiDashboard, ChartCard, DashboardFrame, HBar, Scatter } from '../components/Charts';
import { projects } from '../data/projects';
import { wageData } from '../data/wageData';
import { thousands } from '../utils/format';

const SHORT_NAMES = {
  'Seattle–Tacoma–Bellevue': 'Seattle',
  'Portland–Vancouver, OR–WA': 'Portland',
  'Olympia–Lacey': 'Olympia',
}
const scatterData = wageData.map((d) => ({ ...d, short: SHORT_NAMES[d.name] }))
const barData = [...wageData].reverse().map((d) => ({ label: d.name, value: d.wage, note: `${d.emp.toLocaleString()} analysts`, display: thousands(d.wage), highlight: d.highlight }))

const META = [
  { label: 'Prepared by', value: 'Joe Park, Google Data Analytics Certificate Capstone' },
  { label: 'Tools', value: 'SSMS, Power BI, mapshaper.org' },
  { label: 'Data', value: '2025 WA Occupational Employment and Wage Estimates' },
  { label: 'Scope', value: '15 Washington labor market areas' },
]

const STATS = [
  { number: '$87,900', label: 'Lowest weighted average analyst wage: Yakima, WA (about 580 analyst jobs)' },
  { number: '$130,400', label: 'Highest weighted average analyst wage: Seattle-Tacoma-Bellevue, WA (about 72,210 analyst jobs)' },
  { number: '72,210 vs 580', label: 'Analyst jobs in Seattle vs. Yakima, the widest job market gap in the dataset' },
]

const TOOLS = [
  { name: 'SQL Server Management Studio (SSMS)', use: 'Data cleaning, imputation, and analysis.' },
  { name: 'Power BI', use: 'Shape Map, table, and scatter plot visualizations.' },
  { name: 'mapshaper.org', use: 'Custom TopoJSON boundary construction.' },
  { name: 'U.S. Census Bureau shapefiles', use: 'CBSA and county cartographic boundaries: source geometry for the custom map.' },
]

const FINDINGS = [
  'Yakima, WA has the lowest weighted average analyst wage in the state at approximately $87,902.62 a year, and the smallest job market among ranked areas at roughly 580 analysts.',
  'Seattle-Tacoma-Bellevue, WA has the highest weighted average analyst wage at approximately $130,438.72 a year, and by far the deepest job market at roughly 72,210 analysts, more than the next several areas combined.',
  'Across the full dataset, pay and job market size move together: no area combines the lowest pay with the largest market, or the highest pay with the smallest market.',
]

// Caveats about how to read the employment counts, shown in the appendix
const CAVEATS = [
  "Olympia-Lacey-Tumwater, WA reports a notably large analyst employment count (6,060) relative to its size. Given Olympia's role as the state capital, this figure likely reflects a concentration of public sector analyst positions rather than a broadly diversified private sector job market, and should be read with that caveat in mind if you're looking for private sector roles specifically.",
  "Portland-Vancouver-Hillsboro, OR-WA and Lewiston, ID-WA both cross state lines. Their employment and wage figures include out-of-state workers, which means their totals aren't directly comparable to single-state Washington labor market areas on a like-for-like basis.",
]

const LIMITATIONS = [
  "All levels of a given role, senior, mid, and junior, are averaged together within each occupation title due to limitations in the source data. This analysis can't separate what a junior vs. senior analyst specifically earns in a given area.",
  "Not every number in a state dataset means what it looks like it means. The Washington state total didn't match the sum of its parts, and the reason turned out to be cross-border commuting into Portland and Lewiston, something I only caught by checking the math and asking the agency directly.",
  "This dataset covers wages only, not cost of living. A $130,400 salary in Seattle and an $87,900 salary in Yakima don't buy the same lifestyle, and I didn't have the data to quantify that difference here.",
  "If I did it again, I'd narrow to analyst roles from the start instead of cleaning the whole dataset first.",
]

const NEXT_STEPS = [
  'Percentile data type issue: the wage percentile columns (25th, 50th, 75th) in the raw dataset contain a mix of NULL values and non numeric string entries. Not resolved as part of this phase; either clean and incorporate in a future iteration, or retain as a documented limitation.',
  'Analyst title refinement: the current scope uses a simple "contains Analyst" keyword filter with one manual exclusion. A more refined pass could evaluate whether any of the ten included titles, for example Market Research Analysts and Marketing Specialists, a combined title, should be split, further filtered, or footnoted, to sharpen exactly what "data analyst" means in this context.',
]

const EXTENSIONS = [
  'A multi year trend view, if historical editions of this dataset are available, to show whether the pay gap between areas is widening, narrowing, or stable over time.',
  'A cost of living adjusted wage metric per area, to show real purchasing power rather than nominal salary alone.',
  'Expanding the same weighted average and Shape Map methodology to other occupation families beyond analyst roles, to generalize this as a reusable job market comparison tool.',
]

const SQL_IMPUTE_ANNUAL = `UPDATE e
SET e.Annual_mean_wage = Totals.Annual_mean_wage
FROM dbo.[2025 Occupational employment cleaned data] AS e
INNER JOIN dbo.[2025 Occupational employment cleaned data] AS Totals
  ON e.Area_Name = Totals.Area_Name
  AND Totals.SOC_code = '00-0000'
WHERE e.Annual_mean_wage IS NULL;`

const SQL_IMPUTE_HOURLY = `UPDATE e
SET e.Mean_hourly_wage = CAST(e.Annual_mean_wage / 2080.0 AS DECIMAL(10, 2))
FROM dbo.[2025 Occupational employment cleaned data] AS e
WHERE e.Mean_hourly_wage IS NULL
  AND e.Annual_mean_wage IS NOT NULL;`

const SQL_CORE = `SELECT  Area_Name,
        SUM(Estimated_employment)                              AS total_analyst_employment,
        SUM(Estimated_employment * Annual_mean_wage)
          / SUM(Estimated_employment)                          AS weighted_avg_annual_wage
FROM    dbo.[2025 Occupational employment cleaned data]
WHERE   Washington_statewide_occupational_title LIKE '%Analyst%'
  AND   Washington_statewide_occupational_title
        != 'News Analysts, Reporters, and Journalists'
  AND   Area_Name != 'Washington'
GROUP BY Area_Name
ORDER BY weighted_avg_annual_wage ASC;`

const SQL_VIEW = `CREATE VIEW dbo.vw_AnalystWageByArea AS
SELECT  Area_Name,
        SUM(Estimated_employment) AS total_analyst_employment,
        ROUND(SUM(Estimated_employment * Annual_mean_wage)
          / SUM(Estimated_employment), 2) AS weighted_avg_annual_wage
FROM    dbo.[2025 Occupational employment cleaned data]
WHERE   Washington_statewide_occupational_title LIKE '%Analyst%'
  AND   Washington_statewide_occupational_title
        != 'News Analysts, Reporters, and Journalists'
  AND   Area_Name != 'Washington'
GROUP BY Area_Name;`

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Shell className="py-20 text-center">
        <p className="text-ink">Couldn't find that case study.</p>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
          ← Back to portfolio
        </Link>
      </Shell>
    );
  }

  return (
    <CaseStudyPage project={project}>
      <BiDashboard kpis={[
        { label: 'Highest average wage', value: '$130.4K', sub: 'Seattle-Tacoma-Bellevue' },
        { label: 'Lowest average wage', value: '$87.9K', sub: 'Yakima' },
        { label: 'Pay difference', value: '48%' },
        { label: 'Talent pool', value: '124x', sub: '72,210 vs. 580 analysts' },
      ]}>
        <ChartCard className="lg:col-span-2" label="Average data analyst wage by labor market area" caption="Weighted average annual wage across all 15 Washington labor market areas.">
          <HBar data={barData} highlight={(d) => d.highlight} labelWidth="11rem" ariaLabel="Weighted average analyst wage by Washington labor market area, highest in Seattle-Tacoma-Bellevue and lowest in Yakima" />
        </ChartCard>
        <ChartCard className="lg:col-span-2" label="Pay vs. job market size" caption="The pay-vs-job-market tradeoff across all 15 areas.">
          <Scatter data={scatterData} labeled={['Portland–Vancouver, OR–WA', 'Olympia–Lacey', 'Spokane']} ariaLabel="Analyst pay against number of analyst jobs by area, with Seattle highest on both and Yakima lowest on both" />
        </ChartCard>
      </BiDashboard>

      <Slide title="The Answer">
        <ShortAnswer finding={project.finding} />

        <Takeaway headline="$87,900 in Yakima. $130,400 in Seattle-Tacoma-Bellevue.">
          Same job title. Same state. A $40K+ swing depending on where you work.
        </Takeaway>
        <StatGrid stats={STATS} />

        <p className="mt-6 text-ink">
          Seattle-Tacoma-Bellevue is the strongest move if you want the highest ceiling and the deepest job market.
          Yakima is the strongest move if you're prioritizing cost of living over pay. Mid-tier areas like
          Spokane-Spokane Valley and Bellingham split the difference.
        </p>
      </Slide>

      <Slide title="Key findings">
        <Bullets items={FINDINGS} />
      </Slide>

      <Details>
        <Slide title="Dashboard in Power BI" appendix>
          <DashboardFrame
            src={chartsImage}
            alt="Washington labor market area map, annual wage by area bar chart, and analyst pay vs. job market size scatter plot"
            caption="Average data analyst wage by Washington labor market area, and the pay-vs-job-market tradeoff across all 15 areas."
          />
        </Slide>

        <Slide title="The Problem" appendix>
          <MetaStrip meta={META} />
          <p className="mt-3 text-ink">
            If you're a data analyst in Washington State, does it matter which city you work in? And if it does, how
            much money are you actually leaving on the table by staying in the wrong one?
          </p>
          <p className="mt-3 text-ink">
            This case study investigates a question relevant to any data analyst deciding where to build a career in
            Washington State: does location meaningfully change what you can expect to earn, and if so, what's the real
            tradeoff between chasing the highest paycheck and having access to the most jobs?
          </p>
          <p className="mt-3 text-ink">
            I treated weighted average analyst wage as the primary pay signal for each labor market area, and total
            analyst employment in that area as a proxy for job market depth: how many openings, employers, and
            opportunities to move exist there.
          </p>
          <p className="mt-3 text-ink">
            The primary data source is the 2025 Washington Occupational Employment and Wage Estimates, published by the
            Washington State Employment Security Department in partnership with the U.S. Bureau of Labor Statistics. The
            dataset reports estimated employment, wage percentiles, and mean wages for every occupation, broken out by
            labor market area across the state.
          </p>

          <Bullets
            small
            items={TOOLS.map((tool) => (
              <>
                <span className="font-semibold">{tool.name}:</span> {tool.use}
              </>
            ))}
          />

          <p className="mt-4 text-ink">
            But the highest paying market isn't automatically the best move for every analyst. Seattle-Tacoma-Bellevue
            pays the most and has over 72,000 analyst roles, the deepest job market in the state by far, meaning more
            openings, more employers, and more room to negotiate or switch jobs. Yakima pays the least, with only about
            580 analyst roles total: fewer jobs to apply to and less leverage.
          </p>
        </Slide>

        <Slide title="Wage distribution across all areas" appendix>
          <p className="mt-8 text-ink">
            Results across all 15 Washington labor market areas, ranked from lowest to highest weighted average analyst
            wage:
          </p>
          <div className="mt-3 overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-left">
                  <th className="px-2.5 py-2 sm:px-4 text-xs font-bold uppercase tracking-wide text-muted">Labor Market Area</th>
                  <th className="px-2.5 py-2 sm:px-4 text-xs font-bold uppercase tracking-wide text-muted">Total Analyst Employment</th>
                  <th className="px-2.5 py-2 sm:px-4 text-xs font-bold uppercase tracking-wide text-muted">Weighted Avg. Annual Wage</th>
                </tr>
              </thead>
              <tbody>
                {wageData.map((area) => (
                  <tr key={area.name} className="border-b border-border last:border-0">
                    <td className="px-2.5 py-2 sm:px-4 text-ink">{area.name}</td>
                    <td className="px-2.5 py-2 sm:px-4 font-mono text-ink">{area.emp.toLocaleString()}</td>
                    <td className="px-2.5 py-2 sm:px-4 font-mono text-ink">{`$${area.wage.toLocaleString()}`}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-2 rounded-xl border border-border bg-card p-4 shadow-sm">
            <WageBarChart />
            <p className="mt-3 text-xs text-muted">Weighted average analyst wage by Washington labor market area.</p>
          </div>
        </Slide>

        <Slide title="Worth keeping in mind" appendix>
          <p className="mt-6 text-ink">
            There's no single "best" city in this dataset, and I don't think there should be. Yakima is the strongest
            option if you're prioritizing cost of living or want less competition for fewer roles. Seattle-Tacoma-Bellevue
            is the strongest option if you want the highest ceiling and the most room to move between employers, and
            you're willing to compete and pay for it. Mid-tier areas like Spokane-Spokane Valley and Bellingham offer a
            middle ground worth a closer look if you're trying to balance both.
          </p>

          <Bullets items={CAVEATS} className="mt-6" />

          <div className="mt-6 rounded-lg bg-primary-tint p-5">
            <p className="text-sm text-ink">
              Olympia's employment count likely overstates the private sector job market there, since public sector
              analyst roles tied to the state capital are folded into the same figure. And this dataset covers wages
              only, not cost of living, so a $130,400 salary in Seattle and an $87,900 salary in Yakima don't buy the
              same lifestyle.
            </p>
          </div>
        </Slide>

        <Slide title="The Methodology" appendix>
          <h3 className="mt-6 text-lg font-semibold text-ink">Cleaning the data</h3>
          <p className="mt-2 text-ink">
            Before any analysis could begin, I had to fight the raw dataset into shape. After pulling the raw file into
            SQL Server Management Studio, I found NULL values scattered across the wage and percentile columns. Some
            rows were missing only the hourly wage; a smaller subset were missing the annual wage entirely.
          </p>
          <p className="mt-3 text-ink">
            Rather than deleting rows and losing real employment numbers, I made a copy of the raw table to preserve it
            (dbo.[2025 Occupational employment cleaned data]) and imputed the missing values instead of removing them.
            Annual_mean_wage was imputed using a self join back to each area's "Total, all occupations" row (SOC code
            00-0000), which the dataset already provides as an area wide wage baseline. Before running the update, I
            previewed exactly which rows would change and what value each would receive, confirming the impact before
            committing.
          </p>
          <CodeBlock caption="T-SQL: imputing missing annual wage" code={SQL_IMPUTE_ANNUAL} />
          <p className="mt-3 text-ink">
            With Annual_mean_wage fully populated, the remaining missing Mean_hourly_wage values were derived by dividing
            the annual wage by 2,080, the standard number of hours worked per year by a full time employee on a 40 hour
            work week.
          </p>
          <CodeBlock caption="T-SQL: deriving hourly wage from annual wage" code={SQL_IMPUTE_HOURLY} />

          <h3 className="mt-8 text-lg font-semibold text-ink">A statewide total that didn't add up</h3>
          <p className="mt-2 text-ink">
            While spot checking the data, I summed estimated employment for a single occupation, Educational Instruction
            and Library Occupations, across every individual labor market area and compared that sum to the value listed
            under the Washington statewide row. Logically, the statewide figure should have been equal to or greater
            than the sum of its parts. Instead, it came back smaller.
          </p>
          <p className="mt-3 text-ink">
            I emailed Washington's Labor Market Information and Research team directly. They confirmed that some labor
            market areas fall back on statewide data because their own local sample sizes are too small to publish
            independently. Separately, closer inspection showed that two labor market areas, Portland-Vancouver-Hillsboro,
            OR-WA and Lewiston, ID-WA, include workers from across the state line, meaning any totals involving those two
            areas are inflated relative to a purely in state figure.
          </p>
          <p className="mt-3 text-ink">
            Rather than deleting the "Washington" statewide row or silently correcting it, I documented both findings as
            caveats to apply whenever totals are interpreted, particularly for Portland-Vancouver-Hillsboro and Lewiston,
            ID-WA.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-ink">Scoping the occupation list</h3>
          <p className="mt-2 text-ink">
            Using a DISTINCT query, I reviewed every occupation title containing "Analyst" and confirmed ten relevant
            titles, explicitly excluding News Analysts, Reporters, and Journalists, an obvious domain mismatch, from
            every subsequent query via a NOT LIKE and not equal condition.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-ink">Weighted average methodology</h3>
          <p className="mt-2 text-ink">
            Rather than a flat average across occupation rows, which would give a small headcount title like Credit
            Analysts the same influence as a much larger one like Computer Systems Analysts, I calculated a weighted
            average wage per labor market area, weighted by estimated employment. This ensures the reported wage
            reflects what an analyst would actually encounter in the job market in that area, not an average distorted
            by a small niche title.
          </p>
          <CodeBlock caption="T-SQL: weighted average annual wage by area" code={SQL_CORE} />
          <p className="mt-3 text-ink">
            Once finalized, I wrapped this query in a permanent SQL view so it could be queried directly from Power BI
            without re-pasting the logic each time.
          </p>
          <CodeBlock caption="T-SQL: reusable view for Power BI" code={SQL_VIEW} />

          <h3 className="mt-8 text-lg font-semibold text-ink">Building a custom map</h3>
          <p className="mt-2 text-ink">
            No built-in Power BI map matched Washington's labor market areas, so I sourced CBSA (metro area) and county
            cartographic boundary shapefiles from the U.S. Census Bureau, then used mapshaper.org to filter the CBSA
            file down to Washington's 13 metro areas, and to group and dissolve the remaining counties into two combined
            "Eastern Washington nonmetropolitan" and "Western Washington nonmetropolitan" regions. Both layers were
            merged into a single TopoJSON file that Power BI's Shape Map visual could read directly.
          </p>
          <p className="mt-3 text-ink">
            Because Shape Map doesn't support on-map text labels, I paired the map with a detail table underneath
            showing the exact figures for every area. I also iterated on the color scale itself: an early diverging
            gradient technically spanned the full data range but rendered most of the state as a nearly uniform pale
            color, since 14 of the 15 areas cluster fairly close together in wage while Seattle-Tacoma-Bellevue sits
            well above the rest. Anchoring the gradient's center color on the actual median wage (Bellingham, about
            $98,560.71), instead of the mathematical midpoint between the minimum and maximum, resolved this and made
            the map legible.
          </p>
          <p className="mt-3 text-ink">
            I added a scatter plot too, wage on one axis, total analyst employment on the other, so the pay-vs-job-market
            tradeoff shows up in one glance instead of needing two visuals side by side.
          </p>

          <figure className="mt-4 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <img
              src={shapeMapImage}
              alt="Power BI Shape Map of Washington labor market areas shaded by average analyst pay, paired with a detail table listing each area's employment and weighted average wage"
              className="w-full"
            />
            <figcaption className="border-t border-border px-4 py-2 text-xs text-muted">
              Shape Map of average analyst pay by labor market area, with paired detail table.
            </figcaption>
          </figure>
        </Slide>

        <Slide title="Limitations" appendix>
          <Bullets items={LIMITATIONS} />
        </Slide>

        <Slide title="Next steps" appendix>
          <p className="mt-3 text-ink">Two items remain open from this analysis and are documented here rather than silently resolved:</p>
          <Bullets items={NEXT_STEPS} />
          <p className="mt-6 text-ink">Additional deliverables that would extend this analysis if pursued further:</p>
          <Bullets items={EXTENSIONS} />
        </Slide>
      </Details>
    </CaseStudyPage>
  )
}
