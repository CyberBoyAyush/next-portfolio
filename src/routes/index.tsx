import { createFileRoute } from '@tanstack/react-router';
import { getFeaturedBlogsServer } from '@/lib/blog-functions';
import Hero from '@/components/hero';
import Skills from '@/components/skills';
import Portfolio from '@/components/portfolio';
import Experience from '@/components/experience';
import CodingStats from '@/components/coding-stats';
import Contact from '@/components/contact';
import FeaturedBlogs from '@/components/featured-blogs';

export const Route = createFileRoute('/')({
  loader: () => getFeaturedBlogsServer(),
  component: Home,
});

function Home() {
  const blogs = Route.useLoaderData();

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
