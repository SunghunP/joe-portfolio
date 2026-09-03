import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Shell from './Shell';

const NAV_LINKS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveId(null)
      return
    }

    const sections = NAV_LINKS
      .map((link) => document.getElementById(link.id))
      .filter(Boolean)

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [location.pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
      <Shell className="flex items-center justify-between py-3">
        <Link to="/" onClick={() => window.scrollTo(0, 0)} className="text-sm font-extrabold text-ink">
          Joe Park
        </Link>

        {/* Desktop links: always in the DOM, hidden below the sm: breakpoint */}
        <nav className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              className={`text-sm font-medium transition-colors ${
                link.id === activeId ? 'text-primary-strong' : 'text-muted hover:text-ink'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`${import.meta.env.BASE_URL}Joe_Park_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white"
          >
            Resume
          </a>
        </nav>

        {/*Mobile Toggle: only shown below sm: */}
        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-label="Toggle menu"
          className="grid h-9 w-9 place-items-center rounded-lg border border-border text-ink sm:hidden"
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </Shell>

      {/* Mobile Panel: only exists in the DOM at all when isOpen is true */}
      {isOpen && (
        <nav className="flex flex-col gap-1 border-t border-border bg-card px-5 py-3 sm:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              to={`/#${link.id}`}
              onClick={() => setIsOpen(false)}
              className={`py-2 text-sm font-medium ${link.id === activeId ? 'text-primary' : 'text-muted'}`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`${import.meta.env.BASE_URL}Joe_Park_Resume.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white"
          >
            Resume
          </a>
        </nav>
      )}
    </header>
  )
}
