import databaseIcon from '../assets/icons/database.svg'
import githubIcon from '../assets/icons/github.svg'
import googleSheetsIcon from '../assets/icons/googlesheets.svg'
import mapSearchIcon from '../assets/icons/map_search.svg'
import powerbiIcon from '../assets/icons/powerbi.svg'
import pythonIcon from '../assets/icons/python.svg'

export const skills = [
  {
    name: 'SQL',
    size: 'lg',
    accent: true,
    icon: databaseIcon,
    body: 'Cleaning, joining, and aggregating at the source. Self-joins for imputation, weighted aggregates, and previewing every UPDATE as a SELECT before running it.',
    chips: ['Joins', 'Window fns', 'CTEs', 'Data QA'],
  },
  {
    name: 'Power BI',
    size: 'lg',
    accent: true,
    icon: powerbiIcon,
    body: 'Interactive reports non-analysts can drive themselves. Shape Map on custom boundaries, slicers wired across every page, companion tables where visuals fall short.',
    chips: ['Shape Map', 'Slicers', 'DAX (basic)', 'TopoJSON'],
  },
  {
    name: 'Python',
    size: 'sm',
    accent: true,
    icon: pythonIcon,
    body: 'pandas for wrangling and quick analysis outside the database.',
    chips: ['pandas', 'Jupyter'],
  },
  {
    name: 'Google Sheets',
    size: 'sm',
    accent: true,
    icon: googleSheetsIcon,
    body: 'Fast checks, pivots, and stakeholder-ready tables.',
    chips: [],
  },
  {
    name: 'Git & GitHub',
    size: 'sm',
    accent: true,
    icon: githubIcon,
    body: 'Versioned queries and notebooks.',
    chips: [],
  },
  {
    name: 'Geospatial',
    size: 'sm',
    accent: true,
    icon: mapSearchIcon,
    body: 'Census TIGER boundary files reshaped in mapshaper — filter, group, dissolve, merge — into custom map regions.',
    chips: ['mapshaper', 'Census TIGER', 'GeoJSON'],
  },
]