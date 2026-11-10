import CaseStudyPage from '../components/CaseStudyPage';
import ShortAnswer from '../components/ShortAnswer';
import Details from '../components/Details';
import { Bullets, MetaStrip, Slide, StatGrid, Takeaway } from '../components/Deck';
import CodeBlock from '../components/CodeBlock';
import { BiDashboard, ChartCard, Columns, DashboardFrame, HBar, Legend, TrendLine } from '../components/Charts';
import dashboardImage from '../assets/images/churn/action_dashboard.png';
import pipelineImage from '../assets/images/churn/pipeline.png';
import { projects } from '../data/projects';
import { callList, churnByPlan, churnByScore, cumulativeLost, onboardingByPlan, warningSigns } from '../data/churnData';
import { money } from '../utils/format';

const pct = (n) => `${n}%`
const pctRound = (n) => `${Math.round(n)}%`

const META = [
  { label: 'Prepared by', value: 'Joe Park' },
  { label: 'Tools', value: 'Python (pandas, gspread, SQLAlchemy), SQL Server (SSMS), Tableau' },
  { label: 'Data', value: '52,968 raw rows, 28 columns, from Google Sheets' },
  { label: 'Scope', value: 'Rotawise, a fictional B2B SaaS company, about 33,000 active accounts' },
]

const QUESTIONS = [
  'How bad is churn, and who is churning?',
  'What are the early warning signs?',
  'When does churn happen?',
  'Which 640 accounts should the CSMs call first?',
]

const STATS = [
  { number: '15.3%', label: 'Annual churn by accounts. Only 9.6% by revenue, since the accounts that leave pay less than average.' },
  { number: '3–4x', label: 'How much more accounts that skip onboarding churn, on every plan' },
  { number: '18%', label: 'Share of monthly accounts gone by month 6' },
]

const RECOMMENDATIONS = [
  <><span className="font-semibold">Enterprise + riskiest Pro:</span> CSMs call the 640 accounts on the list within 30 days, highest expected loss first.</>,
  <><span className="font-semibold">Rest of Pro:</span> Pro has the most money at risk overall, but it's spread over 15,000+ accounts. Group training sessions and webinars reach more of them than one-on-one calls.</>,
  <><span className="font-semibold">Starter:</span> build onboarding into account setup with automatic reminder emails. Starter accounts are worth too little to use CSM time, but onboarding can be fixed for all of them at once.</>,
]

const FINDINGS = [
  "Last year, Starter was 61% of churned accounts but only 18% of lost MRR. Pro was 37% of churned accounts but 55% of lost MRR. Starter churns the most, but it's the smallest problem by money.",
  'Skipping onboarding is the strongest warning sign. Accounts that skip it churn about 3 to 4x more, and that holds inside every plan.',
  'Churn happens early. 18% of monthly accounts are gone by month 6, and month 1 has the highest churn rate of any month.',
  'High-risk accounts (risk score 16–20) churn at 61–73%, compared with 15% or less for low-risk accounts (0–8).',
]

const CLEANING = [
  '1,137 duplicate rows, all exact copies.',
  <>Inconsistent labels: <code className="font-mono text-sm">Plan</code> had PRO and Pro, <code className="font-mono text-sm">Churned</code> had Yes, Y, TRUE, No, N and FALSE, and <code className="font-mono text-sm">Region</code> had EU and Europe.</>,
  'Impossible values: NPS scores of -3 and 15 (NPS only goes 0–10), and employee counts of 0, -1 and 99999.',
  '614 accounts with more active seats than they bought.',
  'MRR stored as text with $ and commas ("$1,850.40"), plus 768 blanks.',
  'Two date formats in SignupDate (2024-09-18 and 09/18/2024).',
]

const LIMITATIONS = [
  'The score only uses things the company can change. It leaves out company size and industry, which also affect churn.',
  "The 640-account limit (8 CSMs × 80 accounts) is an assumption. The data shows whether an account has a CSM, but not which one, so I can't check real CSM workloads.",
  'Correlation, not cause. Skipping onboarding is linked to churn in every plan, but accounts that skip onboarding probably skip training too, and I only controlled for plan.',
  "One year of history. Multi-year contracts look safe partly because they can't churn inside a one-year window.",
]

const PY_EXTRACT = `gc = gspread.service_account(filename=GOOGLE_KEY_PATH)
wks = gc.open(SPREADSHEET_NAME).sheet1
values = wks.get_all_values()
df = pd.DataFrame(values[1:], columns=values[0])`

const PY_MRR = `df["MRR"] = pd.to_numeric(df["MRR"].str.replace(r"[$,]", "", regex=True))
price_per_seat = df["Plan"].map({"Starter": 4, "Pro": 8, "Enterprise": 12})
calculated_mrr = df["SeatsPurchased"] * price_per_seat * (1 - df["DiscountPct"] / 100)
df["MRR"] = df["MRR"].fillna(calculated_mrr)`

const PY_LOAD = `df.to_sql(TABLE_NAME, get_engine(), if_exists="replace", index=False, chunksize=1000)`

const SQL_SCORE = `CASE WHEN OnboardingCompleted = 0 THEN 4 ELSE 0 END
+ CASE WHEN TrainingSessions = 0 THEN 3 ELSE 0 END
+ CASE WHEN SeatUtilizationPct < 60 THEN 3 ELSE 0 END
+ CASE WHEN DaysToGoLive >= 31 THEN 3 ELSE 0 END
+ CASE WHEN IntegrationsConnected <= 1 THEN 2 ELSE 0 END
+ CASE WHEN FeatureAdoptionPct < 50 THEN 2 ELSE 0 END
+ CASE WHEN (NPS <= 6 OR NPS IS NULL) THEN 2 ELSE 0 END
+ CASE WHEN EscalatedTickets90d >= 1 THEN 1 ELSE 0 END AS RiskScore`

const SQL_CALL_LIST = `SELECT TOP 640
  AccountID,
  a.[Plan],
  MRR,
  a.RiskScore,
  ChurnChance,
  (MRR * ChurnChance) AS ExpectedLoss
FROM Active a
INNER JOIN Lookup l
  ON a.RiskScore = l.RiskScore
  AND a.[Plan] = l.[Plan]
ORDER BY ExpectedLoss DESC`

const callListTotal = callList.reduce((sum, p) => sum + p.expectedLoss, 0)

export default function ChurnAnalysis() {
  const project = projects.find((p) => p.slug === 'customer-churn-analysis');

  return (
    <CaseStudyPage project={project}>
      <BiDashboard kpis={[
        { label: 'Expected MRR lost', value: '$1.58M', sub: 'next 12 months' },
        { label: 'Call list can protect', value: '$414K', sub: 'top 640 accounts' },
        { label: 'Annual churn', value: '15.3%', sub: '9.6% of revenue' },
        { label: 'Active accounts scored', value: '33,588' },
      ]}>
        <ChartCard className="lg:col-span-2" label="Churn rate by risk score" caption="Last year's churn for each risk score (0–20). High-risk accounts (16–20) churn at 61–73%, compared with 15% or less for low-risk (0–8).">
          <Columns
            labels={churnByScore.map((_, score) => String(score))}
            series={[{ name: 'Churn rate', values: churnByScore }]}
            format={pct}
            axisFormat={pctRound}
            highlight={(score) => score >= 16}
            height={190}
            ariaLabel="Churn rate by risk score, climbing from 2.5% at score 0 to about 72% at scores 19 and 20"
          />
        </ChartCard>
        <ChartCard label="Accounts lost vs. money lost, by plan" caption="Pro churns the most money, Starter the most accounts.">
          <Legend items={[{ name: '% of churned accounts', className: 'bg-bar' }, { name: '% of lost MRR', className: 'bg-primary' }]} />
          <Columns
            labels={churnByPlan.map((d) => d.plan)}
            series={[
              { name: 'Accounts', values: churnByPlan.map((d) => d.accounts), className: 'bg-bar' },
              { name: 'MRR', values: churnByPlan.map((d) => d.mrr), className: 'bg-primary' },
            ]}
            format={pct}
            axisFormat={pctRound}
            height={170}
            ariaLabel="Share of churned accounts and lost MRR by plan: Starter 61% of accounts but 18% of MRR, Pro 37% of accounts but 55% of MRR"
          />
        </ChartCard>
        <ChartCard label="Churn rate by onboarding, by plan" caption="Accounts that skip onboarding churn 3–4x more on every plan.">
          <Legend items={[{ name: 'Skipped', className: 'bg-primary' }, { name: 'Completed', className: 'bg-bar' }]} />
          <Columns
            labels={onboardingByPlan.map((d) => d.plan)}
            series={[
              { name: 'Skipped', values: onboardingByPlan.map((d) => d.skipped), className: 'bg-primary' },
              { name: 'Completed', values: onboardingByPlan.map((d) => d.completed), className: 'bg-bar' },
            ]}
            format={pct}
            axisFormat={pctRound}
            height={170}
            ariaLabel="Churn rate with onboarding skipped vs. completed: Starter 38% vs 13%, Pro 30% vs 8%, Enterprise 16% vs 4%"
          />
        </ChartCard>
        <ChartCard className="lg:col-span-2" label="Cumulative % of monthly accounts lost" caption="18% of monthly contract accounts are lost by month 6.">
          <TrendLine
            data={cumulativeLost}
            valueKey="pct"
            labelKey="month"
            format={pct}
            yTicks={[0, 10, 20, 30, 40]}
            tickFormat={pctRound}
            tipLabel={(month) => `Month ${month}`}
            markIndex={6}
            ariaLabel="Cumulative share of monthly accounts lost by tenure month, rising fastest early and reaching 18% by month 6 and 36% by month 24"
          />
        </ChartCard>
      </BiDashboard>

      <Slide title="The Conclusion">
        <ShortAnswer finding={project.finding} />
        <Takeaway headline="Pro churns the most money, Starter the most accounts.">
          Counting accounts makes Starter look like the biggest problem. Counting money tells a different story.
          Losing one Enterprise account is like losing almost 50 Starter accounts.
        </Takeaway>
        <StatGrid stats={STATS} />
      </Slide>

      <Slide title="Business recommendations">
        <Bullets items={RECOMMENDATIONS} />
      </Slide>

      <Slide title="Key findings">
        <Bullets items={FINDINGS} />
      </Slide>

      <Details>
        <Slide title="Dashboard in Tableau" appendix>
          <DashboardFrame
            src={dashboardImage}
            alt="Tableau dashboard with expected MRR lost, churn rate by risk score colored green, yellow and red, and the call list of accounts ranked by expected loss"
            caption="The call list dashboard: 640 accounts ranked by how much MRR we expect to lose."
          />
        </Slide>

        <Slide title="The Business Question" appendix>
          <MetaStrip meta={META} />
          <p className="mt-3 text-ink">
            Rotawise is a fictional B2B SaaS company that sells employee scheduling software to businesses with shift
            workers (restaurants, retail, healthcare, hotels, warehouses and schools). Customers pay per seat on one of
            three plans: Starter ($4), Pro ($8) or Enterprise ($12).
          </p>
          <p className="mt-3 text-ink">
            The company has 8 Customer Success Managers (CSMs) and about 33,000 active accounts. If each CSM can
            handle 80 accounts, that's only 640 accounts they can actually call. So the question isn't just "why do
            customers churn?" It's:
          </p>
          <Bullets items={QUESTIONS} small />
        </Slide>

        <Slide title="The Methodology" appendix>
          <h3 className="text-lg font-semibold text-ink">The pipeline</h3>
          <p className="mt-2 text-ink">
            The raw data (52,968 rows, 28 columns) lives in a Google Sheet. I built a three-step pipeline in Python:
            extract the data, clean it, and load it into SQL Server. Running{' '}
            <code className="font-mono text-sm">python load.py</code> runs all three.
          </p>
          <figure className="mt-4 overflow-hidden rounded-xl border border-border bg-white shadow-sm">
            <img
              src={pipelineImage}
              alt="Pipeline diagram: Google Sheets raw data (52,968 rows) to Python cleaning with pandas, 51,831 rows into SQL Server for analysis in T-SQL, then CSV to a Tableau dashboard"
              className="w-full"
            />
          </figure>

          <h3 className="mt-8 text-lg font-semibold text-ink">Extract</h3>
          <p className="mt-2 text-ink">
            <code className="font-mono text-sm">extract.py</code> logs in with a Google service account and pulls
            every cell with <code className="font-mono text-sm">gspread</code>. Every column came back as text, even
            MRR and TenureMonths, and blank cells came in as <code className="font-mono text-sm">''</code> instead of
            a real missing value, so converting the types became part of the cleaning step.
          </p>
          <CodeBlock caption="Python: pulling the sheet into pandas" code={PY_EXTRACT} />

          <h3 className="mt-8 text-lg font-semibold text-ink">Transform</h3>
          <p className="mt-2 text-ink">
            I explored the data in a notebook first and wrote down every problem as "column → problem → fix" before
            writing any cleaning code. Some of the problems I found:
          </p>
          <Bullets items={CLEANING} small />
          <p className="mt-4 text-ink">
            One problem fooled me at first. Loading the raw CSV with <code className="font-mono text-sm">pd.read_csv</code>{' '}
            showed 1,749 missing Region values, but the same data from Google Sheets had none. Those cells actually
            say "NA", short for North America, and <code className="font-mono text-sm">read_csv</code> treats "NA" as
            missing by default.
          </p>
          <p className="mt-3 text-ink">
            Every account's MRR follows the pricing exactly: seats × price per seat × (1 − discount). So instead of
            leaving the blanks or filling them with an average, I filled them from the formula. Impossible values
            became missing instead of a guess, since a made-up number would skew the averages.
          </p>
          <CodeBlock caption="Python: filling missing MRR from pricing" code={PY_MRR} />

          <h3 className="mt-8 text-lg font-semibold text-ink">Load</h3>
          <p className="mt-2 text-ink">
            <code className="font-mono text-sm">load.py</code> writes the clean DataFrame to SQL Server with
            SQLAlchemy. To check the load worked, I queried the table in SSMS: 51,831 rows, 51,831 distinct account
            IDs, only 4 regions and 3 plans, no missing MRR, NPS between 0 and 10, and no accounts with more active
            seats than purchased.
          </p>
          <CodeBlock caption="Python: loading into SQL Server" code={PY_LOAD} />

          <h3 className="mt-8 text-lg font-semibold text-ink">How bad is churn?</h3>
          <p className="mt-2 text-ink">
            Lifetime churn is 35.2%, but that counts every account that ever left. A better number is annual churn:
            of the 29,511 accounts active on 2025-09-30, 4,527 left by 2026-09-30. That's 15.3% of accounts, but only
            9.6% of revenue, because the accounts that leave pay less than average ($307 vs $492 a month).
          </p>

          <h3 className="mt-8 text-lg font-semibold text-ink">The warning signs</h3>
          <p className="mt-2 text-ink">
            For each thing the company can influence, I split accounts into "at risk" or not and compared their churn.
            The gap is the churn rate with the sign minus without it.
          </p>
          <div className="mt-4 rounded-xl border border-border bg-card p-4 shadow-sm">
            <HBar
              data={warningSigns.map((d) => ({ label: d.label, value: d.gap, display: `+${d.gap.toFixed(1)}`, note: `${d.points} points in the risk score` }))}
              format={(n) => `+${n.toFixed(1)} points`}
              highlight={(_, i) => i === 0}
              labelWidth="12rem"
              ariaLabel="Churn gap for each warning sign, led by onboarding not completed at 23.8 points"
            />
            <p className="mt-3 text-xs text-muted">Churn gap in percentage points for each warning sign. Skipping onboarding is the biggest.</p>
          </div>
          <p className="mt-4 text-ink">
            Accounts with a CSM churned at 8.2% vs 17.1% without one, but Starter has no CSMs at all and 95% of
            Enterprise accounts have one, so the gap was mostly just plan. Inside Pro it shrinks to 5.4 points.
            Onboarding held up inside every plan: accounts that skipped it churned 3.0x more in Starter, 3.6x in Pro
            and 3.8x in Enterprise.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-ink">When churn happens</h3>
          <p className="mt-2 text-ink">
            My first try counted how many accounts churned at each tenure month, which made months 10–16 look like the
            danger zone. But fewer accounts make it to later months, so I switched to a churn rate per month (leavers ÷
            accounts still around at the start of that month). With the rate, month 1 has the highest churn at 4.5%,
            and it drops from there.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-ink">Building a risk score</h3>
          <p className="mt-2 text-ink">
            I turned the 8 warning signs into a 0–20 point score, split where the gap suddenly jumps. I left CSM out
            since it mostly just repeats plan. Green (0–8) churned at 7.8%, yellow (9–15) at 27.8% and red (16–20) at
            65.2%.
          </p>
          <CodeBlock caption="T-SQL: risk score" code={SQL_SCORE} />

          <h3 className="mt-8 text-lg font-semibold text-ink">Picking the 640</h3>
          <p className="mt-2 text-ink">
            A high score doesn't mean a lot of money, so I ranked accounts by expected loss: MRR × churn chance, where
            the churn chance is last year's churn for accounts with the same plan and score. My first version used
            score only and the list came out 520 Enterprise accounts out of 640. Enterprise churns about half as much
            as the other plans at the same score, so I added plan to the lookup.
          </p>
          <CodeBlock caption="T-SQL: the 640 accounts with the most expected loss" code={SQL_CALL_LIST} />
          <div className="mt-4 overflow-x-auto rounded-lg border border-border">
            <table className="w-full border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-border bg-surface text-left">
                  <th className="px-2.5 py-2 sm:px-4 text-xs font-bold uppercase tracking-wide text-muted">Plan</th>
                  <th className="px-2.5 py-2 sm:px-4 text-xs font-bold uppercase tracking-wide text-muted">Accounts</th>
                  <th className="px-2.5 py-2 sm:px-4 text-xs font-bold uppercase tracking-wide text-muted">Expected MRR lost</th>
                </tr>
              </thead>
              <tbody>
                {callList.map((row) => (
                  <tr key={row.plan} className="border-b border-border">
                    <td className="px-2.5 py-2 sm:px-4 text-ink">{row.plan}</td>
                    <td className="px-2.5 py-2 sm:px-4 font-mono text-ink">{row.accounts}</td>
                    <td className="px-2.5 py-2 sm:px-4 font-mono text-ink">{money(row.expectedLoss)}</td>
                  </tr>
                ))}
                <tr className="font-semibold">
                  <td className="px-2.5 py-2 sm:px-4 text-ink">Total</td>
                  <td className="px-2.5 py-2 sm:px-4 font-mono text-ink">640</td>
                  <td className="px-2.5 py-2 sm:px-4 font-mono text-ink">{money(callListTotal)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-ink">
            As a sanity check, the expected loss for all active accounts adds up to $1.58M, and last year the company
            actually lost $1.39M of MRR, so the number is in the right range.
          </p>
        </Slide>

        <Slide title="Limitations" appendix>
          <Bullets items={LIMITATIONS} />
        </Slide>
      </Details>
    </CaseStudyPage>
  )
}
