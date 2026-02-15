import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const AnimatedCounter = ({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  label
}) => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-accent text-red-600 mb-1 sm:mb-2">
        {inView && (
          <CountUp
            end={end}
            duration={duration}
            suffix={suffix}
            prefix={prefix}
          />
        )}
      </div>
      <div className="text-text-muted text-xs sm:text-sm uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

export default AnimatedCounter;
