'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ChevronDown, ChevronUp, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useThemeSafe } from './theme-provider';

interface Heading {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    headings: Heading[];
    contentTriggerId?: string;
    contentEndId?: string;
}

export default function TableOfContents({ headings, contentTriggerId, contentEndId }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const themeContext = useThemeSafe();
    const isLight = themeContext?.theme === 'light';
    
    // Refs to store DOM elements to avoid repeated lookups
    const startElementRef = useRef<HTMLElement | null>(null);
    const endElementRef = useRef<HTMLElement | null>(null);
    const rafIdRef = useRef<number | null>(null);
    const tocNavRef = useRef<HTMLElement | null>(null);

    // Memoized scroll handler for TOC visibility
    const updateVisibility = useCallback(() => {
        const startEl = startElementRef.current;
        const endEl = endElementRef.current;
        
        if (!startEl) return;
        
        const startRect = startEl.getBoundingClientRect();
        const hasPassedStart = startRect.top < 100;
        
        if (endEl) {
            const endRect = endEl.getBoundingClientRect();
            // Hide when end element is visible in viewport (before it reaches top)
            // Using viewport height to hide TOC when engagement section comes into view
            const hasReachedEnd = endRect.top < window.innerHeight * 0.7;
            setIsVisible(hasPassedStart && !hasReachedEnd);
        } else {
            setIsVisible(hasPassedStart);
        }
    }, []);

    // Throttled scroll handler using RAF
    const handleScroll = useCallback(() => {
        if (rafIdRef.current) return;
        
        rafIdRef.current = requestAnimationFrame(() => {
            updateVisibility();
            rafIdRef.current = null;
        });
    }, [updateVisibility]);

    // Setup visibility tracking
    useEffect(() => {
        const startId = contentTriggerId || headings[0]?.id;
        if (!startId) return;

        // Cache DOM elements
        startElementRef.current = document.getElementById(startId);
        endElementRef.current = contentEndId ? document.getElementById(contentEndId) : null;
        
        if (!startElementRef.current) return;

        // Initial check
        updateVisibility();
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [headings, contentTriggerId, contentEndId, handleScroll, updateVisibility]);

    // Track active heading with IntersectionObserver
    useEffect(() => {
        if (headings.length === 0) return;
        
        const observer = new IntersectionObserver(
            (entries) => {
                // Find the entry that's most in view
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    // Get the one closest to the top
                    const topEntry = visibleEntries.reduce((prev, curr) => 
                        prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
                    );
                    setActiveId(topEntry.target.id);
                }
            },
            { 
                rootMargin: '-80px 0px -60% 0px',
                threshold: 0 
            }
        );

        headings.forEach((heading) => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, [headings]);

    // Auto-scroll TOC to keep active item visible
    useEffect(() => {
        if (!activeId || !tocNavRef.current) return;
        
        const activeElement = tocNavRef.current.querySelector(`a[href="#${activeId}"]`);
        if (activeElement) {
            const navRect = tocNavRef.current.getBoundingClientRect();
            const activeRect = activeElement.getBoundingClientRect();
            
            // Check if active item is outside visible area of TOC
            const isAbove = activeRect.top < navRect.top + 60; // 60px buffer for header
            const isBelow = activeRect.bottom > navRect.bottom - 20;
            
            if (isAbove || isBelow) {
                activeElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }
    }, [activeId]);

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
        if (level === 2) {
            h2Count++;
            h3Count = 0;
            return `${h2Count}.`;
        } else if (level === 3) {
            h3Count++;
            const romans = ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'];
            return romans[h3Count - 1] || `${h3Count}`;
        }
        return '';
    };

    // Reset counters for the render pass
    h2Count = 0;
    h3Count = 0;

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden mb-8">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className={`w-full flex items-center justify-between p-4 border rounded-lg text-left transition-colors ${
                        isLight 
                            ? 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100' 
                            : 'bg-white/5 border-white/10 text-gray-200 hover:bg-white/10'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <List size={18} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
                        <span className="font-medium font-mono">Table of Contents</span>
                    </div>
                    {isMobileOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {isMobileOpen && (
                    <nav className={`mt-2 p-4 border rounded-lg animate-in slide-in-from-top-2 ${
                        isLight 
                            ? 'bg-white border-gray-200' 
                            : 'bg-[#0D1117] border-white/10'
                    }`}>
                        <ul className="space-y-3">
                            {headings.map((heading) => {
                                const number = getNumbering(heading.level);
                                return (
                                    <li
                                        key={heading.id}
                                        style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
                                    >
                                        <a
                                            href={`#${heading.id}`}
                                            onClick={(e) => handleClick(e, heading.id)}
                                            className={cn(
                                                "flex items-baseline gap-3 text-sm transition-colors duration-200",
                                                activeId === heading.id
                                                    ? isLight ? "text-gray-900 font-medium" : "text-white font-medium"
                                                    : isLight ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-200"
                                            )}
                                        >
                                            <span className={cn(
                                                "font-mono text-xs shrink-0 w-6 text-right",
                                                heading.level === 3 ? "italic" : "",
                                                isLight ? "text-gray-400" : "text-gray-500"
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

            {/* Desktop Sidebar - Fixed position, only visible when scrolled to content */}
            <nav 
                ref={tocNavRef}
                className={`hidden lg:block fixed right-8 xl:right-12 2xl:right-16 top-24 w-72 xl:w-80 max-h-[calc(100vh-8rem)] p-4 overflow-y-auto custom-scrollbar transition-all duration-300 z-40 ${
                    isVisible 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-4 pointer-events-none'
                }`}
            >
                <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <List size={18} className={isLight ? 'text-gray-500' : 'text-gray-400'} />
                        <h3 className={`font-mono text-sm tracking-wide uppercase ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>Table of Contents</h3>
                    </div>
                    <ChevronUp size={16} className={isLight ? 'text-gray-400' : 'text-gray-600'} />
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
                                            ? isLight ? "text-gray-900" : "text-white"
                                            : isLight ? "text-gray-500 hover:text-gray-700" : "text-gray-400 hover:text-gray-200"
                                    )}
                                    style={{
                                        marginLeft: `${(heading.level - 2) * 12}px`
                                    }}
                                >
                                    <span className={cn(
                                        "font-mono text-xs shrink-0 w-6 text-right transition-colors duration-300",
                                        isActive 
                                            ? isLight ? "text-gray-900 font-bold" : "text-white font-bold" 
                                            : isLight ? "text-gray-400 group-hover:text-gray-500" : "text-gray-600 group-hover:text-gray-400",
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
          background: ${isLight ? '#d1d5db' : '#333'};
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isLight ? '#9ca3af' : '#555'};
        }
      `}</style>
        </>
    );
}
