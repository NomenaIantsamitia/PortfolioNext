'use client'
import React from 'react';
import { Sparkles, Code, Palette, Zap, ExternalLink, ArrowRight, Mail, Laptop, Rocket, Star, Brain } from 'lucide-react';

const HeroSection: React.FC = () => (
  <section
    id="hero"
    className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-950 via-black to-gray-900 p-4"
  >
    {/* === Background FX Nouvelle Génération === */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Ligne néon dynamique */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_70%)] animate-pulse"></div>

      {/* Orbes futuristes */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 rounded-full blur-3xl animate-[float_6s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-20 right-16 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-full blur-3xl animate-[float_8s_ease-in-out_reverse_infinite]"></div>

      {/* Grille 3D animée */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:70px_70px] opacity-20 animate-[gridMove_25s_linear_infinite]"></div>
    </div>

    {/* === Floating Code Snippets minimalistes === */}
    <div className="absolute top-24 left-24 opacity-20 animate-[float_7s_ease-in-out_infinite] text-cyan-400 text-sm font-mono">
      const dev = "Fullstack";
    </div>
    <div className="absolute top-1/3 right-1/4 opacity-20 animate-[float_9s_ease-in-out_infinite] text-purple-400 text-sm font-mono">
      {"<skills />"}
    </div>

    {/* === Content === */}
    <div className="relative max-w-6xl mx-auto text-center z-10">
      {/* Badge Professionnel */}
      <div className="inline-flex items-center gap-3 bg-gray-900/40 backdrop-blur-xl border border-gray-700/50 rounded-2xl px-7 py-4 mb-14 shadow-2xl hover:border-purple-400/60 transition duration-500">
        <Rocket className="w-6 h-6 text-purple-400 animate-pulse" />
        <span className="text-gray-200 text-lg font-semibold tracking-wide bg-gradient-to-r from-gray-100 to-purple-300 bg-clip-text text-transparent">
          Développeuse Fullstack • Next.js • React.js • Node.js / NestJS • Express.js
        </span>
      </div>

      {/* Titre central redesign */}
      <h1 className="text-6xl md:text-8xl font-extrabold leading-tight text-white mb-8 tracking-tight">
        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent drop-shadow-xl">
            MISEDRATIANA
        </span>
        <br />
        <span className="bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-[textMove_3s_ease-in-out_infinite]">
        Nomena 
        </span>
      </h1>

      {/* Sous-titre motion UX */}
      <p className="text-2xl md:text-3xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
      Développeur Full-Stack Next.js & React,Node.js       <span className="mx-2 font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent relative">
      | JavaScript/TypeScript | 
        </span>
        Soif d'apprendre et d'innover
      </p>

      {/* === CTA Stylish & Premium === */}
      <div className="flex justify-center mt-16 gap-8 flex-col sm:flex-row">
        <a
          href="#projets"
          className="group relative inline-flex items-center gap-3 px-14 py-5 rounded-2xl text-lg font-bold text-white bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:from-purple-700 hover:via-fuchsia-700 hover:to-indigo-700 transition duration-500 transform hover:-translate-y-2 shadow-xl hover:shadow-3xl overflow-hidden"
        >
          <span className="relative z-10">Voir mes Projets</span>
          <ExternalLink className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
          <div className="absolute inset-0 bg-white/20 translate-x-[-120%] group-hover:translate-x-[120%] transition-all duration-1000 skew-x-12"></div>
        </a>

        <a
          href="#contact"
          className="group relative inline-flex items-center gap-3 px-14 py-5 rounded-2xl text-lg font-bold bg-gray-900/40 backdrop-blur-xl text-gray-200 border border-gray-600 hover:border-purple-400 hover:bg-gray-900/60 transition duration-500 hover:-translate-y-1"
        >
          <Mail className="w-6 h-6" />
          Contactez-moi
          <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </a>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
      <span className="text-gray-400 text-sm animate-pulse">Défilez pour explorer</span>
      <div className="w-6 h-10 mt-2 border-2 border-gray-500 rounded-full flex justify-center">
        <div className="w-1 h-3 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full mt-2 animate-bounce"></div>
      </div>
    </div>

    {/* Animations CSS */}
    <style jsx>{`
      @keyframes gridMove {
        0% { transform: translateY(0); }
        100% { transform: translateY(70px); }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-20px); }
      }
      @keyframes textMove {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      .hover\\:shadow-3xl:hover {
        box-shadow: 0 25px 60px -10px rgba(168, 85, 247, 0.45),
                    0 0 40px rgba(236, 72, 153, 0.3),
                    0 0 60px rgba(79, 70, 229, 0.25);
      }
    `}</style>
  </section>
);

export default HeroSection;
