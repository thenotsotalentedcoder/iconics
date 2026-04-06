import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PageBackground from '../components/animations/PageBackground';
import { day1Schedule, day2Schedule } from '../data/schedule';
import { motion, AnimatePresence } from 'framer-motion';

const TEAL   = '#3E8B87';
const TEAL_L = '#5AA8A3';

/* Type → teal-tinted color strip */
const typeStyle = (type) => {
  const map = {
    keynote:  { border: TEAL,    bg: 'rgba(62,139,135,0.08)',  label: 'rgba(62,139,135,0.9)'  },
    session:  { border: '#5AA8A3', bg: 'rgba(90,168,163,0.07)',label: 'rgba(90,168,163,0.85)' },
    workshop: { border: '#2D6E6A', bg: 'rgba(45,110,106,0.08)',label: 'rgba(45,110,106,0.9)'  },
    ceremony: { border: '#A0C8C6', bg: 'rgba(160,200,198,0.08)',label:'rgba(62,139,135,0.7)'  },
    break:    { border: 'rgba(62,139,135,0.18)', bg: 'rgba(238,243,243,0.5)', label: 'rgba(122,154,166,0.8)' },
  };
  return map[type] || map.break;
};

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(1);
  const schedule = activeDay === 1 ? day1Schedule : day2Schedule;

  return (
    <PageTransition>
      <div
        className="relative min-h-screen"
        style={{ background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}
      >
        <PageBackground />

        <div className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-5xl">

            <SectionHeading title="Conference Schedule" subtitle="October 20-21, 2026" />

            <div className="flex justify-center mb-10">
              <div className="h-px w-24 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)` }} />
            </div>

            {/* Day toggle — glassmorphic pill */}
            <div className="flex justify-center gap-3 mb-10">
              {[1, 2].map(d => (
                <button key={d} onClick={() => setActiveDay(d)}
                  className="px-8 py-3 text-sm font-semibold rounded-full transition-all duration-250"
                  style={{
                    background: activeDay === d
                      ? `linear-gradient(135deg, ${TEAL} 0%, #2D6E6A 100%)`
                      : 'rgba(255,255,255,0.55)',
                    color: activeDay === d ? '#fff' : '#2F7C7A',
                    border: activeDay === d ? 'none' : '1px solid rgba(62,139,135,0.18)',
                    backdropFilter: 'blur(8px)',
                    boxShadow: activeDay === d ? '0 4px 16px rgba(62,139,135,0.28)' : 'none',
                  }}>
                  Day {d} — October {9 + d}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <AnimatePresence mode="wait">
              <motion.div key={activeDay}
                initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.35 }}
                className="space-y-3">
                {schedule.map((item, i) => {
                  const ts = typeStyle(item.type);
                  return (
                    <motion.div key={i}
                      className="rounded-xl overflow-hidden transition-all duration-250"
                      style={{
                        background: ts.bg,
                        border: `1px solid ${ts.border}30`,
                        borderLeft: `3px solid ${ts.border}`,
                        backdropFilter: 'blur(8px)',
                      }}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      onHoverStart={e => { e.target.style.borderLeftColor = ts.border; e.target.style.boxShadow = `0 4px 20px ${ts.border}18`; }}
                      onHoverEnd={e => { e.target.style.boxShadow = 'none'; }}
                    >
                      <div className="flex flex-col md:flex-row md:items-start gap-3 p-4 sm:p-5">
                        {/* Time */}
                        <div className="md:w-40 flex-shrink-0">
                          <p className="font-bold text-sm" style={{ color: TEAL }}>{item.time}</p>
                          {item.location && (
                            <p className="text-xs mt-0.5" style={{ color: '#5AA8A3' }}>{item.location}</p>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="font-bold text-base sm:text-lg mb-1" style={{ color: '#0F4C5C' }}>{item.event}</h3>
                          {item.speaker && (
                            <p className="text-sm mb-1" style={{ color: '#2F7C7A' }}>
                              <span style={{ color: TEAL_L }}>Speaker:</span> {item.speaker}
                            </p>
                          )}
                          {item.description && (
                            <p className="text-sm" style={{ color: '#2F7C7A' }}>{item.description}</p>
                          )}
                          {item.papers && (
                            <p className="text-xs mt-1" style={{ color: '#5AA8A3' }}>{item.papers.length} paper presentations</p>
                          )}
                        </div>

                        {/* Badge */}
                        <div className="flex-shrink-0">
                          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase"
                            style={{ background: `${ts.border}15`, color: ts.label }}>
                            {item.type}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Workshop info card */}
            {activeDay === 2 && (
              <motion.div
                className="mt-12 rounded-2xl overflow-hidden"
                style={{
                  background: 'rgba(255,255,255,0.62)',
                  border: `1px solid rgba(62,139,135,0.18)`,
                  backdropFilter: 'blur(12px)',
                }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="px-6 py-4 border-b" style={{ borderColor: 'rgba(62,139,135,0.12)' }}>
                  <h3 className="font-bold text-lg" style={{ color: '#0F4C5C' }}>Parallel Workshops — Day 2</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-0 divide-x" style={{ '--tw-divide-opacity': 1 }}>
                  {[
                    { title: 'Quantum Technologies Workshop', instructor: 'Dr. Manzoor Ikram', desc: 'Hands-on introduction to quantum computing principles and applications' },
                    { title: 'NLP Workshop', instructor: 'Prof. Dr. Muhammad Rafi', desc: 'Practical natural language processing techniques and tools' },
                  ].map((w, i) => (
                    <div key={i} className="p-6">
                      <span className="inline-block text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: TEAL_L }}>Workshop {i + 1}</span>
                      <h4 className="font-bold mb-1" style={{ color: '#0F4C5C' }}>{w.title}</h4>
                      <p className="text-sm mb-1" style={{ color: TEAL }}>{w.instructor}</p>
                      <p className="text-sm" style={{ color: '#2F7C7A' }}>{w.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Schedule;