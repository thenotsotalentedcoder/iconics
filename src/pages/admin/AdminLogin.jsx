import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../../contexts/AdminContext';

export default function AdminLogin() {
  const { login } = useAdmin();
  const navigate = useNavigate();
  const [secret, setSecret] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(secret);
      navigate('/admin');
    } catch {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4"
      style={{ background: 'linear-gradient(135deg, #FAFBFB 0%, #EEF3F3 100%)' }}>

      {/* Subtle background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(62,139,135,0.3) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, rgba(62,139,135,0.2) 0%, transparent 70%)' }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl border shadow-large overflow-hidden"
          style={{ borderColor: 'rgba(62,139,135,0.14)', boxShadow: '0 24px 64px rgba(30,58,68,0.12)' }}>

          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #2D6E6A, #3E8B87, #5AA8A3)' }} />

          <div className="px-8 py-10">
            {/* Logo mark */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #2D6E6A, #3E8B87)' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10L8 14L16 6" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#3E8B87' }}>ICONICS'26</div>
                <div className="text-base font-bold" style={{ color: '#1A2E38' }}>Admin Panel</div>
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-1" style={{ color: '#1A2E38' }}>Welcome back</h1>
            <p className="text-sm mb-8" style={{ color: '#7A9AA6' }}>Enter your admin secret to continue.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#4A6472' }}>
                  Admin Secret
                </label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => setSecret(e.target.value)}
                  placeholder="Enter your secret key"
                  required
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                  style={{
                    border: error ? '1.5px solid #ef4444' : '1.5px solid rgba(62,139,135,0.2)',
                    background: '#FAFBFB',
                    color: '#1A2E38',
                  }}
                  onFocus={(e) => { if (!error) e.target.style.borderColor = '#3E8B87'; }}
                  onBlur={(e) => { if (!error) e.target.style.borderColor = 'rgba(62,139,135,0.2)'; }}
                />
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-xs text-red-500"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={loading || !secret}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full py-3 rounded text-base font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  background: loading || !secret ? '#7A9AA6' : 'linear-gradient(135deg, #2D6E6A, #3E8B87)',
                  boxShadow: loading || !secret ? 'none' : '0 8px 24px rgba(62,139,135,0.3)',
                  cursor: loading || !secret ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
                      <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign In'}
              </motion.button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs mt-4" style={{ color: '#7A9AA6' }}>
          ICONICS'26 — NED University of Engineering & Technology
        </p>
      </motion.div>
    </div>
  );
}
