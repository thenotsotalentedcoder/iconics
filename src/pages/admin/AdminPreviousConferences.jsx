import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../utils/api';

const TEAL = '#3E8B87';
const CONFERENCES = [
  { year: '2024', label: "ICONICS'24", edition: '4th Edition' },
  { year: '2022', label: "ICONICS'22", edition: '3rd Edition' },
  { year: '2018', label: "ICONICS'18", edition: '2nd Edition' },
  { year: '2016', label: "ICONICS'16", edition: '1st Edition' },
];

export default function AdminPreviousConferences() {
  const [records, setRecords] = useState({});
  const [saving, setSaving] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.adminGetPreviousConferencePublications()
      .then(({ data }) => setRecords(Object.fromEntries(data.map(record => [record.year, record]))))
      .catch(() => setMessage('Could not load saved journal details.'));
  }, []);

  const update = (year, field, value) => setRecords(current => ({
    ...current,
    [year]: { ...(current[year] || { year, journalUrl: '', isbn: '', issn: '' }), [field]: value },
  }));

  const save = async (year) => {
    setSaving(year);
    setMessage('');
    try {
      const { data } = await api.adminUpdatePreviousConferencePublication(year, records[year] || {});
      setRecords(current => ({ ...current, [year]: data }));
      setMessage(`${year} journal details saved.`);
    } catch (error) {
      setMessage(error.message || 'Could not save journal details.');
    } finally { setSaving(''); }
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} className="mb-7">
        <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: TEAL }}>Archive management</div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: '#1A2E38' }}>Previous Conferences</h1>
        <p className="text-sm mt-2" style={{ color: '#7A9AA6' }}>Add the journal URL, ISBN, and ISSN shown for each previous conference.</p>
      </motion.div>
      {message && <div className="mb-5 px-4 py-3 rounded-xl text-sm" style={{ background: 'rgba(62,139,135,0.09)', color: '#2D6E6A' }}>{message}</div>}
      <div className="space-y-5">
        {CONFERENCES.map(({ year, label, edition }) => {
          const record = records[year] || {};
          return <div key={year} className="bg-white rounded-2xl border p-5 sm:p-6" style={{ borderColor: 'rgba(62,139,135,0.12)' }}>
            <div className="mb-5"><h2 className="text-lg font-bold" style={{ color: '#1A2E38' }}>{label}</h2><p className="text-xs mt-1" style={{ color: '#7A9AA6' }}>{edition}</p></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2 text-xs font-semibold" style={{ color: '#4A6472' }}>Journal link
                <input type="url" value={record.journalUrl || ''} onChange={e => update(year, 'journalUrl', e.target.value)} placeholder="https://journal.example.com/..." className="mt-1.5 w-full px-3 py-2.5 rounded-xl text-sm border outline-none font-normal" style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38' }} />
              </label>
              <label className="text-xs font-semibold" style={{ color: '#4A6472' }}>ISBN
                <input value={record.isbn || ''} onChange={e => update(year, 'isbn', e.target.value)} placeholder="e.g. 978-..." className="mt-1.5 w-full px-3 py-2.5 rounded-xl text-sm border outline-none font-normal" style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38' }} />
              </label>
              <label className="text-xs font-semibold" style={{ color: '#4A6472' }}>ISSN
                <input value={record.issn || ''} onChange={e => update(year, 'issn', e.target.value)} placeholder="e.g. 1234-5678" className="mt-1.5 w-full px-3 py-2.5 rounded-xl text-sm border outline-none font-normal" style={{ borderColor: 'rgba(62,139,135,0.2)', color: '#1A2E38' }} />
              </label>
            </div>
            <div className="mt-5 flex justify-end"><button onClick={() => save(year)} disabled={saving === year} className="px-4 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-60" style={{ background: `linear-gradient(135deg, #2D6E6A, ${TEAL})` }}>{saving === year ? 'Saving…' : 'Save journal details'}</button></div>
          </div>;
        })}
      </div>
    </div>
  );
}
