import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { importantDates as staticDates } from '../../data/dates';
import { useApiData } from '../../hooks/useApiData';
import { api } from '../../utils/api';

const ImportantDates = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const { data: importantDates } = useApiData(api.getDates, staticDates);

  return (
    <section ref={ref} className="py-16 lg:py-24 bg-[#0D1F25]/90 relative overflow-hidden backdrop-blur-sm">
      
      {/* --- GEOMETRIC MATHEMATICAL BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Animated Moving Grid */}
        <svg width="100%" height="100%" className="absolute inset-0 opacity-[0.12]">
          <pattern id="mathGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#5AA8A3" strokeWidth="0.5" />
            <circle cx="0" cy="0" r="0.8" fill="#5AA8A3" />
          </pattern>
          <motion.rect 
            width="100%" height="100%" fill="url(#mathGrid)" 
            animate={{ x: [-40, 0], y: [-40, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </svg>

        {/* Floating Geometric Outline */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 border border-[#3E8B87]/10 rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-16 items-start">
          
          {/* Left — Scaled Down Header */}
          <div className="lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-3 mb-4"
            >
              <div className="h-[1px] w-8 bg-[#5AA8A3]" />
              <span className="text-[#5AA8A3] text-[10px] font-black tracking-[0.5em] uppercase">
                Timeline // 2026
              </span>
            </motion.div>

            <motion.h2
              className="text-5xl lg:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]"
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
            >
              Important<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>Dates</span>
            </motion.h2>

            <motion.p
              className="text-sm lg:text-base text-white/40 max-w-xs leading-relaxed border-l border-white/10 pl-5"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
            >
              Mark your calendar for these key milestones. Don't miss the submission deadlines for the upcoming summit.
            </motion.p>
          </div>

          {/* Right — Timeline (Maintained Original Layout) */}
          <div className="space-y-4">
            {importantDates.map((item, index) => (
              <motion.div
                key={index}
                className="relative pl-10 group"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                {/* Vertical Connector */}
                {index < importantDates.length - 1 && (
                  <div className="absolute left-[15px] top-10 bottom-[-16px] w-[1px] bg-gradient-to-b from-white/10 via-white/5 to-transparent group-hover:from-[#5AA8A3]/40 transition-colors" />
                )}

                {/* Neural Pulsing Node */}
                <div className="absolute left-0 top-3.5 w-8 h-8 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#fff] relative z-10" />
                  <motion.div 
                    animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-[#5AA8A3] rounded-full"
                  />
                </div>

                {/* Card — Teal Glassmorphism */}
                <div className="bg-white/[0.03] backdrop-blur-md rounded-sm p-5 border border-white/5 hover:border-[#5AA8A3]/30 transition-all duration-300 relative overflow-hidden group-hover:bg-white/[0.05]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-lg text-white group-hover:text-[#5AA8A3] transition-colors tracking-tight">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs text-white/30 mt-1.5 leading-relaxed group-hover:text-white/50 transition-colors">
                          {item.description}
                        </p>
                      )}
                    </div>
                    
                    {/* Date Tag */}
                    <div className="shrink-0 bg-[#3E8B87]/10 px-3 py-1 border border-[#3E8B87]/20 rounded-sm">
                      <span className="text-[#5AA8A3] font-black text-[11px] tracking-tight tabular-nums">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  
                  {/* Geometric Corner Detail */}
                  <div className="absolute bottom-0 right-0 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 right-2 w-[1px] h-3 bg-[#5AA8A3]" />
                    <div className="absolute bottom-2 right-2 h-[1px] w-3 bg-[#5AA8A3]" />
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