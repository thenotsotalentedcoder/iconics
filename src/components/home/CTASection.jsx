import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../common/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const CTASection = () => {
  const sectionRef = useRef(null);
  const shapesRef = useRef([]);

  useEffect(() => {
    // Parallax effect on shapes
    shapesRef.current.forEach((shape, index) => {
      gsap.to(shape, {
        y: -100 * (index + 1),
        rotation: 360,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-bg-secondary to-bg-primary">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Shape 1 - Circle */}
        <div
          ref={(el) => (shapesRef.current[0] = el)}
          className="absolute top-10 left-10 w-64 h-64 rounded-full border-2 border-accent-dark/20"
        />
        {/* Shape 2 - Square */}
        <div
          ref={(el) => (shapesRef.current[1] = el)}
          className="absolute bottom-20 right-20 w-48 h-48 border-2 border-accent-dark/20"
        />
        {/* Shape 3 - Circle */}
        <div
          ref={(el) => (shapesRef.current[2] = el)}
          className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full bg-accent-dark/5"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading text-text-primary mb-6">
            Ready to Submit <br className="hidden sm:block" />
            Your Research?
          </h2>
        </motion.div>

        <motion.p
          className="text-lg sm:text-xl text-text-secondary mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join <strong className="text-text-primary">500+ researchers</strong> from around the world at ICONICS'26
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <MagneticButton
            href="https://easychair.org/"
            variant="primary"
          >
            Submit Your Paper
          </MagneticButton>
          <MagneticButton
            href="/registration"
            variant="secondary"
          >
            Register Now
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 pt-12 border-t border-border-light max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '50+', label: 'Speakers' },
              { value: '8', label: 'Tracks' },
              { value: '2', label: 'Days' },
              { value: '500+', label: 'Attendees' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-accent font-bold text-accent-dark mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-text-muted uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
