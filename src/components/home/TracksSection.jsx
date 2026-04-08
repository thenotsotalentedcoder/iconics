import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tracks as staticTracks } from '../../data/tracks';
import { useApiData } from '../../hooks/useApiData';
import { api } from '../../utils/api';

const TEAL = '#3E8B87';
const DARK = '#1A2E38';

const NeuralBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Point {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
      }
      move() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }
    }

    const init = () => {
      particles = Array.from({ length: 40 }, () => new Point());
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.move();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x;
          const dy = p.y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(62, 139, 135, ${0.15 - dist/1200})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.fillStyle = `rgba(62, 139, 135, 0.3)`;
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    render();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
};

export default function TracksSection() {
  const { data: tracks } = useApiData(api.getTracks, staticTracks);
  const tickerItems = [...tracks, ...tracks, ...tracks];

  return (
    <section className="relative py-20 overflow-hidden bg-transparent">
      <NeuralBg />

      <div className="container mx-auto px-4 sm:px-6 mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: DARK, letterSpacing: '-0.04em' }}>
              Conference Tracks
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Explore specialized domains. Hover over a track to pause and explore.
            </p>
          </div>
        </div>
      </div>

      {/* Ticker wrapper — no overflow:hidden so box-shadows don't clip */}
      <div
        className="relative flex group"
        style={{
          /* Fade edges with mask instead of overflow:hidden */
          maskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 60px, black calc(100% - 60px), transparent)',
        }}
      >
        {/* Extra vertical padding so raised card shadows aren't clipped */}
        <div style={{ paddingTop: '14px', paddingBottom: '34px', overflow: 'hidden', width: '100%' }}>
          <motion.div
            className="flex gap-8 pr-8"
            animate={{ x: ["0%", "-33.33%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 35,
                ease: "linear"
              }
            }}
            style={{ cursor: 'grab' }}
            whileHover={{ animationPlayState: 'paused' }}
          >
            {tickerItems.map((track, idx) => (
              <div
                key={`${track.id}-${idx}`}
                className="flex-shrink-0 w-[300px] bg-white/80 backdrop-blur-sm border border-white/40 p-6 transition-all duration-500 hover:bg-white hover:-translate-y-3"
                style={{
                  borderRadius: '6px',
                  boxShadow: '0 14px 40px rgba(0,0,0,0.08)',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 16px 44px rgba(0,0,0,0.10)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 14px 40px rgba(0,0,0,0.08)'; }}
              >
                <span className="text-[10px] font-black tracking-[0.2em] uppercase opacity-30" style={{ color: TEAL }}>
                  Track {String(track.id).padStart(2, '0')}
                </span>

                <h3 className="text-xl font-bold mt-3 mb-4 leading-snug" style={{ color: DARK }}>
                  {track.name}
                </h3>

                <div className="space-y-2 mb-8">
                  {track.topics.slice(0, 2).map((t, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <div className="w-1 h-1 rounded-full" style={{ background: TEAL }} />
                      {typeof t === 'object' ? t.name : t}
                    </div>
                  ))}
                </div>

                {/* No arrow icon */}
                <Link
                  to={`/tracks/${track.id}`}
                  className="inline-block text-[11px] font-black uppercase tracking-widest transition-all"
                  style={{ color: TEAL }}
                >
                  Learn More
                </Link>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}