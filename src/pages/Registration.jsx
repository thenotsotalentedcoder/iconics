import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { registrationTypes, ieeeDiscount, paymentInfo } from '../data/registration';
import { FaCheck } from 'react-icons/fa';

// ─── constants ───────────────────────────────────────────────────────────────

const CATEGORY_OPTIONS = [
  { value: 'national_paper',         label: 'National — Paper Author',      prices: { early: 'PKR 7,000', regular: 'PKR 8,000', onsite: 'PKR 9,000' } },
  { value: 'international_paper',    label: 'International — Paper Author', prices: { early: 'USD 40',    regular: 'USD 50',    onsite: 'USD 60'    } },
  { value: 'professional',           label: 'Professional / Co-Author',     prices: { early: 'PKR 2,500', regular: 'PKR 3,000', onsite: 'PKR 3,500' } },
  { value: 'student',                label: 'Student / Student Co-Author',  prices: { early: 'PKR 1,000', regular: 'PKR 1,500', onsite: 'PKR 2,000' } },
  { value: 'international_delegate', label: 'International Delegate',       prices: { early: 'USD 80',    regular: 'USD 100',   onsite: 'USD 120'   } },
  { value: 'workshop_only',          label: 'Workshop Only',                prices: { early: 'PKR 5,000', regular: 'PKR 5,000', onsite: 'PKR 5,000' } },
];

const WORKSHOP_OPTIONS = [
  { value: 'quantum', label: 'Quantum Technologies Workshop' },
  { value: 'nlp',     label: 'NLP — Contrastive Learning for Word Embedding' },
  { value: 'both',    label: 'Both Workshops' },
];

const STEPS = ['Personal Info', 'Registration', 'Payment', 'Review'];

const isPaperCategory    = (c) => ['national_paper', 'international_paper'].includes(c);
const isWorkshopCategory = (c) => c === 'workshop_only';

const getPriceTier = () => {
  const now = new Date();
  if (now <= new Date('2026-08-10')) return 'early';
  if (now <= new Date('2026-10-05')) return 'regular';
  return 'onsite';
};

const getPrice = (catValue, isIEEE) => {
  if (!catValue) return null;
  const cat  = CATEGORY_OPTIONS.find(c => c.value === catValue);
  if (!cat) return null;
  const base = cat.prices[getPriceTier()];
  if (isIEEE && catValue === 'student') return { label: 'Free', note: 'IEEE Student Member waiver' };
  if (isIEEE) return { label: base, note: '−15% IEEE member discount applies' };
  return { label: base, note: null };
};

const INITIAL_FORM = {
  fullName: '', email: '', phone: '', institution: '', country: '',
  category: '', isIEEE: false, ieeeId: '', workshop: '',
  paperTitle: '', paperId: '', coAuthors: '',
  transactionId: '', transactionDate: '', amountPaid: '', bankName: '',
};

// ─── small field components ──────────────────────────────────────────────────

const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
    {children}{required && <span className="text-accent ml-1">*</span>}
  </label>
);

const inputBase = 'w-full bg-bg-primary border rounded-lg px-4 py-3 text-text-primary text-sm placeholder-text-muted/40 focus:outline-none transition-colors duration-200';
const inputOk   = 'border-border-subtle focus:border-accent/60';
const inputErr  = 'border-red-500/50 focus:border-red-500/80';

const Input = ({ error, ...props }) => (
  <input {...props} className={`${inputBase} ${error ? inputErr : inputOk}`} />
);

const Select = ({ error, children, ...props }) => (
  <select {...props} className={`${inputBase} ${error ? inputErr : inputOk} text-text-primary`}>
    {children}
  </select>
);

const FieldError = ({ msg }) =>
  msg ? <p className="text-red-400 text-xs mt-1">{msg}</p> : null;

const InfoNote = ({ children }) => (
  <p className="flex items-start gap-1.5 text-text-muted/60 text-xs mt-1.5 leading-relaxed">
    <svg className="w-3 h-3 mt-0.5 shrink-0 text-text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    {children}
  </p>
);

// ─── step indicator ──────────────────────────────────────────────────────────

const StepBar = ({ current }) => (
  <div className="flex items-center gap-2">
    {STEPS.map((name, i) => (
      <div key={i} className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 shrink-0 ${
            i < current  ? 'bg-accent text-white' :
            i === current ? 'bg-accent text-text-primary ring-2 ring-accent/30 ring-offset-1 ring-offset-bg-card' :
                           'bg-bg-primary border border-border-subtle text-text-muted'
          }`}>
            {i < current ? <FaCheck className="w-2.5 h-2.5" /> : i + 1}
          </div>
          <span className={`text-xs hidden sm:block transition-colors ${i === current ? 'text-text-primary font-medium' : 'text-text-muted'}`}>
            {name}
          </span>
        </div>
        {i < STEPS.length - 1 && (
          <div className={`h-px w-4 sm:w-8 transition-all duration-300 ${i < current ? 'bg-accent' : 'bg-border-subtle'}`} />
        )}
      </div>
    ))}
  </div>
);

// ─── registration form (inside modal) ────────────────────────────────────────

const RegistrationForm = ({ onClose }) => {
  const [step, setStep]     = useState(0);
  const [form, setForm]     = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [done, setDone]     = useState(false);

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!form.fullName.trim())    e.fullName    = 'Required.';
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                    e.email       = 'Valid email required.';
      if (!form.phone.trim())       e.phone       = 'Required.';
      if (!form.institution.trim()) e.institution = 'Required.';
      if (!form.country.trim())     e.country     = 'Required.';
    }
    if (s === 1) {
      if (!form.category)           e.category    = 'Please select a category.';
      if (form.isIEEE && !form.ieeeId.trim()) e.ieeeId = 'IEEE membership ID required.';
      if (isPaperCategory(form.category)) {
        if (!form.paperTitle.trim()) e.paperTitle = 'Paper title required.';
        if (!form.paperId.trim())    e.paperId    = 'EasyChair paper ID required.';
      }
      if (isWorkshopCategory(form.category) && !form.workshop)
                                    e.workshop    = 'Please select a workshop.';
    }
    if (s === 2) {
      if (!form.transactionId.trim())  e.transactionId  = 'Required.';
      if (!form.transactionDate)       e.transactionDate = 'Required.';
      if (!form.amountPaid.trim())     e.amountPaid     = 'Required.';
      if (!form.bankName.trim())       e.bankName       = 'Required.';
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(s => s + 1);
  };

  const back = () => setStep(s => s - 1);

  const submit = () => {
    const catLabel   = CATEGORY_OPTIONS.find(c => c.value === form.category)?.label || form.category;
    const price      = getPrice(form.category, form.isIEEE);
    const workshopLbl = WORKSHOP_OPTIONS.find(w => w.value === form.workshop)?.label || '—';

    const subject = encodeURIComponent(`ICONICS'26 Registration — ${form.fullName} — ${catLabel}`);
    const body = encodeURIComponent([
      `=== ICONICS'26 CONFERENCE REGISTRATION ===`,
      ``,
      `── Personal Information ──`,
      `Full Name:        ${form.fullName}`,
      `Email:            ${form.email}`,
      `Phone:            ${form.phone}`,
      `Institution:      ${form.institution}`,
      `Country:          ${form.country}`,
      ``,
      `── Registration Details ──`,
      `Category:         ${catLabel}`,
      `Fee:              ${price?.label || '—'}${price?.note ? ` (${price.note})` : ''}`,
      `IEEE Member:      ${form.isIEEE ? `Yes — ID: ${form.ieeeId}` : 'No'}`,
      ...(isPaperCategory(form.category) ? [
        `Paper Title:      ${form.paperTitle}`,
        `EasyChair ID:     ${form.paperId}`,
        `Co-Authors:       ${form.coAuthors || '—'}`,
      ] : []),
      ...(form.workshop ? [`Workshop:         ${workshopLbl}`] : []),
      ``,
      `── Payment Information ──`,
      `Transaction ID:   ${form.transactionId}`,
      `Transaction Date: ${form.transactionDate}`,
      `Amount Paid:      ${form.amountPaid}`,
      `Bank:             ${form.bankName}`,
      ``,
      `===========================================`,
    ].join('\n'));

    window.open(`mailto:registration@nediconics.com?subject=${subject}&body=${body}`, '_blank');
    setDone(true);
  };

  const price = getPrice(form.category, form.isIEEE);

  // ── success ──
  if (done) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-6"
        >
          <svg className="w-10 h-10 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
        <h3 className="text-2xl font-bold text-text-primary mb-2">Registration Submitted</h3>
        <p className="text-text-muted text-sm max-w-sm mb-8 leading-relaxed">
          Your email client has opened with all details pre-filled. Send that email to complete your registration.
        </p>
        <div className="w-full max-w-sm bg-bg-primary rounded-xl border border-border-subtle p-5 text-left space-y-3 mb-8">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">What happens next</p>
          {[
            'Send the pre-filled email from your email client',
            'Transfer the registration fee to the bank account',
            'Organizers verify your transaction ID (no duplicates allowed)',
            'Receive confirmation email within 2–3 business days',
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-3 text-sm text-text-muted">
              <span className="w-5 h-5 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
              {s}
            </div>
          ))}
        </div>
        <button onClick={onClose} className="px-6 py-2.5 bg-accent hover:bg-accent-light text-text-primary rounded-lg text-sm font-semibold transition-all duration-200">
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* ── fixed header ── */}
      <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-border-subtle shrink-0">
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <h3 className="text-xl font-bold text-text-primary">Register for ICONICS'26</h3>
            <p className="text-text-muted text-sm mt-0.5">October 10–11, 2026 · NED University, Karachi</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-bg-primary border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-dark transition-all shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <StepBar current={step} />
      </div>

      {/* ── scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.2 }}
          >

            {/* step 0 — personal */}
            {step === 0 && (
              <div className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label required>Full Name</Label>
                    <Input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Dr. Jane Smith" error={errors.fullName} />
                    <FieldError msg={errors.fullName} />
                  </div>
                  <div>
                    <Label required>Email Address</Label>
                    <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="jane@university.edu" error={errors.email} />
                    <FieldError msg={errors.email} />
                  </div>
                  <div>
                    <Label required>Phone Number</Label>
                    <Input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+92 300 0000000" error={errors.phone} />
                    <FieldError msg={errors.phone} />
                  </div>
                  <div>
                    <Label required>Institution / Affiliation</Label>
                    <Input value={form.institution} onChange={e => set('institution', e.target.value)} placeholder="NED University" error={errors.institution} />
                    <FieldError msg={errors.institution} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label required>Country</Label>
                    <Input value={form.country} onChange={e => set('country', e.target.value)} placeholder="Pakistan" error={errors.country} />
                    <FieldError msg={errors.country} />
                  </div>
                </div>
              </div>
            )}

            {/* step 1 — registration details */}
            {step === 1 && (
              <div className="space-y-5">
                {/* category */}
                <div>
                  <Label required>Registration Category</Label>
                  <Select value={form.category} onChange={e => set('category', e.target.value)} error={errors.category}>
                    <option value="" className="bg-bg-card">Select a category...</option>
                    {CATEGORY_OPTIONS.map(c => (
                      <option key={c.value} value={c.value} className="bg-bg-card">{c.label}</option>
                    ))}
                  </Select>
                  <FieldError msg={errors.category} />
                  {price && (
                    <div className="mt-2 flex items-center justify-between px-3 py-2 rounded-lg bg-accent/5 border border-accent/20">
                      <span className="text-xs text-text-muted">Your fee ({getPriceTier()} rate)</span>
                      <div className="text-right">
                        <span className="text-accent font-bold text-sm">{price.label}</span>
                        {price.note && <p className="text-text-muted/60 text-xs">{price.note}</p>}
                      </div>
                    </div>
                  )}
                </div>

                {/* IEEE */}
                <div>
                  <button
                    type="button"
                    onClick={() => set('isIEEE', !form.isIEEE)}
                    className="flex items-center gap-3 group"
                  >
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${
                      form.isIEEE ? 'bg-accent border-accent' : 'border-border-subtle group-hover:border-accent/50'
                    }`}>
                      {form.isIEEE && <FaCheck className="text-text-primary text-xs" />}
                    </div>
                    <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors text-left">
                      I am an IEEE member <span className="text-accent">(students: fee waived · others: 15% off)</span>
                    </span>
                  </button>
                  {form.isIEEE && (
                    <div className="mt-3 ml-8">
                      <Label required>IEEE Membership ID</Label>
                      <Input value={form.ieeeId} onChange={e => set('ieeeId', e.target.value)} placeholder="e.g. 12345678" error={errors.ieeeId} />
                      <FieldError msg={errors.ieeeId} />
                      <InfoNote>Your ID will be verified by the organizers before confirmation.</InfoNote>
                    </div>
                  )}
                </div>

                {/* paper details */}
                {isPaperCategory(form.category) && (
                  <div className="space-y-4 pt-4 border-t border-border-subtle">
                    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">Paper Details</p>
                    <div>
                      <Label required>Paper Title</Label>
                      <Input value={form.paperTitle} onChange={e => set('paperTitle', e.target.value)} placeholder="Full title of your submitted paper" error={errors.paperTitle} />
                      <FieldError msg={errors.paperTitle} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <Label required>EasyChair Paper ID</Label>
                        <Input value={form.paperId} onChange={e => set('paperId', e.target.value)} placeholder="e.g. 42" error={errors.paperId} />
                        <FieldError msg={errors.paperId} />
                        <InfoNote>Found in your EasyChair submission dashboard.</InfoNote>
                      </div>
                      <div>
                        <Label>Co-Authors</Label>
                        <Input value={form.coAuthors} onChange={e => set('coAuthors', e.target.value)} placeholder="Names, comma-separated" />
                      </div>
                    </div>
                  </div>
                )}

                {/* workshop */}
                <div className="pt-4 border-t border-border-subtle">
                  <Label required={isWorkshopCategory(form.category)}>
                    Workshop{!isWorkshopCategory(form.category) && <span className="text-text-muted/50 font-normal normal-case tracking-normal ml-1">(optional)</span>}
                  </Label>
                  <Select value={form.workshop} onChange={e => set('workshop', e.target.value)} error={errors.workshop}>
                    <option value="" className="bg-bg-card">
                      {isWorkshopCategory(form.category) ? 'Select a workshop...' : 'No workshop'}
                    </option>
                    {WORKSHOP_OPTIONS.map(w => (
                      <option key={w.value} value={w.value} className="bg-bg-card">{w.label}</option>
                    ))}
                  </Select>
                  <FieldError msg={errors.workshop} />
                </div>
              </div>
            )}

            {/* step 2 — payment */}
            {step === 2 && (
              <div className="space-y-5">
                {/* bank reminder */}
                <div className="p-4 rounded-xl bg-bg-primary border border-border-subtle text-sm">
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Transfer payment to</p>
                  <div className="space-y-1.5">
                    <p className="text-text-primary"><span className="text-text-muted">Bank: </span>{paymentInfo.bank}</p>
                    <p className="text-text-primary"><span className="text-text-muted">Account: </span>{paymentInfo.accountTitle}</p>
                    <p className="text-text-primary font-mono text-xs"><span className="text-text-muted">IBAN: </span>{paymentInfo.iban}</p>
                  </div>
                  {price && (
                    <div className="mt-3 pt-3 border-t border-border-subtle flex items-center justify-between">
                      <span className="text-text-muted text-xs">Amount due</span>
                      <span className="text-accent font-bold">{price.label}</span>
                    </div>
                  )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label required>Transaction ID / Reference No.</Label>
                    <Input
                      value={form.transactionId}
                      onChange={e => set('transactionId', e.target.value)}
                      placeholder="e.g. TXN-20260810-XXXXX"
                      error={errors.transactionId}
                    />
                    <FieldError msg={errors.transactionId} />
                    <InfoNote>
                      Each transaction ID can only be used once — duplicate submissions will be rejected by the organizers.
                    </InfoNote>
                  </div>
                  <div>
                    <Label required>Transaction Date</Label>
                    <Input
                      type="date"
                      value={form.transactionDate}
                      onChange={e => set('transactionDate', e.target.value)}
                      error={errors.transactionDate}
                      max={new Date().toISOString().split('T')[0]}
                    />
                    <FieldError msg={errors.transactionDate} />
                  </div>
                  <div>
                    <Label required>Amount Paid</Label>
                    <Input
                      value={form.amountPaid}
                      onChange={e => set('amountPaid', e.target.value)}
                      placeholder="e.g. PKR 7,000"
                      error={errors.amountPaid}
                    />
                    <FieldError msg={errors.amountPaid} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label required>Your Bank Name</Label>
                    <Input
                      value={form.bankName}
                      onChange={e => set('bankName', e.target.value)}
                      placeholder="e.g. HBL, UBL, Meezan..."
                      error={errors.bankName}
                    />
                    <FieldError msg={errors.bankName} />
                  </div>
                </div>
                <InfoNote>Keep your payment receipt — the organizers may request it during verification.</InfoNote>
              </div>
            )}

            {/* step 3 — review */}
            {step === 3 && (
              <div className="space-y-4">
                <p className="text-text-muted text-sm">Please confirm everything looks correct before submitting.</p>

                {[
                  {
                    title: 'Personal Information',
                    rows: [
                      ['Full Name',    form.fullName],
                      ['Email',        form.email],
                      ['Phone',        form.phone],
                      ['Institution',  form.institution],
                      ['Country',      form.country],
                    ],
                  },
                  {
                    title: 'Registration Details',
                    rows: [
                      ['Category',    CATEGORY_OPTIONS.find(c => c.value === form.category)?.label || '—'],
                      ['Fee',         price ? `${price.label}${price.note ? ` (${price.note})` : ''}` : '—'],
                      ['IEEE Member', form.isIEEE ? `Yes — ID: ${form.ieeeId}` : 'No'],
                      ...(isPaperCategory(form.category) ? [
                        ['Paper Title',   form.paperTitle],
                        ['EasyChair ID',  form.paperId],
                        ['Co-Authors',    form.coAuthors || '—'],
                      ] : []),
                      ...(form.workshop ? [['Workshop', WORKSHOP_OPTIONS.find(w => w.value === form.workshop)?.label]] : []),
                    ],
                  },
                  {
                    title: 'Payment',
                    rows: [
                      ['Transaction ID',   form.transactionId],
                      ['Date',             form.transactionDate],
                      ['Amount Paid',      form.amountPaid],
                      ['Bank',             form.bankName],
                    ],
                  },
                ].map(section => (
                  <div key={section.title} className="rounded-xl border border-border-subtle overflow-hidden">
                    <div className="px-4 py-2.5 bg-bg-primary border-b border-border-subtle">
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wider">{section.title}</p>
                    </div>
                    <div className="px-4 divide-y divide-border-subtle/50">
                      {section.rows.map(([label, value]) => (
                        <div key={label} className="flex items-start justify-between py-2.5 gap-4">
                          <span className="text-text-muted text-sm shrink-0">{label}</span>
                          <span className="text-text-primary text-sm text-right break-all">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <p className="text-text-muted/50 text-xs leading-relaxed pt-1">
                  Submitting will open your email client with these details pre-filled. Send that email to complete registration.
                </p>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── fixed footer ── */}
      <div className="px-6 sm:px-8 py-4 border-t border-border-subtle flex items-center justify-between shrink-0">
        <button
          onClick={back}
          disabled={step === 0}
          className="px-5 py-2.5 border border-border-subtle text-text-muted rounded-lg text-sm font-medium hover:text-text-primary hover:border-border-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Back
        </button>
        <div className="flex items-center gap-3">
          <span className="text-text-muted text-xs hidden sm:block">{step + 1} / {STEPS.length}</span>
          {step < STEPS.length - 1 ? (
            <button
              onClick={next}
              className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-glow"
            >
              Continue
            </button>
          ) : (
            <button
              onClick={submit}
              className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-glow flex items-center gap-2"
            >
              Submit Registration
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── registration modal ───────────────────────────────────────────────────────

const RegistrationModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen)  document.body.style.overflow = 'hidden';
    else         document.body.style.overflow = '';
    return ()  => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* panel */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-bg-card border border-border-subtle rounded-2xl w-full max-w-2xl flex flex-col"
              style={{ maxHeight: 'min(90vh, 700px)' }}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1,    y: 0  }}
              exit={{ opacity: 0,    scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <RegistrationForm onClose={onClose} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── price display helper (page) ─────────────────────────────────────────────

const PriceRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-border-subtle/50 last:border-0">
    <span className="text-text-muted text-sm">{label}</span>
    <span className="text-text-primary font-semibold text-sm">{value}</span>
  </div>
);

// ─── page ────────────────────────────────────────────────────────────────────

const Registration = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-12">
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
                <p className="text-text-muted text-xs mb-5">Until {regType.deadline}</p>
                <div className="mb-5">
                  {regType.prices.national_paper        && <PriceRow label="National (Paper)"        value={regType.prices.national_paper} />}
                  {regType.prices.international_paper   && <PriceRow label="International (Paper)"   value={regType.prices.international_paper} />}
                  {regType.prices.professional          && <PriceRow label="Professional / Co-Author" value={regType.prices.professional} />}
                  {regType.prices.student               && <PriceRow label="Student / Co-Author"      value={regType.prices.student} />}
                  {regType.prices.international_delegate && <PriceRow label="International Delegate"  value={regType.prices.international_delegate} />}
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

          {/* Register CTA */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-3 px-10 py-4 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl text-base transition-all duration-300 hover:shadow-glow"
            >
              Register Now
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <p className="text-text-muted text-sm mt-3">
              Questions?{' '}
              <a href="mailto:registration@nediconics.com" className="text-accent hover:underline">
                registration@nediconics.com
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

      <RegistrationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </PageTransition>
  );
};

export default Registration;
