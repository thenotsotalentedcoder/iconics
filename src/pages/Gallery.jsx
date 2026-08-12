import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PageBackground from '../components/animations/PageBackground';
import { motion, AnimatePresence } from 'framer-motion';
import { EXTERNAL_LINKS } from '../utils/constants';

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const editions = [
  {
    year: '2016',
    label: "ICONICS'16",
    edition: '1st Edition',
    date: 'December 15–16, 2016',
    venue: 'NED University, Karachi',
    theme: 'Artificial Intelligence, IoT & Emerging Computing',
    summary:
      'The inaugural ICONICS brought together researchers from Pakistan, USA, UK, Malaysia, and New Zealand. With 73 submissions and a rigorous 26% acceptance rate, it established ICONICS as a serious academic forum. Topics spanned Artificial Intelligence, IoT, Data Mining, and Computer Networks, with a Social Network Analysis workshop. Proceedings were published in the NED Journal of Research.',
    stats: [
      { label: 'Papers Submitted', value: '73' },
      { label: 'Papers Accepted', value: '19' },
      { label: 'Acceptance Rate', value: '26%' },
      { label: 'Countries', value: '5' },
    ],
    speakers: [
      { name: 'Prof. Dr. Junaid Ahmed Zubairi', institution: 'SUNY, USA' },
      { name: 'Prof. Dr. Nasreen Badruddin', institution: 'UTP, Malaysia' },
      { name: 'Dr. Muhammad Atif Tahir', institution: 'Northumbria University, UK' },
      { name: 'Dr. Syed Saad Azhar Ali', institution: 'UTP, Malaysia' },
      { name: 'Dr. Syed Faraz Hassan', institution: 'Massey University, New Zealand' },
    ],
    workshops: ['Social Network Analysis Workshop'],
    highlights: [
      'Inaugural edition — 1st international CS conference by NED',
      '73 submissions from 4 countries, 26% acceptance rate',
      'Chief Guest: Mr. Jam Mehtab Dahar, Minister of Education Sindh',
      'Published in NED Journal of Research (Special Issue)',
      'Sponsored by HEC Pakistan, USEFP, and Pak Suzuki',
    ],
    resources: [
      { label: 'Proceedings (PDF)', href: EXTERNAL_LINKS.PROCEEDINGS_2016, type: 'pdf' },
      { label: 'NED Journal Archives', href: EXTERNAL_LINKS.NED_JOURNAL, type: 'link' },
    ],
    // Drop 5-6 images as /images/archive/2016/1.jpg, 2.jpg, etc.
    photos: [
      '/images/archive/2016/1.jpg',
      '/images/archive/2016/2.jpg',
      '/images/archive/2016/3.jpg',
      '/images/archive/2016/4.jpg',
      '/images/archive/2016/5.jpg',
      '/images/archive/2016/6.jpg',
    ],
  },
  {
    year: '2018',
    label: "ICONICS'18",
    edition: '2nd Edition',
    date: 'December 5–6, 2018',
    venue: 'NED University, Karachi',
    theme: 'ICT Innovation & Cross-Cultural Research Exchange',
    summary:
      'The second edition expanded ICONICS\'s international footprint significantly, drawing submissions from 8 countries including Germany, Italy, Jordan, and Saudi Arabia. Six international keynote speakers presented across sessions covering ICT innovation and cross-cultural research collaboration. Proceedings were published in a dedicated volume.',
    stats: [
      { label: 'Papers Submitted', value: '42' },
      { label: 'Papers Presented', value: '16' },
      { label: 'Countries', value: '8' },
      { label: 'Keynote Speakers', value: '6' },
    ],
    speakers: [
      { name: 'Dr. Kayyali Mohamed', institution: '4D Business Consulting, USA' },
      { name: 'Prof. Dr. Agathe Merceron', institution: 'Beuth University, Germany' },
      { name: 'Dr. Eric Atwell', institution: 'University of Leeds, UK' },
      { name: 'Dr. Siva Kumar Subramaniam', institution: 'UTP, Malaysia' },
      { name: 'Dr. Asad Masood Khattak', institution: 'Zayed University, UAE' },
      { name: 'Dr.-Ing Syed Saqib Bukhari', institution: 'Germany' },
    ],
    workshops: [],
    highlights: [
      'International participation from 8 countries',
      '6 international keynote speakers',
      'Sessions on AI, ML, and emerging computing technologies',
      'Patron: Dr. Sarosh Hashmat Lodi, VC NED University',
      'Dedicated proceedings volume published',
    ],
    resources: [
      { label: 'Proceedings (PDF)', href: EXTERNAL_LINKS.PROCEEDINGS_2018, type: 'pdf' },
    ],
    // Drop 5-6 images as /images/archive/2018/1.jpg, 2.jpg, etc.
    photos: [
      '/images/archive/2018/1.jpg',
      '/images/archive/2018/3.jpg',
      '/images/archive/2018/4.jpg',
      '/images/archive/2018/5.jpg',
      '/images/archive/2018/6.jpg',
    ],
  },
  {
    year: '2022',
    label: "ICONICS'22",
    edition: '3rd Edition',
    date: 'December 14–15, 2022',
    venue: 'NED University, Karachi',
    theme: 'AI, Quantum Computing, Cybersecurity & Blockchain',
    summary:
      'ICONICS\'22 was a landmark edition — the first to be published in IEEE Xplore, elevating the conference to international academic recognition. The programme featured prominent industry leaders alongside researchers, with Rehan Jalil (CEO Securiti) and Dr. Gregoire Ribordy (CEO idQuantique) delivering keynotes on cybersecurity and quantum cryptography respectively.',
    stats: [
      { label: 'Keynote Speakers', value: '7' },
      { label: 'Publication', value: 'IEEE' },
    ],
    speakers: [
      { name: 'Prof. Dr. Agathe Merceron', institution: 'Beuth University, Germany' },
      { name: 'Prof. Datuk Ts. Dr. Shahrin Sahib', institution: 'UTeM (Universiti Teknikal Malaysia Melaka)' },
      { name: 'Rehan Jalil', institution: 'Securiti (CEO), USA' },
      { name: 'Dr. Gregoire Ribordy', institution: 'idQuantique (CEO), Switzerland' },
      { name: 'Dr. Javaid Butt', institution: 'Anglia Ruskin University, UK' },
      { name: 'Dr. Kashif Kifayat', institution: 'Air University, Islamabad' },
      { name: 'Prof. Dr. Jawwad A. Shamsi', institution: 'FAST University, Pakistan' },
    ],
    workshops: [],
    highlights: [
      'First IEEE Xplore–indexed edition of ICONICS',
      'Industry keynotes: CEOs of Securiti & idQuantique',
      'Dedicated Quantum Computing and Cybersecurity tracks',
      'Chief Guest: Mr. Asif Ikram, Secretary IT Govt of Sindh',
      'Guest of Honour: Ms. Jehan Ara, CEO Katalyst Labs',
    ],
    resources: [
      { label: 'IEEE Xplore Proceedings', href: EXTERNAL_LINKS.IEEE_ICONICS_22, type: 'ieee' },
    ],
    // Drop 5-6 images as /images/archive/2022/1.jpg, 2.jpg, etc.
    photos: [
      '/images/archive/2022/1.jpg',
      '/images/archive/2022/2.jpg',
      '/images/archive/2022/3.jpg',
      '/images/archive/2022/4.jpg',
      '/images/archive/2022/5.jpg',
      '/images/archive/2022/6.jpg',
    ],
  },
  {
    year: '2024',
    label: "ICONICS'24",
    edition: '4th Edition',
    date: 'November 13–14, 2024',
    venue: 'NED University, Karachi',
    theme: 'Quantum Technologies, Generative AI & Edge Computing',
    summary:
      'The fourth edition centred on Quantum Technologies and Generative AI, featuring world-class researchers from UC Berkeley, INRIM Italy, Munster Tech University, and NILOP. Two specialized workshops on Quantum Technologies and NLP/Contrastive Learning complemented nine keynote sessions, cementing ICONICS as a premier regional venue for cutting-edge CS research.',
    stats: [
      { label: 'Keynote Speakers', value: '9' },
      { label: 'Countries', value: '5' },
      { label: 'Workshops', value: '2' },
      { label: 'Workshop Tracks', value: '4' },
    ],
    speakers: [
      { name: 'Prof. Dr. Marco Genovese', institution: 'INRIM, Italy', photo: '/images/Marco.jpg' },
      { name: 'Prof. Dr. Irfan Siddiqi', institution: 'UC Berkeley, USA', photo: '/images/irfan.jpg' },
      { name: 'Dr. Manzoor Ikram', institution: 'NILOP, Pakistan', photo: '/images/manzoor.jpg' },
      { name: 'Prof. Rafael Ferreira Mello', institution: 'UFRPE, Brazil', photo: '/images/Mello.jpg' },
      { name: 'Dr. Mubashir Rehmani', institution: 'Munster Tech University, Ireland', photo: '/images/Rehmani.jpg' },
      { name: 'Prof. Dr. Muhammad Atif Tahir', institution: 'FAST University, Pakistan', photo: '/images/atif.jpg' },
      { name: 'Prof. Dr. Jawwad A. Shamsi', institution: 'FAST University, Pakistan', photo: '/images/jawwad.jpg' },
      { name: 'Prof. Dr. Muhammad Rafi', institution: 'FAST University, Pakistan', photo: '/images/rafi.jpg' },
      { name: 'Dr. Jibran Rashid', institution: 'IBA Karachi, Pakistan', photo: '/images/jibran.jpg' },
    ],
    workshops: [
      'Quantum Technologies Workshop (3 tracks: Computing, Metrology & Sensing, Algorithms)',
      'NLP & Contrastive Learning Workshop',
    ],
    highlights: [
      '9 keynote & workshop speakers from 5 countries',
      'Quantum Technologies multi-track workshop',
      'NLP & Contrastive Learning tutorial workshop',
      'Focus on Generative AI and Edge Computing',
      'Conference website: nediconics.com',
    ],
    resources: [
      { label: 'Conference Website', href: 'https://www.nediconics.com', type: 'link' },
    ],
    photos: [
      '/images/archive/2024/1.jpg',
      '/images/archive/2024/2.jpg',
      '/images/archive/2024/3.jpg',
      '/images/archive/2024/4.jpg',
      '/images/archive/2024/5.jpg',
      '/images/archive/2024/6.jpg',
    ],
  },
];

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const typeIcon = {
  pdf: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  ieee: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  link: (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
};

const ResourceBadge = ({ r }) => (
  <a
    href={r.href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border border-border-subtle
               text-accent bg-bg-card hover:bg-bg-secondary hover:border-accent/30 transition-all duration-200"
  >
    {typeIcon[r.type]}
    {r.label}
  </a>
);

const PhotoGrid = ({ photos, activePhoto, onSelect }) => {
  const [errors, setErrors] = useState({});

  const handleError = (idx) => setErrors(prev => ({ ...prev, [idx]: true }));

  const validPhotos = photos.filter((_, i) => !errors[i]);

  if (validPhotos.length === 0) return null;

  return (
    <div className="mt-6">
      {/* Main photo */}
      <div className="relative rounded-lg overflow-hidden bg-bg-dark" style={{ height: 320 }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={activePhoto}
            src={photos[activePhoto]}
            alt=""
            onError={() => handleError(activePhoto)}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded tracking-widest">
          {String(activePhoto + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2 mt-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
        {photos.map((src, i) => (
          !errors[i] && (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className="shrink-0 rounded overflow-hidden transition-all duration-200"
              style={{
                width: 72, height: 48,
                opacity: i === activePhoto ? 1 : 0.5,
                outline: i === activePhoto ? '2px solid var(--color-accent)' : '2px solid transparent',
                outlineOffset: 1,
              }}
            >
              <img src={src} alt="" onError={() => handleError(i)} className="w-full h-full object-cover" />
            </button>
          )
        ))}
      </div>
    </div>
  );
};

const SpeakerCard = ({ speaker }) => (
  <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-secondary border border-border-subtle">
    {speaker.photo ? (
      <img
        src={speaker.photo}
        alt={speaker.name}
        className="w-10 h-10 rounded-full object-cover shrink-0 border border-border-dark"
      />
    ) : (
      <div className="w-10 h-10 rounded-full bg-bg-dark border border-border-subtle shrink-0 flex items-center justify-center">
        <svg className="w-5 h-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    )}
    <div className="min-w-0">
      <p className="text-sm font-semibold text-text-primary leading-tight truncate">{speaker.name}</p>
      <p className="text-xs text-text-muted mt-0.5 truncate">{speaker.institution}</p>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

const Gallery = () => {
  const [activeYear, setActiveYear] = useState('2024');
  const [activePhoto, setActivePhoto] = useState(0);

  const active = editions.find(e => e.year === activeYear);

  const changeYear = (year) => {
    setActiveYear(year);
    setActivePhoto(0);
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-20 bg-bg-primary">
        <PageBackground />

        <div className="relative z-10 pt-24 sm:pt-32 px-4 sm:px-8">
          <div className="container mx-auto max-w-[1200px]">

            <SectionHeading
              title="Past Editions"
              subtitle="A decade of innovation in computer science at NED University"
            />

            {/* Tab switcher */}
            <div className="flex justify-center mb-10">
              <div className="inline-flex gap-1 p-1 rounded-lg bg-bg-card border border-border-subtle shadow-sm">
                {editions.map(ed => (
                  <button
                    key={ed.year}
                    onClick={() => changeYear(ed.year)}
                    className={`relative px-5 py-2.5 text-sm font-semibold rounded-md transition-all duration-300 tracking-wider
                      ${activeYear === ed.year ? 'text-white' : 'text-text-muted hover:text-text-secondary'}`}
                    style={{
                      background: activeYear === ed.year ? '#3E8B87' : 'transparent',
                    }}
                  >
                    {ed.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Edition content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeYear}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">

                  {/* Left column */}
                  <div className="space-y-5">

                    {/* Header */}
                    <div className="bg-bg-card border border-border-subtle rounded-xl p-6 shadow-sm">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div>
                          <span className="text-xs font-bold text-accent tracking-[0.35em] uppercase block mb-2">
                            {active.edition}
                          </span>
                          <h2 className="text-3xl font-bold text-text-primary tracking-tight mb-1">
                            {active.label}
                          </h2>
                          <p className="text-sm text-text-muted">
                            {active.date} &middot; {active.venue}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {active.resources.map((r, i) => <ResourceBadge key={i} r={r} />)}
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-border-subtle">
                        <p className="text-xs font-semibold text-accent tracking-widest uppercase mb-1">Theme</p>
                        <p className="text-sm font-medium text-text-secondary">{active.theme}</p>
                      </div>

                      <p className="mt-4 text-sm text-text-muted leading-relaxed">{active.summary}</p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {active.stats.map((s, i) => (
                        <div key={i} className="bg-bg-card border border-border-subtle rounded-xl p-4 text-center shadow-sm">
                          <p className="text-2xl font-bold text-accent">{s.value}</p>
                          <p className="text-xs text-text-muted mt-1 leading-tight">{s.label}</p>
                        </div>
                      ))}
                    </div>

                    {/* Photos */}
                    <div className="bg-bg-card border border-border-subtle rounded-xl p-5 shadow-sm">
                      <p className="text-xs font-bold text-accent tracking-[0.35em] uppercase mb-4">Gallery</p>
                      <PhotoGrid
                        photos={active.photos}
                        activePhoto={activePhoto}
                        onSelect={setActivePhoto}
                      />
                      {active.photos.every((_, i) => false) && (
                        <div className="h-40 flex items-center justify-center text-text-muted text-sm">
                          Photos coming soon
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right column */}
                  <div className="space-y-5">

                    {/* Highlights */}
                    <div className="bg-bg-card border border-border-subtle rounded-xl p-5 shadow-sm">
                      <p className="text-xs font-bold text-accent tracking-[0.35em] uppercase mb-4">Highlights</p>
                      <ul className="space-y-0">
                        {active.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-3 py-3 border-b border-border-subtle last:border-0">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                            <span className="text-sm text-text-secondary leading-relaxed">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Workshops */}
                    {active.workshops.length > 0 && (
                      <div className="bg-bg-card border border-border-subtle rounded-xl p-5 shadow-sm">
                        <p className="text-xs font-bold text-accent tracking-[0.35em] uppercase mb-4">Workshops</p>
                        <ul className="space-y-2">
                          {active.workshops.map((w, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent/50 mt-2 shrink-0" />
                              <span className="text-sm text-text-secondary leading-relaxed">{w}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Keynote Speakers */}
                    <div className="bg-bg-card border border-border-subtle rounded-xl p-5 shadow-sm">
                      <p className="text-xs font-bold text-accent tracking-[0.35em] uppercase mb-4">
                        Keynote Speakers
                      </p>
                      <div className="space-y-2">
                        {active.speakers.map((s, i) => (
                          <SpeakerCard key={i} speaker={s} />
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Gallery;
