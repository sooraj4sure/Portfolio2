import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "../data/portfolioData";

const FILTERS = ["All", "ML / AI", "Full-Stack", "React", "Data Science"];

const filterMatch = (p, f) => {
  if (f === "All") return true;
  if (f === "ML / AI")      return p.isML || p.type.toLowerCase().includes("ml") || p.type.toLowerCase().includes("ai") || p.type.toLowerCase().includes("nlp");
  if (f === "Full-Stack")   return p.type.toLowerCase().includes("mern") || p.type.toLowerCase().includes("full");
  if (f === "React")        return p.tech.includes("React");
  if (f === "Data Science") return p.type.toLowerCase().includes("data");
  return true;
};

const ProjectCard = ({ project, index }) => {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: .95 }}
      transition={{ duration: .45, delay: index * .04 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "var(--surface)",
        border: `1px solid ${hov ? "rgba(232,197,90,.2)" : "var(--border)"}`,
        padding: "1.8rem",
        position: "relative",
        overflow: "hidden",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 18px 45px rgba(0,0,0,.5)" : "none",
        transition: "border-color .3s, transform .3s, box-shadow .3s",
      }}
    >
      {/* top line on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, var(--gold), transparent)",
        opacity: hov ? 1 : 0, transition: "opacity .3s",
      }} />

      {/* Card number watermark */}
      <span style={{
        position: "absolute", top: "1.2rem", right: "1.2rem",
        fontFamily: "var(--font-display)", fontSize: "3rem",
        color: "rgba(255,255,255,.03)", lineHeight: 1,
        pointerEvents: "none", userSelect: "none",
      }}>
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Type label */}
      <p style={{
        fontFamily: "var(--font-mono)", fontSize: ".58rem",
        letterSpacing: ".2em", textTransform: "uppercase",
        color: "var(--gold)", opacity: .65, marginBottom: ".9rem",
        display: "flex", alignItems: "center", gap: ".5rem",
      }}>
        <span style={{ width: "1.2rem", height: 1, background: "var(--gold)", opacity: .5, display: "inline-block" }} />
        {project.type}
      </p>

      <h3 style={{
        fontFamily: "var(--font-display)", fontSize: "1.45rem",
        color: "var(--text)", marginBottom: ".55rem", lineHeight: 1.2,
      }}>{project.name}</h3>

      <p style={{ fontSize: ".83rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.3rem" }}>
        {project.desc}
      </p>

      {/* Tech chips */}
      <div style={{ display: "flex", gap: ".4rem", flexWrap: "wrap", marginBottom: "1.3rem" }}>
        {project.tech.map((t) => (
          <span key={t} style={{
            fontFamily: "var(--font-mono)", fontSize: ".57rem",
            letterSpacing: ".06em", textTransform: "uppercase",
            color: "var(--dim)", border: "1px solid var(--border)", padding: ".18rem .55rem",
          }}>{t}</span>
        ))}
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: ".8rem", alignItems: "center" }}>
        {project.link && (
          <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "var(--font-mono)", fontSize: ".63rem",
            letterSpacing: ".1em", textTransform: "uppercase",
            color: "var(--teal)", textDecoration: "none",
            display: "flex", alignItems: "center", gap: ".3rem",
            transition: "color .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--teal)"}
          >
            <ExternalLink size={11} /> Live Demo
          </a>
        )}
        {project.code && (
          <a href={project.code} target="_blank" rel="noopener noreferrer" style={{
            fontFamily: "var(--font-mono)", fontSize: ".63rem",
            letterSpacing: ".1em", textTransform: "uppercase",
            color: "var(--dim)", textDecoration: "none",
            display: "flex", alignItems: "center", gap: ".3rem",
            transition: "color .2s",
          }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
            onMouseLeave={e => e.currentTarget.style.color = "var(--dim)"}
          >
            <Github size={11} /> GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filtered = projects.filter((p) => filterMatch(p, activeFilter));

  return (
    <section id="projects" className="section" style={{ background: "var(--bg2)" }}>
      <div className="container">
        <p className="section-label reveal">Projects</p>
        <h2 className="section-heading reveal">Selected <em>Work</em></h2>
        <p className="section-sub reveal">ML Models · Full-Stack Apps · AI Tools · Web Experiments</p>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .5 }} viewport={{ once: true }}
          style={{ display: "flex", gap: ".6rem", flexWrap: "wrap", marginBottom: "2.5rem" }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: ".62rem",
                letterSpacing: ".12em", textTransform: "uppercase",
                padding: ".4rem 1rem",
                background: activeFilter === f ? "var(--gold)" : "transparent",
                color: activeFilter === f ? "var(--bg)" : "var(--muted)",
                border: activeFilter === f ? "1px solid var(--gold)" : "1px solid var(--border)",
                cursor: "pointer", transition: "all .2s",
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.4rem" }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: ".72rem", color: "var(--dim)", textAlign: "center", padding: "4rem 0", letterSpacing: ".1em" }}>
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
