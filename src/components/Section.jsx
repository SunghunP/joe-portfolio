import Shell from './Shell'

export default function Section({ id, children, className = '', tinted = false }) {
  return (
    <section id={id} className={`border-t border-border py-14 sm:py-20 ${tinted ? 'bg-surface [--color-card:var(--color-bg)]' : ''} ${className}`}>
      <Shell>{children}</Shell>
    </section>
  )
}
