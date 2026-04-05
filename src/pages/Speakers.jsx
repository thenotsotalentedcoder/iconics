import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import SpeakerCard from '../components/speakers/SpeakerCard';
import SpeakerModal from '../components/speakers/SpeakerModal';
import PageBackground from '../components/animations/PageBackground';
import { speakers } from '../data/speakers';

const TEAL   = '#3E8B87';
const TEAL_L = '#5AA8A3';

const FilterPill = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className="px-5 py-2 text-sm font-semibold rounded-full transition-all duration-200"
    style={{
      background: active
        ? `linear-gradient(135deg, ${TEAL} 0%, #2D6E6A 100%)`
        : 'rgba(255,255,255,0.55)',
      color: active ? '#fff' : '#4A6472',
      border: active ? 'none' : '1px solid rgba(62,139,135,0.18)',
      backdropFilter: 'blur(8px)',
      boxShadow: active ? '0 4px 14px rgba(62,139,135,0.28)' : 'none',
    }}
  >
    {children}
  </button>
);

const Speakers = () => {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? speakers : speakers.filter(s => s.type === filter);

  return (
    <PageTransition>
      <div
        className="relative min-h-screen"
        style={{ background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}
      >
        <PageBackground />

        <div className="relative z-10 pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6">
          <div className="container mx-auto max-w-7xl">

            {/* Header */}
            <div className="mb-3">
              <SectionHeading
                title="Keynote Speakers"
                subtitle="Leading experts from around the world"
              />
            </div>

            {/* Gradient accent under heading */}
            <div className="flex justify-center mb-10">
              <div
                className="h-px w-24 rounded-full"
                style={{ background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)` }}
              />
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {['all', 'keynote', 'workshop'].map(f => (
                <FilterPill key={f} active={filter === f} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All Speakers' : f.charAt(0).toUpperCase() + f.slice(1)}
                </FilterPill>
              ))}
            </div>

            {/* Speaker grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 place-items-center">
              {filtered.map(speaker => (
                <div key={speaker.id} className="w-full max-w-[200px]">
                  <SpeakerCard speaker={speaker} onClick={setSelected} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <SpeakerModal speaker={selected} isOpen={!!selected} onClose={() => setSelected(null)} />
      </div>
    </PageTransition>
  );
};

export default Speakers;