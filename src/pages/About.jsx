import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { motion } from 'framer-motion';
import { EXTERNAL_LINKS } from '../utils/constants';

const About = () => {
  const pastEditions = [
    {
      year: "2016",
      date: "December 15-16, 2016",
      edition: "1st Edition",
      description: "The inaugural ICONICS conference brought together researchers and practitioners to discuss innovations in computer science."
    },
    {
      year: "2018",
      date: "December 05-06, 2018",
      edition: "2nd Edition",
      description: "Expanded international participation with focus on AI and machine learning applications."
    },
    {
      year: "2022",
      date: "December 14-15, 2022",
      edition: "3rd Edition",
      description: "Published in IEEE Conference Proceedings. Featured quantum computing and cybersecurity tracks.",
      link: EXTERNAL_LINKS.IEEE_ICONICS_22
    },
    {
      year: "2024",
      date: "November 2024",
      edition: "4th Edition",
      description: "Most recent edition with emphasis on generative AI and edge computing."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <SectionHeading
            title="About ICONICS'26"
            subtitle="Building the future of computer science research"
          />

          {/* Conference Overview */}
          <section className="mb-12 sm:mb-16">
            <motion.div
              className="bg-bg-card border border-border-subtle rounded-lg p-5 sm:p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-4 sm:mb-6">Conference Overview</h3>
              <div className="space-y-3 sm:space-y-4 text-text-secondary text-sm sm:text-base">
                <p>
                  NED University of Engineering and Technology announces the <strong className="text-white">5th International Conference on Innovations in Computer Science (ICONICS'26)</strong>. The conference provides a platform for researchers, both national and international, to exchange novel and contemporary ideas in emerging fields of computing.
                </p>
                <p>
                  The theme for ICONICS'26 is <strong className="text-accent-red">"Innovations in AI, Quantum Computing & Cybersecurity"</strong>, reflecting the rapidly evolving landscape of computer science and its impact on society.
                </p>
                <p>
                  The conference aims to bring together leading researchers, industry practitioners, and students to share their latest findings, discuss emerging trends, and foster collaborations that advance the field of computer science.
                </p>
              </div>
            </motion.div>
          </section>

          {/* About NED University */}
          <section className="mb-12 sm:mb-16">
            <motion.div
              className="grid md:grid-cols-2 gap-6 sm:gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4">About NED University</h3>
                <div className="space-y-3 sm:space-y-4 text-text-secondary text-sm sm:text-base">
                  <p>
                    NED University of Engineering & Technology is one of the oldest engineering institutions in Pakistan, established in 1921. Located in Karachi, it has consistently maintained its position as a leading institution for engineering and technology education.
                  </p>
                  <p>
                    The Department of Computer Science & Information Technology at NED University has been at the forefront of computer science education and research, producing skilled professionals and contributing to cutting-edge research in various domains.
                  </p>
                  <a
                    href={EXTERNAL_LINKS.NED_UNIVERSITY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-accent-red hover:underline"
                  >
                    Visit NED University Website →
                  </a>
                </div>
              </div>
              <div className="bg-bg-card border border-border-subtle rounded-lg p-5 sm:p-6 md:p-8">
                <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">Conference Objectives</h4>
                <ul className="space-y-2 sm:space-y-3 text-text-secondary text-sm sm:text-base">
                  <li className="flex items-start">
                    <span className="text-accent-red mr-2">•</span>
                    <span>Foster collaboration between academia and industry</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-red mr-2">•</span>
                    <span>Showcase cutting-edge research in computer science</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-red mr-2">•</span>
                    <span>Provide networking opportunities for researchers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-red mr-2">•</span>
                    <span>Promote innovation and entrepreneurship</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-red mr-2">•</span>
                    <span>Advance the state of computer science education</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </section>

          {/* Past Editions */}
          <section className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-6 sm:mb-8 text-center">Past Editions</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent-red" />

              <div className="space-y-8 sm:space-y-12">
                {pastEditions.map((edition, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 sm:left-8 md:left-1/2 w-3 sm:w-4 h-3 sm:h-4 bg-accent-red rounded-full -translate-x-1.5 sm:-translate-x-2 md:-translate-x-2" />

                    {/* Content */}
                    <div className={`ml-10 sm:ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="bg-bg-card border border-border-subtle rounded-lg p-4 sm:p-6 hover:border-accent-red transition-colors">
                        <div className="text-accent-red font-bold font-accent text-xl sm:text-2xl mb-1 sm:mb-2">
                          {edition.year}
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">{edition.edition}</h4>
                        <p className="text-text-muted text-xs sm:text-sm mb-2 sm:mb-3">{edition.date}</p>
                        <p className="text-text-secondary text-sm sm:text-base">{edition.description}</p>
                        {edition.link && (
                          <a
                            href={edition.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mt-4 text-accent-red hover:underline text-sm"
                          >
                            View IEEE Proceedings →
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <motion.div
                className="bg-bg-card border border-border-subtle rounded-lg p-5 sm:p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4">Mission</h3>
                <p className="text-text-secondary text-sm sm:text-base">
                  To create a premier platform for researchers, academicians, and industry professionals to present their innovative work, exchange ideas, and collaborate on advancing the frontiers of computer science and information technology.
                </p>
              </motion.div>

              <motion.div
                className="bg-bg-card border border-border-subtle rounded-lg p-5 sm:p-6 md:p-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4">Vision</h3>
                <p className="text-text-secondary text-sm sm:text-base">
                  To establish ICONICS as a globally recognized conference that drives innovation, fosters international collaboration, and contributes to solving real-world challenges through cutting-edge computer science research.
                </p>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
