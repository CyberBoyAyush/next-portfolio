'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import SectionHeading from './section-heading';
import BlogImagePlaceholder from './blog-image-placeholder';
import { BlogPost } from '@/types/blog';

interface FeaturedBlogsProps {
    blogs: BlogPost[];
}

const FeaturedBlogs = ({ blogs }: FeaturedBlogsProps) => {
    if (!blogs || blogs.length === 0) return null;

    return (
        <section id="blogs" className="py-20 relative overflow-hidden">
            {/* Simple Background */}
            <div className="absolute inset-0 -z-10 bg-[#0D1117]" />

            {/* Grid background */}
            <div className="absolute inset-0 -z-10 bg-[length:40px_40px] [background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]" />
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="mb-10">
                    <SectionHeading
                        subtitle="From the Blog"
                        title="Featured Articles"
                        description="Thoughts on development, design, and technology"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {blogs.slice(0, 2).map((blog, index) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.25, delay: index * 0.05 }}
                        >
                            <Link href={`/blogs/${blog.slug}`} className="group block h-full">
                                <article className="h-full bg-gray-900/40 backdrop-blur-sm border border-gray-800/60 hover:border-blue-500/30 transition-all duration-300 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)] overflow-hidden flex flex-col group-hover:-translate-y-1">
                                    {/* Image Container */}
                                    <div className="relative aspect-[2/1] overflow-hidden bg-gray-900">
                                        {blog.frontmatter.imageUrl ? (
                                            <Image
                                                src={blog.frontmatter.imageUrl}
                                                alt={`${blog.frontmatter.title} - Blog cover image`}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        ) : (
                                            <BlogImagePlaceholder title={blog.frontmatter.title} />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col grow">
                                        <div className="flex items-center gap-3 text-xs font-medium text-gray-500 mb-3">
                                            <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 border border-gray-700/50">
                                                <Calendar size={12} className="text-blue-400" />
                                                <time dateTime={blog.frontmatter.date}>
                                                    {new Date(blog.frontmatter.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </time>
                                            </div>
                                            <div className="flex items-center gap-1.5 bg-gray-800/50 px-2 py-1 border border-gray-700/50">
                                                <Clock size={12} className="text-purple-400" />
                                                <span>{blog.frontmatter.readingTime}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors line-clamp-2">
                                            {blog.frontmatter.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2 grow">
                                            {blog.frontmatter.description}
                                        </p>

                                        <div className="flex items-center text-xs font-bold text-blue-400 uppercase tracking-wider mt-auto">
                                            <span className="relative overflow-hidden">
                                                Read Article
                                                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-blue-400 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                            </span>
                                            <ArrowRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link
                        href="/blogs"
                        className="group flex items-center gap-2 text-gray-400 hover:text-white transition-colors px-5 py-2.5 hover:bg-white/5 border border-transparent hover:border-white/10"
                    >
                        <span className="text-sm font-medium">View All Articles</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FeaturedBlogs;
