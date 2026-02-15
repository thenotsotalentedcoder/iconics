import { motion } from 'framer-motion';
import { useState } from 'react';

// Custom SVG Icon
const UserIcon = () => (
  <svg className="w-full h-full p-12 sm:p-16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SpeakerCard = ({ speaker, onClick }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      className="bg-bg-card rounded-xl overflow-hidden border border-border-subtle cursor-pointer transition-all duration-300 hover:border-red-600 hover:-translate-y-2 hover:shadow-glow-red active:border-red-600 active:shadow-glow-red group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={() => onClick(speaker)}
      whileTap={{ scale: 0.98 }}
    >
      {/* Photo - Portrait orientation */}
      <div className="relative aspect-[3/4] overflow-hidden bg-bg-secondary">
        {!imageError ? (
          <img
            src={speaker.photo}
            alt={speaker.name}
            className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-text-muted">
            <UserIcon />
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Info - More compact */}
      <div className="p-3">
        <h3 className="text-sm sm:text-base font-bold font-heading text-white mb-0.5 line-clamp-2 leading-tight">
          {speaker.name}
        </h3>
        <p className="text-xs text-text-muted mb-0.5 line-clamp-1">{speaker.title}</p>
        <p className="text-xs text-accent-red mb-1 line-clamp-1 leading-tight">{speaker.institution}</p>
        <div className="flex items-center gap-1">
          <svg className="w-3 h-3 text-text-muted flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p className="text-xs text-text-secondary">{speaker.country}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default SpeakerCard;
