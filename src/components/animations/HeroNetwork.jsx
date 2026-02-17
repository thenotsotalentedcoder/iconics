import { motion } from 'framer-motion';

const HeroBackground = () => {
  // Create floating orbs for visual interest
  const orbs = [
    { size: 600, x: '70%', y: '20%', delay: 0, duration: 20 },
    { size: 400, x: '20%', y: '60%', delay: 2, duration: 25 },
    { size: 300, x: '80%', y: '70%', delay: 4, duration: 22 },
    { size: 200, x: '10%', y: '20%', delay: 1, duration: 18 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-bg-dark via-bg-dark to-bg-darker" />
      
      {/* Animated gradient orbs */}
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, rgba(20, 184, 166, 0.15) 0%, rgba(20, 184, 166, 0.05) 40%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
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

      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-bg-dark to-transparent" />
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg-dark to-transparent" />
    </div>
  );
};

export default HeroBackground;
