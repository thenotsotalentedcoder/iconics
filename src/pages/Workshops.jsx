import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PageBackground from '../components/animations/PageBackground';
import { workshops as staticWorkshops } from '../data/workshops';
import { useApiData } from '../hooks/useApiData';
import { api } from '../utils/api';

/* ─── Brand tokens ─────────────────────────────────────── */
const TEAL    = '#3E8B87';
const TEAL_L  = '#5AA8A3';
const TEAL_LL = '#8DCBC7';
const DARK    = '#0F4C5C';
const MID     = '#2F7C7A';
const MUTED   = '#5AA8A3';

/* ─── Reveal ────────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 20, style = {} }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    style={style}
  >
    {children}
  </motion.div>
);

/* ─── Chevron ───────────────────────────────────────────── */
const Chevron = ({ open }) => (
  <motion.svg
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke={TEAL} strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </motion.svg>
);

/* ─── Mono label ────────────────────────────────────────── */
const MonoLabel = ({ children, style = {} }) => (
  <div style={{ fontFamily: 'monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', color: MUTED, ...style }}>
    {children}
  </div>
);

/* ─── Session accordion ─────────────────────────────────── */
const SessionCard = ({ session, index }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      style={{
        background: 'rgba(255,255,255,0.72)',
        border: `1px solid ${open ? 'rgba(62,139,135,0.28)' : 'rgba(62,139,135,0.12)'}`,
        borderRadius: 2,
        backdropFilter: 'blur(8px)',
        overflow: 'hidden',
        transition: 'border-color 0.25s',
      }}
    >
      {/* Accent line when open */}
      <motion.div
        animate={{ scaleX: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ height: 2, background: `linear-gradient(90deg, ${TEAL}, ${TEAL_L})`, transformOrigin: 'left' }}
      />

      <button
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 800, color: open ? TEAL : 'rgba(62,139,135,0.4)', letterSpacing: '0.2em', minWidth: 20 }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: DARK, lineHeight: 1.3 }}>{session.title}</div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{session.instructor.name}</div>
          </div>
        </div>
        <Chevron open={open} />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '0 20px 20px', borderTop: '1px solid rgba(62,139,135,0.1)' }}>
              {/* Instructor strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: 'rgba(62,139,135,0.1)', border: '1px solid rgba(62,139,135,0.2)' }}>
                  <img src={session.instructor.photo} alt={session.instructor.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                    onError={e => { e.target.style.display = 'none'; }} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{session.instructor.name}</div>
                  <div style={{ fontSize: 12, color: MID }}>{session.instructor.title}</div>
                  <div style={{ fontSize: 12, color: TEAL }}>{session.instructor.institution}</div>
                </div>
              </div>

              {/* Topics */}
              <MonoLabel style={{ marginBottom: 10 }}>Topics Covered</MonoLabel>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px' }}>
                {session.topics.map((topic, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12, color: MID, lineHeight: 1.5 }}>
                    <span style={{ marginTop: 5, width: 4, height: 4, borderRadius: '50%', background: TEAL, flexShrink: 0, display: 'block' }} />
                    {topic}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ─── Workshop block ────────────────────────────────────── */
const WorkshopBlock = ({ workshop, index, onRegister }) => (
  <motion.section
    id={`workshop-${workshop.id}`}
    style={{ marginBottom: 48, scrollMarginTop: 140 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
  >
    {/* ── Header ── */}
    <div style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(62,139,135,0.18)', borderRadius: 4, overflow: 'hidden', backdropFilter: 'blur(12px)', boxShadow: '0 2px 20px rgba(15,76,92,0.07)', marginBottom: 12 }}>
      {/* Top bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${TEAL}, ${DARK})` }} />

      <div style={{ padding: '28px 32px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Workshop label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 800, color: TEAL, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                Workshop {String(workshop.id).padStart(2, '0')}
              </span>
              <span style={{ height: 1, width: 32, background: 'rgba(62,139,135,0.25)', display: 'inline-block' }} />
            </div>

            {/* Title */}
            <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 23px)', fontWeight: 800, color: DARK, letterSpacing: '-0.025em', lineHeight: 1.25, marginBottom: 6 }}>
              {workshop.title}
            </h2>

            {/* Tagline */}
            <p style={{ color: TEAL, fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{workshop.tagline}</p>

            {/* Description */}
            <p style={{ color: MID, fontSize: 13.5, lineHeight: 1.75, opacity: 0.9, maxWidth: 600 }}>{workshop.description}</p>

            {/* Target audience */}
            {workshop.targetAudience && (
              <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 8, background: 'rgba(62,139,135,0.05)', border: '1px solid rgba(62,139,135,0.14)', display: 'inline-flex', alignItems: 'flex-start', gap: 10 }}>
                <span style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 700, color: MUTED, letterSpacing: '0.25em', textTransform: 'uppercase', whiteSpace: 'nowrap', paddingTop: 2 }}>For</span>
                <span style={{ fontSize: 13, color: MID }}>{workshop.targetAudience}</span>
              </div>
            )}
          </div>

          {/* Register button */}
          <motion.button
            onClick={onRegister}
            whileHover={{ y: -2, boxShadow: `0 8px 24px ${TEAL}44` }}
            whileTap={{ scale: 0.97 }}
            style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 22px', background: `linear-gradient(135deg, ${TEAL}, ${DARK})`, color: 'white', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: 'pointer', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}
          >
            Register
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.button>
        </div>
      </div>
    </div>

    {/* ── Learning Outcomes ── */}
    {workshop.learningOutcomes && (
      <div style={{ marginBottom: 12 }}>
        <MonoLabel style={{ marginBottom: 10 }}>Learning Outcomes</MonoLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {workshop.learningOutcomes.map((outcome, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '12px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.62)', border: '1px solid rgba(62,139,135,0.12)', backdropFilter: 'blur(6px)' }}>
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, borderRadius: '50%', background: 'rgba(62,139,135,0.12)', color: TEAL, fontSize: 10, fontWeight: 800, fontFamily: 'monospace', flexShrink: 0, marginTop: 1 }}>
                {i + 1}
              </span>
              <p style={{ fontSize: 13, color: MID, lineHeight: 1.6 }}>{outcome}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* ── Sessions ── */}
    <div>
      <MonoLabel style={{ marginBottom: 10 }}>
        {workshop.sessions.length > 1 ? `Sessions · ${workshop.sessions.length} total` : 'Session'}
      </MonoLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {workshop.sessions.map((session, i) => (
          <SessionCard key={session.id} session={session} index={i} />
        ))}
      </div>
    </div>
  </motion.section>
);

/* ══ MAIN ═══════════════════════════════════════════════ */
const Workshops = () => {
  const navigate = useNavigate();
  const { data: workshops } = useApiData(api.getWorkshops, staticWorkshops);
  const [activeId, setActiveId] = useState(null);
  const handleRegister = () => navigate('/registration?type=workshop');

  const scrollTo = (id) => {
    setActiveId(id);
    const el = document.getElementById(`workshop-${id}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageTransition>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)', paddingBottom: 80 }}>
        <PageBackground />

        <div style={{ position: 'relative', zIndex: 1, paddingTop: 96 }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>

            {/* ── Hero ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', paddingBottom: 48, paddingTop: 16 }}
            >
              <SectionHeading title="Workshops" subtitle="Hands-on technical sessions led by world-class researchers" />

              {/* Divider dots */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 28 }}>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ height: 1, width: 60, background: `linear-gradient(90deg, transparent, ${TEAL})`, transformOrigin: 'right' }} />
                {[0, 1, 2].map(i => (
                  <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    style={{ width: 4, height: 4, borderRadius: '50%', background: TEAL, display: 'inline-block' }} />
                ))}
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
                  style={{ height: 1, width: 60, background: `linear-gradient(90deg, ${TEAL}, transparent)`, transformOrigin: 'left' }} />
              </div>
            </motion.div>

            {/* ── Info bar ── */}
            <Reveal style={{ marginBottom: 24 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(62,139,135,0.16)', borderRadius: 10, backdropFilter: 'blur(10px)', overflow: 'hidden' }}>
                {[
                  { path: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', label: 'Date', val: 'October 20-21, 2026' },
                  { path: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Venue', val: 'NED University, Karachi' },
                  { path: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', label: 'Workshops', val: `${workshops.length} Available` },
                ].map(({ path, label, val }, i) => (
                  <div key={label} style={{ flex: '1 1 180px', display: 'flex', alignItems: 'center', gap: 12, padding: '16px 24px', borderRight: i < 2 ? '1px solid rgba(62,139,135,0.1)' : 'none' }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(62,139,135,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={path} /></svg>
                    </div>
                    <div>
                      <MonoLabel style={{ marginBottom: 2 }}>{label}</MonoLabel>
                      <div style={{ fontSize: 13, fontWeight: 700, color: DARK }}>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* ── Sticky nav ── */}
            <div style={{ position: 'sticky', top: 76, zIndex: 30, marginBottom: 32 }}>
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                style={{ display: 'flex', gap: 4, overflowX: 'auto', padding: '6px', scrollbarWidth: 'none', background: 'rgba(238,246,245,0.9)', backdropFilter: 'blur(16px)', borderRadius: 6, border: '1px solid rgba(62,139,135,0.18)', boxShadow: '0 2px 16px rgba(15,76,92,0.08)' }}
              >
                {workshops.map((w) => {
                  const isActive = activeId === w.id;
                  return (
                    <motion.button key={w.id} onClick={() => scrollTo(w.id)}
                      whileHover={{ background: isActive ? undefined : 'rgba(62,139,135,0.08)' }}
                      style={{ flexShrink: 0, padding: '8px 16px', borderRadius: 7, border: 'none', cursor: 'pointer', background: isActive ? `linear-gradient(135deg, ${TEAL}, ${DARK})` : 'transparent', color: isActive ? 'white' : MID, fontSize: 11, fontWeight: 700, fontFamily: 'monospace', letterSpacing: '0.08em', whiteSpace: 'nowrap', transition: 'color 0.2s' }}
                    >
                      WS{String(w.id).padStart(2, '0')} · {w.title.split(':')[0].slice(0, 22)}
                    </motion.button>
                  );
                })}
              </motion.div>
            </div>

            {/* ── Workshop listings ── */}
            {workshops.map((workshop, index) => (
              <WorkshopBlock key={workshop.id} workshop={workshop} index={index} onRegister={handleRegister} />
            ))}

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Workshops;