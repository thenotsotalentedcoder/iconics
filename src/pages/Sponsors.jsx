import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PageBackground from '../components/animations/PageBackground';

const TEAL   = '#3E8B87';
const TEAL_L = '#5AA8A3';
const DARK   = '#0F4C5C';
const MID    = '#2F7C7A';

const tiers = [
  {
    name: 'Platinum',
    perks: [
      'Prominent logo on all conference materials',
      'Dedicated exhibition booth',
      'Complimentary registrations (5)',
      'Speaking slot / keynote opportunity',
      'Logo on website homepage & banner',
      'Social media feature posts',
      'Acknowledgement in opening ceremony',
    ],
  },
  {
    name: 'Gold',
    perks: [
      'Logo on conference materials',
      'Exhibition table',
      'Complimentary registrations (3)',
      'Logo on website & printed program',
      'Social media mention',
      'Acknowledgement in ceremony',
    ],
  },
  {
    name: 'Silver',
    perks: [
      'Logo on conference website',
      'Complimentary registrations (2)',
      'Logo in printed program',
      'Social media mention',
    ],
  },
  {
    name: 'Bronze',
    perks: [
      'Logo on conference website',
      'Complimentary registration (1)',
      'Acknowledgement in program',
    ],
  },
];

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ org: '', name: '', email: '', tier: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Sponsorship Inquiry — ${form.tier || 'General'} — ${form.org}`);
    const body = encodeURIComponent(
      `Organization: ${form.org}\nContact Name: ${form.name}\nEmail: ${form.email}\nTier of Interest: ${form.tier}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:secretary@nediconics.com?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  const inputStyle = {
    width: '100%',
    background: 'white',
    border: '1px solid rgba(62,139,135,0.2)',
    borderRadius: 4,
    padding: '12px 16px',
    fontSize: 14,
    color: DARK,
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  };

  if (submitted) {
    return (
      <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4"
          style={{ borderRadius: 6, background: `rgba(90,168,163,0.1)` }}>
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke={TEAL}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="font-bold text-xl mb-2" style={{ color: DARK }}>Inquiry Sent</h4>
        <p style={{ color: MID }}>Your mail client has been opened. We'll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="org" required value={form.org} onChange={handleChange} placeholder="Organization *"
          style={inputStyle}
          onFocus={e => { e.target.style.borderColor = TEAL; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(62,139,135,0.2)'; }} />
        <input name="name" required value={form.name} onChange={handleChange} placeholder="Contact Name *"
          style={inputStyle}
          onFocus={e => { e.target.style.borderColor = TEAL; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(62,139,135,0.2)'; }} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email *"
          style={inputStyle}
          onFocus={e => { e.target.style.borderColor = TEAL; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(62,139,135,0.2)'; }} />
        <select name="tier" value={form.tier} onChange={handleChange}
          style={inputStyle}
          onFocus={e => { e.target.style.borderColor = TEAL; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(62,139,135,0.2)'; }}>
          <option value="">Select a tier...</option>
          {tiers.map(t => <option key={t.name} value={t.name}>{t.name} Sponsor</option>)}
          <option value="Custom">Custom Inquiry</option>
        </select>
      </div>
      <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Your message..."
        style={{ ...inputStyle, resize: 'none' }}
        onFocus={e => { e.target.style.borderColor = TEAL; }}
        onBlur={e => { e.target.style.borderColor = 'rgba(62,139,135,0.2)'; }} />
      {/* Send Inquiry button matches site style */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          padding: '12px 24px',
          background: TEAL,
          color: 'white',
          border: 'none',
          borderRadius: 4,
          fontSize: 14,
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          display: 'inline-block',
        }}
      >
        Send Inquiry
      </motion.button>
    </form>
  );
};

const Sponsors = () => {
  return (
    <PageTransition>
      <div
        className="relative min-h-screen pt-32 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}
      >
        <PageBackground />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <header className="mb-20">
            <SectionHeading title="Sponsors" subtitle="Join hands with ICONICS'26 to drive the future of technical research." />
          </header>

          {/* Stats row */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { label: 'Network',    val: '500+ Researchers',  desc: 'From 20+ countries worldwide.' },
              { label: 'Visibility', val: 'Global Brand Reach', desc: 'IEEE Proceedings & Conference web.' },
              { label: 'Trust',      val: 'Academic Authority', desc: 'Partnered with NED University.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6"
                style={{ background: 'rgba(255,255,255,0.80)', backdropFilter: 'blur(12px)', border: '1px solid rgba(62,139,135,0.12)', borderRadius: 6, boxShadow: '0 2px 12px rgba(15,76,92,0.05)' }}
              >
                <p style={{ fontSize: 10, fontWeight: 800, color: TEAL_L, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 6 }}>{item.label}</p>
                <h4 style={{ fontSize: 20, fontWeight: 700, color: DARK, marginBottom: 4 }}>{item.val}</h4>
                <p style={{ fontSize: 12, color: MID }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Sponsorship Tiers */}
          <section className="mb-20">
            <h3 style={{ color: DARK, fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 32 }}>
              Sponsorship Tiers
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(62,139,135,0.12)' }}
                  className="p-8 transition-all duration-300"
                  style={{
                    background: 'rgba(255,255,255,0.90)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(62,139,135,0.14)',
                    borderRadius: 6,
                    boxShadow: '0 2px 8px rgba(15,76,92,0.04)',
                  }}
                >
                  <h4 style={{ color: TEAL_L, fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 20 }}>
                    {tier.name}
                  </h4>
                  <ul className="space-y-4">
                    {tier.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-3" style={{ fontSize: 12, color: MID, lineHeight: 1.5 }}>
                        <div className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: TEAL_L }} />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Current Partners */}
          <section className="mb-20">
            <h3 style={{ color: DARK, fontWeight: 800, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 32 }}>
              Current Partners
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { name: 'NED University', sub: 'Host Institution' },
                { name: 'IEEE',           sub: 'Publication'      },
                { name: 'Sponsorship',    sub: 'Available'        },
                { name: 'Sponsorship',    sub: 'Available'        },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center p-8 aspect-[4/3]"
                  style={{ background: 'rgba(255,255,255,0.60)', border: '1px dashed rgba(62,139,135,0.22)', borderRadius: 6 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, color: DARK, marginBottom: 4 }}>{p.name}</p>
                  <p style={{ fontSize: 10, textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.1em', color: MID }}>{p.sub}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Inquiry Form */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-10 lg:p-16"
            style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', border: '1px solid rgba(62,139,135,0.14)', borderRadius: 8, boxShadow: '0 8px 40px rgba(15,76,92,0.08)' }}
          >
            <div className="max-w-3xl">
              <h2 style={{ fontSize: 28, fontWeight: 800, color: DARK, marginBottom: 8 }}>Become a Sponsor</h2>
              <p style={{ color: MID, marginBottom: 36, fontSize: 14, lineHeight: 1.7 }}>
                Fill out the brief inquiry form below. Our secretariat will contact you with a formal proposal within 48 hours.
              </p>
              <ContactForm />
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Sponsors;