import Section from './components/Section';
import Shell from './components/Shell';

function App() {
  return (
    <>
      <Shell className="py-8">
        <h1 className="text-3xl font-bold text-primary">Joe Park</h1>
        <p className="text-muted">Data Analyst Portfolio - Building in progress.</p>
      </Shell>

      <Section>
        <p className="font-mono text-sm text-ink">Section two test</p>
      </Section>

      <Section>
        <p className="font-mono text-sm text-ink">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Section>
    </>
  )
}

export default App;