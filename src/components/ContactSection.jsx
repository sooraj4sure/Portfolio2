import React from "react";
import {
  Mail,
  MessageCircle,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  ArrowRight,
  X,
} from "lucide-react";

const ContactSection = ({
  formData,
  setFormData,
  isSubmitting,
  submitMessage,
  handleFormSubmit,
}) => (
  <section className="min-h-screen flex items-center py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          Let's Connect
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full mb-8"></div>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Ready to create something amazing together? Drop me a message and
          let's make it happen! ✨
        </p>
      </div>

      <div className="grid ">
        {/* md:grid-cols-2 gap-12 (grid style for msg box ) */}

        {/* <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>

          <div className="space-y-6">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors duration-300"
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors duration-300"
            />
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows="5"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors duration-300 resize-none"
            ></textarea>

            <button
              onClick={handleFormSubmit}
              disabled={isSubmitting}
              className="w-full px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/25 disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
              {!isSubmitting && <ArrowRight className="inline ml-2" size={20} />}
            </button>
          </div>

          {submitMessage && (
            <div className="mt-4 p-4 bg-green-500/20 border border-green-400/50 rounded-lg text-green-300 text-center">
              {submitMessage}
            </div>
          )}
        </div> */}
        {/* //send msg section  */}

        <div className="space-y-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center text-white/80">
                <Mail className="mr-4 text-purple-400" size={24} />
                <span>skashyap9711@gmail.com</span>
              </div>
              <div className="flex items-center text-white/80">
                <MessageCircle className="mr-4 text-pink-400" size={24} />
                <span>Available for work</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-6">Follow Me</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: Github,
                  name: "GitHub",
                  color: "hover:text-gray-400",
                  link: "https://github.com/sooraj4sure",
                },
                {
                  icon: Linkedin,
                  name: "LinkedIn",
                  color: "hover:text-blue-400",
                  link: "https://www.linkedin.com/in/suraj-kashyap-78627b243/",
                },
                {
                  icon: X,
                  name: "X.com",
                  color: "hover:text-black ",
                  link: "https://x.com/sooraj4sure",
                },
                {
                  icon: Instagram,
                  name: "Instagram",
                  color: "hover:text-pink-400",
                  link: "https://www.instagram.com/sooraj4sure/?igsh=MTFkajRvdDd5MGZvMA%3D%3D#",
                },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center p-4 bg-white/10 rounded-lg text-white/70 transition-all duration-300 hover:scale-105 hover:bg-white/20 ${social.color}`}
                >
                  <social.icon size={24} className="mr-2" />
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;
