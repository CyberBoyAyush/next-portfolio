'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useThemeSafe } from './theme-provider';

const Spotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const themeContext = useThemeSafe();
  const isLight = themeContext?.theme === 'light';
  
  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
  }, []);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    rafRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
    
    setIsActive(true);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsActive(false);
    }, 2000);
  }, []);
  
  const handleMouseOver = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const interactiveElement = 
      target.closest('a') || 
      target.closest('button') || 
      target.closest('[role="button"]') ||
      target.closest('.hover-glow') ||
      target.closest('.card') ||
      target.closest('.project-card');
    
    setHoveredElement(interactiveElement as HTMLElement | null);
  }, []);
  
  useEffect(() => {
    if (isMobile) return;
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile, handleMouseMove, handleMouseOver]);
  
  useEffect(() => {
    if (isMobile) return;
    
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], .card, .project-card, .skill-card, .tech-card'
    );
    
    interactiveElements.forEach(element => {
      element.classList.add('hover-glow');
    });
    
    return () => {
      interactiveElements.forEach(element => {
        element.classList.remove('hover-glow');
      });
    };
  }, [isMobile]);
  
  if (isMobile) return null;
  
  const spotlightSize = hoveredElement ? 'scale(1.3)' : 'scale(1)';
  
  return (
    <div 
      className={`spotlight ${isActive ? 'spotlight-active' : ''} ${isLight ? 'spotlight-light' : ''}`}
    >
      <div 
        className="spotlight-inner"
        style={{ 
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) ${spotlightSize}`,
          opacity: hoveredElement ? 0.85 : undefined,
          willChange: 'transform, opacity',
          background: isLight 
            ? 'radial-gradient(circle, rgba(0,0,0,0.03) 0%, transparent 70%)' 
            : undefined
        }}
      />
    </div>
  );
};

export default Spotlight; 