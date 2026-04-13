import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { certificates } from "../data/portfolioData";

const RANK_COLOR = { S: "#e8c55a", A: "#ef4444", B: "#3b82f6" };
const RANK_LABEL = { S: "Legendary", A: "Elite", B: "Skilled" };

const DOMAIN_COLOR = {
  "CS / AI":      "rgba(167,139,250,.7)",
  "Security":     "rgba(251,113,133,.7)",
  "Design":       "rgba(232,121,249,.7)",
  "Engineering":  "rgba(56,189,248,.7)",
  "Cloud":        "rgba(96,165,250,.7)",
  "ML / AI":      "rgba(251,191,36,.7)",
  "Data Science": "rgba(52,211,153,.7)",
};

/* ── Zoom Modal ── */
const Modal = ({ cert, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, zIndex: 2000,
      background: "rgba(0,0,0,.85)", backdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "2rem",
    }}
  >
    <motion.div
      initial={{ scale: .88, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: .88, y: 20 }}
      transition={{ duration: .35, ease: [.23,1,.32,1] }}
      onClick={e => e.stopPropagation()}
      style={{
        background: "var(--surface)", border: "1px solid var(--border2)",
        maxWidth: 780, width: "100%", overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,.8)",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative" }}>
        <img
          src={cert.image}
          alt={cert.title}
          style={{ width: "100%", display: "block", maxHeight: 480, objectFit: "contain", background: "var(--surface2)" }}
        />
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "1rem", right: "1rem",
            width: 36, height: 36, borderRadius: "50%",
            background: "rgba(0,0,0,.7)", border: "1px solid var(--border2)",
            color: "var(--text)", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <X size={15} />
        </button>
      </div>
      {/* Info */}
      <div style={{ padding: "1.5rem 2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".8rem", marginBottom: ".6rem" }}>
          <span style={{
            width: 28, height: 28, borderRadius: "50%",
            background: RANK_COLOR[cert.rank],
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: ".7rem",
            color: cert.rank === "S" ? "var(--bg)" : "#fff",
            flexShrink: 0,
          }}>{cert.rank}</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: ".62rem", letterSpacing: ".15em", textTransform: "uppercase", color: RANK_COLOR[cert.rank], opacity: .85 }}>{RANK_LABEL[cert.rank]}</span>
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--text)", marginBottom: ".4rem" }}>{cert.title}</h3>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: ".68rem", color: "var(--teal)", letterSpacing: ".1em" }}>{cert.issuer} · {cert.date}</p>
      </div>
    </motion.div>
  </motion.div>
);

/* ── Cert Card ── */
const CertCard = ({ cert, index, onOpen }) => {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: .55, delay: index * .07, ease: [.23,1,.32,1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => onOpen(cert)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hov ? "rgba(232,197,90,.22)" : "var(--border)"}`,
        overflow: "hidden", cursor: "pointer",
        transform: hov ? "translateY(-5px)" : "none",
        boxShadow: hov ? "0 20px 50px rgba(0,0,0,.55)" : "none",
        transition: "all .3s ease",
      }}
    >
      {/* Certificate image */}
      <div style={{ height: 170, position: "relative", overflow: "hidden", background: "var(--surface2)" }}>
        <img
          src={cert.image}
          alt={cert.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            display: "block",
            transform: hov ? "scale(1.06)" : "scale(1)",
            transition: "transform .55s ease",
          }}
          onError={e => {
            e.target.style.display = "none";
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to top, rgba(17,24,32,.85) 0%, rgba(17,24,32,.1) 60%, transparent 100%)",
        }} />

        {/* Zoom hint */}
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: hov ? 1 : 0, transition: "opacity .25s",
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "rgba(232,197,90,.15)", border: "1px solid rgba(232,197,90,.5)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <ZoomIn size={16} color="var(--gold)" />
          </div>
        </div>

        {/* Rank badge */}
        <div style={{
          position: "absolute", top: 10, right: 10,
          width: 30, height: 30, borderRadius: "50%",
          background: RANK_COLOR[cert.rank],
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-mono)", fontWeight: 700,
          fontSize: ".7rem",
          color: cert.rank === "S" ? "var(--bg)" : "#fff",
          boxShadow: `0 0 12px ${RANK_COLOR[cert.rank]}80`,
          zIndex: 2,
        }}>{cert.rank}</div>

        {/* Domain badge */}
        <span style={{
          position: "absolute", bottom: 10, left: 10,
          fontFamily: "var(--font-mono)", fontSize: ".55rem",
          letterSpacing: ".12em", textTransform: "uppercase",
          color: DOMAIN_COLOR[cert.domain] || "var(--dim)",
          background: "rgba(0,0,0,.6)", border: `1px solid ${DOMAIN_COLOR[cert.domain] || "var(--border)"}44`,
          padding: ".2rem .5rem", backdropFilter: "blur(4px)",
          zIndex: 2,
        }}>{cert.domain}</span>
      </div>

      {/* Card info */}
      <div style={{ padding: "1.2rem 1.4rem" }}>
        {/* Accent left bar */}
        <div style={{
          position: "absolute", left: 0, top: "170px", bottom: 0,
          width: 2, background: RANK_COLOR[cert.rank], opacity: .4,
        }} />

        <p style={{
          fontFamily: "var(--font-mono)", fontSize: ".58rem",
          letterSpacing: ".18em", textTransform: "uppercase",
          color: "var(--gold)", opacity: .6, marginBottom: ".5rem",
        }}>{cert.issuer}</p>

        <h3 style={{
          fontFamily: "var(--font-display)", fontSize: "1.1rem",
          color: "var(--text)", lineHeight: 1.3, marginBottom: ".4rem",
        }}>{cert.title}</h3>

        <p style={{
          fontFamily: "var(--font-mono)", fontSize: ".6rem",
          color: "var(--dim)", letterSpacing: ".08em",
        }}>{cert.date}</p>
      </div>
    </motion.div>
  );
};

const CertificateSection = () => {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <section id="certificates" className="section" style={{ background: "var(--bg2)" }}>
        <div className="container">
          <p className="section-label reveal">Certificates</p>
          <h2 className="section-heading reveal"><em>Verified</em> Learning</h2>
          <p className="section-sub reveal">Professional certifications — click any card to view full certificate</p>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .5 }} viewport={{ once: true }}
            style={{ display: "flex", gap: "2.5rem", marginBottom: "3rem", flexWrap: "wrap" }}
          >
            {[
              { num: certificates.length, label: "Total Certificates", color: "var(--gold)"   },
              { num: certificates.filter(c => c.rank === "S").length, label: "Legendary (S)",  color: "#e8c55a" },
              { num: certificates.filter(c => c.rank === "A").length, label: "Elite (A)",       color: "#ef4444" },
            ].map(({ num, label, color }) => (
              <div key={label}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: "2.4rem", lineHeight: 1, color }}>
                  {num}
                </div>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".14em", textTransform: "uppercase", color: "var(--dim)", marginTop: ".2rem" }}>{label}</p>
              </div>
            ))}
          </motion.div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.4rem" }}>
            {certificates.map((cert, i) => (
              <CertCard key={i} cert={cert} index={i} onOpen={setSelected} />
            ))}
          </div>

          <p style={{
            fontFamily: "var(--font-mono)", fontSize: ".6rem",
            color: "var(--dim)", letterSpacing: ".1em",
            textAlign: "center", marginTop: "2.5rem",
          }}>
            Click any certificate card to view the full image
          </p>
        </div>
      </section>

      {/* Zoom modal */}
      <AnimatePresence>
        {selected && <Modal cert={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
};

export default CertificateSection;
