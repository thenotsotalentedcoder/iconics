import { motion } from 'framer-motion';
import Button from '../common/Button';
import MeshGradient from '../animations/MeshGradient';

const CTASection = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <MeshGradient />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center">
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-white mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Ready to Submit Your Research?
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-text-secondary mb-8 sm:mb-12 max-w-2xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join researchers from around the world at ICONICS'26
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-center px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button
            variant="primary"
            size="lg"
            href="https://easychair.org/"
            external
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
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
