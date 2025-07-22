
import React, { useState, useEffect } from "react";

// Certificate data
const certificates = [
    {
    title: "Programming With Python",
    issuer: "Harvard University",
    date: "July 2025",
    image: "./src/certificates/CS50P.png",
  },
  {
    title: "Cybersecurity Skilling Program",
    issuer: "C3iHub IIT Kanpur",
    date: "June 2023",
    image: "./src/certificates/CyberIIT.jpg",
  },
  {
    title: "3D Modelling by Autodesk",
    issuer: "Cognizance'22 - IIT Roorkee",
    date: "March 2022",
    image: "./src/certificates/Autodesk.jpg",
  },
    {
    title: "Software Engineering Virtual Experience Program",
    issuer: "HP - Hewlett Packard x Forage",
    date: "November 2022",
    // url: "https://example.com/certificate/web",
    image: "./src/certificates/hp.jpg",
  },
  {
    title: "Google Workspace Administrator",
    issuer: "Google Cloud x Coursera",
    date: "March 2024",
    image: "./src/certificates/GoogleWorkspace.jpg",
  },
  {
    title:
      "Machine Learning to Deep Learning: A Journey for Remote Sensing Data Classification",
    issuer: "ISRO",
    date: "July 2022",
    image: "./src/certificates/ISRO-ML.jpg",
  },
  {
    title:  "Basics of Remote Sensing, Geographical Information System and Global Navigation",
    issuer: "ISRO",
    date: "November 2022",
    image: "./src/certificates/RemoteSensing.jpg",
  },


];

const CertificateSection = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  // Close modal with Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedCert(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      className="px-6 py-12 max-w-6xl mx-auto text-white"
      id="certificates"
    >
      <h2 className="text-3xl font-bold mb-8 text-green-400">
        - "Certificates" -
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <div
            key={index}
            className="bg-black/30 border border-green-500 p-4 rounded-xl hover:shadow-lg hover:border-white transition-all duration-200"
          >
            <img
              src={cert.image}
              alt={cert.title}
              onClick={() => setSelectedCert(cert)}
              className="w-full h-48 object-cover rounded-md mb-4 border border-white/20 cursor-pointer hover:scale-105 transition-transform duration-300"
            />
            <h3 className="text-lg font-semibold">{cert.title}</h3>
            <p className="text-sm text-gray-400">
              <span className="text-green-300">{cert.issuer}</span> —{" "}
              {cert.date}
            </p>
            {cert.url && (
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm mt-2 inline-block text-blue-400 underline hover:text-blue-200"
              >
                View Certificate
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl w-full px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm"
              onClick={() => setSelectedCert(null)}
            >
              ✕
            </button>

            {/* Image */}
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="w-full max-h-[80vh] object-contain rounded-lg shadow-xl border border-white"
            />

            {/* Caption */}
            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-green-400">
                {selectedCert.title}
              </h3>
              <p className="text-sm text-white/70">
                {selectedCert.issuer} — {selectedCert.date}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificateSection;
