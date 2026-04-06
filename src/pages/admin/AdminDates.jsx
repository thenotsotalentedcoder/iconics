import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { api } from '../../utils/api';
import {
  AdminPageHeader, AdminCard, AddButton, EditButton, DeleteButton,
  EmptyState, LoadingState, ErrorBanner, SuccessBanner,
} from '../../components/admin/AdminTable';
import AdminModal, { FormField, FormInput, FormTextarea, SubmitButton } from '../../components/admin/AdminModal';

const EMPTY = { date: '', title: '', description: '', order: '' };

export default function AdminDates() {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try { const r = await api.adminGetDates(); setDates(r.data); }
    catch (e) { setError(e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (d) => {
    setEditing(d);
    setForm({ date: d.date, title: d.title, description: d.description, order: d.order ?? '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const body = { ...form, order: parseInt(form.order) || 0 };
      if (editing) { await api.adminUpdateDate(editing.id, body); setSuccess('Date updated.'); }
      else { await api.adminCreateDate(body); setSuccess('Date added.'); }
      setModalOpen(false); load();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this date?')) return;
    try { await api.adminDeleteDate(id); setSuccess('Deleted.'); load(); }
    catch (e) { setError(e.message); }
  };

  const f = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <AdminPageHeader title="Important Dates" subtitle={`${dates.length} dates configured`}
        action={<AddButton onClick={openAdd} label="Add Date" />} />

      <AnimatePresence>
        {success && <SuccessBanner message={success} />}
        {error && <ErrorBanner message={error} onRetry={load} />}
      </AnimatePresence>

      <AdminCard>
        {loading ? <LoadingState /> : dates.length === 0 ? <EmptyState message="No dates configured yet." /> : (
          <div className="divide-y" style={{ borderColor: 'rgba(62,139,135,0.08)' }}>
            {dates.map((d, i) => (
              <motion.div key={d.id}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="flex items-start gap-4 px-5 py-4 hover:bg-bg-secondary transition-colors duration-150">
                {/* Order badge */}
                <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ background: 'rgba(62,139,135,0.1)', color: '#3E8B87' }}>
                  {d.order}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap mb-0.5">
                    <span className="text-sm font-semibold" style={{ color: '#1A2E38' }}>{d.title}</span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
                      style={{ background: 'rgba(62,139,135,0.08)', color: '#3E8B87' }}>{d.date}</span>
                  </div>
                  <p className="text-xs" style={{ color: '#7A9AA6' }}>{d.description}</p>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <EditButton onClick={() => openEdit(d)} />
                  <DeleteButton onClick={() => handleDelete(d.id)} />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AdminCard>

      <AdminModal open={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Date' : 'Add Date'} size="sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <FormField label="Title" required>
            <FormInput value={form.title} onChange={f('title')} placeholder="Paper Submission Deadline" required />
          </FormField>
          <FormField label="Date" required>
            <FormInput value={form.date} onChange={f('date')} placeholder="June 30, 2026" required />
          </FormField>
          <FormField label="Description">
            <FormTextarea value={form.description} onChange={f('description')} placeholder="Short description..." rows={2} />
          </FormField>
          <FormField label="Order">
            <FormInput type="number" value={form.order} onChange={f('order')} placeholder="1" />
          </FormField>
          <div className="flex items-center justify-end gap-3 pt-2 border-t" style={{ borderColor: 'rgba(62,139,135,0.1)' }}>
            <button type="button" onClick={() => setModalOpen(false)}
              className="px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-bg-secondary transition-colors"
              style={{ color: '#4A6472' }}>Cancel</button>
            <SubmitButton loading={saving} label={editing ? 'Update' : 'Add Date'} />
          </div>
        </form>
      </AdminModal>
    </div>
  );
}
