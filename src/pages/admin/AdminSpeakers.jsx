import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';
import {
  AdminPageHeader, AdminCard, AddButton, EditButton, DeleteButton,
  EmptyState, LoadingState, ErrorBanner, SuccessBanner,
} from '../../components/admin/AdminTable';
import AdminModal, {
  FormField, FormInput, FormTextarea, FormSelect, SubmitButton,
} from '../../components/admin/AdminModal';

const EMPTY_FORM = {
  name: '', title: '', institution: '', country: '', type: 'keynote',
  bio: '', topics: '', website: '', linkedin: '', scholar: '', order: '',
  photo: null,
};

function TagInput({ value, onChange, placeholder }) {
  const [input, setInput] = useState('');
  const tags = value ? value.split(',').map(t => t.trim()).filter(Boolean) : [];

  const add = () => {
    const v = input.trim();
    if (!v) return;
    const next = [...tags, v].join(', ');
    onChange(next);
    setInput('');
  };

  const remove = (i) => {
    const next = tags.filter((_, idx) => idx !== i).join(', ');
    onChange(next);
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); add(); } }}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 rounded-xl text-sm outline-none"
          style={{ border: '1.5px solid rgba(62,139,135,0.18)', background: '#FAFBFB', color: '#1A2E38' }}
          onFocus={e => { e.target.style.borderColor = '#3E8B87'; }}
          onBlur={e => { e.target.style.borderColor = 'rgba(62,139,135,0.18)'; }}
        />
        <button type="button" onClick={add}
          className="px-3 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: '#3E8B87' }}>
          Add
        </button>
      </div>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag, i) => (
            <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
              style={{ background: 'rgba(62,139,135,0.1)', color: '#2D6E6A' }}>
              {tag}
              <button type="button" onClick={() => remove(i)} className="ml-0.5 opacity-60 hover:opacity-100">×</button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminSpeakers() {
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [filter, setFilter] = useState('all');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await api.adminGetSpeakers();
      setSpeakers(res.data);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditing(null); setForm(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (s) => {
    setEditing(s);
    setForm({
      name: s.name, title: s.title, institution: s.institution, country: s.country,
      type: s.type, bio: s.bio, topics: (s.topics || []).join(', '),
      website: s.website || '', linkedin: s.linkedin || '', scholar: s.scholar || '',
      order: s.order ?? '', photo: null,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'photo') { if (v) fd.append('photo', v); }
        else fd.append(k, v);
      });
      if (editing) {
        await api.adminUpdateSpeaker(editing.id, fd);
        setSuccess('Speaker updated.');
      } else {
        await api.adminCreateSpeaker(fd);
        setSuccess('Speaker added.');
      }
      setModalOpen(false);
      load();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this speaker?')) return;
    try {
      await api.adminDeleteSpeaker(id);
      setSuccess('Speaker deleted.');
      load();
    } catch (e) { setError(e.message); }
  };

  const filtered = filter === 'all' ? speakers : speakers.filter(s => s.type === filter);

  return (
    <div className="p-6 lg:p-8 max-w-6xl mx-auto">
      <AdminPageHeader
        title="Speakers"
        subtitle={`${speakers.length} total · ${speakers.filter(s => s.type === 'keynote').length} keynote · ${speakers.filter(s => s.type === 'workshop').length} workshop`}
        action={<AddButton onClick={openAdd} label="Add Speaker" />}
      />

      <AnimatePresence>
        {success && <SuccessBanner message={success} />}
        {error && <ErrorBanner message={error} onRetry={load} />}
      </AnimatePresence>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {['all', 'keynote', 'workshop'].map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all duration-200"
            style={{
              background: filter === f ? 'linear-gradient(135deg, #2D6E6A, #3E8B87)' : 'rgba(62,139,135,0.08)',
              color: filter === f ? 'white' : '#4A6472',
            }}>
            {f === 'all' ? `All (${speakers.length})` : `${f.charAt(0).toUpperCase() + f.slice(1)} (${speakers.filter(s => s.type === f).length})`}
          </button>
        ))}
      </div>

      <AdminCard>
        {loading ? <LoadingState /> : filtered.length === 0 ? <EmptyState message="No speakers yet." /> : (
          <div className="divide-y" style={{ borderColor: 'rgba(62,139,135,0.08)' }}>
            {filtered.map((s, i) => (
              <motion.div key={s.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 px-5 py-4 hover:bg-bg-secondary transition-colors duration-150">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-bg-secondary">
                  {s.photo ? (
                    <img src={s.photo} alt={s.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-bold"
                      style={{ color: '#3E8B87', background: 'rgba(62,139,135,0.1)' }}>
                      {s.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold truncate" style={{ color: '#1A2E38' }}>{s.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide flex-shrink-0"
                      style={{
                        background: s.type === 'keynote' ? 'rgba(62,139,135,0.1)' : 'rgba(45,110,106,0.1)',
                        color: s.type === 'keynote' ? '#3E8B87' : '#2D6E6A',
                      }}>
                      {s.type}
                    </span>
                  </div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: '#7A9AA6' }}>
                    {s.title} · {s.institution}
                  </div>
                </div>

                {/* Topics */}
                <div className="hidden md:flex gap-1 flex-wrap max-w-xs">
                  {(s.topics || []).slice(0, 2).map((t, ti) => (
                    <span key={ti} className="px-2 py-0.5 rounded-full text-[10px]"
                      style={{ background: 'rgba(62,139,135,0.07)', color: '#4A6472' }}>{t}</span>
                  ))}
                  {(s.topics || []).length > 2 && (
                    <span className="text-[10px]" style={{ color: '#7A9AA6' }}>+{s.topics.length - 2}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <EditButton onClick={() => openEdit(s)} />
                  <DeleteButton onClick={() => handleDelete(s.id)} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AdminCard>

      {/* Modal */}
      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Speaker' : 'Add Speaker'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Full Name" required>
              <FormInput value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="Prof. Dr. Jane Doe" required />
            </FormField>
            <FormField label="Title / Role" required>
              <FormInput value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Professor" required />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Institution" required>
              <FormInput value={form.institution} onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
                placeholder="MIT, Cambridge" required />
            </FormField>
            <FormField label="Country" required>
              <FormInput value={form.country} onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                placeholder="USA" required />
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Speaker Type" required>
              <FormSelect value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                <option value="keynote">Keynote</option>
                <option value="workshop">Workshop</option>
              </FormSelect>
            </FormField>
            <FormField label="Display Order">
              <FormInput type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                placeholder="1" />
            </FormField>
          </div>

          <FormField label="Bio" required>
            <FormTextarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              placeholder="Short biography..." rows={3} required />
          </FormField>

          <FormField label="Topics (press Enter or click Add to add each)">
            <TagInput value={form.topics} onChange={v => setForm(f => ({ ...f, topics: v }))}
              placeholder="e.g. Quantum Computing" />
          </FormField>

          <FormField label="Photo">
            <input type="file" accept="image/*"
              onChange={e => setForm(f => ({ ...f, photo: e.target.files[0] || null }))}
              className="w-full text-sm" style={{ color: '#4A6472' }} />
            {editing?.photo && !form.photo && (
              <p className="text-xs mt-1" style={{ color: '#7A9AA6' }}>Current photo will be kept if none selected.</p>
            )}
          </FormField>

          <div className="grid grid-cols-3 gap-3">
            <FormField label="Website">
              <FormInput value={form.website} onChange={e => setForm(f => ({ ...f, website: e.target.value }))} placeholder="#" />
            </FormField>
            <FormField label="LinkedIn">
              <FormInput value={form.linkedin} onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))} placeholder="#" />
            </FormField>
            <FormField label="Google Scholar">
              <FormInput value={form.scholar} onChange={e => setForm(f => ({ ...f, scholar: e.target.value }))} placeholder="#" />
            </FormField>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t" style={{ borderColor: 'rgba(62,139,135,0.1)' }}>
            <button type="button" onClick={() => setModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-bg-secondary transition-colors"
              style={{ color: '#4A6472' }}>
              Cancel
            </button>
            <SubmitButton loading={saving} label={editing ? 'Update Speaker' : 'Add Speaker'} />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
