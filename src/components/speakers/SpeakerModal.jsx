import Modal from '../common/Modal';
import { useState } from 'react';

// Custom SVG Icons
const GlobeIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="2" y1="12" x2="22" y2="12"></line>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
  </svg>
);

const LinkedInIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const ScholarIcon = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
    <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
  </svg>
);

const UserIcon = () => (
  <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const SpeakerModal = ({ speaker, isOpen, onClose }) => {
  const [imageError, setImageError] = useState(false);

  if (!speaker) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8">
        {/* Left: Photo */}
        <div>
          <div className="relative h-64 sm:h-80 md:h-96 overflow-hidden rounded-lg bg-bg-secondary">
            {!imageError ? (
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-text-muted p-8 sm:p-12">
                <UserIcon />
              </div>
            )}
          </div>
        </div>

        {/* Right: Info */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mb-2">
            {speaker.name}
          </h2>
          <p className="text-base sm:text-lg text-text-secondary mb-1">{speaker.title}</p>
          <p className="text-base sm:text-lg text-accent-red mb-2">{speaker.institution}</p>
          <p className="text-xs sm:text-sm text-text-muted mb-4 sm:mb-6">{speaker.country}</p>

          {/* Bio */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Biography</h3>
            <p className="text-sm sm:text-base text-text-secondary leading-relaxed">{speaker.bio}</p>
          </div>

          {/* Topics */}
          <div className="mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Research Areas</h3>
            <div className="flex flex-wrap gap-2">
              {speaker.topics.map((topic, index) => (
                <span
                  key={index}
                  className="px-2.5 sm:px-3 py-1 bg-accent-red/20 text-accent-red rounded-full text-xs sm:text-sm"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-3 sm:gap-4">
            {speaker.links.website !== '#' && (
              <a
                href={speaker.links.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-red transition-colors"
                aria-label="Website"
              >
                <GlobeIcon />
              </a>
            )}
            {speaker.links.linkedin !== '#' && (
              <a
                href={speaker.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-red transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
            )}
            {speaker.links.scholar !== '#' && (
              <a
                href={speaker.links.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-red transition-colors"
                aria-label="Google Scholar"
              >
                <ScholarIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SpeakerModal;
