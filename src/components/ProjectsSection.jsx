import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Eye, Github, Zap, Brain, BarChart2, Cpu, Code2, Palette } from "lucide-react";

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

const SpeedLines = ({ count = 22, opacity = 0.05 }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" style={{ opacity }}>
    {Array.from({ length: count }).map((_, i) => {
      const a = (i / count) * 360, r = (a * Math.PI) / 180;
      return <line key={i} x1="200" y1="200" x2={200 + 280 * Math.cos(r)} y2={200 + 280 * Math.sin(r)} stroke="white" strokeWidth="0.7" />;
    })}
  </svg>
);

/* ══════════════════════════════════════════════
   CATEGORY → TYPE MAPPING
══════════════════════════════════════════════ */
const CATEGORY_META = {
  React:          { type: "web",    color: "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",      icon: <Code2 size={9} />,     arc: "East Blue"    },
  MERN:           { type: "web",    color: "bg-teal-500/15 text-teal-300 border-teal-500/25",       icon: <Zap size={9} />,       arc: "Alabasta"     },
  JavaScript:     { type: "web",    color: "bg-yellow-500/15 text-yellow-300 border-yellow-500/25", icon: <Zap size={9} />,       arc: "Marineford"   },
  "Data Science": { type: "data",   color: "bg-amber-500/15 text-amber-300 border-amber-500/25",    icon: <BarChart2 size={9} />, arc: "Water 7"      },
  "Machine Learning": { type: "ml", color: "bg-rose-500/15 text-rose-300 border-rose-500/25",       icon: <Cpu size={9} />,       arc: "Enies Lobby"  },
  Design:         { type: "design", color: "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25", icon: <Palette size={9} />, arc: "Skypiea"     },
  AI:             { type: "ai",     color: "bg-violet-500/15 text-violet-300 border-violet-500/25", icon: <Brain size={9} />,     arc: "Thriller Bark"},
};

const getFilterColor = (filter, selected) => {
  const active = filter === selected;
  const base = {
    all:            active ? "bg-yellow-400 text-black border-yellow-400"      : "bg-yellow-400/10 text-yellow-400/70 border-yellow-400/20 hover:bg-yellow-400/20",
    react:          active ? "bg-cyan-500 text-black border-cyan-500"          : "bg-cyan-500/10 text-cyan-400/70 border-cyan-500/20 hover:bg-cyan-500/20",
    javascript:     active ? "bg-yellow-500 text-black border-yellow-500"      : "bg-yellow-500/10 text-yellow-400/70 border-yellow-500/20 hover:bg-yellow-500/20",
    mern:           active ? "bg-teal-500 text-black border-teal-500"          : "bg-teal-500/10 text-teal-400/70 border-teal-500/20 hover:bg-teal-500/20",
    "data science": active ? "bg-amber-500 text-black border-amber-500"        : "bg-amber-500/10 text-amber-400/70 border-amber-500/20 hover:bg-amber-500/20",
    "machine learning": active ? "bg-rose-500 text-black border-rose-500"     : "bg-rose-500/10 text-rose-400/70 border-rose-500/20 hover:bg-rose-500/20",
    design:         active ? "bg-fuchsia-500 text-black border-fuchsia-500"    : "bg-fuchsia-500/10 text-fuchsia-400/70 border-fuchsia-500/20 hover:bg-fuchsia-500/20",
  };
  return base[filter.toLowerCase()] || (active ? "bg-white text-black border-white" : "bg-white/10 text-white/60 border-white/15 hover:bg-white/20");
};

/* ══════════════════════════════════════════════
   PROJECT DATA
══════════════════════════════════════════════ */
const projects = [
  { id:25, name:"Sketi",           description:"Painting generation using HuggingFace API",                                                                   tech:["React","Javascript"],                              category:"React",            image:"🖼️", grad:"from-emerald-900/50 to-green-900/30",   link:"https://sketi.onrender.com/",                                  code:"https://github.com/sooraj4sure/Sketi.git" },
  { id:20, name:"Anvi.",           description:"MERN jewellery shop — admin & customer portals",                                                               tech:["React","Node.js","MongoDB","Express"],             category:"MERN",             image:"💎", grad:"from-cyan-900/50 to-teal-900/30",       link:"https://anvi-frontend.vercel.app/",                            code:"https://github.com/sooraj4sure/anvi-frontend" },
  { id:26, name:"Sylvie",          description:"AI chatbot powered by Groq API with text support",                                                             tech:["React","Node.js","MongoDB","Express"],             category:"MERN",             image:"🤖", grad:"from-indigo-900/50 to-blue-900/30",     link:"https://sylvie-pink.vercel.app/",                              code:"" },
  { id:5,  name:"WeMeet",          description:"MERN stack real-time video calling app using Socket.IO and WebRTC",                                            tech:["React","Node.js","MongoDB","WebRTC","Socket.IO"],  category:"MERN",             image:"📹", grad:"from-blue-900/50 to-teal-900/30",       link:"https://we-meet-video-calling-app.vercel.app/",                code:"https://github.com/sooraj4sure/WeMeet-Video-calling-app-" },
  { id:14, name:"Portfolio v1",    description:"Personal portfolio showcasing projects and skills with responsive design",                                     tech:["React","CSS","JavaScript"],                        category:"React",            image:"🌐", grad:"from-sky-900/50 to-cyan-900/30",         link:"https://sooraj-khaki.vercel.app/",                             code:"https://github.com/sooraj4sure/Portfolio2" },
  { id:1,  name:"Joker",           description:"Fetches and displays random jokes from a public API with instant refresh",                                     tech:["HTML","CSS","JavaScript"],                         category:"JavaScript",       image:"🃏", grad:"from-yellow-900/50 to-orange-900/30",    link:"https://random-joke-generator-react-js.vercel.app/",           code:"https://github.com/sooraj4sure/Random-joke-generator-react.js-" },
  { id:3,  name:"Rock Paper Scissor", description:"Play against the computer with randomized logic and score tracking",                                        tech:["HTML","CSS","JavaScript"],                         category:"JavaScript",       image:"✊", grad:"from-pink-900/50 to-fuchsia-900/30",    link:"https://rock-paper-scissor-one-drab.vercel.app/",              code:"https://github.com/sooraj4sure/Rock-Paper-Scissor" },
  { id:97, name:"EDA in Banking",  description:"Exploratory data analysis on banking datasets — pivot tables, trend visualizations",                           tech:["Python","Pandas","NumPy","Matplotlib"],            category:"Data Science",     image:"📊", grad:"from-violet-900/50 to-purple-900/30",   link:"",                                                             code:"https://github.com/sooraj4sure/Banking-EDA-Python.git" },
  { id:99, name:"Loan Approval",   description:"ML classification model predicting loan approvals from financial indicators",                                  tech:["Python","Pandas","Scikit-learn","Seaborn"],        category:"Machine Learning", image:"💳", grad:"from-rose-900/50 to-pink-900/30",        link:"",                                                             code:"https://github.com/sooraj4sure/Loan-Approval-Prediction.git" },
  { id:98, name:"Churn Analysis",  description:"Banking churn pattern deep-dive to uncover key retention factors via EDA",                                    tech:["Python","Pandas","NumPy","Matplotlib"],            category:"Data Science",     image:"🏦", grad:"from-amber-900/50 to-yellow-900/30",    link:"",                                                             code:"https://github.com/sooraj4sure/Banking-Customer-Churn-Analysis.git" },
  { id:15, name:"Solar System",    description:"Interactive 3D solar system built with Three.js",                                                             tech:["Three.js","CSS","JavaScript"],                     category:"JavaScript",       image:"💫", grad:"from-slate-900/50 to-indigo-900/30",    link:"https://solar-system-three-silk.vercel.app/",                  code:"https://github.com/sooraj4sure/solar-system" },
  { id:4,  name:"Portfolio v2",    description:"Upgraded personal portfolio with responsive design",                                                           tech:["React","CSS","JavaScript"],                        category:"React",            image:"🌐", grad:"from-sky-900/50 to-blue-900/30",         link:"https://sooraj-khaki.vercel.app/",                             code:"https://github.com/sooraj4sure/My-Portfolio" },
  { id:2,  name:"Tic Tac Toe",     description:"Classic 2-player game with real-time win detection and clean UI",                                             tech:["HTML","CSS","JavaScript"],                         category:"JavaScript",       image:"❌", grad:"from-blue-900/50 to-indigo-900/30",      link:"https://tic-tac-toe-ten-phi-32.vercel.app/",                   code:"https://github.com/sooraj4sure/TicTacToe" },
  { id:6,  name:"Satvic Movement", description:"Responsive clone of the Satvic Movement's 21-Day Yoga Sadhana page",                                         tech:["HTML","CSS","JavaScript"],                         category:"Design",           image:"🧘", grad:"from-green-900/50 to-lime-900/30",       link:"https://satvic-movement-three.vercel.app/",                    code:"https://github.com/sooraj4sure/Satvic-Movement" },
  { id:7,  name:"Weather App",     description:"Dynamic weather app with real-time API data and responsive UI",                                               tech:["React","API","CSS"],                               category:"React",            image:"☁️", grad:"from-sky-900/50 to-blue-900/30",         link:"https://weather-mrriu5d1v-soorajs-projects-e8a2060f.vercel.app/", code:"https://github.com/sooraj4sure/Weather-App" },
  { id:8,  name:"SoftSell (UI)",   description:"Landing page for used software license marketplace with modern UI",                                           tech:["React","Tailwind"],                                category:"Design",           image:"💽", grad:"from-fuchsia-900/50 to-violet-900/30",  link:"https://softsell-7isf.vercel.app/",                            code:"https://github.com/sooraj4sure/Softsell" },
  { id:9,  name:"Student Dashboard", description:"React dashboard with Firebase auth and real-time student data",                                             tech:["React","Firebase"],                                category:"React",            image:"🎓", grad:"from-rose-900/50 to-amber-900/30",       link:"https://student-dashboard-yxxf.vercel.app/",                   code:"https://github.com/sooraj4sure/student-dashboard" },
  { id:10, name:"Spotify Clone",   description:"Spotify-inspired React landing page with sleek layout (desktop only)",                                        tech:["React","CSS"],                                     category:"Design",           image:"🎵", grad:"from-green-900/50 to-black/30",          link:"https://spotify-landing-page-gamma.vercel.app/",               code:"https://github.com/sooraj4sure/SpotifyLandingPage" },
  { id:11, name:"User Dashboard",  description:"Responsive user dashboard with authentication and real-time profile management",                              tech:["React","Firebase"],                                category:"React",            image:"👤", grad:"from-gray-900/50 to-blue-900/30",        link:"https://user-dashboard-nine-smoky.vercel.app/",                code:"https://github.com/sooraj4sure/UserDashboard-assignment-" },
  { id:12, name:"Employee Manager", description:"Full-stack dashboard for employee management with role-based access",                                        tech:["React","Node.js","MongoDB","Express"],             category:"MERN",             image:"👥", grad:"from-orange-900/50 to-yellow-900/30",   link:"https://employee-management-system-sigma-nine.vercel.app/",    code:"https://github.com/sooraj4sure/Employee-Management-System" },
  { id:13, name:"Heavenly Stays",  description:"MERN Airbnb-style platform for unique property rentals",                                                      tech:["React","Node.js","MongoDB","Express"],             category:"MERN",             image:"🏠", grad:"from-pink-900/50 to-rose-900/30",        link:"",                                                             code:"https://github.com/sooraj4sure/Havenly-Stays--MERN-project" },
];

const FILTERS = ["All", "React", "JavaScript", "MERN", "Data Science", "Machine Learning", "Design"];

/* ══════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════ */
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hov, setHov] = useState(false);
  const meta = CATEGORY_META[project.category] || CATEGORY_META["React"];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55, scale: 0.93 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: (index % 6) * 0.06, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative group"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.grad} border border-white/10 group-hover:border-yellow-400/35 transition-all duration-500 p-6 h-full flex flex-col`}
        style={{
          boxShadow: hov
            ? "0 20px 55px rgba(0,0,0,0.65), 0 0 0 1px rgba(245,197,24,0.15), inset 0 0 35px rgba(0,0,0,0.45)"
            : "0 4px 20px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.45)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <SpeedLines count={16} opacity={hov ? 0.06 : 0.02} />
        <Halftone opacity={0.03} />

        {/* top badges */}
        <div className="flex items-center gap-2 mb-4 relative z-10 flex-wrap">
          <span
            className="px-2 py-0.5 bg-red-700/55 text-red-200 text-[9px] rounded border border-red-500/25"
            style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.09em" }}
          >{meta.arc} Arc</span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] ${meta.color}`}
            style={{ fontFamily: "'Share Tech Mono',monospace" }}
          >{meta.icon}{project.category}</span>
        </div>

        {/* emoji */}
        <motion.div
          className="text-5xl mb-4 text-center relative z-10"
          animate={hov ? { scale: 1.3, rotate: [0, -6, 6, 0] } : { scale: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
        >{project.image}</motion.div>

        {/* name */}
        <h3
          className="text-xl text-white mb-2 relative z-10 group-hover:text-yellow-300 transition-colors duration-300"
          style={{
            fontFamily: "'Bangers',cursive",
            letterSpacing: "0.06em",
            textShadow: hov ? "2px 2px 0 rgba(160,40,5,0.7)" : "none",
          }}
        >{project.name}</h3>

        <p className="text-white/55 text-sm leading-relaxed mb-4 relative z-10 flex-1">{project.description}</p>

        {/* tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
          {project.tech.map((t, i) => (
            <span key={i} className="px-2 py-0.5 bg-white/7 text-white/55 rounded text-[10px] border border-white/10"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>{t}</span>
          ))}
        </div>

        {/* links */}
        <div className="flex gap-2 relative z-10">
          {project.link && (
            <motion.a
              href={project.link} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.94 }}
              onClick={e => e.stopPropagation()}
              className="relative overflow-hidden flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/15 text-yellow-300 rounded-lg border border-yellow-400/20 hover:bg-yellow-400/25 transition-all text-xs"
              style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: "0.08em" }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                initial={{ x: "-100%" }}
                animate={hov ? { x: "200%" } : { x: "-100%" }}
                transition={{ duration: 0.6, ease: "linear" }}
              />
              <Eye size={12} /> LIVE
            </motion.a>
          )}
          {project.code && (
            <motion.a
              href={project.code} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.07 }} whileTap={{ scale: 0.94 }}
              onClick={e => e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/7 text-white/60 rounded-lg border border-white/10 hover:bg-white/14 transition-all text-xs"
              style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: "0.08em" }}
            >
              <Github size={12} /> CODE
            </motion.a>
          )}
        </div>

        {/* hover glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center,rgba(245,197,24,0.055) 0%,transparent 70%)" }}
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   FILTER BUTTON
══════════════════════════════════════════════ */
const FilterBtn = ({ label, selected, onClick, count }) => {
  const active = label.toLowerCase() === selected.toLowerCase();
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.07, y: -2 }}
      whileTap={{ scale: 0.94 }}
      className={`relative overflow-hidden flex items-center gap-2 px-4 py-2 rounded border text-[11px] capitalize transition-all duration-300 ${getFilterColor(label.toLowerCase(), selected.toLowerCase())}`}
      style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.12em", fontSize: "0.85rem" }}
    >
      {active && (
        <motion.div
          layoutId="filterActive"
          className="absolute inset-0 opacity-10 bg-white"
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
        />
      )}
      {label}
      <span
        className="text-[9px] opacity-60 ml-0.5"
        style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.65rem" }}
      >{count}</span>
    </motion.button>
  );
};

/* ══════════════════════════════════════════════
   COUNTER STAT
══════════════════════════════════════════════ */
const CounterStat = ({ value, label, color, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5 }}
      className="text-center"
    >
      <p className="text-3xl font-black" style={{ fontFamily: "'Bangers',cursive", color, letterSpacing: "0.04em", textShadow: `0 0 20px ${color}40` }}>{value}</p>
      <p className="text-white/35 text-[10px] tracking-wider uppercase mt-0.5" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{label}</p>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
const ProjectsSection = ({ selectedFilter, setSelectedFilter }) => {
  const filtered = selectedFilter === "all" || selectedFilter === "All"
    ? projects
    : projects.filter(p => p.category.toLowerCase() === selectedFilter.toLowerCase());

  const getCategoryCount = (cat) =>
    cat === "All" || cat === "all"
      ? projects.length
      : projects.filter(p => p.category.toLowerCase() === cat.toLowerCase()).length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Oswald:wght@400;700&family=Share+Tech+Mono&display=swap');
      `}</style>

      <section className="min-h-screen py-24 relative overflow-hidden">
        <Halftone opacity={0.02} size={9} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,transparent,rgba(220,38,38,0.03) 45%,transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg,transparent 55%,rgba(245,197,24,0.015) 55%,rgba(245,197,24,0.015) 58%,transparent 58%)" }} />

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
            >04</span>

            <p className="text-yellow-400/40 tracking-[0.45em] text-[10px] uppercase mb-2"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>── Chapter 04 ──</p>
            <h2
              className="text-6xl md:text-7xl text-white leading-none mb-2"
              style={{
                fontFamily: "'Bangers',cursive",
                letterSpacing: "0.06em",
                textShadow: "3px 3px 0 #7f1d1d, 7px 7px 24px rgba(220,38,38,0.25)",
              }}
            >The Armory</h2>
            <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              All Projects — Web · Data · ML · AI
            </p>
            <motion.div
              className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "55%" }}
              transition={{ duration: 0.9, delay: 0.35 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* ── STATS ROW ── */}
          <motion.div
            className="flex justify-center gap-10 mb-12 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <CounterStat value={`${projects.length}+`} label="Total Projects" color="#f5c518" delay={0.1} />
            <CounterStat value={`${projects.filter(p => p.category === "MERN" || p.category === "React").length}`} label="Web Projects" color="#38bdf8" delay={0.2} />
            <CounterStat value={`${projects.filter(p => p.category === "Data Science" || p.category === "Machine Learning").length}`} label="DS / ML" color="#f87171" delay={0.3} />
            <CounterStat value={`${projects.filter(p => p.link).length}`} label="Live Deployments" color="#34d399" delay={0.4} />
          </motion.div>

          {/* ── FILTER BAR ── */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {FILTERS.map(f => (
              <FilterBtn
                key={f}
                label={f}
                selected={selectedFilter}
                onClick={() => setSelectedFilter(f === "All" ? "all" : f)}
                count={getCategoryCount(f)}
              />
            ))}
          </motion.div>

          {/* ── PROJECT COUNT ── */}
          <motion.p
            className="text-center text-white/25 text-[10px] tracking-[0.3em] uppercase mb-8"
            style={{ fontFamily: "'Share Tech Mono',monospace" }}
            key={filtered.length}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Showing {filtered.length} mission{filtered.length !== 1 ? "s" : ""}
          </motion.p>

          {/* ── GRID ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedFilter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* ── EMPTY STATE ── */}
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div className="text-6xl mb-4">🏴‍☠️</div>
              <p className="text-yellow-400/60 text-2xl" style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.1em" }}>No missions found, Nakama!</p>
              <p className="text-white/30 text-sm mt-2" style={{ fontFamily: "'Share Tech Mono',monospace" }}>Try a different filter</p>
            </motion.div>
          )}

        </div>
      </section>
    </>
  );
};

export default ProjectsSection;