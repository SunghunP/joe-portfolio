// Appendix slides stay collapsed so a case study reads as a short deck; the full write-up opens on demand
export default function Details({ children }) {
  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold text-primary shadow-sm transition hover:border-primary [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">Show appendix</span>
        <span className="hidden group-open:inline">Hide appendix</span>
        <span aria-hidden="true" className="transition-transform group-open:rotate-180">▾</span>
      </summary>
      <div className="mt-8 flex flex-col gap-8">{children}</div>
    </details>
  )
}
