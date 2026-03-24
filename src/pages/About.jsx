import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { motion } from 'framer-motion';
import { EXTERNAL_LINKS } from '../utils/constants';

const pastEditions = [
  {
    year: "2016",
    date: "December 15–16, 2016",
    edition: "1st Edition",
    description: "The inaugural ICONICS received 73 full papers globally with 19 accepted (26% acceptance rate). Sessions covered AI, IoT, data mining, networking, and emerging technologies, with attendees from Pakistan, USA, UK, and Malaysia.",
    proceedings: EXTERNAL_LINKS.PROCEEDINGS_2016,
    proceedingsLabel: "Proceedings PDF",
    ieeeLink: null,
  },
  {
    year: "2018",
    date: "December 5–6, 2018",
    edition: "2nd Edition",
    description: "Expanded international participation with a stronger focus on AI, machine learning, and emerging computing paradigms.",
    proceedings: EXTERNAL_LINKS.PROCEEDINGS_2018,
    proceedingsLabel: "Proceedings PDF",
    ieeeLink: null,
  },
  {
    year: "2022",
    date: "December 14–15, 2022",
    edition: "3rd Edition",
    description: "The first IEEE-published edition, featuring dedicated tracks for quantum computing and cybersecurity alongside classical CS domains.",
    proceedings: null,
    ieeeLink: EXTERNAL_LINKS.IEEE_ICONICS_22,
    ieeeLabel: "IEEE Xplore Proceedings",
  },
  {
    year: "2024",
    date: "November 13–14, 2024",
    edition: "4th Edition",
    description: "Featuring 9 keynote and workshop speakers from 5 countries, with emphasis on generative AI, quantum computing, and blockchain.",
    proceedings: null,
    ieeeLink: 'https://www.nediconics.com',
    ieeeLabel: "Conference Website",
  }
];

const About = () => {
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
              className="bg-bg-card border border-border-subtle rounded-xl p-6 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-5">Conference Overview</h3>
              <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed">
                <p>
                  NED University of Engineering and Technology announces the <strong className="text-text-primary">5th International Conference on Innovations in Computer Science (ICONICS'26)</strong>. The conference provides a platform for researchers, both national and international, to exchange novel and contemporary ideas in emerging fields of computing.
                </p>
                <p>
                  The theme for ICONICS'26 is <strong className="text-accent">"Innovations in AI, Quantum Computing & Cybersecurity"</strong>, reflecting the rapidly evolving landscape of computer science and its impact on society.
                </p>
                <p>
                  The conference aims to bring together leading researchers, industry practitioners, and students to share their latest findings, discuss emerging trends, and foster collaborations that advance the field of computer science.
                </p>
              </div>
            </motion.div>
          </section>

          {/* About NED + Objectives */}
          <section className="mb-12 sm:mb-16">
            <motion.div
              className="grid md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-bg-card border border-border-subtle rounded-xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">About NED University</h3>
                <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed">
                  <p>
                    NED University of Engineering & Technology is one of the oldest engineering institutions in Pakistan, established in 1921. Located in Karachi, it serves approximately 7,000 students across 25 engineering disciplines at undergraduate and graduate levels.
                  </p>
                  <p>
                    The Department of Computer Science & Information Technology leads computer science education and research, contributing to cutting-edge work in AI, quantum computing, cybersecurity, and more.
                  </p>
                  <a
                    href={EXTERNAL_LINKS.NED_UNIVERSITY}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:underline text-sm font-medium"
                  >
                    Visit NED University
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="bg-bg-card border border-border-subtle rounded-xl p-6 sm:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-4">Conference Objectives</h3>
                <ul className="space-y-3 text-text-muted text-sm sm:text-base">
                  {[
                    "Foster collaboration between academia and industry",
                    "Showcase cutting-edge research in computer science",
                    "Provide networking opportunities for researchers worldwide",
                    "Promote innovation and entrepreneurship in computing",
                    "Advance computer science education and research in Pakistan",
                  ].map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </section>

          {/* Past Editions Timeline */}
          <section className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-text-primary mb-8 text-center">Past Editions</h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-px bg-accent/30" />

              <div className="space-y-8 sm:space-y-12">
                {pastEditions.map((edition, index) => (
                  <motion.div
                    key={index}
                    className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-4 sm:left-8 md:left-1/2 w-4 h-4 bg-accent rounded-full -translate-x-1.5 sm:-translate-x-2 mt-5 ring-4 ring-bg-darker" />

                    {/* Content */}
                    <div className={`ml-12 sm:ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-14' : 'md:pl-14'}`}>
                      <div className="bg-bg-card border border-border-subtle rounded-xl p-5 sm:p-6 hover:border-accent/30 transition-colors duration-200">
                        <div className="text-accent font-bold text-2xl mb-1 font-mono">{edition.year}</div>
                        <h4 className="text-lg font-bold text-text-primary mb-1">{edition.edition}</h4>
                        <p className="text-text-muted text-xs mb-3">{edition.date}</p>
                        <p className="text-text-muted text-sm leading-relaxed mb-4">{edition.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {edition.proceedings && (
                            <a
                              href={edition.proceedings}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-medium"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              {edition.proceedingsLabel}
                            </a>
                          )}
                          {edition.ieeeLink && (
                            <a
                              href={edition.ieeeLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline font-medium"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                              {edition.ieeeLabel}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Mission & Vision */}
          <section>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Mission",
                  text: "To create a premier platform for researchers, academicians, and industry professionals to present their innovative work, exchange ideas, and collaborate on advancing the frontiers of computer science and information technology.",
                },
                {
                  title: "Vision",
                  text: "To establish ICONICS as a globally recognized conference that drives innovation, fosters international collaboration, and contributes to solving real-world challenges through cutting-edge computer science research.",
                  delay: 0.2,
                }
              ].map(({ title, text, delay = 0 }) => (
                <motion.div
                  key={title}
                  className="bg-bg-card border border-border-subtle rounded-xl p-6 sm:p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay }}
                >
                  <h3 className="text-xl font-bold text-text-primary mb-3">{title}</h3>
                  <p className="text-text-muted text-sm sm:text-base leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;
