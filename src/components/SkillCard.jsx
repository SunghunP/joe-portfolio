const SIZE_CLASSES = {
    lg: 'sm:col-span-2 sm:row-span-2',
    md: 'sm:col-span-2',
    sm: '',
}

export default function SkillCard({ name, body, chips, size, accent }) {
  return (
    <div className={`flex flex-col gap-2 rounded-xl border border-border bg-card p-5 shadow-sm ${SIZE_CLASSES[size]}`}>
      <span className={`h-[3px] w-9 rounded-full ${accent ? 'bg-primary' : 'bg-bar'}`} />
      <h3 className="text-base font-bold text-ink">{name}</h3>
      <p className="text-sm text-muted">{body}</p>
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