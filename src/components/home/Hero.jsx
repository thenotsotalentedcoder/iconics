import { motion } from 'framer-motion';
import HeroBackground from '../animations/HeroNetwork';
import { Link } from 'react-router-dom';

const Hero = () => {
  const statsData = [
    { value: '150+', label: 'Papers' },
    { value: '20+', label: 'Countries' },
    { value: '50+', label: 'Speakers' },
  ];

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
                <span className="text-white">Advance </span>
                <span className="gradient-text">Computer Science</span>
                <br />
                <span className="text-white">Research</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Join the International Conference on Innovations in Computer Science. 
              Present cutting-edge research and connect with global experts.
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

            {/* Stats */}
            <motion.div
              className="flex gap-8 pt-8 border-t border-white/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {statsData.map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
                  <div className="text-sm text-text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Content - Feature Image/Visual */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main visual card */}
              <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-bg-card to-bg-dark border border-white/10 p-8 shadow-large">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-600/10 rounded-full blur-3xl" />
                
                {/* Content */}
                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">iCONICS 2026</h3>
                      <p className="text-text-muted text-sm">International Conference</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-text-muted">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>NED University, Karachi</span>
                    </div>
                    <div className="flex items-center gap-3 text-text-muted">
                      <svg className="w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>October 10-11, 2026</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <p className="text-sm text-text-muted">8 Research Tracks covering AI, Security, Cloud Computing, and more.</p>
                  </div>
                </div>
              </div>

              {/* Floating accent element */}
              <motion.div
                className="absolute -bottom-6 -left-6 w-24 h-24 rounded-2xl bg-accent/20 backdrop-blur-sm border border-accent/30"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
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
