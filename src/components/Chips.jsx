// Small rounded tags, used on project, practice, and skill cards
export default function Chips({ items, className = '' }) {
  return (
    <div className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <span key={item} className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted">
          {item}
        </span>
      ))}
    </div>
  )
}
