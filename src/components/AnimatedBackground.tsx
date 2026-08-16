import { useEffect, useRef } from 'react';

export const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Floating orbs
    const orbs = [
      { x: 0.2, y: 0.3, radius: 300, color: 'rgba(196, 30, 58, 0.03)', speed: 0.0003 },
      { x: 0.8, y: 0.7, radius: 400, color: 'rgba(0, 150, 255, 0.025)', speed: 0.0002 },
      { x: 0.5, y: 0.5, radius: 350, color: 'rgba(255, 170, 0, 0.02)', speed: 0.00025 },
      { x: 0.3, y: 0.8, radius: 250, color: 'rgba(0, 255, 200, 0.02)', speed: 0.00035 },
    ];

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb, i) => {
        const offsetX = Math.sin(time * orb.speed * 1000 + i) * 50;
        const offsetY = Math.cos(time * orb.speed * 1000 + i * 0.5) * 30;

        const x = orb.x * canvas.width + offsetX;
        const y = orb.y * canvas.height + offsetY;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x, y, orb.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // Horizontal light streaks
      ctx.globalAlpha = 0.02;
      for (let i = 0; i < 3; i++) {
        const y = (Math.sin(time * 0.2 + i * 2) * 0.3 + 0.5) * canvas.height;
        const gradient = ctx.createLinearGradient(0, y - 100, 0, y + 100);
        gradient.addColorStop(0, 'transparent');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, y - 100, canvas.width, 200);
      }
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  );
};
