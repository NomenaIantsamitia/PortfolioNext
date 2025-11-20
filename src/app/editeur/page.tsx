// NoteEditor.tsx (Composant Next.js avec Tailwind CSS)
'use client'
import React, { useState } from 'react';
import {
  Save, Eye, ArrowLeft, Tag, Star, Plus, Link, ArrowDownLeft, ArrowUpRight
} from 'lucide-react';

// Composant pour l'éditeur de Tags avec autocomplétion (simulé)
const TagEditor = ({ tags }: { tags: string[] }) => (
  <div className="flex items-center flex-wrap gap-2 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
    {tags.map((tag) => (
      <span key={tag} className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 text-sm rounded-full font-medium">
        {tag}
        <button className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-900 font-bold leading-none">×</button>
      </span>
    ))}
    <input
      type="text"
      placeholder="Add tag..."
      className="bg-transparent text-gray-800 dark:text-white flex-grow min-w-[100px] focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 text-sm"
    />
    <Plus className="w-4 h-4 text-gray-500" />
  </div>
);

// Composant pour le système de Rating (Étoiles)
const RatingComponent = ({ rating, setRating }: { rating: number, setRating: (r: number) => void }) => (
  <div className="flex items-center cursor-pointer space-x-0.5" title="Click to change rating">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-5 h-5 transition-colors duration-200 ${
          star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300 hover:fill-yellow-300'
        }`}
        onClick={() => setRating(star)}
      />
    ))}
    <span className="text-sm ml-2 text-gray-500 dark:text-gray-400">({rating}/5)</span>
  </div>
);

const NoteEditor = () => {
  const [currentRating, setCurrentRating] = useState(4);
  const [mode, setMode] = useState<'edit' | 'preview'>('edit');
  
  // Contenu statique pour l'éditeur
  const noteContent = `
# React Advanced Patterns

## State Management

Pour gérer le [[state]] dans React, on peut utiliser plusieurs approches:

- [[useState]] pour le state local
- [[useReducer]] pour le state complexe
- [[Context API]] pour le state global

\`\`\`js
// Exemple de useReducer
const [state, dispatch] = useReducer(reducer, initialState);
\`\`\`

## Performance Optimization

Utiliser [[React.memo]] et \`useCallback\` pour optimiser le rendu.
`;

  // Liens détectés automatiquement
  const linksFrom = ["useState", "useReducer", "Context API", "React.memo"];
  const linksTo = ["React Basics", "Component Architecture"];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-10">
      
      {/* 1. Barre d'actions supérieure */}
      <header className="flex justify-between items-center mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
          <Link className="w-6 h-6 mr-3 text-indigo-500" />
          📝 Editing: "React Patterns"
        </h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setMode(mode === 'edit' ? 'preview' : 'edit')}
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition-colors ${
              mode === 'edit' 
                ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            <Eye className="w-5 h-5 mr-2" /> {mode === 'edit' ? 'Preview' : 'Edit'}
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors">
            <Save className="w-5 h-5 mr-2" /> Save
          </button>
          <button className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back
          </button>
        </div>
      </header>

      {/* 2. Métadonnées (Titre, Tags, Rating) */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md mb-6 border border-gray-100 dark:border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Titre */}
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title:</label>
            <input
              type="text"
              defaultValue="React Advanced Patterns"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 font-bold"
            />
          </div>

          {/* Tags */}
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
              <Tag className="w-4 h-4 mr-1" /> Tags:
            </label>
            <TagEditor tags={['React', 'Patterns', 'Hooks']} />
          </div>

          {/* Rating */}
          <div className="col-span-1 md:col-span-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" /> Rating:
            </label>
            <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 flex h-full items-center">
                <RatingComponent rating={currentRating} setRating={setCurrentRating} />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Zone d'Édition et Liens Associés (Split vertical) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 h-[60vh]">
        
        {/* Éditeur Principal (3/4 de la largeur) */}
        <div className="md:col-span-3">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Editor</h2>
          <textarea
            className={`w-full h-full p-4 rounded-xl shadow-inner border border-gray-300 dark:border-gray-600 
              bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
              font-mono text-sm resize-none focus:outline-none`}
            defaultValue={noteContent}
            placeholder="Start writing your note here..."
          />
          {/* Note: Un éditeur Markdown réel (comme CodeMirror ou Monaco) remplacerait ce simple textarea */}
        </div>
        
        {/* Panneau des Liens (1/4 de la largeur) */}
        <aside className="md:col-span-1 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-y-auto">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Link className="w-5 h-5 mr-2 text-blue-500" /> Linked Notes
          </h2>
          
          <div className="space-y-4">
            
            {/* Liens SORTANTS (FROM this note) */}
            <div className="border-b pb-4 border-gray-100 dark:border-gray-700">
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1 text-green-500" /> Links FROM this note:
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {linksFrom.map(link => (
                  <li key={link} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer truncate">
                    • {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* Liens ENTRANTS (TO this note / Backlinks) */}
            <div>
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                <ArrowDownLeft className="w-4 h-4 mr-1 text-red-500" /> Links TO this note:
              </h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                {linksTo.map(link => (
                  <li key={link} className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer truncate">
                    • {link}
                  </li>
                ))}
              </ul>
            </div>
            
            <hr className="my-4 border-gray-100 dark:border-gray-700" />

            <button className="w-full px-4 py-2 bg-indigo-500 text-white rounded-lg font-semibold shadow-md hover:bg-indigo-600 transition-colors">
              Create New Link
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default NoteEditor;