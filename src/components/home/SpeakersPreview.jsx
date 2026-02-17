import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { speakers } from '../../data/speakers';
import SpeakerModal from '../speakers/SpeakerModal';

const SpeakersPreview = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const featuredSpeakers = speakers.slice(0, 4);

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-bg-light relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16">
          <div>
            <motion.span
              className="inline-block text-accent-dark text-sm font-semibold tracking-wider uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Expert Speakers
            </motion.span>
            <motion.h2
              className="text-display font-bold text-text-dark"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Keynote Speakers
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Link
              to="/speakers"
              className="inline-flex items-center gap-2 text-accent-dark font-semibold group"
            >
              View All Speakers
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Speakers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSpeakers.map((speaker, index) => (
            <motion.div
              key={speaker.id}
              className="group cursor-pointer"
              onClick={() => setSelectedSpeaker(speaker)}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  className="w-full aspect-[3/4] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-white text-sm font-medium">View Profile →</span>
                </div>
              </div>
              <h3 className="font-semibold text-text-dark group-hover:text-accent-dark transition-colors">
                {speaker.name}
              </h3>
              <p className="text-sm text-dark-500 mt-1">{speaker.title}</p>
              <p className="text-sm text-accent-dark font-medium">{speaker.institution}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <SpeakerModal
        speaker={selectedSpeaker}
        isOpen={!!selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
      />
    </section>
  );
};

export default SpeakersPreview;
