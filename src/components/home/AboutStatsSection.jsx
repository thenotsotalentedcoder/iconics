import { motion, useInView, animate } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const TEAL     = '#3E8B87';
const DARK     = '#0F4C5C';
const MID      = '#2F7C7A';
const MUTED    = '#5AA8A3';

const useCount = (end, go, dur = 1.6) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    const c = animate(0, end, { duration: dur, ease: [0.22, 1, 0.36, 1], onUpdate: n => setV(Math.floor(n)) });
    return c.stop;
  }, [go, end]);
  return v;
};

const Stat = ({ end, suffix, label, sub, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const count  = useCount(end, inView, 1.5 + index * 0.1);

  return (
    <motion.div
      ref={ref}
      className="relative pb-10 last:pb-0"
      /* Changed from PALE to a transparent teal border */
      style={{ borderBottom: `1px solid rgba(62, 139, 135, 0.1)` }}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="font-bold leading-none" style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.04em', color: DARK }}>
          {count}
        </span>
        <span className="font-bold" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3rem)', color: TEAL }}>{suffix}</span>
      </div>
      <p className="font-semibold mb-0.5" style={{ color: DARK }}>{label}</p>
      <p className="text-sm" style={{ color: MUTED }}>{sub}</p>

      {/* Animated underline */}
      <motion.div
        className="absolute bottom-0 left-0 h-px"
        style={{ background: `linear-gradient(90deg, ${TEAL}, transparent)` }}
        initial={{ width: 0 }}
        animate={inView ? { width: '60%' } : {}}
        transition={{ duration: 1, delay: 0.5 + index * 0.14 }}
      />
    </motion.div>
  );
};

export default function AboutStatsSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-transparent" // BG set to transparent
      style={{ padding: '2.5rem 0 3rem' }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left — sticky */}
          <div className="lg:sticky lg:top-28 space-y-6">
            <motion.span
              className="inline-block text-[10px] font-bold tracking-[0.22em] uppercase"
              style={{ color: TEAL }}
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              About The Conference
            </motion.span>

            <motion.h2
              className="font-bold leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', letterSpacing: '-0.035em', color: DARK }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: 0.1 }}
            >
              We're{' '}
              <span className="relative inline-block" style={{ color: TEAL }}>
                iCONICS
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-0.5"
                  style={{ background: `${TEAL}44` }}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.55 }}
                />
              </span>
            </motion.h2>

            <motion.div
              className="space-y-4 leading-relaxed"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.22 }}
            >
              <p style={{ color: MID, fontSize: '1.05rem' }}>
                NED University presents the 5th International Conference on Innovations in Computer Science, bringing together researchers and innovators from around the world.
              </p>
              <p style={{ color: MUTED }}>
                Our platform enables the exchange of cutting-edge ideas in AI, Machine Learning, Quantum Computing, Cybersecurity, and emerging technologies that shape our digital future.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold"
                style={{ color: TEAL }}
              >
                Learn More About ICONICS
                <motion.svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  animate={{ x: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </motion.svg>
              </Link>
            </motion.div>
          </div>

          {/* Right — stats */}
          <div className="space-y-0 lg:pt-14">
            <motion.div
              className="h-px mb-10"
              /* Updated from PALE to a transparent gradient */
              style={{ background: `linear-gradient(90deg, ${TEAL}55, transparent)` }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            />
            {[
              { end: 500, suffix: '+', label: 'Attendees',       sub: 'researchers & practitioners'  },
              { end: 200, suffix: '+', label: 'Submitted Papers', sub: 'peer-reviewed submissions'    },
              { end: 50,  suffix: '+', label: 'Speakers',         sub: 'global keynote experts'       },
            ].map((s, i) => <Stat key={i} {...s} index={i} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
