import databaseIcon from '../assets/icons/database.svg'
import githubIcon from '../assets/icons/github.svg'
import googleSheetsIcon from '../assets/icons/googlesheets.svg'
import powerbiIcon from '../assets/icons/powerbi.svg'
import pythonIcon from '../assets/icons/python.svg'
import tableIcon from '../assets/icons/table.svg'

export const skills = [
  {
    name: 'SQL',
    size: 'lg',
    accent: true,
    icon: databaseIcon,
    body: 'Cleaning, joining, and aggregating at the source. Self-joins for imputation, weighted aggregates, and previewing every UPDATE as a SELECT before running it.',
    chips: ['Joins', 'Window fns', 'CTEs', 'Aggregations', 'Views', 'Data QA'],
  },
  {
    name: 'Power BI',
    size: 'lg',
    accent: true,
    icon: powerbiIcon,
    iconColor: true,
    body: 'Interactive reports non-analysts can drive themselves. Shape Map on custom boundaries, slicers wired across every page, companion tables where visuals fall short.',
    chips: ['Shape Map', 'Slicers', 'DAX (basic)', 'TopoJSON'],
  },
  {
    name: 'Python',
    size: 'sm',
    accent: true,
    icon: pythonIcon,
    body: 'pandas for wrangling and quick analysis outside the database, seaborn for visual reports.',
    chips: ['pandas', 'seaborn', 'Jupyter'],
  },
  {
    name: 'Google Sheets',
    size: 'sm',
    accent: true,
    icon: googleSheetsIcon,
    body: 'Fast checks, pivots, and tables I can hand straight to a non-technical teammate.',
    chips: [],
  },
  {
    name: 'Excel',
    size: 'sm',
    accent: true,
    icon: tableIcon,
    body: 'PivotTables, charts, and dashboards, cross-checked against SQL so the numbers match.',
    chips: ['PivotTables', 'VLOOKUP', 'Charts'],
  },
  {
    name: 'Git & GitHub',
    size: 'sm',
    accent: true,
    icon: githubIcon,
    body: 'Versioned queries and notebooks.',
    chips: [],
  },
]