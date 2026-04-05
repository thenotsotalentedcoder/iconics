import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { speakers } from '../../data/speakers';
import SpeakerModal from '../speakers/SpeakerModal';

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
      className="relative group cursor-pointer"
    >
      {/* Glass Card Container */}
      <div className="relative overflow-hidden rounded-2xl bg-white/40 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] transition-all duration-500 hover:shadow-2xl hover:bg-white/60 h-full">
        
        {/* Photo Section */}
        <div className="relative h-72 overflow-hidden">
          <motion.img 
            src={speaker.photo} 
            alt={speaker.name}
            animate={{ scale: hover ? 1.08 : 1 }}
            transition={{ duration: 0.6 }}
            className="w-full h-full object-cover object-top grayscale-[0.3] group-hover:grayscale-0 transition-all duration-500"
          />
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content Section */}
        <div className="p-6 relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="h-[1px] w-4" style={{ background: TEAL }} />
            <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: TEAL }}>
              Keynote
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-1 transition-colors duration-300" style={{ color: DARK }}>
            {speaker.name}
          </h3>
          
          <p className="text-xs font-semibold mb-4" style={{ color: TEAL_L }}>
            {speaker.title}
          </p>

          <p className="text-[11px] leading-relaxed line-clamp-2 opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: DARK }}>
            {speaker.institution}
          </p>

          {/* View Profile Button */}
          <div className="mt-5 pt-4 border-t border-teal-600/10 flex justify-between items-center">
             <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: TEAL }}>View Profile</span>
             <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke={TEAL} strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
             </svg>
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
  
  // Show first 4 or 8 for a balanced grid
  const featured = speakers.slice(0, 4);

  return (
    <section ref={ref} className="relative py-24 bg-transparent overflow-hidden">
      {/* Ambient background glow to match previous sections */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(62,139,135,0.05) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            <Link to="/speakers" className="group flex items-center gap-3 px-6 py-3 rounded-full border border-teal-600/20 hover:bg-teal-600 hover:text-white transition-all duration-300 font-bold text-xs tracking-widest uppercase">
              Meet All Speakers
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* The Grid - No Slider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((speaker, i) => (
            <div key={speaker.id} onClick={() => setSelected(speaker)}>
              <SpeakerCard speaker={speaker} index={i} />
            </div>
          ))}
        </div>

        {/* Floating Stat or Note */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 0.5 } : {}}
          className="text-center mt-16 text-xs font-medium tracking-widest uppercase"
          style={{ color: DARK }}
        >
          &bull; Join 50+ Global Experts &bull;
        </motion.p>
      </div>

      <SpeakerModal speaker={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
    </section>
  );
}
