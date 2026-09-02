const SIZE_STYLES = {
  lg: {
    span: 'sm:col-span-2 sm:row-span-2',
    pad: 'p-6',
    icon: 'h-8 w-8',
    title: 'text-xl',
    body: 'text-base',
    bar: 'h-1 w-12',
  },
  md: {
    span: 'sm:col-span-2',
    pad: 'p-5',
    icon: 'h-6 w-6',
    title: 'text-lg',
    body: 'text-sm',
    bar: 'h-[3px] w-9',
  },
  sm: {
    span: '',
    pad: 'p-5',
    icon: 'h-5 w-5',
    title: 'text-base',
    body: 'text-sm',
    bar: 'h-[3px] w-9',
  },
}

export default function SkillCard({ name, body, chips, size, accent, icon }) {
  const s = SIZE_STYLES[size]

  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border border-border bg-card ${s.pad} shadow-sm ${s.span} transition hover:-translate-y-1.5 hover:border-bar hover:shadow-lg hover:shadow-primary/20 motion-reduce:transform-none motion-reduce:transition-none`}
    >

      <div className="flex items-center gap-2">
        {icon && <img src={icon} alt="" className={s.icon} />}
        <h3 className={`${s.title} font-bold text-ink`}>{name}</h3>
      </div>

      <span className={`${s.bar} rounded-full ${accent ? 'bg-primary' : 'bg-bar'}`} />

      <p className={`${s.body} text-muted`}>{body}</p>

      {chips.length > 0 && (
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {chips.map((chip) => (
            <span key={chip} className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted">
              {chip}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}