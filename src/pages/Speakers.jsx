import { useState } from 'react';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import SpeakerCard from '../components/speakers/SpeakerCard';
import SpeakerModal from '../components/speakers/SpeakerModal';
import { speakers } from '../data/speakers';

const Speakers = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredSpeakers = filter === 'all'
    ? speakers
    : speakers.filter(s => s.type === filter);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <SectionHeading
            title="Keynote Speakers"
            subtitle="Leading experts from around the world"
          />

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
                filter === 'all'
                  ? 'bg-accent-red text-white'
                  : 'bg-bg-card text-text-secondary hover:text-white'
              }`}
            >
              All Speakers
            </button>
            <button
              onClick={() => setFilter('keynote')}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
                filter === 'keynote'
                  ? 'bg-accent-red text-white'
                  : 'bg-bg-card text-text-secondary hover:text-white'
              }`}
            >
              Keynote
            </button>
            <button
              onClick={() => setFilter('workshop')}
              className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${
                filter === 'workshop'
                  ? 'bg-accent-red text-white'
                  : 'bg-bg-card text-text-secondary hover:text-white'
              }`}
            >
              Workshop
            </button>
          </div>

          {/* Speaker Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 max-w-7xl mx-auto place-items-center">
            {filteredSpeakers.map((speaker) => (
              <div key={speaker.id} className="w-full max-w-[200px]">
                <SpeakerCard
                  speaker={speaker}
                  onClick={setSelectedSpeaker}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Speaker Modal */}
        <SpeakerModal
          speaker={selectedSpeaker}
          isOpen={!!selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
        />
      </div>
    </PageTransition>
  );
};

export default Speakers;
