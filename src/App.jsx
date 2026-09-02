import Nav from './components/Nav';
import Hero from './components/Hero';
import Section from './components/Section';

function App() {
  return (
    <div id="top">
      <Nav />
      <Hero />

      <Section id="about">
        <p className="font-mono text-sm text-ink">About Section</p>
      </Section>
      <Section id="skills">
        <p className="font-mono text-sm text-ink">Skills Section</p>
      </Section>
      <Section id="projects">
        <p className="font-mono text-sm text-ink">Projects Section</p>
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