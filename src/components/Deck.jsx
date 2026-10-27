import { Children, cloneElement, createContext, isValidElement, useContext } from 'react'

const DeckContext = createContext('')

// Slim page heading: just the project title
export function Cover({ title }) {
  return (
    <header className="project-hero accent-rule mt-3 rounded-t-lg px-5 pb-4 pt-5 sm:px-8 sm:pt-7">
      <h1 className="project-hero-title text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
    </header>
  )
}

// Tools / Data / Scope strip, kept for the appendix
export function MetaStrip({ meta }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
      {meta.map((item) => (
        <div key={item.label}>
          <dt className="text-[0.65rem] font-bold uppercase tracking-widest text-muted">{item.label}</dt>
          <dd className="mt-1 text-sm text-ink">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}

// One slide: title bar, body, and a footer with the project name and page number
export function Slide({ title, number, total, appendix, children }) {
  const project = useContext(DeckContext)

  return (
    <section className="overflow-hidden rounded-lg border border-border bg-bg shadow-md">
      <div className="flex items-center justify-between gap-4 accent-rule px-6 py-4 sm:px-10">
        <h2 className="text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{title}</h2>
        {appendix && <span className="text-xs font-bold uppercase tracking-widest text-muted">Appendix</span>}
      </div>
      <div className="px-6 py-6 sm:px-10 sm:py-8 [&>:first-child]:mt-0">{children}</div>
      <div className="flex items-center justify-between gap-4 border-t border-border bg-card px-6 py-2 text-[0.7rem] text-muted sm:px-10">
        <span>{project} · Joe Park</span>
        {!appendix && <span className="font-mono">{number} / {total}</span>}
      </div>
    </section>
  )
}

// Numbers the direct Slide children; appendix slides inside <Details> stay unnumbered
export function Deck({ project, children }) {
  const items = Children.toArray(children).filter(isValidElement)
  const total = items.filter((el) => el.type === Slide).length
  let n = 0

  return (
    <DeckContext.Provider value={project}>
      <div className="mt-8 flex flex-col gap-8">
        {items.map((el) => (el.type === Slide ? cloneElement(el, { number: ++n, total }) : el))}
      </div>
    </DeckContext.Provider>
  )
}
