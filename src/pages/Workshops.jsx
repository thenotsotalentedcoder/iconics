import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { workshops } from '../data/workshops';

const ExternalLinkIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

const ChevronIcon = ({ open }) => (
  <svg
    className={`w-5 h-5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const SessionCard = ({ session, index }) => {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      className="border border-border-subtle rounded-xl overflow-hidden bg-bg-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <button
        className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-bg-card-hover transition-colors duration-200"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold tracking-widest text-accent/60 uppercase w-6 shrink-0">
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <h4 className="text-text-primary font-semibold text-base sm:text-lg">{session.title}</h4>
            <p className="text-text-muted text-sm mt-0.5">{session.instructor.name}</p>
          </div>
        </div>
        <span className="text-text-muted ml-4 shrink-0">
          <ChevronIcon open={open} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 border-t border-border-subtle">
              {/* Instructor info */}
              <div className="flex items-center gap-4 py-5">
                <div className="w-14 h-14 rounded-full bg-bg-secondary border border-border-subtle overflow-hidden shrink-0">
                  <img
                    src={session.instructor.photo}
                    alt={session.instructor.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div>
                  <p className="text-text-primary font-semibold">{session.instructor.name}</p>
                  <p className="text-text-muted text-sm">{session.instructor.title}</p>
                  <p className="text-accent text-sm">{session.instructor.institution}</p>
                </div>
              </div>

              {/* Topics */}
              <div>
                <p className="text-xs font-semibold tracking-wider text-text-muted uppercase mb-3">Topics Covered</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {session.topics.map((topic, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-text-muted">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                      {topic}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const WorkshopCard = ({ workshop, index }) => (
  <motion.section
    className="mb-16 lg:mb-24"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    {/* Workshop header */}
    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8 pb-8 border-b border-border-subtle">
      <div className="max-w-2xl">
        <span className="text-xs font-bold tracking-widest text-accent uppercase mb-3 block">
          Workshop {String(workshop.id).padStart(2, '0')}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3 leading-snug">
          {workshop.title}
        </h2>
        <p className="text-accent text-sm font-medium mb-4">{workshop.tagline}</p>
        <p className="text-text-muted leading-relaxed">{workshop.description}</p>

        {workshop.targetAudience && (
          <div className="mt-4 p-4 rounded-lg bg-bg-card border border-border-subtle">
            <p className="text-xs font-semibold tracking-wider text-text-muted uppercase mb-1">Target Audience</p>
            <p className="text-sm text-text-muted">{workshop.targetAudience}</p>
          </div>
        )}
      </div>

      <div className="shrink-0">
        <a
          href={workshop.registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-light text-text-primary font-semibold rounded-lg transition-all duration-300 hover:shadow-glow text-sm"
        >
          Register for Workshop
          <ExternalLinkIcon />
        </a>
      </div>
    </div>

    {/* Learning outcomes (NLP only) */}
    {workshop.learningOutcomes && (
      <div className="mb-8">
        <h3 className="text-text-primary font-semibold mb-4">Learning Outcomes</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {workshop.learningOutcomes.map((outcome, i) => (
            <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-bg-card border border-border-subtle">
              <span className="w-5 h-5 rounded-full bg-accent/20 text-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-text-muted">{outcome}</p>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Sessions */}
    <div>
      <h3 className="text-text-primary font-semibold mb-4">
        {workshop.sessions.length > 1 ? `Sessions (${workshop.sessions.length})` : 'Session Details'}
      </h3>
      <div className="space-y-3">
        {workshop.sessions.map((session, i) => (
          <SessionCard key={session.id} session={session} index={i} />
        ))}
      </div>
    </div>
  </motion.section>
);

const Workshops = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          <SectionHeading
            title="Workshops"
            subtitle="Hands-on technical sessions led by world-class researchers"
          />

          {/* Info bar */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-12 p-5 rounded-xl bg-bg-card border border-border-subtle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider">Date</p>
                <p className="text-text-primary text-sm font-medium">October 10–11, 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider">Venue</p>
                <p className="text-text-primary text-sm font-medium">NED University, Karachi</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </span>
              <div>
                <p className="text-xs text-text-muted uppercase tracking-wider">Workshops</p>
                <p className="text-text-primary text-sm font-medium">{workshops.length} Workshops Available</p>
              </div>
            </div>
          </motion.div>

          {/* Workshop listings */}
          {workshops.map((workshop, index) => (
            <WorkshopCard key={workshop.id} workshop={workshop} index={index} />
          ))}
        </div>
      </div>
    </PageTransition>
  );
};

export default Workshops;
