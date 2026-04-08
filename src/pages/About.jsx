import { useEffect, useRef, useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PageBackground from '../components/animations/PageBackground';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';

/* ─── Brand tokens ─────────────────────────────────────── */
const TEAL    = '#3E8B87';
const TEAL_L  = '#5AA8A3';
const TEAL_LL = '#8DCBC7';
const DARK    = '#0F4C5C';
const MID     = '#2F7C7A';
const MUTED   = '#5AA8A3';

const glass = {
  background: 'rgba(255,255,255,0.62)',
  border: '1px solid rgba(62,139,135,0.14)',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

const glassStrong = {
  background: 'rgba(255,255,255,0.78)',
  border: '1px solid rgba(62,139,135,0.18)',
  backdropFilter: 'blur(18px)',
  WebkitBackdropFilter: 'blur(18px)',
};

/* ─── Data ──────────────────────────────────────────────── */
const teamMembers = [
  {
    name: 'Prof. Dr. Nazar Abbas Saqib',
    role: 'General Chair',
    department: 'Department of Computer Science & IT',
    affiliation: 'NED University of Engineering & Technology',
    expertise: ['AI Research', 'Machine Learning', 'Data Science'],
    initial: 'NS',
  },
  {
    name: 'Dr. Sana Ansari',
    role: 'Program Chair',
    department: 'Department of Computer Science & IT',
    affiliation: 'NED University of Engineering & Technology',
    expertise: ['Cybersecurity', 'Network Systems', 'Cryptography'],
    initial: 'SA',
  },
  {
    name: 'Dr. Asif Mahesar',
    role: 'Technical Program Committee',
    department: 'Department of Computer Science & IT',
    affiliation: 'NED University of Engineering & Technology',
    expertise: ['Quantum Computing', 'Algorithms', 'HPC'],
    initial: 'AM',
  },
  {
    name: 'Dr. Rabeea Jaffari',
    role: 'Publicity Chair',
    department: 'Department of Computer Science & IT',
    affiliation: 'NED University of Engineering & Technology',
    expertise: ['NLP', 'Computer Vision', 'Deep Learning'],
    initial: 'RJ',
  },
  {
    name: 'Dr. Shafaq Moten',
    role: 'Publication Chair',
    department: 'Department of Computer Science & IT',
    affiliation: 'NED University of Engineering & Technology',
    expertise: ['IoT', 'Embedded Systems', 'Edge Computing'],
    initial: 'SM',
  },
  {
    name: 'Dr. Ayesha Siddiqua',
    role: 'Local Arrangements Chair',
    department: 'Department of Computer Science & IT',
    affiliation: 'NED University of Engineering & Technology',
    expertise: ['Blockchain', 'Distributed Systems', 'Cloud'],
    initial: 'AS',
  },
];

const values = [
  {
    iconType: 'research',
    title: 'Research Excellence',
    text: 'We uphold the highest standards of peer review and scholarly rigour, accepting only work that genuinely advances the field.',
  },
  {
    iconType: 'global',
    title: 'Global Collaboration',
    text: 'Connecting researchers across five continents, ICONICS breaks geographic barriers to create truly international dialogue.',
  },
  {
    iconType: 'innovation',
    title: 'Innovation Drive',
    text: 'From AI to quantum computing, we champion breakthroughs that shape the next decade of computing and society.',
  },
  {
    iconType: 'community',
    title: 'Community Building',
    text: 'Beyond papers and talks, ICONICS fosters lasting professional relationships and mentorship across career stages.',
  },
];

const timeline = [
  { year: '1921', label: 'NED Founded', desc: "Pakistan's oldest engineering institution is established in Karachi." },
  { year: '2016', label: 'ICONICS Born', desc: 'Inaugural edition launches with 73 submissions and a 26% acceptance rate.' },
  { year: '2018', label: '2nd Edition', desc: 'Expanded international reach with stronger AI and machine learning tracks.' },
  { year: '2022', label: 'IEEE Indexed', desc: 'First IEEE-published edition with quantum computing and cybersecurity tracks.' },
  { year: '2024', label: '4th Edition', desc: '9 keynote speakers from 5 countries, featuring generative AI and blockchain.' },
  { year: '2026', label: "ICONICS'26", desc: 'The 5th edition — our most ambitious gathering of computing minds yet.', active: true },
];

/* ─── SVG Icons ─────────────────────────────────────────── */
const Icon = ({ type, size = 22, color = TEAL }) => {
  const s = { fill: 'none', stroke: color, strokeWidth: '1.6', strokeLinecap: 'round', strokeLinejoin: 'round' };
  const icons = {
    research: <><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></>,
    global: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></>,
    innovation: <><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></>,
    community: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></>,
    external: <><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" {...s}>{icons[type]}</svg>;
};

/* ─── Particle Canvas ───────────────────────────────────── */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const onMove = (e) => {
      const { clientX: x, clientY: y } = e.touches ? e.touches[0] : e;
      mouseRef.current = { x, y };
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: true });
    const ps = Array.from({ length: 72 }, () => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      r: Math.random() * 2.2 + 0.6, alpha: Math.random() * 0.35 + 0.08,
    }));
    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouseRef.current.x, my = mouseRef.current.y;
      for (const p of ps) {
        const dx = p.x - mx, dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 180) { const f = (180 - dist) / 180; p.vx += (dx / dist) * f * 0.012; p.vy += (dy / dist) * f * 0.012; }
        p.vx *= 0.992; p.vy *= 0.992; p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(62,139,135,${p.alpha})`; ctx.fill();
      }
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x, dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(ps[i].x, ps[i].y); ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(62,139,135,${(1 - d / 120) * 0.18})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', opacity: 0.9 }} />;
};

/* ─── Floating Orbs ─────────────────────────────────────── */
const FloatingOrbs = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    {[
      { w: 560, h: 560, top: '-120px', right: '-100px', delay: 0, dur: 22 },
      { w: 380, h: 380, bottom: '60px', left: '-80px', delay: 3, dur: 18 },
      { w: 260, h: 260, top: '38%', left: '42%', delay: 6, dur: 14 },
      { w: 180, h: 180, top: '20%', right: '25%', delay: 1.5, dur: 25 },
    ].map((o, i) => (
      <motion.div key={i}
        style={{ position: 'absolute', width: o.w, height: o.h, borderRadius: '50%', background: 'radial-gradient(circle, rgba(62,139,135,0.13), transparent 70%)', top: o.top, right: o.right, bottom: o.bottom, left: o.left, filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.1, 1], x: [0, 20, -10, 0], y: [0, -18, 12, 0] }}
        transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: 'easeInOut' }}
      />
    ))}
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(62,139,135,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(62,139,135,0.035) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
  </div>
);

/* ─── Reveal wrapper ────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 28, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    style={style}
  >
    {children}
  </motion.div>
);

/* ─── Accent bar ────────────────────────────────────────── */
const AccentBar = () => (
  <span style={{ display: 'inline-block', width: 3, height: 22, borderRadius: 4, background: `linear-gradient(to bottom, ${TEAL_L}, ${TEAL})`, flexShrink: 0 }} />
);

/* ─── Animated counter ──────────────────────────────────── */
const StatCounter = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isNum = !isNaN(parseInt(value));
  const num = parseInt(value) || 0;
  const suffix = value.replace(/[0-9]/g, '');
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(isNum ? '0' : value);
  useEffect(() => { if (inView && isNum) spring.set(num); }, [inView, isNum, num, spring]);
  useEffect(() => { if (!isNum) return; return spring.on('change', v => setDisplay(Math.round(v).toString())); }, [spring, isNum]);
  return <span ref={ref}>{isNum ? display + suffix : value}</span>;
};

/* ─── Team Card ─────────────────────────────────────────── */
const TeamCard = ({ member, index }) => {
  const colors = [TEAL, DARK, MID, '#1A6B6A', '#0A3D4F', '#2A6E6C'];
  const bg = colors[index % colors.length];
  return (
    <Reveal delay={index * 0.08}>
      <motion.div
        whileHover={{ y: -8, boxShadow: '0 24px 60px rgba(62,139,135,0.15)' }}
        transition={{ duration: 0.28 }}
        style={{ ...glassStrong, borderRadius: 8, overflow: 'hidden', height: '100%', position: 'relative' }}
      >
        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.7, delay: index * 0.1 }}
          style={{ height: 3, background: `linear-gradient(90deg, ${TEAL}, ${TEAL_L})`, transformOrigin: 'left' }}
        />
        <div style={{ padding: '28px 26px 26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
            <motion.div
              whileHover={{ scale: 1.08, rotate: 4 }}
              style={{
                width: 56, height: 56, borderRadius: '50%',
                background: `linear-gradient(135deg, ${bg}, ${bg}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                boxShadow: `0 6px 20px ${bg}44`, border: '2px solid rgba(255,255,255,0.6)',
              }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: 16, fontWeight: 700, color: 'white', letterSpacing: '0.05em' }}>
                {member.initial}
              </span>
            </motion.div>
            <div>
              <div style={{ fontFamily: 'monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: TEAL, marginBottom: 3 }}>
                {member.role}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: DARK, lineHeight: 1.3 }}>
                {member.name}
              </div>
            </div>
          </div>
          <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6, marginBottom: 16, paddingLeft: 2 }}>
            {member.department}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {member.expertise.map((tag, i) => (
              <motion.span key={i} whileHover={{ scale: 1.05 }}
                style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 500, color: TEAL, background: 'rgba(62,139,135,0.08)', border: '1px solid rgba(62,139,135,0.2)', borderRadius: 4, padding: '3px 9px', letterSpacing: '0.06em' }}>
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.15, 1] }}
          transition={{ duration: 5 + index, repeat: Infinity }}
          style={{ position: 'absolute', bottom: -24, right: -24, width: 100, height: 100, borderRadius: '50%', background: 'rgba(62,139,135,0.05)', pointerEvents: 'none' }}
        />
      </motion.div>
    </Reveal>
  );
};

/* ─── Value Card ────────────────────────────────────────── */
const ValueCard = ({ iconType, title, text, index }) => (
  <Reveal delay={index * 0.1}>
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(62,139,135,0.12)' }}
      style={{ ...glass, borderRadius: 8, padding: '32px 28px', height: '100%', position: 'relative', overflow: 'hidden' }}
    >
      <motion.div
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.7, delay: index * 0.12 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${TEAL}, ${TEAL_L})`, transformOrigin: 'left', borderRadius: '8px 8px 0 0' }}
      />
      <motion.div
        animate={{ opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 5 + index, repeat: Infinity }}
        style={{ position: 'absolute', bottom: -20, right: -20, width: 110, height: 110, borderRadius: '50%', background: TEAL, pointerEvents: 'none' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <motion.div whileHover={{ rotate: 12, scale: 1.1 }}
          style={{ width: 44, height: 44, borderRadius: 8, background: 'rgba(62,139,135,0.08)', border: '1px solid rgba(62,139,135,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon type={iconType} />
        </motion.div>
        <AccentBar />
        <h3 style={{ fontSize: 16, fontWeight: 700, color: DARK }}>{title}</h3>
      </div>
      <p style={{ fontSize: 14, lineHeight: 1.8, color: MID, position: 'relative', zIndex: 1 }}>{text}</p>
    </motion.div>
  </Reveal>
);

/* ══ MAIN COMPONENT ═════════════════════════════════════ */
const AboutUs = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  return (
    <PageTransition>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}>

        <ParticleCanvas />
        <FloatingOrbs />
        <PageBackground />

        <div style={{ position: 'relative', zIndex: 1, paddingTop: 96, paddingBottom: 80 }}>
          <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px' }}>

            {/* ══ HERO ══ */}
            <motion.div style={{ y: heroY, opacity: heroOpacity }}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                style={{ textAlign: 'center', paddingBottom: 64, paddingTop: 16 }}
              >

                <SectionHeading title="About Us" subtitle="The people and principles driving ICONICS forward" />

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 32 }}>
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: 1, width: 80, background: `linear-gradient(90deg, transparent, ${TEAL})`, transformOrigin: 'right' }} />
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                      style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL, display: 'inline-block', opacity: 0.4 }} />
                  ))}
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{ height: 1, width: 80, background: `linear-gradient(90deg, ${TEAL}, transparent)`, transformOrigin: 'left' }} />
                </div>
              </motion.div>
            </motion.div>

            {/* ══ EDITORIAL SPLIT ══ */}
            <Reveal delay={0.05} style={{ marginBottom: 56 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(62,139,135,0.15)', boxShadow: '0 8px 48px rgba(15,76,92,0.08)' }}>

                {/* Left — dark */}
                <motion.div whileHover={{ background: '#0D4255' }} transition={{ duration: 0.4 }}
                  style={{ background: DARK, padding: '52px 44px', position: 'relative', overflow: 'hidden' }}>
                  {[{ w: 200, h: 200, top: -60, right: -60, o: 0.1 }, { w: 120, h: 120, bottom: -30, left: 20, o: 0.07 }].map((c, i) => (
                    <motion.div key={i} animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
                      transition={{ duration: 12 + i * 4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ position: 'absolute', width: c.w, height: c.h, borderRadius: '50%', top: c.top, right: c.right, bottom: c.bottom, left: c.left, background: `rgba(90,168,163,${c.o})`, pointerEvents: 'none' }} />
                  ))}
                  <motion.div animate={{ opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 6, repeat: Infinity }}
                    style={{ position: 'absolute', top: 16, right: 20, fontFamily: 'monospace', fontSize: 88, fontWeight: 700, color: 'white', lineHeight: 1, letterSpacing: '-0.05em', pointerEvents: 'none' }}>
                    US
                  </motion.div>
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: TEAL_LL, marginBottom: 22 }}>Who We Are</div>
                    <h2 style={{ fontSize: 26, fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: 20 }}>
                      The Department of<br />Computer Science & IT
                    </h2>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: 16 }}>
                      Rooted in <strong style={{ color: 'rgba(255,255,255,0.95)' }}>NED University of Engineering & Technology</strong>, Pakistan's oldest and most prestigious engineering institution, our department has been at the forefront of computing research since 1976.
                    </p>
                    <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.7)' }}>
                      We bring together faculty, researchers, and students who share a single conviction: that rigorous computer science changes lives.
                    </p>
                  </div>
                </motion.div>

                {/* Right — light */}
                <div style={{ background: 'rgba(247,252,252,0.95)', padding: '52px 44px', display: 'flex', flexDirection: 'column', gap: 28 }}>
                  <div>
                    <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.12em', color: MUTED, marginBottom: 14 }}>Our Role at ICONICS</div>
                    <motion.div whileHover={{ scale: 1.02 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 10, background: 'rgba(62,139,135,0.06)', border: '1px solid rgba(62,139,135,0.22)', borderRadius: 6, padding: '14px 18px' }}>
                      <span style={{ fontSize: 28, lineHeight: 1, color: 'rgba(62,139,135,0.3)', fontFamily: 'Georgia, serif', flexShrink: 0 }}>"</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: DARK, lineHeight: 1.5 }}>
                        Advancing the frontiers of computer science through international collaboration and open scholarly exchange.
                      </span>
                    </motion.div>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: MID }}>
                    As the organising body for ICONICS, our faculty design the programme, chair the technical committees, and ensure every submission receives the rigorous, fair peer review it deserves.
                  </p>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: MID }}>
                    Five editions. Hundreds of papers. Researchers from over 20 countries. This is what we have built — and ICONICS'26 is our most ambitious chapter yet.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* ══ STATS ══ */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 56 }}>
              {[
                { num: '100+', label: 'Faculty Members' },
                { num: '7000', label: 'Active Students' },
                { num: '5',    label: 'ICONICS Editions' },
                { num: '20+',  label: 'Countries Reached' },
              ].map((s, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <motion.div whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(62,139,135,0.14)' }} transition={{ duration: 0.25 }}
                    style={{ ...glass, borderRadius: 8, padding: '28px 20px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <motion.div animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }} transition={{ duration: 4 + i, repeat: Infinity }}
                      style={{ position: 'absolute', bottom: -20, right: -20, width: 90, height: 90, borderRadius: '50%', background: 'rgba(62,139,135,0.06)', pointerEvents: 'none' }} />
                    <div style={{ fontFamily: 'monospace', fontSize: 42, fontWeight: 800, color: TEAL, lineHeight: 1, marginBottom: 8 }}>
                      <StatCounter value={s.num} />
                    </div>
                    <div style={{ fontSize: 11, color: MUTED, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</div>
                  </motion.div>
                </Reveal>
              ))}
            </div>

            {/* ══ VALUES ══ */}
            <section style={{ marginBottom: 64 }}>
              <Reveal style={{ textAlign: 'center', marginBottom: 44 }}>
                <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: TEAL, marginBottom: 12 }}>What We Stand For</div>
                <h3 style={{ fontSize: 28, fontWeight: 700, color: DARK }}>Our Core Values</h3>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                {values.map((v, i) => <ValueCard key={i} {...v} index={i} />)}
              </div>
            </section>

            {/* ══ ORGANISING COMMITTEE ══ */}
            <section style={{ marginBottom: 64 }}>
              <Reveal style={{ textAlign: 'center', marginBottom: 44 }}>
                <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: TEAL, marginBottom: 12 }}>The People Behind ICONICS</div>
                <h3 style={{ fontSize: 28, fontWeight: 700, color: DARK, marginBottom: 14 }}>Organising Committee</h3>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
                  <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ height: 1, width: 50, background: `linear-gradient(90deg, transparent, ${TEAL_L})`, transformOrigin: 'right' }} />
                  <span style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: TEAL }}>NED University · CS&IT</span>
                  <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ height: 1, width: 50, background: `linear-gradient(90deg, ${TEAL_L}, transparent)`, transformOrigin: 'left' }} />
                </div>
              </Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                {teamMembers.map((m, i) => <TeamCard key={i} member={m} index={i} />)}
              </div>
            </section>

            {/* ══ TIMELINE — "Current" badge removed ══ */}
            <section style={{ marginBottom: 64 }}>
              <Reveal style={{ textAlign: 'center', marginBottom: 52 }}>
                <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: TEAL, marginBottom: 12 }}>A Decade in the Making</div>
                <h3 style={{ fontSize: 28, fontWeight: 700, color: DARK }}>Our Journey</h3>
              </Reveal>

              <div style={{ position: 'relative', paddingBottom: 48 }}>
                {/* Track */}
                <motion.div
                  initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: 'absolute', top: 22, left: '8%', right: '8%', height: 2, background: `linear-gradient(90deg, transparent, rgba(62,139,135,0.3) 10%, rgba(90,168,163,0.5) 50%, rgba(62,139,135,0.3) 90%, transparent)`, transformOrigin: 'left' }}
                />

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', alignItems: 'start' }}>
                  {timeline.map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: i % 2 === 0 ? 30 : -30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.65, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: i % 2 === 0 ? 0 : 80 }}
                    >
                      {/* Node */}
                      <motion.div
                        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 260, damping: 20, delay: i * 0.1 + 0.3 }}
                        whileHover={{ scale: 1.25 }}
                        style={{
                          width: 44, height: 44, borderRadius: '50%', marginBottom: 16,
                          background: item.active ? TEAL : DARK,
                          border: '3px solid rgba(238,246,245,1)',
                          boxShadow: item.active
                            ? '0 0 0 3px rgba(62,139,135,0.3), 0 4px 20px rgba(62,139,135,0.4)'
                            : '0 0 0 2px rgba(62,139,135,0.2), 0 4px 14px rgba(15,76,92,0.2)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          position: 'relative', zIndex: 1,
                        }}
                      >
                        {item.active ? (
                          <motion.span animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}
                            style={{ width: 10, height: 10, borderRadius: '50%', background: 'white' }} />
                        ) : (
                          <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>0{i + 1}</span>
                        )}
                      </motion.div>

                      {/* Card — no "Current" badge */}
                      <motion.div whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(62,139,135,0.12)' }}
                        style={{ ...glass, borderRadius: 8, padding: '16px 14px', textAlign: 'center', width: '88%', ...(item.active ? { border: '1px solid rgba(62,139,135,0.3)', background: 'rgba(255,255,255,0.82)' } : {}) }}>
                        <div style={{ fontFamily: 'monospace', fontSize: 15, fontWeight: 800, color: item.active ? TEAL : DARK, marginBottom: 4 }}>{item.year}</div>
                        <div style={{ fontSize: 11, fontWeight: 700, color: DARK, marginBottom: 6 }}>{item.label}</div>
                        <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.6 }}>{item.desc}</div>
                        {/* "Current" badge removed — the teal node and highlighted card already communicate this */}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ══ CTA BANNER — no arrows on buttons ══ */}
            <Reveal>
              <motion.div
                whileHover={{ boxShadow: '0 32px 80px rgba(15,76,92,0.22)' }}
                style={{ background: DARK, borderRadius: 8, padding: '56px 52px', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32 }}
              >
                {[{ w: 320, h: 320, top: -100, right: -80, o: 0.08 }, { w: 180, h: 180, bottom: -40, left: 60, o: 0.06 }].map((c, i) => (
                  <motion.div key={i} animate={{ scale: [1, 1.12, 1], rotate: [0, 12, 0] }}
                    transition={{ duration: 14 + i * 5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', width: c.w, height: c.h, borderRadius: '50%', top: c.top, right: c.right, bottom: c.bottom, left: c.left, background: `rgba(90,168,163,${c.o})`, pointerEvents: 'none' }} />
                ))}
                <motion.div animate={{ opacity: [0.03, 0.07, 0.03] }} transition={{ duration: 7, repeat: Infinity }}
                  style={{ position: 'absolute', bottom: -16, right: 32, fontFamily: 'monospace', fontSize: 120, fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.05em', pointerEvents: 'none' }}>
                  '26
                </motion.div>

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.16em', color: TEAL_LL, marginBottom: 14 }}>Join The Conference</div>
                  <h3 style={{ fontSize: 28, fontWeight: 700, color: 'white', lineHeight: 1.3, marginBottom: 12 }}>Be part of ICONICS'26</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 480, lineHeight: 1.7 }}>
                    Submit your research, attend as a delegate, or partner with us. ICONICS'26 is the stage where tomorrow's computer science begins.
                  </p>
                </div>

                {/* Buttons — no arrows, minimal radius */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flexShrink: 0, position: 'relative', zIndex: 1 }}>
                  {[{ label: 'Submit a Paper', primary: true }, { label: 'Register Now', primary: false }].map(({ label, primary }, i) => (
                    <motion.button key={i} whileHover={{ scale: 1.04, x: 4 }} whileTap={{ scale: 0.97 }}
                      style={{ padding: '12px 24px', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer', border: 'none', background: primary ? TEAL : 'transparent', color: primary ? 'white' : 'rgba(255,255,255,0.7)', outline: primary ? 'none' : '1px solid rgba(255,255,255,0.2)' }}>
                      {label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </Reveal>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default AboutUs;