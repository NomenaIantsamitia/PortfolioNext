// TagManagement.tsx - Composant Next.js
'use client'
import { Tag, Search, Plus, ListChecks, Edit, Trash2, Palette, Save } from 'lucide-react';
// Note: Utilisation des icônes Lucide pour Tailwind CSS

export default function TagManagement() {
  const allTags = [
    { name: 'React', count: 25, latest: 'React Patterns', time: '2h ago', color: '#3498db' },
    { name: 'JavaScript', count: 18, latest: 'ES6 Features', time: '1 jour ago', color: '#f1c40f' },
    { name: 'API', count: 15, latest: 'REST vs GraphQL', time: '2 jours ago', color: '#2ecc71' },
    { name: 'CSS', count: 12, latest: 'Grid Layout', time: '3 jours ago', color: '#9b59b6' },
    { name: 'Database', count: 8, latest: 'SQL Joins', time: '1 week ago', color: '#e74c3c' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      
      {/* Barre d'Action Supérieure */}
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <h1 className="text-xl font-semibold flex items-center">
            <Tag className="w-5 h-5 mr-2 text-purple-600 dark:text-purple-400" /> Gestion des Tags (45 Total)
        </h1>
        <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition text-sm">
                <Plus className="w-4 h-4 mr-2" /> Nouveau Tag
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm">
                <ListChecks className="w-4 h-4 mr-2" /> Édition en Masse
            </button>
        </div>
      </header>

      {/* Barre de Recherche et Filtrage */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher ou filtrer les tags (ex: react)"
            className="flex-grow bg-transparent focus:outline-none text-lg placeholder-gray-400"
          />
        </div>
      </div>

      {/* Contenu Principal - Liste des Tags et Couleurs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Colonne 1 & 2: Liste des Tags (avec détails et actions) */}
        <section className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">📚 Tags Actifs ({allTags.length} affichés)</h2>
            {allTags.map((tag) => (
                <TagListItem key={tag.name} tag={tag} />
            ))}
        </section>

        {/* Colonne 3: Gestion des Couleurs et Options Globales */}
        <aside className="lg:col-span-1 space-y-8">
            
            {/* Gestion des Couleurs */}
            <TagColorManagement colors={allTags.map(t => ({ name: t.name, color: t.color }))} />

            {/* Options Globales */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4 flex items-center text-red-600 dark:text-red-400">
                    Options Dangereuses
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Attention : ces actions sont irréversibles.
                </p>
                <button className="w-full py-2 bg-red-100 text-red-600 font-semibold rounded-lg hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/50 transition">
                    Supprimer les Tags Inutilisés
                </button>
            </div>
        </aside>
      </div>
      
    </div>
  );
}

// --- Composants Réutilisables ---

// Élément unique dans la liste des tags
const TagListItem = ({ tag }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 border border-gray-100 dark:border-gray-700 flex justify-between items-center transition duration-300 hover:shadow-lg">
        
        {/* Infos du Tag */}
        <div>
            <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: tag.color }}></div>
                <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{tag.name}</span>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({tag.count} notes)</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 ml-5">
                Dernière note: **{tag.latest}** - {tag.time}
            </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
            <button title="Éditer le nom/la couleur" className="p-2 rounded-full text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition">
                <Edit className="w-4 h-4" />
            </button>
            <button title="Supprimer le tag" className="p-2 rounded-full text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition">
                <Trash2 className="w-4 h-4" />
            </button>
        </div>
    </div>
);

// Bloc de gestion des couleurs
const TagColorManagement = ({ colors }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4 flex items-center text-blue-600 dark:text-blue-400">
            <Palette className="w-5 h-5 mr-2" /> Personnalisation des Couleurs
        </h3>
        
        <div className="space-y-3">
            {colors.map((item) => (
                <div key={item.name} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{item.name}:</span>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <input
                            type="color"
                            defaultValue={item.color}
                            className="w-8 h-8 rounded-full border-none cursor-pointer"
                        />
                        <span className="text-gray-600 dark:text-gray-400 uppercase">{item.color}</span>
                    </div>
                </div>
            ))}
        </div>

        <button className="w-full mt-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition">
            <Save className="w-4 h-4 inline-block mr-1" /> Enregistrer les Couleurs
        </button>
    </div>
);