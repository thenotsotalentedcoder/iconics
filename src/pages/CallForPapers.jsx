import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import Button from '../components/common/Button';
import Timeline from '../components/common/Timeline';
import { tracks } from '../data/tracks';
import { importantDates } from '../data/dates';
import { motion } from 'framer-motion';
import { EXTERNAL_LINKS } from '../utils/constants';

const CallForPapers = () => {
  const [openTrack, setOpenTrack] = useState(null);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <SectionHeading
            title="Call for Papers"
            subtitle="Submit your research to ICONICS'26"
          />

          {/* Overview */}
          <section className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4">Overview</h3>
            <div className="text-text-secondary space-y-3 sm:space-y-4 text-sm sm:text-base">
              <p>
                ICONICS'26 invites original research contributions addressing theoretical, experimental, and
                application aspects of computer science and related fields.
              </p>
              <p>
                <strong className="text-white">Paper Types Accepted:</strong> Full papers (6-8 pages), Short papers (4 pages), and Posters
              </p>
              <p>
                <strong className="text-white">Review Process:</strong> Double-blind peer review by international experts
              </p>
              <p>
                <strong className="text-white">Publication:</strong> Accepted papers will be published in IEEE Conference Proceedings (subject to approval)
              </p>
            </div>
          </section>

          {/* Research Tracks */}
          <section className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-4 sm:mb-6">Research Tracks</h3>
            <div className="space-y-3 sm:space-y-4">
              {tracks.map((track) => (
                <motion.div
                  key={track.id}
                  className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => setOpenTrack(openTrack === track.id ? null : track.id)}
                    className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-bg-card-hover transition-colors"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span className="text-base sm:text-lg font-semibold text-white text-left">{track.name}</span>
                    </div>
                    <span className="text-accent-red text-xl sm:text-2xl flex-shrink-0">
                      {openTrack === track.id ? '−' : '+'}
                    </span>
                  </button>

                  {openTrack === track.id && (
                    <motion.div
                      className="px-4 sm:px-6 pb-6"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                    >
                      <div className="flex flex-wrap gap-2 pt-3 sm:pt-4 border-t border-border-subtle">
                        {track.topics.map((topic, index) => (
                          <span
                            key={index}
                            className="px-2.5 sm:px-3 py-1 bg-bg-secondary text-text-secondary rounded-full text-xs sm:text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </section>

          {/* Submission Guidelines */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold font-heading text-white mb-4">Submission Guidelines</h3>
            <div className="bg-bg-card border border-border-subtle rounded-lg p-6">
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">•</span>
                  <span><strong className="text-white">Format:</strong> IEEE Conference format (template will be provided)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">•</span>
                  <span><strong className="text-white">Length:</strong> Full papers (6-8 pages), Short papers (4 pages)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">•</span>
                  <span><strong className="text-white">Submission System:</strong> EasyChair</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">•</span>
                  <span><strong className="text-white">Review:</strong> Double-blind peer review</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-red mr-2">•</span>
                  <span><strong className="text-white">Notification:</strong> Authors will be notified via email</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Important Dates */}
          <section className="mb-16">
            <h3 className="text-2xl font-bold font-heading text-white mb-6">Important Dates</h3>
            <Timeline items={importantDates} />
          </section>

          {/* Submit Button */}
          <div className="text-center">
            <Button
              variant="primary"
              size="lg"
              href={EXTERNAL_LINKS.EASYCHAIR}
              external
            >
              Submit Your Paper via EasyChair
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default CallForPapers;
