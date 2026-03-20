import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

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

/* ══════════════════════════════════════════════
   DATA
══════════════════════════════════════════════ */
const certificates = [
  { title: "Programming With Python",             issuer: "Harvard University",        date: "July 2025",     image: "/certificates/CS50P.png",           rank: "S", domain: "CS / AI" },
  { title: "Cybersecurity Skilling Program",       issuer: "C3iHub IIT Kanpur",         date: "June 2023",    image: "/certificates/CyberIIT.jpg",         rank: "A", domain: "Security" },
  { title: "3D Modelling by Autodesk",             issuer: "Cognizance'22 IIT Roorkee", date: "March 2022",   image: "/certificates/Autodesk.jpg",         rank: "A", domain: "Design" },
  { title: "Software Engineering Virtual Experience", issuer: "HP x Forage",           date: "November 2022", image: "/certificates/hp.jpg",              rank: "B", domain: "Engineering" },
  { title: "Google Workspace Administrator",       issuer: "Google Cloud x Coursera",  date: "March 2024",   image: "/certificates/GoogleWorkspace.jpg",  rank: "A", domain: "Cloud" },
  { title: "Machine Learning to Deep Learning",    issuer: "ISRO",                      date: "July 2022",    image: "/certificates/ISRO-ML.jpg",          rank: "S", domain: "ML / AI" },
  { title: "Basics of Remote Sensing & GIS",       issuer: "ISRO",                      date: "November 2022",image: "/certificates/RemoteSensing.jpg",    rank: "B", domain: "Data Science" },
];

const RANK_STYLE = {
  S: { bg: "bg-yellow-400",  text: "text-black",  glow: "shadow-yellow-400/70", label: "Legendary" },
  A: { bg: "bg-red-600",     text: "text-white",  glow: "shadow-red-500/70",    label: "Elite"     },
  B: { bg: "bg-blue-600",    text: "text-white",  glow: "shadow-blue-500/70",   label: "Skilled"   },
};

const DOMAIN_COLOR = {
  "CS / AI":       "bg-violet-500/15 text-violet-300 border-violet-500/25",
  "Security":      "bg-red-500/15 text-red-300 border-red-500/25",
  "Design":        "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/25",
  "Engineering":   "bg-cyan-500/15 text-cyan-300 border-cyan-500/25",
  "Cloud":         "bg-blue-500/15 text-blue-300 border-blue-500/25",
  "ML / AI":       "bg-amber-500/15 text-amber-300 border-amber-500/25",
  "Data Science":  "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
};

/* ══════════════════════════════════════════════
   CERT CARD
══════════════════════════════════════════════ */
const CertCard = ({ cert, index, onOpen }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-55px" });
  const [hov, setHov] = useState(false);
  const rs = RANK_STYLE[cert.rank];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 14 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.58, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -10, scale: 1.04 }}
      className="relative cursor-pointer group"
      style={{ perspective: 700 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onOpen(cert)}
    >
      {/* animated chase border on hover */}
      <AnimatePresence>
        {hov && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute -inset-0.5 rounded-xl pointer-events-none overflow-hidden z-10"
          >
            <div
              className="absolute inset-0 rounded-xl"
              style={{
                background: "linear-gradient(90deg,#f5c518,#dc2626,#f5c518,#dc2626,#f5c518)",
                backgroundSize: "300% 100%",
                animation: "borderChase 2s linear infinite",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative overflow-hidden rounded-xl border border-white/10 bg-black/55 h-full flex flex-col"
        style={{ boxShadow: hov ? "0 20px 50px rgba(0,0,0,0.65), inset 0 0 35px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.5)", transition: "box-shadow 0.4s ease" }}
      >
        <Halftone opacity={0.04} size={6} />

        {/* rank badge */}
        <div
          className={`absolute top-2.5 right-2.5 z-20 w-8 h-8 rounded-full flex items-center justify-center font-black shadow-lg ${rs.bg} ${rs.text} ${rs.glow}`}
          style={{ fontFamily: "'Bangers',cursive", fontSize: "1rem" }}
        >{cert.rank}</div>

        {/* image */}
        <div className="relative overflow-hidden h-44 flex-shrink-0">
          <img
            src={cert.image}
            alt={cert.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />

          {/* zoom hint */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: hov ? 1 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-11 h-11 rounded-full bg-yellow-400/20 border border-yellow-400/60 flex items-center justify-center backdrop-blur-sm">
              <ZoomIn size={16} className="text-yellow-400" />
            </div>
          </motion.div>

          {/* domain pill on image */}
          <div className="absolute bottom-2 left-2">
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded border text-[9px] ${DOMAIN_COLOR[cert.domain] || "bg-white/10 text-white/50 border-white/15"}`}
              style={{ fontFamily: "'Share Tech Mono',monospace" }}
            >{cert.domain}</span>
          </div>
        </div>

        {/* info */}
        <div className="p-4 relative z-10 flex flex-col flex-1">
          <h3
            className="text-white leading-snug mb-1.5 group-hover:text-yellow-300 transition-colors duration-300 line-clamp-2"
            style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.04em", fontSize: "1rem" }}
          >{cert.title}</h3>

          <p className="text-yellow-400/65 text-[10px] leading-snug" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{cert.issuer}</p>
          <p className="text-white/30 text-[10px] mt-0.5" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{cert.date}</p>

          {/* rank label bottom */}
          <div className="mt-auto pt-3 flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${rs.bg}`} />
            <span className="text-white/25 text-[9px] tracking-widest uppercase" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{rs.label} Rank</span>
          </div>
        </div>

        {/* hover inner glow */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center,rgba(245,197,24,0.055) 0%,transparent 70%)" }}
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   CERT MODAL
══════════════════════════════════════════════ */
const CertModal = ({ cert, onClose }) => {
  useEffect(() => {
    const fn = e => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  const rs = RANK_STYLE[cert.rank];

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div className="absolute inset-0 bg-black/92 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />

      <motion.div
        initial={{ scale: 0.45, opacity: 0, rotateY: -30 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.45, opacity: 0, rotateY: 30 }}
        transition={{ type: "spring", stiffness: 270, damping: 22 }}
        className="relative max-w-3xl w-full z-10"
        onClick={e => e.stopPropagation()}
        style={{ perspective: 900 }}
      >
        {/* glowing border */}
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400 opacity-75 blur-sm" />
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-yellow-400 via-red-600 to-yellow-400" />

        <div className="relative bg-black rounded-2xl overflow-hidden">
          {/* close */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.15, rotate: 90 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 z-20 w-9 h-9 bg-red-600 hover:bg-red-500 rounded-full flex items-center justify-center"
          ><X size={14} className="text-white" /></motion.button>

          {/* rank badge on modal */}
          <div
            className={`absolute top-3 left-3 z-20 w-9 h-9 rounded-full flex items-center justify-center font-black shadow-lg ${rs.bg} ${rs.text}`}
            style={{ fontFamily: "'Bangers',cursive", fontSize: "1.1rem" }}
          >{cert.rank}</div>

          <img src={cert.image} alt={cert.title} className="w-full max-h-[68vh] object-contain" />

          <div className="p-5 text-center border-t border-yellow-400/20 relative">
            <Halftone opacity={0.03} size={7} />
            <span
              className={`inline-flex items-center px-2 py-0.5 rounded border text-[9px] mb-2 ${DOMAIN_COLOR[cert.domain] || "bg-white/10 text-white/50 border-white/15"}`}
              style={{ fontFamily: "'Share Tech Mono',monospace" }}
            >{cert.domain}</span>
            <h3
              className="text-yellow-400 text-2xl mb-1 block"
              style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.08em", textShadow: "0 0 20px rgba(245,197,24,0.4)" }}
            >{cert.title}</h3>
            <p className="text-white/45 text-sm" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              {cert.issuer} · {cert.date}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   RANK LEGEND ITEM
══════════════════════════════════════════════ */
const RankLegendItem = ({ rank, delay }) => {
  const rs = RANK_STYLE[rank];
  const count = certificates.filter(c => c.rank === rank).length;
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      viewport={{ once: true }}
      className="flex items-center gap-2.5"
    >
      <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black ${rs.bg} ${rs.text} shadow-lg ${rs.glow}`}
        style={{ fontFamily: "'Bangers',cursive", fontSize: "0.9rem" }}
      >{rank}</div>
      <div>
        <p className="text-white/70 text-[11px]" style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: "0.06em" }}>{rs.label}</p>
        <p className="text-white/25 text-[9px]" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{count} scroll{count !== 1 ? "s" : ""}</p>
      </div>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
const CertificateSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Oswald:wght@400;700&family=Share+Tech+Mono&display=swap');
        @keyframes borderChase {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

      <section id="certificates" className="py-24 relative overflow-hidden">
        <Halftone opacity={0.022} size={9} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,transparent,rgba(245,197,24,0.025) 50%,transparent)" }} />
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
            >05</span>

            <p className="text-yellow-400/40 tracking-[0.45em] text-[10px] uppercase mb-2"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>── Chapter 05 ──</p>
            <h2
              className="text-6xl md:text-7xl text-white leading-none mb-2"
              style={{
                fontFamily: "'Bangers',cursive",
                letterSpacing: "0.06em",
                textShadow: "3px 3px 0 #7f1d1d, 7px 7px 24px rgba(220,38,38,0.25)",
              }}
            >Den Den Mushi Scrolls</h2>
            <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              Certified & Battle-Tested — Proof of the Journey
            </p>
            <motion.div
              className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "55%" }}
              transition={{ duration: 0.9, delay: 0.35 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* ── RANK LEGEND ── */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 mb-12 p-5 rounded-2xl border border-white/8 bg-black/30 backdrop-blur-sm max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            style={{ boxShadow: "inset 0 0 30px rgba(0,0,0,0.5)" }}
          >
            {/* corner marks */}
            {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((cls, i) => (
              <div key={i} className={`absolute w-3 h-3 ${cls} border-yellow-400/30`} />
            ))}
            <p className="w-full text-center text-white/20 text-[9px] tracking-[0.3em] uppercase mb-1" style={{ fontFamily: "'Share Tech Mono',monospace" }}>Rank System</p>
            {["S", "A", "B"].map((r, i) => <RankLegendItem key={r} rank={r} delay={0.1 * i} />)}
          </motion.div>

          {/* ── GRID ── */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {certificates.map((cert, i) => (
              <CertCard key={i} cert={cert} index={i} onOpen={setSelectedCert} />
            ))}
          </div>

          {/* ── HINT ── */}
          <motion.p
            className="text-center text-white/18 text-[9px] mt-6 tracking-[0.35em] uppercase"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }} viewport={{ once: true }}
            style={{ fontFamily: "'Share Tech Mono',monospace" }}
          >↑ Click any scroll to expand ↑</motion.p>

        </div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {selectedCert && <CertModal cert={selectedCert} onClose={() => setSelectedCert(null)} />}
      </AnimatePresence>
    </>
  );
};

export default CertificateSection;