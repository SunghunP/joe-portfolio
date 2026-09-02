import { wageData } from '../data/wageData';

export default function WageBarChart({ compact = false }) {
  const data = compact ? wageData.filter((d) => d.heroFeatured) : wageData

  const labelWidth = compact ? 90 : 150
  const chartRight = compact ? 340 : 460
  const rowHeight = compact ? 24 : 23
  const top = compact ? 20 : 24
  const labelFontSize = compact ? 8.5 : 8
  const maxWage = 135000
  const chartLeft = labelWidth + 12
  const width = chartRight + (compact ? 40 : 60)
  const height = top + data.length * rowHeight + 30
  const ticks = compact ? [0, 60000, 120000] : [0, 30000, 60000, 90000, 120000]

  const scaleX = (wage) => chartLeft + (wage / maxWage) * (chartRight - chartLeft)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Bar chart: weighted mean analyst wage by Washington labor-market area"
      className="w-full font-mono"
      style={{ minWidth: compact ? 300 : 420 }}
    >
      {ticks.map((tick) => (
        <g key={tick}>
          <line
            x1={scaleX(tick)}
            y1={top - 6}
            x2={scaleX(tick)}
            y2={top + data.length * rowHeight}
            className="stroke-border"
            strokeWidth={1}
          />
          <text
            x={scaleX(tick)}
            y={top + data.length * rowHeight + 15}
            textAnchor="middle"
            fontSize={8}
            className="fill-muted"
          >
            {`$${tick / 1000}k`}
          </text>
        </g>
      ))}

      {data.map((area, i) => {
        const rowCenter = top + i * rowHeight + rowHeight / 2
        const barEnd = scaleX(area.wage)
        const isHighlighted = area.highlight === 'low' || area.highlight === 'high'

        return (
          <g key={area.name}>
            <text x={labelWidth} y={rowCenter + 3} textAnchor="end" fontSize={labelFontSize} className="fill-muted">
              {area.name}
            </text>

            <rect
              x={chartLeft}
              y={rowCenter - 8}
              width={Math.max(1, barEnd - chartLeft)}
              height={16}
              rx={2}
              className={isHighlighted ? 'fill-primary' : 'fill-bar'}
            >
              <title>{`${area.name} — $${area.wage.toLocaleString()} · ${area.emp.toLocaleString()} analysts`}</title>
            </rect>

            {(!compact || isHighlighted) && (
              <text
                x={barEnd + 6}
                y={rowCenter + 3}
                fontSize={compact ? 8 : 7.5}
                fontWeight={isHighlighted ? 600 : 400}
                className={isHighlighted ? 'fill-primary' : 'fill-muted'}
              >
                {`$${area.wage.toLocaleString()}`}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}
