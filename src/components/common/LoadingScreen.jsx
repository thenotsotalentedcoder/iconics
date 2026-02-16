import { motion } from 'framer-motion';

const LoadingScreen = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Logo */}
        <motion.div
          className="text-6xl font-heading font-black mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent-dark">i</span>
          <span className="text-text-primary">CONICS</span>
          <span className="text-accent-dark">'26</span>
        </motion.div>

        {/* Loading spinner */}
        <motion.div
          className="w-12 h-12 mx-auto border-4 border-border-light border-t-accent-dark rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
