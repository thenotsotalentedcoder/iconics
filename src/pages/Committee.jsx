import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { organizingCommittee } from '../data/committee';
import { useApiData } from '../hooks/useApiData';
import { api } from '../utils/api';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

const TEAL   = '#3E8B87';
const TEAL_L = '#5AA8A3';
const DARK   = '#0F4C5C';
const MID    = '#2F7C7A';

// PDF order for sub-committees
const COMMITTEE_ORDER = [
  'Organizing Committee',
  'IEEE Coordination Committee',
  'Publications Committee',
  'Technical Program Committee',
  'Finance Committee',
  'Website & Socials Committee',
  'Grants & Sponsorship Committee',
  'Travel, Accommodation & Protocol Committee',
  'Publicity Committee',
  'Shield & Certificates Committee',
  'Registration Committee',
  'Reception Committee',
  'Catering Committee',
  'IT Support Committee',
];

// Static fallback — all organizing committee members (same shape as API)
const staticFallback = organizingCommittee.map((m, i) => ({
  id: String(i),
  committeeName: 'Organizing Committee',
  name: m.name,
  role: m.role,
  institution: m.institution,
  email: m.email || null,
  isChair: false,
  order: i,
}));

function MemberCard({ member, index }) {
  return (
    <motion.div
      className="p-5 sm:p-6 transition-all duration-300"
      style={{
        background: 'rgba(255,255,255,0.75)',
        border: `1px solid ${TEAL}18`,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 1px 12px rgba(15,76,92,0.05)',
        borderRadius: 6,
      }}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      whileHover={{ y: -3, boxShadow: `0 8px 28px rgba(62,139,135,0.14)`, borderColor: `${TEAL}40` }}
    >
      <div className="inline-block px-2.5 py-1 mb-3"
        style={{ background: `${TEAL}10`, border: `1px solid ${TEAL}25`, borderRadius: 4 }}>
        <span style={{ fontSize: 9, fontWeight: 800, color: TEAL_L, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          {member.role}
        </span>
      </div>
      <h4 style={{ fontSize: 16, fontWeight: 700, color: DARK, marginBottom: 4 }}>{member.name}</h4>
      {member.institution && (
        <p style={{ fontSize: 13, color: MID, marginBottom: member.email ? 12 : 0 }}>{member.institution}</p>
      )}
      {member.email && (
        <a
          href={`mailto:${member.email}`}
          className="inline-flex items-center gap-2 text-xs transition-colors duration-200"
          style={{ color: TEAL_L }}
          onMouseEnter={e => { e.currentTarget.style.color = TEAL; }}
          onMouseLeave={e => { e.currentTarget.style.color = TEAL_L; }}
        >
          <FaEnvelope style={{ fontSize: 11 }} />{member.email}
        </a>
      )}
    </motion.div>
  );
}

const Committee = () => {
  const { data: allMembers } = useApiData(api.getCommittee, staticFallback);

  // Group by committeeName, then sort groups in PDF order
  const grouped = allMembers.reduce((acc, m) => {
    (acc[m.committeeName] ??= []).push(m);
    return acc;
  }, {});

  const sortedGroups = COMMITTEE_ORDER
    .filter(name => grouped[name]?.length > 0)
    .map(name => ({ name, members: grouped[name] }));

  // Any committees not in COMMITTEE_ORDER go at the end
  Object.keys(grouped).forEach(name => {
    if (!COMMITTEE_ORDER.includes(name)) {
      sortedGroups.push({ name, members: grouped[name] });
    }
  });

  return (
    <PageTransition>
      <div className="relative min-h-screen pb-20"
        style={{ background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}>

        <div className="relative z-10 pt-24 sm:pt-32 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">

            <SectionHeading title="Organizing Committee" subtitle="Meet the team behind ICONICS'26" />

            <div className="space-y-14">
              {sortedGroups.map(({ name, members }) => (
                <motion.section
                  key={name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Sub-committee heading — only show if more than one group */}
                  {sortedGroups.length > 1 && (
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-px flex-1" style={{ background: `${TEAL}20` }} />
                      <h2 className="text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap px-1"
                        style={{ color: TEAL }}>
                        {name}
                      </h2>
                      <div className="h-px flex-1" style={{ background: `${TEAL}20` }} />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map((member, i) => (
                      <MemberCard key={member.id} member={member} index={i} />
                    ))}
                  </div>
                </motion.section>
              ))}
            </div>

          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Committee;
