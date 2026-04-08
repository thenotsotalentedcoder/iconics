import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';
import { AdminPageHeader, LoadingState, ErrorBanner } from '../../components/admin/AdminTable';

const TABS = [
  { key: 'workshop', label: 'Workshop', color: '#3E8B87' },
  { key: 'participant', label: 'Participants', color: '#2D6E6A' },
  { key: 'paper', label: 'Papers', color: '#5AA8A3' },
];

function ExportButton({ href, label }) {
  const handleExport = () => {
    const token = localStorage.getItem('admin_token');
    fetch(href, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = label;
        a.click();
        URL.revokeObjectURL(url);
      });
  };

  return (
    <motion.button onClick={handleExport}
      whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
      className="flex items-center gap-2 px-6 py-3 rounded text-base font-semibold text-white"
      style={{ background: 'linear-gradient(135deg, #2D6E6A, #3E8B87)', boxShadow: '0 4px 14px rgba(62,139,135,0.25)' }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
        <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
      </svg>
      Export CSV
    </motion.button>
  );
}

function WorkshopTable({ rows }) {
  const cols = ['fullName', 'email', 'mobileNumber', 'institutionOrg', 'semesterDesignation', 'highestDegree', 'status', 'createdAt'];
  const labels = { fullName: 'Name', email: 'Email', mobileNumber: 'Mobile', institutionOrg: 'Institution', semesterDesignation: 'Designation', highestDegree: 'Degree', status: 'Status', createdAt: 'Submitted' };
  return <RegistrationTable rows={rows} cols={cols} labels={labels} />;
}

function ParticipantTable({ rows }) {
  const cols = ['fullName', 'email', 'registrationType', 'institute', 'department', 'contactNo', 'totalAmountPaid', 'createdAt'];
  const labels = { fullName: 'Name', email: 'Email', registrationType: 'Type', institute: 'Institute', department: 'Dept', contactNo: 'Contact', totalAmountPaid: 'Amount', createdAt: 'Submitted' };
  return <RegistrationTable rows={rows} cols={cols} labels={labels} />;
}

function PaperTable({ rows }) {
  const cols = ['authorName', 'email', 'paperId', 'paperTitle', 'registrationType', 'institution', 'totalAmountPaid', 'createdAt'];
  const labels = { authorName: 'Author', email: 'Email', paperId: 'Paper ID', paperTitle: 'Title', registrationType: 'Type', institution: 'Institution', totalAmountPaid: 'Amount', createdAt: 'Submitted' };
  return <RegistrationTable rows={rows} cols={cols} labels={labels} />;
}

function RegistrationTable({ rows, cols, labels }) {
  const fmt = (v) => {
    if (v == null) return '—';
    if (typeof v === 'boolean') return v ? 'Yes' : 'No';
    if (v instanceof Date || (typeof v === 'string' && v.includes('T'))) {
      try { return new Date(v).toLocaleDateString(); } catch { return v; }
    }
    if (typeof v === 'string' && v.length > 40) return v.slice(0, 40) + '…';
    return String(v);
  };

  if (rows.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3"
          style={{ background: 'rgba(62,139,135,0.08)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7A9AA6" strokeWidth="1.5">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
            <polyline points="13 2 13 9 20 9"/>
          </svg>
        </div>
        <p className="text-sm" style={{ color: '#7A9AA6' }}>No registrations yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b" style={{ borderColor: 'rgba(62,139,135,0.1)' }}>
            {cols.map(c => (
              <th key={c} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                style={{ color: '#7A9AA6' }}>
                {labels[c] || c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr key={row.id || i}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }}
              className="border-b hover:bg-bg-secondary transition-colors duration-100"
              style={{ borderColor: 'rgba(62,139,135,0.06)' }}>
              {cols.map(c => (
                <td key={c} className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: '#4A6472' }}>
                  {c === 'status' ? (
                    <span className="px-2 py-0.5 rounded-full font-semibold capitalize text-[10px]"
                      style={{
                        background: row[c] === 'pending' ? 'rgba(245,158,11,0.1)' : row[c] === 'approved' ? 'rgba(62,139,135,0.1)' : 'rgba(239,68,68,0.1)',
                        color: row[c] === 'pending' ? '#d97706' : row[c] === 'approved' ? '#2D6E6A' : '#ef4444',
                      }}>
                      {row[c] || 'pending'}
                    </span>
                  ) : fmt(row[c])}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AdminRegistrations() {
  const [tab, setTab] = useState('workshop');
  const [data, setData] = useState({ workshop: [], participant: [], paper: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const load = useCallback(async (type) => {
    setLoading(true); setError('');
    try {
      let res;
      if (type === 'workshop') res = await api.adminGetWorkshopRegs();
      else if (type === 'participant') res = await api.adminGetParticipantRegs();
      else res = await api.adminGetPaperRegs();
      setData(d => ({ ...d, [type]: res.data }));
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(tab); }, [tab, load]);

  const exportHref = {
    workshop: api.adminExportWorkshopRegs(),
    participant: api.adminExportParticipantRegs(),
    paper: api.adminExportPaperRegs(),
  };

  const exportFile = {
    workshop: 'workshop-registrations.csv',
    participant: 'participant-registrations.csv',
    paper: 'paper-registrations.csv',
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <AdminPageHeader title="Registrations"
        subtitle={`Total: ${Object.values(data).reduce((a, b) => a + b.length, 0)} entries`}
        action={<ExportButton href={exportHref[tab]} label={exportFile[tab]} />} />

      {error && <ErrorBanner message={error} onRetry={() => load(tab)} />}

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="text-left p-4 rounded-2xl border transition-all duration-200"
            style={{
              background: tab === t.key ? 'white' : 'transparent',
              borderColor: tab === t.key ? t.color : 'rgba(62,139,135,0.12)',
              boxShadow: tab === t.key ? `0 4px 16px ${t.color}20` : 'none',
            }}>
            <div className="text-2xl font-bold mb-0.5" style={{ color: t.color }}>
              {data[t.key].length}
            </div>
            <div className="text-xs font-medium" style={{ color: '#7A9AA6' }}>{t.label}</div>
          </button>
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-5">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              background: tab === t.key ? t.color : 'rgba(62,139,135,0.08)',
              color: tab === t.key ? 'white' : '#4A6472',
            }}>
            {t.label} ({data[t.key].length})
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border overflow-hidden"
        style={{ borderColor: 'rgba(62,139,135,0.12)', boxShadow: '0 2px 12px rgba(30,58,68,0.06)' }}>
        {loading ? <LoadingState /> : (
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              {tab === 'workshop' && <WorkshopTable rows={data.workshop} />}
              {tab === 'participant' && <ParticipantTable rows={data.participant} />}
              {tab === 'paper' && <PaperTable rows={data.paper} />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
