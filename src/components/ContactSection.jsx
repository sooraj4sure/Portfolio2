import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Github, Linkedin, Instagram, X, ArrowRight, Zap } from "lucide-react";

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
   SOCIAL LINKS DATA
══════════════════════════════════════════════ */
const socials = [
  { icon: Github,    name: "GitHub",    sub: "sooraj4sure",     link: "https://github.com/sooraj4sure",                                                                color: "#94a3b8", grad: "from-slate-900/50 to-gray-900/40",   arc: "East Blue"  },
  { icon: Linkedin,  name: "LinkedIn",  sub: "suraj-kashyap",   link: "https://www.linkedin.com/in/suraj-kashyap-78627b243/",                                        color: "#38bdf8", grad: "from-blue-900/50 to-cyan-900/40",    arc: "Alabasta"   },
  { icon: X,         name: "X.com",     sub: "@sooraj4sure",    link: "https://x.com/sooraj4sure",                                                                  color: "#e2e8f0", grad: "from-slate-800/50 to-zinc-900/40",   arc: "Skypiea"    },
  { icon: Instagram, name: "Instagram", sub: "@sooraj4sure",    link: "https://www.instagram.com/sooraj4sure/?igsh=MTFkajRvdDd5MGZvMA%3D%3D#",                     color: "#f472b6", grad: "from-pink-900/50 to-rose-900/40",    arc: "Marineford" },
];

/* ══════════════════════════════════════════════
   SOCIAL CARD
══════════════════════════════════════════════ */
const SocialCard = ({ social, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.a
      ref={ref}
      href={social.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ y: -8, scale: 1.04 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative group block"
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${social.grad} border border-white/10 p-5 transition-all duration-400`}
        style={{
          boxShadow: hov
            ? `0 20px 50px rgba(0,0,0,0.65), 0 0 0 1px ${social.color}30, inset 0 0 30px rgba(0,0,0,0.45)`
            : "0 4px 18px rgba(0,0,0,0.45), inset 0 0 25px rgba(0,0,0,0.45)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <SpeedLines count={14} opacity={hov ? 0.06 : 0.02} />
        <Halftone opacity={0.03} />

        {/* arc badge */}
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <span
            className="px-2 py-0.5 bg-red-700/55 text-red-200 text-[9px] rounded border border-red-500/25"
            style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.09em" }}
          >{social.arc} Arc</span>
        </div>

        {/* icon + info */}
        <div className="flex items-center gap-3 relative z-10">
          <motion.div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 border"
            style={{ background: `${social.color}15`, borderColor: `${social.color}30` }}
            animate={hov ? { scale: 1.2, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.4 }}
          >
            <social.icon size={20} style={{ color: social.color }} />
          </motion.div>
          <div>
            <p
              className="text-white text-base transition-colors duration-300"
              style={{
                fontFamily: "'Bangers',cursive",
                letterSpacing: "0.06em",
                fontSize: "1.05rem",
                color: hov ? social.color : "white",
              }}
            >{social.name}</p>
            <p className="text-white/35 text-[10px]" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{social.sub}</p>
          </div>
        </div>

        {/* arrow */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          animate={{ x: hov ? 4 : 0, opacity: hov ? 1 : 0.3 }}
          transition={{ duration: 0.2 }}
        >
          <ArrowRight size={14} style={{ color: social.color }} />
        </motion.div>

        {/* hover glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center,${social.color}10 0%,transparent 70%)` }}
          animate={{ opacity: hov ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* corner marks */}
        {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((cls, i) => (
          <div key={i} className={`absolute w-3 h-3 ${cls}`} style={{ borderColor: `${social.color}25` }} />
        ))}
      </div>
    </motion.a>
  );
};

/* ══════════════════════════════════════════════
   CONTACT INFO ROW
══════════════════════════════════════════════ */
const ContactRow = ({ icon: Icon, label, value, color, delay, href }) => {
  const [hov, setHov] = useState(false);
  const Tag = href ? "a" : "div";
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      viewport={{ once: true }}
    >
      <Tag
        href={href}
        target={href ? "_blank" : undefined}
        rel={href ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-4 py-3 border-b border-white/8 last:border-0 cursor-default"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all duration-300"
          style={{
            background: hov ? `${color}25` : `${color}12`,
            borderColor: hov ? `${color}50` : `${color}20`,
          }}
        >
          <Icon size={16} style={{ color }} />
        </div>
        <div>
          <p className="text-white/30 text-[9px] tracking-widest uppercase" style={{ fontFamily: "'Share Tech Mono',monospace" }}>{label}</p>
          <p
            className="text-white/80 text-sm transition-colors duration-300"
            style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: "0.05em", color: hov ? color : undefined }}
          >{value}</p>
        </div>
      </Tag>
    </motion.div>
  );
};

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
const ContactSection = ({
  formData,
  setFormData,
  isSubmitting,
  submitMessage,
  handleFormSubmit,
}) => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bangers&family=Oswald:wght@400;700&family=Share+Tech+Mono&display=swap');
        @keyframes shimmer {
          0%   { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%)  skewX(-15deg); }
        }
        @keyframes pulseGold {
          0%,100% { box-shadow: 0 0 0 0 rgba(245,197,24,0.45); }
          50%      { box-shadow: 0 0 0 14px rgba(245,197,24,0); }
        }
        .shimmer-sweep { position:relative; overflow:hidden; }
        .shimmer-sweep::after {
          content:'';
          position:absolute; inset:0;
          background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);
          animation: shimmer 3s linear infinite;
          pointer-events:none;
        }
        .pulse-gold { animation: pulseGold 2.2s ease infinite; }
      `}</style>

      <section className="min-h-screen py-24 relative overflow-hidden">
        <Halftone opacity={0.02} size={9} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg,transparent,rgba(245,197,24,0.02) 50%,transparent)" }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg,transparent 55%,rgba(220,38,38,0.02) 55%,rgba(220,38,38,0.02) 58%,transparent 58%)" }} />

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
            >07</span>

            <p className="text-yellow-400/40 tracking-[0.45em] text-[10px] uppercase mb-2"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>── Chapter 07 ──</p>
            <h2
              className="text-6xl md:text-7xl text-white leading-none mb-2"
              style={{
                fontFamily: "'Bangers',cursive",
                letterSpacing: "0.06em",
                textShadow: "3px 3px 0 #7f1d1d, 7px 7px 24px rgba(220,38,38,0.25)",
              }}
            >Send a Den Den</h2>
            <p className="text-white/30 text-[10px] tracking-[0.35em] uppercase"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              Let's Connect — Ready to Ship Something Amazing
            </p>
            <motion.div
              className="mx-auto mt-4 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: "55%" }}
              transition={{ duration: 0.9, delay: 0.35 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* ── INTRO QUOTE ── */}
          <motion.div
            className="text-center mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className="text-white/45 text-sm leading-relaxed" style={{ fontFamily: "'Oswald',sans-serif", letterSpacing: "0.05em" }}>
              Ready to build something extraordinary together?
              Drop a message — whether it's a{" "}
              <span className="text-yellow-400/80">data project</span>,{" "}
              <span className="text-violet-400/80">AI integration</span>, or a{" "}
              <span className="text-cyan-400/80">full-stack app</span>.
              Let's make it happen!
            </p>
          </motion.div>

          {/* ── MAIN GRID ── */}
          <div className="grid md:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">

            {/* LEFT — contact info + status */}
            <motion.div
              className="space-y-5"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
            >
              {/* get in touch card */}
              <div
                className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/45 backdrop-blur-sm p-6"
                style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.45), inset 0 0 30px rgba(0,0,0,0.45)" }}
              >
                <Halftone opacity={0.03} size={7} />

                {/* bounty file header */}
                <div className="flex items-center gap-3 mb-5 relative z-10">
                  <div className="flex-1 h-px bg-gradient-to-r from-yellow-400/40 to-transparent" />
                  <span
                    className="text-yellow-400 tracking-[0.3em] text-xs"
                    style={{ fontFamily: "'Bangers',cursive", fontSize: "1rem" }}
                  >CONTACT FILE</span>
                  <div className="flex-1 h-px bg-gradient-to-l from-yellow-400/40 to-transparent" />
                </div>

                <div className="relative z-10">
                  <ContactRow
                    icon={Mail}
                    label="Email"
                    value="skashyap9711@gmail.com"
                    color="#f5c518"
                    delay={0.1}
                    href="mailto:skashyap9711@gmail.com?subject=Job%20Opportunity&body=Hi%20there,%20I%20would%20like%20to%20hire%20you."
                  />
                  <ContactRow
                    icon={MessageCircle}
                    label="Status"
                    value="Open to Work — Fresher"
                    color="#34d399"
                    delay={0.2}
                  />
                  <ContactRow
                    icon={Zap}
                    label="Domains"
                    value="Web · Data · ML · AI"
                    color="#a78bfa"
                    delay={0.3}
                  />
                </div>

                {/* corner marks */}
                {["top-2 left-2 border-t border-l", "top-2 right-2 border-t border-r", "bottom-2 left-2 border-b border-l", "bottom-2 right-2 border-b border-r"].map((cls, i) => (
                  <div key={i} className={`absolute w-3 h-3 ${cls} border-yellow-400/25`} />
                ))}
              </div>

              {/* status badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-emerald-500/25 bg-emerald-900/20 backdrop-blur-sm"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 flex-shrink-0"
                  style={{ boxShadow: "0 0 8px rgba(52,211,153,0.7)", animation: "pulseGold 2s infinite" }}
                />
                <span className="text-emerald-300 text-sm" style={{ fontFamily: "'Share Tech Mono',monospace" }}>
                  Available for opportunities — Full-time / Freelance
                </span>
              </motion.div>

              {/* quick email CTA */}
              <motion.a
                href="mailto:skashyap9711@gmail.com?subject=Job%20Opportunity&body=Hi%20there,%20I%20would%20like%20to%20hire%20you."
                className="shimmer-sweep pulse-gold relative flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black font-black rounded-full w-full transition-all duration-300"
                style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.12em", fontSize: "1.1rem" }}
                whileHover={{ scale: 1.04, boxShadow: "0 0 30px rgba(245,197,24,0.45)" }}
                whileTap={{ scale: 0.96 }}
              >
                <Mail size={16} /> SEND A MESSAGE
              </motion.a>
            </motion.div>

            {/* RIGHT — social cards */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
              viewport={{ once: true }}
            >
              {/* header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-gradient-to-r from-red-500/40 to-transparent" />
                <span
                  className="text-red-400 tracking-[0.3em] text-xs"
                  style={{ fontFamily: "'Bangers',cursive", fontSize: "1rem" }}
                >FOLLOW THE JOURNEY</span>
                <div className="flex-1 h-px bg-gradient-to-l from-red-500/40 to-transparent" />
              </div>

              {socials.map((social, i) => (
                <SocialCard key={social.name} social={social} index={i} />
              ))}
            </motion.div>

          </div>

          {/* ── FOOTER SIGN-OFF ── */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-yellow-400/40" />
              <span className="text-2xl">🏴‍☠️</span>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-yellow-400/40" />
            </div>
            <p
              className="text-yellow-400/50 text-sm tracking-[0.2em]"
              style={{ fontFamily: "'Bangers',cursive", letterSpacing: "0.15em" }}
            >
              "The sea is vast — let's sail together, Nakama!"
            </p>
            <p className="text-white/20 text-[9px] mt-2 tracking-widest uppercase"
              style={{ fontFamily: "'Share Tech Mono',monospace" }}>
              © {new Date().getFullYear()} Sooraj · Built with React · Designed with One Piece Spirit
            </p>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default ContactSection;