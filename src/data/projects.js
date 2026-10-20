export const projects = [
  {
    slug: 'pho-restaurant-analysis',
    title: 'Pho Restaurant Sales Analysis',
    description:
      "A quarter of point-of-sale data (38,293 rows) from a pho restaurant, checked against the owners' belief that sales were slipping. Cleaned in SQL Server (data types, date and hour fields rebuilt from a single timestamp, duplicate order types merged), then reported in Python with Pandas and seaborn.",
    tags: ['SQL', 'Python', 'Pandas'],
    finding: 'Revenue held steady at about $26K a week, and a 1–4 PM lull on the day-by-hour heatmap led to a targeted promotion that raised slow-hour revenue 10%.',
    repoUrl: 'https://github.com/SunghunP/pho-restaurant-analysis',
    caseStudyUrl: '/projects/pho-restaurant-analysis',
  },
  {
    slug: 'wa-labor-cost',
    title: 'WA Analyst Wages: One City Pays 48% More',
    description:
      'Where should a company open an analyst office? 7,494 rows of Washington State wage data across 15 labor market areas, analyzed in SQL Server with imputed missing wages and employment-weighted averages (self-joins, GROUP BY, views), then presented in a Power BI dashboard for a non-technical decision maker.',
    tags: ['SQL', 'Power BI', 'Geospatial'],
    finding: 'Seattle-Tacoma-Bellevue analysts earn 48% more than Yakima ($130.4K vs. $87.9K), with a talent pool 124 times larger (72,210 vs. 580).',
    repoUrl: 'https://github.com/SunghunP/wa-analyst-wage-case-study',
    caseStudyUrl: '/projects/wa-labor-cost',
  },
  {
    slug: 'coffee-shop-sales-analysis',
    title: 'Coffee Shop Sales Analysis',
    description:
      'Four weeks of coffee shop POS data (2,418 transactions, $19,936 in sales) broken down by hour, day, item, and category with SQL (GROUP BY, SUM() OVER()). Visualized in an Excel PivotTable dashboard, then rebuilt in T-SQL to verify the numbers matched.',
    tags: ['Excel', 'SQL', 'PivotTables'],
    finding: 'Half of orders were a single item ($4.70 vs. $11.80) and after 3 PM drove only 11% of sales; a drink-and-pastry bundle is projected to lift sales about 3%.',
    repoUrl: 'https://github.com/SunghunP/coffee_business_analysis',
    caseStudyUrl: '/projects/coffee-shop-sales-analysis',
  },
]

export const featuredVideo = {
  youtubeId: 'ssW6SEwQqqU',
  title: 'Restaurant EDA Analysis',
  highlights: [
    {
      label: 'Full analysis workflow',
      text: 'Cleaned 38,293 point-of-sale line items in SQL Server, then analyzed and visualized them with Pandas, Seaborn, and Matplotlib.',
    },
    {
      label: 'Revenue held flat at ~$26,000 a week',
      text: 'The data did not support the assumption that business was slowing down.',
    },
    {
      label: 'Recommendations',
      text: 'Proposed a 1PM–4PM special, a Tuesday promotion, and extra to-go help at the 5PM and 9PM peaks. The owners launched the afternoon promotion, lifting revenue in those slow hours by 10%.',
    },
  ],
}

export const practice = {
  title: 'SQL Practice',
  description: 'A log of SQL practice questions and challenges.',
  tags: ['SQL', 'StrataScratch'],
  focusAreas: ['Window functions', 'CTEs', 'Joins', 'Aggregations'],
  repoUrl: 'https://github.com/SunghunP/sql-practice',
}
