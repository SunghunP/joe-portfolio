import Kicker from './Kicker';
import ProjectCard from './ProjectCard';
import WageBarChart from './WageBarChart';
import { projects } from '../data/projects';

const MEDIA = {
  'wa-labor-cost': <WageBarChart />,
}

export default function Projects() {
  return (
    <div>
      <Kicker>Projects</Kicker>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Most Recent Project</h2>

      <div className="mt-8 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} media={MEDIA[project.slug]} />
        ))}

        <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
          More case studies in progress.
        </div>
      </div>
    </div>
  )
}