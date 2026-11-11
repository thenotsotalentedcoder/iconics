import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import PageBackground from '../components/animations/PageBackground';
import SpeakerCard from '../components/speakers/SpeakerCard';
import SpeakerModal from '../components/speakers/SpeakerModal';
import { useApiData } from '../hooks/useApiData';
import { api } from '../utils/api';
import { dedupeSpeakers } from '../utils/speakers';

const TEAL = '#3E8B87';
const DARK = '#0F4C5C';
const MID = '#2F7C7A';
const MUTED = '#5AA8A3';

const Label = ({ children }) => (
  <div style={{ fontFamily: 'monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.22em', color: MUTED, marginBottom: 10 }}>{children}</div>
);

const WorkshopDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: workshops, loading } = useApiData(api.getWorkshops, []);
  const { data: speakers, loading: speakersLoading } = useApiData(api.getSpeakers, []);
  const [selected, setSelected] = useState(null);

  const workshop = workshops.find(w => w.slug === slug);
  const workshopSpeakers = workshop ? dedupeSpeakers(speakers.filter(s => s.workshops?.includes(workshop.title))) : [];

  return (
    <PageTransition>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)', paddingBottom: 80 }}>
        <PageBackground />
        <div style={{ position: 'relative', zIndex: 1, paddingTop: 96 }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
            <Link to="/workshops" style={{ display: 'inline-block', marginBottom: 20, fontSize: 13, fontWeight: 600, color: TEAL, textDecoration: 'none' }}>← All workshops</Link>

            {loading ? (
              <div className="py-16 text-center text-sm text-text-muted">Loading…</div>
            ) : !workshop ? (
              <div style={{ textAlign: 'center', padding: '64px 24px', background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(62,139,135,0.16)', borderRadius: 10 }}>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: DARK, marginBottom: 8 }}>Workshop not found</h3>
                <p style={{ fontSize: 14, color: MID }}>It may have been removed. <Link to="/workshops" style={{ color: TEAL, fontWeight: 600 }}>See all workshops</Link>.</p>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                {/* Header */}
                <div style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(62,139,135,0.18)', borderRadius: 4, overflow: 'hidden', backdropFilter: 'blur(12px)', boxShadow: '0 2px 20px rgba(15,76,92,0.07)', marginBottom: 28 }}>
                  <div style={{ height: 3, background: `linear-gradient(90deg, ${TEAL}, ${DARK})` }} />
                  <div style={{ padding: '28px 32px' }}>
                    <h1 style={{ fontSize: 'clamp(22px, 3.2vw, 30px)', fontWeight: 800, color: DARK, letterSpacing: '-0.025em', lineHeight: 1.2, marginBottom: 6 }}>{workshop.title}</h1>
                    {workshop.tagline && <p style={{ color: TEAL, fontSize: 14, fontWeight: 600, marginBottom: 14 }}>{workshop.tagline}</p>}
                    <p style={{ color: MID, fontSize: 14, lineHeight: 1.75, maxWidth: 680 }}>{workshop.description}</p>
                    {workshop.targetAudience && (
                      <div style={{ marginTop: 16, padding: '12px 16px', borderRadius: 8, background: 'rgba(62,139,135,0.05)', border: '1px solid rgba(62,139,135,0.14)', fontSize: 13, color: MID }}>
                        <strong style={{ color: DARK }}>For: </strong>{workshop.targetAudience}
                      </div>
                    )}
                    <button onClick={() => navigate('/registration')}
                      style={{ marginTop: 22, padding: '12px 24px', background: `linear-gradient(135deg, ${TEAL}, ${DARK})`, color: 'white', border: 'none', borderRadius: 4, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                      Register
                    </button>
                  </div>
                </div>

                {/* Outcomes */}
                {workshop.learningOutcomes?.length > 0 && (
                  <div style={{ marginBottom: 32 }}>
                    <Label>Learning Outcomes</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {workshop.learningOutcomes.map((o, i) => (
                        <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.62)', border: '1px solid rgba(62,139,135,0.12)', fontSize: 13, color: MID, lineHeight: 1.6 }}>
                          <span style={{ fontFamily: 'monospace', fontSize: 10, fontWeight: 800, color: TEAL, paddingTop: 2 }}>{i + 1}</span>{o}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Speakers */}
                <Label>Speakers · {workshopSpeakers.length}</Label>
                {speakersLoading ? (
                  <div className="py-8 text-sm text-text-muted">Loading speakers…</div>
                ) : workshopSpeakers.length === 0 ? (
                  <p style={{ fontSize: 14, color: MID }}>Speakers for this workshop will be announced soon.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 place-items-start">
                    {workshopSpeakers.map(s => (
                      <div key={s.id} className="w-full max-w-[200px] h-80">
                        <SpeakerCard speaker={s} onClick={setSelected} showWorkshops={false} />
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
        <SpeakerModal speaker={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
      </div>
    </PageTransition>
  );
};

export default WorkshopDetail;
