'use client';

import React from 'react';
import {
  Mail,
  Github,
  Linkedin,
  ArrowRight,
  Download,
  Sparkles,
  Code,
  Layers,
  ShieldCheck,
  Server,
  Database,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Fond animé : "pile" full-stack flottante + traces + code fantôme   */
/* ------------------------------------------------------------------ */
const AnimatedBackground: React.FC = () => {
  const codeSnippets = [
    { text: 'export default function App()', top: '10%', left: '58%', rotate: '-4deg' },
    { text: "SELECT * FROM projects;", top: '20%', left: '4%', rotate: '3deg' },
    { text: 'const [state, setState] = useState()', top: '46%', left: '66%', rotate: '2deg' },
    { text: '@Injectable()', top: '64%', left: '10%', rotate: '-2deg' },
    { text: 'model User { id String @id }', top: '80%', left: '46%', rotate: '1deg' },
    { text: 'npm run build', top: '32%', left: '30%', rotate: '-3deg' },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Keyframes + reduced-motion */}
      <style>{`
        @keyframes floatCard {
          0%, 100% { transform: translateY(0px) rotateX(52deg) rotateZ(45deg); }
          50% { transform: translateY(-16px) rotateX(52deg) rotateZ(45deg); }
        }
        @keyframes floatCardAlt {
          0%, 100% { transform: translateY(-10px) rotateX(52deg) rotateZ(45deg); }
          50% { transform: translateY(8px) rotateX(52deg) rotateZ(45deg); }
        }
        @keyframes traceFlow {
          to { stroke-dashoffset: -200; }
        }
        @keyframes ghostDrift {
          0%, 100% { transform: translateY(0px); opacity: var(--ghost-op, 0.06); }
          50% { transform: translateY(-8px); opacity: calc(var(--ghost-op, 0.06) * 1.6); }
        }
        @media (prefers-reduced-motion: reduce) {
          .stack-card, .trace-path, .ghost-code { animation: none !important; }
        }
      `}</style>

      {/* Fond de base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-10%,#1a1230_0%,#07070c_55%)]" />

      {/* Blobs de couleur, alignés sur les 3 couches du stack */}
      <div className="absolute -top-32 left-[8%] w-[26rem] h-[26rem] bg-cyan-500/10 rounded-full blur-[120px]" />
      <div className="absolute top-1/3 -right-24 w-[30rem] h-[30rem] bg-fuchsia-600/15 rounded-full blur-[140px]" />
      <div className="absolute -bottom-32 left-1/4 w-[26rem] h-[26rem] bg-indigo-600/15 rounded-full blur-[130px]" />

      {/* Grille technique */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]"
        style={{
          maskImage:
            'radial-gradient(ellipse 75% 60% at 50% 40%, #000 55%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 75% 60% at 50% 40%, #000 55%, transparent 100%)',
        }}
      />

      {/* Traces façon circuit imprimé reliant les 3 couches */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="traceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <path
          className="trace-path"
          d="M 10% 16% L 10% 40% L 84% 40% L 84% 62% L 22% 62% L 22% 86%"
          fill="none"
          stroke="url(#traceGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 10"
          style={{ animation: 'traceFlow 8s linear infinite' }}
        />
        <circle cx="10%" cy="16%" r="3" fill="#22d3ee" />
        <circle cx="84%" cy="40%" r="3" fill="#a855f7" />
        <circle cx="22%" cy="86%" r="3" fill="#818cf8" />
      </svg>

      {/* ===== Pile isométrique : Frontend / API / Database ===== */}
      <div
        className="stack-card absolute w-40 h-24 rounded-lg border border-cyan-400/25 bg-gradient-to-br from-cyan-500/10 to-cyan-500/[0.02] backdrop-blur-[2px] shadow-[0_0_40px_rgba(34,211,238,0.08)]"
        style={{
          top: '10%',
          left: '4%',
          transformStyle: 'preserve-3d',
          animation: 'floatCard 7s ease-in-out infinite',
        }}
      >
        <div className="flex items-center gap-2 px-3 pt-3">
          <Code className="w-3.5 h-3.5 text-cyan-300" />
          <span className="text-[10px] font-mono text-cyan-200/80">frontend.tsx</span>
        </div>
        <div className="px-3 mt-2 space-y-1">
          <div className="h-1 w-3/4 rounded bg-cyan-300/20" />
          <div className="h-1 w-1/2 rounded bg-cyan-300/15" />
        </div>
      </div>

      <div
        className="stack-card absolute w-40 h-24 rounded-lg border border-fuchsia-400/25 bg-gradient-to-br from-fuchsia-500/10 to-fuchsia-500/[0.02] backdrop-blur-[2px] shadow-[0_0_40px_rgba(217,70,239,0.08)]"
        style={{
          top: '32%',
          left: '78%',
          transformStyle: 'preserve-3d',
          animation: 'floatCardAlt 8.5s ease-in-out infinite',
        }}
      >
        <div className="flex items-center gap-2 px-3 pt-3">
          <Server className="w-3.5 h-3.5 text-fuchsia-300" />
          <span className="text-[10px] font-mono text-fuchsia-200/80">api.service.ts</span>
        </div>
        <div className="px-3 mt-2 space-y-1">
          <div className="h-1 w-2/3 rounded bg-fuchsia-300/20" />
          <div className="h-1 w-1/3 rounded bg-fuchsia-300/15" />
        </div>
      </div>

      <div
        className="stack-card absolute w-40 h-24 rounded-lg border border-indigo-400/25 bg-gradient-to-br from-indigo-500/10 to-indigo-500/[0.02] backdrop-blur-[2px] shadow-[0_0_40px_rgba(99,102,241,0.08)]"
        style={{
          top: '76%',
          left: '16%',
          transformStyle: 'preserve-3d',
          animation: 'floatCard 9s ease-in-out infinite',
        }}
      >
        <div className="flex items-center gap-2 px-3 pt-3">
          <Database className="w-3.5 h-3.5 text-indigo-300" />
          <span className="text-[10px] font-mono text-indigo-200/80">schema.prisma</span>
        </div>
        <div className="px-3 mt-2 space-y-1">
          <div className="h-1 w-3/5 rounded bg-indigo-300/20" />
          <div className="h-1 w-2/5 rounded bg-indigo-300/15" />
        </div>
      </div>

      {/* Fragments de code fantôme dispersés */}
      {codeSnippets.map((s, i) => (
        <span
          key={i}
          className="ghost-code absolute font-mono text-[11px] text-gray-400 whitespace-nowrap"
          style={
            {
              top: s.top,
              left: s.left,
              transform: `rotate(${s.rotate})`,
              '--ghost-op': 0.07,
              opacity: 0.07,
              animation: `ghostDrift ${6 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.6}s`,
            } as React.CSSProperties
          }
        >
          {s.text}
        </span>
      ))}

      {/* Vignette pour garder le texte parfaitement lisible */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_42%,rgba(4,4,10,0.6)_0%,transparent_72%)]" />
    </div>
  );
};

const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-gray-950 text-white pt-24 pb-10 px-4 sm:px-6"
    >
      <AnimatedBackground />

      {/* ===== Contenu principal ===== */}
      <div className="relative max-w-5xl mx-auto w-full z-10 my-auto text-center">
        {/* Badge disponibilité */}
        <div className="inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm text-emerald-300 mb-6 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="font-medium tracking-wide">
            Disponible : Stage / Alternance / Premier emploi
          </span>
        </div>

        {/* Titre */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6">
          Développeuse Full-Stack
          <br />
          <span className="bg-gradient-to-r from-fuchsia-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">
            Misedratiana Nomena
          </span>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Spécialisée en architectures{' '}
          <span className="text-white font-semibold underline decoration-fuchsia-500/60 underline-offset-4">
            Web & Mobile
          </span>
          . Je transforme un problème métier en une application clé en main :
          performante, propre et scalable.
        </p>

        {/* Stack technique */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto mb-10">
          {[
            { name: 'React / Next.js', color: 'hover:border-cyan-500/50 hover:shadow-cyan-500/20' },
            { name: 'TypeScript', color: 'hover:border-blue-500/50 hover:shadow-blue-500/20' },
            { name: 'Node.js / NestJS', color: 'hover:border-emerald-500/50 hover:shadow-emerald-500/20' },
            { name: 'PostgreSQL / Prisma', color: 'hover:border-indigo-500/50 hover:shadow-indigo-500/20' },
            { name: 'React Native', color: 'hover:border-purple-500/50 hover:shadow-purple-500/20' },
            { name: 'Tailwind CSS', color: 'hover:border-sky-500/50 hover:shadow-sky-500/20' },
          ].map((tech) => (
            <span
              key={tech.name}
              className={`px-3.5 py-1.5 rounded-xl border border-gray-800 bg-gray-900/70 backdrop-blur-md text-xs sm:text-sm font-mono text-gray-300 transition-all duration-300 hover:scale-105 hover:text-white hover:shadow-lg ${tech.color}`}
            >
              {tech.name}
            </span>
          ))}
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
          <a
            href="#projets"
            className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-[15px] font-semibold text-white bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600 hover:from-fuchsia-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_25px_rgba(192,38,211,0.3)] hover:shadow-[0_0_35px_rgba(192,38,211,0.45)] hover:-translate-y-0.5 active:translate-y-0"
          >
            <Sparkles className="w-4.5 h-4.5 text-fuchsia-200" />
            Voir mes réalisations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="/cv.pdf"
            download="CV_Misedratiana_Nomena.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl text-[15px] font-semibold text-gray-200 bg-gray-900/80 backdrop-blur-xl border border-gray-700/70 hover:border-gray-500 hover:bg-gray-800/90 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            <Download className="w-4.5 h-4.5 text-fuchsia-400" />
            Télécharger mon CV
          </a>
        </div>

        {/* Métriques */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto">
          {[
            {
              icon: <Code className="w-5 h-5" />,
              title: '100% Clean Code',
              subtitle: 'TypeScript strict & TDD',
              color: 'text-fuchsia-400 bg-fuchsia-500/10',
            },
            {
              icon: <Layers className="w-5 h-5" />,
              title: 'Web & Mobile',
              subtitle: 'React, Next.js & React Native',
              color: 'text-indigo-400 bg-indigo-500/10',
            },
            {
              icon: <ShieldCheck className="w-5 h-5" />,
              title: 'Backend Solid',
              subtitle: 'NestJS • PostgreSQL • Prisma',
              color: 'text-emerald-400 bg-emerald-500/10',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3.5 p-4 rounded-2xl bg-gray-900/50 border border-gray-800/70 backdrop-blur-sm hover:border-gray-700 transition-colors text-left"
            >
              <div className={`p-2.5 rounded-xl ${item.color}`}>
                {item.icon}
              </div>
              <div>
                <span className="block text-[15px] font-bold text-white font-mono">
                  {item.title}
                </span>
                <span className="text-xs text-gray-400">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Footer hero ===== */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between pt-8">
        <div className="flex items-center gap-2.5">
          {[
            {
              href: 'https://github.com/ton-username',
              icon: <Github className="w-5 h-5" />,
              label: 'GitHub',
              hover: 'hover:border-fuchsia-500/50 hover:text-white',
            },
            {
              href: 'https://linkedin.com/in/ton-profil',
              icon: <Linkedin className="w-5 h-5" />,
              label: 'LinkedIn',
              hover: 'hover:border-indigo-500/50 hover:text-white',
            },
            {
              href: '#contact',
              icon: <Mail className="w-5 h-5" />,
              label: 'Contact',
              hover: 'hover:border-emerald-500/50 hover:text-white',
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target={social.href.startsWith('http') ? '_blank' : undefined}
              rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={social.label}
              className={`p-2.5 rounded-xl bg-gray-900/80 border border-gray-800 text-gray-400 transition-all duration-300 ${social.hover}`}
            >
              {social.icon}
            </a>
          ))}
        </div>

        <a
          href="#competences"
          className="hidden sm:flex items-center gap-2.5 text-xs font-mono text-gray-400 hover:text-fuchsia-400 transition-colors group"
        >
          <span>Découvrir mes compétences</span>
          <div className="w-5 h-8 border-2 border-gray-700 rounded-full flex justify-center p-1 group-hover:border-fuchsia-400 transition-colors">
            <div className="w-1 h-2 bg-fuchsia-400 rounded-full animate-bounce" />
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;