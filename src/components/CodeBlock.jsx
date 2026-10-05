export default function CodeBlock({ caption, code }) {
  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-border bg-surface">
      <div className="border-b border-border px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted">
        {caption}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-sm text-ink">{code}</pre>
    </div>
  )
}
