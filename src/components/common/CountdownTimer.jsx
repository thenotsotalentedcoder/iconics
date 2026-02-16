import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate) - new Date();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="relative h-16 sm:h-20 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-accent font-bold text-text-primary tabular-nums"
          >
            {String(value).padStart(2, '0')}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="text-xs sm:text-sm text-text-muted uppercase tracking-wider mt-1">
        {label}
      </div>
    </div>
  );

  return (
    <div className="flex gap-4 sm:gap-6 md:gap-8 justify-center items-center">
      <TimeUnit value={timeLeft.days} label="Days" />
      <div className="text-3xl sm:text-4xl text-text-muted">:</div>
      <TimeUnit value={timeLeft.hours} label="Hours" />
      <div className="text-3xl sm:text-4xl text-text-muted">:</div>
      <TimeUnit value={timeLeft.minutes} label="Min" />
      <div className="text-3xl sm:text-4xl text-text-muted">:</div>
      <TimeUnit value={timeLeft.seconds} label="Sec" />
    </div>
  );
};

export default CountdownTimer;
