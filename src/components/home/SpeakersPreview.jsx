import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { speakers } from '../../data/speakers';
import SpeakerModal from '../speakers/SpeakerModal';
import MagneticButton from '../common/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const SpeakersPreview = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  // Show first 6 speakers
  const featuredSpeakers = speakers.slice(0, 6);

  useEffect(() => {
    const cards = cardsRef.current;

    // Stagger animation
    gsap.from(cards, {
      y: 100,
      opacity: 0,
      rotation: (i) => (i % 2 === 0 ? 5 : -5),
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#111827 1px, transparent 1px), linear-gradient(90deg, #111827 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display font-heading text-text-primary mb-4">
            Keynote Speakers
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Learn from world-renowned experts and thought leaders
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 max-w-7xl mx-auto">
          {featuredSpeakers.map((speaker, index) => {
            // Bento grid sizes: 2 large (span 2 cols), 4 regular (span 1 col)
            const isLarge = index === 0 || index === 3;
            const colSpan = isLarge ? 'md:col-span-2' : 'md:col-span-1';
            const rowSpan = isLarge ? 'md:row-span-2' : 'md:row-span-1';

            return (
              <div
                key={speaker.id}
                ref={(el) => (cardsRef.current[index] = el)}
                className={`${colSpan} ${rowSpan} col-span-2 sm:col-span-1`}
              >
                <div
                  onClick={() => setSelectedSpeaker(speaker)}
                  className="h-full bg-white rounded-xl overflow-hidden border border-border-light hover:border-accent-dark transition-all duration-300 cursor-pointer group shadow-soft hover:shadow-large"
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden ${isLarge ? 'h-64' : 'h-48'}`}>
                    <img
                      src={speaker.photo}
                      alt={speaker.name}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Hover Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <div className="text-white text-xs font-semibold">
                        Click to view profile →
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-text-primary mb-1 line-clamp-2 group-hover:text-accent-dark transition-colors">
                      {speaker.name}
                    </h3>
                    <p className="text-xs text-text-muted mb-1 line-clamp-1">{speaker.title}</p>
                    <p className="text-xs text-accent-dark font-semibold line-clamp-1">{speaker.institution}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link to="/speakers">
            <MagneticButton variant="secondary">
              View All Speakers
            </MagneticButton>
          </Link>
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
