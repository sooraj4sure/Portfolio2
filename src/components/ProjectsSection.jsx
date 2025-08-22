import React from "react";
import { Eye, Github } from "lucide-react";

const projects = [
  {
    id: 25,
    name: "Sketi",
    description: "React, Painting generation , using HuggingFace API",
    tech: ["React", "Javascript"],
    category: "React",
    image: "🖼️",
    color: "from-green-300/20 to-red-200/20",
    link: "https://sketi.onrender.com/",
    code: "https://github.com/sooraj4sure/Sketi.git",
  },

  {
    id: 20,
    name: "Anvi.",
    description:
      "MERN STACK, jewellery shop , two front end pages for admin and customer ",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    category: "MERN",
    image: "💎",
    color: "from-teal-200/20 to-green-100/20",
    link: "https://anvi-frontend.vercel.app/",
    code: "https://github.com/sooraj4sure/anvi-frontend",
  },
  {
    id: 26,
    name: "Sylvie",
    description: "React ,Express.js, AI chat bot, Text support , Groq Api",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    category: "MERN",
    image: "🤖",
    color: "from-blue-400/20 to-pink-100/20",
    link: "https://sylvie-pink.vercel.app/",
    code: "",
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
    code: "https://github.com/sooraj4sure/WeMeet-Video-calling-app-",
  },

  {
    id: 14,
    name: "My Portfolio ",
    description:
      "Personal portfolio showcasing projects and skills with responsive design.",
    tech: ["React", "CSS", "JavaScript"],
    category: "React",
    image: "🌐",
    color: "from-cyan-300/20 to-blue-400/20",
    link: "https://sooraj-khaki.vercel.app/",
    code: "https://github.com/sooraj4sure/Portfolio2",
  },
  {
    id: 1,
    name: "Random Joke (Joker)",
    description:
      "A lightweight web app that fetches and displays random jokes from a public API with a clean UI and instant joke refresh.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "JavaScript",
    image: "🃏",
    color: "from-yellow-200/20 to-orange-300/20",
    link: "https://random-joke-generator-react-js.vercel.app/",
    code: "https://github.com/sooraj4sure/Random-joke-generator-react.js-",
  },

  {
    id: 3,
    name: "Rock-Paper-Scissor Game",
    description:
      "Play against the computer with randomized logic and score tracking.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "JavaScript",
    image: "✊✋✌️",
    color: "from-pink-200/20 to-yellow-200/20",
    link: "https://rock-paper-scissor-one-drab.vercel.app/",
    code: "https://github.com/sooraj4sure/Rock-Paper-Scissor",
  },
  {
    id: 97,
    name: "EDA in Banking Using Python",
    description:
      "Performed exploratory data analysis on a banking dataset using Pandas. Created and analyzed pivot tables, and visualized trends with multiple plots.",
    tech: ["Python", "Jupyter Notebook", "Pandas", "NumPy", "Matplotlib"],
    category: "Data Science",
    image: "📊",
    color: "from-blue-200/20 to-green-200/20",
    // link: "https://your-link-here.com",
    code: "https://github.com/sooraj4sure/Banking-EDA-Python.git",
  },
  {
    id: 99,
    name: "Loan Approval Prediction",
    description:
      "Built a machine learning model to predict loan approvals based on income, employment type, credit score, and loan amount using classification algorithms.",
    tech: [
      "Python",
      "Jupyter Notebook",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
    ],
    category: "Machine Learning",
    image: "💳",
    color: "from-purple-200/20 to-pink-200/20",
    // link: "https://your-link-here.com",
    code: "https://github.com/sooraj4sure/Loan-Approval-Prediction.git",
  },
  {
    id: 98,
    name: "Banking Customer Churn Analysis",
    description:
      "Analyzed customer churn patterns in the banking sector with in-depth EDA to identify key factors influencing customer retention.",
    tech: ["Python", "Jupyter Notebook", "Pandas", "NumPy", "Matplotlib"],
    category: "Data Science",
    image: "🏦",
    color: "from-yellow-200/20 to-red-200/20",
    // link: "https://your-link-here.com",
    code: "https://github.com/sooraj4sure/Banking-Customer-Churn-Analysis.git",
  },
  {
    id: 15,
    name: "Solar-System",
    description: "Solar system with Three.js and JavaScript.",
    tech: ["Three.js", "CSS", "JavaScript"],
    category: "JavaScript",
    image: "💫",
    color: "from-pink-200/20 to-yellow-200/20",
    link: "https://solar-system-three-silk.vercel.app/",
    code: "https://github.com/sooraj4sure/solar-system",
  },

  {
    id: 4,
    name: "My Portfolio 2",
    description:
      "Personal portfolio showcasing projects and skills with responsive design.",
    tech: ["React", "CSS", "JavaScript"],
    category: "React",
    image: "🌐",
    color: "from-cyan-300/20 to-blue-400/20",
    link: "https://sooraj-khaki.vercel.app/",
    code: "https://github.com/sooraj4sure/My-Portfolio",
  },

  {
    id: 2,
    name: "Tic Tac Toe Game",
    description:
      "Classic 2-player game with real-time win detection and clean UI.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "JavaScript",
    image: "❌⭕",
    color: "from-blue-300/20 to-indigo-300/20",
    link: "https://tic-tac-toe-ten-phi-32.vercel.app/",
    code: "https://github.com/sooraj4sure/TicTacToe",
  },
  {
    id: 6,
    name: "Satvic Movement",
    description:
      "Responsive clone of the Satvic Movement's 21-Day Yoga Sadhana page.",
    tech: ["HTML", "CSS", "JavaScript"],
    category: "Design",
    image: "🧘",
    color: "from-green-200/20 to-lime-200/20",
    link: "https://satvic-movement-three.vercel.app/",
    code: "https://github.com/sooraj4sure/Satvic-Movement",
  },
  {
    id: 7,
    name: "Weather App",
    description:
      "Dynamic weather app with real-time API data and responsive UI.",
    tech: ["React", "API", "CSS"],
    category: "React",
    image: "☁️",
    color: "from-sky-300/20 to-blue-300/20",
    link: "https://weather-mrriu5d1v-soorajs-projects-e8a2060f.vercel.app/",
    code: "https://github.com/sooraj4sure/Weather-App",
  },
  {
    id: 8,
    name: "SoftSell (UI)",
    description:
      "Landing page for used software license marketplace with modern UI.",
    tech: ["React", "Tailwind"],
    category: "Design",
    image: "💽",
    color: "from-fuchsia-200/20 to-violet-200/20",
    link: "https://softsell-7isf.vercel.app/",
    code: "https://github.com/sooraj4sure/Softsell",
  },
  {
    id: 9,
    name: "Student Dashboard",
    description:
      "React-based dashboard with Firebase auth and real-time student data.",
    tech: ["React", "Firebase"],
    category: "React",
    image: "🎓",
    color: "from-rose-200/20 to-amber-200/20",
    link: "https://student-dashboard-yxxf.vercel.app/",
    code: "https://github.com/sooraj4sure/student-dashboard",
  },
  {
    id: 10,
    name: "Spotify Landing Page (Desktop)",
    description:
      "Spotify-inspired React landing page with sleek layout (desktop only).",
    tech: ["React", "CSS"],
    category: "Design",
    image: "🎵",
    color: "from-green-400/20 to-black/20",
    link: "https://spotify-landing-page-gamma.vercel.app/",
    code: "https://github.com/sooraj4sure/SpotifyLandingPage",
  },
  {
    id: 11,
    name: "User Dashboard (Avatars)",
    description:
      "Responsive user dashboard with authentication and real-time profile management.",
    tech: ["React", "Firebase"],
    category: "React",
    image: "👤",
    color: "from-gray-200/20 to-blue-200/20",
    link: "https://user-dashboard-nine-smoky.vercel.app/",
    code: "https://github.com/sooraj4sure/UserDashboard-assignment-",
  },
  {
    id: 12,
    name: "Employee Management System",
    description:
      "Full-stack dashboard for employee management with role-based access.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    category: "MERN",
    image: "👥",
    color: "from-orange-300/20 to-yellow-300/20",
    link: "https://employee-management-system-sigma-nine.vercel.app/",
    code: "https://github.com/sooraj4sure/Employee-Management-System",
  },
  {
    id: 13,
    name: "Heavenly Stays",
    description: "MERN Airbnb-style platform for unique property rentals.",
    tech: ["React", "Node.js", "MongoDB", "Express"],
    category: "MERN",
    image: "🏠",
    color: "from-pink-300/20 to-rose-300/20",
    // link: "https://github.com/sooraj4sure/Havenly-Stays--MERN-project",
    code: "https://github.com/sooraj4sure/Havenly-Stays--MERN-project",
  },
];
// ... Add the rest with optional code link

const ProjectsSection = ({ selectedFilter, setSelectedFilter }) => {
  const filteredProjects =
    selectedFilter === "all"
      ? projects
      : projects.filter(
          (project) =>
            project.category.toLowerCase() === selectedFilter.toLowerCase()
        );

  return (
    <section className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
            My Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>

          <div className="flex flex-wrap justify-center gap-4">
            {["all", "react", "javascript", "MERN", "Design"].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
                  selectedFilter === filter
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
