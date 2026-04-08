import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { organizingCommittee, technicalCommittee } from '../data/committee';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

const TEAL   = '#3E8B87';
const TEAL_L = '#5AA8A3';
const DARK   = '#0F4C5C';
const MID    = '#2F7C7A';

const Committee = () => {
  const [activeTab, setActiveTab] = useState('organizing');

  const tabs = [
    { id: 'organizing', label: 'Organizing Committee', count: organizingCommittee.length },
    { id: 'technical',  label: 'Technical Committee',  count: technicalCommittee.length },
  ];

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-20" style={{ background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}>

        <div className="relative z-10 pt-24 sm:pt-32 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">

            <SectionHeading title="Committee" subtitle="Meet the organizing team behind ICONICS'26" />

            {/* Tab switcher — minimal radius */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex gap-1 p-1"
                style={{ background: 'rgba(255,255,255,0.55)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.85)', borderRadius: 6, boxShadow: '0 2px 14px rgba(62,139,135,0.08)' }}>
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-300"
                    style={{
                      borderRadius: 4,
                      letterSpacing: '0.08em',
                      color: activeTab === tab.id ? 'white' : MID,
                      background: activeTab === tab.id ? `linear-gradient(135deg, ${TEAL}, ${DARK})` : 'transparent',
                    }}
                  >
                    {tab.label}
                    <span className="px-1.5 py-0.5 text-[10px] font-black"
                      style={{
                        borderRadius: 3,
                        background: activeTab === tab.id ? 'rgba(255,255,255,0.22)' : `${TEAL}18`,
                        color: activeTab === tab.id ? 'white' : TEAL,
                      }}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {activeTab === 'organizing' && (
                <motion.div
                  key="organizing"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {organizingCommittee.map((member, i) => (
                      <motion.div
                        key={i}
                        className="p-5 sm:p-6 transition-all duration-300"
                        style={{ background: 'rgba(255,255,255,0.75)', border: `1px solid ${TEAL}18`, backdropFilter: 'blur(10px)', boxShadow: '0 1px 12px rgba(15,76,92,0.05)', borderRadius: 6 }}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04, duration: 0.4 }}
                        whileHover={{ y: -3, boxShadow: `0 8px 28px rgba(62,139,135,0.14)`, borderColor: `${TEAL}40` }}
                      >
                        {/* Role badge — minimal radius */}
                        <div className="inline-block px-2.5 py-1 mb-3"
                          style={{ background: `${TEAL}10`, border: `1px solid ${TEAL}25`, borderRadius: 4 }}>
                          <span style={{ fontSize: 9, fontWeight: 800, color: TEAL_L, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                            {member.role}
                          </span>
                        </div>
                        <h4 style={{ fontSize: 16, fontWeight: 700, color: DARK, marginBottom: 4 }}>{member.name}</h4>
                        <p style={{ fontSize: 13, color: MID, marginBottom: member.email ? 12 : 0 }}>{member.institution}</p>
                        {member.email && (
                          <a
                            href={`mailto:${member.email}`}
                            className="inline-flex items-center gap-2 text-xs transition-colors duration-200"
                            style={{ color: TEAL_L }}
                            onMouseEnter={e => { e.currentTarget.style.color = TEAL; }}
                            onMouseLeave={e => { e.currentTarget.style.color = TEAL_L; }}
                          >
                            <FaEnvelope style={{ fontSize: 11 }} />{member.email}
                          </a>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeTab === 'technical' && (
                <motion.div
                  key="technical"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  {(() => {
                    const countries = [...new Set(technicalCommittee.map(m => m.country).filter(Boolean))];
                    return countries.length > 0 ? (
                      <div className="flex items-center gap-3 mb-6 p-4"
                        style={{ background: 'rgba(255,255,255,0.65)', border: `1px solid ${TEAL}18`, backdropFilter: 'blur(8px)', borderRadius: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: TEAL, flexShrink: 0 }} />
                        <p style={{ fontSize: 13, color: MID }}>
                          <span style={{ fontWeight: 700, color: DARK }}>{technicalCommittee.length} members</span>
                          {' '}across{' '}
                          <span style={{ fontWeight: 700, color: DARK }}>{countries.length} countries</span>
                        </p>
                      </div>
                    ) : null;
                  })()}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {technicalCommittee.map((member, i) => (
                      <motion.div
                        key={i}
                        className="px-5 py-4 transition-all duration-200"
                        style={{ background: 'rgba(255,255,255,0.60)', border: `1px solid ${TEAL}12`, backdropFilter: 'blur(8px)', borderRadius: 6 }}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.025, duration: 0.35 }}
                        whileHover={{ background: 'rgba(255,255,255,0.85)', borderColor: `${TEAL}30`, y: -2 }}
                      >
                        <h4 style={{ fontWeight: 600, color: DARK, fontSize: 14, marginBottom: 2 }}>{member.name}</h4>
                        <p style={{ fontSize: 12.5, color: MID }}>{member.institution}</p>
                        {member.country && (
                          <p style={{ fontSize: 11, color: TEAL_L, marginTop: 4, fontWeight: 500 }}>{member.country}</p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Committee;