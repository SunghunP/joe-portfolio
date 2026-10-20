import StatCard from './StatCard';
import { stats } from '../data/stats';

export default function Stats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} number={stat.number} label={stat.label} />
      ))}
    </div>
  )
}