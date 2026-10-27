import { useEffect, useRef, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { money } from '../utils/format'

// Colors come from theme tokens. Inside the BI canvas (.bi) that means blue bars for context and orange for the highlight.

function useTooltip() {
  const ref = useRef(null)
  const [tip, setTip] = useState(null)

  const show = (event, content) => {
    const box = ref.current.getBoundingClientRect()
    setTip({ x: event.clientX - box.left, y: event.clientY - box.top, content })
  }
  const hide = () => setTip(null)

  const element = tip && (
    <div
      className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-sm bg-ink px-2.5 py-1.5 text-xs font-medium text-bg shadow-lg"
      style={{ left: tip.x, top: tip.y - 10 }}
    >
      {tip.content}
    </div>
  )

  return { ref, show, hide, element }
}

// Width of the chart's box, so SVG charts draw at real pixel size instead of scaling text down on phones
function useWidth(fallback) {
  const ref = useRef(null)
  const [width, setWidth] = useState(fallback)

  useEffect(() => {
    const node = ref.current
    if (!node || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width) || fallback))
    observer.observe(node)
    return () => observer.disconnect()
  }, [fallback])

  return [ref, width]
}

// The card every chart sits in: label, one-line headline, the chart, and a caption.
export function ChartCard({ label, headline, caption, children, className = '' }) {
  const [ref, seen] = useInView(0.25)

  return (
    <figure
      ref={ref}
      data-in={seen}
      className={`chart-card min-w-0 rounded-sm border border-border bg-card p-3 shadow-sm sm:p-4 ${className}`}
    >
      <p className="text-[13px] font-semibold text-ink">{label}</p>
      {headline && <p className="mt-1 text-lg font-extrabold leading-snug tracking-tight text-ink sm:text-xl">{headline}</p>}
      <div className="mt-3">{children}</div>
      {caption && <figcaption className="mt-2 text-[11px] text-muted">{caption}</figcaption>}
    </figure>
  )
}

export function Legend({ items }) {
  return (
    <ul className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted">
      {items.map((item) => (
        <li key={item.name} className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 ${item.className}`} />
          {item.name}
        </li>
      ))}
    </ul>
  )
}

// Horizontal bars: ranked categories. `highlight` marks the bars the story is about.
// Phones put the label and value on one line with a full-width bar under them.
export function HBar({ data, format = money, highlight = () => false, labelWidth = '9rem', ariaLabel }) {
  const { ref, show, hide, element } = useTooltip()
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div ref={ref} className="relative" role="img" aria-label={ariaLabel}>
      <ul className="flex flex-col gap-1.5">
        {data.map((d, i) => (
          <li
            key={d.label}
            className="grid grid-cols-[1fr_4rem] items-center gap-x-3 sm:grid-cols-[var(--label-w)_1fr_4.5rem]"
            style={{ '--label-w': labelWidth }}
            onPointerMove={(e) => show(e, `${d.label}: ${format(d.value)}${d.note ? ` · ${d.note}` : ''}`)}
            onPointerLeave={hide}
          >
            <span className="truncate text-xs text-muted sm:text-right">{d.label}</span>
            <span className="order-last col-span-2 block h-4 sm:order-none sm:col-span-1">
              <span
                className={`grow-x block h-full ${highlight(d, i) ? 'bg-primary' : 'bg-bar'}`}
                style={{ width: `${(d.value / max) * 100}%`, '--d': `${i * 45}ms` }}
              />
            </span>
            <span className={`fade-up text-right text-xs tabular-nums sm:text-left ${highlight(d, i) ? 'font-bold text-ink' : 'text-muted'}`} style={{ '--d': `${300 + i * 45}ms` }}>
              {d.display ?? format(d.value)}
            </span>
          </li>
        ))}
      </ul>
      {element}
    </div>
  )
}

// Vertical columns. One series = highlight picks the dark bars; several series = grouped columns.
export function Columns({ labels, series, format = money, highlight = () => false, height = 200, axisFormat, valueLabel, ariaLabel }) {
  const { ref, show, hide, element } = useTooltip()
  const max = Math.max(...series.flatMap((s) => s.values))
  const magnitude = 10 ** Math.floor(Math.log10(max))
  const niceMax = Math.ceil(max / magnitude) * magnitude
  const ticks = [0, 0.5, 1].map((f) => niceMax * f)
  const single = series.length === 1

  return (
    <div ref={ref} className="relative" role="img" aria-label={ariaLabel}>
      <div className="flex gap-2 pt-4">
        <div className="relative w-10 shrink-0 text-[0.65rem] text-muted" style={{ height }}>
          {ticks.map((t) => (
            <span key={t} className="absolute right-0 -translate-y-1/2" style={{ bottom: `${(t / niceMax) * 100}%` }}>
              {(axisFormat ?? format)(t)}
            </span>
          ))}
        </div>
        <div className="relative min-w-0 flex-1" style={{ height }}>
          {ticks.map((t) => (
            <div key={t} className="absolute inset-x-0 border-t border-border" style={{ bottom: `${(t / niceMax) * 100}%` }} />
          ))}
          <div className="absolute inset-0 flex items-end gap-[3px] sm:gap-1.5">
            {labels.map((label, i) => (
              <div
                key={label}
                className="flex h-full flex-1 items-end justify-center gap-[2px]"
                onPointerMove={(e) =>
                  show(e, series.length === 1
                    ? `${label}: ${format(series[0].values[i])}`
                    : `${label} · ${series.map((s) => `${s.name} ${format(s.values[i])}`).join(' · ')}`)
                }
                onPointerLeave={hide}
              >
                {series.map((s) => {
                  const on = single ? highlight(i) : true
                  return (
                    <span key={s.name} className="relative block h-full w-full max-w-9">
                      <span
                        className={`grow-y absolute inset-x-0 bottom-0 block ${single ? (on ? 'bg-primary' : 'bg-bar') : s.className}`}
                        style={{ height: `${(s.values[i] / niceMax) * 100}%`, '--d': `${i * 40}ms` }}
                      />
                      {valueLabel && single && (
                        <span
                          className="fade-up absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.6rem] font-semibold text-ink"
                          style={{ bottom: `calc(${(s.values[i] / niceMax) * 100}% + 2px)`, '--d': `${400 + i * 40}ms` }}
                        >
                          {valueLabel(s.values[i])}
                        </span>
                      )}
                    </span>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ml-12 mt-2 flex gap-[3px] sm:gap-1.5">
        {labels.map((label, i) => (
          <span key={label} className={`min-w-0 flex-1 text-center text-[0.65rem] text-muted ${labels.length > 12 && i % 2 ? 'invisible sm:visible' : ''}`}>{label}</span>
        ))}
      </div>
      {element}
    </div>
  )
}

// Day-by-hour heatmap. `mark` outlines a block of columns, e.g. the slow afternoon.
export function Heatmap({ rows, cols, values, format = money, mark, ariaLabel }) {
  const { ref, show, hide, element } = useTooltip()
  const flat = values.flat().filter((v) => v != null)
  const max = Math.max(...flat)

  return (
    <div ref={ref} className="relative" role="img" aria-label={ariaLabel}>
      <div>
        <div className="flex gap-2">
          <div className="w-8 shrink-0 sm:w-9" />
          <div className="grid flex-1 gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}>
            {cols.map((c, i) => (
              <span key={c.key} className={`text-center text-[0.65rem] text-muted ${i % 2 ? 'invisible sm:visible' : ''}`}>{c.label}</span>
            ))}
          </div>
        </div>
        <div className="mt-1 flex gap-2">
          <div className="flex w-8 shrink-0 flex-col gap-[3px] sm:w-9">
            {rows.map((r) => (
              <span key={r} className="flex h-7 items-center text-xs font-semibold text-muted sm:h-8">{r.slice(0, 3)}</span>
            ))}
          </div>
          <div className="relative flex-1">
            <div className="flex flex-col gap-[3px]">
              {values.map((row, ri) => (
                <div key={rows[ri]} className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${cols.length}, minmax(0, 1fr))` }}>
                  {row.map((v, ci) => {
                    const t = v == null ? 0 : v / max
                    return (
                      <span
                        key={cols[ci].key}
                        className={`fade-up flex h-7 items-center justify-center font-sans sm:h-8 text-[0.6rem] tabular-nums ${
                          v == null ? 'bg-surface' : t > 0.65 ? 'text-on-primary' : 'text-ink'
                        }`}
                        style={{
                          '--d': `${(ri + ci) * 25}ms`,
                          ...(v == null ? {} : { backgroundColor: `color-mix(in oklab, var(--color-bar) ${Math.round(10 + t * 90)}%, var(--color-card))` }),
                        }}
                        onPointerMove={(e) => show(e, v == null ? `${rows[ri]} ${cols[ci].label}: closed` : `${rows[ri]} ${cols[ci].label}: ${format(v)} avg`)}
                        onPointerLeave={hide}
                      >
                        <span className="hidden sm:inline">{v == null ? '' : Math.round(v)}</span>
                      </span>
                    )
                  })}
                </div>
              ))}
            </div>
            {mark && (
              <div
                className="pointer-events-none absolute inset-y-[-3px] border-2 border-dashed border-primary"
                style={{ left: `${(mark.from / cols.length) * 100}%`, width: `${((mark.to - mark.from) / cols.length) * 100}%` }}
              >
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-on-primary">
                  {mark.label}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="mt-9 flex flex-wrap items-center gap-2 text-[0.65rem] text-muted sm:ml-11">
          <span>Slower</span>
          <span className="h-2 w-28 rounded-full" style={{ background: 'linear-gradient(to right, color-mix(in oklab, var(--color-bar) 10%, var(--color-card)), var(--color-bar))' }} />
          <span>Busier</span>
          <span className="ml-3 flex items-center gap-1"><span className="h-2.5 w-2.5 rounded-sm bg-surface" /> Closed</span>
        </div>
      </div>
      {element}
    </div>
  )
}

// Area + line over time with a dashed average. Zero baseline, so "flat" really looks flat.
export function TrendLine({ data, valueKey, labelKey, format = money, average, ariaLabel }) {
  const { ref, show, hide, element } = useTooltip()
  const [box, W] = useWidth(640)
  const H = W < 480 ? 180 : 200
  const pad = { l: 40, r: 12, t: 24, b: 32 }
  const labelEvery = W < 480 ? 4 : 2
  const yMax = 30000
  const x = (i) => pad.l + (i / (data.length - 1)) * (W - pad.l - pad.r)
  const y = (v) => pad.t + (1 - v / yMax) * (H - pad.t - pad.b)
  const line = data.map((d, i) => `${i ? 'L' : 'M'}${x(i)},${y(d[valueKey])}`).join(' ')
  const area = `${line} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`
  const [hover, setHover] = useState(null)

  return (
    <div ref={ref} className="relative">
      <div ref={box}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={ariaLabel} className="block w-full font-sans">
          {[0, 10000, 20000, 30000].map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="stroke-border" />
              <text x={pad.l - 8} y={y(t) + 3} textAnchor="end" fontSize="10" className="fill-muted">{t ? `$${t / 1000}K` : '$0'}</text>
            </g>
          ))}
          <path d={area} className="fill-bar/15" />
          {average && (
            <g>
              <line x1={pad.l} x2={W - pad.r} y1={y(average)} y2={y(average)} className="stroke-ink" strokeDasharray="4 4" strokeWidth="1" />
              <text x={W - pad.r} y={y(average) + 16} textAnchor="end" fontSize="10" fontWeight="700" className="fill-ink">
                avg {money(average)}
              </text>
            </g>
          )}
          <path d={line} fill="none" className="stroke-bar" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
          {data.map((d, i) => (
            <g key={d[labelKey]}>
              {hover === i && <line x1={x(i)} x2={x(i)} y1={pad.t} y2={H - pad.b} className="stroke-muted" strokeDasharray="3 3" />}
              <circle cx={x(i)} cy={y(d[valueKey])} r={hover === i ? 6 : 4} className="fill-bar stroke-card" strokeWidth="2" />
              {i % labelEvery === 0 && <text x={x(i)} y={H - 10} textAnchor="middle" fontSize="10" className="fill-muted">{d[labelKey]}</text>}
              <rect
                x={x(i) - (W - pad.l - pad.r) / (data.length - 1) / 2}
                y={pad.t}
                width={(W - pad.l - pad.r) / (data.length - 1)}
                height={H - pad.t - pad.b}
                fill="transparent"
                onPointerMove={(e) => { setHover(i); show(e, `Week of ${d[labelKey]}: ${format(d[valueKey])}`) }}
                onPointerLeave={() => { setHover(null); hide() }}
              />
            </g>
          ))}
        </svg>
      </div>
      {element}
    </div>
  )
}

// Pay vs. job market size: employment on a log axis so Yakima and Seattle fit on one plot.
export function Scatter({ data, labeled = [], ariaLabel }) {
  const { ref, show, hide, element } = useTooltip()
  const [box, W] = useWidth(640)
  const H = W < 480 ? 240 : 280
  const pad = { l: 44, r: 16, t: 20, b: 40 }
  const xMin = Math.log10(150)
  const xMax = Math.log10(100000)
  const yMin = 80000
  const yMax = 140000
  const x = (emp) => pad.l + ((Math.log10(emp) - xMin) / (xMax - xMin)) * (W - pad.l - pad.r)
  const y = (wage) => pad.t + (1 - (wage - yMin) / (yMax - yMin)) * (H - pad.t - pad.b)
  const xTicks = [200, 1000, 10000, 100000]
  const yTicks = [80000, 100000, 120000, 140000]

  return (
    <div ref={ref} className="relative">
      <div ref={box}>
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} role="img" aria-label={ariaLabel} className="block w-full font-sans">
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={pad.l} x2={W - pad.r} y1={y(t)} y2={y(t)} className="stroke-border" />
              <text x={pad.l - 8} y={y(t) + 3} textAnchor="end" fontSize="10" className="fill-muted">{`$${t / 1000}K`}</text>
            </g>
          ))}
          {xTicks.map((t) => (
            <text key={t} x={x(t)} y={H - 20} textAnchor="middle" fontSize="10" className="fill-muted">{t.toLocaleString()}</text>
          ))}
          <text x={(pad.l + W - pad.r) / 2} y={H - 4} textAnchor="middle" fontSize="10" className="fill-muted">Analyst jobs (log scale)</text>
          {data.map((d) => {
            const strong = d.highlight === 'low' || d.highlight === 'high'
            const label = labeled.includes(d.name) || strong
            return (
              <g key={d.name} onPointerMove={(e) => show(e, `${d.name}: ${money(d.wage)} · ${d.emp.toLocaleString()} analysts`)} onPointerLeave={hide}>
                <circle cx={x(d.emp)} cy={y(d.wage)} r={strong ? 8 : 6} className={`${strong ? 'fill-primary' : 'fill-bar'} stroke-card`} strokeWidth="2" />
                <circle cx={x(d.emp)} cy={y(d.wage)} r="14" fill="transparent" />
                {label && (
                  <text
                    x={x(d.emp) + (d.emp > 20000 ? -14 : 14)}
                    y={y(d.wage) + 4}
                    textAnchor={d.emp > 20000 ? 'end' : 'start'}
                    fontSize="11"
                    fontWeight={strong ? 700 : 500}
                    className="fill-ink"
                  >
                    {d.short ?? d.name}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>
      {element}
    </div>
  )
}

// The original Power BI / Excel dashboard, shown in a window frame
export function DashboardFrame({ src, alt, caption }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-card shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-bar" />
        <span className="h-2.5 w-2.5 rounded-full bg-bar" />
        <span className="h-2.5 w-2.5 rounded-full bg-bar" />
      </div>
      <img src={src} alt={alt} className="w-full" />
      {caption && <figcaption className="border-t border-border px-4 py-2 text-xs text-muted">{caption}</figcaption>}
    </figure>
  )
}

// A report canvas in the style of a BI tool: light gray page, white tiles, KPI cards on top.
// It scopes its own palette (see .bi in index.css), so it looks the same in light and dark mode.
export function BiDashboard({ subtitle, kpis, children }) {
  return (
    <div className="bi overflow-hidden rounded-md border border-border bg-bg p-3 shadow-lg sm:p-4">
      {subtitle && <p className="mb-2 text-xs text-muted">{subtitle}</p>}
      <div className={`grid grid-cols-2 gap-3 ${kpis.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-4'}`}>
        {kpis.map((k) => (
          <div key={k.label} className="rounded-sm border border-border bg-card px-4 py-3 shadow-sm">
            <p className="text-xs text-muted">{k.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{k.value}</p>
            {k.sub && <p className="mt-0.5 text-[11px] text-muted">{k.sub}</p>}
          </div>
        ))}
      </div>
      <div className="mt-3 grid gap-3 lg:grid-cols-2">{children}</div>
    </div>
  )
}
