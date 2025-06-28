import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ activeSection, setActiveSection, isMenuOpen, setIsMenuOpen }) => {
  const sections = ['home', 'about', 'projects', 'skills',  'contact'];
//   'testimonials'

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Sooraj
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`capitalize transition-all duration-300 hover:text-purple-400 ${
                  activeSection === section ? 'text-purple-400 font-semibold' : 'text-white/80'
                }`}
              >
                {section}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left py-2 capitalize transition-all duration-300 ${
                  activeSection === section ? 'text-purple-400 font-semibold' : 'text-white/80'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
