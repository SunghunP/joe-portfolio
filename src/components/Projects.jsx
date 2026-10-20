import ProjectCard from './ProjectCard';
import PracticeCard from './PracticeCard';
import wageChartsImage from '../assets/images/wa/wa-analyst-wage-charts.png';
import dashboardImage from '../assets/images/pho/sales_dashboard.png';
import coffeeDashboardImage from '../assets/images/coffee/coffee_shop_dashboard.png';
import { projects, practice } from '../data/projects';

const MEDIA = {
  'wa-labor-cost': (
    <img
      src={wageChartsImage}
      alt="Power BI dashboard with a Washington wage map, annual analyst wage by area, and analyst cost vs. talent pool size"
      className="dim-chart h-full w-full object-cover"
    />
  ),
  'pho-restaurant-analysis': (
    <img
      src={dashboardImage}
      alt="Pho restaurant sales dashboard with a day-by-hour sales heatmap and the top and bottom selling items"
      className="dim-chart h-full w-full object-cover"
    />
  ),
  'coffee-shop-sales-analysis': (
    <img
      src={coffeeDashboardImage}
      alt="Excel dashboard with coffee shop net sales by day, net sales by hour, total revenue by item, and percent of revenue by category"
      className="dim-chart h-full w-full object-cover"
    />
  ),
}

export default function Projects() {
  return (
    <div>
      <h2 className="text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">Projects</h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} {...project} media={MEDIA[project.slug]} featured={i === 0} />
        ))}

        <PracticeCard {...practice} />
      </div>
    </div>
  )
}