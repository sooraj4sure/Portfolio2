import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "home",         label: "Home"         },
  { id: "about",        label: "About"        },
  { id: "experience",   label: "Experience"   },
  { id: "projects",     label: "Projects"     },
  { id: "skills",       label: "Skills"       },
  { id: "certificates", label: "Certificates" },
  { id: "contact",      label: "Contact"      },
];

const Navbar = ({ activeSection, setActiveSection }) => {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNav = (id) => {
    setActiveSection(id);
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <style>{`
        .nav-link-item { position: relative; }
        .nav-link-item::after {
          content: '';
          position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width .25s ease;
        }
        .nav-link-item:hover::after,
        .nav-link-item.active::after { width: 100%; }
      `}</style>

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: .6, ease: [.23,1,.32,1] }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          padding: "1rem 2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background:   scrolled ? "rgba(8,12,16,.94)" : "transparent",
          backdropFilter: scrolled ? "blur(22px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "background .35s, backdrop-filter .35s, border-color .35s",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("home")}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.25rem",
            color: "var(--text)",
            background: "none", border: "none", cursor: "pointer",
          }}
        >
          Sooraj<span style={{ color: "var(--gold)" }}>.</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => handleNav(l.id)}
              className={`nav-link-item${activeSection === l.id ? " active" : ""}`}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: ".68rem",
                letterSpacing: ".14em",
                textTransform: "uppercase",
                color: activeSection === l.id ? "var(--gold)" : "var(--muted)",
                background: "none", border: "none", cursor: "pointer",
                transition: "color .2s",
              }}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* CTA */}
        <a
          href="mailto:sooraj4sure@gmail.com"
          className="hidden md:flex"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: ".68rem",
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "var(--gold)",
            border: "1px solid rgba(232,197,90,.3)",
            padding: ".45rem 1.1rem",
            textDecoration: "none",
            transition: "background .2s, color .2s",
          }}
          onMouseEnter={e => { e.target.style.background = "var(--gold)"; e.target.style.color = "var(--bg)"; }}
          onMouseLeave={e => { e.target.style.background = ""; e.target.style.color = "var(--gold)"; }}
        >
          Hire Me
        </a>

        {/* Mobile burger */}
        <button
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text)", display: "none" }}
          className="md:hidden block"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: .25 }}
            style={{
              position: "fixed", top: "60px", left: 0, right: 0, zIndex: 999,
              background: "rgba(8,12,16,.98)", backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              padding: "1.5rem 2rem",
            }}
          >
            {LINKS.map((l, i) => (
              <motion.button
                key={l.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * .05 }}
                onClick={() => handleNav(l.id)}
                style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: ".75rem 0",
                  fontFamily: "var(--font-mono)", fontSize: ".75rem",
                  letterSpacing: ".14em", textTransform: "uppercase",
                  color: activeSection === l.id ? "var(--gold)" : "var(--muted)",
                  background: "none", border: "none", cursor: "pointer",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
