import Shell from './Shell';

export default function Section({ id, children, className = '' }) {
    return (
        <section id={id} className={`border-t border-border py-14 sm:py-20 ${className}`}>
            <Shell>{children}</Shell>
        </section>
    )
}