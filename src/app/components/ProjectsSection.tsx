'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Clapperboard, ChevronLeft, ChevronRight, Film } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const ProjectsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [curtainsOpen, setCurtainsOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [hasSwiped, setHasSwiped] = useState(false);
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

  // Clavier : flèches pour naviguer, Échap pour quitter le plein écran
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFullscreen(false);
        return;
      }
      if (isFullscreen) return;
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isFullscreen, isTransitioning, activeIndex]);

  // Glisser pour naviguer (tactile)
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    if (isFullscreen) return;
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };

  const onTouchEnd = () => {
    if (touchStartX.current === null) return;
    const delta = touchDeltaX.current;
    touchStartX.current = null;
    touchDeltaX.current = 0;
    if (Math.abs(delta) < 45) return;
    setHasSwiped(true);
    if (delta < 0) handleNext();
    else handlePrev();
  };

  return (
    <section
      ref={sectionRef}
      id="projets"
      className="relative py-16 sm:py-24 lg:py-28 bg-black overflow-hidden select-none"
    >
      {/* ===== GRAIN CINÉMA ===== */}
      <div
        className="pointer-events-none absolute inset-0 z-50 opacity-[0.07] mix-blend-overlay motion-reduce:hidden"
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
      <div className="absolute top-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      {/* ===== RIDEAUX ===== */}
      <div
        className={`absolute inset-y-0 left-0 w-1/2 z-40 bg-gradient-to-r from-red-950 via-red-900 to-red-950 transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
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
        className={`absolute inset-y-0 right-0 w-1/2 z-40 bg-gradient-to-l from-red-950 via-red-900 to-red-950 transition-transform duration-[1.8s] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
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
        <div className="text-center mb-10 sm:mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 sm:gap-2.5 font-mono text-[10px] sm:text-xs tracking-widest text-indigo-300/90 mb-4 sm:mb-5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 backdrop-blur-md shadow-lg shadow-indigo-500/10">
           
            <span>Réalisations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 tracking-tight">
            Mes{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              Projets
            </span>
          </h2>

     
        </div>

        {/* Bandeau "à l'affiche" façon marquee de cinéma */}
        <div className="relative overflow-hidden mb-8 sm:mb-12 border-y border-indigo-500/15 bg-gradient-to-r from-transparent via-indigo-500/[0.04] to-transparent">
          <div className="marquee-track flex items-center gap-8 py-2.5 whitespace-nowrap font-mono text-[10px] sm:text-xs tracking-[0.25em] text-indigo-300/70 uppercase">
            {[...projects, ...projects].map((p, i) => (
              <span key={`${p.title}-${i}`} className="flex items-center gap-8">
                <span>{p.title}</span>
                <span className="text-amber-400/60">★</span>
              </span>
            ))}
          </div>
        </div>

        {/* Perforations façon pellicule 35mm */}
        <div
          className="hidden sm:flex justify-center gap-3 mb-3 opacity-40"
          aria-hidden="true"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-2 h-2 rounded-[2px] bg-gray-700" />
          ))}
        </div>

        {/* Scène 3D */}
        <div
          className="relative h-[420px] sm:h-[560px] md:h-[620px] lg:h-[640px] flex items-center justify-center"
          style={{ perspective: 'min(1400px, 220vw)', touchAction: 'pan-y' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="group"
          aria-roledescription="carrousel"
          aria-label={`Projet ${activeIndex + 1} sur ${projects.length} : ${projects[activeIndex].title}`}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl h-24 sm:h-32 bg-gradient-to-t from-indigo-500/5 to-transparent rounded-full blur-2xl pointer-events-none" />

          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              {...project}
              index={i}
              isActive={i === activeIndex}
              onClick={() => goTo(i)}
              position={getPosition(i)}
              isFullscreen={isFullscreen && i === activeIndex}
              onToggleFullscreen={() => setIsFullscreen((prev) => !prev)}
            />
          ))}
        </div>

        {/* Perforations façon pellicule 35mm (bas) */}
        <div
          className="hidden sm:flex justify-center gap-3 mt-3 opacity-40"
          aria-hidden="true"
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="w-2 h-2 rounded-[2px] bg-gray-700" />
          ))}
        </div>

        {/* Contrôles (cachés en mode plein écran) */}
        {!isFullscreen && (
          <>
            <div className="flex items-center justify-center gap-4 sm:gap-8 mt-8 sm:mt-12">
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="group p-3 sm:p-3.5 rounded-full bg-gray-900/80 border border-gray-700/80 text-white hover:bg-indigo-600 hover:border-indigo-400 active:scale-95 transition-all duration-300 shadow-xl shadow-black/40 disabled:opacity-50"
                aria-label="Projet précédent"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
              </button>

              <div className="flex items-center gap-2.5 sm:gap-3">
                {projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goTo(idx)}
                    disabled={isTransitioning}
                    className={`relative transition-all duration-500 ${
                      idx === activeIndex ? 'w-8 sm:w-10 h-2.5 sm:h-3' : 'w-2.5 h-2.5 sm:w-3 sm:h-3 hover:scale-125'
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
                className="group p-3 sm:p-3.5 rounded-full bg-gray-900/80 border border-gray-700/80 text-white hover:bg-indigo-600 hover:border-indigo-400 active:scale-95 transition-all duration-300 shadow-xl shadow-black/40 disabled:opacity-50"
                aria-label="Projet suivant"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-2">
              <div className="flex items-center gap-2 text-xs text-gray-500 font-mono tracking-wider">
                <Film className="w-3.5 h-3.5" />
                <span>
                  {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                </span>
              </div>
              {!hasSwiped && (
                <span className="sm:hidden text-[11px] text-gray-600 font-mono tracking-wide animate-pulse">
                  ‹ glissez pour changer de film ›
                </span>
              )}
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

      <style jsx>{`
        .marquee-track {
          animation: marquee 28s linear infinite;
          width: max-content;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
          }
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};

export default ProjectsSection;