'use client'
import React from 'react';
import { Skill } from '../types';
import { Star } from 'lucide-react'; // Utiliser l'icône Star de Lucide pour les étoiles

const StarSkillCard: React.FC<Skill> = ({ name, icon: Icon, level }) => {
  // Fonction pour déterminer le niveau d'étoiles (max 5)
  const getStars = (level: number) => {
    // Un niveau de 80% (4/5 étoiles) est déjà Très Compétent, ce qui est logique.
    const stars = Math.ceil(level / 20); 
    return Array.from({ length: 5 }, (_, i) => i < stars);
  };

  // Fonction pour déterminer le niveau de compétence textuel
  const getProficiency = (level: number) => {
    if (level >= 95) return 'Maîtrise Exaltée';
    if (level >= 85) return 'Expert / Maîtrise';
    if (level >= 75) return 'Très Compétent';
    if (level >= 60) return 'Connaissances Solides';
    return 'En Progression';
  };

  return (
    // Cadre: Fond plus foncé, Bordure néon subtile, Ombre pour effet 3D/lévitation
    <div className="group p-6 bg-gray-900/60 rounded-xl border border-gray-700 hover:border-fuchsia-500 transition-all duration-500 hover:shadow-2xl hover:shadow-fuchsia-500/20">
      
      {/* Ligne 1: Icône, Nom, Niveau */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          {/* Icône: Plus grand et en couleur néon principale */}
          <Icon className="w-10 h-10 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />
          
          <div>
            {/* Nom: Texte blanc avec un petit effet de lueur (via une ombre textuelle très légère) */}
            <h3 className="text-xl font-bold text-white tracking-wide drop-shadow-sm">{name}</h3>
            {/* Niveau textuel: Subtil, mais descriptif */}
            <p className="text-sm text-gray-400 mt-0.5">{getProficiency(level)}</p>
          </div>
        </div>
        
        {/* Pourcentage: Très visible, en couleur néon secondaire */}
        <span className="text-3xl font-extrabold text-indigo-400 drop-shadow-md">{level}%</span>
      </div>

      {/* Ligne 2: Étoiles de notation */}
      <div className="flex gap-1 mb-4">
        {getStars(level).map((filled, index) => (
          <Star
            key={index}
            className={`w-5 h-5 transition-all duration-300 ${
              filled 
                // Étoile remplie : Jaune éclatant avec un effet 'neon glow'
                ? 'text-yellow-400 fill-yellow-400/80 drop-shadow-md' 
                // Étoile vide : Gris foncé pour le contraste
                : 'text-gray-700 fill-gray-700'
            }`}
          />
        ))}
      </div>

      {/* Ligne 3: Barre de progression Élégante (simplifiée) */}
      <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
          // Utiliser le dégradé "Hero" pour l'uniformité
          style={{ 
            width: `${level}%`,
            background: 'linear-gradient(to right, var(--tw-color-purple-600), var(--tw-color-fuchsia-600), var(--tw-color-indigo-600))'
          }}
        ></div>
      </div>

      {/* Ajout d'une Lueur au survol pour le "wow effect" */}
      <div className="absolute inset-0 bg-fuchsia-500/0 group-hover:bg-fuchsia-500/10 rounded-xl transition-opacity duration-500 pointer-events-none"></div>

    </div>
  );
};

export default StarSkillCard;