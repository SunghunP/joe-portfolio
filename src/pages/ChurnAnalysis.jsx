import CaseStudyPage from '../components/CaseStudyPage';
import ShortAnswer from '../components/ShortAnswer';
import Details from '../components/Details';
import { Bullets, DataTable, MetaStrip, Slide } from '../components/Deck';
import CodeBlock from '../components/CodeBlock';
import { BiDashboard, ChartCard, Columns, DashboardFrame, HBar, Legend, TrendLine } from '../components/Charts';
import dashboardImage from '../assets/images/churn/action_dashboard.png';
import pipelineImage from '../assets/images/churn/pipeline.png';
import { projects } from '../data/projects';
import { riskTiers, churnByPlan, churnByScore, cumulativeLost, onboardingByPlan, scoreCounts, warningSigns } from '../data/churnData';
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
  'Which accounts churn above 25%, and how do we get them under it?',
]

const RECOMMENDATIONS = [
  <><span className="font-semibold">At risk (score 11+), 4,576 accounts:</span> call the ones with the most money at risk within 30 days. Training and reminder emails for the rest.</>,
  <><span className="font-semibold">Start with onboarding:</span> it's the biggest warning sign, worth 4 points.</>,
  <><span className="font-semibold">Low risk (score 0–10), 29,012 accounts:</span> rescore every month.</>,
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

const SQL_TIERS = `SELECT
  AccountID,
  MRR,
  CASE
    WHEN a.RiskScore >= 11 THEN 'At risk'
    ELSE 'Low risk'
  END AS Tier,
  (MRR * ChurnChance) AS ExpectedLoss
FROM Active a
INNER JOIN Lookup l
  ON a.RiskScore = l.RiskScore
  AND a.[Plan] = l.[Plan]`

// Highest score first, so the riskiest accounts read first
const scoresDesc = churnByScore.map((rate, score) => ({ score, rate, ...scoreCounts[score] })).reverse()
const num = (n) => n.toLocaleString()

// Risk tier colors, same as the Tableau dashboard
const RED = 'bg-[#E15759]'
const GREEN = 'bg-[#59A14F]'

const tierAccounts = riskTiers.reduce((sum, t) => sum + t.accounts, 0)
const tierTotal = riskTiers.reduce((sum, t) => sum + t.expectedLoss, 0)

export default function ChurnAnalysis() {
  const project = projects.find((p) => p.slug === 'customer-churn-analysis');

  return (
    <CaseStudyPage project={project}>
      <Slide title="The Business Question">
        <p className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">How do we get churn for our riskiest accounts down to 25%?</p>
        <p className="mt-3 text-muted">
          Accounts with a risk score of 11 or more churned at 44% last year. Every score of 10 or under stayed under 25%.
        </p>
      </Slide>

      <BiDashboard kpis={[
        { label: 'Monthly revenue at risk', value: '$1.58M', sub: 'next 12 months' },
        { label: 'Held by at-risk accounts', value: '$565K', sub: '14% of accounts' },
        { label: 'Accounts lost last year', value: '15.3%', sub: '4,527 of 29,511' },
        { label: 'Accounts scored', value: '33,588' },
      ]}>
        <ChartCard
          className="lg:col-span-2"
          label="How is the risk score calculated?"
          headline="Each warning sign adds points. 0 = healthy, 20 = every sign."
        >
          <HBar
            data={warningSigns.map((d) => ({ label: d.label, value: d.points, display: `+${d.points}` }))}
            format={(n) => `+${n} points`}
            highlight={(_, i) => i === 0}
            labelWidth="12rem"
            ariaLabel="Risk score points per warning sign: onboarding not completed 4, no training 3, seat use under 60% 3, 31+ days to go live 3, 0 or 1 integrations 2, feature adoption under 50% 2, NPS detractor or no answer 2, escalated ticket 1"
          />
        </ChartCard>
        <ChartCard
          className="lg:col-span-2"
          label="Does a higher risk score mean more churn?"
          headline="Yes. 4 in 10 at-risk accounts left, vs. 1 in 10 low-risk."
          next="Fix their warning signs to get them under 11."
        >
          <Legend items={[{ name: 'At risk: score 11+', className: RED }, { name: 'Low risk: score 0–10', className: GREEN }]} />
          <Columns
            labels={scoresDesc.map((d) => String(d.score))}
            series={[{ name: 'Churn rate', values: scoresDesc.map((d) => d.rate) }]}
            format={pct}
            axisFormat={pctRound}
            barClass={(i) => (scoresDesc[i].score >= 11 ? RED : GREEN)}
            refLine={{ value: 25, label: '25% goal' }}
            tip={(i) => `Score ${scoresDesc[i].score}: ${num(scoresDesc[i].churned)} of ${num(scoresDesc[i].accounts)} accounts churned (${scoresDesc[i].rate}%)`}
            height={190}
            ariaLabel="Churn rate by risk score from 20 down to 0, falling from about 72% at scores 20 and 19 to 2.5% at score 0"
          />
        </ChartCard>
        <ChartCard
          label="Which plan loses the most money?"
          headline="Pro: $762K of MRR lost last year."
          caption="MRR (monthly recurring revenue) = what a customer pays each month."
          next="Rank accounts by money at risk."
        >
          <Legend items={[{ name: 'Accounts lost', className: 'bg-bar' }, { name: 'MRR lost', className: 'bg-primary' }]} />
          <Columns
            labels={churnByPlan.map((d) => d.plan)}
            series={[
              { name: 'Accounts', values: churnByPlan.map((d) => d.accounts), className: 'bg-bar' },
              { name: 'MRR', values: churnByPlan.map((d) => d.mrr), className: 'bg-primary' },
            ]}
            format={pct}
            axisFormat={() => ''}
            valueLabel={(_, i, si) => (si === 0 ? num(churnByPlan[i].churned) : `$${Math.round(churnByPlan[i].lostMrr / 1000)}K`)}
            tip={(i) => `${churnByPlan[i].plan} · ${num(churnByPlan[i].churned)} churned accounts (${churnByPlan[i].accounts}%) · ${money(churnByPlan[i].lostMrr)} monthly revenue lost (${churnByPlan[i].mrr}%)`}
            height={170}
            ariaLabel="Share of churned accounts and lost MRR by plan: Starter 61% of accounts but 18% of MRR, Pro 37% of accounts but 55% of MRR"
          />
        </ChartCard>
        <ChartCard
          label="What's the strongest warning sign?"
          headline="Skipping onboarding: 3–4x more churn."
          next="Remind accounts to finish onboarding."
        >
          <Legend items={[{ name: 'Skipped onboarding', className: 'bg-primary' }, { name: 'Completed', className: 'bg-bar' }]} />
          <Columns
            labels={onboardingByPlan.map((d) => d.plan)}
            series={[
              { name: 'Skipped', values: onboardingByPlan.map((d) => d.skipped), className: 'bg-primary' },
              { name: 'Completed', values: onboardingByPlan.map((d) => d.completed), className: 'bg-bar' },
            ]}
            format={pct}
            axisFormat={pctRound}
            valueLabel={pctRound}
            tip={(i) => { const d = onboardingByPlan[i]; return `${d.plan} · skipped: ${num(d.skippedN[0])} of ${num(d.skippedN[1])} churned · completed: ${num(d.completedN[0])} of ${num(d.completedN[1])} churned` }}
            height={170}
            ariaLabel="Churn rate with onboarding skipped vs. completed: Starter 38% vs 13%, Pro 30% vs 8%, Enterprise 16% vs 4%"
          />
        </ChartCard>
        <ChartCard
          className="lg:col-span-2"
          label="When do customers leave?"
          headline="Early: 18% are gone by month 6."
          next="Rescore accounts every month."
        >
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

      <Slide title="What to do">
        <ShortAnswer finding={project.finding} />
        <Bullets items={RECOMMENDATIONS} />
      </Slide>

      <Details>
        <Slide title="Dashboard in Tableau" appendix>
          <DashboardFrame
            src={dashboardImage}
            alt="Tableau dashboard with expected MRR lost, churn rate by risk score colored green, yellow and red, and every active account ranked by expected loss"
            caption="The action dashboard: every active account by risk tier, ranked by how much MRR we expect to lose."
          />
        </Slide>

        <Slide title="Background" appendix>
          <MetaStrip meta={META} />
          <p className="mt-3 text-ink">
            Rotawise is a fictional B2B SaaS company that sells employee scheduling software to businesses with shift
            workers (restaurants, retail, healthcare, hotels, warehouses and schools). Customers pay per seat on one of
            three plans: Starter ($4), Pro ($8) or Enterprise ($12).
          </p>
          <p className="mt-3 text-ink">
            The company has about 33,000 active accounts, and it can't give all of them the same attention. So the
            question isn't just "why do customers churn?" It's:
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

          <h3 className="mt-8 text-lg font-semibold text-ink">How the risk score works</h3>
          <p className="mt-2 text-ink">
            Each account gets points for every warning sign it has, and the points add up to a score from 0 (no
            warning signs) to 20 (all 8). Bigger gap, more points (see the first chart on this page).
          </p>
          <p className="mt-4 text-ink">
            To set the points, I sorted the signs by gap and split them where the gap jumps. Onboarding gets 4 on its
            own, since the biggest jump in the list is right after it. The three signs around 17 points get 3, the next
            three get 2, and escalated tickets gets 1. I left out having a Customer Success Manager (CSM), since that
            mostly just repeats plan.
          </p>
          <CodeBlock caption="T-SQL: risk score" code={SQL_SCORE} />
          <p className="mt-4 text-ink">
            To check the score works, I looked at last year's churn for each score. It climbs steadily, from 2.5% at
            score 0 to about 72% at 19–20 (the first chart on this page). Then I split the scores into two tiers at 11, where churn first goes over 25%:
            at risk (11–20) churned at 43.6% (2,047 of 4,700 accounts) and low risk (0–10) at 10.0% (2,480 of 24,811).
            An at-risk account is about 4x more likely to churn than a low-risk one.
          </p>

          <h3 className="mt-8 text-lg font-semibold text-ink">From score to money</h3>
          <p className="mt-2 text-ink">
            A high score doesn't mean a lot of money. A score-19 Starter account might put $100 at risk, while a
            lower-score Enterprise account could put $1,000+ at risk. So inside each tier I ranked accounts by expected
            loss: MRR × churn chance, where the churn chance is last year's churn for accounts with the same plan and
            score. My first version used score only, but Enterprise churns about half as much as the other plans at the
            same score (28.6% vs 60.7% at score 16), so I was overstating its risk and added plan to the lookup.
          </p>
          <CodeBlock caption="T-SQL: each account's tier and expected loss" code={SQL_TIERS} />
          <DataTable
            head={['Tier', 'Accounts', 'Expected MRR lost', 'Share']}
            rows={riskTiers.map((t) => [t.tier, num(t.accounts), money(t.expectedLoss), `${t.share}%`])}
            foot={['Total', num(tierAccounts), money(tierTotal), '100%']}
          />
          <p className="mt-3 text-ink">
            Low risk still holds 64% of the expected loss, but only because there are so many low-risk accounts. Each
            one is worth about $35 of expected loss, compared with $123 for each at-risk account.
          </p>
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
