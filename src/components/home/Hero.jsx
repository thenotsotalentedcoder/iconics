import { motion } from 'framer-motion';
import HeroNetwork from '../animations/HeroNetwork';
import CountdownTimer from '../common/CountdownTimer';
import MagneticButton from '../common/MagneticButton';

const Hero = () => {
  // Conference date: October 10, 2026
  const conferenceDate = new Date('2026-10-10T09:00:00');

  const statsData = [
    { value: '500+', label: 'Attendees Expected' },
    { value: '50+', label: 'International Speakers' },
    { value: '8', label: 'Research Tracks' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary">
      {/* Three.js Network Background */}
      <HeroNetwork />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center py-20">
        {/* Main Heading - Brutalist Typography */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-heading text-hero leading-none tracking-tight">
            <span className="text-accent-dark">i</span>
            <span className="text-text-primary">CONICS</span>
            <br />
            <span className="text-accent-dark">'26</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-4xl mx-auto mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          International Conference on Innovations in Computer Science
        </motion.p>

        {/* Location & Date */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 text-text-muted text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            NED University, Karachi
          </span>
          <span>•</span>
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            October 10-11, 2026
          </span>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <CountdownTimer targetDate={conferenceDate} />
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 mb-12 py-8 border-t border-b border-border-light"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl md:text-5xl font-accent font-bold text-accent-dark mb-2">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-text-muted uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <MagneticButton href="/callforpapers" variant="primary">
            Submit Your Paper
          </MagneticButton>
          <MagneticButton href="/speakers" variant="secondary">
            View Speakers
          </MagneticButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2 cursor-pointer"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs text-text-muted uppercase tracking-wider">Explore</span>
            <svg className="w-6 h-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
