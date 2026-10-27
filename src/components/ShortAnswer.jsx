// The case study's headline finding, shown right after the problem statement
export default function ShortAnswer({ finding }) {
  return (
    <div className="rounded-xl border-l-4 border-primary bg-primary-tint p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-primary">Key finding</p>
      <p className="mt-2 text-lg font-semibold leading-snug text-ink sm:text-xl">{finding}</p>
    </div>
  )
}
