import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const CTASection = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-bg-light relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="relative bg-gradient-to-br from-bg-dark via-bg-card to-bg-dark rounded-3xl overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-24 text-center">
            <motion.span
              className="inline-block text-accent text-sm font-semibold tracking-wider uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Join Us
            </motion.span>
            
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to Submit Your Research?
            </motion.h2>

            <motion.p
              className="text-lg text-text-muted mb-10 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Join 500+ researchers from 20+ countries at iCONICS 2026. Present your work, 
              network with experts, and be part of the future of computer science.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="https://easychair.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-glow"
              >
                Submit Paper
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link
                to="/registration"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 hover:border-accent/50 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/5"
              >
                Register Now
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              className="mt-16 pt-10 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { value: '50+', label: 'Speakers' },
                { value: '8', label: 'Tracks' },
                { value: '2', label: 'Days' },
                { value: '500+', label: 'Attendees' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-accent mb-1">{stat.value}</div>
                  <div className="text-sm text-text-muted">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
