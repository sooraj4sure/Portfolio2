import React from "react";
import { motion } from "framer-motion";
import { experience } from "../data/portfolioData";

const ExperienceSection = () => (
  <section id="experience" className="section">
    <div className="container">
      <p className="section-label reveal">Experience</p>
      <h2 className="section-heading reveal">Work <em>History</em></h2>
      <p className="section-sub reveal">Professional background & involvement</p>

      <div style={{ maxWidth: 700 }}>
        {/* Timeline */}
        <div style={{ position: "relative", paddingLeft: "2.2rem" }}>
          {/* vertical line */}
          <div style={{
            position: "absolute", left: 0, top: 6, bottom: 0, width: 1,
            background: "linear-gradient(180deg, var(--gold) 0%, rgba(232,197,90,.15) 100%)",
          }} />

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: .65, delay: i * .12, ease: [.23,1,.32,1] }}
              viewport={{ once: true }}
              style={{ position: "relative", paddingBottom: i < experience.length - 1 ? "3rem" : 0 }}
            >
              {/* dot */}
              <div style={{
                position: "absolute", left: "-2.2rem", top: ".28rem",
                width: 8, height: 8, borderRadius: "50%",
                background: exp.color,
                border: "2px solid var(--bg)",
                boxShadow: `0 0 0 4px ${exp.color}22`,
              }} />

              {/* Period */}
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: ".62rem",
                letterSpacing: ".15em", textTransform: "uppercase",
                color: exp.color, marginBottom: ".5rem",
              }}>{exp.period}</p>

              {/* Title */}
              <h3 style={{
                fontFamily: "var(--font-display)", fontSize: "1.4rem",
                color: "var(--text)", marginBottom: ".2rem",
              }}>{exp.title}</h3>

              {/* Company */}
              <p style={{
                fontFamily: "var(--font-mono)", fontSize: ".7rem",
                letterSpacing: ".1em", color: "var(--teal)", marginBottom: ".8rem",
              }}>{exp.company}</p>

              {/* Description */}
              <p style={{ fontSize: ".88rem", color: "var(--muted)", lineHeight: 1.75, marginBottom: "1rem" }}>
                {exp.desc}
              </p>

              {/* Tags */}
              <div style={{ display: "flex", gap: ".45rem", flexWrap: "wrap" }}>
                {exp.tags.map((t) => (
                  <span key={t} style={{
                    fontFamily: "var(--font-mono)", fontSize: ".6rem",
                    letterSpacing: ".06em", color: "var(--dim)",
                    border: "1px solid var(--border)", padding: ".2rem .6rem",
                    textTransform: "uppercase",
                  }}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExperienceSection;
