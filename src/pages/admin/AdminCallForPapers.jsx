import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { api } from '../../utils/api';

const TEAL = '#3E8B87';
const DARK = '#1A2E38';
const MUTED = '#7A9AA6';

function LinkCard({ label, description, settingKey, currentUrl, onSave, saving }) {
  const [value, setValue] = useState(currentUrl || '');

  const handleSave = () => {
    if (!value.trim()) return;
    onSave(settingKey, value.trim());
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border p-6"
      style={{ borderColor: 'rgba(62,139,135,0.15)', boxShadow: '0 2px 12px rgba(30,58,68,0.06)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: TEAL }}>{label}</div>
          <p className="text-sm" style={{ color: MUTED }}>{description}</p>
        </div>
        {currentUrl && (
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 ml-4"
            style={{ background: 'rgba(62,139,135,0.1)', color: TEAL, textDecoration: 'none' }}
          >
            View Current
          </a>
        )}
      </div>

      <input
        type="url"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="https://www.overleaf.com/..."
        className="w-full px-4 py-2.5 rounded-xl border text-sm"
        style={{ borderColor: 'rgba(62,139,135,0.25)', color: DARK }}
      />

      <button
        onClick={handleSave}
        disabled={!value.trim() || saving}
        className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: value.trim() ? TEAL : 'rgba(62,139,135,0.15)', color: value.trim() ? 'white' : MUTED }}
      >
        {saving ? 'Saving…' : `Save ${label} Link`}
      </button>
    </motion.div>
  );
}

function UploadCard({ label, description, accept, fieldName, currentUrl, isImage, fileTypeLabel = 'File', onUpload, uploading }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    const file = inputRef.current?.files[0];
    if (!file) return;
    onUpload(fieldName, file);
  };

  const hasNewFile = !!fileName;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border p-6"
      style={{ borderColor: 'rgba(62,139,135,0.15)', boxShadow: '0 2px 12px rgba(30,58,68,0.06)' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: TEAL }}>{label}</div>
          <p className="text-sm" style={{ color: MUTED }}>{description}</p>
        </div>
        {currentUrl && !hasNewFile && (
          <a
            href={currentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg flex-shrink-0 ml-4"
            style={{ background: 'rgba(62,139,135,0.1)', color: TEAL, textDecoration: 'none' }}
          >
            View Current
          </a>
        )}
      </div>

      {/* Current image preview */}
      {isImage && currentUrl && !preview && (
        <div className="mb-4 rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(62,139,135,0.15)', maxHeight: 200 }}>
          <img src={currentUrl} alt="Current poster" className="w-full object-contain" style={{ maxHeight: 200 }} />
        </div>
      )}

      {/* New image preview */}
      {isImage && preview && (
        <div className="mb-4 rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(62,139,135,0.15)', maxHeight: 200 }}>
          <img src={preview} alt="Preview" className="w-full object-contain" style={{ maxHeight: 200 }} />
        </div>
      )}

      {/* Current file indicator */}
      {!isImage && currentUrl && !hasNewFile && (
        <div className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: 'rgba(62,139,135,0.06)', border: '1px solid rgba(62,139,135,0.12)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
          </svg>
          <span className="text-sm font-medium" style={{ color: DARK }}>{fileTypeLabel} uploaded</span>
        </div>
      )}

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        className="rounded-xl border-2 border-dashed cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 py-6"
        style={{ borderColor: hasNewFile ? TEAL : 'rgba(62,139,135,0.25)', background: hasNewFile ? 'rgba(62,139,135,0.04)' : 'transparent' }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={hasNewFile ? TEAL : MUTED} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
        <span className="text-sm font-medium" style={{ color: hasNewFile ? TEAL : MUTED }}>
          {hasNewFile ? fileName : `Click to select ${isImage ? 'image' : fileTypeLabel}`}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={!hasNewFile || uploading}
        className="mt-4 w-full py-2.5 rounded-xl text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: hasNewFile ? TEAL : 'rgba(62,139,135,0.15)', color: hasNewFile ? 'white' : MUTED }}
      >
        {uploading ? 'Uploading…' : `Upload ${label}`}
      </button>
    </motion.div>
  );
}

export default function AdminCallForPapers() {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.adminGetSettings()
      .then(r => setSettings(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (fieldName, file) => {
    setUploading(fieldName);
    setSuccess('');
    setError('');
    try {
      const formData = new FormData();
      formData.append(fieldName, file);
      await api.adminUploadCfpAssets(formData);
      const r = await api.adminGetSettings();
      setSettings(r.data);
      const labels = { poster: 'Poster', latexTemplate: 'LaTeX Templates' };
      setSuccess(`${labels[fieldName]} uploaded successfully.`);
    } catch (e) {
      setError(e.message || 'Upload failed.');
    } finally {
      setUploading(null);
    }
  };

  const handleSaveLink = async (settingKey, value) => {
    setSaving(true);
    setSuccess('');
    setError('');
    try {
      await api.adminUpdateSetting(settingKey, value);
      const r = await api.adminGetSettings();
      setSettings(r.data);
      setSuccess('Overleaf Templates link saved successfully.');
    } catch (e) {
      setError(e.message || 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: TEAL }}>Content</div>
        <h1 className="text-2xl lg:text-3xl font-bold" style={{ color: DARK }}>Call for Papers Assets</h1>
        <p className="text-sm mt-1" style={{ color: MUTED }}>
          Upload the CFP poster image, LaTeX template ZIP, and Overleaf Templates link shown on the public Call for Papers page.
        </p>
      </motion.div>

      {/* Banners */}
      {success && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2"
          style={{ background: 'rgba(62,139,135,0.1)', color: '#2D6E6A', border: '1px solid rgba(62,139,135,0.2)' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          {success}
        </motion.div>
      )}
      {error && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-3 rounded-xl text-sm font-medium"
          style={{ background: 'rgba(220,38,38,0.08)', color: '#dc2626', border: '1px solid rgba(220,38,38,0.2)' }}>
          {error}
        </motion.div>
      )}

      {loading ? (
        <div className="text-sm" style={{ color: MUTED }}>Loading current assets…</div>
      ) : (
        <div className="grid gap-6">
          {/* Poster */}
          <UploadCard
            label="CFP Poster"
            description="Conference poster image shown on the Call for Papers page below the heading."
            accept="image/png,image/jpeg,image/jpg,image/webp"
            fieldName="poster"
            currentUrl={settings.cfp_poster_url}
            isImage
            onUpload={handleUpload}
            uploading={uploading === 'poster'}
          />

          {/* LaTeX Templates */}
          <UploadCard
            label="LaTeX Templates"
            description="ZIP file with LaTeX templates for paper submissions."
            accept="application/zip,.zip"
            fieldName="latexTemplate"
            fileTypeLabel="ZIP"
            currentUrl={settings.cfp_latex_template_url}
            isImage={false}
            onUpload={handleUpload}
            uploading={uploading === 'latexTemplate'}
          />

          {/* Overleaf Templates */}
          <LinkCard
            label="Overleaf Templates"
            description="Link to the Overleaf template project for paper submissions."
            settingKey="cfp_overleaf_template_url"
            currentUrl={settings.cfp_overleaf_template_url}
            onSave={handleSaveLink}
            saving={saving}
          />
        </div>
      )}
    </div>
  );
}
