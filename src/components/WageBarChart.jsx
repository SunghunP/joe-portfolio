import { useState } from 'react';
import { wageData } from '../data/wageData';

export default function WageBarChart() {
  const [hovered, setHovered] = useState(null);

  const labelWidth = 150
  const chartRight = 460
  const rowHeight = 23
  const top = 24
  const maxWage = 135000
  const chartLeft = labelWidth + 12
  const width = chartRight + 60
  const height = top + wageData.length * rowHeight + 30
  const ticks = [0, 30000, 60000, 90000, 120000]

  const scaleX = (wage) => chartLeft + (wage / maxWage) * (chartRight - chartLeft)

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Bar chart: weighted mean analyst wage by Washington labor-market area"
      className="w-full font-mono"
      style={{ minWidth: 340 }}
    >
      {ticks.map((tick) => (
        <g key={tick}>
          <line
            x1={scaleX(tick)}
            y1={top - 6}
            x2={scaleX(tick)}
            y2={top + wageData.length * rowHeight}
            className="stroke-border"
            strokeWidth={1}
          />
          <text
            x={scaleX(tick)}
            y={top + wageData.length * rowHeight + 15}
            textAnchor="middle"
            fontSize={8}
            className="fill-muted"
          >
            {`$${tick / 1000}k`}
          </text>
        </g>
      ))}

      {wageData.map((area, i) => {
        const rowCenter = top + i * rowHeight + rowHeight / 2
        const barEnd = scaleX(area.wage)
        const isHighlighted = area.highlight === 'low' || area.highlight === 'high'
        const isDimmed = hovered !== null && hovered !== area.name

        return (
          <g
            key={area.name}
            opacity={isDimmed ? 0.35 : 1}
            className="transition-opacity duration-150"
            onMouseEnter={() => setHovered(area.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <text x={labelWidth} y={rowCenter + 3} textAnchor="end" fontSize={8} className="fill-muted">
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
              <title>{`${area.name}: $${area.wage.toLocaleString()} · ${area.emp.toLocaleString()} analysts`}</title>
            </rect>

            <text
              x={barEnd + 6}
              y={rowCenter + 3}
              fontSize={7.5}
              fontWeight={isHighlighted ? 600 : 400}
              className={isHighlighted ? 'fill-primary' : 'fill-muted'}
            >
              {`$${area.wage.toLocaleString()}`}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
