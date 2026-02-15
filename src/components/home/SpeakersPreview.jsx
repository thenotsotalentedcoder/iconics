import { Link } from 'react-router-dom';
import SectionHeading from '../common/SectionHeading';
import SpeakerCard from '../speakers/SpeakerCard';
import Button from '../common/Button';
import { speakers } from '../../data/speakers';
import { useState } from 'react';
import SpeakerModal from '../speakers/SpeakerModal';

const SpeakersPreview = () => {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  // Show first 6 speakers
  const featuredSpeakers = speakers.slice(0, 6);

  return (
    <section className="py-12 sm:py-16 md:py-24 bg-bg-primary">
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeading
          title="Keynote Speakers"
          subtitle="Leading experts from around the world"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 mb-8 sm:mb-12 max-w-7xl mx-auto place-items-center">
          {featuredSpeakers.map((speaker) => (
            <div key={speaker.id} className="w-full max-w-[200px]">
              <SpeakerCard
                speaker={speaker}
                onClick={setSelectedSpeaker}
              />
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/speakers">
            <Button variant="secondary" size="lg">
              View All Speakers
            </Button>
          </Link>
        </div>
      </div>

      <SpeakerModal
        speaker={selectedSpeaker}
        isOpen={!!selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
      />
    </section>
  );
};

export default SpeakersPreview;
