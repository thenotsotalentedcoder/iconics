import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { motion, AnimatePresence } from 'framer-motion';
import { EXTERNAL_LINKS } from '../utils/constants';

const editions = [
  {
    year: '2016',
    label: "ICONICS'16",
    date: 'December 15–16, 2016',
    edition: '1st Edition',
    venue: 'NED University, Karachi',
    description:
      'The inaugural ICONICS brought together national and international researchers to discuss innovations in computer science and software engineering.',
    highlights: ['First international conference by NED CS&IT', 'National & international speakers', 'Proceedings published in NED Journal of Research'],
    resources: [
      { label: "Proceedings (PDF)", href: EXTERNAL_LINKS.PROCEEDINGS_2016, type: 'pdf' },
      { label: "NED Journal Archives", href: EXTERNAL_LINKS.NED_JOURNAL, type: 'link' },
    ],
    photoCount: 9,
  },
  {
    year: '2018',
    label: "ICONICS'18",
    date: 'December 5–6, 2018',
    edition: '2nd Edition',
    venue: 'NED University, Karachi',
    description:
      'Expanded international participation with a stronger focus on AI, machine learning, and emerging computing technologies.',
    highlights: ['Expanded international participation', 'AI & ML focus tracks', 'Proceedings published'],
    resources: [
      { label: "Proceedings (PDF)", href: EXTERNAL_LINKS.PROCEEDINGS_2018, type: 'pdf' },
    ],
    photoCount: 9,
  },
  {
    year: '2022',
    label: "ICONICS'22",
    date: 'December 14–15, 2022',
    edition: '3rd Edition',
    venue: 'NED University, Karachi',
    description:
      'The first IEEE-published edition of ICONICS, featuring dedicated tracks for quantum computing and cybersecurity alongside classical CS domains.',
    highlights: ['Published in IEEE Xplore', 'Quantum computing track introduced', 'Cybersecurity & blockchain sessions'],
    resources: [
      { label: "IEEE Xplore Proceedings", href: EXTERNAL_LINKS.IEEE_ICONICS_22, type: 'ieee' },
    ],
    photoCount: 9,
  },
  {
    year: '2024',
    label: "ICONICS'24",
    date: 'November 13–14, 2024',
    edition: '4th Edition',
    venue: 'NED University, Karachi',
    description:
      'The most recent edition, emphasising generative AI, edge computing, and cryptocurrency. Featured 9 keynote and workshop speakers from 5 countries.',
    highlights: ['9 international keynote & workshop speakers', 'Quantum Technologies Workshop', 'NLP & Contrastive Learning Workshop', 'Generative AI focus'],
    resources: [
      { label: "Conference Website", href: 'https://www.nediconics.com', type: 'link' },
    ],
    photoCount: 9,
  },
];

const ResourceBadge = ({ resource }) => {
  const icons = {
    pdf: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    ieee: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    link: (
      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    ),
  };

  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-secondary border border-border-subtle hover:border-accent/40 hover:text-accent text-text-muted text-xs font-medium transition-all duration-200"
    >
      {icons[resource.type]}
      {resource.label}
    </a>
  );
};

const Gallery = () => {
  const [activeYear, setActiveYear] = useState('2024');

  const activeEdition = editions.find(e => e.year === activeYear);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 bg-bg-darker">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <SectionHeading
            title="Gallery & Archive"
            subtitle="A complete record of all ICONICS editions"
          />

          {/* Year Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {editions.map((ed) => (
              <button
                key={ed.year}
                onClick={() => setActiveYear(ed.year)}
                className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                  activeYear === ed.year
                    ? 'bg-accent text-white shadow-glow'
                    : 'bg-bg-card border border-border-subtle text-text-muted hover:text-white hover:border-accent/40'
                }`}
              >
                {ed.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeYear}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {/* Edition Info */}
              <div className="grid lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 bg-bg-card border border-border-subtle rounded-xl p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-bold tracking-widest text-accent uppercase">{activeEdition.edition}</span>
                    <span className="w-1 h-1 rounded-full bg-border-subtle" />
                    <span className="text-text-muted text-xs">{activeEdition.date}</span>
                    <span className="w-1 h-1 rounded-full bg-border-subtle" />
                    <span className="text-text-muted text-xs">{activeEdition.venue}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3">{activeEdition.label}</h2>
                  <p className="text-text-muted leading-relaxed mb-5">{activeEdition.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {activeEdition.resources.map((r, i) => (
                      <ResourceBadge key={i} resource={r} />
                    ))}
                  </div>
                </div>

                <div className="bg-bg-card border border-border-subtle rounded-xl p-6">
                  <p className="text-xs font-semibold tracking-wider text-text-muted uppercase mb-4">Highlights</p>
                  <ul className="space-y-3">
                    {activeEdition.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Photo Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 mb-4">
                {Array.from({ length: activeEdition.photoCount }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="bg-bg-card border border-border-subtle rounded-lg overflow-hidden aspect-video hover:border-accent/40 transition-all duration-200 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{ y: -3 }}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center bg-bg-secondary group-hover:bg-bg-card-hover transition-colors">
                      <svg className="w-8 h-8 text-border-subtle mb-2 group-hover:text-accent/30 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-text-muted text-xs">{activeEdition.label} · Photo {i + 1}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <p className="text-center text-text-muted text-xs mb-12">
                Photos will be added as the conference approaches.
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Full Archive Summary */}
          <section className="border-t border-border-subtle pt-12">
            <h3 className="text-xl font-bold text-white mb-6">Complete Archive</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {editions.map((ed) => (
                <motion.div
                  key={ed.year}
                  className="bg-bg-card border border-border-subtle rounded-xl p-5 hover:border-accent/30 transition-all duration-200 cursor-pointer group"
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveYear(ed.year)}
                >
                  <div className="text-3xl font-bold text-accent/40 group-hover:text-accent/70 transition-colors mb-2 font-mono">
                    '{ed.year.slice(2)}
                  </div>
                  <h4 className="text-white font-semibold mb-1">{ed.edition}</h4>
                  <p className="text-text-muted text-xs mb-3">{ed.date}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {ed.resources.map((r, i) => (
                      <a
                        key={i}
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className="text-xs text-accent hover:underline"
                      >
                        {r.label} →
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Gallery;
