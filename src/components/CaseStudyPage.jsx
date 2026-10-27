import { Link } from 'react-router-dom';
import Shell from './Shell';
import NextCaseStudy from './NextCaseStudy';
import { Cover, Deck } from './Deck';

const BACK_LINK = 'text-sm font-semibold text-primary hover:underline';

// Everything around a case study's slides: back links, heading, write-up links, and the next project
export default function CaseStudyPage({ project, title = project.title, children }) {
  return (
    <Shell className="py-14 sm:py-20 project-theme">
      <div className="mx-auto max-w-4xl">
        <Link to="/" className={BACK_LINK}>
          ← Back to portfolio
        </Link>

        <Cover title={title} />

        <Deck project={project.title}>{children}</Deck>

        <div className="mt-10 flex flex-wrap gap-5 border-t border-border pt-6 text-sm font-semibold">
          <a href={project.repoUrl} className="text-primary hover:underline">Full write-up &amp; {project.repoLabel} on GitHub →</a>
          <a href={project.mediumUrl} className="text-primary hover:underline">Read on Medium →</a>
        </div>

        <NextCaseStudy currentSlug={project.slug} />

        <Link to="/#projects" className={`mt-6 inline-block ${BACK_LINK}`}>
          ← Back to portfolio
        </Link>
      </div>
    </Shell>
  );
}
