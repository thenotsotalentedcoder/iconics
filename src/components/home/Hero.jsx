import { motion } from 'framer-motion';
import MeshGradient from '../animations/MeshGradient';
import Button from '../common/Button';

const Hero = () => {
  return (
    <section className="relative min-h-[40vh] sm:min-h-[50vh] flex items-center justify-center overflow-hidden -mt-4 sm:-mt-6">
      {/* Animated background */}
      <MeshGradient />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        {/* Tagline */}
        <motion.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary dark:text-text-secondary light:text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          Join researchers from around the world to explore cutting-edge innovations in <span className="text-accent-red font-semibold">Computer Science</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        >
          <Button
            variant="primary"
            size="lg"
            href="/callforpapers"
          >
            Submit Your Paper
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/registration"
          >
            Register Now
          </Button>
          <Button
            variant="secondary"
            size="lg"
            href="/schedule"
          >
            View Schedule
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
