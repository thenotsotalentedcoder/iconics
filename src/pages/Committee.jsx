import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { organizingCommittee, technicalCommittee } from '../data/committee';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

const Committee = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <SectionHeading
            title="Committee"
            subtitle="Meet the organizing team behind ICONICS'26"
          />

          {/* Organizing Committee */}
          <section className="mb-3 sm:mb-4 sm:mb-6 sm:mb-8 sm:mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4 sm:mb-6 sm:mb-8">Organizing Committee</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:p-6">
              {organizingCommittee.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-bg-card border border-border-subtle rounded-lg p-4 sm:p-6 hover:border-red-600 transition-all hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="text-accent-red font-semibold text-sm uppercase tracking-wider mb-2">
                    {member.role}
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{member.name}</h4>
                  <p className="text-text-secondary text-sm mb-3">{member.institution}</p>
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center text-text-muted hover:text-accent-red transition-colors text-sm"
                  >
                    <FaEnvelope className="mr-2" />
                    {member.email}
                  </a>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Technical Program Committee */}
          <section>
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white mb-3 sm:mb-4 sm:mb-6 sm:mb-8">Technical Program Committee</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {technicalCommittee.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-bg-card border border-border-subtle rounded-lg p-4 hover:border-red-600 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                >
                  <h4 className="text-white font-semibold mb-1">{member.name}</h4>
                  <p className="text-text-secondary text-sm">{member.institution}</p>
                  <p className="text-text-muted text-xs mt-1">{member.country}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Committee;
