import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TEAL   = '#3E8B87';
const TEAL_L = '#5AA8A3';

/* ── Sweeping light streams canvas ──────────────────────────────── */
const LightStreams = () => {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf, t = 0;

    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);

    // Each stream: a bezier curve that shifts over time
    const STREAMS = [
      { cy: 0.38, amp: 0.22, freq: 0.55, phase: 0,    spd: 0.28, thick: 42, color: [62,  139, 135], alpha: 0.18 },
      { cy: 0.52, amp: 0.16, freq: 0.65, phase: 1.4,  spd: 0.22, thick: 28, color: [90,  168, 163], alpha: 0.14 },
      { cy: 0.30, amp: 0.28, freq: 0.48, phase: 2.8,  spd: 0.18, thick: 18, color: [40,  110, 108], alpha: 0.10 },
      { cy: 0.62, amp: 0.14, freq: 0.70, phase: 0.9,  spd: 0.33, thick: 22, color: [110, 190, 185], alpha: 0.12 },
      { cy: 0.45, amp: 0.30, freq: 0.40, phase: 3.5,  spd: 0.15, thick: 55, color: [30,   88,  85], alpha: 0.22 },
      { cy: 0.20, amp: 0.18, freq: 0.60, phase: 5.0,  spd: 0.25, thick: 14, color: [140, 210, 205], alpha: 0.09 },
    ];

    const drawStream = (s, W, H) => {
      const phase = t * s.spd + s.phase;
      const y0    = H * s.cy;
      // Control points drift with sine
      const cp1x = W * 0.25, cp1y = y0 + H * s.amp * Math.sin(phase);
      const cp2x = W * 0.70, cp2y = y0 + H * s.amp * Math.sin(phase + 1.6);
      const endY  = y0 + H * s.amp * 0.5 * Math.sin(phase + 3.0);

      // Build gradient along the curve approximation
      const grad = ctx.createLinearGradient(0, 0, W, 0);
      const [r, g, b] = s.color;
      grad.addColorStop(0,    `rgba(${r},${g},${b},0)`);
      grad.addColorStop(0.15, `rgba(${r},${g},${b},${s.alpha * 0.5})`);
      grad.addColorStop(0.4,  `rgba(${r},${g},${b},${s.alpha})`);
      grad.addColorStop(0.6,  `rgba(${r},${g},${b},${s.alpha * 1.2})`);
      grad.addColorStop(0.82, `rgba(${r},${g},${b},${s.alpha * 0.6})`);
      grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, W, endY);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = s.thick;
      ctx.lineCap     = 'round';
      // Soft blur via multiple passes with decreasing width
      ctx.globalAlpha = 1;
      ctx.stroke();

      // Bright core line
      const coreGrad = ctx.createLinearGradient(0, 0, W, 0);
      coreGrad.addColorStop(0,   `rgba(${r+50},${g+50},${b+50},0)`);
      coreGrad.addColorStop(0.3, `rgba(${r+60},${g+60},${b+60},${s.alpha * 0.9})`);
      coreGrad.addColorStop(0.6, `rgba(255,255,255,${s.alpha * 0.35})`);
      coreGrad.addColorStop(1,   `rgba(${r+50},${g+50},${b+50},0)`);
      ctx.beginPath();
      ctx.moveTo(0, y0);
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, W, endY);
      ctx.strokeStyle = coreGrad;
      ctx.lineWidth   = Math.max(1.5, s.thick * 0.08);
      ctx.stroke();
    };

    const loop = () => {
      const W = c.width, H = c.height;
      // Fade trail
      ctx.fillStyle = 'rgba(13, 31, 37, 0.18)';
      ctx.fillRect(0, 0, W, H);

      for (const s of STREAMS) drawStream(s, W, H);

      t  += 0.006;
      raf = requestAnimationFrame(loop);
    };

    // Initial clear
    ctx.fillStyle = 'rgba(13,31,37,1)';
    ctx.fillRect(0, 0, c.width, c.height);
    loop();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 w-full h-full" style={{ display: 'block' }} />;
};

/* ── Stats ───────────────────────────────────────────────────────── */
const STATS = [
  { v: '50+',  l: 'Speakers'  },
  { v: '8',    l: 'Tracks'    },
  { v: '2',    l: 'Days'      },
  { v: '500+', l: 'Attendees' },
];

/* ── Component ───────────────────────────────────────────────────── */
export default function CTASection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: '#EEF3F3', padding: '0 0 5rem' }}>
      <div className="container mx-auto px-6 lg:px-16 pt-16">

        {/* Card */}
        <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: '320px' }}>
          <LightStreams />

          {/* Frosted overlay so text is readable */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(135deg, rgba(13,31,37,0.55) 0%, rgba(13,31,37,0.20) 50%, rgba(13,31,37,0.50) 100%)' }} />

          {/* Glassmorphism content card */}
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 px-8 py-12 lg:px-14 lg:py-14">

            {/* Left: text */}
            <div className="text-center lg:text-left max-w-lg">
              <motion.p className="text-[10px] font-bold tracking-[0.24em] uppercase mb-3"
                style={{ color: 'rgba(90,168,163,0.75)' }}
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}>
                Join Us
              </motion.p>

              <motion.h2 className="font-bold text-white leading-tight mb-3"
                style={{ fontSize: 'clamp(1.7rem, 3.8vw, 2.8rem)', letterSpacing: '-0.03em' }}
                initial={{ opacity: 0, y: 18 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.08 }}>
                Ready to Submit<br />Your Research?
              </motion.h2>

              <motion.p className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.48)' }}
                initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.18 }}>
                Join 500+ researchers from 20+ countries at iCONICS 2026.
              </motion.p>
            </div>

            {/* Right: actions */}
            <motion.div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0"
              initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}>
              <a href="https://easychair.org/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 group whitespace-nowrap"
                style={{ background: 'rgba(255,255,255,0.92)', color: '#122830',
                         boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,0,0,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.92)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)'; }}>
                Submit Paper
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link to="/registration"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-white text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap"
                style={{ background: 'rgba(62,139,135,0.25)', border: '1px solid rgba(90,168,163,0.35)',
                         backdropFilter: 'blur(8px)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(62,139,135,0.40)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(62,139,135,0.25)'; }}>
                Register Now
              </Link>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            className="relative z-10 grid grid-cols-4 divide-x px-8 py-5 lg:px-14"
            style={{ borderTop: '1px solid rgba(255,255,255,0.07)', divideColor: 'rgba(255,255,255,0.07)' }}
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}>
            {STATS.map((s, i) => (
              <motion.div key={i} className="text-center group px-3"
                initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.07 }}>
                <div className="font-bold text-white transition-colors duration-200 group-hover:text-[#5AA8A3]"
                  style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', letterSpacing: '-0.04em' }}>
                  {s.v}
                </div>
                <div className="text-[9px] font-bold tracking-[0.18em] uppercase mt-0.5"
                  style={{ color: 'rgba(255,255,255,0.28)' }}>
                  {s.l}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}