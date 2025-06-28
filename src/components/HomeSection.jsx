
import React from "react";
import { motion } from "framer-motion";
import { Mail, Eye, Github } from "lucide-react";
import { Link } from 'react-router-dom';
import devImg from "../assets/Luffy1.png"; 

const HomeSection = ({ typewriterText }) => {
  // Select first 3 projects from your projects data
  const featuredProjects = [
    {
      id: 20,
      name: "Anvi.",
      description: "MERN STACK, Jewelley shop , two front end pages for admin and customer",
      tech: ["React", "Node.js", "MongoDB", "Express"],
      category: "MERN",
      image: "📹",
      color: "from-teal-500/20 to-blue-100/20",
      link: "https://anvi-frontend.vercel.app/",
      code: "https://github.com/sooraj4sure/anvi-frontend"
    },
    {
      id: 5,
      name: "WeMeet",
      description: "MERN stack video calling app using Socket.IO and WebRTC.",
      tech: ["React", "Node.js", "MongoDB", "WebRTC", "Socket.IO", "Express"],
      category: "MERN",
      image: "📹",
      color: "from-teal-300/20 to-blue-200/20",
      link: "https://we-meet-video-calling-app.vercel.app/",
      code: "https://github.com/sooraj4sure/WeMeet-Video-calling-app-"
    },
    {
      id: 14,
      name: "My Portfolio",
      description: "Personal portfolio showcasing projects and skills with responsive design.",
      tech: ["React", "CSS", "JavaScript"],
      category: "React",
      image: "🌐",
      color: "from-cyan-300/20 to-blue-400/20",
      link: "https://sooraj-khaki.vercel.app/",
      code: "https://github.com/sooraj4sure/Portfolio2"
    }
  ];

  return (
    <>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="flex justify-center md:justify-start">
            <div className="relative group">
              <div className="rounded-full flex items-center justify-center text-8xl transform hover:scale-105 transition-all duration-500 hover:rotate-3 shadow-2xl shadow-purple-500">
                <motion.img
                  src={devImg}
                  alt=""
                  className="w-80 h-auto shadow-2xl shadow-purple-500 rounded-md transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            </div>
          </div>

          <div className="text-center md:text-left space-y-6">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Hey, I'm{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Sooraj
                </span>
              </h1>
              <div className="text-2xl md:text-3xl text-white/80 mb-6 h-12">
                {typewriterText}
                <span className="animate-pulse">|</span>
              </div>
            </div>

            <p className="text-lg text-white/70 leading-relaxed max-w-lg">
              I craft digital experiences that make people go "wow!" Obsessed with
              clean code, aesthetic design, and pushing the boundaries of what's
              possible on the web.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="mailto:skashyap9711@gmail.com.com?subject=Job%20Opportunity&body=Hi%20there,%20I%20would%20like%20to%20hire%20you."
                className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                <Mail className="inline mr-2" size={20} />
                Contact me
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-4 bg-gradient-to-b from-black/0 to-purple-900/10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <motion.div 
                key={project.id}
                className={`group relative bg-gradient-to-br ${project.color} backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 cursor-pointer`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * project.id }}
                viewport={{ once: true }}
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
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-300"
                  >
                    <Eye size={16} className="mr-2" />
                    Live Demo
                  </a>

                  {project.code && (
                    <a
                      href={project.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-white/10 text-white/80 rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  )}
                </div>

                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>

          {/* <div className="text-center mt-12">
            <a 
              to="/projects" 
              className="inline-block px-6 py-3 border border-purple-400 text-purple-400 font-medium rounded-full hover:bg-purple-400/10 transition-colors duration-300"
            >
              View All Projects
            </a>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default HomeSection;