import { getAllBlogs } from '@/lib/blog';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Portfolio from '../components/Portfolio';
import Experience from '../components/Experience';
import CodingStats from '../components/CodingStats';
import Contact from '../components/Contact';
import FeaturedBlogs from '../components/FeaturedBlogs';

export default function Home() {
  const blogs = getAllBlogs();

  return (
    <>
      <Hero />
      <Skills />
      <Experience />
      <Portfolio />
      <FeaturedBlogs blogs={blogs} />
      <CodingStats />
      <Contact />
    </>
  );
}
