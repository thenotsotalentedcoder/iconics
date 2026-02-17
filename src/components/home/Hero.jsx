import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import HeroBackground from '../animations/HeroNetwork';
import { Link } from 'react-router-dom';

// Countdown Timer Component
const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className="flex gap-6 md:gap-8">
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="text-center">
          <motion.div
            className="relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="w-20 h-20 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-2xl bg-bg-card border border-white/10 flex items-center justify-center backdrop-blur-sm">
              <motion.span
                key={unit.value}
                className="text-3xl md:text-5xl lg:text-6xl font-bold text-accent"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
            </div>
          </motion.div>
          <span className="text-sm md:text-base text-text-muted mt-3 block">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};

const Hero = () => {
  // Conference date: October 10, 2026
  const conferenceDate = '2026-10-10T09:00:00';

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-dark">
      {/* Animated Background */}
      <HeroBackground />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-12 py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
                October 10-11, 2026 • NED University
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h1 className="text-hero font-bold leading-[1.1] tracking-tight">
                <span className="gradient-text">iCONICS</span>
                <span className="text-white">'26</span>
              </h1>
              <p className="text-xl md:text-2xl text-text-muted mt-4">
                International Conference on Innovations in Computer Science
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg text-text-muted max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Present cutting-edge research and connect with global experts 
              at NED University, Karachi.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link
                to="/callforpapers"
                className="inline-flex items-center justify-center px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-glow group"
              >
                Submit Paper
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:border-accent/50 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/5"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Countdown Timer */}
          <motion.div
            className="flex flex-col items-center lg:items-start justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="text-center lg:text-left mb-8">
              <h3 className="text-white text-xl font-semibold mb-1">Conference Starts In</h3>
              <p className="text-text-muted">October 10-11, 2026</p>
            </div>
            <CountdownTimer targetDate={conferenceDate} />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs text-text-muted uppercase tracking-wider">Scroll</span>
          <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
