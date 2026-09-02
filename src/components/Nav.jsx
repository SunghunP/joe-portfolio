import { useState } from 'react';
import Shell from './Shell';

const NAV_LINKS = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#contact', label: 'Contact' },
]

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-bg/90 backdrop-blur">
            <Shell className="flex items-center justify-between py-3">
                <a href="#top" className="text-sm font-extrabold text-ink">
                    Joe Park
                </a>
            
                {/* Desktop links: always in the DOM, hidden below the sm: breakpoint */}
                <nav className="hidden items-center gap-6 sm:flex">
                    {NAV_LINKS.map((link) => (
                        <a key={link.href} href={link.href} className="text-sm font-medium text-muted hover:text-ink">
                            {link.label}
                        </a>
                    ))}
                    <a href="/resume.pdf" className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white">
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
            {isOpen &&(
                <nav className="flex flex-col gap-1 border-t border-border bg-card px-5 py-3 sm:hidden">
                    {NAV_LINKS.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="py-2 text-sm font-medium text-muted"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="/resume.pdf"
                        className="mt-1 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white"
                    >
                        Resume
                    </a>
                </nav>
            )}
        </header>
    )
}