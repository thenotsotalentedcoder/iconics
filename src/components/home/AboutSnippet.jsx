import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../common/Button';

const nedImage = '/images/ned.jpg';

const AboutSnippet = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4 sm:mb-6">
              About ICONICS
            </h2>
            <div className="space-y-3 sm:space-y-4 text-text-secondary text-sm sm:text-base">
              <p>
                NED University of Engineering and Technology announces the <strong className="text-white">5th International Conference on Innovations in Computer Science (ICONICS'26)</strong>.
              </p>
              <p>
                The conference provides a platform for researchers both national and international to exchange novel and contemporary ideas in emerging fields of computing.
              </p>
              <p>
                With a focus on <strong className="text-accent-red">AI, Quantum Computing, and Cybersecurity</strong>, ICONICS'26 brings together leading experts, researchers, and practitioners from around the world.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 my-6 sm:my-8">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent-red font-accent">5th</div>
                <div className="text-text-muted text-xs sm:text-sm">Edition</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent-red font-accent">500+</div>
                <div className="text-text-muted text-xs sm:text-sm">Attendees</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent-red font-accent">50+</div>
                <div className="text-text-muted text-xs sm:text-sm">Speakers</div>
              </div>
            </div>

            <Link to="/about">
              <Button variant="secondary">Read Full History</Button>
            </Link>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="aspect-video bg-bg-card border border-border-subtle rounded-lg overflow-hidden hover:border-accent-red transition-all group">
                <img
                  src={nedImage}
                  alt="NED University Campus"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-accent-red text-white p-4 sm:p-6 rounded-lg shadow-glow-red"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-2xl sm:text-3xl font-bold font-accent">2026</div>
                <div className="text-xs sm:text-sm">Oct 10-11</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;
