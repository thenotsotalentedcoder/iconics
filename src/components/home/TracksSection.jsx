import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { tracks } from '../../data/tracks';

gsap.registerPlugin(ScrollTrigger);

const TrackCard = ({ track, index, animationType }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    if (animationType === 'flip') {
      // Flip animation
      gsap.from(card, {
        rotateY: 180,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'left 80%',
          toggleActions: 'play none none reverse',
          containerAnimation: gsap.getById('tracksScroll')
        }
      });
    } else {
      // Scale animation
      gsap.from(card, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: card,
          start: 'left 80%',
          toggleActions: 'play none none reverse',
          containerAnimation: gsap.getById('tracksScroll')
        }
      });
    }
  }, [animationType]);

  return (
    <div
      ref={cardRef}
      className="flex-shrink-0 w-[320px] sm:w-[380px] group"
    >
      <div className="h-full bg-white rounded-xl border-2 border-border-light hover:border-accent-dark transition-all duration-300 overflow-hidden shadow-soft hover:shadow-large">
        {/* Front */}
        <div className="p-8">
          {/* Icon */}
          <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
            {track.icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-heading font-bold text-text-primary mb-4">
            {track.name}
          </h3>

          {/* Topics */}
          <div className="space-y-2 mb-4">
            {track.topics.slice(0, 4).map((topic, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                <div className="w-1.5 h-1.5 bg-accent-dark rounded-full" />
                {topic}
              </div>
            ))}
            {track.topics.length > 4 && (
              <div className="text-xs text-text-muted italic">
                +{track.topics.length - 4} more topics
              </div>
            )}
          </div>

          {/* Learn More Button */}
          <button className="mt-4 text-accent-dark font-semibold text-sm flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
            Learn More
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>

        {/* Bottom accent */}
        <div className="h-2 bg-gradient-to-r from-accent-dark to-accent-medium" />
      </div>
    </div>
  );
};

const TracksSection = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;

    // Horizontal scroll animation
    const scrollTween = gsap.to(container, {
      x: () => -(container.scrollWidth - window.innerWidth + 100),
      ease: 'none',
      scrollTrigger: {
        id: 'tracksScroll',
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${container.scrollWidth}`,
        invalidateOnRefresh: true
      }
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getById('tracksScroll')?.kill();
    };
  }, []);

  // Alternate animation types
  const getAnimationType = (index) => {
    return index % 2 === 0 ? 'flip' : 'scale';
  };

  return (
    <section ref={sectionRef} className="relative bg-bg-primary overflow-hidden py-20">
      {/* Section Heading */}
      <div className="container mx-auto px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display font-heading text-text-primary mb-4">
            Research Tracks
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl">
            Submit your groundbreaking research across 8 specialized tracks
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Scroll Indicator - Left */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-r-lg shadow-lg">
            <svg className="w-6 h-6 text-accent-dark animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Cards Container */}
        <div
          ref={containerRef}
          className="flex gap-6 pl-4 sm:pl-6 pr-[50vw]"
        >
          {tracks.map((track, index) => (
            <TrackCard
              key={track.id}
              track={track}
              index={index}
              animationType={getAnimationType(index)}
            />
          ))}
        </div>

        {/* Scroll Indicator - Right */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <div className="bg-white/80 backdrop-blur-sm p-3 rounded-l-lg shadow-lg">
            <svg className="w-6 h-6 text-accent-dark animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll Hint */}
      <div className="container mx-auto px-4 sm:px-6 mt-8">
        <p className="text-center text-sm text-text-muted">
          Scroll or swipe to explore all tracks →
        </p>
      </div>
    </section>
  );
};

export default TracksSection;
