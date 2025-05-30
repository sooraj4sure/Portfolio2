import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  MessageCircle,  
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

import Navbar from "./components/Navbar";
import HomeSection from "./components/HomeSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import SkillsSection from "./components/SkillsSection";
// import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";

const App = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(window.innerWidth > 768);
  const [typewriterText, setTypewriterText] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const fullText = "Frontend Developer & Creative Coder";

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowCursor(window.innerWidth > 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "home":
        return <HomeSection typewriterText={typewriterText} />;
      case "about":
        return <AboutSection />;
      case "projects":
        return (
          <ProjectsSection
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
          />
        );
      case "skills":
        return <SkillsSection />;
      // case "testimonials":
      //   return <TestimonialsSection />;
      case "contact":
        return (
          <ContactSection
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
            submitMessage={submitMessage}
            handleFormSubmit={() => {
              setIsSubmitting(true);
              setTimeout(() => {
                setIsSubmitting(false);
                setSubmitMessage("Message sent! I'll get back to you soon ✨");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setSubmitMessage(""), 3000);
              }, 1000);
            }}
          />
        );
      default:
        return <HomeSection typewriterText={typewriterText} />;
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-red-950 text-white overflow-x-hidden"
    >
      {/* Custom Cursor - only on desktop */}
      {showCursor && (
        <div
          className="fixed w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
          style={{
            left: mousePosition.x - 12,
            top: mousePosition.y - 12,
            transform: "scale(1)",
          }}
        />
      )}

      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <main className="pt-20">{renderActiveSection()}</main>

      {/* Footer (commented for now) */}
      {/* <footer className="bg-black/20 backdrop-blur-xl border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white/60">
            Made with 💜 by Sooraj • © 2025 All rights reserved
          </p>
        </div>
      </footer> */}
    </div>
  );
};

export default App;
