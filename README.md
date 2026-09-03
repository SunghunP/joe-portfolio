# Joe Park's Portfolio
![](https://img.shields.io/badge/Version-1.0.0-blue)

## [VIEW THE WEBSITE](https://sunghunp.github.io/joe-portfolio/)

### About this project
A data analyst portfolio built from the ground up with React, Vite, and Tailwind CSS. It showcases my background, skills, and a full case study, from the raw dataset through cleaned SQL, a Power BI report, and a written recommendation, so anyone can see both the work and how it was done.

### Find me on
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sunghunp/) [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/SunghunP)

#### Tech Stack
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

## Table of Contents
1. [General](#general)
2. [Featured Case Study](#featured-case-study)
3. [Technologies](#technologies)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)

## General
### Links
**[LIVE SITE](https://sunghunp.github.io/joe-portfolio/)** <br>
_[THIS REPOSITORY](https://github.com/SunghunP/joe-portfolio)_ <br>

## Featured Case Study
The portfolio's flagship project: **[Where Should a Company Hire Data Analysts in Washington State?](https://sunghunp.github.io/joe-portfolio/projects/wa-labor-cost)** — a labor cost analysis comparing analyst wages across all 15 Washington labor market areas, weighted by employment, with a custom Power BI Shape Map built from Census Bureau shapefiles.

- **[Full write-up & SQL](https://github.com/SunghunP/wa-analyst-wage-case-study)** — the source repo, with every query and the complete case study document.
- **[Medium article](https://medium.com/@joeparkda/where-should-a-company-hire-data-analysts-in-washington-state-i-let-the-wage-data-decide-f3dbf8e12d52)** — a narrative walkthrough of the analysis.

## Technologies
- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)
- JavaScript

## Project Structure
```
src/
├─ components/   Reusable UI pieces (Nav, cards, charts, layout)
├─ pages/        Routed pages (Home, the case study)
├─ data/         Content as plain arrays, separate from layout
└─ index.css     Design tokens and base styles (Tailwind v4)
```
Content, such as skills, projects, and experience, lives in `src/data/` as plain data. Adding a new project or role means editing an array, not touching a component.

## Getting Started
### Installation
```
$ git clone https://github.com/SunghunP/joe-portfolio.git
$ cd joe-portfolio
$ npm install
```

### Available Scripts
In the project directory, you can run:

#### `npm run dev`
Runs the app in development mode with hot reload.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

#### `npm run build`
Builds the app for production into the `dist/` folder.

#### `npm run lint`
Runs ESLint over the project.

#### `npm run preview`
Serves the production build locally, to check it before deploying.

### Deployment
Pushing to `main` triggers a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the site and publishes it to GitHub Pages automatically.
