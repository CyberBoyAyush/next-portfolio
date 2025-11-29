'use client';

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -40% 0px' }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveId(id);
            setIsMobileOpen(false);
        }
    };

    if (headings.length === 0) return null;

    // Helper to generate numbers (1., 2., ...) and roman numerals (i, ii, ...)
    let h2Count = 0;
    let h3Count = 0;

    const getNumbering = (level: number) => {
        if (level === 2) { // Assuming H2 is top level in TOC
            h2Count++;
            h3Count = 0; // Reset H3 counter
            return `${h2Count}.`;
        } else if (level === 3) {
            h3Count++;
            // Simple roman numeral converter for small numbers
            const romans = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
            return romans[h3Count - 1] || `${h3Count}`;
        }
        return '';
    };

    // Pre-calculate numbering to avoid render-phase side effects if we were mapping directly in JSX
    // But here we can just map and maintain state since it's a single pass render
    const numberedHeadings = headings.map(h => {
        // Reset logic needs to be handled carefully in a map if we want it to be pure-ish, 
        // but for this simple list, we can just iterate.
        // Actually, let's do it properly.
        return h;
    });

    // Reset counters for the render pass
    h2Count = 0;
    h3Count = 0;

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden mb-8">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg text-left text-gray-200 hover:bg-white/10 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <List size={18} className="text-blue-400" />
                        <span className="font-medium font-mono">Table of Contents</span>
                    </div>
                    {isMobileOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isMobileOpen && (
                    <nav className="mt-2 p-4 bg-[#0D1117] border border-white/10 rounded-lg animate-in slide-in-from-top-2">
                        <ul className="space-y-3">
                            {headings.map((heading) => {
                                const number = getNumbering(heading.level);
                                return (
                                    <li
                                        key={heading.id}
                                        style={{ paddingLeft: `${(heading.level - 2) * 16}px` }} // Adjusted indentation
                                    >
                                        <a
                                            href={`#${heading.id}`}
                                            onClick={(e) => handleClick(e, heading.id)}
                                            className={cn(
                                                "flex items-baseline gap-3 text-sm transition-colors duration-200",
                                                activeId === heading.id
                                                    ? "text-white font-medium"
                                                    : "text-gray-400 hover:text-gray-200"
                                            )}
                                        >
                                            <span className={cn(
                                                "font-mono text-xs shrink-0 w-6 text-right",
                                                heading.level === 3 ? "italic text-gray-500" : "text-gray-500"
                                            )}>
                                                {number}
                                            </span>
                                            <span>{heading.text}</span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                )}
            </div>

            {/* Desktop Sidebar */}
            <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] pr-4 overflow-y-auto custom-scrollbar">
                <div className="mb-6 flex items-center justify-between text-gray-100">
                    <div className="flex items-center gap-3">
                        <List size={18} className="text-gray-400" />
                        <h3 className="font-mono text-sm tracking-wide text-gray-400 uppercase">Table of Contents</h3>
                    </div>
                    <ChevronUp size={16} className="text-gray-600" /> {/* Decorative or functional if we want collapse */}
                </div>

                <ul className="space-y-4">
                    {headings.map((heading) => {
                        const number = getNumbering(heading.level);
                        const isActive = activeId === heading.id;

                        return (
                            <li key={heading.id} className="relative group">
                                <a
                                    href={`#${heading.id}`}
                                    onClick={(e) => handleClick(e, heading.id)}
                                    className={cn(
                                        "flex items-baseline gap-4 text-sm transition-all duration-300 group-hover:translate-x-1",
                                        isActive
                                            ? "text-white"
                                            : "text-gray-400 hover:text-gray-200"
                                    )}
                                    style={{
                                        marginLeft: `${(heading.level - 2) * 12}px`
                                    }}
                                >
                                    <span className={cn(
                                        "font-mono text-xs shrink-0 w-6 text-right transition-colors duration-300",
                                        isActive ? "text-white font-bold" : "text-gray-600 group-hover:text-gray-400",
                                        heading.level === 3 && "italic"
                                    )}>
                                        {number}
                                    </span>
                                    <span className={cn(
                                        "leading-relaxed",
                                        isActive ? "font-medium" : "font-normal"
                                    )}>
                                        {heading.text}
                                    </span>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
      `}</style>
        </>
    );
}
