// app/portfolio/tic-tac-toe/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink, Github, Play, Code, Zap, Users, Smartphone } from 'lucide-react';

export default function TicTacToeProject() {
  const [activeTab, setActiveTab] = useState('demo');
  const [isPlaying, setIsPlaying] = useState(false);

  const techStack = [
    { name: 'Next.js 14', category: 'Framework' },
    { name: 'TypeScript', category: 'Langage' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'React', category: 'Bibliothèque' },
    { name: 'JavaScript', category: 'Langage' },
    { name: 'HTML5', category: 'Web' },
    { name: 'CSS3', category: 'Styling' },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Performance Optimisée',
      description: 'Temps de chargement rapide grâce à JavaScript vanilla et optimisation des assets'
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: 'Design Responsive',
      description: 'Interface adaptative qui fonctionne parfaitement sur tous les appareils'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Expérience Utilisateur',
      description: 'Animations fluides et feedback visuel pour une interaction engageante'
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: 'Code Maintenable',
      description: 'Architecture modulaire avec séparation claire des responsabilités'
    }
  ];

  const projectStats = [
    { value: '2K+', label: 'Lignes de code' },
    { value: '100%', label: 'Responsive' },
    { value: '10', label: 'Patterns de victoire' },
    { value: '0ms', label: 'Détection instantanée' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Navigation */}
      <nav className="border-b border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              href="/"
              className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Retour au portfolio
            </Link>
            
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/votre-username/tic-tac-toe-pro"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
                Code source
              </a>
              <a
                href="/projects/tic-tac-toe/demo"
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Play className="w-5 h-5" />
                Voir la démo
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Tic-Tac-Toe <span className="text-yellow-300">Pro</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Un jeu moderne et interactif développé avec les technologies web les plus récentes
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                >
                  {tech.name}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {projectStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-yellow-300">{stat.value}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Démonstration Interactive
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Testez le jeu directement dans votre navigateur. Interface intuitive et expérience utilisateur fluide.
            </p>
          </div>

          {/* Game Demo */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 mb-16">
            <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-600 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Démo Tic-Tac-Toe Pro
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-6">
                  Cliquez sur le bouton ci-dessous pour lancer la démonstration
                </p>
                <button
                  onClick={() => setIsPlaying(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Lancer la démo
                </button>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-blue-600 dark:text-blue-400 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code & Technical Details */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Détails Techniques
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-300">
              Exploration du code et des décisions techniques
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="border-b border-slate-200 dark:border-slate-700">
              <div className="flex">
                {['architecture', 'algorithmes', 'performance'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-4 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8">
              {activeTab === 'architecture' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Architecture Modulaire
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Le projet suit une architecture claire avec séparation des responsabilités :
                  </p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        🎮 Logique Métier
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Gestion d'état, algorithmes de jeu, règles métier
                      </p>
                    </div>
                    <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        🎨 Interface Utilisateur
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Composants React, animations, responsive design
                      </p>
                    </div>
                    <div className="p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
                        ⚡ Performance
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-300">
                        Optimisation des re-rendus, lazy loading, memoization
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'algorithmes' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Algorithmes de Jeu
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Implémentation efficace des patterns de victoire et gestion des états :
                  </p>
                  <div className="bg-slate-900 rounded-lg p-6">
                    <pre className="text-green-400 text-sm overflow-x-auto">
{`// Détection des patterns gagnants
const winningPatterns = [
  [0, 1, 2, 3], [4, 5, 6, 7],     // Lignes
  [8, 9, 10, 11], [12, 13, 14, 15],
  [0, 4, 8, 12], [1, 5, 9, 13],   // Colonnes
  [2, 6, 10, 14], [3, 7, 11, 15],
  [0, 5, 10, 15], [3, 6, 9, 12]   // Diagonales
];

function checkWinner(board) {
  return winningPatterns.some(pattern =>
    pattern.every(index => board[index] === currentPlayer)
  );
}`}
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'performance' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Optimisations Performance
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300">
                    Techniques mises en œuvre pour garantir une expérience fluide :
                  </p>
                  <ul className="space-y-3 text-slate-600 dark:text-slate-300">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Mémoization des composants React avec React.memo
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Détection de victoire en temps constant O(1)
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Code splitting et lazy loading des assets
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Optimisation CSS avec PurgeCSS de Tailwind
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Prêt à collaborer ?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto">
            Ce projet démontre mes compétences en développement front-end moderne. 
            Je suis disponible pour discuter de comment je pourrais contribuer à votre équipe.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:contact@example.com"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Me contacter
            </a>
            <a
              href="/CV_Developpeur_Frontend.pdf"
              className="px-8 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors font-semibold"
            >
              Télécharger mon CV
            </a>
          </div>

          <div className="mt-12 p-6 bg-slate-100 dark:bg-slate-700 rounded-xl">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Compétences démontrées dans ce projet :
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                'React & Next.js',
                'TypeScript',
                'Tailwind CSS',
                'Algorithmes',
                'UI/UX Design',
                'Performance Web',
                'Responsive Design',
                'Git & Versioning'
              ].map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}