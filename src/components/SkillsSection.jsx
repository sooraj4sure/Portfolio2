import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ══════════════════════════════════════════════
   SHARED HELPERS
══════════════════════════════════════════════ */
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

const SpeedLines = ({ count = 18, opacity = 0.04 }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" style={{ opacity }}>
    {Array.from({ length: count }).map((_, i) => {
      const a = (i / count) * 360, r = (a * Math.PI) / 180;
      return <line key={i} x1="200" y1="200" x2={200 + 280 * Math.cos(r)} y2={200 + 280 * Math.sin(r)} stroke="white" strokeWidth="0.7" />;
    })}
  </svg>
);

/* ══════════════════════════════════════════════
   SKILL DATA — grouped by category
══════════════════════════════════════════════ */
const skillGroups = [
  {
    id: "frontend",
    label: "Front-End",
    arc: "East Blue Arc",
    color: "#38bdf8",
    glow: "rgba(56,189,248,0.15)",
    border: "border-cyan-500/25",
    grad: "from-cyan-900/40 to-blue-900/30",
    skills: [
      { name: "React",            icon: "⚛️" },
      { name: "JavaScript",       icon: "📜" },
      { name: "HTML",             icon: "📄" },
      { name: "CSS",              icon: "🎨" },
      { name: "Tailwind",         icon: "🍃" },
      { name: "Bootstrap",        icon: "🅱️" },
      { name: "Material UI",      icon: "🧩" },
      { name: "Responsive Design",icon: "📱" },
      { name: "UI/UX Design",     icon: "🎭" },
    ],
  },
  {
    id: "backend",
    label: "Back-End & DB",
    arc: "Alabasta Arc",
    color: "#34d399",
    glow: "rgba(52,211,153,0.15)",
    border: "border-emerald-500/25",
    grad: "from-emerald-900/40 to-teal-900/30",
    skills: [
      { name: "Node.js",          icon: "🟢" },
      { name: "Express.js",       icon: "🕸️" },
      { name: "MongoDB",          icon: "🌿" },
      { name: "MySQL",            icon: "🐬" },
      { name: "REST API",         icon: "🔌" },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    arc: "Skypiea Arc",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    border: "border-amber-500/25",
    grad: "from-amber-900/40 to-yellow-900/30",
    skills: [
      { name: "Python",           icon: "🐍" },
      { name: "JavaScript",       icon: "📜" },
      { name: "Java",             icon: "☕" },
      { name: "C",                icon: "🔵" },
      { name: "C++",              icon: "🔷" },
    ],
  },
  {
    id: "datascience",
    label: "Data Science & ML",
    arc: "Water 7 Arc",
    color: "#f87171",
    glow: "rgba(248,113,113,0.15)",
    border: "border-rose-500/25",
    grad: "from-rose-900/40 to-pink-900/30",
    skills: [
      { name: "NumPy",            icon: "🔢" },
      { name: "Pandas",           icon: "🐼" },
      { name: "Matplotlib",       icon: "📊" },
      { name: "Seaborn",          icon: "🌊" },
      { name: "Plotly",           icon: "📈" },
      { name: "Scikit-learn",     icon: "🤖" },
      { name: "Jupyter Notebook", icon: "📓" },
      { name: "Jupyter Lab",      icon: "🧪" },
      { name: "EDA",              icon: "🔍" },
    ],
  },
  {
    id: "ai",
    label: "AI & APIs",
    arc: "Enies Lobby Arc",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.15)",
    border: "border-violet-500/25",
    grad: "from-violet-900/40 to-purple-900/30",
    skills: [
      { name: "Groq API",         icon: "⚡" },
      { name: "HuggingFace",      icon: "🤗" },
      { name: "OpenAI API",       icon: "🧠" },
      { name: "LLMs",             icon: "💬" },
      { name: "NLP",              icon: "📝" },
    ],
  },
  {
    id: "tools",
    label: "Tools & Misc",
    arc: "Marineford Arc",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.15)",
    border: "border-slate-500/25",
    grad: "from-slate-900/40 to-gray-900/30",
    skills: [
      { name: "Git",              icon: "🌐" },
      { name: "GitHub",           icon: "🐙" },
      { name: "WebRTC",           icon: "📹" },
      { name: "Socket.IO",        icon: "🔄" },
      { name: "Firebase",         icon: "🔥" },
      { name: "Three.js",         icon: "💫" },
    ],
  },
];

/* ══════════════════════════════════════════════
   SKILL PILL
══════════════════════════════════════════════ */
const SkillPill = ({ skill, color, delay }) => {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.1, y: -4 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative flex items-center gap-2 px-3 py-2 rounded-lg border bg-black/40 backdrop-blur-sm cursor-default transition-all duration-300"
      style={{
        borderColor: hov ? `${color}60` : `${color}20`,
        boxShadow: hov ? `0 0 14px ${color}25, inset 0 0 10px ${color}08` : "none",
      }}
    >
      <span className="text-lg leading-none">{skill.icon}</span>
      <span
        className="text-white/70 text-[11px] whitespace-nowrap"
        style={{ fontFamily: "'Share Tech Mono',monospace", color: hov ? color : undefined, transition: "color 0.2s" }}
      >{skill.name}</span>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   SKILL GROUP CARD
══════════════════════════════════════════════ */
const SkillGroupCard = ({ group, cardIndex }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: cardIndex * 0.08, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${group.grad} border border-white/10 group-hover:${group.border} transition-all duration-500 p-6 h-full`}
        style={{
          boxShadow: hov
            ? `0 20px 55px rgba(0,0,0,0.65), 0 0 0 1px ${group.color}25, inset 0 0 35px rgba(0,0,0,0.45)`
            : "0 4px 20px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.45)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <SpeedLines count={14} opacity={hov ? 0.06 : 0.02} />
        <Halftone opacity={0.03} />

        {/* arc + category badges */}
        <div className="flex items-center gap-2 mb-5 relative z-10 flex-wrap">
          <span
            className="px-2 py-0.5 bg-red-700/55 text-red-200 text-[9px] rounded border border-red-500/25"
            style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.09em" }}
          >{group.arc}</span>
          <span
            className="px-2 py-0.5 rounded border text-[9px]"
            style={{
              fontFamily: "'Share Tech Mono',monospace",
              background: `${group.color}15`,
              color: group.color,
              borderColor: `${group.color}30`,
            }}
          >{group.skills.length} abilities</span>
        </div>

        {/* category name */}
        <h3
          className="text-2xl text-white mb-5 relative z-10 transition-colors duration-300"
          style={{
            fontFamily: "'Bangers',cursive",
            letterSpacing: "0.07em",
            color: hov ? group.color : "white",
            textShadow: hov ? `2px 2px 0 rgba(0,0,0,0.6), 0 0 20px ${group.color}40` : "2px 2px 0 rgba(127,29,29,0.5)",
          }}
        >{group.label}</h3>

        {/* skill pills */}
        <div className="flex flex-wrap gap-2 relative z-10">
          {group.skills.map((skill, i) => (
            <SkillPill
              key={skill.name}
              skill={skill}
              color={group.color}
              delay={i * 0.04}
            />
          ))}
        </div>

        {/* hover inner glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center,${group.glow} 0%,transparent 70%)` }}
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* corner marks */}
        {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((cls, i) => (
          <div key={i} className={`absolute w-3 h-3 ${cls}`} style={{ borderColor: `${group.color}30` }} />
        ))}
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   STAT COUNTER
══════════════════════════════════════════════ */
const StatCount = ({ value, label, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <p
      className="text-3xl font-black"
      style={{ fontFamily: "'Bangers',cursive", color, letterSpacing: "0.04em", textShadow: `0 0 20px ${color}40` }}
    >{value}</p>
    <p className="text-white/35 text-[10px] tracking-wider uppercase mt-0.5" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{label}</p>
  </motion.div>
);

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
const SkillsSection = () => {
  const totalSkills = skillGroups.reduce((acc, g) => acc + g.skills.length, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Oswald:wght@400;700&family=Share+Tech+Mono&display=swap');
      `}</style>

      <section className="min-h-screen py-24 relative overflow-hidden">
        <Halftone opacity={0.02} size={9} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,transparent,rgba(220,38,38,0.03) 45%,transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg,transparent 55%,rgba(167,139,250,0.015) 55%,rgba(167,139,250,0.015) 58%,transparent 58%)" }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* ── CHAPTER HEADER ── */}
          <motion.div
            className="text-center mb-14 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            <span
              className="absolute inset-0 flex items-center justify-center text-[11rem] font-black text-white/[0.018] select-none pointer-events-none leading-none"
              style={{ fontFamily: "'Bangers',cursive" }}
            >06</span>

            <p className="text-yellow-400/40 tracking-[0.45em] text-[10px] uppercase mb-2"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>── Chapter 06 ──</p>
            <h2
              className="text-6xl md:text-7xl text-white leading-none mb-2"
              style={{
                fontFamily: "'Bangers',cursive",
                letterSpacing: "0.06em",
                textShadow: "3px 3px 0 #7f1d1d, 7px 7px 24px rgba(220,38,38,0.25)",
              }}
            >Devil Fruit Powers</h2>
            <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              Skills & Expertise — Web · Data · ML · AI
            </p>
            <motion.div
              className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "55%" }}
              transition={{ duration: 0.9, delay: 0.35 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* ── STATS ── */}
          <motion.div
            className="flex justify-center gap-10 mb-14 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <StatCount value={`${totalSkills}+`}           label="Total Skills"        color="#f5c518" delay={0.1} />
            <StatCount value={`${skillGroups.length}`}     label="Domains"             color="#38bdf8" delay={0.2} />
            <StatCount value="9+"                          label="DS / ML Tools"       color="#f87171" delay={0.3} />
            <StatCount value="5+"                          label="AI / API Integrations" color="#a78bfa" delay={0.4} />
          </motion.div>

          {/* ── SKILL GROUP GRID ── */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group, i) => (
              <SkillGroupCard key={group.id} group={group} cardIndex={i} />
            ))}
          </div>

          {/* ── FOOTER NOTE ── */}
          <motion.p
            className="text-center text-white/18 text-[9px] mt-10 tracking-[0.35em] uppercase"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.8 }} viewport={{ once: true }}
            style={{ fontFamily: "'Share Tech Mono',monospace" }}
          >
            ── Always learning new Devil Fruits ──
          </motion.p>

        </div>
      </section>
    </>
  );
};

export default SkillsSection;