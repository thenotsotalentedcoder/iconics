import { useEffect, useRef } from 'react';

/* ══════════════════════════════════════════════════════════════════
   PARTICLE NETWORK  —  much more visible, interactive, dramatic
══════════════════════════════════════════════════════════════════ */
export function ParticleNetwork() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx    = canvas.getContext('2d');
    let   raf;

    const DPR      = Math.min(window.devicePixelRatio, 2);
    const mouse    = { x: -9999, y: -9999, lx: -9999, ly: -9999, clicked: false };
    const CONN     = 160;
    const MOUSE_R  = 180;
    const MAX_SPD  = 0.28;
    const DAMPING  = 0.986;
    const PULL     = 0.022;
    const REPEL_R  = 90;   // on click: repel nearby nodes

    const resize = () => {
      canvas.width  = window.innerWidth  * DPR;
      canvas.height = window.innerHeight * DPR;
      ctx.scale(DPR, DPR);
    };
    window.addEventListener('resize', resize);

    const onMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onClick = (e) => {
      mouse.x = e.clientX; mouse.y = e.clientY;
      mouse.clicked = true;
      setTimeout(() => { mouse.clicked = false; }, 350);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click',     onClick);
    resize();

    class P {
      constructor() {
        this.x    = Math.random() * window.innerWidth;
        this.y    = Math.random() * window.innerHeight;
        this.vx   = (Math.random() - 0.5) * MAX_SPD;
        this.vy   = (Math.random() - 0.5) * MAX_SPD;
        this.r    = Math.random() * 1.8 + 0.8;
        this.base = Math.random() * 0.28 + 0.14;   // higher base alpha = visible
        this.pulse     = Math.random() * Math.PI * 2;
        this.pulseSpd  = 0.008 + Math.random() * 0.008;
      }

      update(W, H) {
        this.pulse += this.pulseSpd;

        const dx = mouse.lx - this.x, dy = mouse.ly - this.y;
        const d  = Math.hypot(dx, dy) || 1;

        // Attract toward cursor
        if (d < MOUSE_R) {
          const t = (1 - d / MOUSE_R) ** 1.6;
          this.vx += (dx / d) * t * PULL;
          this.vy += (dy / d) * t * PULL;
        }

        // Click repel burst
        if (mouse.clicked && d < REPEL_R) {
          const f = (1 - d / REPEL_R) * 3.5;
          this.vx -= (dx / d) * f;
          this.vy -= (dy / d) * f;
        }

        const spd = Math.hypot(this.vx, this.vy);
        if (spd > MAX_SPD * 4) {
          this.vx = (this.vx / spd) * MAX_SPD * 4;
          this.vy = (this.vy / spd) * MAX_SPD * 4;
        }
        this.vx *= DAMPING; this.vy *= DAMPING;
        this.x += this.vx;  this.y += this.vy;

        if (this.x < -20) this.x = W + 20; else if (this.x > W + 20) this.x = -20;
        if (this.y < -20) this.y = H + 20; else if (this.y > H + 20) this.y = -20;
      }

      draw(mx, my) {
        const d     = Math.hypot(this.x - mx, this.y - my);
        const prox  = d < MOUSE_R ? (1 - d / MOUSE_R) : 0;
        const pulse = 0.82 + 0.18 * Math.sin(this.pulse);
        const alpha = (this.base + prox * 0.55) * pulse;
        const r     = this.r + prox * 2.2;

        // Soft glow around close nodes
        if (prox > 0.15) {
          const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 5);
          g.addColorStop(0, `rgba(90,168,163,${prox * 0.22})`);
          g.addColorStop(1, 'rgba(90,168,163,0)');
          ctx.beginPath();
          ctx.arc(this.x, this.y, r * 5, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(62,139,135,${alpha})`;
        ctx.fill();
      }
    }

    const COUNT = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 11000));
    const pts   = Array.from({ length: COUNT }, () => new P());

    const loop = () => {
      const W = window.innerWidth, H = window.innerHeight;
      mouse.lx += (mouse.x - mouse.lx) * 0.055;
      mouse.ly += (mouse.y - mouse.ly) * 0.055;

      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < pts.length; i++) {
        pts[i].update(W, H);
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d  = Math.hypot(dx, dy);
          if (d > CONN) continue;

          const t   = 1 - d / CONN;
          const mx  = (pts[i].x + pts[j].x) * 0.5;
          const my2 = (pts[i].y + pts[j].y) * 0.5;
          const dm  = Math.hypot(mx - mouse.lx, my2 - mouse.ly);
          const mb  = dm < MOUSE_R ? (1 - dm / MOUSE_R) * 0.28 : 0;
          const a   = t * 0.20 + mb;

          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(62,139,135,${a})`;
          ctx.lineWidth   = t * 0.9 + 0.25;
          ctx.stroke();
        }
      }
      for (const p of pts) p.draw(mouse.lx, mouse.ly);
      raf = requestAnimationFrame(loop);
    };

    mouse.lx = mouse.x; mouse.ly = mouse.y;
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMove);
      window.removeEventListener('click',      onClick);
    };
  }, []);

  return (
    <canvas ref={ref} style={{
      position: 'fixed', inset: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0, opacity: 1,
    }} />
  );
}

/* ══════════════════════════════════════════════════════════════════
   WAVE RIBBON  —  thicker, more texture, more dynamic movement
══════════════════════════════════════════════════════════════════ */
export function WaveRibbon() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx    = canvas.getContext('2d');
    let   raf, t = 0;

    const DPR   = Math.min(window.devicePixelRatio, 2);
    const W_CSS = 220;   // wider strip

    const resize = () => {
      canvas.width  = W_CSS * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(DPR, DPR);
    };
    window.addEventListener('resize', resize);
    resize();

    /* Ribbons: thicker, layered, secondary frequency for texture */
    const RIBBONS = [
      {
        cx: 80, amp: 42, thick: 48, freq: 0.0048, freq2: 0.018, phase: 0, phase2: 0.8, spd: 0.20, spd2: 0.55,
        hi:  'rgba(200, 238, 236, 0.90)',
        mid: 'rgba(62,  139, 135, 0.65)',
        lo:  'rgba(28,   58,  68, 0.28)',
        shadow: 'rgba(15,35,45,0.18)',
      },
      {
        cx: 108, amp: 32, thick: 32, freq: 0.0058, freq2: 0.022, phase: 2.0, phase2: 1.5, spd: 0.15, spd2: 0.48,
        hi:  'rgba(175, 225, 222, 0.65)',
        mid: 'rgba(45,  110, 106, 0.45)',
        lo:  'rgba(18,   42,  52, 0.18)',
        shadow: 'rgba(12,28,36,0.12)',
      },
      {
        cx: 50, amp: 26, thick: 20, freq: 0.0066, freq2: 0.026, phase: 4.2, phase2: 2.4, spd: 0.12, spd2: 0.40,
        hi:  'rgba(150, 215, 212, 0.42)',
        mid: 'rgba(35,   95,  92, 0.28)',
        lo:  'rgba(14,   30,  38, 0.12)',
        shadow: 'rgba(10,22,28,0.08)',
      },
    ];

    const drawRibbon = (rb, H) => {
      const phase  = t * rb.spd  + rb.phase;
      const phase2 = t * rb.spd2 + rb.phase2;
      const step   = 3;
      const top = [], bot = [];

      for (let y = -step; y <= H + step; y += step) {
        // Primary wave + secondary ripple for texture
        const w = rb.amp * Math.sin(y * rb.freq + phase)
                + rb.amp * 0.22 * Math.sin(y * rb.freq2 + phase2);
        top.push({ x: rb.cx + w,              y });
        bot.push({ x: rb.cx + w + rb.thick,   y });
      }

      // ── Drop shadow ──
      ctx.beginPath();
      top.forEach((p, i) => i === 0 ? ctx.moveTo(p.x + 6, p.y + 3) : ctx.lineTo(p.x + 6, p.y + 3));
      for (let i = bot.length - 1; i >= 0; i--) ctx.lineTo(bot[i].x + 6, bot[i].y + 3);
      ctx.closePath();
      ctx.fillStyle = rb.shadow;
      ctx.fill();

      // ── Body ──
      ctx.beginPath();
      top.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
      for (let i = bot.length - 1; i >= 0; i--) ctx.lineTo(bot[i].x, bot[i].y);
      ctx.closePath();

      const xL = rb.cx - rb.amp - 8, xR = rb.cx + rb.amp + rb.thick + 8;
      const g  = ctx.createLinearGradient(xL, 0, xR, 0);
      g.addColorStop(0,    rb.lo);
      g.addColorStop(0.18, rb.mid);
      g.addColorStop(0.44, rb.hi);
      g.addColorStop(0.58, rb.hi);   // wider highlight plateau
      g.addColorStop(0.80, rb.mid);
      g.addColorStop(1,    rb.lo);
      ctx.fillStyle = g;
      ctx.fill();

      // ── Bright specular streak ──
      ctx.beginPath();
      top.forEach((p, i) => i === 0 ? ctx.moveTo(p.x + 3, p.y) : ctx.lineTo(p.x + 3, p.y));
      ctx.strokeStyle = rb.hi;
      ctx.lineWidth   = 2.0;
      ctx.stroke();

      // ── Second thinner edge on the far side ──
      ctx.beginPath();
      bot.forEach((p, i) => i === 0 ? ctx.moveTo(p.x - 2, p.y) : ctx.lineTo(p.x - 2, p.y));
      ctx.strokeStyle = rb.mid;
      ctx.lineWidth   = 1.0;
      ctx.globalAlpha = 0.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      const H = canvas.height / DPR;
      ctx.clearRect(0, 0, W_CSS, H);

      for (const rb of RIBBONS) drawRibbon(rb, H);

      // Right-edge page-color fade
      const fade = ctx.createLinearGradient(W_CSS * 0.45, 0, W_CSS, 0);
      fade.addColorStop(0, 'rgba(250,251,251,0)');
      fade.addColorStop(1, 'rgba(250,251,251,1)');
      ctx.fillStyle = fade;
      ctx.fillRect(0, 0, W_CSS, H);

      t  += 0.013;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <canvas ref={ref} style={{
      position: 'fixed', top: 0, left: 0, width: `${220}px`,
      pointerEvents: 'none', zIndex: 1, opacity: 0.80,
    }} />
  );
}

/* Default export */
export default function GlobalCanvasLayers() {
  return (
    <>
      <ParticleNetwork />
      <WaveRibbon />
    </>
  );
}