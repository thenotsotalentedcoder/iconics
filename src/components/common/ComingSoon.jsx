import { motion } from 'framer-motion';
import PageTransition from '../layout/PageTransition';

const TEAL = '#3E8B87';

export default function ComingSoon({ title = 'Coming Soon', message = 'This section will be available soon.' }) {
  return (
    <PageTransition>
      <div
        className="relative min-h-screen flex items-center justify-center px-4"
        style={{ background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-md"
        >
          {/* Icon */}
          <div
            className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{ background: `${TEAL}12`, border: `1px solid ${TEAL}25` }}
          >
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
          </div>

          <h1 className="text-3xl font-bold mb-3" style={{ color: '#0F4C5C' }}>{title}</h1>

          <div
            className="h-0.5 w-16 mx-auto mb-5 rounded-full"
            style={{ background: `linear-gradient(90deg, transparent, ${TEAL}, transparent)` }}
          />

          <p className="text-base leading-relaxed" style={{ color: '#2F7C7A' }}>{message}</p>

          <motion.div
            className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
            style={{ background: `${TEAL}12`, border: `1px solid ${TEAL}25`, color: TEAL }}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: TEAL }} />
            Coming Soon
          </motion.div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
