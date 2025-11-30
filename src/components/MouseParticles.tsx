import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  size: number;
  angle: number;
  distance: number;
  speed: number;
  opacity: number;
  zPhase: number; // Phase offset for 3D depth oscillation
}

const MouseParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particleCount = 500;
    const particles: Particle[] = [];
    const minDistance = 120;
    const maxDistance = 460;

    for (let i = 0; i < particleCount; i++) {
      const distance = minDistance + Math.random() * (maxDistance - minDistance);
      const norm = (distance - minDistance) / (maxDistance - minDistance); // 0 to 1
      
      // Bell curve for size: Small at ends, Big in middle
      // sin(0) = 0, sin(PI/2) = 1, sin(PI) = 0
      const sizeBase = 1 + 1 * Math.sin(norm * Math.PI); 
      const size = sizeBase + Math.random(); // Add slight randomness

      // Opacity follows similar curve but maybe keeps some visibility at edges
      const opacity = 0.02 + 0.2 * Math.sin(norm * Math.PI);

      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        targetX: 0,
        targetY: 0,
        vx: 0,
        vy: 0,
        size: size,
        angle: (Math.PI * 2 * i) / particleCount,
        distance: distance,
        speed: 0.01 + Math.random() * 0.03,
        opacity: opacity,
        zPhase: Math.random() * Math.PI * 2, // Random phase for 3D oscillation
      });
    }
    particlesRef.current = particles;

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const mouse = mouseRef.current;

      particlesRef.current.forEach((p) => {
        // Slow rotation
        p.angle += 0.001;
        
        // 3D-like depth oscillation: particles move toward/away from viewer (reduced for neatness)
        const time = Date.now() * 0.0003;
        const zOffset = Math.sin(time + p.zPhase) * 20; // Reduced from 40 to 20px for subtler movement
        const effectiveDistance = p.distance + zOffset;
        
        // Vertical undulation for organic 3D feel (reduced amplitude)
        const verticalWave = Math.sin(time * 0.7 + p.zPhase * 1.3) * 8; // Reduced from 15 to 8px
        
        // Calculate target with 3D effects
        const targetX = mouse.x + Math.cos(p.angle) * effectiveDistance;
        const targetY = mouse.y + Math.sin(p.angle) * effectiveDistance + verticalWave;

        // Physics (Spring-like easing)
        const dx = targetX - p.x;
        const dy = targetY - p.y;
        
        p.vx += dx * p.speed * 0.1;
        p.vy += dy * p.speed * 0.1;
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        // Draw particle with subtle size variation based on simulated depth
        const depthScale = 1 + (zOffset / p.distance) * 0.15; // Reduced from 0.3 to 0.15 for subtler scaling
        const renderSize = p.size * depthScale;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, renderSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(26, 26, 26, ${p.opacity * depthScale})`; 
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ mixBlendMode: 'multiply' }}
    />
  );
};

export default MouseParticles;
