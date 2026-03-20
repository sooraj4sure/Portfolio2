

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { Mail, Eye, Github, X, ZoomIn, Zap, Brain, BarChart2, Cpu } from "lucide-react";
import devImg from "../assets/Luffy1.png";

/* ══════════════════════════════════════════════════════
   GLOBAL STYLES
══════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Oswald:wght@400;700&family=Share+Tech+Mono&display=swap');

    @keyframes floatUp {
      0%   { transform: translateY(0) rotate(0deg); opacity:0.5; }
      100% { transform: translateY(-110vh) rotate(540deg); opacity:0; }
    }
    @keyframes glitch1 {
      0%,89%,100% { clip-path:inset(0 0 100% 0); transform:translateX(0); }
      90% { clip-path:inset(20% 0 60% 0); transform:translateX(-5px); color:#f5c518; }
      93% { clip-path:inset(55% 0 25% 0); transform:translateX(5px); color:#f5c518; }
      96% { clip-path:inset(70% 0 10% 0); transform:translateX(-3px); color:#f5c518; }
    }
    @keyframes glitch2 {
      0%,89%,100% { clip-path:inset(0 0 100% 0); transform:translateX(0); }
      90% { clip-path:inset(50% 0 30% 0); transform:translateX(5px); color:#dc2626; }
      93% { clip-path:inset(15% 0 70% 0); transform:translateX(-5px); color:#dc2626; }
      96% { clip-path:inset(75% 0 5%  0); transform:translateX(3px); color:#dc2626; }
    }
    @keyframes scanline {
      0%   { top: -5%; }
      100% { top: 105%; }
    }
    @keyframes shockwave {
      0%   { transform:scale(0.3); opacity:0.9; }
      100% { transform:scale(4);   opacity:0; }
    }
    @keyframes bountyFlicker {
      0%,88%,100% { opacity:1; }
      90%  { opacity:0.3; }
      93%  { opacity:0.9; }
      96%  { opacity:0.2; }
    }
    @keyframes borderChase {
      0%   { background-position:0% 50%; }
      100% { background-position:200% 50%; }
    }
    @keyframes pulseGold {
      0%,100% { box-shadow:0 0 0 0 rgba(245,197,24,0.5); }
      50%      { box-shadow:0 0 0 14px rgba(245,197,24,0); }
    }
    @keyframes dataBlip {
      0%,100% { opacity:0.3; transform:scale(0.8); }
      50%      { opacity:1;   transform:scale(1.2); }
    }
    @keyframes inkReveal {
      0%   { clip-path:polygon(0 0,0 0,0 100%,0 100%); }
      100% { clip-path:polygon(0 0,100% 0,100% 100%,0 100%); }
    }
    @keyframes shimmer {
      0%   { transform:translateX(-120%) skewX(-15deg); }
      100% { transform:translateX(220%) skewX(-15deg); }
    }

    .glitch-wrap { position:relative; display:inline-block; }
    .glitch-wrap::before,
    .glitch-wrap::after {
      content: attr(data-text);
      position: absolute; inset:0;
      font:inherit; color:inherit;
    }
    .glitch-wrap::before { animation: glitch1 5s infinite linear; left:2px; }
    .glitch-wrap::after  { animation: glitch2 5s infinite linear; left:-2px; }

    .chase-border-anim {
      background: linear-gradient(90deg,#f5c518,#dc2626,#f5c518,#dc2626,#f5c518);
      background-size:300% 100%;
      animation: borderChase 2s linear infinite;
    }
    .bounty-flicker { animation: bountyFlicker 7s infinite; }
    .data-blip      { animation: dataBlip 1.8s ease-in-out infinite; }
    .pulse-gold     { animation: pulseGold 2.2s ease infinite; }
    .ink-reveal     { animation: inkReveal 0.7s cubic-bezier(.23,1,.32,1) forwards; }
    .shimmer-line {
      position:absolute; inset:0;
      background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);
      animation: shimmer 2.8s linear infinite;
    }
  `}</style>
);

/* ══════════════════════════════════════════════════════
   AMBIENT FLOATING PARTICLES
══════════════════════════════════════════════════════ */
const Particles = () => {
  const syms = ["⚓","🏴‍☠️","⚔️","★","◆","▲","∞","Σ","∂","λ","π","μ","⚡","🌊"];
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {Array.from({length:16}).map((_,i) => (
        <div
          key={i}
          className="absolute text-white/[0.04]"
          style={{
            left:`${(i*43+7)%100}%`,
            bottom:"-8%",
            fontSize:`${9+(i%4)*7}px`,
            animationName:"floatUp",
            animationDuration:`${11+(i%6)*3}s`,
            animationDelay:`${(i*1.5)%9}s`,
            animationTimingFunction:"linear",
            animationIterationCount:"infinite",
          }}
        >
          {syms[i%syms.length]}
        </div>
      ))}
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   SCANLINE
══════════════════════════════════════════════════════ */
const Scanline = () => (
  <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
    <div
      className="absolute left-0 right-0 h-10 opacity-[0.025]"
      style={{
        background:"linear-gradient(to bottom,transparent,rgba(255,255,255,0.6),transparent)",
        animation:"scanline 10s linear infinite",
      }}
    />
  </div>
);

/* ══════════════════════════════════════════════════════
   HALFTONE BG
══════════════════════════════════════════════════════ */
const Halftone = ({ opacity=0.03, size=8 }) => (
  <div
    className="absolute inset-0 pointer-events-none"
    style={{
      backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)",
      backgroundSize:`${size}px ${size}px`,
      opacity,
    }}
  />
);

/* ══════════════════════════════════════════════════════
   SPEED LINES
══════════════════════════════════════════════════════ */
const SpeedLines = ({ count=24, opacity=0.05 }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 400" style={{opacity}}>
    {Array.from({length:count}).map((_,i) => {
      const a=(i/count)*360, r=(a*Math.PI)/180;
      return <line key={i} x1="200" y1="200" x2={200+280*Math.cos(r)} y2={200+280*Math.sin(r)} stroke="white" strokeWidth="0.7"/>;
    })}
  </svg>
);

/* ══════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════ */
const domains = [
  { label:"Data Science",        icon:"📊", bounty:"420,000,000", gradient:"from-amber-700 to-yellow-600",  desc:"EDA · Visualization · Insights" },
  { label:"Machine Learning",    icon:"🧠", bounty:"680,000,000", gradient:"from-rose-800 to-red-600",      desc:"Regression · Classification · Models" },
  { label:"Artificial Intelligence", icon:"⚡", bounty:"890,000,000", gradient:"from-violet-800 to-purple-600", desc:"LLMs · NLP · Groq · HuggingFace" },
  { label:"Full-Stack Dev",      icon:"💻", bounty:"550,000,000", gradient:"from-cyan-800 to-blue-600",    desc:"MERN · REST · WebRTC · Socket.IO" },
];

const certificates = [
  { title:"Programming With Python",      issuer:"Harvard University",        date:"July 2025",     image:"/certificates/CS50P.png",           rank:"S" },
  { title:"Cybersecurity Skilling Program",issuer:"C3iHub IIT Kanpur",        date:"June 2023",     image:"/certificates/CyberIIT.jpg",        rank:"A" },
  { title:"3D Modelling by Autodesk",      issuer:"Cognizance'22 IIT Roorkee", date:"March 2022",   image:"/certificates/Autodesk.jpg",        rank:"A" },
  { title:"Software Engineering Virtual Experience", issuer:"HP x Forage",   date:"November 2022", image:"/certificates/hp.jpg",              rank:"B" },
  { title:"Google Workspace Administrator",issuer:"Google Cloud x Coursera", date:"March 2024",    image:"/certificates/GoogleWorkspace.jpg", rank:"A" },
  { title:"Machine Learning to Deep Learning",       issuer:"ISRO",          date:"July 2022",     image:"/certificates/ISRO-ML.jpg",         rank:"S" },
  { title:"Basics of Remote Sensing & GIS",          issuer:"ISRO",          date:"November 2022", image:"/certificates/RemoteSensing.jpg",   rank:"B" },
];

const featuredProjects = [
  { id:25, name:"Sketi",         desc:"Painting generation using HuggingFace API",                              tech:["React","Javascript"],                  image:"🖼️", grad:"from-emerald-900/50 to-green-900/30",  link:"https://sketi.onrender.com/",                                     code:"https://github.com/sooraj4sure/Sketi.git",                               arc:"East Blue",    type:"web"  },
  { id:20, name:"Anvi.",         desc:"MERN jewellery shop — admin & customer portals",                         tech:["React","Node.js","MongoDB","Express"],  image:"💎", grad:"from-cyan-900/50 to-teal-900/30",      link:"https://anvi-frontend.vercel.app/",                               code:"https://github.com/sooraj4sure/anvi-frontend",                           arc:"Alabasta",     type:"web"  },
  { id:26, name:"Sylvie",        desc:"AI chatbot powered by Groq API + text support",                          tech:["React","Node.js","Express","Groq"],     image:"🤖", grad:"from-indigo-900/50 to-blue-900/30",    link:"https://sylvie-pink.vercel.app/",                                 code:"",                                                                       arc:"Skypiea",      type:"ai"   },
  { id:97, name:"EDA in Banking",desc:"Exploratory data analysis on banking datasets — pivot tables & visuals", tech:["Python","Pandas","NumPy","Matplotlib"], image:"📊", grad:"from-violet-900/50 to-purple-900/30",  link:"",                                                                code:"https://github.com/sooraj4sure/Banking-EDA-Python.git",                  arc:"Water 7",      type:"data" },
  { id:99, name:"Loan Approval", desc:"ML model predicting loan approvals from financial indicators",            tech:["Python","Pandas","Scikit-learn","Seaborn"], image:"💳", grad:"from-rose-900/50 to-pink-900/30", link:"",                                                                code:"https://github.com/sooraj4sure/Loan-Approval-Prediction.git",            arc:"Enies Lobby",  type:"ml"   },
  { id:98, name:"Churn Analysis",desc:"Banking churn patterns — key retention factor discovery via EDA",        tech:["Python","Pandas","Matplotlib","EDA"],   image:"🏦", grad:"from-amber-900/50 to-yellow-900/30",  link:"",                                                                code:"https://github.com/sooraj4sure/Banking-Customer-Churn-Analysis.git",     arc:"Thriller Bark",type:"data" },
  { id:5,  name:"WeMeet",        desc:"Real-time video calling with WebRTC & Socket.IO",                        tech:["React","Node.js","WebRTC","Socket.IO"], image:"📹", grad:"from-blue-900/50 to-teal-900/30",     link:"https://we-meet-video-calling-app.vercel.app/",                   code:"https://github.com/sooraj4sure/WeMeet-Video-calling-app-",               arc:"Sabaody",      type:"web"  },
  { id:3,  name:"RPS Game",      desc:"Rock-Paper-Scissor vs computer with score tracking",                     tech:["HTML","CSS","JavaScript"],             image:"✊", grad:"from-fuchsia-900/50 to-pink-900/30",  link:"https://rock-paper-scissor-one-drab.vercel.app/",                 code:"https://github.com/sooraj4sure/Rock-Paper-Scissor",                      arc:"Marineford",   type:"web"  },
];

const TYPE_META = {
  web:  { label:"Web Dev",       color:"bg-cyan-500/15 text-cyan-300 border-cyan-500/25",    icon:<Zap size={9}/> },
  ai:   { label:"AI",            color:"bg-violet-500/15 text-violet-300 border-violet-500/25", icon:<Brain size={9}/> },
  data: { label:"Data Science",  color:"bg-amber-500/15 text-amber-300 border-amber-500/25",  icon:<BarChart2 size={9}/> },
  ml:   { label:"Machine Learning",color:"bg-rose-500/15 text-rose-300 border-rose-500/25",   icon:<Cpu size={9}/> },
};

const RANK_STYLE = {
  S:"bg-yellow-400 text-black shadow-yellow-400/60",
  A:"bg-red-600 text-white shadow-red-500/60",
  B:"bg-blue-600 text-white shadow-blue-500/60",
};

/* ══════════════════════════════════════════════════════
   CHAPTER HEADER
══════════════════════════════════════════════════════ */
const ChapterHeader = ({ ch, title, sub }) => (
  <motion.div
    className="text-center mb-14 relative"
    initial={{ opacity:0, y:50 }}
    whileInView={{ opacity:1, y:0 }}
    transition={{ duration:0.7, ease:[0.23,1,0.32,1] }}
    viewport={{ once:true }}
  >
    <span
      className="absolute inset-0 flex items-center justify-center text-[11rem] font-black text-white/[0.018] select-none pointer-events-none leading-none"
      style={{ fontFamily:"'Bangers',cursive" }}
    >{ch}</span>

    <p className="text-yellow-400/40 tracking-[0.45em] text-[10px] uppercase mb-2" style={{ fontFamily:"'Share Tech Mono',monospace" }}>
      ── Chapter {ch} ──
    </p>
    <h2
      className="text-6xl md:text-7xl text-white leading-none mb-2"
      style={{
        fontFamily:"'Bangers',cursive",
        letterSpacing:"0.06em",
        textShadow:"3px 3px 0 #7f1d1d, 7px 7px 24px rgba(220,38,38,0.25)",
      }}
    >{title}</h2>
    {sub && (
      <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{sub}</p>
    )}
    <motion.div
      className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent"
      initial={{ width:0 }}
      whileInView={{ width:"55%" }}
      transition={{ duration:0.9, delay:0.35 }}
      viewport={{ once:true }}
    />
  </motion.div>
);

/* ══════════════════════════════════════════════════════
   BOUNTY POSTER
══════════════════════════════════════════════════════ */
const BountyPoster = ({ domain, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, rotateY:-25, y:60 }}
      animate={inView ? { opacity:1, rotateY:0, y:0 } : {}}
      transition={{ duration:0.7, delay:index*0.13, ease:[0.23,1,0.32,1] }}
      whileHover={{ scale:1.07, rotateZ:1.8, y:-10 }}
      className="relative cursor-default"
      style={{ perspective:700 }}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
    >
      {/* glow */}
      <AnimatePresence>
        {hov && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="absolute -inset-1 rounded-sm blur-md bg-gradient-to-br from-yellow-400/30 to-red-500/20 pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div
        className="relative overflow-hidden rounded-sm border-2 border-yellow-400/50"
        style={{
          background:"linear-gradient(160deg,#1e1000,#120900)",
          boxShadow:"4px 4px 24px rgba(0,0,0,0.9), inset 0 0 40px rgba(0,0,0,0.6)",
        }}
      >
        <Halftone opacity={0.07} size={5} />

        {/* header */}
        <div className={`bg-gradient-to-r ${domain.gradient} py-1.5 text-center`}>
          <span className="text-black/80 text-xs tracking-[0.35em] font-black" style={{ fontFamily:"'Bangers',cursive" }}>WANTED</span>
        </div>

        {/* icon */}
        <div className="relative py-8 flex items-center justify-center overflow-hidden">
          <motion.span
            className="text-6xl drop-shadow-2xl"
            animate={hov ? { scale:1.3, rotate:[0,-8,8,0] } : { scale:1 }}
            transition={{ duration:0.5 }}
          >{domain.icon}</motion.span>

          {hov && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-20 h-20 rounded-full border-2 border-yellow-400/60" style={{ animation:"shockwave 0.5s ease-out" }} />
            </div>
          )}
        </div>

        {/* name */}
        <div className="px-3 pb-1 text-center">
          <h3
            className="text-yellow-400 leading-tight bounty-flicker"
            style={{ fontFamily:"'Bangers',cursive", fontSize:"1.15rem", letterSpacing:"0.06em", textShadow:"0 0 12px rgba(245,197,24,0.5)" }}
          >{domain.label}</h3>
          <p className="text-white/35 text-[9px] tracking-wider mt-0.5" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{domain.desc}</p>
        </div>

        {/* bounty */}
        <div className="mx-3 my-3 border-t border-yellow-400/15 pt-3 text-center">
          <p className="text-white/25 text-[8px] tracking-[0.3em] uppercase mb-0.5" style={{ fontFamily:"'Share Tech Mono',monospace" }}>Bounty</p>
          <p
            className="text-yellow-400 font-black"
            style={{ fontFamily:"'Bangers',cursive", fontSize:"1.05rem", letterSpacing:"0.04em", textShadow:"0 0 10px rgba(245,197,24,0.35)" }}
          >฿ {domain.bounty}</p>
        </div>

        {/* corner marks */}
        {["top-1 left-1 border-t-2 border-l-2 rounded-tl","top-1 right-1 border-t-2 border-r-2 rounded-tr","bottom-1 left-1 border-b-2 border-l-2 rounded-bl","bottom-1 right-1 border-b-2 border-r-2 rounded-br"].map((cls,i) => (
          <div key={i} className={`absolute w-3 h-3 ${cls} border-yellow-400/35`} />
        ))}
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════
   CERT CARD
══════════════════════════════════════════════════════ */
const CertCard = ({ cert, index, onOpen }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:45, rotateX:15 }}
      animate={inView ? { opacity:1, y:0, rotateX:0 } : {}}
      transition={{ duration:0.55, delay:index*0.08, ease:[0.23,1,0.32,1] }}
      whileHover={{ y:-10, scale:1.04 }}
      className="relative cursor-pointer group"
      style={{ perspective:600 }}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      onClick={()=>onOpen(cert)}
    >
      {/* animated border */}
      <AnimatePresence>
        {hov && (
          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="absolute -inset-0.5 rounded-xl pointer-events-none overflow-hidden z-10"
          >
            <div className="chase-border-anim absolute inset-0 rounded-xl" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/55" style={{ boxShadow:"inset 0 0 30px rgba(0,0,0,0.7)" }}>
        <Halftone opacity={0.04} size={6} />

        {/* rank */}
        <div
          className={`absolute top-2 right-2 z-20 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shadow-lg ${RANK_STYLE[cert.rank]}`}
          style={{ fontFamily:"'Bangers',cursive", fontSize:"0.85rem" }}
        >{cert.rank}</div>

        {/* image */}
        <div className="relative overflow-hidden h-40">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: hov ? 1 : 0 }}
          >
            <div className="w-10 h-10 rounded-full bg-yellow-400/20 border border-yellow-400/60 flex items-center justify-center backdrop-blur-sm">
              <ZoomIn size={16} className="text-yellow-400" />
            </div>
          </motion.div>
        </div>

        {/* info */}
        <div className="p-3 relative z-10">
          <h3
            className="text-white text-sm leading-snug mb-1 group-hover:text-yellow-300 transition-colors line-clamp-2"
            style={{ fontFamily:"'Bangers',cursive", letterSpacing:"0.04em", fontSize:"0.95rem" }}
          >{cert.title}</h3>
          <p className="text-yellow-400/65 text-[10px]" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{cert.issuer}</p>
          <p className="text-white/30 text-[10px] mt-0.5" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{cert.date}</p>
        </div>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════
   PROJECT CARD
══════════════════════════════════════════════════════ */
const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  const [hov, setHov] = useState(false);
  const tm = TYPE_META[project.type];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:55, scale:0.92 }}
      animate={inView ? { opacity:1, y:0, scale:1 } : {}}
      transition={{ duration:0.6, delay:index*0.07, ease:[0.23,1,0.32,1] }}
      whileHover={{ y:-9, scale:1.03 }}
      className="relative group"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${project.grad} border border-white/10 group-hover:border-yellow-400/35 transition-all duration-500 p-6`}
        style={{
          boxShadow: hov
            ? "0 22px 55px rgba(0,0,0,0.65), 0 0 0 1px rgba(245,197,24,0.18), inset 0 0 35px rgba(0,0,0,0.45)"
            : "0 4px 20px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.45)",
          transition:"box-shadow 0.4s ease",
        }}
      >
        <SpeedLines count={18} opacity={hov ? 0.07 : 0.025} />
        <Halftone opacity={0.035} />

        {/* top badges */}
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <span
            className="px-2 py-0.5 bg-red-700/60 text-red-200 text-[9px] rounded border border-red-500/25"
            style={{ fontFamily:"'Bangers',cursive", letterSpacing:"0.09em" }}
          >{project.arc} Arc</span>
          <span
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] ${tm.color}`}
            style={{ fontFamily:"'Share Tech Mono',monospace" }}
          >{tm.icon}{tm.label}</span>
        </div>

        {/* emoji */}
        <motion.div
          className="text-5xl mb-4 text-center relative z-10"
          animate={hov ? { scale:1.35, rotate:[0,-6,6,0] } : { scale:1, rotate:0 }}
          transition={{ duration:0.45 }}
        >{project.image}</motion.div>

        {/* name */}
        <h3
          className="text-[1.35rem] text-white mb-2 relative z-10 group-hover:text-yellow-300 transition-colors duration-300"
          style={{
            fontFamily:"'Bangers',cursive",
            letterSpacing:"0.06em",
            textShadow: hov ? "2px 2px 0 rgba(160,40,5,0.7)" : "none",
          }}
        >{project.name}</h3>

        <p className="text-white/58 text-sm leading-relaxed mb-4 relative z-10">{project.desc}</p>

        {/* tech */}
        <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
          {project.tech.map((t,i) => (
            <span key={i} className="px-2 py-0.5 bg-white/7 text-white/55 rounded text-[10px] border border-white/10" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{t}</span>
          ))}
        </div>

        {/* links */}
        <div className="flex gap-2 relative z-10">
          {project.link && (
            <motion.a href={project.link} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.08 }} whileTap={{ scale:0.94 }}
              onClick={e=>e.stopPropagation()}
              className="relative overflow-hidden flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/15 text-yellow-300 rounded-lg border border-yellow-400/20 hover:bg-yellow-400/25 transition-all text-xs"
              style={{ fontFamily:"'Oswald',sans-serif", letterSpacing:"0.08em" }}
            >
              <div className="shimmer-line" /><Eye size={12}/>LIVE
            </motion.a>
          )}
          {project.code && (
            <motion.a href={project.code} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.08 }} whileTap={{ scale:0.94 }}
              onClick={e=>e.stopPropagation()}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/7 text-white/60 rounded-lg border border-white/10 hover:bg-white/14 transition-all text-xs"
              style={{ fontFamily:"'Oswald',sans-serif", letterSpacing:"0.08em" }}
            >
              <Github size={12}/>CODE
            </motion.a>
          )}
        </div>

        {/* hover radial glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background:"radial-gradient(ellipse at center,rgba(245,197,24,0.06) 0%,transparent 70%)" }}
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration:0.3 }}
        />
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════
   CERT MODAL
══════════════════════════════════════════════════════ */
const CertModal = ({ cert, onClose }) => {
  useEffect(() => {
    const fn = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      onClick={onClose}
    >
      <motion.div className="absolute inset-0 bg-black/92 backdrop-blur-xl" initial={{ opacity:0 }} animate={{ opacity:1 }} />

      <motion.div
        initial={{ scale:0.45, opacity:0, rotateY:-30 }}
        animate={{ scale:1, opacity:1, rotateY:0 }}
        exit={{ scale:0.45, opacity:0, rotateY:30 }}
        transition={{ type:"spring", stiffness:270, damping:22 }}
        className="relative max-w-3xl w-full z-10"
        onClick={e=>e.stopPropagation()}
        style={{ perspective:900 }}
      >
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400 opacity-75 blur-sm" />
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400" />
        <div className="relative bg-black rounded-2xl overflow-hidden">
          <motion.button
            onClick={onClose}
            whileHover={{ scale:1.15, rotate:90 }}
            transition={{ duration:0.2 }}
            className="absolute top-3 right-3 z-20 w-9 h-9 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center"
          >
            <X size={14} className="text-white"/>
          </motion.button>
          <img src={cert.image} alt={cert.title} className="w-full max-h-[68vh] object-contain"/>
          <div className="p-5 text-center border-t border-yellow-400/20">
            <h3
              className="text-yellow-400 text-2xl mb-1"
              style={{ fontFamily:"'Bangers',cursive", letterSpacing:"0.08em", textShadow:"0 0 20px rgba(245,197,24,0.4)" }}
            >{cert.title}</h3>
            <p className="text-white/45 text-sm" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{cert.issuer} · {cert.date}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════ */
const HomeSection = ({ typewriterText }) => {
  const [selectedCert, setSelectedCert] = useState(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:heroRef, offset:["start start","end start"] });
  const heroY       = useTransform(scrollYProgress, [0,1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0,0.75], [1, 0]);

  const floatingTags = [
    { label:"Data Scientist",      delay:0.9  },
    { label:"ML Engineer",       delay:1.1  },
    { label:"AI Developer",      delay:1.3  },
    { label:"Full-Stack Dev",    delay:1.5  },
  ];

  return (
    <>
      <GlobalStyles />
      <Particles />
      <Scanline />

      {/* ── HERO ─────────────────────────────── */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <Halftone opacity={0.022} size={11} />
        <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(135deg,transparent 54%,rgba(220,38,38,0.035) 54%,rgba(220,38,38,0.035) 57%,transparent 57%)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background:"radial-gradient(ellipse 55% 45% at 58% 48%, rgba(245,197,24,0.04) 0%,transparent 70%)" }} />

        <motion.div
          style={{ y:heroY, opacity:heroOpacity }}
          className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center relative z-10 w-full"
        >
          {/* image */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity:0, x:-80, rotate:-4 }}
            animate={{ opacity:1, x:0, rotate:0 }}
            transition={{ duration:1, ease:[0.23,1,0.32,1] }}
          >
            <div className="relative">
              <div className="absolute -inset-7 rounded-xl blur-2xl bg-gradient-to-br from-yellow-400/18 via-red-500/8 to-transparent" />
              <div className="absolute -inset-3 border border-yellow-400/18 rounded-xl" />
              <div className="absolute -inset-1.5 border border-red-500/12 rounded-xl" />

              <motion.img
                src={devImg}
                alt="Sooraj"
                className="relative w-72 md:w-80 h-auto rounded-xl"
                style={{ boxShadow:"0 28px 80px rgba(0,0,0,0.85), 0 0 0 2px rgba(245,197,24,0.22)", filter:"contrast(1.05) saturate(1.1)" }}
                whileHover={{ scale:1.04, filter:"contrast(1.1) saturate(1.3)" }}
                transition={{ duration:0.4 }}
              />

              {/* floating role tags */}
              <div className="hidden md:block">
                {floatingTags.map((tag,i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{ left:"108%", top:`${12+i*22}%` }}
                    initial={{ opacity:0, x:25 }}
                    animate={{ opacity:1, x:0 }}
                    transition={{ delay:tag.delay, duration:0.5 }}
                  >
                    <div
                      className="flex items-center gap-1.5 px-3 py-1 rounded border border-yellow-400/28 bg-black/75 backdrop-blur-sm whitespace-nowrap"
                      style={{ boxShadow:"0 0 12px rgba(245,197,24,0.08)" }}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 data-blip" />
                      <span className="text-yellow-400/75 text-[10px]" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{tag.label}</span>
                    </div>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-7 w-7 h-px bg-gradient-to-l from-yellow-400/28 to-transparent" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* text */}
          <motion.div
            className="text-center md:text-left space-y-5"
            initial={{ opacity:0, x:80 }}
            animate={{ opacity:1, x:0 }}
            transition={{ duration:1, delay:0.2, ease:[0.23,1,0.32,1] }}
          >
            {/* <motion.span
              className="block text-red-500/18 text-7xl select-none leading-none"
              style={{ fontFamily:"'Bangers',cursive", letterSpacing:"0.1em" }}
              initial={{ scale:3.5, opacity:0 }}
              animate={{ scale:1, opacity:1 }}
              transition={{ duration:0.55, delay:0.1, ease:[0.23,1,0.32,1] }}
            >ドン！！</motion.span> */}

            <div>
              {/* <p className="text-white/25 text-[10px] tracking-[0.45em] uppercase mb-1.5" style={{ fontFamily:"'Share Tech Mono',monospace" }}>
                &gt; LOADING PROFILE . . .
              </p> */}
              <h1
                className="text-6xl md:text-8xl text-white leading-none mb-2"
                style={{ fontFamily:"'Bangers',cursive", letterSpacing:"0.04em" }}
              >
                Hey, I'm{" "}
                <span
                  className="glitch-wrap text-yellow-400"
                  data-text="Sooraj"
                  style={{ textShadow:"4px 4px 0 #92400e, 0 0 28px rgba(245,197,24,0.28)" }}
                >Sooraj</span>
              </h1>

              <div
                className="flex items-center gap-1 text-base md:text-lg text-white/65 h-8 mb-1 justify-center md:justify-start"
                style={{ fontFamily:"'Share Tech Mono',monospace" }}
              >
                <span className="text-yellow-400/55">$</span>
                <span className="ml-1">{typewriterText}</span>
                <motion.span
                  animate={{ opacity:[1,0,1] }}
                  transition={{ duration:0.75, repeat:Infinity }}
                  className="text-yellow-400 ml-0.5"
                >█</motion.span>
              </div>
            </div>

            <p className="text-sm text-white leading-relaxed max-w-sm">
              Data Scientist · <span className="text-amber-400/80">Data Analyst</span> · <span className="text-rose-400/80">ML Engineer</span> · <span className="text-violet-400/80">AI Enthusiast</span> · <span className="text-red-600">Full-Stack Dev</span>.
              I turn raw data into insights, train models that predict the future,
              and craft web apps that make people go <span className="text-yellow-400 font-bold">"wow!"</span>
            </p>

            {/* skill chips */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {["Python","React","ML","Data Science","AI","Node.js","SQL","TensorFlow"].map((s,i) => (
                <motion.span
                  key={i}
                  initial={{ opacity:0, scale:0.6 }}
                  animate={{ opacity:1, scale:1 }}
                  transition={{ delay:0.65+i*0.06, duration:0.3 }}
                  className="px-3 py-1 bg-white/5 text-white/45 text-[10px] rounded-full border border-white/10"
                  style={{ fontFamily:"'Share Tech Mono',monospace" }}
                >{s}</motion.span>
              ))}
            </div>

            <motion.a
              href="mailto:skashyap9711@gmail.com?subject=Job%20Opportunity&body=Hi%20there,%20I%20would%20like%20to%20hire%20you."
              className="relative inline-flex items-center gap-2 px-8 py-3 bg-yellow-400 text-black font-black rounded-full overflow-hidden pulse-gold"
              style={{ fontFamily:"'Bangers',cursive", letterSpacing:"0.1em", fontSize:"1.1rem" }}
              whileHover={{ scale:1.07, boxShadow:"0 0 35px rgba(245,197,24,0.45), 0 8px 30px rgba(0,0,0,0.55)" }}
              whileTap={{ scale:0.94 }}
            >
              <div className="shimmer-line" />
              <Mail size={16}/> CONTACT ME
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── WANTED POSTERS ───────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <Halftone opacity={0.02} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ChapterHeader ch="00" title="Grand Line Skills" sub="Disciplines & Domains — Bounty Level" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {domains.map((d,i) => <BountyPoster key={i} domain={d} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATES ─────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(180deg,transparent,rgba(245,197,24,0.025) 50%,transparent)" }} />
        <Halftone opacity={0.022} size={7} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ChapterHeader ch="01" title="Den Den Mushi Scrolls" sub="Certified & Battle-Tested" />

          {/* rank legend */}
          <motion.div
            className="flex items-center justify-center gap-6 mb-10"
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ delay:0.4 }} viewport={{ once:true }}
          >
            {[["S","Legendary","yellow-400","black"],["A","Elite","red-600","white"],["B","Skilled","blue-600","white"]].map(([r,l,bg,fg]) => (
              <div key={r} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black bg-${bg} text-${fg}`} style={{ fontFamily:"'Bangers',cursive", fontSize:"0.85rem" }}>{r}</div>
                <span className="text-white/35 text-[10px]" style={{ fontFamily:"'Share Tech Mono',monospace" }}>{l}</span>
              </div>
            ))}
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {certificates.map((cert,i) => <CertCard key={i} cert={cert} index={i} onOpen={setSelectedCert} />)}
          </div>

          <motion.p
            className="text-center text-white/18 text-[9px] mt-5 tracking-[0.35em] uppercase"
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ delay:1.1 }} viewport={{ once:true }}
            style={{ fontFamily:"'Share Tech Mono',monospace" }}
          >↑ CLICK ANY SCROLL TO EXPAND ↑</motion.p>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background:"linear-gradient(180deg,transparent,rgba(220,38,38,0.03) 45%,transparent)" }} />
        <Halftone opacity={0.018} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <ChapterHeader ch="02" title="The Grand Fleet" sub="Projects Forged in the New World" />

          {/* type legend */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
            initial={{ opacity:0 }} whileInView={{ opacity:1 }} transition={{ delay:0.4 }} viewport={{ once:true }}
          >
            {Object.entries(TYPE_META).map(([k,v]) => (
              <span key={k} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded border text-[10px] ${v.color}`} style={{ fontFamily:"'Share Tech Mono',monospace" }}>
                {v.icon}{v.label}
              </span>
            ))}
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((p,i) => <ProjectCard key={p.id} project={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedCert && <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />}
      </AnimatePresence>
    </>
  );
};

export default HomeSection;
