import Kicker from './Kicker';
import ProjectCard from './ProjectCard';
import shapeMapImage from '../assets/images/shapemap_cropped.png';
import heatmapImage from '../assets/images/pho/sales_heatmap.png';
import { projects } from '../data/projects';

const MEDIA = {
  'wa-labor-cost': (
    <img
      src={shapeMapImage}
      alt="Power BI Shape Map of Washington labor market areas shaded by average analyst pay"
      className="h-full w-full object-cover"
    />
  ),
  'pho-restaurant-analysis': (
    <img
      src={heatmapImage}
      alt="Average sales by day of week and hour for the pho restaurant analysis"
      className="h-full w-full object-cover"
    />
  ),
}

export default function Projects() {
  return (
    <div>
      <Kicker>Projects</Kicker>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Most Recent Project</h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} media={MEDIA[project.slug]} />
        ))}

        <div className="flex items-center justify-center rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
          More case studies in progress.
        </div>
      </div>
    </div>
  )
}