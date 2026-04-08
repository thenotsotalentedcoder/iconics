import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { NAV_LINKS } from '../../utils/constants';
import { EXTERNAL_LINKS } from '../../utils/constants';

const TEAL   = '#3E8B87';
const TEAL_L = '#5AA8A3';
const BG     = '#122830';

/* ── Icons ──────────────────────────────────────────────────────── */
const Phone = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);

/* ── Animated canvas backdrop ───────────────────────────────────── */
const FooterCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext('2d');
    let raf, t = 0;
    const resize = () => { c.width = c.offsetWidth; c.height = c.offsetHeight; };
    resize();
    window.addEventListener('resize', resize);
    const loop = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (let i = 0; i < 5; i++) {
        const y = c.height * (0.1 + i * 0.2);
        const amp = 12 + i * 4;
        const freq = 0.004 + i * 0.001;
        const phase = t * (0.15 + i * 0.04) + i * 1.2;
        ctx.beginPath();
        for (let x = 0; x <= c.width; x += 3) {
          const py = y + amp * Math.sin(x * freq + phase);
          x === 0 ? ctx.moveTo(x, py) : ctx.lineTo(x, py);
        }
        ctx.strokeStyle = `rgba(62,139,135,${0.04 + i * 0.015})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      t += 0.008;
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ── Footer link ────────────────────────────────────────────────── */
const FLink = ({ to, children, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.li ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}>
      <Link
        to={to}
        className="text-sm flex items-center gap-2 transition-all duration-200 group"
        style={{ color: 'rgba(255,255,255,0.38)' }}
        onMouseEnter={e => { e.currentTarget.style.color = TEAL_L; }}
        onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.38)'; }}
      >
        <span className="w-0 h-px group-hover:w-3 transition-all duration-300 flex-shrink-0"
          style={{ background: TEAL_L }} />
        {children}
      </Link>
    </motion.li>
  );
};

/* ── Footer ─────────────────────────────────────────────────────── */
export default function Footer() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <footer ref={ref} className="relative overflow-hidden" style={{ background: BG }}>
      <FooterCanvas />

      {/* Animated gradient top border */}
      <div className="absolute top-0 left-0 right-0 h-px">
        <motion.div
          className="h-full"
          style={{ background: `linear-gradient(90deg, transparent, ${TEAL}, ${TEAL_L}, ${TEAL}, transparent)` }}
          animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(62,139,135,0.07) 0%, transparent 70%)' }} />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16">

          {/* Brand column */}
          <motion.div className="lg:col-span-1 space-y-5"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>

            <Link to="/" className="flex items-center gap-0.5 group w-fit">
              <motion.span style={{ color: TEAL, fontSize: '1.4rem', fontWeight: 800 }}
                whileHover={{ scale: 1.15, rotate: -3 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                i
              </motion.span>
              <span style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, letterSpacing: '-0.02em' }}>CONICS</span>
              <span style={{ color: TEAL, fontSize: '1.15rem', fontWeight: 700, marginLeft: '3px' }}>'26</span>
            </Link>

            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.35)' }}>
              International Conference on Innovations in Computer Science at NED University, Karachi.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}>
            <h4 className="text-sm font-bold tracking-[0.15em] uppercase mb-6" style={{ color: TEAL_L }}>
              Quick Links
            </h4>
            <ul className="space-y-3.5">
              {NAV_LINKS.slice(0, 5).map((l, i) => (
                <FLink key={l.path} to={l.path} delay={i * 0.04}>{l.name}</FLink>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}>
            <h4 className="text-sm font-bold tracking-[0.15em] uppercase mb-6" style={{ color: TEAL_L }}>
              Resources
            </h4>
            <ul className="space-y-3.5">
              {NAV_LINKS.slice(5).map((l, i) => (
                <FLink key={l.path} to={l.path} delay={i * 0.04}>{l.name}</FLink>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}>
            <h4 className="text-sm font-bold tracking-[0.15em] uppercase mb-6" style={{ color: TEAL_L }}>
              Contact
            </h4>
            <div className="space-y-4">
              <motion.a
                href={EXTERNAL_LINKS.PHONE}
                className="flex items-center gap-3 group transition-all duration-200"
                style={{ color: 'rgba(255,255,255,0.38)' }}
                whileHover={{ x: 3 }}
                onHoverStart={e => { e.target.style.color = TEAL_L; }}
                onHoverEnd={e => { e.target.style.color = 'rgba(255,255,255,0.38)'; }}
              >
                <div className="w-8 h-8 flex items-center justify-center flex-shrink-0 transition-all duration-200"
                  style={{ background: 'rgba(62,139,135,0.10)', border: '1px solid rgba(62,139,135,0.18)', borderRadius: '6px' }}>
                  <Phone />
                </div>
                <span className="text-sm">(+92-21) 99261261</span>
              </motion.a>
            </div>

            <div className="mt-6 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.22)' }}>
              <p>University Road, Karachi</p>
              <p>Sindh, Pakistan</p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="relative h-px mb-8" style={{ background: 'rgba(62,139,135,0.14)' }}>
          <motion.div
            className="absolute top-0 h-full w-32"
            style={{ background: `linear-gradient(90deg, transparent, ${TEAL}60, transparent)` }}
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 iCONICS. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            NED University of Engineering &amp; Technology
          </p>
        </motion.div>
      </div>
    </footer>
  );
}