import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { speakers as staticSpeakers } from '../../data/speakers';
import SpeakerModal from '../speakers/SpeakerModal';
import { useApiData } from '../../hooks/useApiData';
import { api } from '../../utils/api';

const TEAL = '#3E8B87';
const TEAL_L = '#5AA8A3';
const DARK = '#0F4C5C';

const SpeakerCard = ({ speaker, index }) => {
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative group cursor-pointer h-full"
    >
      {/* Card — consistent height via flex column */}
      <div
        className="relative overflow-hidden bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_4px_16px_0_rgba(31,38,135,0.07)] transition-all duration-500 hover:shadow-[0_12px_32px_0_rgba(31,38,135,0.12)] hover:bg-white/60 flex flex-col h-full"
        style={{ borderRadius: '6px' }}
      >
        {/* Photo — fixed height so all cards match */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ height: '220px' }}>
          <motion.img
            src={speaker.photo}
            alt={speaker.name}
            animate={{ scale: hover ? 1.06 : 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover object-top grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <div className="p-5 relative flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="h-[1px] w-4" style={{ background: TEAL }} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: TEAL }}>
              Keynote
            </span>
          </div>

          <h3 className="text-base font-bold mb-1 transition-colors duration-300 leading-snug" style={{ color: DARK }}>
            {speaker.name}
          </h3>

          <p className="text-xs font-semibold mb-2" style={{ color: TEAL_L }}>
            {speaker.title}
          </p>

          <p className="text-[11px] leading-relaxed line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity flex-1" style={{ color: DARK }}>
            {speaker.institution}
          </p>

          {/* View Profile — no arrow */}
          <div className="mt-4 pt-3 border-t border-teal-600/10">
            <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: TEAL }}>
              View Profile
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function SpeakersPreview() {
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const { data: speakers } = useApiData(api.getSpeakers, staticSpeakers);

  const featured = speakers.slice(0, 4);

  return (
    <section ref={ref} className="relative py-20 bg-transparent overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(62,139,135,0.05) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="inline-block text-[10px] font-bold tracking-[0.3em] uppercase mb-4"
              style={{ color: TEAL }}
            >
              Visionary Minds
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold leading-tight"
              style={{ color: DARK, letterSpacing: '-0.03em' }}
            >
              Keynote Speakers
            </motion.h2>
          </div>

          {/* Meet All Speakers — no arrow, minimal radius */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link
              to="/speakers"
              className="flex items-center gap-2 px-6 py-3 border border-teal-600/20 hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-all duration-300 font-bold text-xs tracking-widest uppercase"
              style={{ borderRadius: '4px', color: TEAL }}
            >
              Meet All Speakers
            </Link>
          </motion.div>
        </div>

        {/* Grid — items-stretch so all cards fill equal height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {featured.map((speaker, i) => (
            <div key={speaker.id} onClick={() => setSelected(speaker)} className="flex">
              <div className="w-full">
                <SpeakerCard speaker={speaker} index={i} />
              </div>
            </div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          className="text-center mt-12 text-xs font-medium tracking-widest uppercase"
          style={{ color: DARK }}
        >
          &bull; Join 50+ Global Experts &bull;
        </motion.p>
      </div>

      <SpeakerModal speaker={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
}