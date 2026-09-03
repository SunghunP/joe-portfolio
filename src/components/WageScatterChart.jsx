import { wageData } from '../data/wageData'

const LABELS = {
  Yakima: { dx: 10, dy: 4, anchor: 'start' },
  'Walla Walla': { dx: 0, dy: 16, anchor: 'middle' },
  'Olympia–Lacey': { dx: 0, dy: -11, anchor: 'middle', text: 'Olympia' },
  Spokane: { dx: 0, dy: 17, anchor: 'middle' },
  Bellingham: { dx: 10, dy: 4, anchor: 'start' },
  'Kennewick–Richland': { dx: 10, dy: 4, anchor: 'start', text: 'Kennewick' },
  'Portland–Vancouver, OR–WA': { dx: 0, dy: -11, anchor: 'middle', text: 'Portland' },
  'Seattle–Tacoma–Bellevue': { dx: -10, dy: 4, anchor: 'end' },
}

export default function WageScatterChart() {
  const width = 740
  const height = 320
  const xAxisLeft = 92
  const xAxisRight = width - 26
  const yAxisTop = 26
  const yAxisBottom = height - 56

  const empMin = Math.log10(200)
  const empMax = Math.log10(90000)
  const wageMin = 85000
  const wageMax = 135000

  const scaleX = (emp) => xAxisLeft + ((Math.log10(emp) - empMin) / (empMax - empMin)) * (xAxisRight - xAxisLeft)
  const scaleY = (wage) => yAxisBottom - ((wage - wageMin) / (wageMax - wageMin)) * (yAxisBottom - yAxisTop)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Scatter plot: analyst wage versus number of analysts employed, by area"
      className="w-full font-mono"
      style={{ minWidth: 520 }}
    >
      {[90000, 100000, 110000, 120000, 130000].map((wage) => (
        <g key={wage}>
          <line x1={xAxisLeft} y1={scaleY(wage)} x2={xAxisRight} y2={scaleY(wage)} className="stroke-border" strokeWidth={1} />
          <text x={xAxisLeft - 8} y={scaleY(wage) + 3} textAnchor="end" fontSize={8} className="fill-muted">
            {`$${wage / 1000}k`}
          </text>
        </g>
      ))}

      {[500, 1000, 5000, 10000, 50000].map((emp) => (
        <g key={emp}>
          <line
            x1={scaleX(emp)}
            y1={yAxisTop}
            x2={scaleX(emp)}
            y2={yAxisBottom}
            className="stroke-border"
            strokeWidth={1}
            strokeDasharray="2 3"
          />
          <text x={scaleX(emp)} y={yAxisBottom + 15} textAnchor="middle" fontSize={8} className="fill-muted">
            {emp >= 1000 ? `${emp / 1000}k` : emp}
          </text>
        </g>
      ))}

      <text x={(xAxisLeft + xAxisRight) / 2} y={height - 8} textAnchor="middle" fontSize={8.5} className="fill-muted">
        Analysts employed (log scale) →
      </text>
      <text
        x={16}
        y={(yAxisTop + yAxisBottom) / 2}
        textAnchor="middle"
        fontSize={8.5}
        className="fill-muted"
        transform={`rotate(-90 16 ${(yAxisTop + yAxisBottom) / 2})`}
      >
        Weighted mean annual wage
      </text>

      {wageData.map((area) => {
        const label = LABELS[area.name]
        if (!label) return null
        const x = scaleX(area.emp)
        const y = scaleY(area.wage)
        const isHighlighted = area.highlight === 'low' || area.highlight === 'high'

        return (
          <g key={area.name}>
            <circle cx={x} cy={y} r={isHighlighted ? 6 : 4.5} className={isHighlighted ? 'fill-primary' : 'fill-bar'} />
            <text
              x={x + label.dx}
              y={y + label.dy}
              textAnchor={label.anchor}
              fontSize={8.5}
              fontWeight={isHighlighted ? 600 : 400}
              className="fill-ink"
            >
              {label.text || area.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
