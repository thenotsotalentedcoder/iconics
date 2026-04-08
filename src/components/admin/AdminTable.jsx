import { motion } from 'framer-motion';

export function AdminPageHeader({ title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-6 gap-4">
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#3E8B87' }}>
          Manage
        </div>
        <h1 className="text-2xl font-bold" style={{ color: '#1A2E38' }}>{title}</h1>
        {subtitle && <p className="text-sm mt-1" style={{ color: '#7A9AA6' }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminCard({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border ${className}`}
      style={{ borderColor: 'rgba(62,139,135,0.12)', boxShadow: '0 2px 12px rgba(30,58,68,0.06)' }}>
      {children}
    </div>
  );
}

export function AddButton({ onClick, label = 'Add New' }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 px-6 py-3 rounded text-base font-semibold text-white flex-shrink-0"
      style={{ background: 'linear-gradient(135deg, #2D6E6A, #3E8B87)', boxShadow: '0 4px 14px rgba(62,139,135,0.25)' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
      </svg>
      {label}
    </motion.button>
  );
}

export function DeleteButton({ onClick }) {
  return (
    <button onClick={onClick}
      className="p-1.5 rounded transition-all duration-200 hover:bg-red-50"
      style={{ color: '#ef4444' }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
      </svg>
    </button>
  );
}

export function EditButton({ onClick }) {
  return (
    <button onClick={onClick}
      className="p-1.5 rounded-lg transition-all duration-200 hover:bg-bg-secondary"
      style={{ color: '#3E8B87' }}>
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
      </svg>
    </button>
  );
}

export function EmptyState({ message = 'No items yet.' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: 'rgba(62,139,135,0.08)' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A9AA6" strokeWidth="1.5">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
          <polyline points="13 2 13 9 20 9"/>
        </svg>
      </div>
      <p className="text-sm font-medium" style={{ color: '#7A9AA6' }}>{message}</p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="flex items-center gap-2" style={{ color: '#7A9AA6' }}>
        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
        <span className="text-sm">Loading...</span>
      </div>
    </div>
  );
}

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl mb-4"
      style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
      <span className="text-sm text-red-600">{message}</span>
      {onRetry && (
        <button onClick={onRetry} className="text-xs font-semibold text-red-500 hover:text-red-700 ml-4">
          Retry
        </button>
      )}
    </div>
  );
}

export function SuccessBanner({ message }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
      className="flex items-center gap-2 p-4 rounded-xl mb-4"
      style={{ background: '#f0faf9', border: '1px solid rgba(62,139,135,0.3)' }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3E8B87" strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span className="text-sm font-medium" style={{ color: '#2D6E6A' }}>{message}</span>
    </motion.div>
  );
}
