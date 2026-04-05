import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { NAV_LINKS, EXTERNAL_LINKS } from '../../utils/constants';

const TEAL   = '#3E8B87';
const TEAL_L = '#5AA8A3';
const BG     = '#122830';
const BG2    = '#0D1F28';

/* ── Icons ──────────────────────────────────────────────────────── */
const Email = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const Phone = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const FB = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);
const TW = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);
const LI = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

/* ── Animated canvas backdrop inside footer ─────────────────────── */
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
      // Slow drifting horizontal wave lines
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

/* ── Glowing social button ──────────────────────────────────────── */
const SocialBtn = ({ href, label, Icon }) => (
  <motion.a
    href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
    style={{
      background: 'rgba(62,139,135,0.08)',
      border: '1px solid rgba(62,139,135,0.18)',
      color: 'rgba(90,168,163,0.7)',
    }}
    whileHover={{ scale: 1.12, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onHoverStart={e => {
      e.target.style.background = 'rgba(62,139,135,0.20)';
      e.target.style.borderColor = 'rgba(62,139,135,0.45)';
      e.target.style.color = '#5AA8A3';
      e.target.style.boxShadow = '0 0 16px rgba(62,139,135,0.25)';
    }}
    onHoverEnd={e => {
      e.target.style.background = 'rgba(62,139,135,0.08)';
      e.target.style.borderColor = 'rgba(62,139,135,0.18)';
      e.target.style.color = 'rgba(90,168,163,0.7)';
      e.target.style.boxShadow = 'none';
    }}
  >
    <Icon />
  </motion.a>
);

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

      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20 relative z-10">

        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

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

            {/* Social icons */}
            <div className="flex gap-2.5 pt-1">
              <SocialBtn href={EXTERNAL_LINKS.FACEBOOK} label="Facebook" Icon={FB} />
              <SocialBtn href={EXTERNAL_LINKS.TWITTER}  label="Twitter"  Icon={TW} />
              <SocialBtn href={EXTERNAL_LINKS.LINKEDIN} label="LinkedIn" Icon={LI} />
            </div>

            {/* IEEE badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold"
              style={{ background: 'rgba(62,139,135,0.10)', border: '1px solid rgba(62,139,135,0.20)',
                       color: TEAL_L }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: TEAL_L }} />
              IEEE Xplore Indexed
            </div>
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
              {[
                { href: EXTERNAL_LINKS.EMAIL, Icon: Email, text: 'secretary@nediconics.com' },
                { href: EXTERNAL_LINKS.PHONE, Icon: Phone, text: '(+92-21) 99261261'         },
              ].map(({ href, Icon, text }) => (
                <motion.a key={text} href={href}
                  className="flex items-center gap-3 group transition-all duration-200"
                  style={{ color: 'rgba(255,255,255,0.38)' }}
                  whileHover={{ x: 3 }}
                  onHoverStart={e => { e.target.style.color = TEAL_L; }}
                  onHoverEnd={e => { e.target.style.color = 'rgba(255,255,255,0.38)'; }}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200"
                    style={{ background: 'rgba(62,139,135,0.10)', border: '1px solid rgba(62,139,135,0.18)' }}>
                    <Icon />
                  </div>
                  <span className="text-sm">{text}</span>
                </motion.a>
              ))}
            </div>

            {/* Location */}
            <div className="mt-6 text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.22)' }}>
              <p>University Road, Karachi</p>
              <p>Sindh, Pakistan</p>
            </div>
          </motion.div>
        </div>

        {/* ── Divider line with glow ── */}
        <div className="relative h-px mb-8" style={{ background: 'rgba(62,139,135,0.14)' }}>
          <motion.div
            className="absolute top-0 h-full w-32"
            style={{ background: `linear-gradient(90deg, transparent, ${TEAL}60, transparent)` }}
            animate={{ left: ['-10%', '110%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}>

          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            © 2026 iCONICS. All rights reserved.
          </p>

          {/* Center: edition pills */}
          <div className="flex items-center gap-2">
            {['5th Edition', 'Oct 10–11', 'NED UET'].map((t, i) => (
              <span key={i} className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                style={{ background: 'rgba(62,139,135,0.10)', border: '1px solid rgba(62,139,135,0.18)',
                         color: 'rgba(90,168,163,0.65)' }}>
                {t}
              </span>
            ))}
          </div>

          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
            NED University of Engineering &amp; Technology
          </p>
        </motion.div>
      </div>
    </footer>
  );
}