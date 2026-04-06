import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { api } from '../../utils/api';

const StatCard = ({ label, value, path, color, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
  >
    <Link to={path} className="block group">
      <div className="bg-white rounded-2xl p-6 border transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-medium"
        style={{ borderColor: 'rgba(62,139,135,0.12)', boxShadow: '0 2px 12px rgba(30,58,68,0.06)' }}>
        <div className="flex items-start justify-between mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: `${color}15` }}>
            {icon}
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7A9AA6" strokeWidth="2"
            className="transition-transform duration-200 group-hover:translate-x-1">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="text-3xl font-bold mb-1" style={{ color: '#1A2E38' }}>
          {value ?? <span className="text-lg text-text-muted animate-pulse">—</span>}
        </div>
        <div className="text-sm font-medium" style={{ color: '#7A9AA6' }}>{label}</div>
      </div>
    </Link>
  </motion.div>
);

const QuickAction = ({ to, label, icon, delay }) => (
  <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay, duration: 0.35 }}>
    <Link to={to}
      className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-bg-secondary group"
      style={{ color: '#4A6472' }}>
      <span className="w-8 h-8 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
        style={{ background: 'rgba(62,139,135,0.1)', color: '#3E8B87' }}>
        {icon}
      </span>
      <span className="text-sm font-medium">{label}</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
        <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  </motion.div>
);

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    Promise.allSettled([
      api.adminGetSpeakers(),
      api.adminGetWorkshops(),
      api.adminGetDates(),
      api.adminGetTracks(),
      api.adminGetWorkshopRegs(),
      api.adminGetParticipantRegs(),
      api.adminGetPaperRegs(),
    ]).then(([spk, ws, dt, tr, wr, pr, par]) => {
      setCounts({
        speakers: spk.status === 'fulfilled' ? spk.value.data.length : '—',
        workshops: ws.status === 'fulfilled' ? ws.value.data.length : '—',
        dates: dt.status === 'fulfilled' ? dt.value.data.length : '—',
        tracks: tr.status === 'fulfilled' ? tr.value.data.length : '—',
        workshopRegs: wr.status === 'fulfilled' ? wr.value.data.length : '—',
        participantRegs: pr.status === 'fulfilled' ? pr.value.data.length : '—',
        paperRegs: par.status === 'fulfilled' ? par.value.data.length : '—',
      });
    });
  }, []);

  const totalRegs =
    typeof counts.workshopRegs === 'number' &&
    typeof counts.participantRegs === 'number' &&
    typeof counts.paperRegs === 'number'
      ? counts.workshopRegs + counts.participantRegs + counts.paperRegs
      : null;

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: '#3E8B87' }}>
          Overview
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#1A2E38' }}>Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: '#7A9AA6' }}>
          ICONICS'26 — October 10–11, 2026 · NED University, Karachi
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Speakers" value={counts.speakers} path="/admin/speakers" color="#3E8B87" delay={0.05}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E8B87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>} />
        <StatCard label="Workshops" value={counts.workshops} path="/admin/workshops" color="#2D6E6A" delay={0.1}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D6E6A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>} />
        <StatCard label="Tracks" value={counts.tracks} path="/admin/tracks" color="#5AA8A3" delay={0.15}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5AA8A3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} />
        <StatCard label="Total Registrations" value={totalRegs} path="/admin/registrations" color="#3E8B87" delay={0.2}
          icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3E8B87" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>} />
      </div>

      {/* Two col layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Registration breakdown */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.4 }}
          className="bg-white rounded-2xl p-6 border"
          style={{ borderColor: 'rgba(62,139,135,0.12)', boxShadow: '0 2px 12px rgba(30,58,68,0.06)' }}>
          <h2 className="text-base font-bold mb-4" style={{ color: '#1A2E38' }}>Registration Breakdown</h2>
          <div className="space-y-4">
            {[
              { label: 'Workshop Registrations', count: counts.workshopRegs, color: '#3E8B87' },
              { label: 'Conference Participants', count: counts.participantRegs, color: '#2D6E6A' },
              { label: 'Paper Submissions', count: counts.paperRegs, color: '#5AA8A3' },
            ].map((item) => {
              const pct = totalRegs && typeof item.count === 'number'
                ? Math.round((item.count / totalRegs) * 100)
                : 0;
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm" style={{ color: '#4A6472' }}>{item.label}</span>
                    <span className="text-sm font-bold" style={{ color: '#1A2E38' }}>
                      {typeof item.count === 'number' ? item.count : '—'}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full" style={{ background: 'rgba(62,139,135,0.1)' }}>
                    <motion.div
                      className="h-1.5 rounded-full"
                      style={{ background: item.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.4 }}
          className="bg-white rounded-2xl p-6 border"
          style={{ borderColor: 'rgba(62,139,135,0.12)', boxShadow: '0 2px 12px rgba(30,58,68,0.06)' }}>
          <h2 className="text-base font-bold mb-4" style={{ color: '#1A2E38' }}>Quick Actions</h2>
          <div className="space-y-1">
            <QuickAction to="/admin/speakers" label="Add a Speaker" delay={0.35}
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>} />
            <QuickAction to="/admin/workshops" label="Manage Workshops" delay={0.4}
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>} />
            <QuickAction to="/admin/dates" label="Update Important Dates" delay={0.45}
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} />
            <QuickAction to="/admin/registrations" label="Export Registrations CSV" delay={0.5}
              icon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
