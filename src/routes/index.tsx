import { createFileRoute } from '@tanstack/react-router';
import { getFeaturedBlogsServer } from '@/lib/blog-functions';
import Hero from '@/components/hero';
import Skills from '@/components/skills';
import Portfolio from '@/components/portfolio';
import Experience from '@/components/experience';
import CodingStats from '@/components/coding-stats';
import Contact from '@/components/contact';
import FeaturedBlogs from '@/components/featured-blogs';
import FounderHome from '@/components/founder/founder-home';
import { useAudienceSafe, type Audience } from '@/context/audience-provider';

interface HomeSearch {
  for?: 'founders' | 'engineers';
}

function normalizeAudienceParam(value: unknown): HomeSearch['for'] {
  if (typeof value !== 'string') return undefined;
  const v = value.toLowerCase();
  if (v === 'founders' || v === 'founder') return 'founders';
  if (v === 'engineers' || v === 'engineer' || v === 'dev' || v === 'devs') return 'engineers';
  return undefined;
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    for: normalizeAudienceParam(search.for),
  }),
  loader: () => getFeaturedBlogsServer(),
  component: Home,
});

function Home() {
  const blogs = Route.useLoaderData();
  const { for: forParam } = Route.useSearch();
  const audienceContext = useAudienceSafe();

  // URL search param wins for SSR + share-link correctness.
  // Founder is the default landing experience.
  const audience: Audience =
    forParam === 'founders'
      ? 'founder'
      : forParam === 'engineers'
        ? 'engineer'
        : (audienceContext?.audience ?? 'founder');

  if (audience === 'founder') {
    return <FounderHome />;
  }

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
