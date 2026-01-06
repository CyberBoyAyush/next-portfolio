'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import SectionHeading from './section-heading';
import BlogImagePlaceholder from './blog-image-placeholder';
import { BlogPost } from '@/types/blog';
import { useThemeSafe } from './theme-provider';

interface FeaturedBlogsProps {
    blogs: BlogPost[];
}

const FeaturedBlogs = ({ blogs }: FeaturedBlogsProps) => {
    const themeContext = useThemeSafe();
    const isLight = themeContext?.theme === 'light';

    if (!blogs || blogs.length === 0) return null;

    return (
        <section id="blogs" className="py-20 relative overflow-hidden">
            {/* Background */}
            <div className={`absolute inset-0 -z-10 transition-colors duration-300 ${isLight ? 'bg-[#fafafa]' : 'bg-[#0D1117]'}`} />

            {/* Grid background */}
            <div className={`absolute inset-0 -z-10 bg-[length:40px_40px] ${
                isLight 
                    ? '[background-image:linear-gradient(rgba(0,0,0,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,.03)_1px,transparent_1px)]' 
                    : '[background-image:linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)]'
            }`} />
            
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
                                <article className={`h-full backdrop-blur-sm border transition-all duration-300 overflow-hidden flex flex-col group-hover:-translate-y-1 ${
                                    isLight 
                                        ? 'bg-white/80 border-gray-200 hover:border-blue-400/50 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.2)]' 
                                        : 'bg-gray-900/40 border-gray-800/60 hover:border-blue-500/30 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.15)]'
                                }`}>
                                    {/* Image Container */}
                                    <div className={`relative aspect-[2/1] overflow-hidden ${isLight ? 'bg-gray-100' : 'bg-gray-900'}`}>
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
                                        <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${
                                            isLight ? 'from-white/30 opacity-40' : 'from-gray-900 opacity-60'
                                        }`} />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col grow">
                                        <div className={`flex items-center gap-3 text-xs font-medium mb-3 ${isLight ? 'text-gray-500' : 'text-gray-500'}`}>
                                            <div className={`flex items-center gap-1.5 px-2 py-1 border ${
                                                isLight 
                                                    ? 'bg-gray-100/80 border-gray-200' 
                                                    : 'bg-gray-800/50 border-gray-700/50'
                                            }`}>
                                                <Calendar size={12} className={isLight ? 'text-blue-500' : 'text-blue-400'} />
                                                <time dateTime={blog.frontmatter.date}>
                                                    {new Date(blog.frontmatter.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric',
                                                    })}
                                                </time>
                                            </div>
                                            <div className={`flex items-center gap-1.5 px-2 py-1 border ${
                                                isLight 
                                                    ? 'bg-gray-100/80 border-gray-200' 
                                                    : 'bg-gray-800/50 border-gray-700/50'
                                            }`}>
                                                <Clock size={12} className={isLight ? 'text-purple-500' : 'text-purple-400'} />
                                                <span>{blog.frontmatter.readingTime}</span>
                                            </div>
                                        </div>

                                        <h3 className={`text-lg font-bold mb-2 transition-colors line-clamp-2 ${
                                            isLight 
                                                ? 'text-gray-900 group-hover:text-blue-600' 
                                                : 'text-white group-hover:text-blue-400'
                                        }`}>
                                            {blog.frontmatter.title}
                                        </h3>

                                        <p className={`text-sm leading-relaxed mb-4 line-clamp-2 grow ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {blog.frontmatter.description}
                                        </p>

                                        <div className={`flex items-center text-xs font-bold uppercase tracking-wider mt-auto ${
                                            isLight ? 'text-blue-600' : 'text-blue-400'
                                        }`}>
                                            <span className="relative overflow-hidden">
                                                Read Article
                                                <span className={`absolute bottom-0 left-0 w-full h-[1px] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ${
                                                    isLight ? 'bg-blue-600' : 'bg-blue-400'
                                                }`} />
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
                        className={`group flex items-center gap-2 transition-colors px-5 py-2.5 border border-transparent ${
                            isLight 
                                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 hover:border-gray-200' 
                                : 'text-gray-400 hover:text-white hover:bg-white/5 hover:border-white/10'
                        }`}
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
