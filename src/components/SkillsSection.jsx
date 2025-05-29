import React from 'react';

const skills = [
    //removing skill % for now 
  { name: "React", level: 95, icon: "⚛️" },
  { name: "JavaScript", level: 90, icon: "📈" },
  { name: "TypeScript", level: 85, icon: "📊" },
  { name: "CSS/SCSS", level: 92, icon: "🎨" },
  { name: "Node.js", level: 80, icon: "🟢" },
  { name: "UI/UX Design", level: 88, icon: "🎭" }
];

const SkillsSection = () => (
  <section className="min-h-screen flex items-center py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Skills & Expertise
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 group"
          >
            <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </div>

            <h3 className="text-xl font-bold text-white mb-4 text-center">
              {skill.name}
            </h3>

            <div className="relative">
              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${skill.level}%`,
                    transitionDelay: `${index * 100}ms`
                  }}
                ></div>
              </div>
              <span className="absolute -top-8 right-0 text-white/70 text-sm font-semibold">
                {/* {skill.level}% */}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
