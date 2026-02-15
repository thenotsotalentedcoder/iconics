import { motion } from 'framer-motion';

const Card = ({
  children,
  className = '',
  hover = true,
  onClick
}) => {
  return (
    <motion.div
      className={`bg-bg-card rounded-lg p-4 sm:p-6 border border-border-subtle transition-all duration-300 ${hover ? 'hover:border-red-600 hover:-translate-y-2 hover:shadow-glow-red active:border-red-600 active:shadow-glow-red' : ''} ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={onClick}
      whileTap={hover ? { scale: 0.98 } : {}}
    >
      {children}
    </motion.div>
  );
};

export default Card;
