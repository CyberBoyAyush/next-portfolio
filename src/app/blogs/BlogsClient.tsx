"use client";

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Tag, ArrowRight } from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import BlogImagePlaceholder from '../../components/BlogImagePlaceholder';

interface Blog {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  author: string;
  imageUrl?: string;
}

interface BlogsClientProps {
  blogs: Blog[];
}

export default function BlogsClient({ blogs }: BlogsClientProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#0D1117] pt-20 md:pt-20">
      <section ref={sectionRef} className="py-8 md:py-16 relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-[#0D1117]">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gradient-radial from-blue-800/20 to-transparent opacity-50 blur-[100px]" />
        </div>

        {/* Grid background */}
        <div
          className="absolute inset-0 -z-10 bg-[length:30px_30px] md:bg-[length:40px_40px] lg:bg-[length:50px_50px] [background-image:linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)]"
        ></div>

        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <div className="flex flex-col items-center mb-12 md:mb-20">
            <SectionHeading
              subtitle="Blog"
              title="Articles & Insights"
              description="Exploring the world of web development, AI, and modern technology"
              className="mb-6"
            />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
              {blogs.length} Articles Published
            </div>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center text-gray-400">
              No blog posts available yet. Check back soon!
            </div>
          ) : (
            <>
              {/* Blogs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
                {blogs.map((blog, index) => (
                  <motion.div
                    key={blog.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link href={`/blogs/${blog.slug}`} className="block h-full group">
                      <article className="flex flex-col h-full bg-[#161b22] border border-gray-800/60 rounded-2xl overflow-hidden hover:border-gray-700 transition-all duration-300 hover:shadow-xl hover:shadow-black/20">
                        {/* Blog Image */}
                        <div className="relative aspect-video overflow-hidden bg-gray-900">
                          {blog.imageUrl ? (
                            <Image
                              src={blog.imageUrl}
                              alt={blog.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          ) : (
                            <BlogImagePlaceholder title={blog.title} />
                          )}
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-linear-to-t from-[#161b22] to-transparent opacity-20" />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col grow p-6">
                          {/* Title */}
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                            {blog.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 grow">
                            {blog.description}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {blog.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="px-2.5 py-1 bg-[#21262d] text-gray-400 text-xs font-medium rounded-full border border-gray-700/50"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Footer */}
                          <div className="pt-4 border-t border-gray-800/60 flex items-center justify-between mt-auto text-xs text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar size={14} />
                              <time dateTime={blog.date}>
                                {new Date(blog.date).toLocaleDateString('en-US', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </time>
                            </div>
                            <div className="flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                              <span>Read Article</span>
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
