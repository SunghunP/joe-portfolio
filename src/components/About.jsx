const highlights = [
    {
        title: 'Highlight 1',
        body: 'body text bla bla bla bla',
    },
    {
        title: 'Highlight 2',
        body: 'body text bla bla bla bla',
    },
    {
        title: 'Highlight 3',
        body: 'body text bla bla bla bla',
    },
]

export default function About() {
    return (
        <div className="grid gap-10 md:grid-cols-2">
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-primary">About</p>
                <div className="mt-3 space-y-4 text-base text-ink">
                    <p>
                        I spent about three years as a full-stack developer before moving toward analytics.
            The engineering habits — version control, reproducibility, thinking in data models — came with me.
                    </p>
                    <p>
                        I like the problems where the hard part is deciding what to measure. Based in Seattle;
            open to data-analyst roles.
                    </p>
                </div>
            </div>

            <div className=" flex flex-col gap-3">
                {highlights.map((item) => (
                    <div key={item.title} className="rounded-xl border border-border bg-card p-4 shadow-sm">
                        <b className="block text-sm font-bold text-ink">{item.title}</b>
                        <span className="mt-1 block text-sm text-muted">{item.body}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}