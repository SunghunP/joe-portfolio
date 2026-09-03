import StatCard from './StatCard';
import { stats } from '../data/stats';

export default function Stats() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} number={stat.number} label={stat.label} />
      ))}
    </div>
  )
}