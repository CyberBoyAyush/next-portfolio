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
          <SectionHeading
            subtitle="Blog"
            title="Articles & Insights"
            description="Exploring the world of web development, AI, and modern technology"
            className="mb-12 md:mb-20"
          />

          {blogs.length === 0 ? (
            <div className="text-center text-gray-400">
              No blog posts available yet. Check back soon!
            </div>
          ) : (
            <>
              {/* Blogs Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-10 xl:gap-12">
                {blogs.map((blog, index) => (
                  <motion.div
                    key={blog.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Link href={`/blogs/${blog.slug}`}>
                      <div className="group relative rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                        {/* Dark themed background with subtle gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />

                        {/* Subtle colored accent on hover */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Animated border gradient */}
                        <div className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-br from-gray-700 via-gray-600 to-gray-700 group-hover:from-blue-500/50 group-hover:via-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300">
                          <div className="h-full w-full rounded-2xl bg-gray-900" />
                        </div>

                        {/* Blog Image or Placeholder */}
                        <div className="relative z-10">
                          {blog.imageUrl ? (
                            <div className="w-full aspect-[1408/768] relative overflow-hidden rounded-t-2xl">
                              <Image
                                src={blog.imageUrl}
                                alt={blog.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </div>
                          ) : (
                            <BlogImagePlaceholder title={blog.title} />
                          )}
                        </div>

                        {/* Content Container */}
                        <div className="relative z-10 flex flex-col h-full p-4 sm:p-5 md:p-6">
                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-3 md:mb-4 text-xs text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <Calendar size={14} />
                              <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock size={14} />
                              <span>{blog.readingTime}</span>
                            </div>
                          </div>

                          {/* Title */}
                          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors">
                            {blog.title}
                          </h3>

                          {/* Description */}
                          <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                            {blog.description}
                          </p>

                          {/* Tags */}
                          <div className="mt-auto">
                            <div className="text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide flex items-center gap-1.5">
                              <Tag size={12} />
                              Topics
                            </div>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {blog.tags.slice(0, 4).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="inline-flex items-center px-2.5 py-1 bg-gray-800/80 backdrop-blur-sm text-gray-300 text-xs font-medium rounded-md border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800 transition-colors"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Read More Button */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-gray-800">
                              <span className="text-xs text-gray-400 font-medium">By {blog.author}</span>
                              <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-medium rounded-lg border border-white/10 hover:border-white/20 transition-all group/btn w-full sm:w-auto justify-center sm:justify-start">
                                <span>Read Article</span>
                                <ArrowRight size={12} className="group-hover/btn:translate-x-0.5 transition-transform" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Blog count info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center mt-12 md:mt-16 lg:mt-20"
              >
                <div className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 bg-gradient-to-r from-gray-800/60 to-gray-700/60 rounded-xl border border-gray-600/30 backdrop-blur-sm">
                  <span className="text-gray-300 font-medium text-sm md:text-base">
                    {blogs.length} Article{blogs.length !== 1 ? 's' : ''} Published
                  </span>
                </div>
              </motion.div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
