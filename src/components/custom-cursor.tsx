'use client';

import { useEffect, useState, useCallback } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [isMobile] = useState(() => 
    typeof window !== 'undefined' && 
    (window.innerWidth <= 768 || 'ontouchstart' in window || navigator.maxTouchPoints > 0)
  );

  const onMouseMove = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    setHidden(false);
  }, []);

  const onMouseEnter = useCallback(() => setHidden(false), []);
  const onMouseLeave = useCallback(() => setHidden(true), []);
  const onMouseDown = useCallback(() => setClicked(true), []);
  const onMouseUp = useCallback(() => setClicked(false), []);

  useEffect(() => {
    if (isMobile) return;

    document.body.style.cursor = 'none';
    
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    const links = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    const handleMouseEnter = () => setLinkHovered(true);
    const handleMouseLeave = () => setLinkHovered(false);
    
    links.forEach(link => {
      link.addEventListener('mouseenter', handleMouseEnter);
      link.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleMouseEnter);
        link.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      document.body.style.cursor = 'auto';
    };
  }, [isMobile, onMouseMove, onMouseEnter, onMouseLeave, onMouseDown, onMouseUp]);
  
  if (isMobile) return null;

  return (
    <>
      <div
        className={`custom-cursor ${linkHovered ? 'grow-cursor' : ''} ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.8 : 1})`,
        }}
      />
      <div
        className={`cursor-dot ${linkHovered ? 'grow' : ''} ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{
          left: position.x,
          top: position.y,
        }}
      />
    </>
  );
};

export default CustomCursor; 