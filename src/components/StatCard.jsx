export default function StatCard({ number, label }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="inline-block border-b-2 border-primary pb-1 font-mono text-3xl font-bold tracking-tight text-ink">
        {number}
      </div>
      <p className="mt-3 text-sm text-muted">
        {label}
      </p>
    </div>
  )
}