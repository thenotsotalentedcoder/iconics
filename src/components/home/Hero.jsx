import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ─── Research Network Canvas ──────────────────────────────────── */
const ResearchNetwork = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, t = 0, raf;
    let mouse = { x: 0.5, y: 0.5 }, mTarget = { x: 0.5, y: 0.5 };

    const resize = () => {
      W = canvas.width = canvas.parentElement.offsetWidth;
      H = canvas.height = canvas.parentElement.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const TYPES = ['paper', 'author', 'keyword'];
    const nodes = Array.from({ length: 55 }, (_, i) => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00016,
      vy: (Math.random() - 0.5) * 0.00016,
      type: TYPES[i % 3],
      r: i % 3 === 0 ? 3.5 : i % 3 === 1 ? 2.5 : 2,
      phase: Math.random() * Math.PI * 2,
      links: [],
    }));
    nodes.forEach((n, i) => {
      const cnt = n.type === 'paper' ? 2 : 1;
      for (let k = 0; k < cnt; k++) {
        const j = Math.floor(Math.random() * nodes.length);
        if (j !== i) n.links.push(j);
      }
    });

    const onMouseMove = (e) => {
      const r = canvas.getBoundingClientRect();
      mTarget.x = (e.clientX - r.left) / W;
      mTarget.y = (e.clientY - r.top) / H;
    };
    canvas.parentElement.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      mouse.x += (mTarget.x - mouse.x) * 0.04;
      mouse.y += (mTarget.y - mouse.y) * 0.04;

      nodes.forEach(n => {
        n.x += n.vx + Math.sin(n.phase + t * 0.003) * 0.00004;
        n.y += n.vy + Math.cos(n.phase + t * 0.004) * 0.00003;
        if (n.x < 0) n.x = 1; if (n.x > 1) n.x = 0;
        if (n.y < 0) n.y = 1; if (n.y > 1) n.y = 0;
      });

      nodes.forEach(n => {
        n.links.forEach(j => {
          const m = nodes[j];
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const prox = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 0.3);
          ctx.beginPath();
          ctx.moveTo(n.x * W, n.y * H);
          const cx2 = (n.x + m.x) / 2 * W + (n.y - m.y) * W * 0.06;
          const cy2 = (n.y + m.y) / 2 * H + (m.x - n.x) * H * 0.06;
          ctx.quadraticCurveTo(cx2, cy2, m.x * W, m.y * H);
          ctx.strokeStyle = `rgba(90,168,163,${0.05 + prox * 0.18})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        });
      });

      nodes.forEach((n, i) => {
        nodes.forEach((m, j) => {
          if (j <= i) return;
          const dx = n.x - m.x, dy = n.y - m.y;
          const dd = Math.sqrt(dx * dx + dy * dy);
          if (dd < 0.09) {
            const px = n.x - mouse.x, py = n.y - mouse.y;
            const prox = Math.max(0, 1 - Math.sqrt(px * px + py * py) / 0.25);
            ctx.beginPath();
            ctx.moveTo(n.x * W, n.y * H);
            ctx.lineTo(m.x * W, m.y * H);
            ctx.strokeStyle = `rgba(90,168,163,${(1 - dd / 0.09) * 0.04 + prox * 0.14})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      });

      nodes.forEach(n => {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const prox = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / 0.22);
        const baseA = n.type === 'paper' ? 0.3 : n.type === 'author' ? 0.22 : 0.16;
        const r = n.r + prox * 2.5;
        if (n.type === 'paper' && prox > 0.2) {
          ctx.beginPath();
          ctx.arc(n.x * W, n.y * H, r + 4, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(90,168,163,${prox * 0.18})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.beginPath();
        ctx.arc(n.x * W, n.y * H, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(90,168,163,${baseA + prox * 0.55})`;
        ctx.fill();
      });

      const cg = ctx.createRadialGradient(mouse.x * W, mouse.y * H, 0, mouse.x * W, mouse.y * H, W * 0.2);
      cg.addColorStop(0, 'rgba(62,139,135,0.09)');
      cg.addColorStop(1, 'transparent');
      ctx.fillStyle = cg;
      ctx.fillRect(0, 0, W, H);

      t++;
    };

    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      canvas.parentElement?.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 3 }}
    />
  );
};

/* ─── BG Photos ────────────────────────────────────────────────── */
const PHOTOS = [
  { src: '/images/gallery1.jpg', alt: 'Conference hall' },
  { src: '/images/gallery2.jpg', alt: 'Keynote speaker' },
  { src: '/images/gallery3.jpg', alt: 'Networking' },
  { src: '/images/gallery4.jpg', alt: 'Awards' },
  { src: '/images/gallery5.jpg', alt: 'Research poster' },
];

const BgPhotos = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx(i => (i + 1) % PHOTOS.length), 4500);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, #0f2a32 0%, #1a4a52 50%, #0d1f26 100%)', zIndex: 0 }}
      />
      <img
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.42, zIndex: 1, filter: 'saturate(0.55) brightness(0.7)' }}
      />
      {PHOTOS.map((p, i) => (
        <img
          key={p.src}
          src={p.src}
          alt={p.alt}
          onError={e => { e.target.style.display = 'none'; }}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-[1400ms]"
          style={{ opacity: i === idx ? 0.52 : 0, zIndex: 2 }}
        />
      ))}
    </>
  );
};

/* ─── Countdown ────────────────────────────────────────────────── */
const CountUnit = ({ value, label, index }) => {
  const [disp, setDisp] = useState(value);
  const [anim, setAnim] = useState(false);
  useEffect(() => {
    if (value !== disp) {
      setAnim(true);
      const t = setTimeout(() => { setDisp(value); setAnim(false); }, 200);
      return () => clearTimeout(t);
    }
  }, [value]);

  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative overflow-hidden rounded-xl flex items-center justify-center"
        style={{
          width: 'clamp(48px, 11vw, 82px)',
          height: 'clamp(54px, 12vw, 90px)',
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(90,168,163,0.22)',
          backdropFilter: 'blur(6px)',
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(90,168,163,0.4), transparent)' }}
        />
        <AnimatePresence mode="popLayout">
          <motion.span
            key={disp}
            className="tabular-nums font-bold text-white absolute"
            style={{ fontSize: 'clamp(1rem, 4vw, 2.1rem)', letterSpacing: '-0.04em' }}
            initial={{ y: anim ? -18 : 0, opacity: anim ? 0 : 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {String(disp).padStart(2, '0')}
          </motion.span>
        </AnimatePresence>
      </div>
      <span
        className="mt-1 font-bold tracking-[0.18em] uppercase"
        style={{ fontSize: 'clamp(7px, 1.8vw, 9px)', color: 'rgba(90,168,163,0.65)' }}
      >
        {label}
      </span>
    </motion.div>
  );
};

const Dot = ({ delay }) => (
  <div className="flex flex-col gap-1 pb-5 flex-shrink-0">
    {[0, 0.3].map((d, i) => (
      <motion.span
        key={i}
        className="w-1 h-1 rounded-full"
        style={{ background: 'rgba(90,168,163,0.35)' }}
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.6, delay: delay + d, repeat: Infinity }}
      />
    ))}
  </div>
);

const Countdown = ({ target }) => {
  const calc = () => {
    const d = new Date(target) - Date.now();
    if (d <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(d / 86400000),
      hours: Math.floor((d / 3600000) % 24),
      minutes: Math.floor((d / 60000) % 60),
      seconds: Math.floor((d / 1000) % 60),
    };
  };
  const [tl, setTl] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTl(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex items-center gap-1 sm:gap-2">
      <CountUnit value={tl.days}    label="Days"  index={0} /><Dot delay={0}   />
      <CountUnit value={tl.hours}   label="Hours" index={1} /><Dot delay={0.2} />
      <CountUnit value={tl.minutes} label="Mins"  index={2} /><Dot delay={0.4} />
      <CountUnit value={tl.seconds} label="Secs"  index={3} />
    </div>
  );
};

/* ─── Title ────────────────────────────────────────────────────── */
const Title = () => (
  <div
    className="flex items-baseline gap-[1px] flex-wrap select-none justify-center"
    style={{ perspective: '600px' }}
  >
    {'iCONICS'.split('').map((l, i) => (
      <motion.span
        key={i}
        style={{
          fontSize: 'clamp(2rem, 10vw, 6.5rem)',
          display: 'inline-block',
          fontWeight: 800,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          color: i === 0 ? '#5AA8A3' : '#FFFFFF',
        }}
        initial={{ opacity: 0, y: 38, rotateX: -40, filter: 'blur(5px)' }}
        animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.72, delay: 0.18 + i * 0.065, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -5, color: '#5AA8A3', transition: { duration: 0.18 } }}
      >
        {l}
      </motion.span>
    ))}
    <motion.span
      style={{
        fontSize: 'clamp(1rem, 4.5vw, 3.2rem)',
        color: '#5AA8A3',
        fontWeight: 700,
        display: 'inline-block',
        marginLeft: '4px',
        lineHeight: 1,
      }}
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.72 }}
    >
      '26
    </motion.span>
  </div>
);

/* ─── Cards Strip ──────────────────────────────────────────────── */
const CARD_DATA = [
  { tag: "iCONICS '24", name: 'Conference Hall',   src: '/images/gallery1.jpg', grad: 'linear-gradient(135deg,#1a4a52,#0d2630)' },
  { tag: "iCONICS '24", name: 'Keynote Speaker',   src: '/images/gallery2.jpg', grad: 'linear-gradient(135deg,#1e5754,#0d2a30)' },
  { info: true },
  { tag: "iCONICS '24", name: 'Networking',        src: '/images/gallery3.jpg', grad: 'linear-gradient(135deg,#163a42,#0f2228)' },
  { tag: "iCONICS '24", name: 'Awards Ceremony',   src: '/images/gallery4.jpg', grad: 'linear-gradient(135deg,#1a4448,#112025)' },
  { tag: "iCONICS '24", name: 'Research Posters',  src: '/images/gallery5.jpg', grad: 'linear-gradient(135deg,#204e55,#142c32)' },
  { tag: "iCONICS '23", name: 'Panel Discussion',  src: '/images/gallery1.jpg', grad: 'linear-gradient(135deg,#1c3d45,#0e2228)' },
  { tag: "iCONICS '23", name: 'Workshop Sessions', src: '/images/gallery2.jpg', grad: 'linear-gradient(135deg,#1a4a52,#0d2630)' },
];

const ALL_CARDS = [...CARD_DATA, ...CARD_DATA];

const useCardSize = () => {
  const [size, setSize] = useState({ w: 280, h: 182 });
  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      if (vw < 400)       setSize({ w: Math.round(vw * 0.78), h: Math.round(vw * 0.50) });
      else if (vw < 640)  setSize({ w: Math.round(vw * 0.68), h: Math.round(vw * 0.44) });
      else if (vw < 1024) setSize({ w: Math.round(vw * 0.38), h: Math.round(vw * 0.24) });
      else                setSize({ w: 280, h: 182 });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);
  return size;
};

const CardsStrip = () => {
  const [paused, setPaused] = useState(false);
  const { w, h } = useCardSize();

  return (
    <div
      className="relative overflow-hidden w-full"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 48px, black calc(100% - 48px), transparent)',
      }}
    >
      <div
        className="flex"
        style={{
          gap: '12px',
          padding: '8px 0 12px',
          width: 'max-content',
          animation: 'slideCards 44s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        {ALL_CARDS.map((c, i) =>
          c.info ? (
            <div
              key={`info-${i}`}
              className="flex-shrink-0 rounded-2xl flex flex-col justify-center"
              style={{
                width: w, height: h,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(90,168,163,0.2)',
                backdropFilter: 'blur(12px)',
                padding: `${Math.round(h * 0.1)}px ${Math.round(w * 0.08)}px`,
              }}
            >
              <p style={{
                fontFamily: 'Georgia, serif',
                fontSize: `clamp(0.75rem, ${w * 0.042}px, 1.1rem)`,
                color: '#fff',
                marginBottom: Math.round(h * 0.06),
                lineHeight: 1.3,
              }}>
                5th Edition<br />IEEE Indexed
              </p>
              {[
                { k: 'Submission Deadline', v: 'Jun 30, 2026' },
                { k: 'Notification',        v: 'Aug 15, 2026' },
                { k: 'Conference',          v: 'Oct 10–11, 2026' },
              ].map(row => (
                <div
                  key={row.k}
                  className="flex justify-between items-center"
                  style={{
                    borderBottom: '1px solid rgba(90,168,163,0.1)',
                    paddingTop: Math.round(h * 0.032),
                    paddingBottom: Math.round(h * 0.032),
                  }}
                >
                  <span style={{ fontSize: `clamp(6px, ${w * 0.028}px, 10px)`, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>{row.k}</span>
                  <span style={{ fontSize: `clamp(6px, ${w * 0.028}px, 10px)`, color: 'rgba(90,168,163,0.85)', fontWeight: 600 }}>{row.v}</span>
                </div>
              ))}
            </div>
          ) : (
            <div
              key={`${c.name}-${i}`}
              className="flex-shrink-0 rounded-2xl overflow-hidden relative cursor-pointer"
              style={{
                width: w, height: h,
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 48px rgba(0,0,0,0.4), 0 0 0 1px rgba(90,168,163,0.2)';
                e.currentTarget.style.zIndex = 10;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '';
                e.currentTarget.style.zIndex = '';
              }}
            >
              <div className="absolute inset-0" style={{ background: c.grad }} />
              <img
                src={c.src} alt={c.name}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transition: 'transform 0.5s ease' }}
                onError={e => { e.target.style.display = 'none'; }}
              />
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(10,28,34,0.9) 0%, rgba(10,28,34,0.1) 50%, transparent 100%)' }}
              />
              <div
                className="absolute bottom-0 left-0 right-0"
                style={{ padding: `${Math.round(h * 0.07)}px ${Math.round(w * 0.055)}px` }}
              >
                <p style={{
                  fontSize: `clamp(6px, ${w * 0.026}px, 9px)`,
                  fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'rgba(90,168,163,0.9)',
                }}>{c.tag}</p>
                <p style={{
                  fontSize: `clamp(9px, ${w * 0.038}px, 13px)`,
                  color: 'rgba(255,255,255,0.88)', marginTop: 2, fontWeight: 500,
                }}>{c.name}</p>
              </div>
            </div>
          )
        )}
      </div>

      <style>{`
        @keyframes slideCards {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

/* ─── Hero ─────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <>
      {/* ══ HERO SECTION ══ */}
      <section
        className="relative overflow-hidden"
        style={{ background: '#0D1F26', minHeight: '100svh' }}
      >
        <BgPhotos />

        {/* Gradient overlay — readable text, fades to dark at bottom */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(13,31,38,0.28) 0%, rgba(13,31,38,0.22) 30%, rgba(13,31,38,0.6) 70%, rgba(13,31,38,1) 100%)',
            zIndex: 2,
          }}
        />

        <ResearchNetwork />

        {/* Hero content — vertically centered */}
        <div
          className="relative flex flex-col items-center justify-center text-center px-4 sm:px-8"
          style={{
            zIndex: 10,
            minHeight: '100svh',
            paddingTop: 'clamp(80px, 12vh, 120px)',
            paddingBottom: 'clamp(60px, 10vh, 100px)',
          }}
        >
          {/* Eyebrow */}
          <motion.div
            className="inline-flex items-center gap-2 mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: '#5AA8A3' }}
              animate={{ scale: [1, 1.7, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.2, repeat: Infinity }}
            />
            <span
              className="font-bold tracking-[0.2em] uppercase"
              style={{ fontSize: 'clamp(8px, 2vw, 10px)', color: 'rgba(90,168,163,0.75)' }}
            >
              October 10–11, 2026 · NED University, Karachi
            </span>
          </motion.div>

          <Title />

          <motion.p
            className="font-light leading-relaxed mt-3 sm:mt-4 px-2"
            style={{
              fontSize: 'clamp(0.8rem, 2.2vw, 1rem)',
              color: 'rgba(255,255,255,0.45)',
              maxWidth: 'min(520px, 90vw)',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.76 }}
          >
            International Conference on Innovations in Computer Science — connecting global researchers, practitioners and innovators.
          </motion.p>

          {/* Countdown */}
          <motion.div
            className="mt-5 sm:mt-7 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.82 }}
          >
            <p
              className="font-bold tracking-[0.22em] uppercase"
              style={{ fontSize: 'clamp(7px, 1.8vw, 9px)', color: 'rgba(90,168,163,0.5)' }}
            >
              Conference Starts In
            </p>
            <Countdown target="2026-10-10T09:00:00" />
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.55 }}
          >
            <Link
              to="/callforpapers"
              className="group inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200 text-white"
              style={{
                padding: 'clamp(8px,1.5vh,12px) clamp(16px,3vw,24px)',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                background: '#3E8B87',
                boxShadow: '0 4px 16px rgba(62,139,135,0.28)',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2D6E6A'; e.currentTarget.style.boxShadow = '0 6px 22px rgba(62,139,135,0.42)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#3E8B87'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(62,139,135,0.28)'; }}
            >
              Submit Paper
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 font-semibold rounded-lg transition-all duration-200"
              style={{
                padding: 'clamp(8px,1.5vh,12px) clamp(16px,3vw,24px)',
                fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                border: '1px solid rgba(90,168,163,0.22)',
                color: 'rgba(255,255,255,0.58)',
                background: 'rgba(255,255,255,0.04)',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(90,168,163,0.48)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(90,168,163,0.22)'; e.currentTarget.style.color = 'rgba(255,255,255,0.58)'; }}
            >
              Learn More
            </Link>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <span className="font-medium tracking-[0.2em] uppercase" style={{ fontSize: 'clamp(7px, 1.5vw, 8px)', color: 'rgba(90,168,163,0.32)' }}>
            Scroll
          </span>
          <motion.div
            className="w-px h-6"
            style={{ background: 'linear-gradient(to bottom, rgba(90,168,163,0.4), transparent)' }}
            animate={{ scaleY: [0, 1, 0], originY: '0%' }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>

      {/* ══ CAROUSEL SECTION — fully separate, below hero ══ */}
      <section style={{ background: '#0D1F26', paddingTop: 40, paddingBottom: 56 }}>
        {/* Section label */}
        <motion.div
          className="flex items-center gap-3 px-4 sm:px-8 mb-4"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-px flex-1" style={{ background: 'rgba(90,168,163,0.15)' }} />
          <span
            className="font-bold tracking-[0.22em] uppercase flex-shrink-0"
            style={{ fontSize: 'clamp(8px, 1.8vw, 10px)', color: 'rgba(90,168,163,0.45)' }}
          >
            Past Editions
          </span>
          <div className="h-px flex-1" style={{ background: 'rgba(90,168,163,0.15)' }} />
        </motion.div>

        <CardsStrip />
      </section>
    </>
  );
}