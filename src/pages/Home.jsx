import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Section from '../components/Section';
import About from '../components/About';
import Stats from '../components/Stats';
import Shell from '../components/Shell';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';
import Reveal from '../components/Reveal';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  }, [hash]);

  return (
    <>
      <Hero />
      <Shell className="py-14 sm:py-20">
        <Stats />
      </Shell>

      <Section id="about">
        <Reveal><About /></Reveal>
      </Section>
      <Section id="skills">
        <Reveal><Skills /></Reveal>
      </Section>
      <Section id="projects">
        <Reveal><Projects /></Reveal>
      </Section>
      <Section id="experience">
        <Reveal><Experience /></Reveal>
      </Section>
      <Section id="contact" tinted>
        <Reveal><Contact /></Reveal>
      </Section>
    </>
  )
}
