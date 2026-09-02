import Kicker from './Kicker'
import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  return (
    <div>
      <Kicker>Projects</Kicker>
      <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">Selected work</h2>
      <p className="mt-2 max-w-[60ch] text-muted">
        One flagship analysis, worked end to end. More in progress.
      </p>

      <div className="mt-8 flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}

        <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted">
          More case studies in progress.
        </div>
      </div>
    </div>
  )
}
