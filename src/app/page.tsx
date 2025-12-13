import { getFeaturedBlogs } from '@/lib/blog';
import Hero from '../components/hero';
import Skills from '../components/skills';
import Portfolio from '../components/portfolio';
import Experience from '../components/experience';
import CodingStats from '../components/coding-stats';
import Contact from '../components/contact';
import FeaturedBlogs from '../components/featured-blogs';

export default function Home() {
  const blogs = getFeaturedBlogs();

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
