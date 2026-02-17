import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { tracks } from '../../data/tracks';
import { Link } from 'react-router-dom';

const TrackCard = ({ track, index }) => {
  return (
    <motion.div
      className="group relative bg-bg-card rounded-2xl border border-white/5 hover:border-accent/30 overflow-hidden transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-6 lg:p-8">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-3xl mb-5 group-hover:bg-accent/20 transition-colors duration-300">
          {track.icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-accent transition-colors duration-300">
          {track.name}
        </h3>

        {/* Topics */}
        <div className="space-y-2 mb-4">
          {track.topics.slice(0, 3).map((topic, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-text-muted">
              <div className="w-1 h-1 bg-accent rounded-full" />
              {topic}
            </div>
          ))}
          {track.topics.length > 3 && (
            <div className="text-xs text-text-muted/60">
              +{track.topics.length - 3} more topics
            </div>
          )}
        </div>

        {/* Learn More */}
        <div className="flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all duration-300">
          <span>Explore</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent-light to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

const TracksSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-bg-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <motion.span
            className="inline-block text-accent text-sm font-semibold tracking-wider uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Research Areas
          </motion.span>
          <motion.h2
            className="text-display font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Conference Tracks
          </motion.h2>
          <motion.p
            className="text-lg text-text-muted"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Submit your research across 8 specialized tracks covering cutting-edge computer science domains.
          </motion.p>
        </div>

        {/* Tracks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tracks.slice(0, 8).map((track, index) => (
            <TrackCard key={track.id} track={track} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            to="/callforpapers"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-glow"
          >
            Submit Your Paper
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default TracksSection;
