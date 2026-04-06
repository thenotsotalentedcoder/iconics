import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminModal({ open, onClose, title, children, size = 'md' }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const widths = { sm: 'max-w-md', md: 'max-w-xl', lg: 'max-w-2xl', xl: 'max-w-4xl' };

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" ref={overlayRef}>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`relative w-full ${widths[size]} bg-white rounded-2xl shadow-large flex flex-col max-h-[90vh]`}
            style={{ boxShadow: '0 32px 80px rgba(30,58,68,0.2)', border: '1px solid rgba(62,139,135,0.12)' }}
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Accent bar */}
            <div className="h-1 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #2D6E6A, #3E8B87, #5AA8A3)' }} />

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
              style={{ borderColor: 'rgba(62,139,135,0.1)' }}>
              <h2 className="text-base font-bold" style={{ color: '#1A2E38' }}>{title}</h2>
              <button onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-bg-secondary"
                style={{ color: '#7A9AA6' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Shared form field components
export function FormField({ label, error, children, required }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5" style={{ color: '#4A6472' }}>
        {label}{required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

export function FormInput({ value, onChange, placeholder, type = 'text', required, error, ...props }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200"
      style={{
        border: `1.5px solid ${error ? '#ef4444' : 'rgba(62,139,135,0.18)'}`,
        background: '#FAFBFB',
        color: '#1A2E38',
      }}
      onFocus={(e) => { if (!error) e.target.style.borderColor = '#3E8B87'; }}
      onBlur={(e) => { if (!error) e.target.style.borderColor = 'rgba(62,139,135,0.18)'; }}
      {...props}
    />
  );
}

export function FormTextarea({ value, onChange, placeholder, rows = 4, required }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
      style={{
        border: '1.5px solid rgba(62,139,135,0.18)',
        background: '#FAFBFB',
        color: '#1A2E38',
      }}
      onFocus={(e) => { e.target.style.borderColor = '#3E8B87'; }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(62,139,135,0.18)'; }}
    />
  );
}

export function FormSelect({ value, onChange, children, required }) {
  return (
    <select
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all duration-200 appearance-none cursor-pointer"
      style={{
        border: '1.5px solid rgba(62,139,135,0.18)',
        background: '#FAFBFB',
        color: '#1A2E38',
      }}
      onFocus={(e) => { e.target.style.borderColor = '#3E8B87'; }}
      onBlur={(e) => { e.target.style.borderColor = 'rgba(62,139,135,0.18)'; }}
    >
      {children}
    </select>
  );
}

export function SubmitButton({ loading, label = 'Save', disabled }) {
  return (
    <motion.button
      type="submit"
      disabled={loading || disabled}
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white transition-all"
      style={{
        background: loading || disabled ? '#7A9AA6' : 'linear-gradient(135deg, #2D6E6A, #3E8B87)',
        boxShadow: loading || disabled ? 'none' : '0 4px 14px rgba(62,139,135,0.25)',
        cursor: loading || disabled ? 'not-allowed' : 'pointer',
      }}
    >
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/>
          <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      )}
      {label}
    </motion.button>
  );
}
