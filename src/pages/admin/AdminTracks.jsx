import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';
import {
  AdminPageHeader, AdminCard, AddButton, EditButton, DeleteButton,
  EmptyState, LoadingState, ErrorBanner, SuccessBanner,
} from '../../components/admin/AdminTable';
import AdminModal, { FormField, FormInput, SubmitButton } from '../../components/admin/AdminModal';

export default function AdminTracks() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  // Track modal
  const [trackModal, setTrackModal] = useState(false);
  const [editingTrack, setEditingTrack] = useState(null);
  const [trackForm, setTrackForm] = useState({ name: '', icon: '', order: '' });
  const [savingTrack, setSavingTrack] = useState(false);

  // Topic modal
  const [topicModal, setTopicModal] = useState(false);
  const [topicParent, setTopicParent] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [topicForm, setTopicForm] = useState({ name: '', order: '' });
  const [savingTopic, setSavingTopic] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { const r = await api.adminGetTracks(); setTracks(r.data); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  // Track handlers
  const openAddTrack = () => { setEditingTrack(null); setTrackForm({ name: '', icon: '', order: '' }); setTrackModal(true); };
  const openEditTrack = (t) => { setEditingTrack(t); setTrackForm({ name: t.name, icon: t.icon, order: t.order ?? '' }); setTrackModal(true); };

  const handleTrackSubmit = async (e) => {
    e.preventDefault(); setSavingTrack(true);
    try {
      const body = { name: trackForm.name, icon: trackForm.icon, order: parseInt(trackForm.order) || 0 };
      if (editingTrack) { await api.adminUpdateTrack(editingTrack.id, body); setSuccess('Track updated.'); }
      else { await api.adminCreateTrack(body); setSuccess('Track added.'); }
      setTrackModal(false); load();
    } catch (e) { setError(e.message); }
    finally { setSavingTrack(false); }
  };

  const handleDeleteTrack = async (id) => {
    if (!confirm('Delete this track and all its topics?')) return;
    try { await api.adminDeleteTrack(id); setSuccess('Track deleted.'); load(); }
    catch (e) { setError(e.message); }
  };

  // Topic handlers
  const openAddTopic = (track) => { setTopicParent(track); setEditingTopic(null); setTopicForm({ name: '', order: '' }); setTopicModal(true); };
  const openEditTopic = (track, topic) => { setTopicParent(track); setEditingTopic(topic); setTopicForm({ name: topic.name, order: topic.order ?? '' }); setTopicModal(true); };

  const handleTopicSubmit = async (e) => {
    e.preventDefault(); setSavingTopic(true);
    try {
      const body = { name: topicForm.name, order: parseInt(topicForm.order) || 0 };
      if (editingTopic) { await api.adminUpdateTopic(topicParent.id, editingTopic.id, body); setSuccess('Topic updated.'); }
      else { await api.adminAddTopic(topicParent.id, body); setSuccess('Topic added.'); }
      setTopicModal(false); load();
    } catch (e) { setError(e.message); }
    finally { setSavingTopic(false); }
  };

  const handleDeleteTopic = async (track, topicId) => {
    if (!confirm('Delete this topic?')) return;
    try { await api.adminDeleteTopic(track.id, topicId); setSuccess('Topic deleted.'); load(); }
    catch (e) { setError(e.message); }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <AdminPageHeader title="Research Tracks" subtitle={`${tracks.length} tracks configured`}
        action={<AddButton onClick={openAddTrack} label="Add Track" />} />

      <AnimatePresence>
        {success && <SuccessBanner message={success} />}
        {error && <ErrorBanner message={error} onRetry={load} />}
      </AnimatePresence>

      <AdminCard>
        {loading ? <LoadingState /> : tracks.length === 0 ? <EmptyState message="No tracks yet." /> : (
          <div className="divide-y" style={{ borderColor: 'rgba(62,139,135,0.08)' }}>
            {tracks.map((track, i) => (
              <motion.div key={track.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>

                {/* Track row */}
                <div className="flex items-center gap-3 px-5 py-4 hover:bg-bg-secondary transition-colors cursor-pointer"
                  onClick={() => setExpandedId(expandedId === track.id ? null : track.id)}>
                  <div className="text-xl flex-shrink-0">{track.icon}</div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold" style={{ color: '#1A2E38' }}>{track.name}</span>
                    <span className="ml-2 text-xs" style={{ color: '#7A9AA6' }}>{track.topics?.length || 0} topics</span>
                  </div>
                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                    <EditButton onClick={() => openEditTrack(track)} />
                    <DeleteButton onClick={() => handleDeleteTrack(track.id)} />
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7A9AA6" strokeWidth="2"
                    className="transition-transform duration-200 flex-shrink-0"
                    style={{ transform: expandedId === track.id ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Topics panel */}
                <AnimatePresence>
                  {expandedId === track.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                      style={{ background: 'rgba(62,139,135,0.03)' }}>
                      <div className="px-5 pb-4 pt-2">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: '#7A9AA6' }}>Topics</span>
                          <button onClick={() => openAddTopic(track)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white"
                            style={{ background: 'linear-gradient(135deg, #2D6E6A, #3E8B87)' }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                              <path d="M12 5v14M5 12h14" strokeLinecap="round"/>
                            </svg>
                            Add Topic
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {(track.topics || []).map(topic => (
                            <div key={topic.id}
                              className="flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-xs font-medium group"
                              style={{ background: 'rgba(62,139,135,0.1)', color: '#2D6E6A' }}>
                              {topic.name}
                              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => openEditTopic(track, topic)}
                                  className="w-4 h-4 flex items-center justify-center rounded hover:bg-white/60">
                                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                  </svg>
                                </button>
                                <button onClick={() => handleDeleteTopic(track, topic.id)}
                                  className="w-4 h-4 flex items-center justify-center rounded hover:bg-red-100 text-red-500">
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
                          {(!track.topics || track.topics.length === 0) && (
                            <span className="text-xs" style={{ color: '#7A9AA6' }}>No topics yet.</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        )}
      </AdminCard>

      {/* Track modal */}
      <AdminModal open={trackModal} onClose={() => setTrackModal(false)}
        title={editingTrack ? 'Edit Track' : 'Add Track'} size="sm">
        <form onSubmit={handleTrackSubmit} className="space-y-4">
          <FormField label="Track Name" required>
            <FormInput value={trackForm.name} onChange={e => setTrackForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Artificial Intelligence & Machine Learning" required />
          </FormField>
          <FormField label="Icon (emoji)" required>
            <FormInput value={trackForm.icon} onChange={e => setTrackForm(f => ({ ...f, icon: e.target.value }))}
              placeholder="🤖" required />
          </FormField>
          <FormField label="Order">
            <FormInput type="number" value={trackForm.order} onChange={e => setTrackForm(f => ({ ...f, order: e.target.value }))}
              placeholder="1" />
          </FormField>
          <div className="flex items-center justify-end gap-3 pt-2 border-t" style={{ borderColor: 'rgba(62,139,135,0.1)' }}>
            <button type="button" onClick={() => setTrackModal(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-bg-secondary"
              style={{ color: '#4A6472' }}>Cancel</button>
            <SubmitButton loading={savingTrack} label={editingTrack ? 'Update Track' : 'Add Track'} />
          </div>
        </form>
      </AdminModal>

      {/* Topic modal */}
      <AdminModal open={topicModal} onClose={() => setTopicModal(false)}
        title={editingTopic ? 'Edit Topic' : `Add Topic to "${topicParent?.name}"`} size="sm">
        <form onSubmit={handleTopicSubmit} className="space-y-4">
          <FormField label="Topic Name" required>
            <FormInput value={topicForm.name} onChange={e => setTopicForm(f => ({ ...f, name: e.target.value }))}
              placeholder="Deep Learning" required />
          </FormField>
          <FormField label="Order">
            <FormInput type="number" value={topicForm.order} onChange={e => setTopicForm(f => ({ ...f, order: e.target.value }))}
              placeholder="1" />
          </FormField>
          <div className="flex items-center justify-end gap-3 pt-2 border-t" style={{ borderColor: 'rgba(62,139,135,0.1)' }}>
            <button type="button" onClick={() => setTopicModal(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-bg-secondary"
              style={{ color: '#4A6472' }}>Cancel</button>
            <SubmitButton loading={savingTopic} label={editingTopic ? 'Update Topic' : 'Add Topic'} />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
