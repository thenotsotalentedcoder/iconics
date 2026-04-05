import { useState, useEffect } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PageBackground from '../components/animations/PageBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { EXTERNAL_LINKS } from '../utils/constants';

const TEAL   = '#3E8B87';
const DARK   = '#0F4C5C';
const MID    = '#2F7C7A';

const editions = [
  { year:'2016', label:"ICONICS'16", date:'December 15–16, 2016', edition:'1st Edition', venue:'NED University, Karachi',
    description:'The inaugural ICONICS brought together national and international researchers to discuss innovations in computer science and software engineering.',
    highlights:['First international conference by NED CS&IT','National & international speakers','Proceedings published in NED Journal'],
    resources:[{ label:'Proceedings (PDF)', href: EXTERNAL_LINKS.PROCEEDINGS_2016, type:'pdf' },{ label:'NED Journal Archives', href: EXTERNAL_LINKS.NED_JOURNAL, type:'link' }],
    photoCount: 9 },
  { year:'2018', label:"ICONICS'18", date:'December 5–6, 2018', edition:'2nd Edition', venue:'NED University, Karachi',
    description:'Expanded international participation with a stronger focus on AI, machine learning, and emerging computing technologies.',
    highlights:['Expanded international participation','AI & ML focus tracks','Proceedings published'],
    resources:[{ label:'Proceedings (PDF)', href: EXTERNAL_LINKS.PROCEEDINGS_2018, type:'pdf' }],
    photoCount: 9 },
  { year:'2022', label:"ICONICS'22", date:'December 14–15, 2022', edition:'3rd Edition', venue:'NED University, Karachi',
    description:'The first IEEE-published edition of ICONICS, featuring dedicated tracks for quantum computing and cybersecurity.',
    highlights:['Published in IEEE Xplore','Quantum computing track introduced','Cybersecurity & blockchain sessions'],
    resources:[{ label:'IEEE Xplore Proceedings', href: EXTERNAL_LINKS.IEEE_ICONICS_22, type:'ieee' }],
    photoCount: 9 },
  { year:'2024', label:"ICONICS'24", date:'November 13–14, 2024', edition:'4th Edition', venue:'NED University, Karachi',
    description:'The most recent edition, emphasising generative AI, edge computing, and cryptocurrency. Featured 9 keynote speakers from 5 countries.',
    highlights:['9 international keynote speakers','Quantum Technologies Workshop','NLP & Contrastive Learning Workshop'],
    resources:[{ label:'Conference Website', href:'https://www.nediconics.com', type:'link' }],
    photoCount: 9 },
];

const ResourceBadge = ({ r }) => {
  const icons = {
    pdf:  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    ieee: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    link: <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  };
  return (
    <a href={r.href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold transition-all hover:bg-[#EEF6F5]"
      style={{ color: TEAL, border: `1px solid ${TEAL}50`, borderRadius: 6, background: 'white' }}>
      {icons[r.type]}{r.label}
    </a>
  );
};

const Gallery = () => {
  const [activeYear, setActiveYear] = useState('2024');
  const [imgIdx, setImgIdx] = useState(0);
  const active = editions.find(e => e.year === activeYear);

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIdx((prev) => (prev + 1) % active.photoCount);
    }, 4000);
    return () => clearInterval(timer);
  }, [activeYear, active.photoCount]);

  const changeYear = (year) => { setActiveYear(year); setImgIdx(0); };

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-20" style={{ background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}>
        <PageBackground />

        <div className="relative z-10 pt-24 sm:pt-32 px-4 sm:px-8">
          <div className="container mx-auto max-w-[1300px]">

            <SectionHeading title="Gallery & Archive" subtitle="A legacy of innovation at NED University" />

            {/* Year tabs */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex gap-1 p-1"
                style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.85)', borderRadius: 10, boxShadow: '0 2px 14px rgba(62,139,135,0.08)' }}>
                {editions.map(ed => (
                  <button key={ed.year} onClick={() => changeYear(ed.year)}
                    className="relative px-5 py-2 text-xs font-bold transition-all duration-300"
                    style={{
                      borderRadius: 7, letterSpacing: '0.1em',
                      color: activeYear === ed.year ? '#fff' : MID,
                      background: activeYear === ed.year
                        ? `linear-gradient(135deg, ${TEAL} 0%, ${DARK} 100%)`
                        : 'transparent',
                    }}>
                    {ed.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeYear} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.38 }}>

                {/* ── Main layout: image (wider) + sidebar ── */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_290px] gap-5 items-start">

                  {/* Slideshow — takes the lead */}
                  <div style={{ background: 'white', borderRadius: 14, border: '1px solid rgba(255,255,255,0.95)', boxShadow: '0 2px 24px rgba(15,76,92,0.08)', overflow: 'hidden' }}>

                    {/* Image frame */}
                    <div className="relative" style={{ height: 460 }}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={imgIdx}
                          initial={{ opacity: 0, scale: 1.03 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.98 }}
                          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-0 flex flex-col items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #EEF6F5 0%, #E0F0EF 100%)' }}
                        >
                          <svg style={{ width: 56, height: 56, color: `${TEAL}28`, marginBottom: 10 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span style={{ fontSize: 10, fontWeight: 700, color: `${DARK}30`, letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                            {active.label} · {String(imgIdx + 1).padStart(2, '0')} / {String(active.photoCount).padStart(2, '0')}
                          </span>
                        </motion.div>
                      </AnimatePresence>

                      {/* Prev / Next */}
                      {[-1, 1].map(dir => (
                        <button key={dir}
                          onClick={() => setImgIdx(p => (p + dir + active.photoCount) % active.photoCount)}
                          className="absolute top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:scale-105"
                          style={{
                            [dir === -1 ? 'left' : 'right']: 14,
                            width: 34, height: 34, borderRadius: 8,
                            background: 'rgba(255,255,255,0.88)', backdropFilter: 'blur(6px)',
                            border: `1px solid ${TEAL}28`, color: DARK,
                            boxShadow: '0 1px 6px rgba(0,0,0,0.07)',
                          }}>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={dir === -1 ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                          </svg>
                        </button>
                      ))}

                      {/* Progress dots */}
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                        {Array.from({ length: active.photoCount }).map((_, i) => (
                          <div key={i} onClick={() => setImgIdx(i)} style={{
                            cursor: 'pointer', height: 3, borderRadius: 2,
                            transition: 'all 0.3s',
                            width: i === imgIdx ? 18 : 6,
                            background: i === imgIdx ? TEAL : `${TEAL}38`,
                          }} />
                        ))}
                      </div>
                    </div>

                    {/* Thumbnail strip */}
                    <div className="flex gap-2 p-3 overflow-x-auto"
                      style={{ borderTop: `1px solid ${TEAL}14`, background: 'rgba(238,246,245,0.5)', scrollbarWidth: 'none' }}>
                      {Array.from({ length: active.photoCount }).map((_, i) => (
                        <button key={i} onClick={() => setImgIdx(i)}
                          className="shrink-0 transition-all duration-200"
                          style={{
                            width: 78, height: 50, borderRadius: 6,
                            border: i === imgIdx ? `2px solid ${TEAL}` : `1px solid ${TEAL}18`,
                            background: i === imgIdx ? `${TEAL}10` : 'rgba(255,255,255,0.6)',
                            opacity: i === imgIdx ? 1 : 0.52,
                            transform: i === imgIdx ? 'scale(1.05)' : 'scale(1)',
                          }} />
                      ))}
                    </div>
                  </div>

                  {/* Sidebar — edition info */}
                  <div className="flex flex-col gap-4">

                    {/* Edition card */}
                    <div style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.92)', borderRadius: 14, padding: '1.4rem' }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: TEAL, letterSpacing: '0.4em', textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
                        {active.edition}
                      </span>
                      <h2 style={{ fontSize: 26, fontWeight: 800, color: DARK, letterSpacing: '-0.02em', margin: '0 0 4px', lineHeight: 1.1 }}>
                        {active.label}
                      </h2>
                      <p style={{ fontSize: 11, color: `${MID}88`, margin: '0 0 12px', fontWeight: 500 }}>
                        {active.date} · {active.venue}
                      </p>
                      <p style={{ fontSize: 12.5, color: MID, lineHeight: 1.7, margin: '0 0 14px', opacity: 0.85 }}>
                        {active.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {active.resources.map((r, i) => <ResourceBadge key={i} r={r} />)}
                      </div>
                    </div>

                    {/* Highlights card */}
                    <div style={{ background: 'rgba(255,255,255,0.78)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.92)', borderRadius: 14, padding: '1.4rem' }}>
                      <span style={{ fontSize: 9, fontWeight: 800, color: TEAL, letterSpacing: '0.4em', textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
                        Highlights
                      </span>
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 0 }}>
                        {active.highlights.map((h, i) => (
                          <li key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: 10,
                            padding: '10px 0',
                            borderBottom: i < active.highlights.length - 1 ? `1px solid ${TEAL}12` : 'none',
                          }}>
                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: TEAL, marginTop: 5, flexShrink: 0, boxShadow: `0 0 6px ${TEAL}80` }} />
                            <span style={{ fontSize: 12.5, color: MID, fontWeight: 500, lineHeight: 1.5 }}>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>

      <style>{`
        button { outline: none; cursor: pointer; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>
    </PageTransition>
  );
};

export default Gallery;