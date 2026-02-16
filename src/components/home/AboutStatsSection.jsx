import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const AboutStatsSection = () => {
  const sectionRef = useRef(null);
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide in from left
      gsap.from(leftPanelRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // Slide in from right
      gsap.from(rightPanelRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });

      // Parallax effect on scroll
      gsap.to(leftPanelRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });

      gsap.to(rightPanelRef.current, {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      value: '500+',
      label: 'Attendees Expected',
      description: 'From 20+ countries worldwide'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      value: '200+',
      label: 'Papers Submitted',
      description: 'Cutting-edge research'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      value: '50+',
      label: 'International Speakers',
      description: 'World-renowned experts'
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      value: '8',
      label: 'Research Tracks',
      description: 'AI, Quantum, IoT, and more'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #111827 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Panel - About */}
          <div ref={leftPanelRef}>
            <motion.h2
              className="text-display font-heading text-text-primary mb-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              About ICONICS
            </motion.h2>

            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p className="text-lg">
                NED University of Engineering and Technology announces the <strong className="text-text-primary">5th International Conference on Innovations in Computer Science (ICONICS'26)</strong>.
              </p>

              <p>
                The conference provides a platform for researchers both national and international to exchange novel and contemporary ideas in emerging fields of computing.
              </p>

              <p>
                With a focus on <strong className="text-accent-dark">AI, Quantum Computing, and Cybersecurity</strong>, ICONICS'26 brings together leading experts, researchers, and practitioners from around the world.
              </p>

              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-accent-dark font-semibold hover:gap-4 transition-all duration-300"
                >
                  Learn More About Conference
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Panel - Stats Grid */}
          <div ref={rightPanelRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-border-light hover:border-accent-dark transition-all duration-300 hover:shadow-large group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="text-accent-dark mb-3 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>

                  <div className="text-4xl font-accent font-bold text-accent-dark mb-2">
                    {stat.value}
                  </div>

                  <div className="text-sm font-semibold text-text-primary mb-1 uppercase tracking-wide">
                    {stat.label}
                  </div>

                  <div className="text-xs text-text-muted">
                    {stat.description}
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 h-1 bg-bg-tertiary rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-accent-dark"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
