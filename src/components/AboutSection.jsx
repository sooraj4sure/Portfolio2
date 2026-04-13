import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { quickFacts, coreBars } from "../data/portfolioData";

/* ── animated skill bar ── */
const SkillBar = ({ label, pct, color, delay }) => {
  const ref  = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} style={{ marginBottom: "1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: ".35rem" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", letterSpacing: ".1em", color: "var(--dim)", textTransform: "uppercase" }}>{label}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", color: "var(--gold)", opacity: .8 }}>{pct}%</span>
      </div>
      <div style={{ height: 2, background: "var(--border2)", overflow: "hidden" }}>
        <motion.div
          style={{ height: "100%", background: color }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.15, delay, ease: [.23,1,.32,1] }}
        />
      </div>
    </div>
  );
};

/* ── domain card ── */
const DomainCard = ({ icon, label, color }) => (
  <div style={{
    padding: ".75rem", border: "1px solid var(--border)",
    background: "var(--surface2)",
    fontFamily: "var(--font-mono)", fontSize: ".65rem",
    letterSpacing: ".06em", color: "var(--muted)",
    transition: "border-color .2s",
  }}
    onMouseEnter={e => e.currentTarget.style.borderColor = color + "50"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
  >
    <div style={{ fontSize: ".9rem", marginBottom: ".3rem" }}>{icon}</div>
    {label}
  </div>
);

const DOMAINS = [
  { icon: "⚛️", label: "Front-End",       color: "#38bdf8" },
  { icon: "🟢", label: "Back-End & DB",    color: "#34d399" },
  { icon: "🤖", label: "Data Science & ML",color: "#fb7185" },
  { icon: "🧠", label: "AI & LLMs",        color: "#a78bfa" },
  { icon: "🐍", label: "Python Ecosystem", color: "#e8c55a" },
  { icon: "🔧", label: "Tools & DevOps",   color: "#2dd4bf" },
];

const TRAITS = ["Coffee Addict ☕","Problem Solver ⚡","ML Enthusiast 🤖","Open Source 🌐","Lifelong Learner 📚"];

const AboutSection = () => {
  return (
    <section id="about" className="section" style={{ background: "var(--bg2)" }}>
      <div className="container">
        <p className="section-label reveal">About</p>
        <h2 className="section-heading reveal"><em>Who</em> I Am</h2>
        <p className="section-sub reveal">Background · Mindset · Quick Facts</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3.5rem", alignItems: "start" }}
          className="about-two-col">

          {/* ── LEFT ── */}
          <div>
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: .7, ease: [.23,1,.32,1] }} viewport={{ once: true }}
              style={{
                background: "var(--surface)", border: "1px solid var(--border)",
                padding: "2rem", marginBottom: "1.5rem",
              }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", opacity: .6, marginBottom: "1.1rem" }}>My Story</p>
              <p style={{ fontSize: ".9rem", color: "var(--muted)", lineHeight: 1.78, marginBottom: ".9rem" }}>
                Started coding at 19 with a simple <span style={{ color: "var(--gold)", fontFamily: "var(--font-mono)", fontSize: ".82rem" }}>"Hello World"</span> that sparked a full obsession. Since then I've grown into a{" "}
                <strong style={{ color: "var(--text)" }}>Full-Stack Developer</strong>,{" "}
                <strong style={{ color: "var(--teal)" }}>ML Engineer</strong>, and{" "}
                <strong style={{ color: "var(--violet)" }}>Data Scientist</strong> who believes data tells stories and clean code changes the world.
              </p>
              <p style={{ fontSize: ".9rem", color: "var(--muted)", lineHeight: 1.78 }}>
                When I'm not wrangling datasets or training models, I'm building full-stack apps, exploring AI tools, or overthinking the perfect UI. ✨
              </p>

              {/* Traits */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginTop: "1.3rem" }}>
                {TRAITS.map((t) => (
                  <span key={t} style={{
                    fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".1em",
                    textTransform: "uppercase", color: "var(--muted)",
                    border: "1px solid var(--border)", padding: ".28rem .7rem",
                    transition: "border-color .2s, color .2s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => { e.target.style.borderColor = "rgba(45,212,191,.4)"; e.target.style.color = "var(--teal)"; }}
                    onMouseLeave={e => { e.target.style.borderColor = "var(--border)"; e.target.style.color = "var(--muted)"; }}
                  >{t}</span>
                ))}
              </div>
            </motion.div>

            {/* Skill bars */}
            <motion.div
              initial={{ opacity: 0, x: -28 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: .7, delay: .12, ease: [.23,1,.32,1] }} viewport={{ once: true }}
              style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "2rem" }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", opacity: .6, marginBottom: "1.3rem" }}>Competency Levels</p>
              {coreBars.map((b, i) => (
                <SkillBar key={b.label} {...b} delay={i * .1} />
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT ── */}
          <div>
            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: .7, ease: [.23,1,.32,1] }} viewport={{ once: true }}
              style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "2rem", marginBottom: "1.5rem" }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", opacity: .6, marginBottom: "1.3rem" }}>Quick Facts</p>
              {quickFacts.map((f) => (
                <div key={f.key} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: ".65rem 0", borderBottom: "1px solid var(--border)",
                  fontFamily: "var(--font-mono)", fontSize: ".72rem",
                }}>
                  <span style={{ color: "var(--dim)", letterSpacing: ".06em" }}>{f.key}</span>
                  <span style={{ color: f.accent ? "var(--teal)" : "var(--text)" }}>{f.val}</span>
                </div>
              ))}
            </motion.div>

            {/* Domain grid */}
            <motion.div
              initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: .7, delay: .12, ease: [.23,1,.32,1] }} viewport={{ once: true }}
              style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "2rem" }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", opacity: .6, marginBottom: "1.3rem" }}>Domains</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".7rem" }}>
                {DOMAINS.map((d) => <DomainCard key={d.label} {...d} />)}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default AboutSection;
