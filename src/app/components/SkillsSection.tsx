'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Monitor, Server, Database, Terminal, Sparkles } from 'lucide-react';
import { skills } from '../data/skills';
import StarSkillCard, { categoryTheme } from './StarSkillCard';

/* Icône représentative de chaque catégorie (pour les titres de groupe + filtres) */
const categoryIcons: Record<string, React.ElementType> = {
  Frontend: Monitor,
  Backend: Server,
  'Base de données': Database,
  Outils: Terminal,
};

/* Petit hook maison : révèle un bloc quand il entre dans le viewport */
const useInView = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
};

const SkillsSection: React.FC = () => {
  // Catégories dans leur ordre d'apparition dans data/skills.ts
  const categories = useMemo(() => {
    const seen: string[] = [];
    skills.forEach((s) => {
      if (!seen.includes(s.category)) seen.push(s.category);
    });
    return seen;
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const { ref: headerRef, inView: headerInView } = useInView(0.3);

  const visibleCategories =
    activeCategory === 'Tous' ? categories : [activeCategory];

  return (
    <section
      id="competences"
      className="relative py-24 px-4 sm:px-6 bg-gray-950 text-white overflow-hidden"
    >
      {/* Léger écho du fond du hero, très atténué */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_0%,#140f24_0%,transparent_60%)] pointer-events-none" />
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none"
        style={{
          maskImage:
            'radial-gradient(ellipse 70% 60% at 50% 20%, #000 50%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 70% 60% at 50% 20%, #000 50%, transparent 100%)',
        }}
      />

      <div
        ref={headerRef}
        className={`relative max-w-5xl mx-auto text-center mb-14 transition-all duration-700 ease-out ${
          headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <div className="inline-flex items-center gap-2 font-mono text-xs text-fuchsia-300 mb-5 px-3.5 py-1.5 rounded-full border border-fuchsia-500/25 bg-fuchsia-500/10 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>// Compétences</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Ma boîte à outils{' '}
          <span className="bg-gradient-to-r from-fuchsia-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
            technique
          </span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          {skills.length} technologies que j'utilise au quotidien, du design d'interface
          jusqu'au déploiement.
        </p>

        {/* Filtres par catégorie */}
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => setActiveCategory('Tous')}
            className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono border transition-all duration-300 ${
              activeCategory === 'Tous'
                ? 'border-fuchsia-500/50 bg-fuchsia-500/15 text-white'
                : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-600 hover:text-white'
            }`}
          >
            Tous
          </button>
          {categories.map((cat) => {
            const CatIcon = categoryIcons[cat];
            const theme = categoryTheme[cat];
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs sm:text-sm font-mono border transition-all duration-300 ${
                  active
                    ? `border-gray-600 bg-gray-800/80 text-white`
                    : 'border-gray-800 bg-gray-900/60 text-gray-400 hover:border-gray-600 hover:text-white'
                }`}
              >
                {CatIcon && (
                  <CatIcon className={`w-3.5 h-3.5 ${active ? theme?.text : ''}`} />
                )}
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Groupes de compétences */}
      <div className="relative max-w-6xl mx-auto space-y-14">
        {visibleCategories.map((cat) => {
          const CatIcon = categoryIcons[cat];
          const theme = categoryTheme[cat];
          const items = skills.filter((s) => s.category === cat);

          return (
            <div key={cat}>
              <div className="flex items-center gap-2.5 mb-5">
                {CatIcon && (
                  <div className={`p-1.5 rounded-lg border ${theme?.iconBg}`}>
                    <CatIcon className={`w-4 h-4 ${theme?.text}`} />
                  </div>
                )}
                <h3 className="text-base sm:text-lg font-bold text-white">{cat}</h3>
                <span className="text-xs font-mono text-gray-500">
                  {items.length} {items.length > 1 ? 'technologies' : 'technologie'}
                </span>
                <div className="flex-1 h-px bg-gray-800/80" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((skill, i) => (
                  <StarSkillCard key={skill.name} {...skill} index={i} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SkillsSection;