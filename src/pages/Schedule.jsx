import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { day1Schedule, day2Schedule } from '../data/schedule';
import { motion } from 'framer-motion';

const Schedule = () => {
  const [activeDay, setActiveDay] = useState(1);

  const schedule = activeDay === 1 ? day1Schedule : day2Schedule;

  const getTypeColor = (type) => {
    switch (type) {
      case 'keynote':
        return 'border-red-600 bg-red-600/10';
      case 'session':
        return 'border-blue-600 bg-blue-600/10';
      case 'workshop':
        return 'border-green-600 bg-green-600/10';
      case 'ceremony':
        return 'border-yellow-600 bg-yellow-600/10';
      case 'break':
        return 'border-gray-600 bg-gray-600/10';
      default:
        return 'border-border-subtle bg-bg-card';
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <SectionHeading
            title="Conference Schedule"
            subtitle="October 10-11, 2026"
          />

          {/* Day Toggle */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <button
              onClick={() => setActiveDay(1)}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                activeDay === 1
                  ? 'bg-accent-red text-white shadow-glow-red'
                  : 'bg-bg-card text-text-secondary hover:text-white'
              }`}
            >
              Day 1 - October 10
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                activeDay === 2
                  ? 'bg-accent-red text-white shadow-glow-red'
                  : 'bg-bg-card text-text-secondary hover:text-white'
              }`}
            >
              Day 2 - October 11
            </button>
          </div>

          {/* Schedule Timeline */}
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 sm:space-y-6"
          >
            {schedule.map((item, index) => (
              <motion.div
                key={index}
                className={`border-l-4 ${getTypeColor(item.type)} rounded-r-lg p-4 sm:p-6 hover:shadow-lg transition-all`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-3 sm:gap-4">
                  {/* Time */}
                  <div className="md:w-40 flex-shrink-0">
                    <p className="text-accent-red font-bold font-accent text-sm sm:text-base">{item.time}</p>
                    <p className="text-text-muted text-xs sm:text-sm mt-1">{item.location}</p>
                  </div>

                  {/* Event Details */}
                  <div className="flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{item.event}</h3>
                    {item.speaker && (
                      <p className="text-text-secondary mb-1 sm:mb-2 text-sm sm:text-base">
                        <span className="text-accent-red">Speaker:</span> {item.speaker}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-text-secondary text-sm sm:text-base">{item.description}</p>
                    )}
                    {item.papers && (
                      <div className="mt-3">
                        <p className="text-text-muted text-sm">
                          {item.papers.length} paper presentations
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Type Badge */}
                  <div className="md:w-32 flex-shrink-0">
                    <span className="inline-block px-3 py-1 bg-bg-secondary text-text-secondary rounded-full text-xs uppercase tracking-wider">
                      {item.type}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Workshop Info */}
          {activeDay === 2 && (
            <div className="mt-16 bg-bg-card border border-border-subtle rounded-lg p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Workshops</h3>
              <p className="text-text-secondary mb-4">
                Two parallel workshops will be conducted on Day 2. Attendees can choose one workshop to participate in.
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-bg-secondary rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Quantum Technologies Workshop</h4>
                  <p className="text-text-muted text-sm mb-2">Instructor: Dr. Manzoor Ikram</p>
                  <p className="text-text-secondary text-sm">Hands-on introduction to quantum computing principles and applications</p>
                </div>
                <div className="bg-bg-secondary rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-2">NLP Workshop</h4>
                  <p className="text-text-muted text-sm mb-2">Instructor: Prof. Dr. Muhammad Rafi</p>
                  <p className="text-text-secondary text-sm">Practical natural language processing techniques and tools</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Schedule;
