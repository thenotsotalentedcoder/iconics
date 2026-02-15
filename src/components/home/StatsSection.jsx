import AnimatedCounter from '../common/AnimatedCounter';
import { stats } from '../../data/stats';

const StatsSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-bg-secondary">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 md:gap-12 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="relative">
              <AnimatedCounter
                end={stat.end}
                suffix={stat.suffix}
                prefix={stat.prefix || ''}
                label={stat.label}
              />
              {index < stats.length - 1 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-20 bg-border-subtle" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
