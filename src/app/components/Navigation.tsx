'use client'
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '#hero', label: 'Accueil' },
  { href: '#competences', label: 'Compétences' },
  { href: '#projets', label: 'Projets' },
  { href: '#contact', label: 'Contact' },
];

const Navigation: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          MN
        </span>

        {/* Desktop: liens classiques, inchangé */}
        <div className="hidden md:flex space-x-8 text-gray-300">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-indigo-400 transition-colors duration-300 font-medium"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Mobile: bouton qui ouvre un menu flottant */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-full bg-gray-800/70 border border-gray-700 text-gray-200"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Menu flottant mobile — apparaît sous la navbar, style "slide" avec cercles en arrière-plan */}
      <div
        className={`md:hidden fixed left-1/2 top-20 -translate-x-1/2 w-[88%] max-w-sm z-50 transition-all duration-300 origin-top ${
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 -translate-y-3 pointer-events-none'
        }`}
      >
        <div className="relative overflow-hidden rounded-3xl border border-gray-700/60 bg-gray-900/90 backdrop-blur-xl shadow-2xl">
          {/* Effet rond façon slide powerpoint, en fond du panneau */}
          <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-fuchsia-500/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-10 w-40 h-40 rounded-full bg-indigo-500/20 blur-2xl" />

          <div className="relative flex flex-col p-3">
            {LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="px-5 py-3.5 rounded-2xl text-center text-gray-200 font-medium hover:bg-gray-800/70 hover:text-indigo-300 transition-colors duration-200"
                style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;