// app/page.tsx
import React from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, Code, Zap, Briefcase } from 'lucide-react'; // Icônes légères
// Utilisation d'icônes thématiques pour les sections

// --- Configuration et Données Simples ---

const NAV_ITEMS = [
  { id: 'accueil', label: 'Accueil' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'experience', label: 'Expérience' },
]; // Suppression de 'Contact' dans la NAV, mis en footer/quick link

const PROJECTS_DATA = [
  {
    title: "Plateforme de Gestion SaaS",
    description: "Application full-stack moderne pour la gestion des clients et des abonnements.",
    techs: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
    linkLive: "#",
    linkCode: "#",
  },
  {
    title: "Site E-commerce Performant",
    description: "Interface utilisateur optimisée pour la vitesse et l'expérience d'achat mobile.",
    techs: ["React", "Redux Toolkit", "Styled-Components", "Jest"],
    linkLive: "#",
    linkCode: "#",
  },
  // Ajoutez d'autres projets...
];

const SKILLS_DATA = [
  "JavaScript (ES6+)", "TypeScript", "React", "Next.js", "Tailwind CSS",
  "Redux/Zustand", "HTML5 & CSS3", "Git", "Jest/RTL", "Node.js (Bases)",
];

const EXPERIENCE_DATA = [
  {
    title: "Développeur Frontend Principal", // Renommé 'Senior' pour plus d'impact
    company: "Tech Solutions Inc.",
    dates: "2022 - Présent",
    description: [
      "Architecte principal de l'interface utilisateur pour une plateforme B2B, pilotant la migration vers **TypeScript** et l'adoption de pratiques DDD.",
      "Conception et mise en œuvre d'une stratégie de tests robuste (**Jest/RTL**) atteignant un taux de couverture critique de 90%.",
      "Optimisation des performances via Next.js (SSR, ISR, Code Splitting) pour une amélioration de 40% du Time to Interactive (TTI).",
    ],
  },
  {
    title: "Développeur Web Full-Stack", // Ajout d'une nuance pour la junior experience
    company: "Startup Innovante",
    dates: "2020 - 2022",
    description: [
      "Développement de composants React réutilisables, accessibles (WCAG) et conformes aux designs Figma.",
      "Participation active à l'API design (Node.js/Express) et à la gestion des bases de données.",
      "Contribution au processus CI/CD et amélioration continue de la qualité du code via revues de code structurées.",
    ],
  },
];


// --- Composants de Section ---

// Composant de Tag/Badge pour les technologies (Palette plus sombre/technique)
const TechBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-700 px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 shadow-sm transition-colors">
    {children}
  </span>
);

// Composant pour la navigation principale (Minimaliste)
const Header = () => (
  <header className="sticky top-0 z-10 w-full border-b border-gray-100 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md">
    <nav className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
      <span className="text-xl font-extrabold text-gray-900 dark:text-white tracking-wider hover:text-indigo-600 dark:hover:text-indigo-400 transition">
        &lt;[Nom /&gt;]
      </span>
      <div className="hidden sm:flex space-x-6">
        {NAV_ITEMS.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium text-sm uppercase tracking-wider"
          >
            {item.label}
          </a>
        ))}
      </div>
      <a 
          href="#contact" // Bouton Contact en évidence
          className="hidden sm:block px-4 py-2 text-sm font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-lg dark:shadow-indigo-500/30"
        >
          Contact
        </a>
    </nav>
  </header>
);

// 1. Section Héro (Impact Maximal)
const HeroSection = () => (
  <section id="accueil" className="max-w-4xl mx-auto px-4 py-24 min-h-[calc(100vh-64px)] flex flex-col justify-center items-center text-center">
    
    <div className="h-28 w-28 rounded-full bg-gray-100 dark:bg-gray-800 mb-6 border-4 border-indigo-600 dark:border-indigo-400 shadow-xl overflow-hidden animate-pulse-slow">
        {/* Placeholder pour une photo pro ou un avatar minimaliste */}
    </div>

    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-gray-900 dark:text-white mb-2 leading-tight">
      Développeur <span className="text-indigo-600 dark:text-indigo-400">Frontend Principal</span>
    </h1>
    <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 font-light mb-6">
      Construction d'expériences Next.js performantes.
    </h2>
    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-10 leading-relaxed">
      Je conçois et déploie des applications web **modernes, scalables et testées** avec une expertise particulière en **TypeScript** et dans l'architecture des systèmes basés sur **React/Next.js**.
    </p>
    
    <div className="flex gap-4">
      <a
        href="#projets"
        className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-700 transition transform hover:scale-[1.02] text-lg flex items-center gap-2"
      >
        Voir Mon Travail <ArrowUpRight size={20} />
      </a>
      <a
        href="votre-cv.pdf"
        target="_blank"
        className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 font-semibold rounded-full hover:bg-indigo-50/50 dark:hover:bg-gray-800/50 transition text-lg"
      >
        Télécharger CV
      </a>
    </div>
  </section>
);

// 2. Section Compétences (Clarté et Structure)
const AboutSkillsSection = () => (
  <section id="competences" className="max-w-4xl mx-auto px-4 py-20">
    <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 flex items-center gap-3">
      <Zap size={32} className="text-indigo-600 dark:text-indigo-400" /> Mon Expertise & Philosophie
    </h3>
    
    <div className="grid md:grid-cols-3 gap-12">
        {/* Colonne "Philosophie" transformée en carte d'impact */}
        <div className="md:col-span-1 p-6 bg-indigo-50/50 dark:bg-gray-800/50 rounded-xl border border-indigo-200 dark:border-gray-700 shadow-md">
            <h4 className="text-xl font-bold mb-3 text-indigo-700 dark:text-indigo-300">
                Qualité du Code
            </h4>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                Focus sur la **maintenabilité** (SOLID, Clean Architecture) et la **sécurité**. L'adoption de **TypeScript** est la base de tout projet sérieux pour prévenir les erreurs.
            </p>
            <div className='mt-4'>
                <h4 className="text-xl font-bold mb-2 text-indigo-700 dark:text-indigo-300">
                    Accessibilité
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
                    Intégration systématique des directives WCAG pour garantir une expérience utilisateur inclusive pour tous.
                </p>
            </div>
        </div>
        
        {/* Colonne "Compétences" */}
        <div className="md:col-span-2">
            <h4 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                Stack Technique Principale
            </h4>
            <div className="flex flex-wrap gap-3">
                {SKILLS_DATA.map((skill) => (
                    <TechBadge key={skill}>{skill}</TechBadge>
                ))}
            </div>
            <p className="mt-6 text-gray-600 dark:text-gray-400 text-sm italic">
                (Base en Node.js, Express et Docker pour une communication Full-Stack efficace.)
            </p>
        </div>
    </div>
  </section>
);

// 3. Section Projets (Visualisation Aérienne)
const ProjectsSection = () => (
  <section id="projets" className="max-w-4xl mx-auto px-4 py-20 bg-gray-50 dark:bg-gray-950">
    <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 flex items-center gap-3">
      <Code size={32} className="text-indigo-600 dark:text-indigo-400" /> Projets Clés
    </h3>
    <div className="grid md:grid-cols-2 gap-10">
      {PROJECTS_DATA.map((project) => (
        <article key={project.title} className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl hover:shadow-indigo-500/20 transition duration-500 border border-gray-100 dark:border-gray-800 flex flex-col h-full">
          {/* Fausse image de fond pour l'aspect visuel */}
          <div className="h-48 bg-cover bg-center rounded-lg mb-6 opacity-80" 
               style={{ backgroundImage: `url('https://via.placeholder.com/600x300/1e293b/94a3b8?text=${encodeURIComponent(project.title)}')` }}>
          </div>

          <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {project.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techs.map((tech) => (
              <TechBadge key={tech}>{tech}</TechBadge>
            ))}
          </div>
          
          <div className="flex gap-6 mt-auto">
            <a 
              href={project.linkLive} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center hover:text-indigo-800 dark:hover:text-indigo-300 transition group"
            >
              Voir le Live 
              <ArrowUpRight size={20} className="ml-1 transition transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <a 
              href={project.linkCode} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-300 flex items-center hover:text-gray-900 dark:hover:text-white transition"
            >
              Code Source <Github size={20} className="ml-2" />
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

// 4. Section Expérience (Timeline Raffinée)
const ExperienceSection = () => (
  <section id="experience" className="max-w-4xl mx-auto px-4 py-20">
    <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-12 flex items-center gap-3">
      <Briefcase size={32} className="text-indigo-600 dark:text-indigo-400" /> Parcours Professionnel
    </h3>
    
    <div className="relative border-l-4 border-gray-200 dark:border-gray-700 ml-4 md:ml-12">
      {EXPERIENCE_DATA.map((exp, index) => (
        <div key={index} className="mb-10 ml-8 md:ml-12">
          {/* Point de la timeline plus prononcé */}
          <div className="absolute w-4 h-4 bg-indigo-600 rounded-full mt-2 -left-[10px] md:-left-[12px] border-4 border-white dark:border-gray-900 ring-4 ring-indigo-200 dark:ring-indigo-800"></div>
          
          <time className="block mb-1 text-sm font-semibold leading-none text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            {exp.dates}
          </time>
          <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{exp.title}</h4>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">{exp.company}</p>
          
          <ul className="text-gray-600 dark:text-gray-400 list-none space-y-2 mt-4 text-base">
            {exp.description.map((point, i) => (
              <li key={i} className="flex items-start">
                <span className="text-indigo-600 dark:text-indigo-400 mr-2 mt-1">
                  &bull;
                </span> 
                {point}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

// 5. Section Contact & Footer (Minimaliste et Clair)
const ContactSection = () => (
  <section id="contact" className="max-w-4xl mx-auto px-4 py-20">
    <div className="bg-gray-100 dark:bg-gray-800 p-10 rounded-2xl shadow-xl text-center">
      <h3 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">
        Prêt à collaborer ?
      </h3>
      <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
        Je suis ouvert aux opportunités d'architecture Frontend et de leadership technique.
      </p>
      
      {/* Liens sociaux plus discrets et centrés */}
      <div className="flex justify-center gap-8">
        <a 
          href="mailto:votre.email@exemple.com" 
          aria-label="Contacter par Email"
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition flex flex-col items-center gap-1 group"
        >
          <Mail size={32} className="group-hover:scale-110 transition" /> 
          <span className="text-sm font-medium">Email</span>
        </a>
        <a 
          href="https://github.com/votre_profil" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Profil GitHub"
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition flex flex-col items-center gap-1 group"
        >
          <Github size={32} className="group-hover:scale-110 transition" /> 
          <span className="text-sm font-medium">GitHub</span>
        </a>
        <a 
          href="https://linkedin.com/in/votre_profil" 
          target="_blank" 
          rel="noopener noreferrer"
          aria-label="Profil LinkedIn"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition flex flex-col items-center gap-1 group"
        >
          <Linkedin size={32} className="group-hover:scale-110 transition" /> 
          <span className="text-sm font-medium">LinkedIn</span>
        </a>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="mt-16 border-t border-gray-100 dark:border-gray-800 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
    <p>
      © {new Date().getFullYear()} [Votre Nom]. Design et Code par un développeur passionné.
    </p>
    <p className='mt-1 text-xs'>
        Fait avec <span className='text-red-500'>&hearts;</span>, Next.js et Tailwind CSS.
    </p>
  </footer>
);

// --- La Page Principale ---

export default function HomePage() {
  return (
    // Utilisation d'une police sans serif par défaut pour un look moderne (antialiased)
    <main className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 antialiased font-sans">
      <Header />
      <HeroSection />
      {/* Séparateurs plus subtils */}
      <div className="max-w-4xl mx-auto border-t border-gray-100 dark:border-gray-800 w-full"></div>
      <AboutSkillsSection />
      <div className="max-w-4xl mx-auto border-t border-gray-100 dark:border-gray-800 w-full"></div>
      <ProjectsSection />
      <div className="max-w-4xl mx-auto border-t border-gray-100 dark:border-gray-800 w-full"></div>
      <ExperienceSection />
      <ContactSection />
      <Footer />
    </main>
  );
}