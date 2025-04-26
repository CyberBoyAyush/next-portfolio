"use client";

import { useEffect } from 'react';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import CodingStats from '../components/CodingStats';
import Contact from '../components/Contact';

export default function Home() {
  useEffect(() => {
    // Scroll to top when component mounts (on page load/reload)
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Hero />
      <Skills />
      <Portfolio />
      <CodingStats />
      <Contact />
    </>
  );
}
