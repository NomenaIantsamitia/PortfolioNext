import React from 'react';

const Navigation: React.FC = () => (
  <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
    <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
        MN
      </span>
      <div className="flex space-x-8 text-gray-300">
        <a href="#hero" className="hover:text-indigo-400 transition-colors duration-300 font-medium">Accueil</a>
        <a href="#competences" className="hover:text-indigo-400 transition-colors duration-300 font-medium">Compétences</a>
        <a href="#projets" className="hover:text-indigo-400 transition-colors duration-300 font-medium">Projets</a>
        <a href="#contact" className="hover:text-indigo-400 transition-colors duration-300 font-medium">Contact</a>
      </div>
    </div>
  </nav>
);

export default Navigation;