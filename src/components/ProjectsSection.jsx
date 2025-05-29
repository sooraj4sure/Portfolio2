import React from 'react';
import { Eye, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: "Neon Dashboard",
    description: "A futuristic admin dashboard with glassmorphism design and real-time data visualization",
    tech: ["React", "TypeScript", "D3.js", "Tailwind"],
    category: "React",
    image: "🎛️",
    color: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 2,
    name: "Vibe Music App",
    description: "A Spotify-inspired music streaming app with playlist management and audio visualization",
    tech: ["React", "Node.js", "MongoDB", "Web Audio API"],
    category: "React",
    image: "🎵",
    color: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 3,
    name: "Retro Game Hub",
    description: "Classic arcade games recreated with modern web technologies and pixel-perfect animations",
    tech: ["JavaScript", "Canvas API", "CSS3", "HTML5"],
    category: "JavaScript",
    image: "🕹️",
    color: "from-green-500/20 to-teal-500/20"
  },
  {
    id: 4,
    name: "Aesthetic Blog",
    description: "A minimalist blogging platform with markdown support and aesthetic typography",
    tech: ["Next.js", "MDX", "Styled Components"],
    category: "Design",
    image: "✨",
    color: "from-orange-500/20 to-red-500/20"
  }
];

const ProjectsSection = ({ selectedFilter, setSelectedFilter }) => {
  const filteredProjects = selectedFilter === 'all'
    ? projects
    : projects.filter(project => project.category.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>

          <div className="flex flex-wrap justify-center gap-4">
            {["all", "react", "javascript", "design"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`group relative bg-gradient-to-br ${project.color} backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer`}
            >
              <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>

              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">
                {project.name}
              </h3>

              <p className="text-white/70 mb-6 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white/10 text-white/80 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="flex items-center px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300">
                  <Eye size={16} className="mr-2" />
                  Live Demo
                </button>
                <button className="flex items-center px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <Github size={16} className="mr-2" />
                  Code
                </button>
              </div>

              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
