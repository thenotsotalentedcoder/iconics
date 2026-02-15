import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { motion } from 'framer-motion';
import { EXTERNAL_LINKS } from '../utils/constants';

const Gallery = () => {
  const [activeYear, setActiveYear] = useState('2024');

  const years = ['2016', '2018', '2022', '2024'];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <SectionHeading
            title="Gallery"
            subtitle="Moments from past ICONICS conferences"
          />

          {/* Year Tabs */}
          <div className="flex justify-center gap-4 mb-3 sm:mb-4 sm:mb-6 sm:mb-8 sm:mb-12">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-4 sm:px-6 py-2 rounded-full font-semibold transition-all ${
                  activeYear === year
                    ? 'bg-accent-red text-white'
                    : 'bg-bg-card text-text-secondary hover:text-white'
                }`}
              >
                ICONICS '{year.slice(2)}
              </button>
            ))}
          </div>

          {/* Placeholder for images */}
          <motion.div
            key={activeYear}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-3 sm:mb-4 sm:mb-6 sm:mb-8 sm:mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:p-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                <motion.div
                  key={item}
                  className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden aspect-video hover:border-accent-red transition-all cursor-pointer group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item * 0.05 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="w-full h-full flex items-center justify-center bg-bg-secondary group-hover:bg-bg-card-hover transition-colors">
                    <div className="text-center">
                      <div className="text-6xl mb-2">📸</div>
                      <p className="text-text-muted text-sm">ICONICS '{activeYear.slice(2)} Photo {item}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Archive Section */}
          <section className="bg-bg-card border border-border-subtle rounded-lg p-5 sm:p-4 sm:p-6 md:p-8">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4 sm:mb-6">Conference Archives</h3>
            <div className="grid md:grid-cols-2 gap-4 sm:p-6">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Proceedings</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href={EXTERNAL_LINKS.PROCEEDINGS_2016}
                      className="text-accent-red hover:underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ICONICS'16 Proceedings (PDF) →
                    </a>
                  </li>
                  <li>
                    <a
                      href={EXTERNAL_LINKS.PROCEEDINGS_2018}
                      className="text-accent-red hover:underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ICONICS'18 Proceedings (PDF) →
                    </a>
                  </li>
                  <li>
                    <a
                      href={EXTERNAL_LINKS.IEEE_ICONICS_22}
                      className="text-accent-red hover:underline flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      ICONICS'22 IEEE Xplore →
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-white mb-3">Media Coverage</h4>
                <p className="text-text-secondary text-sm">
                  Links to news articles and media coverage will be added here.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Gallery;
