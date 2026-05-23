import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';

const TEAL = '#3E8B87';

const COMMITTEES = [
  'Organizing Committee',
  'IEEE Coordination Committee',
  'Publications Committee',
  'Technical Program Committee',
  'Finance Committee',
  'Website & Socials Committee',
  'Grants & Sponsorship Committee',
  'Travel, Accommodation & Protocol Committee',
  'Publicity Committee',
  'Shield & Certificates Committee',
  'Registration Committee',
  'Reception Committee',
  'Catering Committee',
  'IT Support Committee',
];

const EMPTY_FORM = {
  committeeName: COMMITTEES[0],
  name: '',
  role: '',
  institution: 'NED University of Engineering & Technology',
  email: '',
  isChair: false,
  order: 0,
};

function Modal({ member, onClose, onSave }) {
  const [form, setForm] = useState(member ? { ...member } : { ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.role.trim() || !form.committeeName) {
      setError('Name, role, and committee are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      if (member) {
        await api.adminUpdateCommitteeMember(member.id, form);
      } else {
        await api.adminCreateCommitteeMember(form);
      }
      onSave();
    } catch (err) {
      setError(err.message || 'Failed to save.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
      >
        <div className="px-6 py-5 border-b" style={{ borderColor: 'rgba(62,139,135,0.12)' }}>
          <h2 className="text-base font-bold" style={{ color: '#1A2E38' }}>
            {member ? 'Edit Member' : 'Add Committee Member'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="px-4 py-3 rounded-xl text-sm text-red-700" style={{ background: '#FEF2F2' }}>{error}</div>
          )}

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#4A6472' }}>Committee</label>
            <select
              value={form.committeeName}
              onChange={e => set('committeeName', e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
              style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38' }}
            >
              {COMMITTEES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#4A6472' }}>Full Name</label>
            <input
              value={form.name}
              onChange={e => set('name', e.target.value)}
              placeholder="e.g. Prof. Dr. Muhammad Tufail"
              className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
              style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38' }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#4A6472' }}>Role / Title</label>
            <input
              value={form.role}
              onChange={e => set('role', e.target.value)}
              placeholder="e.g. Chair, Member, Conference Co-Chair"
              className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
              style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38' }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#4A6472' }}>Institution</label>
            <input
              value={form.institution}
              onChange={e => set('institution', e.target.value)}
              placeholder="e.g. NED University..."
              className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
              style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38' }}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1.5" style={{ color: '#4A6472' }}>Email (optional)</label>
            <input
              value={form.email}
              onChange={e => set('email', e.target.value)}
              type="email"
              placeholder="e.g. name@neduet.edu.pk"
              className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
              style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38' }}
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold mb-1.5" style={{ color: '#4A6472' }}>Display Order</label>
              <input
                value={form.order}
                onChange={e => set('order', e.target.value)}
                type="number"
                className="w-full px-3 py-2.5 rounded-xl text-sm border outline-none"
                style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38' }}
              />
            </div>
            <div className="flex items-center gap-2 mt-5">
              <input
                id="isChair"
                type="checkbox"
                checked={form.isChair}
                onChange={e => set('isChair', e.target.checked)}
                className="w-4 h-4 rounded"
                style={{ accentColor: TEAL }}
              />
              <label htmlFor="isChair" className="text-sm font-medium" style={{ color: '#4A6472' }}>Is Chair</label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all"
              style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#4A6472' }}>
              Cancel
            </button>
            <button type="submit" disabled={saving}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
              style={{ background: `linear-gradient(135deg, #2D6E6A, ${TEAL})` }}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminCommittee() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null); // null | 'add' | member object
  const [activeGroup, setActiveGroup] = useState('All');
  const [search, setSearch] = useState('');
  const [deleteId, setDeleteId] = useState(null);

  const load = () => {
    setLoading(true);
    api.adminGetCommittee()
      .then(r => setMembers(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const groups = ['All', ...Array.from(new Set(members.map(m => m.committeeName)))];

  const filtered = members.filter(m => {
    const inGroup = activeGroup === 'All' || m.committeeName === activeGroup;
    const inSearch = !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase());
    return inGroup && inSearch;
  });

  const grouped = filtered.reduce((acc, m) => {
    (acc[m.committeeName] ??= []).push(m);
    return acc;
  }, {});

  const handleDelete = async (id) => {
    try {
      await api.adminDeleteCommitteeMember(id);
      setDeleteId(null);
      load();
    } catch {}
  };

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: TEAL }}>Management</div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#1A2E38' }}>Committee</h1>
          <button
            onClick={() => setModal('add')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: `linear-gradient(135deg, #2D6E6A, ${TEAL})` }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
            </svg>
            Add Member
          </button>
        </div>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name or role…"
          className="flex-1 px-4 py-2.5 rounded-xl text-sm border outline-none bg-white"
          style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38' }}
        />
        <select
          value={activeGroup}
          onChange={e => setActiveGroup(e.target.value)}
          className="px-4 py-2.5 rounded-xl text-sm border outline-none bg-white"
          style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38', minWidth: 220 }}
        >
          {groups.map(g => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: TEAL, borderTopColor: 'transparent' }} />
        </div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="text-center py-24" style={{ color: '#7A9AA6' }}>No members found.</div>
      ) : (
        <div className="space-y-8">
          {Object.entries(grouped).map(([committee, mems]) => (
            <motion.div key={committee} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-sm font-bold uppercase tracking-wide" style={{ color: TEAL }}>{committee}</h2>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: 'rgba(62,139,135,0.1)', color: TEAL }}>
                  {mems.length}
                </span>
              </div>
              <div className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(62,139,135,0.12)' }}>
                {mems.map((m, i) => (
                  <div
                    key={m.id}
                    className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-slate-50"
                    style={{ borderTop: i > 0 ? '1px solid rgba(62,139,135,0.08)' : 'none' }}
                  >
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                      style={{ background: m.isChair ? 'rgba(62,139,135,0.15)' : 'rgba(62,139,135,0.07)', color: TEAL }}>
                      {m.name.split(' ').slice(-1)[0]?.[0] ?? '?'}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-semibold truncate" style={{ color: '#1A2E38' }}>{m.name}</span>
                        {m.isChair && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(62,139,135,0.12)', color: TEAL }}>
                            CHAIR
                          </span>
                        )}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: '#7A9AA6' }}>{m.role}</div>
                      {m.email && <div className="text-xs mt-0.5" style={{ color: '#5AA8A3' }}>{m.email}</div>}
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button
                        onClick={() => setModal(m)}
                        className="p-2 rounded-lg transition-colors hover:bg-blue-50"
                        style={{ color: '#3E8B87' }}
                        title="Edit"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => setDeleteId(m.id)}
                        className="p-2 rounded-lg transition-colors hover:bg-red-50"
                        style={{ color: '#ef4444' }}
                        title="Delete"
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                          <path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {modal && (
          <Modal
            member={modal === 'add' ? null : modal}
            onClose={() => setModal(null)}
            onSave={() => { setModal(null); load(); }}
          />
        )}
      </AnimatePresence>

      {/* Delete confirm */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/40" onClick={() => setDeleteId(null)} />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-sm w-full"
            >
              <h3 className="text-base font-bold mb-2" style={{ color: '#1A2E38' }}>Delete member?</h3>
              <p className="text-sm mb-5" style={{ color: '#7A9AA6' }}>This cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteId(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold border"
                  style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#4A6472' }}>
                  Cancel
                </button>
                <button onClick={() => handleDelete(deleteId)}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold text-white bg-red-500">
                  Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
