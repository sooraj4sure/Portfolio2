import React from 'react';
import { Coffee, Zap, SunSnow  } from 'lucide-react';

const AboutSection = () => (
  <section className="min-h-screen flex items-center py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          About Me
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="text-6xl text-center mb-8">🚀</div>
          <h3 className="text-3xl font-bold text-white mb-4">My Story</h3>
          <p className="text-white/80 text-lg leading-relaxed">
            Started coding at 19 with a simple "Hello World" that sparked an obsession. Fast-forward to today, I'm a full-stack developer who believes great design and clean code can change the world, one pixel at a time.
          </p>
          <p className="text-white/80 text-lg leading-relaxed">
            When I'm not crafting digital experiences, you'll find me exploring new design trends, contributing to open source, or probably overthinking the perfect gradient combination. ✨
          </p>

          <div className="flex flex-wrap gap-4 pt-6">
            <div className="flex items-center text-purple-400">
              <Coffee size={20} className="mr-2" />
              Coffee Addict
            </div>
            <div className="flex items-center text-green-200">
              <SunSnow size={20} className="mr-2" />
              Web-Weaver
            </div>
            <div className="flex items-center text-cyan-400">
              <Zap size={20} className="mr-2" />
              Problem Solver
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h4 className="text-2xl font-bold text-white mb-6">Quick Facts</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70">Location</span>
                <span className="text-white font-semibold">Delhi, India</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Experience</span>
                <span className="text-white font-semibold">Fresher</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Favorite Stack</span>
                <span className="text-white font-semibold">React / MERN</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70">Superpower</span>
                <span className="text-white font-semibold">React Wizardry</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
