import React from 'react';

const testimonials = [
  {
    name: "Sooraj",
    role: "Product Manager",
    text: "Working with them was incredible. They brought our vision to life with such creativity and technical excellence!",
    avatar: "👩‍🏢"
  },
  {
    name: "sooraj",
    role: "Startup Founder",
    text: "The attention to detail and modern design sensibilities are unmatched. Highly recommend!",
    avatar: "👨‍💻"
  }
];

const TestimonialsSection = () => (
  <section className="min-h-screen flex items-center py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
          What People Say
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 relative"
          >
            <div className="absolute -top-4 left-8 text-6xl text-purple-400/50">"</div>

            <p className="text-white/80 text-lg leading-relaxed mb-6 relative z-10">
              {testimonial.text}
            </p>

            <div className="flex items-center">
              <div className="text-4xl mr-4">
                {testimonial.avatar}
              </div>
              <div>
                <h4 className="text-white font-bold">
                  {testimonial.name}
                </h4>
                <p className="text-white/60">
                  {testimonial.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;
