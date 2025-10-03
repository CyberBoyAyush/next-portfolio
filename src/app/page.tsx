"use client";

import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Experience from '../components/Experience';
import CodingStats from '../components/CodingStats';
import Contact from '../components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Portfolio />
      <CodingStats />
      <Contact />
    </>
  );
}
