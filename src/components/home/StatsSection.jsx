import AnimatedCounter from '../common/AnimatedCounter';
import { stats } from '../../data/stats';

const TEAL = '#3E8B87';

const StatsSection = () => {
  return (
    /* Changed to bg-transparent and relative to ensure it layers correctly over the canvas */
    <section className="relative py-10 sm:py-14 md:py-20 bg-transparent overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="relative p-5 rounded-2xl transition-all duration-500 hover:bg-white/50 backdrop-blur-[2px]"
            >
              <AnimatedCounter
                end={stat.end}
                suffix={stat.suffix}
                prefix={stat.prefix || ''}
                label={stat.label}
                // If your AnimatedCounter supports custom styling, 
                // ensure the text color is high-contrast against the canvas
              />
              
              {/* Divider Logic: Updated to use a subtle Teal gradient */}
              {index < stats.length - 1 && (
                <div 
                  className="hidden sm:block absolute right-[-1.5rem] md:right-[-2.5rem] top-1/2 -translate-y-1/2 w-px h-16 opacity-20" 
                  style={{ 
                    background: `linear-gradient(to bottom, transparent, ${TEAL}, transparent)` 
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;