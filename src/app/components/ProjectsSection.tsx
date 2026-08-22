'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clapperboard, ChevronLeft, ChevronRight, Film, Maximize2 } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Ouvre les rideaux quand la section entre dans le viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setCurtainsOpen(true), 300);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    if (isTransitioning || isFullscreen) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (isTransitioning || isFullscreen) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const goTo = (index: number) => {
    if (isTransitioning || index === activeIndex || isFullscreen) return;
    setIsTransitioning(true);
    setActiveIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsTransitioning(false), 700);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  const getPosition = (index: number): 'left' | 'center' | 'right' | 'hidden' => {
    if (index === activeIndex) return 'center';
    if (index === (activeIndex - 1 + projects.length) % projects.length) return 'left';
    if (index === (activeIndex + 1) % projects.length) return 'right';
    return 'hidden';
  };

  // Fermer le mode plein écran avec Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projets"
      className="relative py-28 bg-black overflow-hidden select-none"
    >
      {/* ===== GRAIN CINÉMA ===== */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ===== AMBIANCE ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_rgba(0,0,0,0.75)_70%,_black_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/25 via-transparent to-black" />
      </div>

      {/* Spots de lumière */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* ===== RIDEAUX ===== */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 z-40 bg-gradient-to-r from-red-950 via-red-900 to-red-950 transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          curtainsOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.6)',
          backgroundImage: `
            linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.15) 50%, transparent 100%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 8px,
              rgba(0,0,0,0.08) 8px,
              rgba(0,0,0,0.08) 16px
            )
          `,
        }}
      />
      <div
        className={`absolute inset-y-0 right-0 w-1/2 z-40 bg-gradient-to-l from-red-950 via-red-900 to-red-950 transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          curtainsOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.6)',
          backgroundImage: `
            linear-gradient(270deg, transparent 0%, rgba(0,0,0,0.15) 50%, transparent 100%),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 8px,
              rgba(0,0,0,0.08) 8px,
              rgba(0,0,0,0.08) 16px
            )
          `,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2.5 font-mono text-xs tracking-widest text-indigo-300/90 mb-5 px-5 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md shadow-lg shadow-indigo-500/10">
            <Clapperboard className="w-3.5 h-3.5" />
            <span>SALLE DE PROJECTION 3D</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
            Mes{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Projets
            </span>
          </h2>

          <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
            Cliquez sur un projet pour le placer au centre de l’écran et lancer la projection.
          </p>
        </div>

        {/* Scène 3D */}
        <div
          className="relative h-[580px] sm:h-[640px] flex items-center justify-center"
          style={{ perspective: '1400px' }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl h-32 bg-gradient-to-t from-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              {...project}
              isActive={i === activeIndex}
              onClick={() => goTo(i)}
              position={getPosition(i)}
              isFullscreen={isFullscreen && i === activeIndex}
              onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
            />
          ))}
        </div>

        {/* Contrôles (cachés en mode plein écran) */}
        {!isFullscreen && (
          <>
            <div className="flex items-center justify-center gap-8 mt-12">
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="group p-3.5 rounded-full bg-gray-900/80 border border-gray-700/80 text-white hover:bg-indigo-600 hover:border-indigo-400 transition-all duration-300 shadow-xl shadow-black/40 disabled:opacity-50"
                aria-label="Projet précédent"
              >
                <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <div className="flex items-center gap-3">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    disabled={isTransitioning}
                    className={`relative transition-all duration-500 ${
                      idx === activeIndex ? 'w-10 h-3' : 'w-3 h-3 hover:scale-125'
                    }`}
                    aria-label={`Aller au projet ${idx + 1}`}
                  >
                    <span
                      className={`absolute inset-0 rounded-full transition-all duration-500 ${
                        idx === activeIndex
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/40'
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="group p-3.5 rounded-full bg-gray-900/80 border border-gray-700/80 text-white hover:bg-indigo-600 hover:border-indigo-400 transition-all duration-300 shadow-xl shadow-black/40 disabled:opacity-50"
                aria-label="Projet suivant"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 font-mono tracking-wider">
              <Film className="w-3.5 h-3.5" />
              <span>
                {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Overlay plein écran (fond sombre) */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm"
          onClick={() => setIsFullscreen(false)}
        />
      )}
    </section>
  );
};

export default ProjectsSection;