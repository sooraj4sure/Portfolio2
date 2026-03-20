// import React from 'react';
// import { Coffee, Zap, SunSnow  } from 'lucide-react';

// const AboutSection = () => (
//   <section className="min-h-screen flex items-center py-20">
//     <div className="max-w-7xl mx-auto px-6">
//       <div className="text-center mb-16">
//         <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
//           About Me
//         </h2>
//         <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-12 items-center">
//         <div className="space-y-6">
//           <div className="text-6xl text-center mb-8">🚀</div>
//           <h3 className="text-3xl font-bold text-white mb-4">My Story</h3>
//           <p className="text-white/80 text-lg leading-relaxed">
//             Started coding at 19 with a simple "Hello World" that sparked an obsession. Fast-forward to today, I'm a full-stack developer who believes great design and clean code can change the world, one pixel at a time.
//           </p>
//           <p className="text-white/80 text-lg leading-relaxed">
//             When I'm not crafting digital experiences, you'll find me exploring new design trends, contributing to open source, or probably overthinking the perfect gradient combination. ✨
//           </p>

//           <div className="flex flex-wrap gap-4 pt-6">
//             <div className="flex items-center text-purple-400">
//               <Coffee size={20} className="mr-2" />
//               Coffee Addict
//             </div>
//             <div className="flex items-center text-green-200">
//               <SunSnow size={20} className="mr-2" />
//               Web-Weaver
//             </div>
//             <div className="flex items-center text-cyan-400">
//               <Zap size={20} className="mr-2" />
//               Problem Solver
//             </div>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
//             <h4 className="text-2xl font-bold text-white mb-6">Quick Facts</h4>
//             <div className="space-y-4">
//               <div className="flex justify-between items-center">
//                 <span className="text-white/70">Location</span>
//                 <span className="text-white font-semibold">Delhi, India</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-white/70">Experience</span>
//                 <span className="text-white font-semibold">Fresher</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-white/70">Favorite Stack</span>
//                 <span className="text-white font-semibold">MERN</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-white/70">Superpower</span>
//                 <span className="text-white font-semibold">React Wizardry</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </section>
// );

// export default AboutSection;



import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Coffee, Zap, SunSnow, Brain, BarChart2, Cpu, MapPin, Briefcase, Code2, Sparkles } from "lucide-react";

/* ── reused helpers (inline so this file is self-contained) ── */
const Halftone = ({ opacity = 0.03, size = 8 }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)",
      backgroundSize: `${size}px ${size}px`,
      opacity,
    }}
  />
);

const SpeedLines = ({ count = 22, opacity = 0.05 }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" style={{ opacity }}>
    {Array.from({ length: count }).map((_, i) => {
      const a = (i / count) * 360, r = (a * Math.PI) / 180;
      return <line key={i} x1="200" y1="200" x2={200 + 280 * Math.cos(r)} y2={200 + 280 * Math.sin(r)} stroke="white" strokeWidth="0.7" />;
    })}
  </svg>
);

/* ── stat bar ── */
const StatBar = ({ label, value, color, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-white/55 text-[11px] tracking-wider uppercase" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{label}</span>
        <span className="text-yellow-400/80 text-[11px]" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{value}%</span>
      </div>
      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${value}%` } : {}}
          transition={{ duration: 1.1, delay, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  );
};

/* ── trait badge ── */
const TraitBadge = ({ icon: Icon, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.6, y: 20 }}
    whileInView={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.1, y: -4 }}
    className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-black/40 backdrop-blur-sm cursor-default"
    style={{ borderColor: `${color}40` }}
  >
    <Icon size={16} style={{ color }} />
    <span className="text-white/70 text-sm" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{label}</span>
  </motion.div>
);

/* ── quick fact row ── */
const FactRow = ({ icon: Icon, label, value, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
    viewport={{ once: true }}
    className="group flex justify-between items-center py-3 border-b border-white/8 last:border-0"
  >
    <div className="flex items-center gap-2">
      <Icon size={13} className="text-yellow-400/60" />
      <span className="text-white/45 text-[11px] tracking-wider uppercase" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{label}</span>
    </div>
    <span
      className="text-white/85 text-sm group-hover:text-yellow-300 transition-colors duration-300"
      style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: "0.06em" }}
    >{value}</span>
  </motion.div>
);

/* ── domain pill ── */
const DomainPill = ({ label, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.45 }}
    viewport={{ once: true }}
    whileHover={{ scale: 1.07, y: -3 }}
    className="flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs"
    style={{
      borderColor: `${color}35`,
      background: `${color}12`,
      color,
      fontFamily: "'Share Tech Mono',monospace",
    }}
  >
    <Icon size={11} />{label}
  </motion.div>
);

/* ══════════════════════════════
   MAIN
══════════════════════════════ */
const AboutSection = () => {
  const [hov, setHov] = useState(false);

  const skills = [
    { label: "Python / Data Science", value: 82, color: "linear-gradient(90deg,#f59e0b,#fbbf24)", delay: 0.1 },
    { label: "Machine Learning / AI",  value: 75, color: "linear-gradient(90deg,#dc2626,#f87171)", delay: 0.2 },
    { label: "React / Full-Stack",      value: 88, color: "linear-gradient(90deg,#0ea5e9,#38bdf8)", delay: 0.3 },
    { label: "SQL / Databases",         value: 70, color: "linear-gradient(90deg,#8b5cf6,#a78bfa)", delay: 0.4 },
    { label: "Data Visualization",      value: 78, color: "linear-gradient(90deg,#10b981,#34d399)", delay: 0.5 },
  ];

  const facts = [
    { icon: MapPin,    label: "Location",      value: "Delhi, India",           delay: 0.1 },
    { icon: Briefcase, label: "Status",         value: "Fresher — Ready to Ship",delay: 0.2 },
    { icon: Code2,     label: "Fav Stack",      value: "MERN + Python",          delay: 0.3 },
    { icon: Sparkles,  label: "Superpower",     value: "Data → Insight → Code",  delay: 0.4 },
  ];

  const traits = [
    { icon: Coffee,    label: "Coffee Addict",  color: "#f59e0b", delay: 0.1 },
    { icon: SunSnow,   label: "Web-Weaver",     color: "#38bdf8", delay: 0.2 },
    { icon: Zap,       label: "Problem Solver", color: "#a78bfa", delay: 0.3 },
    { icon: Brain,     label: "ML Thinker",     color: "#f87171", delay: 0.4 },
    { icon: BarChart2, label: "Data Nerd",       color: "#34d399", delay: 0.5 },
    { icon: Cpu,       label: "AI Explorer",    color: "#fb923c", delay: 0.6 },
  ];

  const domains = [
    { label: "Data Science",  icon: BarChart2, color: "#f59e0b" },
    { label: "Machine Learning", icon: Brain,  color: "#f87171" },
    { label: "AI / LLMs",     icon: Cpu,       color: "#a78bfa" },
    { label: "Full-Stack",    icon: Code2,     color: "#38bdf8" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Oswald:wght@400;700&family=Share+Tech+Mono&display=swap');
        @keyframes shimmer {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%)  skewX(-15deg); }
        }
        .shimmer-sweep::after {
          content:'';
          position:absolute;
          inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);
          animation: shimmer 3.5s linear infinite;
        }
      `}</style>

      <section className="min-h-screen flex items-center py-24 relative overflow-hidden">
        <Halftone opacity={0.022} size={9} />

        {/* diagonal slash bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg,transparent 55%,rgba(245,197,24,0.02) 55%,rgba(245,197,24,0.02) 58%,transparent 58%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 50% at 30% 50%,rgba(220,38,38,0.04) 0%,transparent 70%)" }}
        />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10">

          {/* ── CHAPTER HEADER ── */}
          <motion.div
            className="text-center mb-16 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <span
              className="absolute inset-0 flex items-center justify-center text-[11rem] font-black text-white/[0.018] select-none pointer-events-none leading-none"
              style={{ fontFamily: "'Bangers',cursive" }}
            >03</span>

            <p className="text-yellow-400/40 tracking-[0.45em] text-[10px] uppercase mb-2" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              ── Chapter 03 ──
            </p>
            <h2
              className="text-6xl md:text-7xl text-white leading-none mb-2"
              style={{
                fontFamily: "'Bangers',cursive",
                letterSpacing: "0.06em",
                textShadow: "3px 3px 0 #7f1d1d, 7px 7px 24px rgba(220,38,38,0.25)",
              }}
            >About Captain</h2>
            <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              Navigator · Scientist · Developer
            </p>
            <motion.div
              className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "55%" }}
              transition={{ duration: 0.9, delay: 0.35 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* ── MAIN GRID ── */}
          <div className="grid md:grid-cols-2 gap-10 items-start">

            {/* LEFT — story + traits */}
            <div className="space-y-8">

              {/* story card */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 backdrop-blur-sm p-8"
                style={{
                  boxShadow: hov
                    ? "0 20px 55px rgba(0,0,0,0.6), 0 0 0 1px rgba(245,197,24,0.18), inset 0 0 35px rgba(0,0,0,0.45)"
                    : "0 4px 24px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.45)",
                  transition: "box-shadow 0.4s ease",
                }}
              >
                <SpeedLines count={18} opacity={hov ? 0.06 : 0.02} />
                <Halftone opacity={0.035} size={6} />

                {/* arc tag */}
                <div className="flex items-center gap-2 mb-5 relative z-10">
                  <span
                    className="px-2 py-0.5 bg-red-700/60 text-red-200 text-[9px] rounded border border-red-500/25"
                    style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.09em" }}
                  >Origin Arc</span>
                  <span
                    className="px-2 py-0.5 bg-amber-500/15 text-amber-300 border border-amber-500/25 text-[9px] rounded"
                    style={{ fontFamily: "'Share Tech Mono',monospace" }}
                  >Flashback Chapter</span>
                </div>

                <motion.div
                  className="text-5xl mb-5 relative z-10"
                  animate={hov ? { scale: 1.25, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.45 }}
                >🚀</motion.div>

                <h3
                  className="text-2xl text-white mb-4 relative z-10"
                  style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.06em", textShadow: "2px 2px 0 rgba(127,29,29,0.7)" }}
                >My Story</h3>

                <p className="text-white/60 text-sm leading-relaxed mb-4 relative z-10">
                  Started coding at 19 with a simple{" "}
                  <span className="text-yellow-400/80 font-mono text-xs">"Hello World"</span>{" "}
                  that sparked an obsession. Fast-forward to today — I'm a
                  <span className="text-cyan-400/80"> Full-Stack Developer</span>,{" "}
                  <span className="text-amber-400/80">ML Engineer, Data Scientist</span>, and{" "}
                  <span className="text-violet-400/80"> AI Enthusiast</span> who believes
                  that data tells stories and clean code changes the world, one commit at a time.
                </p>
                <p className="text-white/55 text-sm leading-relaxed relative z-10">
                  When I'm not wrangling datasets or training models, you'll find me building
                  full-stack apps, exploring AI tools, or probably overthinking the perfect gradient. ✨
                </p>

                {/* domain pills */}
                <div className="flex flex-wrap gap-2 mt-5 relative z-10">
                  {domains.map((d, i) => (
                    <DomainPill key={i} {...d} delay={0.05 * i} />
                  ))}
                </div>

                {/* hover glow */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at center,rgba(245,197,24,0.05) 0%,transparent 70%)" }}
                  animate={{ opacity: hov ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>

              {/* trait badges */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <p className="text-white/25 text-[10px] tracking-[0.35em] uppercase mb-4" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
                  ── Personality Traits ──
                </p>
                <div className="flex flex-wrap gap-3">
                  {traits.map((t, i) => <TraitBadge key={i} {...t} />)}
                </div>
              </motion.div>
            </div>

            {/* RIGHT — facts + skills */}
            <div className="space-y-8">

              {/* quick facts */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 backdrop-blur-sm p-7"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.45)" }}
              >
                <Halftone opacity={0.03} size={7} />

                {/* wanted-style header */}
                <div className="relative z-10 mb-1">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/40 to-transparent" />
                    <span
                      className="text-yellow-400 tracking-[0.3em] text-xs"
                      style={{ fontFamily: "'Bangers',cursive", fontSize: "1rem" }}
                    >BOUNTY FILE</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-yellow-400/40 to-transparent" />
                  </div>

                  {facts.map((f, i) => <FactRow key={i} {...f} />)}
                </div>

                {/* corner marks */}
                {["top-2 left-2 border-t border-l","top-2 right-2 border-t border-r","bottom-2 left-2 border-b border-l","bottom-2 right-2 border-b border-r"].map((cls, i) => (
                  <div key={i} className={`absolute w-4 h-4 ${cls} border-yellow-400/30`} />
                ))}
              </motion.div>

              {/* skill bars */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 backdrop-blur-sm p-7"
                style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.45)" }}
              >
                <Halftone opacity={0.03} size={7} />

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-red-500/40 to-transparent" />
                    <span
                      className="text-red-400 tracking-[0.3em] text-xs"
                      style={{ fontFamily: "'Bangers',cursive", fontSize: "1rem" }}
                    >POWER LEVELS</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-red-500/40 to-transparent" />
                  </div>

                  <div className="space-y-4">
                    {skills.map((s, i) => <StatBar key={i} {...s} />)}
                  </div>
                </div>

                {/* corner marks */}
                {["top-2 left-2 border-t border-l","top-2 right-2 border-t border-r","bottom-2 left-2 border-b border-l","bottom-2 right-2 border-b border-r"].map((cls, i) => (
                  <div key={i} className={`absolute w-4 h-4 ${cls} border-red-500/25`} />
                ))}
              </motion.div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;