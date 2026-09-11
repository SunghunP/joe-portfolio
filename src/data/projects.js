export const projects = [
  {
    slug: 'pho-restaurant-analysis',
    title: 'Pho Restaurant Sales Analysis',
    description:
      "Three months of point-of-sale data (38,293 line items) from my parents' pho restaurant, checked against their gut feeling that sales were declining. Cleaned and analyzed in Python/Pandas, visualized with Seaborn and Matplotlib.",
    tags: ['Python', 'Pandas', 'Seaborn'],
    finding: 'Weekly revenue held flat at roughly $26,000 across the quarter — the data did not support the assumption that business was slowing down.',
    repoUrl: 'https://github.com/SunghunP/pho-restaurant-analysis',
    caseStudyUrl: '/projects/pho-restaurant-analysis',
  },
  {
    slug: 'wa-labor-cost',
    title: 'DSA: Data Analysts in This WA City Earn 48% More',
    description:
      "A weighted average wage analysis across all 15 Washington labor market areas: what data analysts actually earn depending on where they work, and how deep the job market is in each one. 7,494 rows, cleaned in SQL Server and visualized in Power BI.",
    tags: ['SQL', 'Power BI', 'Geospatial'],
    finding: 'Analysts earn 48% more in Seattle-Tacoma-Bellevue than in Yakima, but Seattle also has 125 times as many analyst jobs.',
    repoUrl: 'https://github.com/SunghunP/wa-analyst-wage-case-study',
    caseStudyUrl: '/projects/wa-labor-cost',
  },
]