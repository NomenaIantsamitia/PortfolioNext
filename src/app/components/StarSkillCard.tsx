'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Skill } from '../types';
import { Star } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Thème par catégorie — reprend le code couleur du hero              */
/*  (frontend = cyan, backend = emerald, DB = indigo, outils = amber)  */
/* ------------------------------------------------------------------ */

export const categoryTheme: Record<string, { text: string; iconBg: string; glow: string; bar: string; ring: string }> = {
  Langages: {
    text: 'text-violet-400',
    iconBg: 'bg-violet-500/10 border-violet-500/20 group-hover:bg-violet-500/15',
    glow: 'rgba(139,92,246,0.1)',
    bar: 'from-violet-500 via-purple-400 to-fuchsia-500',
    ring: 'group-hover:border-violet-500/40',
  },
  Frontend: {
    text: 'text-cyan-400',
    iconBg: 'bg-cyan-500/10 border-cyan-500/20 group-hover:bg-cyan-500/15',
    glow: 'rgba(34,211,238,0.1)',
    bar: 'from-cyan-500 via-sky-400 to-blue-500',
    ring: 'group-hover:border-cyan-500/40',
  },
  Mobile: {
    text: 'text-pink-400',
    iconBg: 'bg-pink-500/10 border-pink-500/20 group-hover:bg-pink-500/15',
    glow: 'rgba(236,72,153,0.1)',
    bar: 'from-pink-500 via-fuchsia-400 to-purple-500',
    ring: 'group-hover:border-pink-500/40',
  },
  Backend: {
    text: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/15',
    glow: 'rgba(16,185,129,0.1)',
    bar: 'from-emerald-500 via-emerald-400 to-teal-500',
    ring: 'group-hover:border-emerald-500/40',
  },
  'Base de données': {
    text: 'text-indigo-400',
    iconBg: 'bg-indigo-500/10 border-indigo-500/20 group-hover:bg-indigo-500/15',
    glow: 'rgba(99,102,241,0.1)',
    bar: 'from-indigo-500 via-purple-500 to-fuchsia-500',
    ring: 'group-hover:border-indigo-500/40',
  },
  Outils: {
    text: 'text-amber-400',
    iconBg: 'bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500/15',
    glow: 'rgba(245,158,11,0.1)',
    bar: 'from-amber-500 via-orange-400 to-fuchsia-500',
    ring: 'group-hover:border-amber-500/40',
  },
};

const fallbackTheme = categoryTheme.Frontend;

/* Petit hook maison : déclenche l'animation quand la carte entre dans le viewport */
const useInView = (threshold = 0.2) => {
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

interface StarSkillCardProps extends Skill {
  /** Position dans la grille, sert à décaler l'animation d'entrée */
  index?: number;
}

const StarSkillCard: React.FC<StarSkillCardProps> = ({
  name,
  icon: Icon,
  level,
  category,
  index = 0,
}) => {
  const stars = Math.round(level / 20); // 1 à 5 étoiles
  const theme = categoryTheme[category] ?? fallbackTheme;
  const { ref, inView } = useInView(0.25);
  const delay = Math.min(index * 70, 560);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: inView ? `${delay}ms` : '0ms',
        boxShadow: undefined,
      }}
      className={`group relative p-4 rounded-2xl bg-gray-900/50 border border-gray-800/80 transition-all duration-700 ease-out overflow-hidden hover:-translate-y-1 hover:bg-gray-900/70 ${
        theme.ring
      } ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 25px ${theme.glow}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
      }}
    >
      {/* Ligne de glow en haut au hover, teintée par catégorie */}
      <div
        className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent ${theme.bar
          .split(' ')[0]
          .replace('from-', 'via-')} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Header : icône + nom + % */}
      <div className="flex items-center gap-3 mb-3.5">
        <div
          className={`shrink-0 w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 ${theme.iconBg}`}
        >
          <Icon className={`w-4.5 h-4.5 ${theme.text} transition-colors`} />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-white truncate" title={name}>
            {name}
          </h3>
          <span className="text-[10px] font-mono text-gray-500">{category}</span>
        </div>

        <span className={`shrink-0 text-xs font-mono font-medium tabular-nums ${theme.text}`}>
          {level}%
        </span>
      </div>

     {level >= 70 && (
  <div className="flex items-center gap-1 mb-3">
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${
          i < stars ? 'text-amber-400 fill-amber-400/90' : 'text-gray-700 fill-gray-800'
        }`}
      />
    ))}
  </div>
)}

      {/* Progress bar — se remplit uniquement quand la carte est visible */}
      <div className="w-full h-1.5 bg-gray-800/80 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${theme.bar} transition-all duration-1000 ease-out`}
          style={{
            width: inView ? `${level}%` : '0%',
            transitionDelay: inView ? `${delay + 150}ms` : '0ms',
          }}
        />
      </div>
    </div>
  );
};

export default StarSkillCard;