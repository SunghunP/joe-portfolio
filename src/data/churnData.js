// Generated from rotawise_accounts_clean.csv (51,831 accounts), same logic as churn_analysis.sql.
// "Last year" = accounts active on 2025-09-30 (29,511) that churned by 2026-09-30.

// Churn rate % by risk score (0–20), last year
export const churnByScore = [
  2.5, 0.9, 5.5, 5.7, 8.7, 9.9, 11.1, 14.6, 15.2,
  21.6, 21.5, 28.2, 30.3, 40.0, 41.5, 45.6,
  60.7, 64.4, 61.1, 72.8, 71.6,
]

// Share of churned accounts vs. share of lost MRR, by plan, last year
export const churnByPlan = [
  { plan: 'Starter', accounts: 60.8, mrr: 18.0 },
  { plan: 'Pro', accounts: 37.3, mrr: 54.9 },
  { plan: 'Enterprise', accounts: 1.9, mrr: 27.1 },
]

// Churn rate % with onboarding skipped vs. completed, by plan, last year
export const onboardingByPlan = [
  { plan: 'Starter', skipped: 38.0, completed: 12.8 },
  { plan: 'Pro', skipped: 30.0, completed: 8.4 },
  { plan: 'Enterprise', skipped: 16.0, completed: 4.2 },
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
  { label: 'NPS detractor or no answer', gap: 12.1, points: 2 },
  { label: '1+ escalated tickets', gap: 6.9, points: 1 },
]

// The 640-account call list, by plan
export const callList = [
  { plan: 'Enterprise', accounts: 367, expectedLoss: 275815 },
  { plan: 'Pro', accounts: 256, expectedLoss: 130552 },
  { plan: 'Starter', accounts: 17, expectedLoss: 7885 },
]
