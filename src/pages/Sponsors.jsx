import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';

const tiers = [
  {
    name: 'Platinum',
    color: 'from-slate-300 to-slate-100',
    border: 'border-slate-400/40',
    glow: 'hover:shadow-[0_0_30px_rgba(148,163,184,0.2)]',
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
    color: 'from-yellow-300 to-yellow-100',
    border: 'border-yellow-400/40',
    glow: 'hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]',
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
    color: 'from-gray-300 to-gray-100',
    border: 'border-gray-400/40',
    glow: 'hover:shadow-[0_0_30px_rgba(156,163,175,0.15)]',
    perks: [
      'Logo on conference website',
      'Complimentary registrations (2)',
      'Logo in printed program',
      'Social media mention',
    ],
  },
  {
    name: 'Bronze',
    color: 'from-orange-300 to-orange-100',
    border: 'border-orange-400/40',
    glow: 'hover:shadow-[0_0_30px_rgba(251,146,60,0.15)]',
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
    // Opens mailto with pre-filled subject/body
    const subject = encodeURIComponent(`Sponsorship Inquiry — ${form.tier || 'General'} — ${form.org}`);
    const body = encodeURIComponent(
      `Organization: ${form.org}\nContact Name: ${form.name}\nEmail: ${form.email}\nTier of Interest: ${form.tier}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:secretary@nediconics.com?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        className="text-center py-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-text-primary font-bold text-xl mb-2">Thank you for your interest!</h4>
        <p className="text-text-muted">Your email client has been opened with the pre-filled inquiry. We'll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Organization *</label>
          <input
            name="org"
            required
            value={form.org}
            onChange={handleChange}
            placeholder="Company / Institution name"
            className="w-full bg-bg-secondary border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm placeholder-text-muted/50 focus:border-accent/60 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Contact Name *</label>
          <input
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="w-full bg-bg-secondary border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm placeholder-text-muted/50 focus:border-accent/60 focus:outline-none transition-colors"
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Email *</label>
          <input
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="contact@company.com"
            className="w-full bg-bg-secondary border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm placeholder-text-muted/50 focus:border-accent/60 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Tier of Interest</label>
          <select
            name="tier"
            value={form.tier}
            onChange={handleChange}
            className="w-full bg-bg-secondary border border-border-subtle rounded-lg px-4 py-3 text-sm focus:border-accent/60 focus:outline-none transition-colors text-text-primary"
          >
            <option value="" className="bg-bg-card">Select a tier...</option>
            {tiers.map(t => (
              <option key={t.name} value={t.name} className="bg-bg-card">{t.name} Sponsor</option>
            ))}
            <option value="Custom" className="bg-bg-card">Custom / General Inquiry</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          placeholder="Tell us about your organization and sponsorship goals..."
          className="w-full bg-bg-secondary border border-border-subtle rounded-lg px-4 py-3 text-text-primary text-sm placeholder-text-muted/50 focus:border-accent/60 focus:outline-none transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3 bg-accent hover:bg-accent-light text-text-primary font-semibold rounded-lg transition-all duration-300 hover:shadow-glow text-sm"
      >
        Send Sponsorship Inquiry
      </button>
    </form>
  );
};

const Sponsors = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
          <SectionHeading
            title="Sponsors"
            subtitle="Partner with ICONICS'26 and connect with 500+ researchers"
          />

          {/* Why Sponsor */}
          <motion.section
            className="mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  title: '500+ Attendees',
                  desc: 'Researchers, academics, and industry professionals from 20+ countries.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                    </svg>
                  ),
                  title: 'Global Visibility',
                  desc: 'Your brand featured across conference materials, website, and IEEE proceedings.',
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: 'Research Credibility',
                  desc: 'Associate your brand with IEEE-quality research and NED University.',
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-bg-card border border-border-subtle rounded-xl p-5 flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-text-primary font-semibold mb-1">{item.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Sponsorship Tiers */}
          <section className="mb-14">
            <h3 className="text-xl font-bold text-text-primary mb-6">Sponsorship Tiers</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  className={`bg-bg-card border ${tier.border} rounded-xl p-5 transition-all duration-300 ${tier.glow}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={`text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${tier.color} bg-clip-text text-transparent mb-4`}>
                    {tier.name}
                  </div>
                  <ul className="space-y-2">
                    {tier.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-text-muted">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            <p className="text-text-muted text-xs mt-4">
              Custom sponsorship packages are available. Contact us to discuss your specific needs.
            </p>
          </section>

          {/* Current Sponsors placeholder */}
          <section className="mb-14">
            <h3 className="text-xl font-bold text-text-primary mb-6">Current Sponsors & Partners</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {/* NED University */}
              <div className="bg-bg-card border border-border-subtle rounded-xl p-6 flex items-center justify-center aspect-[3/2]">
                <div className="text-center">
                  <p className="text-text-primary font-bold text-sm">NED University</p>
                  <p className="text-text-muted text-xs">Host Institution</p>
                </div>
              </div>
              {/* IEEE */}
              <div className="bg-bg-card border border-border-subtle rounded-xl p-6 flex items-center justify-center aspect-[3/2]">
                <div className="text-center">
                  <p className="text-text-primary font-bold text-sm">IEEE</p>
                  <p className="text-text-muted text-xs">Publication Partner</p>
                </div>
              </div>
              {/* Your logo here */}
              {[1, 2].map(i => (
                <div key={i} className="bg-bg-card border border-dashed border-border-subtle rounded-xl p-6 flex items-center justify-center aspect-[3/2]">
                  <p className="text-text-muted/40 text-xs text-center">Your logo here</p>
                </div>
              ))}
            </div>
          </section>

          {/* Reach Out Form */}
          <section>
            <motion.div
              className="bg-bg-card border border-border-subtle rounded-xl p-6 sm:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-text-primary mb-2">Become a Sponsor</h3>
                <p className="text-text-muted text-sm">
                  Interested in sponsoring ICONICS'26? Fill out the form below and we'll get back to you within 2–3 business days.
                </p>
              </div>
              <ContactForm />
            </motion.div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Sponsors;
