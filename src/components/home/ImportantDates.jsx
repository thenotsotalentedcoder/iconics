import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { importantDates } from '../../data/dates';

const ImportantDates = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-bg-dark relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Header */}
          <div>
            <motion.span
              className="inline-block text-accent text-sm font-semibold tracking-wider uppercase mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Timeline
            </motion.span>
            <motion.h2
              className="text-display font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Important Dates
            </motion.h2>
            <motion.p
              className="text-lg text-text-muted"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Mark your calendar for these key milestones. Don't miss the submission deadlines.
            </motion.p>
          </div>

          {/* Right - Timeline */}
          <div className="space-y-4">
            {importantDates.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-8 group"
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                {/* Timeline line */}
                {index < importantDates.length - 1 && (
                  <div className="absolute left-[11px] top-10 bottom-0 w-px bg-white/10" />
                )}
                
                {/* Dot */}
                <div className="absolute left-0 top-3 w-6 h-6 rounded-full bg-bg-card border-2 border-accent flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                </div>

                {/* Card */}
                <div className="bg-bg-card rounded-xl p-5 border border-white/5 hover:border-accent/30 transition-all duration-300 group-hover:bg-bg-card-hover">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-text-muted mt-1">{item.description}</p>
                      )}
                    </div>
                    <div className="text-accent font-semibold text-sm whitespace-nowrap">
                      {item.date}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantDates;
