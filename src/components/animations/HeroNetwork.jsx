import { motion } from 'framer-motion';

const HeroBackground = () => {
  const orbs = [
    { size: 600, x: '70%', y: '20%', delay: 0, duration: 20 },
    { size: 400, x: '20%', y: '60%', delay: 2, duration: 25 },
    { size: 300, x: '80%', y: '70%', delay: 4, duration: 22 },
    { size: 200, x: '10%', y: '20%', delay: 1, duration: 18 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Cream base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-dark" />

      {/* Animated burgundy orbs — soft and warm */}
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(128, 0, 42, 0.10) 0%, rgba(128, 0, 42, 0.04) 40%, transparent 70%)`,
            filter: 'blur(48px)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: orb.duration,
            delay: orb.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Subtle warm grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(128, 0, 42, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(128, 0, 42, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg-primary to-transparent" />
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-primary to-transparent" />
    </div>
  );
};

export default HeroBackground;
