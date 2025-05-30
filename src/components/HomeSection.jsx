import React from "react";
import { Mail, Download, Contact } from "lucide-react";
import { Link } from 'react-router-dom';


const HomeSection = ({ typewriterText }) => (
  <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"
          // style={{
          //   left: `${Math.random() * 100}%`,
          //   top: `${Math.random() * 100}%`,
          //   animationDelay: `${Math.random() * 2}s`,
          //   animationDuration: `${2 + Math.random() * 3}s`,
          // }}
        />
      ))}
    </div>

    <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative z-10">
      <div className="flex justify-center md:justify-start">
        <div className="relative group">
          <div className=" rounded-full flex items-center justify-center text-8xl transform hover:scale-105 transition-all duration-500 hover:rotate-3 shadow-2xl shadow-purple-500">
            {/* bg-gradient-to-br from-purple-500/20 to-pink-500/20 */}
            {/* 👩‍💻  */}
            <img
              src="./src/assets/luffy1.png"
              alt=""
              className="w-80 h-auto shadow-2xl shadow-purple-500 rounded-md transition-transform duration-300 ease-in-out hover:scale-110"
              //if you remove the shadow from image square box will remove
            />
          </div>
          {/* <div className="absolute bg-gradient-to-r from-purple-200 via-pink-200 to-white  opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500"></div> */}
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
            Hire Me
          </a>

          {/* <a
            href="https://api.whatsapp.com/send/?phone=918920078883&text&type=phone_number&app_absent=0"
            className="px-8 py-3 border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transform hover:scale-105 transition-all duration-300 inline-flex items-center"
          >
            <Contact className="inline mr-2" size={20} />
            Contact me
          </a> */}
        </div>
      </div>
    </div>
  </section>
);

export default HomeSection;
