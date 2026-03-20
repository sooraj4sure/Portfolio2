import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

/* ══════════════════════════════════════════════
   NAV SECTIONS CONFIG
══════════════════════════════════════════════ */
const sections = [
  { id: "home",         label: "Home",         ch: "00" },
  { id: "about",        label: "About",      ch: "03" },
  { id: "projects",     label: "Projects",    ch: "04" },
  { id: "certificates", label: "Certificates",       ch: "05" },
  { id: "skills",       label: "Skills",  ch: "06" },
  { id: "contact",      label: "Contact",       ch: "07" },
];

/* ══════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════ */
const Navbar = ({ activeSection, setActiveSection, isMenuOpen, setIsMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Share+Tech+Mono&display=swap');
        @keyframes borderChase {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes shimmer {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%)  skewX(-15deg); }
        }
        .logo-shimmer { position:relative; overflow:hidden; }
        .logo-shimmer::after {
          content:'';
          position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent);
          animation: shimmer 3.5s linear infinite;
          pointer-events:none;
        }
        .nav-chase-border {
          background: linear-gradient(90deg,#f5c518,#dc2626,#f5c518,#dc2626,#f5c518);
          background-size:300% 100%;
          animation: borderChase 2s linear infinite;
        }
      `}</style>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? "rgba(5,5,15,0.92)"
            : "rgba(5,5,15,0.6)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled ? "1px solid rgba(245,197,24,0.15)" : "1px solid rgba(255,255,255,0.06)",
          boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.6)" : "none",
        }}
      >
        {/* top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-60"
          style={{
            background: "linear-gradient(90deg,transparent,rgba(245,197,24,0.5) 20%,rgba(220,38,38,0.5) 50%,rgba(245,197,24,0.5) 80%,transparent)",
          }}
        />

        {/* halftone strip */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 py-3 relative z-10">
          <div className="flex justify-between items-center">

            {/* ── LOGO ── */}
            <motion.button
              onClick={() => setActiveSection("home")}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              className="logo-shimmer relative flex items-center gap-2.5 group"
            >
              {/* skull/anchor icon */}
              <div
                className="w-8 h-8 rounded border border-yellow-400/40 flex items-center justify-center text-sm bg-yellow-400/10 transition-all duration-300 group-hover:bg-yellow-400/20 group-hover:border-yellow-400/70"
                style={{ boxShadow: "0 0 10px rgba(245,197,24,0.15)" }}
              >
                ⚓
              </div>
              <div>
                <span
                  className="text-yellow-400 block leading-none"
                  style={{
                    fontFamily: "'Bangers',cursive",
                    fontSize: "1.35rem",
                    letterSpacing: "0.08em",
                    textShadow: "2px 2px 0 rgba(180,69,9,0.6), 0 0 20px rgba(245,197,24,0.3)",
                  }}
                >SOORAJ</span>
                <span
                  className="text-white/30 block leading-none"
                  style={{ fontFamily: "'Share Tech Mono',monospace", fontSize: "0.55rem", letterSpacing: "0.25em" }}
                >DEV · DATA · AI</span>
              </div>
            </motion.button>

            {/* ── DESKTOP NAV ── */}
            <div className="hidden md:flex items-center gap-1">
              {sections.map((sec, i) => {
                const active = activeSection === sec.id;
                return (
                  <motion.button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.94 }}
                    className="relative group px-3 py-2 rounded-lg transition-all duration-300"
                    style={{
                      background: active ? "rgba(245,197,24,0.12)" : "transparent",
                    }}
                  >
                    {/* active chase border */}
                    {active && (
                      <motion.div
                        layoutId="activeNavBorder"
                        className="absolute -inset-0.5 rounded-lg overflow-hidden pointer-events-none"
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      >
                        <div className="nav-chase-border absolute inset-0 rounded-lg opacity-60" />
                      </motion.div>
                    )}

                    <span
                      className="relative z-10 flex flex-col items-center gap-0.5"
                    >
                      <span
                        className="text-[8px] transition-colors duration-300"
                        style={{
                          fontFamily: "'Share Tech Mono',monospace",
                          color: active ? "rgba(245,197,24,0.6)" : "rgba(255,255,255,0.2)",
                        }}
                      >Ch.{sec.ch}</span>
                      <span
                        className="transition-colors duration-300"
                        style={{
                          fontFamily: "'Bangers',cursive",
                          fontSize: "0.9rem",
                          letterSpacing: "0.08em",
                          color: active ? "#f5c518" : "rgba(255,255,255,0.65)",
                          textShadow: active ? "0 0 12px rgba(245,197,24,0.4)" : "none",
                        }}
                      >{sec.label}</span>
                    </span>

                    {/* hover underline */}
                    <motion.div
                      className="absolute bottom-0 left-3 right-3 h-px bg-yellow-400/50"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: active ? 0 : 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                );
              })}
            </div>

            {/* ── MOBILE TOGGLE ── */}
            <motion.button
              className="md:hidden relative w-9 h-9 rounded-lg border border-white/15 flex items-center justify-center bg-white/5 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.08, borderColor: "rgba(245,197,24,0.4)" }}
              whileTap={{ scale: 0.92 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X size={18} className="text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu size={18} className="text-white/70" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="md:hidden overflow-hidden"
              style={{ borderTop: "1px solid rgba(245,197,24,0.1)" }}
            >
              {/* halftone */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.025]"
                style={{
                  backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.8) 1px,transparent 1px)",
                  backgroundSize: "7px 7px",
                }}
              />

              <div className="px-6 py-4 space-y-1 relative z-10"
                style={{ background: "rgba(5,5,15,0.96)" }}
              >
                {sections.map((sec, i) => {
                  const active = activeSection === sec.id;
                  return (
                    <motion.button
                      key={sec.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                      onClick={() => { setActiveSection(sec.id); setIsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group"
                      style={{
                        background: active ? "rgba(245,197,24,0.1)" : "transparent",
                        border: active ? "1px solid rgba(245,197,24,0.25)" : "1px solid transparent",
                      }}
                    >
                      <span
                        className="text-[9px] w-8 text-center flex-shrink-0"
                        style={{
                          fontFamily: "'Share Tech Mono',monospace",
                          color: active ? "rgba(245,197,24,0.6)" : "rgba(255,255,255,0.2)",
                        }}
                      >Ch.{sec.ch}</span>

                      {/* divider */}
                      <div className="w-px h-4 bg-white/10 flex-shrink-0" />

                      <span
                        className="text-left transition-colors duration-300"
                        style={{
                          fontFamily: "'Bangers',cursive",
                          fontSize: "1rem",
                          letterSpacing: "0.08em",
                          color: active ? "#f5c518" : "rgba(255,255,255,0.6)",
                          textShadow: active ? "0 0 12px rgba(245,197,24,0.3)" : "none",
                        }}
                      >{sec.label}</span>

                      {/* active dot */}
                      {active && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0"
                          style={{ boxShadow: "0 0 6px rgba(245,197,24,0.7)" }}
                        />
                      )}
                    </motion.button>
                  );
                })}

                {/* mobile footer */}
                <div className="pt-3 mt-2 border-t border-white/8 flex items-center justify-center gap-2">
                  <span className="text-[9px] text-white/20 tracking-widest uppercase" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
                    Dev · Data · ML · AI
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;