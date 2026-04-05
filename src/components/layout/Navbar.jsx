import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from '../../utils/constants';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const active = (p) => location.pathname === p;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: scrolled ? 'rgba(13,31,38,0.82)' : 'rgba(13,31,38,0.35)',
          backdropFilter: 'blur(20px) saturate(160%)',
          WebkitBackdropFilter: 'blur(20px) saturate(160%)',
          borderBottom: scrolled
            ? '1px solid rgba(90,168,163,0.15)'
            : '1px solid rgba(255,255,255,0.06)',
          transition: 'all 0.35s ease',
        }}
      >
        <div className="mx-auto px-4 sm:px-6 lg:px-10 max-w-screen-xl">
          <div className="flex items-center justify-between h-14 sm:h-16">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-0 flex-shrink-0">
              <span style={{ color: '#5AA8A3', fontSize: '1.25rem', fontWeight: 800 }}>i</span>
              <span style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em' }}>CONICS</span>
              <span style={{ color: '#5AA8A3', fontSize: '1rem', fontWeight: 700, marginLeft: '3px' }}>'26</span>
            </Link>

            {/* Desktop nav — hidden below lg */}
            <nav className="hidden lg:flex items-center gap-0">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-3 py-1.5 text-[13px] font-medium whitespace-nowrap transition-colors duration-200"
                  style={{ color: active(link.path) ? '#5AA8A3' : 'rgba(255,255,255,0.55)' }}
                >
                  {active(link.path) && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'rgba(90,168,163,0.12)', border: '1px solid rgba(90,168,163,0.2)' }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <Link
              to="/registration"
              className="hidden lg:inline-block px-5 py-2 text-[13px] font-bold text-white rounded-full flex-shrink-0 transition-all duration-200"
              style={{
                background: '#3E8B87',
                boxShadow: '0 4px 14px rgba(62,139,135,0.3)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2D6E6A'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#3E8B87'; }}
            >
              Register Now
            </Link>

            {/* Mobile: Register + Burger */}
            <div className="lg:hidden flex items-center gap-2">
              <Link
                to="/registration"
                className="px-4 py-1.5 text-[12px] font-bold text-white rounded-full"
                style={{ background: '#3E8B87' }}
              >
                Register
              </Link>
              <button
                className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 5.5 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="w-4 h-px rounded-full block bg-white"
                />
                <motion.span
                  animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }}
                  transition={{ duration: 0.22 }}
                  className="w-4 h-px rounded-full block bg-white"
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? -5.5 : 0 }}
                  transition={{ duration: 0.22 }}
                  className="w-4 h-px rounded-full block bg-white"
                />
              </button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden flex flex-col"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            style={{
              background: 'rgba(10,26,32,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              paddingTop: '72px',
            }}
          >
            <nav className="flex flex-col px-6 py-6 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ delay: i * 0.04, duration: 0.28 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center justify-between py-3.5 border-b text-base font-semibold transition-colors duration-150"
                    style={{
                      borderColor: 'rgba(90,168,163,0.1)',
                      color: active(link.path) ? '#5AA8A3' : 'rgba(255,255,255,0.7)',
                    }}
                  >
                    <span>{link.name}</span>
                    {active(link.path) && (
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#5AA8A3' }} />
                    )}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.04 + 0.06 }}
                className="pt-6"
              >
                <Link
                  to="/registration"
                  className="w-full py-3.5 text-white text-base font-bold rounded-xl block text-center"
                  style={{ background: '#3E8B87', boxShadow: '0 6px 20px rgba(62,139,135,0.3)' }}
                >
                  Register Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}