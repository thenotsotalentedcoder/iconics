import { useEffect, useRef } from 'react';

/**
 * PageBackground
 * Drop-in for every inner page. Renders:
 *   - Interactive neural-network canvas (same as Workshops/Sponsors)
 *   - Soft teal radial gradients for depth
 *
 * Usage:
 *   <div className="relative min-h-screen bg-bg-primary">
 *     <PageBackground />
 *     <div className="relative z-10"> ...page content... </div>
 *   </div>
 */

const TEAL   = '62,139,135';
const TEAL_L = '90,168,163';

export default function PageBackground({ variant = 'light' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let   pts    = [];
    let   raf;

    const mouse = { x: -1000, y: -1000 };
    const COUNT      = 70;
    const CONN       = 140;
    const MOUSE_R    = 150;
    const MAX_SPD    = 0.38;
    const MOUSE_PUSH = 0.025;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class P {
      constructor() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * MAX_SPD;
        this.vy = (Math.random() - 0.5) * MAX_SPD;
        this.r  = Math.random() * 1.6 + 0.6;
        this.a  = Math.random() * 0.22 + 0.10;
      }
      update() {
        const dx = mouse.x - this.x, dy = mouse.y - this.y;
        const d  = Math.hypot(dx, dy) || 1;
        if (d < MOUSE_R) {
          const t = (1 - d / MOUSE_R) ** 1.8;
          this.vx -= (dx / d) * t * MOUSE_PUSH;
          this.vy -= (dy / d) * t * MOUSE_PUSH;
        }
        const spd = Math.hypot(this.vx, this.vy);
        if (spd > MAX_SPD) { this.vx = (this.vx/spd)*MAX_SPD; this.vy = (this.vy/spd)*MAX_SPD; }
        this.x += this.vx; this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
      }
      draw() {
        const d = Math.hypot(this.x - mouse.x, this.y - mouse.y);
        const b = d < MOUSE_R ? (1 - d / MOUSE_R) * 0.3 : 0;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r + b * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${TEAL}, ${this.a + b})`;
        ctx.fill();
      }
    }

    const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('resize',    resize);
    window.addEventListener('mousemove', onMove);
    resize();
    pts = Array.from({ length: COUNT }, () => new P());

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pts.length; i++) {
        pts[i].update();
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.hypot(dx, dy);
          if (d > CONN) continue;
          const t = 1 - d / CONN;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(${TEAL}, ${t * 0.18})`;
          ctx.lineWidth   = t * 0.7 + 0.15;
          ctx.stroke();
        }
        pts[i].draw();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',    resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      {/* Neural canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0, opacity: variant === 'light' ? 0.55 : 0.70 }}
      />

      {/* Teal radial gradients — positional depth */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        {/* Top-left glow */}
        <div className="absolute -top-32 -left-24 w-[500px] h-[500px] rounded-full"
          style={{ background: `radial-gradient(circle, rgba(${TEAL},0.07) 0%, transparent 70%)` }} />
        {/* Bottom-right glow */}
        <div className="absolute -bottom-32 -right-24 w-[600px] h-[600px] rounded-full"
          style={{ background: `radial-gradient(circle, rgba(${TEAL_L},0.05) 0%, transparent 70%)` }} />
        {/* Center accent */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full"
          style={{ background: `radial-gradient(ellipse, rgba(${TEAL},0.04) 0%, transparent 70%)` }} />
      </div>
    </>
  );
}