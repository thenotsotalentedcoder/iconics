import { useState, useRef } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import Timeline from '../components/common/Timeline';
import PageBackground from '../components/animations/PageBackground';
import { tracks as staticTracks } from '../data/tracks';
import { importantDates as staticDates } from '../data/dates';
import { useApiData } from '../hooks/useApiData';
import { api } from '../utils/api';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { EXTERNAL_LINKS } from '../utils/constants';

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

const FloatingOrbs = () => (
  <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
    {[
      { w: 500, h: 500, top: '-100px', right: '-80px', delay: 0,   dur: 22 },
      { w: 340, h: 340, bottom: '80px', left: '-60px', delay: 3,   dur: 18 },
      { w: 220, h: 220, top: '40%',    left: '45%',   delay: 6,   dur: 14 },
    ].map((o, i) => (
      <motion.div key={i}
        style={{ position: 'absolute', width: o.w, height: o.h, borderRadius: '50%', background: 'radial-gradient(circle, rgba(62,139,135,0.11), transparent 70%)', top: o.top, right: o.right, bottom: o.bottom, left: o.left, filter: 'blur(40px)' }}
        animate={{ scale: [1, 1.1, 1], x: [0, 18, -10, 0], y: [0, -16, 10, 0] }}
        transition={{ duration: o.dur, delay: o.delay, repeat: Infinity, ease: 'easeInOut' }}
      />
    ))}
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(62,139,135,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(62,139,135,0.03) 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
  </div>
);

const AccentBar = () => (
  <span style={{ display: 'inline-block', width: 3, height: 20, borderRadius: 4, background: `linear-gradient(to bottom, ${TEAL_L}, ${TEAL})`, flexShrink: 0 }} />
);

const SectionLabel = ({ children }) => (
  <div style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: TEAL, marginBottom: 12 }}>
    {children}
  </div>
);

const ChevronIcon = ({ open }) => (
  <motion.svg
    animate={{ rotate: open ? 180 : 0 }}
    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke={TEAL} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </motion.svg>
);

const icons = {
  format:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>,
  length:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  system:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  review:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  notify:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
};

const guidelines = [
  { icon: icons.format,  label: 'Format',           value: 'IEEE Conference format (template provided)' },
  { icon: icons.length,  label: 'Length',            value: 'Full papers (6–8 pages) · Short papers (4 pages)' },
  { icon: icons.system,  label: 'Submission System', value: 'EasyChair' },
  { icon: icons.review,  label: 'Review Process',    value: 'Double-blind peer review by international experts' },
  { icon: icons.notify,  label: 'Notification',      value: 'Authors notified via email upon decision' },
];

const paperTypes = [
  { type: 'Full Paper',  pages: '6–8 pages', desc: 'Complete research with results and analysis', color: TEAL },
  { type: 'Short Paper', pages: '4 pages',   desc: 'Work-in-progress or preliminary findings',    color: DARK },
  { type: 'Poster',      pages: 'A1 format', desc: 'Visual presentation of research concept',     color: MID  },
];

const CallForPapers = () => {
  const [openTrack, setOpenTrack] = useState(null);
  const [hoveredGuideline, setHoveredGuideline] = useState(null);
  const { data: tracks } = useApiData(api.getTracks, staticTracks);
  const { data: importantDates } = useApiData(api.getDates, staticDates);

  return (
    <PageTransition>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}>
        <FloatingOrbs />
        <PageBackground />

        <div style={{ position: 'relative', zIndex: 1, paddingTop: 96, paddingBottom: 80 }}>
          <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 24px' }}>

            {/* HERO */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ textAlign: 'center', paddingBottom: 64, paddingTop: 16 }}
            >
              <SectionHeading title="Call for Papers" subtitle="Submit your research to ICONICS'26" />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 32 }}>
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ height: 1, width: 80, background: `linear-gradient(90deg, transparent, ${TEAL})`, transformOrigin: 'right' }} />
                {[0, 1, 2].map(i => (
                  <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL, display: 'inline-block' }} />
                ))}
                <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
                  style={{ height: 1, width: 80, background: `linear-gradient(90deg, ${TEAL}, transparent)`, transformOrigin: 'left' }} />
              </div>
            </motion.div>

            {/* OVERVIEW SPLIT */}
            <Reveal style={{ marginBottom: 56 }}>
              {/* radius: 8px to match workshop reference */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(62,139,135,0.15)', boxShadow: '0 8px 48px rgba(15,76,92,0.08)' }}>

                {/* Left dark */}
                <motion.div whileHover={{ background: '#0D4255' }} transition={{ duration: 0.4 }}
                  style={{ background: DARK, padding: '48px 40px', position: 'relative', overflow: 'hidden' }}>
                  {[{ w:180, h:180, top:-50, right:-50, o:0.1 }, { w:100, h:100, bottom:-20, left:20, o:0.07 }].map((c, i) => (
                    <motion.div key={i} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 12+i*4, repeat: Infinity }}
                      style={{ position:'absolute', width:c.w, height:c.h, borderRadius:'50%', top:c.top, right:c.right, bottom:c.bottom, left:c.left, background:`rgba(90,168,163,${c.o})`, pointerEvents:'none' }} />
                  ))}
                  <motion.div animate={{ opacity: [0.04, 0.08, 0.04] }} transition={{ duration: 6, repeat: Infinity }}
                    style={{ position:'absolute', top:12, right:18, fontFamily:'monospace', fontSize:72, fontWeight:700, color:'white', lineHeight:1, letterSpacing:'-0.04em', pointerEvents:'none' }}>
                    CFP
                  </motion.div>
                  <div style={{ position:'relative', zIndex:1 }}>
                    <div style={{ fontFamily:'monospace', fontSize:10, textTransform:'uppercase', letterSpacing:'0.14em', color:TEAL_LL, marginBottom:20 }}>Conference Overview</div>
                    <h2 style={{ fontSize:24, fontWeight:700, color:'white', lineHeight:1.3, marginBottom:18 }}>Original research.<br />Global impact.</h2>
                    <p style={{ fontSize:14, lineHeight:1.8, color:'rgba(255,255,255,0.7)', marginBottom:14 }}>
                      ICONICS'26 invites original contributions addressing theoretical, experimental, and applied aspects of computer science and related fields.
                    </p>
                    <p style={{ fontSize:14, lineHeight:1.8, color:'rgba(255,255,255,0.7)' }}>
                      Accepted papers are published in <strong style={{ color:'rgba(255,255,255,0.95)' }}>IEEE Conference Proceedings</strong> (subject to approval).
                    </p>
                  </div>
                </motion.div>

                {/* Right — paper types — removed double-blind capsule */}
                <div style={{ background:'rgba(247,252,252,0.95)', padding:'48px 40px', display:'flex', flexDirection:'column', gap:16 }}>
                  <div style={{ fontFamily:'monospace', fontSize:10, textTransform:'uppercase', letterSpacing:'0.12em', color:MUTED, marginBottom:6 }}>Paper Types Accepted</div>
                  {paperTypes.map((pt, i) => (
                    <motion.div key={i}
                      initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
                      transition={{ duration:0.5, delay:i*0.1+0.2 }}
                      whileHover={{ x:6 }}
                      style={{ display:'flex', alignItems:'center', gap:14, padding:'14px 16px', borderRadius:6, background:'rgba(62,139,135,0.05)', border:'1px solid rgba(62,139,135,0.12)' }}
                    >
                      <div style={{ width:40, height:40, borderRadius:6, background:pt.color, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                        <span style={{ fontFamily:'monospace', fontSize:9, fontWeight:700, color:'white', textAlign:'center', lineHeight:1.2 }}>
                          {pt.pages}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize:13, fontWeight:700, color:DARK, marginBottom:2 }}>{pt.type}</div>
                        <div style={{ fontSize:12, color:MUTED }}>{pt.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                  {/* Double-blind capsule removed */}
                </div>
              </div>
            </Reveal>

            {/* RESEARCH TRACKS */}
            <section style={{ marginBottom: 56 }}>
              <Reveal style={{ marginBottom: 32 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <AccentBar />
                  <div>
                    <SectionLabel>Areas of Interest</SectionLabel>
                    <h3 style={{ fontSize:26, fontWeight:700, color:DARK, lineHeight:1.2 }}>Research Tracks</h3>
                  </div>
                </div>
              </Reveal>

              <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
                {tracks.map((track, i) => {
                  const isOpen = openTrack === track.id;
                  return (
                    <Reveal key={track.id} delay={i * 0.05}>
                      <motion.div
                        whileHover={{ boxShadow: isOpen ? '0 12px 40px rgba(62,139,135,0.14)' : '0 6px 24px rgba(62,139,135,0.08)' }}
                        style={{
                          ...glassStrong,
                          borderRadius: 6,
                          overflow:'hidden',
                          ...(isOpen ? { border:'1px solid rgba(62,139,135,0.28)', boxShadow:'0 12px 40px rgba(62,139,135,0.12)' } : {}),
                        }}
                      >
                        <motion.div
                          animate={{ scaleX: isOpen ? 1 : 0 }}
                          transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
                          style={{ height:3, background:`linear-gradient(90deg, ${TEAL}, ${TEAL_L})`, transformOrigin:'left' }}
                        />

                        <button
                          onClick={() => setOpenTrack(isOpen ? null : track.id)}
                          style={{ width:'100%', padding:'20px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'transparent', border:'none', cursor:'pointer', textAlign:'left' }}
                        >
                          <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                            <motion.div
                              animate={{ background: isOpen ? TEAL : 'rgba(62,139,135,0.08)' }}
                              transition={{ duration:0.3 }}
                              style={{ width:36, height:36, borderRadius:4, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, border:'1px solid rgba(62,139,135,0.18)' }}
                            >
                              <span style={{ fontFamily:'monospace', fontSize:11, fontWeight:700, color: isOpen ? 'white' : TEAL }}>
                                {String(i+1).padStart(2,'0')}
                              </span>
                            </motion.div>
                            <span style={{ fontSize:15, fontWeight:600, color:DARK }}>{track.name}</span>
                          </div>
                          <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
                            {track.topics && (
                              <span style={{ fontFamily:'monospace', fontSize:10, color:MUTED, letterSpacing:'0.06em' }}>
                                {track.topics.length} topics
                              </span>
                            )}
                            <ChevronIcon open={isOpen} />
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              key="content"
                              initial={{ height:0, opacity:0 }}
                              animate={{ height:'auto', opacity:1 }}
                              exit={{ height:0, opacity:0 }}
                              transition={{ duration:0.4, ease:[0.22,1,0.36,1] }}
                              style={{ overflow:'hidden' }}
                            >
                              <div style={{ padding:'4px 24px 24px' }}>
                                <div style={{ height:1, background:'rgba(62,139,135,0.12)', marginBottom:18 }} />
                                <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                                  {track.topics.map((topic, j) => (
                                    <motion.span key={j}
                                      initial={{ opacity:0, scale:0.85 }}
                                      animate={{ opacity:1, scale:1 }}
                                      transition={{ duration:0.3, delay:j*0.04 }}
                                      whileHover={{ scale:1.05, background:'rgba(62,139,135,0.14)' }}
                                      style={{ fontSize:12, fontFamily:'monospace', color:TEAL, background:'rgba(62,139,135,0.07)', border:'1px solid rgba(62,139,135,0.18)', borderRadius:4, padding:'5px 12px', letterSpacing:'0.04em', cursor:'default' }}
                                    >
                                      {typeof topic === 'object' ? topic.name : topic}
                                    </motion.span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </Reveal>
                  );
                })}
              </div>
            </section>

            {/* SUBMISSION GUIDELINES */}
            <section style={{ marginBottom: 56 }}>
              <Reveal style={{ marginBottom: 32 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <AccentBar />
                  <div>
                    <SectionLabel>How to Submit</SectionLabel>
                    <h3 style={{ fontSize:26, fontWeight:700, color:DARK }}>Submission Guidelines</h3>
                  </div>
                </div>
              </Reveal>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:12 }}>
                {guidelines.map((g, i) => (
                  <Reveal key={i} delay={i * 0.07}>
                    <motion.div
                      onHoverStart={() => setHoveredGuideline(i)}
                      onHoverEnd={() => setHoveredGuideline(null)}
                      whileHover={{ y:-4, boxShadow:'0 16px 40px rgba(62,139,135,0.13)' }}
                      style={{ ...glass, borderRadius:6, padding:'22px 22px', position:'relative', overflow:'hidden', cursor:'default' }}
                    >
                      <motion.div
                        initial={{ scaleX:0 }} whileInView={{ scaleX:1 }} viewport={{ once:true }}
                        transition={{ duration:0.6, delay:i*0.1 }}
                        style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${TEAL}, ${TEAL_L})`, transformOrigin:'left', borderRadius:'6px 6px 0 0' }}
                      />
                      <motion.div
                        animate={{ opacity: hoveredGuideline === i ? 0.08 : 0.04, scale: hoveredGuideline === i ? 1.15 : 1 }}
                        transition={{ duration:0.3 }}
                        style={{ position:'absolute', bottom:-20, right:-20, width:90, height:90, borderRadius:'50%', background:TEAL, pointerEvents:'none' }}
                      />
                      <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                        <div style={{ width:40, height:40, borderRadius:6, background:'rgba(62,139,135,0.08)', border:'1px solid rgba(62,139,135,0.15)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                          {g.icon}
                        </div>
                        <div>
                          <div style={{ fontFamily:'monospace', fontSize:10, textTransform:'uppercase', letterSpacing:'0.1em', color:MUTED, marginBottom:5 }}>{g.label}</div>
                          <div style={{ fontSize:14, fontWeight:600, color:DARK, lineHeight:1.5 }}>{g.value}</div>
                        </div>
                      </div>
                    </motion.div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* IMPORTANT DATES */}
            <section style={{ marginBottom: 56 }}>
              <Reveal style={{ marginBottom: 32 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                  <AccentBar />
                  <div>
                    <SectionLabel>Plan Your Submission</SectionLabel>
                    <h3 style={{ fontSize:26, fontWeight:700, color:DARK }}>Important Dates</h3>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div style={{ ...glassStrong, borderRadius:6, padding:'32px 36px' }}>
                  <Timeline items={importantDates} />
                </div>
              </Reveal>
            </section>

            {/* CTA */}
            <Reveal>
              <motion.div
                whileHover={{ boxShadow:'0 32px 80px rgba(15,76,92,0.22)' }}
                style={{ background:DARK, borderRadius:8, padding:'52px 48px', position:'relative', overflow:'hidden', textAlign:'center' }}
              >
                {[{ w:280, h:280, top:-80, right:-60, o:0.08 }, { w:160, h:160, bottom:-30, left:50, o:0.06 }].map((c,i) => (
                  <motion.div key={i} animate={{ scale:[1,1.1,1], rotate:[0,10,0] }} transition={{ duration:14+i*5, repeat:Infinity }}
                    style={{ position:'absolute', width:c.w, height:c.h, borderRadius:'50%', top:c.top, right:c.right, bottom:c.bottom, left:c.left, background:`rgba(90,168,163,${c.o})`, pointerEvents:'none' }} />
                ))}
                <motion.div animate={{ opacity:[0.03,0.07,0.03] }} transition={{ duration:7, repeat:Infinity }}
                  style={{ position:'absolute', bottom:-10, right:28, fontFamily:'monospace', fontSize:110, fontWeight:800, color:'white', lineHeight:1, letterSpacing:'-0.04em', pointerEvents:'none' }}>
                  CFP
                </motion.div>

                <div style={{ position:'relative', zIndex:1 }}>
                  <div style={{ fontFamily:'monospace', fontSize:10, textTransform:'uppercase', letterSpacing:'0.16em', color:TEAL_LL, marginBottom:14 }}>Ready to Submit?</div>
                  <h3 style={{ fontSize:28, fontWeight:700, color:'white', lineHeight:1.3, marginBottom:12 }}>Submit via EasyChair</h3>
                  <p style={{ fontSize:14, color:'rgba(255,255,255,0.65)', maxWidth:480, margin:'0 auto 32px', lineHeight:1.7 }}>
                    All submissions are handled through EasyChair. Make sure your paper follows IEEE Conference format before uploading.
                  </p>
                  <motion.a
                    href={EXTERNAL_LINKS.EASYCHAIR}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ display: 'inline-block', padding: '14px 32px', background: TEAL, color: 'white', borderRadius: 4, fontSize: 13, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.05em' }}
                  >
                    Submit Your Paper via EasyChair
                  </motion.a>
                </div>
              </motion.div>
            </Reveal>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CallForPapers;