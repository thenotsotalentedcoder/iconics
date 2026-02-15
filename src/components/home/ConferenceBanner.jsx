import { motion } from 'framer-motion';
import MeshGradient from '../animations/MeshGradient';

const bannerImage = '/images/Banner-4.png';

const ConferenceBanner = () => {
  return (
    <section className="relative w-full overflow-hidden pt-[60px] pb-4 sm:pb-6">
      {/* Mesh gradient background - same as Hero */}
      <MeshGradient />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Banner Image */}
        <div className="relative h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full flex items-center justify-center">
          <img
            src={bannerImage}
            alt="ICONICS'26 Conference Banner"
            className="w-full h-full object-contain"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default ConferenceBanner;
