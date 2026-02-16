import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { importantDates } from '../../data/dates';

gsap.registerPlugin(ScrollTrigger);

const ImportantDates = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const eventsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw vertical line
      gsap.from(lineRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 1.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1
        }
      });

      // Reveal events progressively
      eventsRef.current.forEach((event, index) => {
        gsap.from(event, {
          opacity: 0,
          x: -50,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: event,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-bg-primary relative">
      <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
        {/* Section Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display font-heading text-text-primary mb-4">
            Important Dates
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Mark your calendar for these key milestones
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div
            ref={lineRef}
            className="absolute left-0 sm:left-8 top-0 bottom-0 w-0.5 bg-accent-dark"
          />

          {/* Events */}
          <div className="space-y-8">
            {importantDates.map((item, index) => (
              <div
                key={index}
                ref={(el) => (eventsRef.current[index] = el)}
                className="relative pl-8 sm:pl-20"
              >
                {/* Circle Dot */}
                <div className="absolute left-0 sm:left-8 top-2 w-4 h-4 -translate-x-[7px] bg-accent-dark rounded-full border-4 border-white shadow-md" />

                {/* Event Card */}
                <div className="bg-white p-6 rounded-xl border border-border-light hover:border-accent-dark transition-all duration-300 hover:shadow-large group">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Date */}
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent-dark/10 flex items-center justify-center">
                        <svg className="w-6 h-6 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-accent font-bold text-accent-dark">
                          {item.date}
                        </div>
                        <div className="text-lg font-bold text-text-primary group-hover:text-accent-dark transition-colors">
                          {item.title}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <div className="text-sm text-text-secondary sm:text-right">
                        {item.description}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantDates;
