// Cover art for the SQL Practice card: question 7 from practice.sql in the sql-practice repo
// (most expensive product per category), drawn as an editor window with theme tokens.
const QUERY = `WITH Ranked AS (
  SELECT
    c.CategoryName,
    p.ProductName,
    p.UnitPrice,
    ROW_NUMBER() OVER (PARTITION BY c.CategoryName
      ORDER BY p.UnitPrice DESC) AS rn
  FROM dbo.Products p
  INNER JOIN dbo.Categories c
    ON p.CategoryID = c.CategoryID
)
SELECT CategoryName, ProductName, UnitPrice
FROM Ranked
WHERE rn = 1;`

const KEYWORDS = new Set(['WITH', 'AS', 'SELECT', 'OVER', 'PARTITION', 'BY', 'ORDER', 'DESC', 'FROM', 'INNER', 'JOIN', 'ON', 'WHERE'])

// Split a line into keyword / function / plain pieces for coloring
function tokens(line) {
  return line.split(/(\b[A-Z_]+\b)/).filter(Boolean).map((text) => ({
    text,
    tone: KEYWORDS.has(text) ? 'fill-primary font-bold' : text === 'ROW_NUMBER' ? 'fill-ink font-bold' : 'fill-muted',
  }))
}

export default function SqlArt() {
  const lines = QUERY.split('\n')

  return (
    <svg viewBox="0 0 400 250" className="h-full w-full font-mono" role="img" aria-label="SQL query using a CTE and ROW_NUMBER() OVER (PARTITION BY ...) to return the most expensive product in each category">
      <rect x="14" y="12" width="372" height="226" rx="8" className="fill-card stroke-border" />
      <path d="M14 20a8 8 0 0 1 8-8h356a8 8 0 0 1 8 8v10H14z" className="fill-surface" />
      {[28, 40, 52].map((cx) => <circle key={cx} cx={cx} cy="21" r="3.5" className="fill-bar" />)}
      <text x="372" y="25" textAnchor="end" fontSize="8.5" className="fill-muted">practice.sql</text>

      {lines.map((line, i) => (
        <g key={i}>
          <text x="32" y={50 + i * 13.5} fontSize="8" textAnchor="end" className="fill-border">{i + 1}</text>
          <text x="42" y={50 + i * 13.5} fontSize="10" xmlSpace="preserve">
            {tokens(line).map((t, j) => <tspan key={j} className={t.tone}>{t.text}</tspan>)}
          </text>
        </g>
      ))}
    </svg>
  )
}
