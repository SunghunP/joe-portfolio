import Nav from './components/Nav';
import Hero from './components/Hero';
import Section from './components/Section';
import About from './components/About';
import Stats from './components/Stats';
import Shell from './components/Shell';
import Skills from './components/Skills';
import Projects from './components/Projects';

function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />
      <Shell className="py-14 sm:py-20"> 
        <Stats />
      </Shell>
      

      <Section id="about">
        <About />
      </Section>
      <Section id="skills">
        <Skills />
      </Section>
      <Section id="projects">
        <Projects />
      </Section>
      <Section id="experience">
        <p className="font-mono text-sm text-ink">Experience Section</p>
      </Section>
      <Section id="contact">
        <p className="font-mono text-sm text-ink">Contact Section</p>
      </Section>
    </div>
  )
}

export default App;