import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { registrationTypes, ieeeDiscount, paymentInfo } from '../data/registration';
import { FaCheck } from 'react-icons/fa';

// ─── constants ───────────────────────────────────────────────────────────────

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';


// ─── small field components ──────────────────────────────────────────────────

const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">
    {children}{required && <span className="text-accent ml-1">*</span>}
  </label>
);

const inputBase = 'w-full bg-bg-primary border rounded-lg px-4 py-3 text-text-primary text-sm placeholder-text-muted/40 focus:outline-none transition-colors duration-200';
const inputOk   = 'border-border-subtle focus:border-accent/60';
const inputErr  = 'border-teal-500/50 focus:border-teal-500/80';

const Input = ({ error, ...props }) => (
  <input {...props} className={`${inputBase} ${error ? inputErr : inputOk}`} />
);

const Textarea = ({ error, ...props }) => (
  <textarea {...props} className={`${inputBase} ${error ? inputErr : inputOk} min-h-[80px] resize-y`} />
);

const FileInput = ({ error, label, accept, note, onChange, fileName }) => (
  <div>
    <Label required>{label}</Label>
    <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors duration-200 ${error ? inputErr : 'border-border-subtle hover:border-accent/60'}`}>
      <svg className="w-5 h-5 text-text-muted shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
      </svg>
      <span className="text-sm text-text-muted truncate flex-1">
        {fileName || 'Choose file...'}
      </span>
      <input type="file" accept={accept} onChange={onChange} className="hidden" />
    </label>
    {note && <p className="text-text-muted/60 text-xs mt-1">{note}</p>}
  </div>
);

const FieldError = ({ msg }) =>
  msg ? <p className="text-[#5AA8A3] text-xs mt-1">{msg}</p> : null;

const InfoNote = ({ children }) => (
  <p className="flex items-start gap-1.5 text-text-muted/60 text-xs mt-1.5 leading-relaxed">
    <svg className="w-3 h-3 mt-0.5 shrink-0 text-text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    {children}
  </p>
);

// ─── Tab selector for registration type ──────────────────────────────────────

const FORM_TYPES = [
  { key: 'participant', label: 'Conference Participant' },
  { key: 'paper',       label: 'Paper Author' },
  { key: 'workshop',    label: 'Workshop' },
];

const FormTypeSelector = ({ active, onChange }) => (
  <div className="flex gap-1 p-1 bg-bg-primary rounded-xl border border-border-subtle mb-6">
    {FORM_TYPES.map(t => (
      <button
        key={t.key}
        onClick={() => onChange(t.key)}
        className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
          active === t.key
            ? 'bg-accent text-white shadow-sm'
            : 'text-text-muted hover:text-text-primary'
        }`}
      >
        {t.label}
      </button>
    ))}
  </div>
);

// ─── step indicator ──────────────────────────────────────────────────────────

const getSteps = (formType) => {
  if (formType === 'workshop') return ['Personal Info', 'Details', 'Review'];
  if (formType === 'paper')   return ['Registration Type', 'Paper Info', 'Payment', 'Review'];
  return ['Registration Type', 'Personal Info', 'Payment', 'Review'];
};

const StepBar = ({ current, steps }) => (
  <div className="flex items-center gap-2">
    {steps.map((name, i) => (
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
        {i < steps.length - 1 && (
          <div className={`h-px w-4 sm:w-8 transition-all duration-300 ${i < current ? 'bg-accent' : 'bg-border-subtle'}`} />
        )}
      </div>
    ))}
  </div>
);

// ─── Workshop Registration Form ──────────────────────────────────────────────

const WorkshopForm = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: '', fullName: '', mobileNumber: '', cnicNumber: '',
    institutionOrg: '', semesterDesignation: '', professionalAddress: '',
    highestDegree: '', quantumCourses: '', whyWorkshopHelps: '',
    travelArrangement: '', attendanceCertificate: false, termsAgreed: false,
  });
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const steps = getSteps('workshop');
  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required.';
      if (!form.fullName.trim()) e.fullName = 'Required.';
      if (!form.mobileNumber.trim()) e.mobileNumber = 'Required.';
      if (!form.cnicNumber.trim()) e.cnicNumber = 'Required.';
      if (!form.institutionOrg.trim()) e.institutionOrg = 'Required.';
      if (!form.semesterDesignation.trim()) e.semesterDesignation = 'Required.';
      if (!form.professionalAddress.trim()) e.professionalAddress = 'Required.';
      if (!form.highestDegree.trim()) e.highestDegree = 'Required.';
    }
    if (s === 1) {
      if (!form.quantumCourses.trim()) e.quantumCourses = 'Required.';
      if (!form.whyWorkshopHelps.trim()) e.whyWorkshopHelps = 'Required.';
      if (!form.travelArrangement.trim()) e.travelArrangement = 'Required.';
      if (!form.termsAgreed) e.termsAgreed = 'You must agree to the terms.';
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(s => s + 1);
  };

  const submit = async () => {
    setSubmitting(true);
    setApiError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (resume) formData.append('resume', resume);

      const res = await fetch(`${API_BASE}/api/register/workshop`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.errors?.map(e => e.message).join(', ') || 'Registration failed');
      }
      setDone(true);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return <SuccessScreen type="Workshop" onClose={onClose} />;

  return (
    <FormShell title="Workshop Registration" steps={steps} step={step} onClose={onClose}
      onBack={() => setStep(s => s - 1)} onNext={next}
      onSubmit={submit} submitting={submitting} apiError={apiError}
    >
      {step === 0 && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label required>Email</Label>
              <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" error={errors.email} />
              <FieldError msg={errors.email} />
            </div>
            <div>
              <Label required>Full Name</Label>
              <Input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Muhammad Ali" error={errors.fullName} />
              <FieldError msg={errors.fullName} />
            </div>
            <div>
              <Label required>Mobile Number</Label>
              <Input type="tel" value={form.mobileNumber} onChange={e => set('mobileNumber', e.target.value)} placeholder="+92 300 0000000" error={errors.mobileNumber} />
              <FieldError msg={errors.mobileNumber} />
            </div>
            <div>
              <Label required>CNIC Number</Label>
              <Input value={form.cnicNumber} onChange={e => set('cnicNumber', e.target.value)} placeholder="42101-1234567-8" error={errors.cnicNumber} />
              <FieldError msg={errors.cnicNumber} />
            </div>
            <div>
              <Label required>Institution / Organization</Label>
              <Input value={form.institutionOrg} onChange={e => set('institutionOrg', e.target.value)} placeholder="NED University" error={errors.institutionOrg} />
              <FieldError msg={errors.institutionOrg} />
              <InfoNote>Students: add your institution. Professionals: mention your organization.</InfoNote>
            </div>
            <div>
              <Label required>Semester / Designation</Label>
              <Input value={form.semesterDesignation} onChange={e => set('semesterDesignation', e.target.value)} placeholder="7th Semester / Senior Engineer" error={errors.semesterDesignation} />
              <FieldError msg={errors.semesterDesignation} />
              <InfoNote>Students: enter current semester. Professionals: enter designation.</InfoNote>
            </div>
            <div className="sm:col-span-2">
              <Label required>Professional Address</Label>
              <Input value={form.professionalAddress} onChange={e => set('professionalAddress', e.target.value)} placeholder="Your current professional or residential address" error={errors.professionalAddress} />
              <FieldError msg={errors.professionalAddress} />
            </div>
            <div className="sm:col-span-2">
              <Label required>Highest Academic Degree</Label>
              <Input value={form.highestDegree} onChange={e => set('highestDegree', e.target.value)} placeholder="e.g., BS (CS) NEDUET" error={errors.highestDegree} />
              <FieldError msg={errors.highestDegree} />
            </div>
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <FileInput
            label="Resume (PDF or Document)"
            accept=".pdf,.doc,.docx"
            note="Upload a simple resume outlining your relevant experience and skills. Max 10MB."
            onChange={e => setResume(e.target.files[0])}
            fileName={resume?.name}
            error={errors.resume}
          />
          <div>
            <Label required>Quantum Computing Courses / Self-learning</Label>
            <Textarea value={form.quantumCourses} onChange={e => set('quantumCourses', e.target.value)}
              placeholder="Briefly describe what courses you have taken in quantum computing or topics you have learned on your own."
              error={errors.quantumCourses} />
            <FieldError msg={errors.quantumCourses} />
          </div>
          <div>
            <Label required>Why will this workshop help your career?</Label>
            <Textarea value={form.whyWorkshopHelps} onChange={e => set('whyWorkshopHelps', e.target.value)}
              placeholder="Briefly describe why this workshop will help you in your career."
              error={errors.whyWorkshopHelps} />
            <FieldError msg={errors.whyWorkshopHelps} />
          </div>
          <div>
            <Label required>Travel & Accommodation Arrangements</Label>
            <Textarea value={form.travelArrangement} onChange={e => set('travelArrangement', e.target.value)}
              placeholder="NEDUET will not be able to provide travel funds or hostel. Will you be able to manage these on your own?"
              error={errors.travelArrangement} />
            <FieldError msg={errors.travelArrangement} />
          </div>
          <div className="space-y-3 pt-3 border-t border-border-subtle">
            <CheckboxField
              checked={form.attendanceCertificate}
              onChange={() => set('attendanceCertificate', !form.attendanceCertificate)}
              label="I would like an attendance certificate (I will attend all sessions)"
            />
            <CheckboxField
              checked={form.termsAgreed}
              onChange={() => set('termsAgreed', !form.termsAgreed)}
              label="I have read, understood, and agree to the terms and conditions"
              error={errors.termsAgreed}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <ReviewSection sections={[
          { title: 'Personal Information', rows: [
            ['Email', form.email], ['Full Name', form.fullName],
            ['Mobile', form.mobileNumber], ['CNIC', form.cnicNumber],
            ['Institution', form.institutionOrg], ['Semester/Designation', form.semesterDesignation],
            ['Address', form.professionalAddress], ['Degree', form.highestDegree],
          ]},
          { title: 'Workshop Details', rows: [
            ['Resume', resume?.name || 'Not uploaded'],
            ['Quantum Courses', form.quantumCourses],
            ['Why Workshop Helps', form.whyWorkshopHelps],
            ['Travel', form.travelArrangement],
            ['Attendance Certificate', form.attendanceCertificate ? 'Yes' : 'No'],
            ['Terms Agreed', form.termsAgreed ? 'Yes' : 'No'],
          ]},
        ]} />
      )}
    </FormShell>
  );
};

// ─── Participant Registration Form ───────────────────────────────────────────

const ParticipantForm = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    registrationType: '', email: '', fullName: '', rollNo: '',
    department: '', institute: '', contactNo: '',
    stanTransactionId: '', transactionDate: '', bankDetails: '',
    totalAmountPaid: '', certified: false,
  });
  const [receipt, setReceipt] = useState(null);
  const [studentCard, setStudentCard] = useState(null);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const steps = getSteps('participant');
  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!form.registrationType) e.registrationType = 'Please select a type.';
    }
    if (s === 1) {
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required.';
      if (!form.fullName.trim()) e.fullName = 'Required.';
      if (!form.department.trim()) e.department = 'Required.';
      if (!form.institute.trim()) e.institute = 'Required.';
      if (!form.contactNo.trim()) e.contactNo = 'Required.';
      if (form.registrationType === 'student' && !form.rollNo.trim()) e.rollNo = 'Roll number is required for students.';
    }
    if (s === 2) {
      if (!form.stanTransactionId.trim()) e.stanTransactionId = 'Required.';
      if (!form.transactionDate) e.transactionDate = 'Required.';
      if (!form.bankDetails.trim()) e.bankDetails = 'Required.';
      if (!form.totalAmountPaid.trim()) e.totalAmountPaid = 'Required.';
      if (!form.certified) e.certified = 'You must certify the information is correct.';
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(s => s + 1);
  };

  const submit = async () => {
    setSubmitting(true);
    setApiError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (receipt) formData.append('transactionReceipt', receipt);
      if (studentCard) formData.append('studentCard', studentCard);

      const res = await fetch(`${API_BASE}/api/register/participant`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setDone(true);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return <SuccessScreen type="Participant" onClose={onClose} />;

  return (
    <FormShell title="Conference Participant Registration" steps={steps} step={step} onClose={onClose}
      onBack={() => setStep(s => s - 1)} onNext={next}
      onSubmit={submit} submitting={submitting} apiError={apiError}
    >
      {step === 0 && (
        <div className="space-y-4">
          <Label required>Registration Type</Label>
          <div className="space-y-3">
            {[
              { value: 'professional', label: 'Professionals' },
              { value: 'student',      label: 'Students' },
            ].map(opt => (
              <button key={opt.value} type="button" onClick={() => set('registrationType', opt.value)}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  form.registrationType === opt.value
                    ? 'border-accent bg-accent/5'
                    : 'border-border-subtle hover:border-accent/40'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  form.registrationType === opt.value ? 'border-accent' : 'border-border-subtle'
                }`}>
                  {form.registrationType === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                </div>
                <span className="text-text-primary text-sm font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          <FieldError msg={errors.registrationType} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label required>Email</Label>
              <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" error={errors.email} />
              <FieldError msg={errors.email} />
            </div>
            <div>
              <Label required>Full Name</Label>
              <Input value={form.fullName} onChange={e => set('fullName', e.target.value)} placeholder="Muhammad Ali" error={errors.fullName} />
              <FieldError msg={errors.fullName} />
            </div>
            {form.registrationType === 'student' && (
              <div>
                <Label required>Roll No.</Label>
                <Input value={form.rollNo} onChange={e => set('rollNo', e.target.value)} placeholder="CS-2022-001" error={errors.rollNo} />
                <FieldError msg={errors.rollNo} />
              </div>
            )}
            <div>
              <Label required>Department</Label>
              <Input value={form.department} onChange={e => set('department', e.target.value)} placeholder="Computer Science & IT" error={errors.department} />
              <FieldError msg={errors.department} />
            </div>
            <div>
              <Label required>Institute</Label>
              <Input value={form.institute} onChange={e => set('institute', e.target.value)} placeholder="NED University" error={errors.institute} />
              <FieldError msg={errors.institute} />
            </div>
            <div>
              <Label required>Contact No.</Label>
              <Input type="tel" value={form.contactNo} onChange={e => set('contactNo', e.target.value)} placeholder="+92 300 0000000" error={errors.contactNo} />
              <FieldError msg={errors.contactNo} />
              <InfoNote>Your privacy will be protected.</InfoNote>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <PaymentBankInfo />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label required>STAN # / Transaction ID (IBFT)</Label>
              <Input value={form.stanTransactionId} onChange={e => set('stanTransactionId', e.target.value)} placeholder="TXN-20260810-XXXXX" error={errors.stanTransactionId} />
              <FieldError msg={errors.stanTransactionId} />
            </div>
            <div>
              <Label required>Date of Transaction</Label>
              <Input type="date" value={form.transactionDate} onChange={e => set('transactionDate', e.target.value)} error={errors.transactionDate} max={new Date().toISOString().split('T')[0]} />
              <FieldError msg={errors.transactionDate} />
            </div>
            <div>
              <Label required>Total Amount Paid</Label>
              <Input value={form.totalAmountPaid} onChange={e => set('totalAmountPaid', e.target.value)} placeholder="e.g. PKR 7,000" error={errors.totalAmountPaid} />
              <FieldError msg={errors.totalAmountPaid} />
            </div>
            <div className="sm:col-span-2">
              <Label required>Bank Details (Name / Branch)</Label>
              <Input value={form.bankDetails} onChange={e => set('bankDetails', e.target.value)} placeholder="HBL, Gulshan Branch, Karachi" error={errors.bankDetails} />
              <FieldError msg={errors.bankDetails} />
            </div>
          </div>
          <FileInput
            label="Scanned Copy of Transaction Receipt"
            accept=".pdf,.png,.jpg,.jpeg"
            note="If paid via internet banking, you can share a screenshot. Max 100MB."
            onChange={e => setReceipt(e.target.files[0])}
            fileName={receipt?.name}
          />
          {form.registrationType === 'student' && (
            <FileInput
              label="Scanned Copy of Student Card"
              accept=".pdf,.png,.jpg,.jpeg"
              note="Upload 1 file: PDF or image. Max 100MB."
              onChange={e => setStudentCard(e.target.files[0])}
              fileName={studentCard?.name}
            />
          )}
          <CheckboxField
            checked={form.certified}
            onChange={() => set('certified', !form.certified)}
            label="I certify that all information presented above is up to date and correct to the best of my knowledge"
            error={errors.certified}
          />
        </div>
      )}

      {step === 3 && (
        <ReviewSection sections={[
          { title: 'Registration', rows: [
            ['Type', form.registrationType === 'professional' ? 'Professional' : 'Student'],
          ]},
          { title: 'Personal Information', rows: [
            ['Email', form.email], ['Full Name', form.fullName],
            ...(form.rollNo ? [['Roll No.', form.rollNo]] : []),
            ['Department', form.department], ['Institute', form.institute],
            ['Contact No.', form.contactNo],
          ]},
          { title: 'Payment', rows: [
            ['Transaction ID', form.stanTransactionId],
            ['Date', form.transactionDate], ['Amount', form.totalAmountPaid],
            ['Bank', form.bankDetails],
            ['Receipt', receipt?.name || 'Not uploaded'],
            ...(studentCard ? [['Student Card', studentCard.name]] : []),
          ]},
        ]} />
      )}
    </FormShell>
  );
};

// ─── Paper Registration Form ─────────────────────────────────────────────────

const PaperForm = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    registrationType: '', email: '', paperId: '', paperTitle: '',
    authorName: '', rollNo: '', department: '', institution: '',
    contactNo: '', stanTransactionId: '', transactionDate: '',
    bankDetails: '', totalAmountPaid: '', certified: false,
    hasCoAuthors: false,
  });
  const [coAuthors, setCoAuthors] = useState([]);
  const [receipt, setReceipt] = useState(null);
  const [studentCard, setStudentCard] = useState(null);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const steps = getSteps('paper');
  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }));
    setErrors(e => ({ ...e, [field]: '' }));
  };

  const addCoAuthor = () => setCoAuthors(prev => [...prev, {
    registrationType: form.registrationType, email: '', paperId: form.paperId,
    paperTitle: form.paperTitle, authorName: '', rollNo: '', department: '',
    institution: '', contactNo: '', stanTransactionId: '', transactionDate: '',
    bankDetails: '', totalAmountPaid: '', certified: false,
  }]);

  const updateCoAuthor = (idx, field, value) => {
    setCoAuthors(prev => prev.map((ca, i) => i === idx ? { ...ca, [field]: value } : ca));
  };

  const removeCoAuthor = (idx) => setCoAuthors(prev => prev.filter((_, i) => i !== idx));

  const validate = (s) => {
    const e = {};
    if (s === 0) {
      if (!form.registrationType) e.registrationType = 'Please select a type.';
    }
    if (s === 1) {
      if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required.';
      if (!form.paperId.trim()) e.paperId = 'Required.';
      if (!form.paperTitle.trim()) e.paperTitle = 'Required.';
      if (!form.authorName.trim()) e.authorName = 'Required.';
      if (!form.department.trim()) e.department = 'Required.';
      if (!form.institution.trim()) e.institution = 'Required.';
      if (!form.contactNo.trim()) e.contactNo = 'Required.';
      if (form.registrationType === 'student' && !form.rollNo.trim()) e.rollNo = 'Required for students.';
    }
    if (s === 2) {
      if (!form.stanTransactionId.trim()) e.stanTransactionId = 'Required.';
      if (!form.transactionDate) e.transactionDate = 'Required.';
      if (!form.bankDetails.trim()) e.bankDetails = 'Required.';
      if (!form.totalAmountPaid.trim()) e.totalAmountPaid = 'Required.';
      if (!form.certified) e.certified = 'You must certify the information is correct.';
    }
    return e;
  };

  const next = () => {
    const e = validate(step);
    if (Object.keys(e).length) { setErrors(e); return; }
    setStep(s => s + 1);
  };

  const submit = async () => {
    setSubmitting(true);
    setApiError('');
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([k, v]) => formData.append(k, v));
      if (receipt) formData.append('transactionReceipt', receipt);
      if (studentCard) formData.append('studentCard', studentCard);
      if (coAuthors.length > 0) {
        formData.set('hasCoAuthors', 'true');
        formData.append('coAuthors', JSON.stringify(coAuthors));
      }

      const res = await fetch(`${API_BASE}/api/register/paper`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      setDone(true);
    } catch (err) {
      setApiError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (done) return <SuccessScreen type="Paper" onClose={onClose} />;

  return (
    <FormShell title="Paper Registration" steps={steps} step={step} onClose={onClose}
      onBack={() => setStep(s => s - 1)} onNext={next}
      onSubmit={submit} submitting={submitting} apiError={apiError}
    >
      {step === 0 && (
        <div className="space-y-4">
          <Label required>Registration Type</Label>
          <div className="space-y-3">
            {[
              { value: 'student',          label: 'Author is a Student' },
              { value: 'academia_industry', label: 'Authors from Academia / Industry' },
            ].map(opt => (
              <button key={opt.value} type="button" onClick={() => set('registrationType', opt.value)}
                className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-all ${
                  form.registrationType === opt.value
                    ? 'border-accent bg-accent/5'
                    : 'border-border-subtle hover:border-accent/40'
                }`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  form.registrationType === opt.value ? 'border-accent' : 'border-border-subtle'
                }`}>
                  {form.registrationType === opt.value && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                </div>
                <span className="text-text-primary text-sm font-medium">{opt.label}</span>
              </button>
            ))}
          </div>
          <FieldError msg={errors.registrationType} />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label required>Paper ID</Label>
              <Input value={form.paperId} onChange={e => set('paperId', e.target.value)} placeholder="e.g. 42" error={errors.paperId} />
              <FieldError msg={errors.paperId} />
            </div>
            <div>
              <Label required>Email</Label>
              <Input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" error={errors.email} />
              <FieldError msg={errors.email} />
            </div>
            <div className="sm:col-span-2">
              <Label required>Paper Title</Label>
              <Input value={form.paperTitle} onChange={e => set('paperTitle', e.target.value)} placeholder="Full title of your paper" error={errors.paperTitle} />
              <FieldError msg={errors.paperTitle} />
            </div>
            <div>
              <Label required>Author Name</Label>
              <Input value={form.authorName} onChange={e => set('authorName', e.target.value)} placeholder="Your full name (for certificate)" error={errors.authorName} />
              <FieldError msg={errors.authorName} />
              <InfoNote>Please double check — your name will appear on the certificate.</InfoNote>
            </div>
            {form.registrationType === 'student' && (
              <div>
                <Label required>Roll No.</Label>
                <Input value={form.rollNo} onChange={e => set('rollNo', e.target.value)} placeholder="CS-2022-001" error={errors.rollNo} />
                <FieldError msg={errors.rollNo} />
              </div>
            )}
            <div>
              <Label required>Department</Label>
              <Input value={form.department} onChange={e => set('department', e.target.value)} placeholder="Computer Science & IT" error={errors.department} />
              <FieldError msg={errors.department} />
            </div>
            <div>
              <Label required>Institution</Label>
              <Input value={form.institution} onChange={e => set('institution', e.target.value)} placeholder="NED University" error={errors.institution} />
              <FieldError msg={errors.institution} />
            </div>
            <div>
              <Label required>Contact No.</Label>
              <Input type="tel" value={form.contactNo} onChange={e => set('contactNo', e.target.value)} placeholder="+92 300 0000000" error={errors.contactNo} />
              <FieldError msg={errors.contactNo} />
              <InfoNote>Your privacy will be protected.</InfoNote>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-5">
          <PaymentBankInfo />
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label required>STAN # / Transaction ID (IBFT)</Label>
              <Input value={form.stanTransactionId} onChange={e => set('stanTransactionId', e.target.value)} placeholder="TXN-20260810-XXXXX" error={errors.stanTransactionId} />
              <FieldError msg={errors.stanTransactionId} />
            </div>
            <div>
              <Label required>Date of Transaction</Label>
              <Input type="date" value={form.transactionDate} onChange={e => set('transactionDate', e.target.value)} error={errors.transactionDate} max={new Date().toISOString().split('T')[0]} />
              <FieldError msg={errors.transactionDate} />
            </div>
            <div>
              <Label required>Total Amount Paid</Label>
              <Input value={form.totalAmountPaid} onChange={e => set('totalAmountPaid', e.target.value)} placeholder="e.g. PKR 7,000" error={errors.totalAmountPaid} />
              <FieldError msg={errors.totalAmountPaid} />
            </div>
            <div className="sm:col-span-2">
              <Label required>Bank Details (Name / Branch)</Label>
              <Input value={form.bankDetails} onChange={e => set('bankDetails', e.target.value)} placeholder="HBL, Gulshan Branch, Karachi" error={errors.bankDetails} />
              <FieldError msg={errors.bankDetails} />
            </div>
          </div>
          <FileInput
            label="Scanned Copy of Transaction Receipt"
            accept=".pdf,.png,.jpg,.jpeg"
            note="If paid via internet banking, share a screenshot. Max 100MB."
            onChange={e => setReceipt(e.target.files[0])}
            fileName={receipt?.name}
          />
          {form.registrationType === 'student' && (
            <FileInput
              label="Scanned Copy of Student Card"
              accept=".pdf,.png,.jpg,.jpeg"
              note="Upload 1 file: PDF or image. Max 100MB."
              onChange={e => setStudentCard(e.target.files[0])}
              fileName={studentCard?.name}
            />
          )}
          <CheckboxField
            checked={form.certified}
            onChange={() => set('certified', !form.certified)}
            label="I certify that all information is up to date and correct to the best of my knowledge"
            error={errors.certified}
          />

          {/* Co-author section */}
          <div className="pt-4 border-t border-border-subtle">
            <div className="flex items-center justify-between mb-3">
              <Label>Do you want to register co-authors?</Label>
              <button type="button" onClick={addCoAuthor}
                className="text-xs text-accent hover:underline font-medium">
                + Add Co-Author
              </button>
            </div>
            {coAuthors.map((ca, idx) => (
              <div key={idx} className="mb-4 p-4 rounded-lg border border-border-subtle bg-bg-primary">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-text-primary">Co-Author {idx + 1}</p>
                  <button type="button" onClick={() => removeCoAuthor(idx)} className="text-xs text-[#5AA8A3] hover:underline">Remove</button>
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <Label required>Email</Label>
                    <Input type="email" value={ca.email} onChange={e => updateCoAuthor(idx, 'email', e.target.value)} placeholder="co-author@example.com" />
                  </div>
                  <div>
                    <Label required>Author Name</Label>
                    <Input value={ca.authorName} onChange={e => updateCoAuthor(idx, 'authorName', e.target.value)} placeholder="Full name" />
                  </div>
                  {form.registrationType === 'student' && (
                    <div>
                      <Label>Roll No.</Label>
                      <Input value={ca.rollNo} onChange={e => updateCoAuthor(idx, 'rollNo', e.target.value)} placeholder="CS-2022-002" />
                    </div>
                  )}
                  <div>
                    <Label required>Department</Label>
                    <Input value={ca.department} onChange={e => updateCoAuthor(idx, 'department', e.target.value)} placeholder="Computer Science" />
                  </div>
                  <div>
                    <Label required>Institution</Label>
                    <Input value={ca.institution} onChange={e => updateCoAuthor(idx, 'institution', e.target.value)} placeholder="NED University" />
                  </div>
                  <div>
                    <Label required>Contact No.</Label>
                    <Input value={ca.contactNo} onChange={e => updateCoAuthor(idx, 'contactNo', e.target.value)} placeholder="+92 300 0000000" />
                  </div>
                  <div>
                    <Label required>Transaction ID</Label>
                    <Input value={ca.stanTransactionId} onChange={e => updateCoAuthor(idx, 'stanTransactionId', e.target.value)} placeholder="TXN-XXXXX" />
                  </div>
                  <div>
                    <Label required>Transaction Date</Label>
                    <Input type="date" value={ca.transactionDate} onChange={e => updateCoAuthor(idx, 'transactionDate', e.target.value)} max={new Date().toISOString().split('T')[0]} />
                  </div>
                  <div>
                    <Label required>Bank Details</Label>
                    <Input value={ca.bankDetails} onChange={e => updateCoAuthor(idx, 'bankDetails', e.target.value)} placeholder="Bank name / Branch" />
                  </div>
                  <div>
                    <Label required>Total Amount Paid</Label>
                    <Input value={ca.totalAmountPaid} onChange={e => updateCoAuthor(idx, 'totalAmountPaid', e.target.value)} placeholder="PKR 7,000" />
                  </div>
                </div>
                <div className="mt-3">
                  <CheckboxField
                    checked={ca.certified}
                    onChange={() => updateCoAuthor(idx, 'certified', !ca.certified)}
                    label="I certify this co-author's information is correct"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <ReviewSection sections={[
          { title: 'Registration', rows: [
            ['Type', form.registrationType === 'student' ? 'Student Author' : 'Academia / Industry'],
          ]},
          { title: 'Paper Information', rows: [
            ['Paper ID', form.paperId], ['Paper Title', form.paperTitle],
            ['Author', form.authorName], ['Email', form.email],
            ...(form.rollNo ? [['Roll No.', form.rollNo]] : []),
            ['Department', form.department], ['Institution', form.institution],
            ['Contact', form.contactNo],
          ]},
          { title: 'Payment', rows: [
            ['Transaction ID', form.stanTransactionId],
            ['Date', form.transactionDate], ['Amount', form.totalAmountPaid],
            ['Bank', form.bankDetails],
            ['Receipt', receipt?.name || 'Not uploaded'],
            ...(studentCard ? [['Student Card', studentCard.name]] : []),
          ]},
          ...(coAuthors.length > 0 ? [{
            title: `Co-Authors (${coAuthors.length})`,
            rows: coAuthors.map((ca, i) => [`Co-Author ${i + 1}`, `${ca.authorName} — ${ca.email}`]),
          }] : []),
        ]} />
      )}
    </FormShell>
  );
};

// ─── Shared components ───────────────────────────────────────────────────────

const CheckboxField = ({ checked, onChange, label, error }) => (
  <div>
    <button type="button" onClick={onChange} className="flex items-center gap-3 group">
      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all shrink-0 ${
        checked ? 'bg-accent border-accent' : 'border-border-subtle group-hover:border-accent/50'
      }`}>
        {checked && <FaCheck className="text-white text-xs" />}
      </div>
      <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors text-left">{label}</span>
    </button>
    {error && <FieldError msg={error} />}
  </div>
);

const PaymentBankInfo = () => (
  <div className="p-4 rounded-xl bg-bg-primary border border-border-subtle text-sm">
    <p className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">Transfer payment to</p>
    <div className="space-y-1.5">
      <p className="text-text-primary"><span className="text-text-muted">Bank: </span>{paymentInfo.bank}</p>
      <p className="text-text-primary"><span className="text-text-muted">Account: </span>{paymentInfo.accountTitle}</p>
      <p className="text-text-primary font-mono text-xs"><span className="text-text-muted">IBAN: </span>{paymentInfo.iban}</p>
      <p className="text-text-primary"><span className="text-text-muted">Account No.: </span>{paymentInfo.accountNumber}</p>
      <p className="text-text-primary"><span className="text-text-muted">Branch: </span>{paymentInfo.branch}</p>
    </div>
  </div>
);

const ReviewSection = ({ sections }) => (
  <div className="space-y-4">
    <p className="text-text-muted text-sm">Please confirm everything looks correct before submitting.</p>
    {sections.map(section => (
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
  </div>
);

const SuccessScreen = ({ type, onClose }) => (
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
    <h3 className="text-2xl font-bold text-text-primary mb-2">{type} Registration Submitted</h3>
    <p className="text-text-muted text-sm max-w-sm mb-8 leading-relaxed">
      Your registration has been submitted successfully. You will receive a confirmation email within 2–3 business days.
    </p>
    <button onClick={onClose} className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white rounded-lg text-sm font-semibold transition-all duration-200">
      Done
    </button>
  </div>
);

const FormShell = ({ title, steps, step, onClose, onBack, onNext, onSubmit, submitting, apiError, children }) => (
  <div className="flex flex-col h-full min-h-0 overflow-hidden">
    <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-border-subtle shrink-0">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <h3 className="text-xl font-bold text-text-primary">{title}</h3>
          <p className="text-text-muted text-sm mt-0.5">ICONICS'26 · October 20-21, 2026 · NED University</p>
        </div>
        <button onClick={onClose}
          className="w-8 h-8 rounded-lg bg-bg-primary border border-border-subtle flex items-center justify-center text-text-muted hover:text-text-primary hover:border-border-dark transition-all shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <StepBar current={step} steps={steps} />
    </div>

    <div className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8 py-6">
      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </div>

    {apiError && (
      <div className="mx-6 sm:mx-8 mb-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-lg text-[#5AA8A3] text-sm">
          {apiError}
        </div>
    )}

    <div className="px-6 sm:px-8 py-4 border-t border-border-subtle flex items-center justify-between shrink-0">
      <button onClick={onBack} disabled={step === 0}
        className="px-5 py-2.5 border border-border-subtle text-text-muted rounded-lg text-sm font-medium hover:text-text-primary hover:border-border-dark transition-all disabled:opacity-30 disabled:cursor-not-allowed">
        Back
      </button>
      <div className="flex items-center gap-3">
        <span className="text-text-muted text-xs hidden sm:block">{step + 1} / {steps.length}</span>
        {step < steps.length - 1 ? (
          <button onClick={onNext}
            className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-glow">
            Continue
          </button>
        ) : (
          <button onClick={onSubmit} disabled={submitting}
            className="px-6 py-2.5 bg-accent hover:bg-accent-light text-white rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-glow flex items-center gap-2 disabled:opacity-50">
            {submitting ? 'Submitting...' : 'Submit Registration'}
            {!submitting && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  </div>
);

// ─── Registration Modal ──────────────────────────────────────────────────────

const RegistrationModal = ({ isOpen, onClose, defaultType }) => {
  const [formType, setFormType] = useState(defaultType || 'participant');

  useEffect(() => {
    if (defaultType) setFormType(defaultType);
  }, [defaultType]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      // Stop Lenis smooth scroll so it doesn't hijack wheel events
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) window.lenis.start();
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      if (window.lenis) window.lenis.start();
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const FormComponent = {
    participant: ParticipantForm,
    paper: PaperForm,
    workshop: WorkshopForm,
  }[formType];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto overscroll-contain" onWheel={e => e.stopPropagation()}>
            <motion.div
              className="bg-bg-card border border-border-subtle rounded-2xl w-full max-w-2xl flex flex-col overflow-hidden my-auto"
              style={{ height: 'min(92vh, 800px)' }}
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <div className="px-6 sm:px-8 pt-5 shrink-0">
                <FormTypeSelector active={formType} onChange={setFormType} />
              </div>
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                <FormComponent onClose={onClose} />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

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
  const [modalOpen, setModalOpen] = useState(false);
  const [defaultType, setDefaultType] = useState('participant');

  // Open modal with specific form type if ?type=workshop is in URL
  useEffect(() => {
    const type = searchParams.get('type');
    if (type && ['participant', 'paper', 'workshop'].includes(type)) {
      setDefaultType(type);
      setModalOpen(true);
    }
  }, [searchParams]);

  const openModal = (type = 'participant') => {
    setDefaultType(type);
    setModalOpen(true);
  };

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

          {/* Register CTAs */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
              <button onClick={() => openModal('participant')}
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-accent hover:bg-accent-light text-white font-semibold rounded-xl text-sm transition-all duration-300 hover:shadow-glow">
                Register as Participant
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button onClick={() => openModal('paper')}
                className="inline-flex items-center gap-3 px-8 py-3.5 border border-accent text-accent hover:bg-accent hover:text-white font-semibold rounded-xl text-sm transition-all duration-300">
                Register Paper
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <button onClick={() => openModal('workshop')}
                className="inline-flex items-center gap-3 px-8 py-3.5 border border-border-subtle text-text-muted hover:border-accent hover:text-accent font-semibold rounded-xl text-sm transition-all duration-300">
                Register for Workshop
              </button>
            </div>
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

      <RegistrationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultType={defaultType} />
    </PageTransition>
  );
};

export default Registration;
