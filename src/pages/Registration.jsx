import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { registrationTypes, ieeeDiscount, paymentInfo } from '../data/registration';
import { FaCheck } from 'react-icons/fa';

// ─── constants ───────────────────────────────────────────────────────────────

const PAPER_FORM_URL = 'https://forms.gle/oiEXYLzr6oXRunX36';
const COAUTHOR_FORM_URL = 'https://forms.gle/HVpmzg1m6CRqsD5F7';
const ATTENDEE_FORM_URL = 'https://forms.gle/nmH9FKHjnoVR8zki8';

// ─── Price display helper (page) ─────────────────────────────────────────────

const PriceRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-border-subtle/50 last:border-0">
    <span className="text-text-muted text-sm">{label}</span>
    <span className="text-text-primary font-semibold text-sm">{value}</span>
  </div>
);

// ─── Page ────────────────────────────────────────────────────────────────────

const Registration = () => {
  const [searchParams] = useSearchParams();

  // Deep links: ?type=paper / ?type=participant open the matching Google Form
  useEffect(() => {
    const type = searchParams.get('type');
    if (type === 'paper') {
      window.open(PAPER_FORM_URL, '_blank', 'noopener,noreferrer');
    } else if (type === 'participant') {
      window.open(ATTENDEE_FORM_URL, '_blank', 'noopener,noreferrer');
    }
  }, [searchParams]);

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 sm:pt-28 md:pt-32 pb-16 bg-bg-primary">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <SectionHeading title="Registration" subtitle="Secure your spot at ICONICS'26" />

          {/* IEEE Discount Banner */}
          <motion.div
            className="mb-10 p-5 sm:p-6 rounded-xl border border-accent/30 bg-accent/5 flex flex-col sm:flex-row sm:items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-text-primary font-semibold mb-1">{ieeeDiscount.title}</p>
              <ul className="space-y-0.5">
                {ieeeDiscount.benefits.map((b, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-muted">
                    <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-text-muted mt-2 italic">{ieeeDiscount.note}</p>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
            {registrationTypes.map((regType, index) => (
              <motion.div
                key={index}
                className={`bg-bg-card border rounded-xl p-5 sm:p-6 flex flex-col ${
                  regType.recommended ? 'border-accent shadow-glow' : 'border-border-subtle'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {regType.recommended && (
                  <div className="bg-accent text-white text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-4 self-start">
                    Best Value
                  </div>
                )}
                <h3 className="text-xl font-bold text-text-primary mb-1">{regType.type}</h3>
                <p className="text-text-muted text-xs mb-5">{regType.comingSoon ? 'Coming Soon' : regType.status || `Until ${regType.deadline}`}</p>
                <div className="mb-5">
                  {regType.prices.national_paper        && <PriceRow label="National (Paper)"        value={regType.prices.national_paper} />}
                  {regType.prices.international_paper   && <PriceRow label="International (Paper)"   value={regType.prices.international_paper} />}
                  {regType.prices.professional          && <PriceRow label="Professional / Co-Author" value={regType.prices.professional} />}
                  {regType.prices.student               && <PriceRow label="Student / Co-Author"      value={regType.prices.student} />}
                  {regType.prices.international_delegate && <PriceRow label="International Delegate"  value={regType.prices.international_delegate} />}
                  {regType.prices.ieee_student_paper    && <PriceRow label="Paper (IEEE Student)"     value={regType.prices.ieee_student_paper} />}
                  {regType.prices.ieee_member_paper     && <PriceRow label="Paper (IEEE Member)"      value={regType.prices.ieee_member_paper} />}
                  {regType.prices.ieee_student_attendee && <PriceRow label="Attendee (IEEE Student)"  value={regType.prices.ieee_student_attendee} />}
                  {regType.comingSoon && (
                    <div className="py-2">
                      <span className="text-accent font-bold text-2xl">Coming Soon</span>
                    </div>
                  )}
                  {regType.prices.all && (
                    <div className="py-2">
                      <span className="text-accent font-bold text-2xl">{regType.prices.all}</span>
                      <span className="text-text-muted text-sm ml-2">per person</span>
                    </div>
                  )}
                </div>
                <ul className="space-y-2 mt-auto">
                  {regType.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-text-muted text-sm gap-2">
                      <FaCheck className="text-accent mt-0.5 flex-shrink-0 text-xs" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Register CTAs */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <a href={PAPER_FORM_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-accent hover:bg-accent-light text-white font-semibold rounded text-base transition-all duration-300 hover:shadow-glow">
                Register Paper
              </a>
              <a href={COAUTHOR_FORM_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-white font-semibold rounded text-base transition-all duration-300">
                Register Co-Author
              </a>
              <a href={ATTENDEE_FORM_URL} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-accent text-accent hover:bg-accent hover:text-white font-semibold rounded text-base transition-all duration-300">
                Register Attendee
              </a>
              <button disabled aria-disabled="true"
                className="inline-flex items-center justify-center px-6 py-3 border border-border-subtle text-text-muted font-semibold rounded text-base opacity-50 cursor-not-allowed">
                Register Workshop (Coming Soon)
              </button>
            </div>
            <p className="text-text-muted text-sm mt-3">
              Questions?{' '}
              <a href="mailto:contacticonics@gmail.com" className="text-accent hover:underline">
                contacticonics@gmail.com
              </a>
            </p>
          </motion.div>

          {/* Payment Info + Rules */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              className="bg-bg-card border border-border-subtle rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-bold text-text-primary mb-4">Bank Details (IBFT)</h3>
              <div className="space-y-3">
                {[
                  { label: 'Bank',          value: paymentInfo.bank },
                  { label: 'Account Title', value: paymentInfo.accountTitle },
                  { label: 'Account No.',   value: paymentInfo.accountNumber },
                  { label: 'IBAN',          value: paymentInfo.iban },
                  { label: 'Branch',        value: paymentInfo.branch },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-xs text-text-muted uppercase tracking-wider mb-0.5">{label}</p>
                    <p className="text-text-primary text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 pt-4 border-t border-border-subtle">
                <p className="text-xs text-text-muted uppercase tracking-wider mb-2">Registration Coordinator</p>
                <p className="text-text-primary text-sm font-medium">{paymentInfo.coordinator.name}</p>
                <a href={`mailto:${paymentInfo.coordinator.email}`} className="text-accent text-sm hover:underline">{paymentInfo.coordinator.email}</a>
                <p className="text-text-muted text-sm">{paymentInfo.coordinator.phone}</p>
              </div>
            </motion.div>

            <motion.div
              className="bg-bg-card border border-border-subtle rounded-xl p-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-bold text-text-primary mb-4">Rules & Policies</h3>
              <ul className="space-y-3">
                {paymentInfo.rules.map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Registration;
