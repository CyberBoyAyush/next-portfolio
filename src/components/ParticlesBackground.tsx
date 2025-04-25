'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ParticlesBackgroundProps {
  variant?: 'default' | 'network' | 'stars';
}

const ParticlesBackground = ({ variant = 'default' }: ParticlesBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Set mounted state after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return; // Only run after component is mounted
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initial setup
    setCanvasDimensions();
    
    // Handle resize
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create particles
    const particlesArray: {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
    }[] = [];
    
    // Configuration based on variant
    const config = {
      particleCount: variant === 'network' ? 80 : variant === 'stars' ? 100 : 50,
      colors: variant === 'network' 
        ? ['#7f00ff', '#8a3ffc', '#9462fa'] 
        : variant === 'stars' 
        ? ['#ffffff', '#8a3ffc', '#7f00ff', '#9462fa'] 
        : ['#7f00ff', '#9462fa', '#a78bfa'],
      maxSize: variant === 'stars' ? 3 : 5,
      minSize: 1,
      maxSpeed: variant === 'network' ? 0.8 : 1,
      opacity: variant === 'network' ? 0.5 : variant === 'stars' ? 0.8 : 0.3,
    };
    
    // Initialize particles
    for (let i = 0; i < config.particleCount; i++) {
      const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
      const color = config.colors[Math.floor(Math.random() * config.colors.length)];
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const speedX = (Math.random() - 0.5) * config.maxSpeed;
      const speedY = (Math.random() - 0.5) * config.maxSpeed;
      
      particlesArray.push({
        x,
        y,
        size,
        color,
        speedX,
        speedY,
      });
    }
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw and update particles
      particlesArray.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = config.opacity;
        ctx.fill();
        
        // Update position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around screen
        if (particle.x > canvas.width) particle.x = 0;
        else if (particle.x < 0) particle.x = canvas.width;
        
        if (particle.y > canvas.height) particle.y = 0;
        else if (particle.y < 0) particle.y = canvas.height;
      });
      
      // Network connections for network variant
      if (variant === 'network') {
        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = '#8a3ffc';
        ctx.lineWidth = 0.5;
        
        for (let i = 0; i < particlesArray.length; i++) {
          for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
              ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
    };
  }, [variant, isMounted]);
  
  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 -z-10" 
        style={{ background: 'transparent' }}
      />
      <div className="fixed inset-0 -z-20 bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f]">
        {isMounted ? (
          <>
            <motion.div 
              className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-900/10 to-transparent opacity-50 blur-[150px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div 
              className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-indigo-900/10 to-transparent opacity-50 blur-[150px]" 
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.7, 0.5],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </>
        ) : (
          <>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-purple-900/10 to-transparent opacity-40 blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial from-indigo-900/10 to-transparent opacity-50 blur-[150px]" />
          </>
        )}
      </div>
    </>
  );
};

export default ParticlesBackground; 