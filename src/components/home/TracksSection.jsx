import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tracks } from '../../data/tracks';

const TEAL = '#3E8B87';
const DARK = '#1A2E38';

// --- CLEAN NEURAL CANVAS ---
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
        // Faster, cleaner movement
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
      // Fewer points for a "cleaner" look
      particles = Array.from({ length: 40 }, () => new Point());
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.move();
        
        // Draw connection lines
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

        // Draw the node point
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
  // Triple the array to ensure the loop never shows a gap on wide screens
  const tickerItems = [...tracks, ...tracks, ...tracks];

  return (
    <section className="relative py-24 overflow-hidden bg-transparent">
      {/* Background stays inside the section but fills it */}
      <NeuralBg />

      <div className="container mx-auto px-6 mb-16 relative z-10">
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

      {/* The Self-Swiping Slider */}
      <div className="relative flex overflow-hidden group">
        <motion.div 
          className="flex gap-8 pr-8"
          animate={{ x: ["0%", "-33.33%"] }} // Adjust based on tripling the array
          transition={{ 
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35, // Speed control
              ease: "linear"
            }
          }}
          // Pauses on hover
          style={{ cursor: 'grab' }}
          whileHover={{ animationPlayState: 'paused' }}
        >
          {tickerItems.map((track, idx) => (
            <div 
              key={`${track.id}-${idx}`}
              className="flex-shrink-0 w-[300px] bg-white/80 backdrop-blur-sm border border-white/40 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 hover:shadow-2xl hover:bg-white hover:-translate-y-3"
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
                    {t}
                  </div>
                ))}
              </div>

              <Link 
                to={`/tracks/${track.id}`}
                className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest hover:gap-4 transition-all"
                style={{ color: TEAL }}
              >
                Learn More
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}