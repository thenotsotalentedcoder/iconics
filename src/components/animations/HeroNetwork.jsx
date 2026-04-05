import { useEffect, useRef } from 'react';

/**
 * HeroNetwork — quantum particle canvas for the hero section only.
 * Teal palette, slow graceful physics, mouse warps nearby nodes gently.
 */
export default function HeroNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    let   raf;

    const DPR  = Math.min(window.devicePixelRatio, 2);
    const mouse = { x: -9999, y: -9999, lx: -9999, ly: -9999 };

    // ── Tuning ───────────────────────────────────────────────────────
    const CONNECT  = 140;   // connection distance px
    const MOUSE_R  = 170;   // mouse influence radius
    const PULL     = 0.022; // how strongly mouse attracts nodes
    const MAX_SPD  = 0.30;  // maximum drift speed
    const DAMPING  = 0.985; // velocity decay (high = lazy)
    // ─────────────────────────────────────────────────────────────────

    const resize = () => {
      canvas.width  = canvas.offsetWidth  * DPR;
      canvas.height = canvas.offsetHeight * DPR;
      ctx.scale(DPR, DPR);
    };

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    resize();

    /* ── Node ───────────────────────────────────────────────────── */
    class Node {
      constructor() {
        this.x  = Math.random() * canvas.offsetWidth;
        this.y  = Math.random() * canvas.offsetHeight;
        this.vx = (Math.random() - 0.5) * MAX_SPD;
        this.vy = (Math.random() - 0.5) * MAX_SPD;
        this.r  = Math.random() * 1.8 + 0.8;
        this.baseAlpha = Math.random() * 0.35 + 0.15;
        this.pulse  = Math.random() * Math.PI * 2;
        this.pulseS = 0.008 + Math.random() * 0.006;
      }

      update(W, H) {
        this.pulse += this.pulseS;

        // Mouse attraction
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const d  = Math.hypot(dx, dy) || 1;
        if (d < MOUSE_R) {
          const t = (1 - d / MOUSE_R) ** 1.5;
          this.vx += (dx / d) * t * PULL;
          this.vy += (dy / d) * t * PULL;
        }

        // Speed cap + damping
        const spd = Math.hypot(this.vx, this.vy);
        if (spd > MAX_SPD) { this.vx = (this.vx / spd) * MAX_SPD; this.vy = (this.vy / spd) * MAX_SPD; }
        this.vx *= DAMPING;
        this.vy *= DAMPING;
        this.x  += this.vx;
        this.y  += this.vy;

        // Soft wrap
        if (this.x < -20) this.x = W + 20;
        if (this.x > W + 20) this.x = -20;
        if (this.y < -20) this.y = H + 20;
        if (this.y > H + 20) this.y = -20;
      }

      draw(mx, my) {
        const d     = Math.hypot(this.x - mx, this.y - my);
        const prox  = d < MOUSE_R ? (1 - d / MOUSE_R) : 0;
        const pulse = 0.85 + 0.15 * Math.sin(this.pulse);
        const alpha = (this.baseAlpha + prox * 0.5) * pulse;
        const r     = this.r + prox * 2;

        // Outer glow
        if (prox > 0.1) {
          const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 4);
          g.addColorStop(0, `rgba(90, 168, 163, ${prox * 0.3})`);
          g.addColorStop(1, 'rgba(90, 168, 163, 0)');
          ctx.beginPath();
          ctx.arc(this.x, this.y, r * 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(62, 139, 135, ${alpha})`;
        ctx.fill();
      }
    }

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;
    const COUNT = Math.min(90, Math.floor((W() * H()) / 9000));
    const nodes = Array.from({ length: COUNT }, () => new Node());

    /* ── Draw loop ─────────────────────────────────────────────── */
    const loop = () => {
      const w = W(), h = H();

      // Smooth mouse lerp
      mouse.lx += (mouse.x - mouse.lx) * 0.05;
      mouse.ly += (mouse.y - mouse.ly) * 0.05;

      ctx.clearRect(0, 0, w, h);

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].update(w, h);
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.hypot(dx, dy);
          if (d > CONNECT) continue;

          const t   = 1 - d / CONNECT;
          const mx  = (nodes[i].x + nodes[j].x) * 0.5;
          const my  = (nodes[i].y + nodes[j].y) * 0.5;
          const dm  = Math.hypot(mx - mouse.lx, my - mouse.ly);
          const mb  = dm < MOUSE_R ? (1 - dm / MOUSE_R) * 0.22 : 0;
          const a   = t * 0.28 + mb;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(62, 139, 135, ${a})`;
          ctx.lineWidth   = t * 0.9 + 0.2;
          ctx.stroke();
        }
      }

      // Nodes on top
      for (const n of nodes) n.draw(mouse.lx, mouse.ly);

      raf = requestAnimationFrame(loop);
    };

    mouse.lx = mouse.x; mouse.ly = mouse.y;
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block', pointerEvents: 'none' }}
    />
  );
}