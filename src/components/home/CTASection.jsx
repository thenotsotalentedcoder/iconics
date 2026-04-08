import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

const TEAL   = '#3E8B87';
const TEAL_L = '#5AA8A3';
const DARK   = '#0F4C5C';

export default function CTASection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="relative overflow-hidden bg-transparent py-14">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ boxShadow: '0 32px 80px rgba(15,76,92,0.22)' }}
          style={{
            background: DARK,
            borderRadius: 8,
            padding: '44px 40px',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
          }}
        >
          {/* Ambient orbs */}
          {[
            { w: 320, h: 320, top: -100, right: -80, o: 0.08 },
            { w: 180, h: 180, bottom: -40, left: 60, o: 0.06 },
          ].map((c, i) => (
            <motion.div key={i}
              animate={{ scale: [1, 1.12, 1], rotate: [0, 12, 0] }}
              transition={{ duration: 14 + i * 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'absolute', width: c.w, height: c.h, borderRadius: '50%', top: c.top, right: c.right, bottom: c.bottom, left: c.left, background: `rgba(90,168,163,${c.o})`, pointerEvents: 'none' }}
            />
          ))}

          {/* Watermark */}
          <motion.div
            animate={{ opacity: [0.03, 0.07, 0.03] }}
            transition={{ duration: 7, repeat: Infinity }}
            style={{ position: 'absolute', bottom: -16, right: 32, fontFamily: 'monospace', fontSize: 120, fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.05em', pointerEvents: 'none' }}
          >
            '26
          </motion.div>

          {/* Left — text */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: TEAL_L, marginBottom: 14 }}>
              Join The Conference
            </div>
            <h3 style={{ fontSize: 28, fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: 12 }}>
              Ready to Submit Your Research?
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 480, lineHeight: 1.7 }}>
              Join 500+ researchers from 20+ countries at iCONICS'26. Present your work and be part of the future of computer science.
            </p>
          </div>

          {/* Right — buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1 }}>
            <motion.a
              href="https://easychair.org/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, x: 4 }}
              whileTap={{ scale: 0.97 }}
              style={{ padding: '12px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', background: TEAL, color: 'white', textDecoration: 'none', textAlign: 'center', display: 'block' }}
            >
              Submit a Paper
            </motion.a>
            <Link to="/registration" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.04, x: 4 }}
                whileTap={{ scale: 0.97 }}
                style={{ padding: '12px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', background: 'transparent', color: 'rgba(255,255,255,0.7)', outline: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}
              >
                Register Now
              </motion.div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}