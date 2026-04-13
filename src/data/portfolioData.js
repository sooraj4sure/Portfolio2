// ─────────────────────────────────────────
// CERTIFICATES
// ─────────────────────────────────────────
export const certificates = [
  {
    title: "Programming With Python",
    issuer: "Harvard University",
    date: "July 2025",
    image: "/certificates/CS50P.png",
    rank: "S",
    domain: "CS / AI",
  },
    {
    title: "Prompt Engineering",
    issuer: "Columbia +",
    date: "August 2025",
    image: "/certificates/PE_Columbia+.jpg",
    rank: "S",
    domain: "CS / AI",
  },
  {
    title: "Cybersecurity Skilling Program",
    issuer: "C3iHub IIT Kanpur",
    date: "June 2023",
    image: "/certificates/CyberIIT.jpg",
    rank: "A",
    domain: "Security",
  },
  {
    title: "3D Modelling by Autodesk",
    issuer: "Cognizance'22 IIT Roorkee",
    date: "March 2022",
    image: "/certificates/Autodesk.jpg",
    rank: "A",
    domain: "Design",
  },

  {
    title: "Cloud Computing",
    issuer: "NIELIT Delhi",
    date: "January 2025",
    image: "/certificates/CC_NIELIT.jpg",
    rank: "B",
    domain: "CS",
  },


  {
    title: "Software Engineering Virtual Experience",
    issuer: "HP x Forage",
    date: "November 2022",
    image: "/certificates/hp.jpg",
    rank: "B",
    domain: "Engineering",
  },
  {
    title: "Google Workspace Administrator",
    issuer: "Google Cloud x Coursera",
    date: "March 2024",
    image: "/certificates/GoogleWorkspace.jpg",
    rank: "A",
    domain: "Cloud",
  },
  {
    title: "Machine Learning to Deep Learning",
    issuer: "ISRO",
    date: "July 2022",
    image: "/certificates/ISRO-ML.jpg",
    rank: "S",
    domain: "ML / AI",
  },
  {
    title: "Basics of Remote Sensing & GIS",
    issuer: "ISRO",
    date: "November 2022",
    image: "/certificates/RemoteSensing.jpg",
    rank: "B",
    domain: "Data Science",
  },

  {
    title: "Campus Ambassador",
    issuer: "IIT Delhi",
    date: "December 2025",
    image: "/certificates/IIT_D.jpg",
    rank: "B",
    domain: "IT",
  },
  {
    title: "Machine Learning Intern",
    issuer: "CODEC Technologies",
    date: "01/12/2025 - 01/04/2026",
    image: "/certificates/Codec_ml_int.jpg",
    rank: "A",
    domain: "AI / ML",
  },

  {
    title: "Data Science Intern",
    issuer: "CODEC Technologies",
    date: "01/10/2025 - 26/11/2025",
    image: "/certificates/IIT_BHU_INT.jpg",
    rank: "A",
    domain: "DS / ML",
  },

];

// ─────────────────────────────────────────
// PROJECTS  (ML + full project list)
// ─────────────────────────────────────────
export const projects = [
  // ── NEW ML Projects ──
  { id: "ml1", name: "Resume Lab",        type: "ML · NLP",          desc: "AI resume analyzer that parses CVs, scores them against job descriptions using NLP, and gives ATS optimization feedback.",          tech: ["Python","NLP","Streamlit","Scikit-learn"], link: "https://resume-lab.streamlit.app/",        code: "https://github.com/sooraj4sure/Resume-lab",                            featured: true, isML: true },
  { id: "ml2", name: "CineMatch",         type: "ML · Recommendation",desc: "Movie recommendation engine using collaborative filtering. Input preferences → get personalized picks with similarity scores.",  tech: ["Python","Pandas","Cosine Similarity","Streamlit"], link: "https://cinematch4u.streamlit.app/",   code: "https://github.com/sooraj4sure/Movie-Recommendation-ML-Model",         featured: false, isML: true },
  { id: "ml3", name: "EmoSenseAI",        type: "NLP · Emotion AI",  desc: "Emotion detection trained on text data using NLP preprocessing and ML classifiers. Real-time emotion classification via web UI.", tech: ["Python","NLTK","Scikit-learn","EDA","Streamlit"], link: "https://emosenseai.streamlit.app",     code: "https://github.com/sooraj4sure/Emotion-EDA-NLP-ML-model",             featured: true, isML: true },
  { id: "ml4", name: "HeartDisease Predictor", type: "ML · Healthcare",  desc: "Binary classification model predicting heart disease risk from clinical parameters. Feature importance + XGBoost comparison.", tech: ["Python","XGBoost","Matplotlib","Streamlit"], link: "https://heartdiseasemodel.streamlit.app/", code: "https://github.com/sooraj4sure/Heart-disease-DS-",                  featured: false, isML: true },
  { id: "ml5", name: "VelvetPaw",         type: "Full-Stack · React", desc: "Data collection platform for pet-related content. Form-driven pipelines, real-time validation, polished React frontend.",         tech: ["React","Node.js","MongoDB","Tailwind"],    link: "https://velvetpow.vercel.app/",            code: "https://github.com/sooraj4sure/velvetpow",                             featured: false, isML: false },
  // ── Existing Projects ──
  // { id: 25, name: "Sketi",           type: "React · AI",        desc: "Painting generation using HuggingFace API",                                               tech: ["React","JavaScript"],                          link: "https://sketi.onrender.com/",                                  code: "https://github.com/sooraj4sure/Sketi.git",                              featured: false, isML: false },
  { id: 20, name: "Anvi.",           type: "MERN",               desc: "MERN jewellery shop — admin & customer portals",                                          tech: ["React","Node.js","MongoDB","Express"],          link: "https://anvi-frontend.vercel.app/",                            code: "https://github.com/sooraj4sure/anvi-frontend",                          featured: false, isML: false },
  // { id: 26, name: "Sylvie",       type: "AI Chatbot",         desc: "AI chatbot powered by Groq API with text support",                                        tech: ["React","Node.js","Express","Groq"],             link: "https://sylvie-pink.vercel.app/",                              code: "",                                                                      featured: false, isML: false },
  { id: 5,  name: "WeMeet",          type: "MERN · WebRTC",      desc: "Real-time video calling app with WebRTC & Socket.IO",                                     tech: ["React","Node.js","WebRTC","Socket.IO"],         link: "https://we-meet-video-calling-app.vercel.app/",                code: "https://github.com/sooraj4sure/WeMeet-Video-calling-app-",              featured: false, isML: false },
  { id: 13, name: "Satvic Movement", type: "React · UI",          desc: "Start your day with a yoga class",                                                       tech: ["React"],                                        link: "https://satvic-movement-three.vercel.app/",                      code: "https://github.com/sooraj4sure/Satvic-Movement",           featured: false, isML: false },
  { id: 10, name: "JokeSplash",      type: "React · Design · API",     desc: "Get Random Jokes.",                                                                  tech: ["React","CSS","API"],                                  link: "https://random-joke-generator-react-js.vercel.app/",         code: "https://github.com/sooraj4sure/Random-joke-generator-react.js-",                    featured: false, isML: false },
  { id: 97, name: "EDA in Banking",  type: "Data Science",         desc: "Exploratory data analysis on banking datasets — pivot tables, trend visualizations",      tech: ["Python","Pandas","NumPy","Matplotlib"],         link: "",                                                             code: "https://github.com/sooraj4sure/Banking-EDA-Python.git",                featured: false, isML: true  },
  { id: 99, name: "Loan Approval",   type: "Machine Learning",     desc: "ML classification model predicting loan approvals from financial indicators",             tech: ["Python","Pandas","Scikit-learn","Seaborn"],     link: "",                                                             code: "https://github.com/sooraj4sure/Loan-Approval-Prediction.git",          featured: false, isML: true  },
  { id: 98, name: "Churn Analysis",  type: "Data Science",         desc: "Banking churn pattern deep-dive to uncover key retention factors via EDA",               tech: ["Python","Pandas","Matplotlib","EDA"],           link: "",                                                             code: "https://github.com/sooraj4sure/Banking-Customer-Churn-Analysis.git",   featured: false, isML: true  },
  { id: 15, name: "Solar System",    type: "JavaScript · 3D",      desc: "Interactive 3D solar system built with Three.js",                                         tech: ["Three.js","CSS","JavaScript"],                  link: "https://solar-system-three-silk.vercel.app/",                  code: "https://github.com/sooraj4sure/solar-system",                           featured: false, isML: false },
  // { id: 9,  name: "Student Dashboard",type: "React · Firebase",  desc: "React dashboard with Firebase auth and real-time student data",                          tech: ["React","Firebase"],                             link: "https://student-dashboard-yxxf.vercel.app/",                  code: "https://github.com/sooraj4sure/student-dashboard",                     featured: false, isML: false },
  // { id: 12, name: "Employee Manager", type: "MERN",               desc: "Full-stack dashboard for employee management with role-based access",                    tech: ["React","Node.js","MongoDB","Express"],          link: "https://employee-management-system-sigma-nine.vercel.app/",   code: "https://github.com/sooraj4sure/Employee-Management-System",            featured: false, isML: false },
  // { id: 7,  name: "Weather App",     type: "React · API",        desc: "Dynamic weather app with real-time API data and responsive UI",                          tech: ["React","API","CSS"],                            link: "https://weather-mrriu5d1v-soorajs-projects-e8a2060f.vercel.app/", code: "https://github.com/sooraj4sure/Weather-App",                      featured: false, isML: false },
  // { id: 8,  name: "SoftSell",        type: "React · UI",         desc: "Landing page for used software license marketplace",                                      tech: ["React","Tailwind"],                             link: "https://satvic-movement-three.vercel.app/",                            code: "https://github.com/sooraj4sure/Softsell",                               featured: false, isML: false },
  // { id: 10, name: "Spotify Clone",   type: "React · Design",     desc: "Spotify-inspired React landing page with sleek layout",                                  tech: ["React","CSS"],                                  link: "https://spotify-landing-page-gamma.vercel.app/",               code: "https://github.com/sooraj4sure/SpotifyLandingPage",                    featured: false, isML: false },
];

// ─────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────
export const skillGroups = [
  { id: "frontend",    label: "Front-End",          color: "#38bdf8", skills: ["React","JavaScript","HTML","CSS","Tailwind CSS","Bootstrap","Material UI","Responsive Design","UI/UX Design"] },
  { id: "backend",     label: "Back-End & Database", color: "#34d399", skills: ["Node.js","Express.js","MongoDB","MySQL","REST API"] },
  { id: "languages",   label: "Languages",           color: "#f59e0b", skills: ["Python","JavaScript","Java","C","C++"] },
  { id: "datascience", label: "Data Science & ML",   color: "#fb7185", skills: ["NumPy","Pandas","Matplotlib","Seaborn","Plotly","Scikit-learn","Jupyter Notebook","EDA","XGBoost"] },
  { id: "ai",          label: "AI & APIs",           color: "#a78bfa", skills: ["Groq API","HuggingFace","OpenAI API","LLMs","NLP"] },
  { id: "tools",       label: "Tools & Misc",        color: "#94a3b8", skills: ["Git","GitHub","WebRTC","Socket.IO","Firebase","Three.js","Streamlit"] },
];

// ─────────────────────────────────────────
// EXPERIENCE
// ─────────────────────────────────────────
export const experience = [
  {
    period: "Apr 2026 – Present",
    title: "Machine Learning Developer",
    company: "Freelance / Self-Initiated",
    color: "#e8c55a",
    desc: "Designed and deployed production-ready ML applications covering NLP, predictive analytics, and recommender systems. Built end-to-end pipelines from data collection through model training, evaluation, and Streamlit deployment.",
    tags: ["Python","Scikit-learn","Streamlit","NLP","EDA","XGBoost"],
  },
    {
    period: "Dec 2025 – Apr 2026",
    title: "Machine Learning Intern",
    company: "Codec Technologies",
    color: "#e8c55a",
    desc: "Designed and deployed production-ready ML applications covering NLP, predictive analytics, and recommender systems. Built end-to-end pipelines from data collection through model training, evaluation, and Streamlit deployment.",
    tags: ["Python","Scikit-learn","Numpy","Pandas","EDA"],
  },
  {
    period: "Oct 2025 – Dec - 2025",
    title: "Data Science Intern",
    company: "Technex'25 by IIT-BHU",
    color: "#e8c55a",
    desc: "Built full-stack MERN applications with RESTful APIs, real-time features using WebRTC & Socket.IO, and responsive UIs. Gained hands-on experience with MongoDB, Express.js, and Node.js backend architecture.",
    tags: ["Python","Matplotlib","Seaborn","Scikit-learn","Numpy","Pandas","EDA"],
  },
    {
    period: "2025 – 2025",
    title: "Full-Stack Web Developer",
    company: "Academic & Personal Projects",
    color: "#e8c55a",
    desc: "Built full-stack MERN applications with RESTful APIs, real-time features using WebRTC & Socket.IO, and responsive UIs. Gained hands-on experience with MongoDB, Express.js, and Node.js backend architecture.",
    tags: ["React","Node.js","MongoDB","Express","Tailwind","WebRTC","Socket.IO"],
  },
];

// ─────────────────────────────────────────
// ABOUT — quick facts + skill bars
// ─────────────────────────────────────────
export const quickFacts = [
  { key: "Location",      val: "Delhi, India" },
  { key: "Status",        val: "Open to Opportunities", accent: true },
  { key: "Focus",         val: "ML · Full-Stack · Data Science" },
  { key: "Primary Stack", val: "MERN + Python" },
  { key: "Preferred Role",val: "ML Engineer / Full-Stack Dev" },
];

export const coreBars = [
  { label: "Machine Learning", pct: 88, color: "#2dd4bf" },
  { label: "Full-Stack Dev",   pct: 85, color: "#e8c55a" },
  { label: "Data Science",     pct: 82, color: "#a78bfa" },
  { label: "AI & LLMs",        pct: 75, color: "#fb7185" },
];

// ─────────────────────────────────────────
// SOCIALS / CONTACT
// ─────────────────────────────────────────
export const socials = [
  { name: "GitHub",    sub: "sooraj4sure",   link: "https://github.com/sooraj4sure",                                    icon: "github"    },
  { name: "LinkedIn",  sub: "suraj-kashyap", link: "https://www.linkedin.com/in/suraj-kashyap-78627b243/",              icon: "linkedin"  },
  { name: "X / Twitter", sub: "@sooraj4sure",link: "https://x.com/sooraj4sure",                                         icon: "x"         },
  { name: "Instagram", sub: "@sooraj4sure",  link: "https://www.instagram.com/sooraj4sure/",                            icon: "instagram" },
  { name: "Email",     sub: "sooraj4sure@gmail.com", link: "mailto:sooraj4sure@gmail.com",                              icon: "email"     },
];
