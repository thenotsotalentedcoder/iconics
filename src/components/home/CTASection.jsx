import { motion, useInView } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TEAL_DEEP = '#083c46'; 
const TEAL_ACCENT = '#3E8B87';
const TEAL_L = '#5AA8A3';

const FloatingParticles = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    
    // Increased particle count for more "detail"
    const pts = Array.from({ length: 40 }, () => ({
      x: Math.random() * c.width, 
      y: Math.random() * c.height,
      vy: -(Math.random() * 0.3 + 0.1), 
      vx: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.5 + 0.5, 
      a: Math.random() * 0.4 + 0.1,
    }));

    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.y < -10) { p.y = c.height + 10; p.x = Math.random() * c.width; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        // Using the light teal for particles
        ctx.fillStyle = `rgba(90,168,163,${p.a})`; 
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

const STATS = [
  { v: '50+',  l: 'Speakers'  },
  { v: '8',    l: 'Tracks'    },
  { v: '2',    l: 'Days'      },
  { v: '500+', l: 'Attendees' },
];

export default function CTASection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent py-24">
      
      {/* BACKGROUND GEOMETRIC OVERLAY */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="ctaGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke={TEAL_L} strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#ctaGrid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0D1F25]/80 backdrop-blur-xl">
          <FloatingParticles />

          {/* Neural Glows */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at 80% 20%, ${TEAL_ACCENT}15 0%, transparent 50%)` }} />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(circle at 20% 80%, ${TEAL_L}10 0%, transparent 50%)` }} />

          <div className="relative z-10 px-8 py-20 lg:px-20 lg:py-24 text-center">
            <motion.span
              className="inline-block text-[10px] font-black tracking-[0.5em] uppercase mb-6 text-[#5AA8A3]"
              initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}>
              // Neural_Join_Sequence
            </motion.span>

            <motion.h2
              className="font-black text-white leading-[0.9] mb-8 max-w-3xl mx-auto uppercase tracking-tighter"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}>
              Ready to Submit <br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Your Research?</span>
            </motion.h2>

            <motion.p
              className="text-sm md:text-base mb-12 max-w-xl mx-auto leading-relaxed text-white/40"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}>
              Join 500+ researchers from 20+ countries at iCONICS 2026. Present your work and be part of the future of computer science.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}>
              
              <a href="https://easychair.org/" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 text-xs font-black uppercase tracking-widest rounded-sm transition-all duration-300 bg-white text-[#0D1F25] hover:bg-[#5AA8A3] hover:text-white">
                Submit Paper
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <Link to="/registration"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 text-white text-xs font-black uppercase tracking-widest rounded-sm border border-white/20 transition-all duration-300 hover:bg-white/5 hover:border-[#5AA8A3]">
                Register Now
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="mt-20 pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto border-t border-white/5"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }}>
              {STATS.map((s, i) => (
                <div key={i} className="text-center group">
                  <div className="font-black text-white mb-1 group-hover:text-[#5AA8A3] transition-colors"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', letterSpacing: '-0.05em' }}>
                    {s.v}
                  </div>
                  <div className="text-[9px] font-black tracking-[0.2em] uppercase text-white/20">
                    {s.l}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}