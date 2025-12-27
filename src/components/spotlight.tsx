'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

const Spotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const [isMobile, setIsMobile] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  
  // Check for mobile on client side
  useEffect(() => {
    setIsMobile(typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0));
  }, []);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Cancel previous RAF if pending
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    
    // Use RAF for smooth position updates
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
  
  // Skip rendering on mobile devices
  if (isMobile) return null;
  
  const spotlightSize = hoveredElement ? 'scale(1.3)' : 'scale(1)';
  
  return (
    <div 
      className={`spotlight ${isActive ? 'spotlight-active' : ''}`}
    >
      <div 
        className="spotlight-inner"
        style={{ 
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) ${spotlightSize}`,
          opacity: hoveredElement ? 0.85 : undefined,
          willChange: 'transform, opacity'
        }}
      />
    </div>
  );
};

export default Spotlight; 