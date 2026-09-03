import { useParams, Link } from 'react-router-dom';
import Shell from '../components/Shell';
import WageBarChart from '../components/WageBarChart';
import WageScatterChart from '../components/WageScatterChart';
import shapeMapImage from '../assets/images/shapemap_average_cost_of_analyst.png';
import { projects } from '../data/projects';
import { wageData } from '../data/wageData';

const META = [
  { label: 'Prepared by', value: 'Joe, Google Data Analytics Certificate Capstone' },
  { label: 'Tools', value: 'SSMS, Power BI, mapshaper.org' },
  { label: 'Data', value: '2025 WA Occupational Employment and Wage Estimates' },
  { label: 'Scope', value: '15 Washington labor market areas' },
]

const STATS = [
  { number: '$87,903', label: 'Lowest weighted average analyst wage: Yakima, WA (about 580 analysts)' },
  { number: '+48%', label: 'Seattle-Tacoma-Bellevue premium over Yakima ($130,439)' },
  { number: '72,210 vs 580', label: 'Analysts employed: Seattle vs Yakima' },
]

const TOOLS = [
  { name: 'SQL Server Management Studio (SSMS)', use: 'Data cleaning, imputation, and analysis.' },
  { name: 'Power BI', use: 'Shape Map, table, and scatter plot visualizations.' },
  { name: 'mapshaper.org', use: 'Custom TopoJSON boundary construction.' },
  { name: 'U.S. Census Bureau shapefiles', use: 'CBSA and county cartographic boundaries: source geometry for the custom map.' },
]

const PROBLEMS = [
  {
    title: 'Missing wage data',
    body: 'A significant number of rows in the raw dataset had NULL values in the Mean_hourly_wage and Annual_mean_wage fields. Some rows were missing only the hourly figure; a smaller subset were missing the annual figure entirely.',
  },
  {
    title: "A statewide total that didn't add up",
    body: "While spot checking the data, I summed estimated employment for a single occupation, Educational Instruction and Library Occupations, across every individual labor market area and compared that sum to the value listed under the Washington statewide row. Logically, the statewide figure should have been equal to or greater than the sum of its parts. Instead, it came back smaller. This raised the concern that some areas' totals might already be included in the statewide figure, or that the statewide figure was incomplete.",
  },
  {
    title: 'Occupation title scope creep',
    body: 'A simple keyword search for "Analyst" in the occupation title field returned one title that clearly does not belong in a data analysis labor cost study: News Analysts, Reporters, and Journalists. Left unaddressed, this title would have introduced unrelated wage data into the analysis.',
  },
  {
    title: "No existing map geography matched Washington's labor market areas",
    body: "Washington's labor market areas, a mix of official metro areas and two combined nonmetropolitan regions, don't correspond to any boundary set built into Power BI's Shape Map visual, which meant a custom map had to be built from scratch.",
  },
]

const FINDINGS = [
  'Yakima, WA has the lowest weighted average analyst wage in the state at approximately $87,902.62 a year, but the smallest talent pool among ranked areas at roughly 580 analysts.',
  'Seattle-Tacoma-Bellevue, WA has the highest weighted average analyst wage at approximately $130,438.72 a year, but by far the deepest talent pool at roughly 72,210 analysts: more than the next several areas combined.',
  "Olympia-Lacey-Tumwater, WA reports a notably large analyst employment count (6,060) relative to its size. Given Olympia's role as the state capital, this figure likely reflects a concentration of public sector analyst positions rather than a broadly diversified private sector labor market.",
  'Portland-Vancouver-Hillsboro, OR-WA and Lewiston, ID-WA both cross state lines. Their employment and wage figures include out of state workers, so their totals are not directly comparable to single state Washington labor market areas on a like for like basis.',
  'Across the full dataset, cost and talent pool size move together: no area combines the lowest cost with the largest pool, or the highest cost with the smallest pool.',
]

const NEXT_STEPS = [
  'Percentile data type issue: the wage percentile columns (25th, 50th, 75th) in the raw dataset contain a mix of NULL values and non numeric string entries. Not resolved as part of this phase; either clean and incorporate in a future iteration, or retain as a documented limitation.',
  'Analyst title refinement: the current scope uses a simple "contains Analyst" keyword filter with one manual exclusion. A more refined pass could evaluate whether any of the ten included titles, for example Market Research Analysts and Marketing Specialists, a combined title, should be split, further filtered, or footnoted.',
]

const EXTENSIONS = [
  'A multi year trend view, if historical editions of this dataset are available, to show whether the cost gap between areas is widening, narrowing, or stable over time.',
  'A total cost to staff metric (wage multiplied by estimated employment) per area, to complement the per hire wage figure with a view of aggregate market size.',
  'Expanding the same weighted average and Shape Map methodology to other occupation families beyond analyst roles, to generalize this as a reusable location decision tool.',
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

const SQL_CORE = `SELECT  Area_Name,
        SUM(Estimated_employment)                              AS analysts,
        SUM(Estimated_employment * Annual_mean_wage)
          / SUM(Estimated_employment)                          AS weighted_avg_wage
FROM    dbo.[2025 Occupational employment cleaned data]
WHERE   Washington_statewide_occupational_title LIKE '%Analyst%'
  AND   Area_Name <> 'Washington'
GROUP BY Area_Name
ORDER BY weighted_avg_wage ASC;`

function CodeBlock({ caption, code }) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface">
      <div className="border-b border-border px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted">
        {caption}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm text-ink">{code}</pre>
    </div>
  )
}

export default function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <Shell className="py-20 text-center">
        <p className="text-ink">Couldn't find that case study.</p>
        <Link to="/" className="mt-4 inline-block font-mono text-sm text-primary hover:underline">
          ← Back to portfolio
        </Link>
      </Shell>
    );
  }

  return (
    <Shell className="py-14 sm:py-20">
      <Link to="/" className="font-mono text-xs font-bold uppercase tracking-widest text-primary hover:underline">
        ← Back to portfolio
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{project.title}</h1>
      <p className="mt-2 font-mono text-sm italic text-muted">A Labor Cost Case Study Using SQL and Power BI</p>

      <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
        {META.map((item) => (
          <div key={item.label} className="bg-card p-3">
            <div className="text-[0.65rem] font-bold uppercase tracking-wide text-muted">{item.label}</div>
            <div className="mt-1 text-sm text-ink">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-sm">
            <span className="border-b-2 border-primary pb-1 font-mono text-2xl font-bold text-ink">{stat.number}</span>
            <p className="mt-3 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold text-ink">Introduction</h2>
      <p className="mt-3 text-ink">
        This case study investigates a real world business question relevant to any company planning to expand its
        data analytics function: where in Washington State should a company open a new office in order to hire data
        analysis professionals at the most competitive labor cost?
      </p>
      <p className="mt-3 text-ink">
        The scenario mirrors a real consulting engagement. A client is evaluating where to locate a new office, and
        labor cost is a key input into that decision alongside talent availability. This analysis treats average
        analyst wage as the primary cost signal, and treats total analyst employment in each labor market area as a
        proxy for how deep the available talent pool is.
      </p>
      <p className="mt-3 text-ink">
        The primary data source is the 2025 Washington Occupational Employment and Wage Estimates, published by the
        Washington State Employment Security Department in partnership with the U.S. Bureau of Labor Statistics. The
        dataset reports estimated employment, wage percentiles, and mean wages for every occupation, broken out by
        labor market area across the state.
      </p>

      <ul className="mt-4 flex flex-col gap-2">
        {TOOLS.map((tool) => (
          <li key={tool.name} className="flex gap-3 text-sm text-ink">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>
              <span className="font-semibold">{tool.name}:</span> {tool.use}
            </span>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-bold text-ink">Problems</h2>
      <p className="mt-3 text-ink">Before any analysis could begin, four distinct problems had to be identified and resolved.</p>
      <div className="mt-4 flex flex-col gap-4">
        {PROBLEMS.map((problem, i) => (
          <div key={problem.title} className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wide text-primary">{`${i + 1}. ${problem.title}`}</h3>
            <p className="mt-2 text-sm text-ink">{problem.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-bold text-ink">Solutions</h2>

      <h3 className="mt-6 font-semibold text-ink">Cleaning and imputing missing wage data</h3>
      <p className="mt-2 text-ink">
        Rather than deleting rows with missing wage data and losing real employment figures, I made a copy of the raw
        table to preserve it (dbo.[2025 Occupational employment cleaned data]) and imputed missing values instead of
        removing them. Annual_mean_wage was imputed using a self join back to each area's "Total, all occupations"
        row (SOC code 00-0000), which the dataset already provides as an area wide wage baseline.
      </p>
      <CodeBlock caption="T-SQL — imputing missing annual wage" code={SQL_IMPUTE_ANNUAL} />
      <p className="mt-3 text-ink">
        Before running the update, I ran the equivalent SELECT to preview exactly which rows would change and what
        value each would receive, confirming the impact before committing to the change.
      </p>
      <p className="mt-3 text-ink">
        With Annual_mean_wage fully populated, the remaining missing Mean_hourly_wage values were derived by dividing
        the annual wage by 2,080, the standard number of hours worked per year by a full time employee on a 40 hour
        work week.
      </p>
      <CodeBlock caption="T-SQL — deriving hourly wage from annual wage" code={SQL_IMPUTE_HOURLY} />

      <h3 className="mt-8 font-semibold text-ink">Resolving the statewide total discrepancy</h3>
      <p className="mt-2 text-ink">
        To understand the mismatch, I emailed Washington's Labor Market Information and Research team directly. Their
        reply confirmed that some labor market areas fall back on statewide data because their own local sample sizes
        are too small to publish independently. Separately, closer inspection showed that two labor market areas,
        Portland-Vancouver-Hillsboro, OR-WA and Lewiston, ID-WA, include workers from across the state line, meaning
        any totals involving those two areas will be inflated relative to a purely in state figure.
      </p>
      <p className="mt-3 text-ink">
        Rather than deleting the "Washington" statewide row or silently correcting it, I documented both findings as
        caveats to be applied whenever totals are interpreted, particularly for Portland-Vancouver-Hillsboro and
        Lewiston, ID-WA.
      </p>

      <h3 className="mt-8 font-semibold text-ink">Scoping the occupation list</h3>
      <p className="mt-2 text-ink">
        Using a DISTINCT query, I reviewed every occupation title containing "Analyst" and confirmed ten relevant
        titles, explicitly excluding News Analysts, Reporters, and Journalists from every subsequent query via a NOT
        LIKE and not equal condition.
      </p>

      <h3 className="mt-8 font-semibold text-ink">Weighted average methodology</h3>
      <p className="mt-2 text-ink">
        Rather than a flat average across occupation rows, which would give a small headcount title like Credit
        Analysts the same influence as a much larger one like Computer Systems Analysts, I calculated a weighted
        average wage per labor market area, weighted by estimated employment. This ensures the reported wage reflects
        what a company would actually encounter if it went hiring in that area.
      </p>

      <h3 className="mt-8 font-semibold text-ink">Building a reusable view</h3>
      <p className="mt-2 text-ink">
        Once the weighted average query was finalized, I wrapped it in a permanent SQL view so it could be queried
        directly from Power BI without re-pasting the logic each time.
      </p>
      <CodeBlock caption="T-SQL — reusable view for Power BI" code={SQL_VIEW} />

      <h3 className="mt-8 font-semibold text-ink">Building a custom map</h3>
      <p className="mt-2 text-ink">
        Since no built-in Power BI map matched Washington's labor market areas, I sourced CBSA (metro area) and county
        cartographic boundary shapefiles from the U.S. Census Bureau, then used mapshaper.org to filter the CBSA file
        down to Washington's 13 metro areas, and to group and dissolve the remaining counties into two combined
        "Eastern Washington nonmetropolitan" and "Western Washington nonmetropolitan" regions. Both layers were merged
        into a single TopoJSON file that Power BI's Shape Map visual could read directly.
      </p>
      <p className="mt-3 text-ink">
        Because Shape Map doesn't support on-map text labels, I paired the map with a detail table underneath showing
        the exact figures for every area. I also iterated on the color scale itself: an early diverging gradient
        technically spanned the full data range but rendered most of the state as a nearly uniform pale color, since
        14 of the 15 areas cluster fairly close together in wage while Seattle-Tacoma-Bellevue sits well above the
        rest. Anchoring the gradient's center color on the actual median wage (Bellingham, about $98,560.71), instead
        of the mathematical midpoint between the minimum and maximum, resolved this and made the map legible.
      </p>

      <p className="mt-4 font-mono text-xs uppercase tracking-wide text-muted">Visualization: Shape Map and detail table</p>
      <figure className="mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <img
          src={shapeMapImage}
          alt="Power BI Shape Map of Washington labor market areas shaded by average analyst cost, paired with a detail table listing each area's employment and weighted average wage"
          className="w-full"
        />
        <figcaption className="border-t border-border px-4 py-2 font-mono text-xs text-muted">
          Figure 2. Average cost of an analyst by labor market area, with paired detail table.
        </figcaption>
      </figure>

      <h2 className="mt-12 text-xl font-bold text-ink">Analysis</h2>
      <p className="mt-3 text-ink">
        With the cleaned data, exclusions, and weighting method finalized, the following query produced the core
        result set for this analysis.
      </p>
      <CodeBlock caption="T-SQL — weighted average annual wage by area" code={SQL_CORE} />

      <p className="mt-6 text-ink">
        Results across all 15 Washington labor market areas, ranked from lowest to highest weighted average analyst
        wage:
      </p>
      <div className="mt-3 overflow-x-auto rounded-lg border border-border">
        <table className="w-full min-w-[480px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-surface text-left">
              <th className="px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted">Labor Market Area</th>
              <th className="px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted">Total Analyst Employment</th>
              <th className="px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted">Weighted Avg. Annual Wage</th>
            </tr>
          </thead>
          <tbody>
            {wageData.map((area) => (
              <tr key={area.name} className="border-b border-border last:border-0">
                <td className="px-4 py-2 text-ink">{area.name}</td>
                <td className="px-4 py-2 font-mono text-ink">{area.emp.toLocaleString()}</td>
                <td className="px-4 py-2 font-mono text-ink">{`$${area.wage.toLocaleString()}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 font-mono text-xs uppercase tracking-wide text-muted">Visualization: wage distribution across all areas</p>
      <div className="mt-2 rounded-xl border border-border bg-card p-4 shadow-sm">
        <WageBarChart size="large" />
        <p className="mt-3 font-mono text-xs text-muted">Figure 1. Weighted average analyst wage by Washington labor market area.</p>
      </div>

      <p className="mt-8 font-mono text-xs uppercase tracking-wide text-muted">Visualization: cost vs. talent pool size</p>
      <div className="mt-2 rounded-xl border border-border bg-card p-4 shadow-sm">
        <WageScatterChart />
        <p className="mt-3 font-mono text-xs text-muted">
          Figure 3. Weighted average annual wage vs. total analyst employment on a log scale, by area.
        </p>
      </div>

      <h2 className="mt-12 text-xl font-bold text-ink">Key findings</h2>
      <ul className="mt-3 flex flex-col gap-3">
        {FINDINGS.map((item) => (
          <li key={item} className="flex gap-3 text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="mt-12 text-xl font-bold text-ink">Conclusion</h2>
      <p className="mt-3 text-ink">
        This analysis does not identify a single "best" location for a company to hire data analysts in Washington
        State, because the data does not support one. Instead, it surfaces a clear and consistent tradeoff: the
        lowest cost labor markets have the smallest talent pools, and the deepest talent pools come at the highest
        cost.
      </p>
      <div className="mt-4 rounded-lg bg-primary-tint p-5">
        <span className="text-xs font-bold uppercase tracking-wide text-primary">Recommendation</span>
        <p className="mt-2 text-sm text-ink">
          Yakima is the strongest option for a cost conscious hire, or a small analyst team, where the smaller pool of
          roughly 580 analysts is less likely to be a constraint. Seattle-Tacoma-Bellevue is the strongest option for
          a company that needs to hire and scale an analytics team quickly, or that needs specialized analyst skill
          sets that a smaller market is less likely to have in depth, and is able to absorb the higher cost that
          comes with it. Mid-tier areas such as Spokane-Spokane Valley and Bellingham offer a middle ground: moderate
          wages with a moderate talent pool, worth a closer look for companies trying to balance both factors rather
          than optimize for one.
        </p>
        <p className="mt-3 text-sm text-ink">
          Two caveats should travel with any of these figures if they're used in a real hiring decision: Olympia's
          employment count likely overstates its private sector analyst market due to public sector concentration,
          and Portland-Vancouver-Hillsboro and Lewiston, ID-WA both include out of state workers in their totals.
        </p>
      </div>

      <h2 className="mt-12 text-xl font-bold text-ink">Next steps</h2>
      <p className="mt-3 text-ink">Two items remain open from this analysis and are documented here rather than silently resolved:</p>
      <ul className="mt-3 flex flex-col gap-3">
        {NEXT_STEPS.map((item) => (
          <li key={item} className="flex gap-3 text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-ink">Additional deliverables that would extend this analysis if pursued further:</p>
      <ul className="mt-3 flex flex-col gap-3">
        {EXTENSIONS.map((item) => (
          <li key={item} className="flex gap-3 text-ink">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-bar" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap gap-5 border-t border-border pt-6 font-mono text-sm">
        <a href={project.repoUrl} className="text-primary hover:underline">Full write-up &amp; SQL on GitHub →</a>
        <a href="#" className="text-primary hover:underline">Power BI report →</a>
      </div>
    </Shell>
  )
}
