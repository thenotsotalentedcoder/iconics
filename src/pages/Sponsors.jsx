import { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PageBackground from '../components/animations/PageBackground';

const tiers = [
  {
    name: 'Platinum',
    border: 'border-[#5AA8A3]/40',
    glow: 'hover:shadow-[0_0_30px_rgba(90,168,163,0.2)]',
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
    border: 'border-[#5AA8A3]/20',
    glow: 'hover:shadow-[0_0_30px_rgba(90,168,163,0.1)]',
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
    border: 'border-gray-200',
    glow: 'hover:shadow-[0_0_30px_rgba(0,0,0,0.05)]',
    perks: [
      'Logo on conference website',
      'Complimentary registrations (2)',
      'Logo in printed program',
      'Social media mention',
    ],
  },
  {
    name: 'Bronze',
    border: 'border-gray-100',
    glow: 'hover:shadow-[0_0_20px_rgba(0,0,0,0.02)]',
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

  if (submitted) {
    return (
      <motion.div className="text-center py-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="w-16 h-16 rounded-full bg-[#5AA8A3]/10 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#5AA8A3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-gray-900 font-bold text-xl mb-2">Inquiry Sent</h4>
        <p className="text-gray-500">Your mail client has been opened. We'll get back to you shortly.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="org" required value={form.org} onChange={handleChange} placeholder="Organization *" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:border-[#5AA8A3] focus:outline-none transition-colors" />
        <input name="name" required value={form.name} onChange={handleChange} placeholder="Contact Name *" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:border-[#5AA8A3] focus:outline-none transition-colors" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email *" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:border-[#5AA8A3] focus:outline-none transition-colors" />
        <select name="tier" value={form.tier} onChange={handleChange} className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm focus:border-[#5AA8A3] focus:outline-none text-gray-900">
          <option value="">Select a tier...</option>
          {tiers.map(t => <option key={t.name} value={t.name}>{t.name} Sponsor</option>)}
          <option value="Custom">Custom Inquiry</option>
        </select>
      </div>
      <textarea name="message" value={form.message} onChange={handleChange} rows={4} placeholder="Your message..." className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm focus:border-[#5AA8A3] focus:outline-none resize-none" />
      <button type="submit" className="w-full sm:w-auto px-8 py-3 bg-[#5AA8A3] text-white font-bold rounded-lg hover:bg-[#3E8B87] transition-all duration-300 text-sm uppercase tracking-widest">
        Send Inquiry
      </button>
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
            <SectionHeading title="Sponsors" subtitle="Join hands with ICONICS'26 to drive the future of technical research." className="!text-left !text-gray-900" />
          </header>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              { label: 'Network', val: '500+ Researchers', desc: 'From 20+ countries worldwide.' },
              { label: 'Visibility', val: 'Global Brand Reach', desc: 'IEEE Proceedings & Conference web.' },
              { label: 'Trust', val: 'Academic Authority', desc: 'Partnered with NED University.' }
            ].map((item, i) => (
              <motion.div key={i} className="bg-white/80 backdrop-blur-md border border-gray-100 p-6 rounded-2xl shadow-sm">
                <p className="text-[10px] font-black text-[#5AA8A3] uppercase tracking-widest mb-2">{item.label}</p>
                <h4 className="text-gray-900 font-bold text-xl mb-1">{item.val}</h4>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <section className="mb-20">
            <h3 className="text-gray-900 font-black text-sm uppercase mb-8 tracking-tighter">Sponsorship_Tiers</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {tiers.map((tier, i) => (
                <motion.div key={tier.name} className={`bg-white/90 backdrop-blur-md border ${tier.border} rounded-[2rem] p-8 transition-all duration-300 ${tier.glow}`}>
                  <h4 className="text-[#5AA8A3] font-black text-xs uppercase tracking-widest mb-6">{tier.name}</h4>
                  <ul className="space-y-4">
                    {tier.perks.map((perk, j) => (
                      <li key={j} className="flex items-start gap-3 text-xs text-gray-500 leading-snug">
                        <div className="w-1 h-1 rounded-full bg-[#5AA8A3] mt-1.5 shrink-0" />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-20">
            <h3 className="text-gray-900 font-black text-sm uppercase mb-8 tracking-tighter">Current_Partners</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {[
                { name: 'NED University', sub: 'Host Institution' },
                { name: 'IEEE', sub: 'Publication' },
                { name: 'Sponsorship', sub: 'Available' },
                { name: 'Sponsorship', sub: 'Available' }
              ].map((p, i) => (
                <div key={i} className="bg-white/60 border border-dashed border-gray-200 rounded-3xl p-8 flex flex-col items-center justify-center text-center aspect-[4/3]">
                  <p className="text-gray-900 font-bold text-sm mb-1">{p.name}</p>
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">{p.sub}</p>
                </div>
              ))}
            </div>
          </section>

          <motion.section className="bg-white/95 backdrop-blur-xl border border-gray-100 rounded-[3rem] p-10 lg:p-16 shadow-2xl">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Become a Sponsor</h2>
              <p className="text-gray-500 mb-10">Fill out the brief inquiry form below. Our secretariat will contact you with a formal proposal within 48 hours.</p>
              <ContactForm />
            </div>
          </motion.section>
        </div>
      </div>
    </PageTransition>
  );
};

export default Sponsors;