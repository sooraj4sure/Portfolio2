import React, { useState, useEffect } from "react";
import "./styles/globals.css";

import Navbar          from "./components/Navbar";
import HomeSection     from "./components/HomeSection";
import AboutSection    from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection   from "./components/SkillsSection";
import CertificateSection from "./components/CertificateSection";
import ContactSection  from "./components/ContactSection";

/* ── section divider ── */
const Divider = () => (
  <div style={{
    width: "100%", height: 1,
    background: "linear-gradient(90deg, transparent, rgba(255,255,255,.1) 20%, rgba(255,255,255,.1) 80%, transparent)",
  }} />
);

/* ── footer ── */
const Footer = () => (
  <footer style={{
    padding: "2rem",
    borderTop: "1px solid var(--border)",
    display: "flex", alignItems: "center",
    justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
    background: "var(--bg)",
  }}>
    <p style={{ fontFamily: "var(--font-display)", fontSize: "1.1rem", color: "var(--text)" }}>
      Sooraj<span style={{ color: "var(--gold)" }}>.</span>
    </p>
    <p style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".1em" }}>
      © 2025 Sooraj Kashyap · ML Engineer · Full-Stack Dev
    </p>
    <p style={{ fontFamily: "var(--font-mono)", fontSize: ".6rem", color: "var(--dim)", letterSpacing: ".1em" }}>
      Delhi, India
    </p>
  </footer>
);

const SECTION_IDS = ["home","about","experience","projects","skills","certificates","contact"];

const App = () => {
  const [activeSection, setActiveSection] = useState("home");

  /* ── scroll-spy ── */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 160;
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ── reveal observer ── */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: "-20px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main>
        <HomeSection     setActiveSection={setActiveSection} />
        <Divider />
        <AboutSection    />
        <Divider />
        <SkillsSection   />
        <Divider />
        <ProjectsSection />
        <Divider />
        <ExperienceSection />
        <Divider />
        <CertificateSection />
        <Divider />
        <ContactSection  />
      </main>

      <Footer />
    </div>
  );
};

export default App;
