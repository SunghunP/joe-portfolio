import { useEffect, useRef, useState } from 'react';

function parseStatNumber(raw) {
  const match = raw.match(/[\d,]+/);
  if (!match) return null;
  return {
    prefix: raw.slice(0, match.index),
    suffix: raw.slice(match.index + match[0].length),
    target: parseInt(match[0].replace(/,/g, ''), 10),
  };
}

export default function StatCard({ number, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(number);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const parsed = parseStatNumber(number);
    if (!parsed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(node);

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(parsed.target * eased);
          setDisplay(`${parsed.prefix}${current.toLocaleString()}${parsed.suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [number]);

  return (
    <div ref={ref} className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="inline-block border-b-2 border-primary pb-1 font-mono text-3xl font-bold tracking-tight tabular-nums text-ink">
        {display}
      </div>
      <p className="mt-3 text-sm text-muted">
        {label}
      </p>
    </div>
  )
}
