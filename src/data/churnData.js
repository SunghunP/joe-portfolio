// Generated from rotawise_accounts_clean.csv (51,831 accounts), same logic as churn_analysis.sql.
// "Last year" = accounts active on 2025-09-30 (29,511) that churned by 2026-09-30.

// Churn rate % by risk score (0–20), last year
export const churnByScore = [
  2.5, 0.9, 5.5, 5.7, 8.7, 9.9, 11.1, 14.6, 15.2,
  21.6, 21.5, 28.2, 30.3, 40.0, 41.5, 45.6,
  60.7, 64.4, 61.1, 72.8, 71.6,
]

// Accounts at the start of last year for each risk score (0–20), and how many churned
export const scoreCounts = [
  [105, 4166], [3, 348], [238, 4363], [106, 1866], [215, 2479], [249, 2507], [149, 1347], [401, 2751], [146, 958],
  [533, 2466], [335, 1560], [191, 677], [347, 1144], [220, 550], [299, 721], [136, 298],
  [306, 504], [239, 371], [33, 54], [198, 272], [78, 109],
].map(([churned, accounts]) => ({ churned, accounts }))

// Share of churned accounts vs. share of lost MRR, by plan, last year (4,527 accounts, $1,388,991 MRR lost)
export const churnByPlan = [
  { plan: 'Starter', accounts: 60.8, mrr: 18.0, churned: 2752, lostMrr: 250442 },
  { plan: 'Pro', accounts: 37.3, mrr: 54.9, churned: 1688, lostMrr: 761886 },
  { plan: 'Enterprise', accounts: 1.9, mrr: 27.1, churned: 87, lostMrr: 376663 },
]

// Churn rate % with onboarding skipped vs. completed, by plan, last year, with counts (churned of accounts)
export const onboardingByPlan = [
  { plan: 'Starter', skipped: 38.0, completed: 12.8, skippedN: [1349, 3549], completedN: [1403, 10985] },
  { plan: 'Pro', skipped: 30.0, completed: 8.4, skippedN: [767, 2555], completedN: [921, 10961] },
  { plan: 'Enterprise', skipped: 16.0, completed: 4.2, skippedN: [34, 212], completedN: [53, 1249] },
]

// Cumulative % of monthly-contract accounts lost by tenure month (month 0 = signup)
export const cumulativeLost = [
  0, 4.5, 8.0, 11.1, 13.8, 16.3, 18.3, 20.1, 21.8, 23.2, 24.6, 25.7, 27.0,
  28.1, 29.2, 30.1, 31.0, 31.7, 32.6, 33.3, 34.0, 34.6, 35.2, 35.8, 36.2,
].map((pct, month) => ({ month, pct }))

// Churn gap (points) for each warning sign, and the risk score points it earns
export const warningSigns = [
  { label: 'Onboarding not completed', gap: 23.8, points: 4 },
  { label: 'No training sessions', gap: 17.5, points: 3 },
  { label: 'Seat use under 60%', gap: 17.4, points: 3 },
  { label: '31+ days to go live', gap: 17.2, points: 3 },
  { label: '0 or 1 integrations', gap: 14.8, points: 2 },
  { label: 'Feature adoption under 50%', gap: 13.0, points: 2 },
  { label: 'Survey score 0–6 or no answer', gap: 12.1, points: 2 },
  { label: '1+ escalated tickets', gap: 6.9, points: 1 },
]

// Expected MRR lost in the next 12 months, by risk tier (33,588 active accounts, from active_risk.csv)
export const riskTiers = [
  { tier: 'At risk (11–20)', accounts: 4576, expectedLoss: 564697, share: 35.8 },
  { tier: 'Low risk (0–10)', accounts: 29012, expectedLoss: 1010660, share: 64.2 },
]
