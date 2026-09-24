import Kicker from './Kicker';
import ProjectCard from './ProjectCard';
import PracticeCard from './PracticeCard';
import wageChartsImage from '../assets/images/wa/wa-analyst-wage-charts.png';
import dashboardImage from '../assets/images/pho/sales_dashboard.png';
import { projects, practice } from '../data/projects';

const MEDIA = {
  'wa-labor-cost': (
    <img
      src={wageChartsImage}
      alt="Power BI dashboard with a Washington wage map, annual analyst wage by area, and analyst cost vs. talent pool size"
      className="dim-in-dark h-full w-full object-cover"
    />
  ),
  'pho-restaurant-analysis': (
    <img
      src={dashboardImage}
      alt="Pho restaurant sales dashboard with a day-by-hour sales heatmap and the top and bottom selling items"
      className="dim-in-dark h-full w-full object-cover"
    />
  ),
}

export default function Projects() {
  return (
    <div>
      <Kicker>Projects</Kicker>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Most Recent Projects</h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} media={MEDIA[project.slug]} />
        ))}

        <PracticeCard {...practice} />

        <div className="flex items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
          More case studies in progress.
        </div>
      </div>
    </div>
  )
}