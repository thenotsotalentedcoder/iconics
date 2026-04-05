import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/layout/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import PageBackground from '../components/animations/PageBackground';
import { workshops } from '../data/workshops';

/* ─── 1. MATH-DRIVEN KINEMATIC NETWORK ────────────────────────── */
const NeuralNetworkBG = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationFrameId;

    const settings = {
      count: 90,
      radius: 1.5,
      maxDist: 150,
      mouseRadius: 160,
      tealPrimary: '#5AA8A3',
    };

    const mouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < settings.mouseRadius) {
          const force = (settings.mouseRadius - dist) / settings.mouseRadius;
          this.x -= dx * force * 0.03;
          this.y -= dy * force * 0.03;
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, settings.radius, 0, Math.PI * 2);
        ctx.fillStyle = settings.tealPrimary;
        ctx.fill();
      }
    }

    const init = () => {
      particles = Array.from({ length: settings.count }, () => new Particle());
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < settings.maxDist) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(90, 168, 163, ${1 - dist / settings.maxDist})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });

    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 bg-transparent" />;
};

const SessionItem = ({ session, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0);

  return (
    <div className={`border rounded-2xl mb-4 transition-all duration-300 ${isOpen ? 'bg-white border-[#5AA8A3]/40 shadow-lg' : 'bg-gray-50/50 border-gray-100'}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-[#5AA8A3] tracking-widest uppercase">Mdl {index + 1}</span>
          <h4 className="text-gray-900 font-bold text-lg">{session.title}</h4>
        </div>
        <div className={`transform transition-transform ${isOpen ? 'rotate-180 text-[#5AA8A3]' : 'text-gray-400'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="px-6 pb-6 pt-2 border-t border-gray-50">
              <div className="flex items-center gap-4 mb-6 mt-4">
                <img src={session.instructor.photo} alt="lead" className="w-10 h-10 rounded-full object-cover border border-[#5AA8A3]/30" />
                <div>
                  <p className="text-gray-900 font-bold text-xs">{session.instructor.name}</p>
                  <p className="text-[#5AA8A3] text-[10px] font-bold uppercase">{session.instructor.institution}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {session.topics.map((t, i) => (
                  <div key={i} className="text-xs text-gray-500 flex items-center gap-2">
                    <div className="w-1 h-1 bg-[#5AA8A3] rounded-full" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Workshops() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div
        className="relative min-h-screen pt-32 pb-24 overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #EEF6F5 0%, #F4FAFA 40%, #E8F3F2 100%)' }}
      >
        <NeuralNetworkBG />
        <PageBackground />

        <div className="container mx-auto px-6 relative z-10 max-w-6xl">
          <header className="mb-20">
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mb-4 inline-block bg-[#5AA8A3]/10 px-3 py-1 rounded border border-[#5AA8A3]/20">
              <span className="text-[#5AA8A3] text-[9px] font-black uppercase tracking-[0.3em]">Curriculum 2026</span>
            </motion.div>
            <SectionHeading title="Workshops" subtitle="Hands-on mastery of the next generation of computing." className="!text-left !text-gray-900" />
          </header>

          <div className="space-y-20">
            {workshops.map((w) => (
              <motion.section
                key={w.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white/90 backdrop-blur-md p-8 lg:p-12 rounded-[3rem] border border-gray-100 shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-12">
                  <div className="flex-1">
                    <h2 className="text-4xl font-extrabold text-gray-900 mb-4">{w.title}</h2>
                    <p className="text-[#3E8B87] font-bold text-xs uppercase tracking-widest mb-6">{w.tagline}</p>
                    <p className="text-gray-500 leading-relaxed max-w-2xl">{w.description}</p>
                  </div>
                  <button
                    onClick={() => navigate('/registration')}
                    className="px-10 py-4 bg-[#5AA8A3] text-white font-black rounded-full text-[10px] uppercase tracking-widest hover:bg-[#3E8B87] transition-all"
                  >
                    Register Spot
                  </button>
                </div>

                <div className="grid lg:grid-cols-[0.4fr_1.1fr] gap-12">
                  <div>
                    <h3 className="text-gray-900 font-black text-sm uppercase mb-6 tracking-tighter italic underline decoration-[#5AA8A3]">Expected_Outcomes</h3>
                    <div className="space-y-4">
                      {w.learningOutcomes?.map((o, i) => (
                        <div key={i} className="flex gap-4">
                          <span className="text-[#5AA8A3] font-bold text-lg opacity-30 italic">0{i + 1}</span>
                          <p className="text-xs text-gray-500 leading-tight">{o}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-900 font-black text-sm uppercase mb-6 tracking-tighter">Sessions</h3>
                    {w.sessions.map((s, idx) => <SessionItem key={idx} session={s} index={idx} />)}
                  </div>
                </div>
              </motion.section>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}