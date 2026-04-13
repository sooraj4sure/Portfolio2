import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { projects, certificates } from "../data/portfolioData";
import devImg from "../assets/Luffy1.png";

/* ── Featured ML projects shown on home ── */
const featuredProjects = projects.filter((p) => p.featured);
/* ── Featured certs (top 3 by rank S first) ── */
const featuredCerts = certificates.filter((c) => c.rank === "S" || c.rank === "A").slice(0, 3);

const RANK_COLOR = { S: "#e8c55a", A: "#ef4444", B: "#3b82f6" };

const HomeSection = ({ setActiveSection }) => {
  const nav = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .cursor-blink { animation: blink 1.1s step-end infinite; }
        .hero-grid {
          background-image:
            linear-gradient(rgba(255,255,255,.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.018) 1px, transparent 1px);
          background-size: 72px 72px;
        }
        .featured-card:hover .feat-arrow { transform: translateX(4px); }
        .feat-arrow { transition: transform .2s; }
      `}</style>

      <section
        id="home"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          paddingTop: "5.5rem",
        }}
      >
        {/* Grid bg */}
        <div className="hero-grid" style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
        {/* Ambient glow */}
        <div style={{
          position: "absolute", top: "-5%", right: "-10%",
          width: 700, height: 700, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,197,90,.055) 0%, rgba(45,212,191,.025) 40%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>

          {/* ── HERO TOP ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "3rem",
            alignItems: "flex-start",
            paddingBottom: "4rem",
          }}>
            {/* Left: text */}
            <div>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6, delay: .1 }}
                style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: "1.4rem" }}
              >
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "var(--teal)",
                  boxShadow: "0 0 8px var(--teal)",
                  animation: "blink 2s ease-in-out infinite",
                  display: "inline-block",
                }} />
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: ".65rem",
                  letterSpacing: ".22em", textTransform: "uppercase", color: "var(--teal)",
                }}>
                  Available for opportunities
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .7, delay: .2 }}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(3.2rem, 7vw, 5.5rem)",
                  fontWeight: 400, lineHeight: 1,
                  marginBottom: ".3rem", color: "var(--text)",
                }}
              >
                Sooraj
                <em style={{ fontStyle: "italic", color: "var(--gold)", display: "block" }}>Kashyap</em>
              </motion.h1>

              {/* Role */}
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: .6, delay: .35 }}
                style={{
                  fontFamily: "var(--font-mono)", fontSize: ".78rem",
                  letterSpacing: ".18em", textTransform: "uppercase",
                  color: "var(--muted)", marginBottom: "1.8rem",
                }}
              >
                ML Engineer · Full-Stack Developer · Data Scientist
                <span className="cursor-blink" style={{ color: "var(--gold)", marginLeft: 3 }}>_</span>
              </motion.p>

              {/* Desc */}
              <motion.p
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6, delay: .4 }}
                style={{
                  fontSize: ".95rem", color: "var(--muted)",
                  lineHeight: 1.78, maxWidth: 500, marginBottom: "2.2rem",
                }}
              >
                Building intelligent systems that bridge data and experience.
                I craft ML models, full-stack applications, and AI-powered tools —
                turning raw data into products that actually work.
              </motion.p>

              {/* Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: .6, delay: .5 }}
                style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "2.5rem" }}
              >
                <button onClick={() => nav("projects")} className="btn-primary">
                  <ArrowRight size={13} /> View Projects
                </button>
                <a href="mailto:sooraj4sure@gmail.com" className="btn-outline">
                  <Mail size={13} /> Get In Touch
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: .6, delay: .65 }}
                style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}
              >
                {[["5+","ML Projects"],["35+","Skills"],["20+","Total Projects"]].map(([num,lbl]) => (
                  <div key={lbl}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "2.2rem", lineHeight: 1, color: "var(--text)" }}>{num}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--dim)", marginTop: ".2rem" }}>{lbl}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: photo — subtle corner placement */}
            <motion.div
              initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: .8, delay: .3 }}
              style={{ position: "relative", flexShrink: 0 }}
            >
              <div style={{
                width: 210, height: 260,
                border: "1px solid rgba(232,197,90,.22)",
                position: "relative", overflow: "hidden",
              }}>
                <img
                  src={devImg}
                  alt="Sooraj Kashyap"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(15%) contrast(1.05)" }}
                  onError={e => { e.target.style.display = "none"; }}
                />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(8,12,16,.5) 0%, transparent 50%)",
                }} />
                {/* offset accent frame */}
                <div style={{
                  position: "absolute", top: 10, right: -10,
                  width: "100%", height: "100%",
                  border: "1px solid rgba(232,197,90,.1)",
                  pointerEvents: "none", zIndex: -1,
                }} />
              </div>
              <div style={{
                position: "absolute", bottom: -14, left: -14,
                background: "var(--surface2)", border: "1px solid var(--border)",
                padding: ".5rem .9rem",
                fontFamily: "var(--font-mono)", fontSize: ".6rem",
                color: "var(--dim)", letterSpacing: ".1em", textTransform: "uppercase",
              }}>
                <strong style={{ color: "var(--gold)", display: "block", fontSize: ".7rem" }}>Delhi, India</strong>
                Open to Work
              </div>
            </motion.div>
          </div>

          {/* ── FEATURED PROJECTS STRIP ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .7 }}
            style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem", marginBottom: "3.5rem" }}
          >
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              marginBottom: "1.5rem",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--dim)" }}>
                Featured ML Projects
              </p>
              <button
                onClick={() => nav("projects")}
                style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}
              >
                View All →
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "1rem" }}>
              {featuredProjects.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: .75 + i * .07 }}
                  className="featured-card"
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    padding: "1.2rem 1.4rem",
                    cursor: "default",
                    transition: "border-color .25s, transform .25s",
                    position: "relative", overflow: "hidden",
                  }}
                  whileHover={{ y: -3, borderColor: "rgba(232,197,90,.22)" }}
                >
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: ".58rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", opacity: .65, marginBottom: ".5rem" }}>{p.type}</p>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--text)", marginBottom: ".4rem" }}>{p.name}</h4>
                  <p style={{ fontSize: ".78rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: ".9rem" }}>{p.desc}</p>
                  <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap" }}>
                    {p.tech.slice(0, 3).map((t) => (
                      <span key={t} style={{
                        fontFamily: "var(--font-mono)", fontSize: ".55rem", letterSpacing: ".06em",
                        textTransform: "uppercase", color: "var(--dim)",
                        border: "1px solid var(--border)", padding: ".15rem .5rem",
                      }}>{t}</span>
                    ))}
                  </div>
                  {p.link && (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
                      position: "absolute", top: "1.2rem", right: "1.2rem",
                      fontFamily: "var(--font-mono)", fontSize: ".58rem",
                      letterSpacing: ".1em", textTransform: "uppercase",
                      color: "var(--teal)", textDecoration: "none",
                    }}>
                      <span className="feat-arrow">↗</span>
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── FEATURED CERTS PREVIEW ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .9 }}
            style={{ borderTop: "1px solid var(--border)", paddingTop: "3rem", paddingBottom: "5rem" }}
          >
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              marginBottom: "1.5rem",
            }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", letterSpacing: ".22em", textTransform: "uppercase", color: "var(--dim)" }}>
                Top Certificates
              </p>
              <button
                onClick={() => nav("certificates")}
                style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", letterSpacing: ".12em", textTransform: "uppercase", color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}
              >
                View All →
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
              {featuredCerts.map((c, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: .95 + i * .07 }}
                  style={{
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    overflow: "hidden",
                    transition: "border-color .25s, transform .25s",
                  }}
                  whileHover={{ y: -3, borderColor: "rgba(232,197,90,.2)" }}
                >
                  {/* cert image */}
                  <div style={{ height: 120, overflow: "hidden", position: "relative" }}>
                    <img
                      src={c.image}
                      alt={c.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      onError={e => {
                        e.target.style.display = "none";
                        e.target.parentElement.style.background = "var(--surface2)";
                        e.target.parentElement.style.display = "flex";
                        e.target.parentElement.style.alignItems = "center";
                        e.target.parentElement.style.justifyContent = "center";
                        e.target.parentElement.innerHTML = `<span style="font-family:var(--font-mono);font-size:.62rem;color:var(--dim);letter-spacing:.1em">Certificate Image</span>`;
                      }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(17,24,32,.8) 0%, transparent 60%)" }} />
                    <div style={{
                      position: "absolute", top: 8, right: 8,
                      width: 26, height: 26, borderRadius: "50%",
                      background: RANK_COLOR[c.rank],
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-mono)", fontWeight: 700,
                      fontSize: ".65rem", color: c.rank === "S" ? "var(--bg)" : "#fff",
                    }}>{c.rank}</div>
                  </div>
                  <div style={{ padding: "1rem" }}>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: ".58rem", letterSpacing: ".18em", textTransform: "uppercase", color: "var(--gold)", opacity: .65, marginBottom: ".35rem" }}>{c.issuer}</p>
                    <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "var(--text)", lineHeight: 1.3 }}>{c.title}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default HomeSection;
