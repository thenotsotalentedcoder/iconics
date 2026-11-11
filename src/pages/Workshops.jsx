import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PageBackground from '../components/animations/PageBackground';
import { useApiData } from '../hooks/useApiData';
import { api } from '../utils/api';
import { dedupeSpeakers } from '../utils/speakers';

const TEAL = '#3E8B87';
const DARK = '#0F4C5C';
const MID = '#2F7C7A';
const MUTED = '#5AA8A3';

const WorkshopCard = ({ workshop, index, speakerCount }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.06 }}
  >
    <Link
      to={`/workshops/${workshop.slug}`}
      className="block h-full transition-all duration-300 hover:-translate-y-1"
      style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(62,139,135,0.18)', borderRadius: 4, overflow: 'hidden', backdropFilter: 'blur(12px)', boxShadow: '0 2px 20px rgba(15,76,92,0.07)', textDecoration: 'none' }}
    >
      <div style={{ height: 3, background: `linear-gradient(90deg, ${TEAL}, ${DARK})` }} />
      <div style={{ padding: '24px 26px' }}>
        <div style={{ fontFamily: 'monospace', fontSize: 9, fontWeight: 800, color: TEAL, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 10 }}>
          Workshop {String(workshop.order ?? index + 1).padStart(2, '0')}
        </div>
        <h2 style={{ fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800, color: DARK, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 6 }}>
          {workshop.title}
        </h2>
        {workshop.tagline && <p style={{ color: TEAL, fontSize: 13, fontWeight: 600, marginBottom: 12 }}>{workshop.tagline}</p>}
        <p className="line-clamp-3" style={{ color: MID, fontSize: 13.5, lineHeight: 1.7, opacity: 0.9 }}>{workshop.description}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 18, paddingTop: 14, borderTop: '1px solid rgba(62,139,135,0.12)' }}>
          <span style={{ fontFamily: 'monospace', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: MUTED }}>
            {speakerCount} speaker{speakerCount === 1 ? '' : 's'}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: TEAL }}>View details →</span>
        </div>
      </div>
    </Link>
  </motion.div>
);

const Workshops = () => {
  const { data: workshops, loading } = useApiData(api.getWorkshops, []);
  const { data: speakers } = useApiData(api.getSpeakers, []);

  const countFor = (w) => dedupeSpeakers(speakers.filter(s => s.workshops?.includes(w.title))).length;

  return (
    <PageTransition>
      <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)', paddingBottom: 80 }}>
        <PageBackground />
        <div style={{ position: 'relative', zIndex: 1, paddingTop: 96 }}>
          <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', paddingBottom: 40, paddingTop: 16 }}>
              <SectionHeading title="Workshops" subtitle="Hands-on technical sessions led by world-class researchers" />
            </div>

            {loading ? (
              <div className="py-16 text-center text-sm text-text-muted">Loading workshops…</div>
            ) : workshops.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 24px', background: 'rgba(255,255,255,0.75)', border: '1px solid rgba(62,139,135,0.16)', borderRadius: 10, backdropFilter: 'blur(10px)' }}>
                <div style={{ fontFamily: 'monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: TEAL, marginBottom: 10 }}>Workshops</div>
                <h3 style={{ fontSize: 'clamp(20px, 4vw, 26px)', fontWeight: 800, color: DARK, marginBottom: 10 }}>Coming Soon</h3>
                <p style={{ fontSize: 14, color: MID, maxWidth: 420, margin: '0 auto', lineHeight: 1.6 }}>
                  Workshop details for ICONICS'26 are being finalized and will be published here shortly. Check back soon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {workshops.map((w, i) => <WorkshopCard key={w.id} workshop={w} index={i} speakerCount={countFor(w)} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Workshops;
