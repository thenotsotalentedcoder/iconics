import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';
import {
  AdminPageHeader, AdminCard, AddButton, EditButton, DeleteButton,
  EmptyState, LoadingState, ErrorBanner, SuccessBanner,
} from '../../components/admin/AdminTable';
import AdminModal, {
  FormField, FormInput, FormTextarea, SubmitButton,
} from '../../components/admin/AdminModal';

const EMPTY_WS = { slug: '', title: '', tagline: '', description: '', registrationLink: '', targetAudience: '', learningOutcomes: '', order: '', posterImage: null };
const EMPTY_SESSION = { title: '', instructorName: '', instructorTitle: '', instructorInstitution: '', instructorCountry: '', topics: '', order: '', instructorPhoto: null };

function TagInput({ value, onChange, placeholder }) {
  const [input, setInput] = useState('');
  const tags = value ? value.split('\n').map(t => t.trim()).filter(Boolean) : [];

  const add = () => {
    const v = input.trim();
    if (!v) return;
    onChange([...tags, v].join('\n'));
    setInput('');
  };

  const remove = (i) => onChange(tags.filter((_, idx) => idx !== i).join('\n'));

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
          style={{ border: '1.5px solid rgba(62,139,135,0.18)', background: '#FAFBFB', color: '#1A2E38' }}
          onFocus={e => { e.target.style.borderColor = '#3E8B87'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(62,139,135,0.18)'; }}
        />
        <button type="button" onClick={add}
          className="px-3 py-2 rounded-xl text-sm font-semibold text-white" style={{ background: '#3E8B87' }}>Add</button>
      </div>
      {tags.length > 0 && (
        <div className="space-y-1">
          {tags.map((tag, i) => (
            <div key={i} className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs"
              style={{ background: 'rgba(62,139,135,0.07)', color: '#2D6E6A' }}>
              <span>{tag}</span>
              <button type="button" onClick={() => remove(i)} className="opacity-50 hover:opacity-100 ml-2">×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const [wsModal, setWsModal] = useState(false);
  const [editingWs, setEditingWs] = useState(null);
  const [wsForm, setWsForm] = useState(EMPTY_WS);
  const [savingWs, setSavingWs] = useState(false);

  const [sessionModal, setSessionModal] = useState(false);
  const [sessionParent, setSessionParent] = useState(null);
  const [editingSession, setEditingSession] = useState(null);
  const [sessionForm, setSessionForm] = useState(EMPTY_SESSION);
  const [savingSession, setSavingSession] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { const r = await api.adminGetWorkshops(); setWorkshops(r.data); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAddWs = () => { setEditingWs(null); setWsForm(EMPTY_WS); setWsModal(true); };
  const openEditWs = (w) => {
    setEditingWs(w);
    setWsForm({
      slug: w.slug, title: w.title, tagline: w.tagline, description: w.description,
      registrationLink: w.registrationLink || '', targetAudience: w.targetAudience || '',
      learningOutcomes: (w.learningOutcomes || []).join('\n'),
      order: w.order ?? '', posterImage: null,
    });
    setWsModal(true);
  };

  const handleWsSubmit = async (e) => {
    e.preventDefault(); setSavingWs(true);
    try {
      const fd = new FormData();
      Object.entries(wsForm).forEach(([k, v]) => {
        if (k === 'posterImage') { if (v) fd.append('posterImage', v); }
        else if (k === 'learningOutcomes') {
          const arr = v.split('\n').map(s => s.trim()).filter(Boolean);
          fd.append('learningOutcomes', JSON.stringify(arr));
        } else fd.append(k, v);
      });
      if (editingWs) { await api.adminUpdateWorkshop(editingWs.id, fd); setSuccess('Workshop updated.'); }
      else { await api.adminCreateWorkshop(fd); setSuccess('Workshop added.'); }
      setWsModal(false); load();
    } catch (e) { setError(e.message); }
    finally { setSavingWs(false); }
  };

  const handleDeleteWs = async (id) => {
    if (!confirm('Delete this workshop and all its sessions?')) return;
    try { await api.adminDeleteWorkshop(id); setSuccess('Workshop deleted.'); load(); }
    catch (e) { setError(e.message); }
  };

  const openAddSession = (ws) => { setSessionParent(ws); setEditingSession(null); setSessionForm(EMPTY_SESSION); setSessionModal(true); };
  const openEditSession = (ws, s) => {
    setSessionParent(ws); setEditingSession(s);
    setSessionForm({
      title: s.title, instructorName: s.instructorName, instructorTitle: s.instructorTitle,
      instructorInstitution: s.instructorInstitution, instructorCountry: s.instructorCountry,
      topics: (s.topics || []).join('\n'), order: s.order ?? '', instructorPhoto: null,
    });
    setSessionModal(true);
  };

  const handleSessionSubmit = async (e) => {
    e.preventDefault(); setSavingSession(true);
    try {
      const fd = new FormData();
      Object.entries(sessionForm).forEach(([k, v]) => {
        if (k === 'instructorPhoto') { if (v) fd.append('instructorPhoto', v); }
        else if (k === 'topics') {
          const arr = v.split('\n').map(s => s.trim()).filter(Boolean);
          fd.append('topics', JSON.stringify(arr));
        } else fd.append(k, v);
      });
      if (editingSession) {
        await api.adminUpdateSession(sessionParent.id, editingSession.id, fd);
        setSuccess('Session updated.');
      } else {
        await api.adminCreateSession(sessionParent.id, fd);
        setSuccess('Session added.');
      }
      setSessionModal(false); load();
    } catch (e) { setError(e.message); }
    finally { setSavingSession(false); }
  };

  const handleDeleteSession = async (wsId, sessionId) => {
    if (!confirm('Delete this session?')) return;
    try { await api.adminDeleteSession(wsId, sessionId); setSuccess('Session deleted.'); load(); }
    catch (e) { setError(e.message); }
  };

  const sf = (k) => (e) => setSessionForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <AdminPageHeader title="Workshops" subtitle={`${workshops.length} workshops`}
        action={<AddButton onClick={openAddWs} label="Add Workshop" />} />

      <AnimatePresence>
        {success && <SuccessBanner message={success} />}
        {error && <ErrorBanner message={error} onRetry={load} />}
      </AnimatePresence>

      {loading ? <div className="bg-white rounded-2xl border p-8" style={{ borderColor: 'rgba(62,139,135,0.12)' }}><LoadingState /></div> :
        workshops.length === 0 ? <AdminCard><EmptyState message="No workshops yet." /></AdminCard> : (
          <div className="space-y-4">
            {workshops.map((ws, i) => (
              <motion.div key={ws.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                className="bg-white rounded-2xl border overflow-hidden"
                style={{ borderColor: 'rgba(62,139,135,0.12)', boxShadow: '0 2px 12px rgba(30,58,68,0.05)' }}>

                {/* Workshop header */}
                <div className="flex items-start gap-4 p-5">
                  {ws.posterImage && (
                    <img src={ws.posterImage} alt={ws.title}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3 flex-wrap mb-1">
                      <h3 className="text-base font-bold" style={{ color: '#1A2E38' }}>{ws.title}</h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-bg-secondary" style={{ color: '#4A6472' }}>
                        {ws.sessions?.length || 0} sessions
                      </span>
                    </div>
                    <p className="text-xs mb-2" style={{ color: '#7A9AA6' }}>{ws.tagline}</p>
                    {ws.registrationLink && (
                      <a href={ws.registrationLink} target="_blank" rel="noopener noreferrer"
                        className="text-xs font-medium" style={{ color: '#3E8B87' }}>
                        Registration link →
                      </a>
                    )}
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <EditButton onClick={() => openEditWs(ws)} />
                    <DeleteButton onClick={() => handleDeleteWs(ws.id)} />
                    <button onClick={() => setExpandedId(expandedId === ws.id ? null : ws.id)}
                      className="p-1.5 rounded-lg transition-colors hover:bg-bg-secondary" style={{ color: '#7A9AA6' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ transform: expandedId === ws.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Sessions */}
                <AnimatePresence>
                  {expandedId === ws.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden border-t" style={{ borderColor: 'rgba(62,139,135,0.08)', background: 'rgba(62,139,135,0.02)' }}>
                      <div className="px-5 py-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#7A9AA6' }}>Sessions</span>
                          <button onClick={() => openAddSession(ws)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                            style={{ background: 'linear-gradient(135deg, #2D6E6A, #3E8B87)' }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                            </svg>
                            Add Session
                          </button>
                        </div>

                        {(!ws.sessions || ws.sessions.length === 0) ? (
                          <p className="text-xs" style={{ color: '#7A9AA6' }}>No sessions yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {ws.sessions.map(s => (
                              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-white border"
                                style={{ borderColor: 'rgba(62,139,135,0.1)' }}>
                                {s.instructorPhoto && (
                                  <img src={s.instructorPhoto} alt={s.instructorName}
                                    className="w-8 h-8 rounded-lg object-cover flex-shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs font-semibold" style={{ color: '#1A2E38' }}>{s.title}</div>
                                  <div className="text-[11px]" style={{ color: '#7A9AA6' }}>
                                    {s.instructorName} · {s.instructorInstitution}
                                  </div>
                                </div>
                                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: 'rgba(62,139,135,0.08)', color: '#4A6472' }}>
                                  {(s.topics || []).length} topics
                                </span>
                                <div className="flex items-center gap-1">
                                  <EditButton onClick={() => openEditSession(ws, s)} />
                                  <DeleteButton onClick={() => handleDeleteSession(ws.id, s.id)} />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )
      }

      {/* Workshop modal */}
      <AdminModal open={wsModal} onClose={() => setWsModal(false)}
        title={editingWs ? 'Edit Workshop' : 'Add Workshop'} size="lg">
        <form onSubmit={handleWsSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Title" required>
              <FormInput value={wsForm.title} onChange={e => setWsForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Quantum Technologies Workshop" required />
            </FormField>
            <FormField label="Slug" required>
              <FormInput value={wsForm.slug} onChange={e => setWsForm(f => ({ ...f, slug: e.target.value }))}
                placeholder="quantum-technologies" required />
            </FormField>
          </div>
          <FormField label="Tagline" required>
            <FormInput value={wsForm.tagline} onChange={e => setWsForm(f => ({ ...f, tagline: e.target.value }))}
              placeholder="Exploring the frontiers of..." required />
          </FormField>
          <FormField label="Description" required>
            <FormTextarea value={wsForm.description} onChange={e => setWsForm(f => ({ ...f, description: e.target.value }))}
              placeholder="Full description..." rows={3} required />
          </FormField>
          <FormField label="Registration Link">
            <FormInput value={wsForm.registrationLink} onChange={e => setWsForm(f => ({ ...f, registrationLink: e.target.value }))}
              placeholder="https://forms.gle/..." />
          </FormField>
          <FormField label="Target Audience">
            <FormTextarea value={wsForm.targetAudience} onChange={e => setWsForm(f => ({ ...f, targetAudience: e.target.value }))}
              placeholder="Students, researchers..." rows={2} />
          </FormField>
          <FormField label="Learning Outcomes (one per line, press Enter/Add)">
            <TagInput value={wsForm.learningOutcomes} onChange={v => setWsForm(f => ({ ...f, learningOutcomes: v }))}
              placeholder="Grasp contrastive learning..." />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Poster Image">
              <input type="file" accept="image/*"
                onChange={e => setWsForm(f => ({ ...f, posterImage: e.target.files[0] || null }))}
                className="w-full text-sm" style={{ color: '#4A6472' }} />
            </FormField>
            <FormField label="Order">
              <FormInput type="number" value={wsForm.order} onChange={e => setWsForm(f => ({ ...f, order: e.target.value }))}
                placeholder="1" />
            </FormField>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2 border-t" style={{ borderColor: 'rgba(62,139,135,0.1)' }}>
            <button type="button" onClick={() => setWsModal(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-bg-secondary"
              style={{ color: '#4A6472' }}>Cancel</button>
            <SubmitButton loading={savingWs} label={editingWs ? 'Update Workshop' : 'Add Workshop'} />
          </div>
        </form>
      </AdminModal>

      {/* Session modal */}
      <AdminModal open={sessionModal} onClose={() => setSessionModal(false)}
        title={editingSession ? 'Edit Session' : 'Add Session'} size="lg">
        <form onSubmit={handleSessionSubmit} className="space-y-4">
          <FormField label="Session Title" required>
            <FormInput value={sessionForm.title} onChange={sf('title')} placeholder="Quantum Computing" required />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Instructor Name" required>
              <FormInput value={sessionForm.instructorName} onChange={sf('instructorName')} placeholder="Prof. Dr. Jane Doe" required />
            </FormField>
            <FormField label="Instructor Title">
              <FormInput value={sessionForm.instructorTitle} onChange={sf('instructorTitle')} placeholder="Professor" />
            </FormField>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Institution" required>
              <FormInput value={sessionForm.instructorInstitution} onChange={sf('instructorInstitution')} placeholder="MIT" required />
            </FormField>
            <FormField label="Country">
              <FormInput value={sessionForm.instructorCountry} onChange={sf('instructorCountry')} placeholder="USA" />
            </FormField>
          </div>
          <FormField label="Topics (one per line)">
            <TagInput value={sessionForm.topics} onChange={v => setSessionForm(f => ({ ...f, topics: v }))}
              placeholder="Gates and noise mitigation" />
          </FormField>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Instructor Photo">
              <input type="file" accept="image/*"
                onChange={e => setSessionForm(f => ({ ...f, instructorPhoto: e.target.files[0] || null }))}
                className="w-full text-sm" style={{ color: '#4A6472' }} />
            </FormField>
            <FormField label="Order">
              <FormInput type="number" value={sessionForm.order} onChange={sf('order')} placeholder="1" />
            </FormField>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2 border-t" style={{ borderColor: 'rgba(62,139,135,0.1)' }}>
            <button type="button" onClick={() => setSessionModal(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-bg-secondary"
              style={{ color: '#4A6472' }}>Cancel</button>
            <SubmitButton loading={savingSession} label={editingSession ? 'Update Session' : 'Add Session'} />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
