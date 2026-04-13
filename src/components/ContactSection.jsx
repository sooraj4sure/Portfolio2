import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, X, Mail } from "lucide-react";

const SOCIALS = [
  { name: "Email",      sub: "sooraj4sure@gmail.com",                             link: "mailto:sooraj4sure@gmail.com",                             icon: Mail,      color: "var(--gold)"   },
  { name: "GitHub",     sub: "sooraj4sure",                                        link: "https://github.com/sooraj4sure",                          icon: Github,    color: "#94a3b8"        },
  { name: "LinkedIn",   sub: "suraj-kashyap",                                      link: "https://www.linkedin.com/in/suraj-kashyap-78627b243/",    icon: Linkedin,  color: "var(--sky)"    },
  { name: "X / Twitter",sub: "@sooraj4sure",                                       link: "https://x.com/sooraj4sure",                               icon: X,         color: "#e2e8f0"        },
  { name: "Instagram",  sub: "@sooraj4sure",                                       link: "https://www.instagram.com/sooraj4sure/",                  icon: Instagram, color: "#f472b6"        },
];

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your actual form handler (EmailJS / Formspree / etc.)
    const mailto = `mailto:sooraj4sure@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailto);
    setSent(true);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: "5rem", alignItems: "start",
        }} className="contact-grid">

          {/* ── LEFT: info ── */}
          <div>
            <p className="section-label reveal">Contact</p>
            <motion.h2
              initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: .65 }} viewport={{ once: true }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 5vw, 3.4rem)",
                lineHeight: 1.1, marginBottom: "1rem",
              }}
            >
              Let's <em style={{ fontStyle: "italic", color: "var(--gold)" }}>work</em><br />together.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              transition={{ duration: .6, delay: .1 }} viewport={{ once: true }}
              style={{ fontSize: ".9rem", color: "var(--muted)", lineHeight: 1.78, marginBottom: "2rem" }}
            >
              Open to full-time roles, freelance projects, and collaborations in ML engineering, data science, and full-stack development. I'll get back within 24 hours.
            </motion.p>

            {/* Social links */}
            <div style={{ display: "flex", flexDirection: "column", gap: ".7rem" }}>
              {SOCIALS.map(({ name, sub, link, icon: Icon, color }, i) => (
                <motion.a
                  key={name}
                  href={link}
                  target={link.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * .07, duration: .5 }} viewport={{ once: true }}
                  style={{
                    display: "flex", alignItems: "center", gap: "1rem",
                    padding: ".9rem 1.1rem",
                    background: "var(--surface)", border: "1px solid var(--border)",
                    textDecoration: "none",
                    transition: "border-color .2s, background .2s",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = "rgba(232,197,90,.25)";
                    e.currentTarget.style.background = "rgba(232,197,90,.03)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "var(--surface)";
                  }}
                >
                  <div style={{
                    width: 34, height: 34, border: "1px solid var(--border)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, color,
                  }}>
                    <Icon size={15} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text)" }}>{name}</p>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", color: "var(--dim)" }}>{sub}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* ── RIGHT: form ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: .7, ease: [.23,1,.32,1] }} viewport={{ once: true }}
            style={{ background: "var(--surface)", border: "1px solid var(--border)", padding: "2rem" }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", opacity: .6, marginBottom: "1.5rem" }}>Send a Message</p>

            {sent ? (
              <div style={{ textAlign: "center", padding: "3rem 0" }}>
                <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--teal)", marginBottom: ".5rem" }}>Message sent!</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: ".7rem", color: "var(--dim)" }}>I'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { key: "name",    label: "Name",    type: "text",  placeholder: "Your name"                 },
                  { key: "email",   label: "Email",   type: "email", placeholder: "your@email.com"            },
                  { key: "subject", label: "Subject", type: "text",  placeholder: "What's this about?"        },
                ].map(({ key, label, type, placeholder }) => (
                  <div key={key} style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
                    <label style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--dim)" }}>{label}</label>
                    <input
                      type={type}
                      placeholder={placeholder}
                      value={form[key]}
                      onChange={e => setForm({ ...form, [key]: e.target.value })}
                      required
                      style={{
                        background: "var(--surface2)", border: "1px solid var(--border)",
                        padding: ".75rem 1rem", color: "var(--text)",
                        fontFamily: "var(--font-ui)", fontSize: ".88rem",
                        outline: "none", transition: "border-color .2s",
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(232,197,90,.35)"}
                      onBlur={e => e.target.style.borderColor = "var(--border)"}
                    />
                  </div>
                ))}

                <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
                  <label style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", letterSpacing: ".15em", textTransform: "uppercase", color: "var(--dim)" }}>Message</label>
                  <textarea
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    required
                    style={{
                      background: "var(--surface2)", border: "1px solid var(--border)",
                      padding: ".75rem 1rem", color: "var(--text)",
                      fontFamily: "var(--font-ui)", fontSize: ".88rem",
                      outline: "none", resize: "none", minHeight: 130,
                      transition: "border-color .2s",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(232,197,90,.35)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    alignSelf: "flex-start",
                    background: "var(--gold)", color: "var(--bg)",
                    fontFamily: "var(--font-mono)", fontSize: ".7rem",
                    letterSpacing: ".14em", textTransform: "uppercase",
                    border: "none", padding: ".8rem 2rem",
                    cursor: "pointer", transition: "opacity .2s, transform .2s",
                  }}
                  onMouseEnter={e => { e.target.style.opacity = ".85"; e.target.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.transform = ""; }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;
