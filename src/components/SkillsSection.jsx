import React from "react";
import { motion } from "framer-motion";
import { skillGroups } from "../data/portfolioData";

const totalSkills = skillGroups.reduce((a, g) => a + g.skills.length, 0);

const SkillPill = ({ name, color }) => (
  <span
    style={{
      fontFamily: "var(--font-mono)", fontSize: ".67rem",
      letterSpacing: ".06em", color: "var(--muted)",
      border: "1px solid var(--border)", padding: ".32rem .72rem",
      transition: "border-color .2s, color .2s, background .2s",
      cursor: "default", display: "inline-block",
    }}
    onMouseEnter={e => {
      e.target.style.borderColor = color + "55";
      e.target.style.color = "var(--text)";
      e.target.style.background = color + "0d";
    }}
    onMouseLeave={e => {
      e.target.style.borderColor = "var(--border)";
      e.target.style.color = "var(--muted)";
      e.target.style.background = "";
    }}
  >{name}</span>
);

const SkillsSection = () => (
  <section id="skills" className="section">
    <div className="container">
      <p className="section-label reveal">Skills</p>
      <h2 className="section-heading reveal">Technical <em>Arsenal</em></h2>
      <p className="section-sub reveal">Technologies, tools, and frameworks I work with</p>

      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: "4rem", alignItems: "start" }}
        className="skills-layout-inner">

        {/* Stats sidebar */}
        <div style={{ position: "sticky", top: "7rem" }}>
          {[
            { num: `${totalSkills}+`, label: "Total Skills",        color: "var(--gold)"   },
            { num: `${skillGroups.length}`,  label: "Domains",              color: "var(--sky)"    },
            { num: "9+",             label: "DS / ML Tools",        color: "var(--rose)"   },
            { num: "5+",             label: "AI API Integrations",  color: "var(--violet)" },
          ].map(({ num, label, color }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * .1, duration: .55 }} viewport={{ once: true }}
              style={{
                marginBottom: "1.8rem", paddingBottom: "1.8rem",
                borderBottom: i < 3 ? "1px solid var(--border)" : "none",
              }}
            >
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "3.2rem",
                lineHeight: 1, marginBottom: ".3rem",
              }}>
                <span style={{ color: "var(--text)" }}>{num.replace(/[+]/g, "")}</span>
                <span style={{ color }}>{num.includes("+") ? "+" : ""}</span>
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".15em", color: "var(--dim)", textTransform: "uppercase" }}>{label}</p>
            </motion.div>
          ))}
        </div>

        {/* Skill groups */}
        <div>
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: gi * .08, duration: .55 }} viewport={{ once: true }}
              style={{ marginBottom: "2.5rem" }}
            >
              {/* Group heading */}
              <div style={{
                display: "flex", alignItems: "center", gap: ".8rem",
                marginBottom: "1rem",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: ".62rem",
                  letterSpacing: ".2em", textTransform: "uppercase",
                  color: group.color, opacity: .8,
                }}>{group.label}</span>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                <span style={{
                  fontFamily: "var(--font-mono)", fontSize: ".58rem",
                  color: "var(--dim)", letterSpacing: ".08em",
                }}>{group.skills.length}</span>
              </div>

              {/* Pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".45rem" }}>
                {group.skills.map((s) => (
                  <SkillPill key={s} name={s} color={group.color} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .skills-layout-inner { grid-template-columns: 1fr !important; }
          .skills-layout-inner > div:first-child { position: static !important; display: flex; gap: 2rem; flex-wrap: wrap; margin-bottom: 2rem; }
          .skills-layout-inner > div:first-child > div { margin-bottom: 0 !important; padding-bottom: 0 !important; border: none !important; }
        }
      `}</style>
    </div>
  </section>
);

export default SkillsSection;
