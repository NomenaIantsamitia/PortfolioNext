'use client'
import React from 'react';
import { Mail, ExternalLink, Sparkles, Code, Palette, Zap, GraduationCap, ArrowRight, MousePointer, Cpu } from 'lucide-react';

const HeroSection: React.FC = () => (
  <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black p-4">
    {/* Background Animations Évoluées */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid animé */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] animate-grid"></div>
      
      {/* Orbes gradient animés */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl animate-orb-1"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-orb-2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl animate-orb-3"></div>

      {/* Lignes de connexion animées */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-indigo-500 to-transparent animate-connect-1"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-connect-2"></div>
      </div>
    </div>

    {/* Éléments flottants avec code */}
    <div className="absolute top-20 left-20 opacity-20 animate-float-1">
      <div className="text-xs font-mono text-cyan-400">{`<Code/>`}</div>
    </div>
    <div className="absolute bottom-40 right-20 opacity-20 animate-float-2">
      <div className="text-xs font-mono text-purple-400">{`{...props}`}</div>
    </div>
    <div className="absolute top-1/3 right-1/4 opacity-15 animate-float-3">
      <div className="text-sm font-mono text-emerald-400">console.log('🚀');</div>
    </div>

    <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
      {/* Badge Principal avec Animation */}
      <div className="inline-flex items-center space-x-3 bg-gray-800/40 backdrop-blur-xl border border-gray-700/50 px-8 py-4 rounded-2xl mb-16 group hover:border-teal-500/60 hover:bg-gray-800/60 transition-all duration-500 shadow-2xl">
        <div className="relative">
          <div className="absolute inset-0 bg-teal-500 rounded-full blur-md group-hover:blur-lg transition-all duration-300 animate-pulse"></div>
          <GraduationCap className="w-6 h-6 text-teal-400 relative z-10" />
        </div>
        <span className="text-gray-200 text-lg font-semibold bg-gradient-to-r from-gray-200 to-teal-200 bg-clip-text text-transparent">
          Étudiant en Génie Logiciel • Passionné par l'Innovation
        </span>
        <div className="w-2 h-2 bg-teal-500 rounded-full animate-ping"></div>
      </div>
      
      {/* Titre Principal avec Typographie Avancée */}
      <div className="mb-12">
        <h1 className="text-7xl md:text-9xl font-black text-white leading-none mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
            NOMENA
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
            MISEDRATIANA
          </span>
        </h1>
        
        {/* Sous-titre Dynamique avec Curseur Animé */}
        <div className="relative inline-block">
          <p className="text-3xl md:text-4xl text-gray-300 font-light max-w-5xl mx-auto leading-relaxed">
            Je crée des 
            <span className="relative mx-3 group">
              <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent font-bold relative z-10">
                expériences digitales
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-1 bg-gradient-to-r from-indigo-400 to-cyan-400 group-hover:w-full transition-all duration-500 ease-out"></span>
            </span>
            qui allient
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
            {[
              { icon: MousePointer, text: "Design Intuitif", color: "purple" },
              { icon: Cpu, text: "Performance", color: "cyan" },
              { icon: Code, text: "Code Robuste", color: "indigo" },
              { icon: Zap, text: "Innovation", color: "teal" }
            ].map((item, index) => (
              <div 
                key={item.text}
                className="flex items-center space-x-2 px-6 py-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/30 rounded-2xl group hover:border-${item.color}-500/50 hover:scale-105 transition-all duration-300 cursor-default"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <item.icon className={`w-5 h-5 text-${item.color}-400 group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-gray-200 font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Stack Technologique Interactive */}
      <div className="mb-16">
        <p className="text-xl text-gray-400 mb-6">Technologies maîtrisées :</p>
        <div className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto">
          {['Next.js 14', 'TypeScript', 'React', 'Node.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'AWS'].map((tech, index) => (
            <div 
              key={tech}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-tilt"></div>
              <span className="relative px-6 py-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-gray-200 font-semibold hover:text-white transition-all duration-300 hover:border-indigo-500/50">
                {tech}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Buttons avec Animations Avancées */}
      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
        <a 
          href="#projets" 
          className="group relative inline-flex items-center space-x-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:-translate-y-2 shadow-2xl hover:shadow-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          <span className="relative">Explorer Mon Portfolio</span>
          <ExternalLink className="w-6 h-6 relative group-hover:translate-x-1 group-hover:scale-110 transition-transform duration-300" />
        </a>
        
        <a 
          href="#contact" 
          className="group relative inline-flex items-center space-x-4 bg-gray-800/40 backdrop-blur-xl border-2 border-gray-600 hover:border-cyan-500 hover:bg-gray-800/60 text-gray-200 hover:text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 transform hover:-translate-y-1 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <Mail className="w-6 h-6 relative" />
          <span className="relative">Discutons de Votre Projet</span>
          <ArrowRight className="w-5 h-5 relative opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
        </a>
      </div>

      {/* Stats avec Hover Effects */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {[
          { icon: Code, number: "20+", text: "Projets Réalisés", color: "indigo" },
          { icon: Palette, number: "3+", text: "Années d'Expérience", color: "purple" },
          { icon: Zap, number: "15+", text: "Technologies Maîtrisées", color: "cyan" },
          { icon: Sparkles, number: "100%", text: "Satisfaction Client", color: "teal" }
        ].map((stat, index) => (
          <div 
            key={stat.text}
            className="group text-center p-8 bg-gray-800/30 backdrop-blur-lg border border-gray-700/40 rounded-3xl hover:border-${stat.color}-500/50 hover:bg-gray-800/50 transition-all duration-500 transform hover:-translate-y-3 cursor-default"
            style={{ animationDelay: `${index * 200}ms` }}
          >
            <div className={`inline-flex items-center justify-center w-20 h-20 bg-${stat.color}-500/10 border border-${stat.color}-500/20 rounded-3xl mb-6 group-hover:bg-${stat.color}-500/20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
              <stat.icon className={`w-10 h-10 text-${stat.color}-400`} />
            </div>
            <div className="text-5xl font-black text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {stat.number}
            </div>
            <div className="text-gray-300 font-semibold">{stat.text}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Scroll Indicator Avancé */}
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
      <div className="flex flex-col items-center space-y-2">
        <span className="text-gray-400 text-sm font-medium animate-pulse">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-indigo-400 to-purple-400 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes gradient-x {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes grid {
        0% { transform: translateY(0px); }
        100% { transform: translateY(64px); }
      }
      @keyframes orb-1 {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(-50px, -30px) scale(1.1); }
      }
      @keyframes orb-2 {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(40px, 20px) scale(1.05); }
      }
      @keyframes orb-3 {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(0px, 0px) scale(1.2); }
      }
      @keyframes connect-1 {
        0%, 100% { transform: translateY(-100%); opacity: 0; }
        50% { transform: translateY(0%); opacity: 1; }
      }
      @keyframes connect-2 {
        0%, 100% { transform: translateX(-100%); opacity: 0; }
        50% { transform: translateX(0%); opacity: 1; }
      }
      @keyframes float-1 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(5deg); }
      }
      @keyframes float-2 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(15px) rotate(-5deg); }
      }
      @keyframes float-3 {
        0%, 100% { transform: translateY(0px) scale(1); }
        50% { transform: translateY(-10px) scale(1.1); }
      }
      @keyframes tilt {
        0%, 100% { transform: rotate(0deg); }
        50% { transform: rotate(1deg); }
      }
      .animate-gradient-x {
        background-size: 200% 200%;
        animation: gradient-x 3s ease infinite;
      }
      .animate-grid {
        animation: grid 20s linear infinite;
      }
      .animate-orb-1 { animation: orb-1 15s ease-in-out infinite; }
      .animate-orb-2 { animation: orb-2 20s ease-in-out infinite; }
      .animate-orb-3 { animation: orb-3 10s ease-in-out infinite; }
      .animate-connect-1 { animation: connect-1 8s ease-in-out infinite; }
      .animate-connect-2 { animation: connect-2 12s ease-in-out infinite; }
      .animate-float-1 { animation: float-1 6s ease-in-out infinite; }
      .animate-float-2 { animation: float-2 8s ease-in-out infinite; }
      .animate-float-3 { animation: float-3 7s ease-in-out infinite; }
      .animate-tilt { animation: tilt 10s ease-in-out infinite; }
      .hover\\:shadow-3xl:hover {
        box-shadow: 0 25px 50px -12px rgba(99, 102, 241, 0.4), 
                    0 0 25px rgba(139, 92, 246, 0.3),
                    0 0 50px rgba(6, 182, 212, 0.2);
      }
    `}</style>
  </section>
);

export default HeroSection;