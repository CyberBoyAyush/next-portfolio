'use client';

import { useEffect, useState, useRef } from 'react';

const Spotlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<HTMLElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Smooth mouse position updates with requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
      
      // Activate spotlight and reset timeout
      setIsActive(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Deactivate spotlight after 2 seconds of inactivity (longer duration)
      timeoutRef.current = setTimeout(() => {
        setIsActive(false);
      }, 2000);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      // Check if hovering over interactive element
      const target = e.target as HTMLElement;
      const interactiveElement = 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') ||
        target.closest('.hover-glow') ||
        target.closest('.card') ||
        target.closest('.project-card');
      
      if (interactiveElement) {
        setHoveredElement(interactiveElement);
      } else {
        setHoveredElement(null);
      }
    };
    
    // Check if we're on a mobile device
    const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      window.addEventListener('mouseover', handleMouseOver, { passive: true });
    }
    
    return () => {
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseover', handleMouseOver);
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  // Apply hover-glow class to interactive elements
  useEffect(() => {
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
  }, []);
  
  // Determine if spotlight should be larger based on hovering over interactive element
  const spotlightSize = hoveredElement ? 'scale(1.3)' : 'scale(1)';
  
  return (
    <div 
      ref={spotlightRef}
      className={`spotlight ${isActive ? 'spotlight-active' : ''}`}
    >
      <div 
        className="spotlight-inner"
        style={{ 
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%) ${spotlightSize}`,
          opacity: hoveredElement ? 0.85 : undefined
        }}
      />
    </div>
  );
};

export default Spotlight; 