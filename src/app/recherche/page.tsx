// AdvancedSearch.tsx (Composant Next.js avec Tailwind CSS)
'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { Search, Sliders, Hash, Calendar, Star, Link, AlertTriangle, X } from 'lucide-react';

// --- INTERFACES ET DONNÉES DE SIMULATION ---

interface Note {
    id: number;
    title: string;
    content: string;
    rawContent: string;
    links: number;
    tags: string[];
    time: string; // Pour la simulation de date
    rating: number; // 1-5
    status: 'Complete' | 'Draft' | 'To Review' | 'Archived';
}

const ALL_TAGS = ['React', 'State', 'Hooks', 'JavaScript', 'Database', 'API', 'Architecture', 'CSS', 'DevOps'];
const ALL_STATUS = ['All', 'Complete', 'Draft', 'To Review'];

const initialNotes: Note[] = [
    {
        id: 1,
        title: 'React State Management',
        content: '...gérer le **state** dans **React**. Le choix du gestionnaire de **state**...',
        rawContent: 'Comment gérer le state dans React. Le choix du gestionnaire de state dépend de la complexité de l\'application.',
        links: 12,
        tags: ['React', 'State', 'Hooks', 'Architecture'],
        time: '2 hours ago',
        rating: 4,
        status: 'Complete',
    },
    {
        id: 2,
        title: 'useState Hook Patterns',
        content: 'Le hook **useState** permet de gérer le **state** local simplement. Utiliser `useEffect` pour les effets de bord...',
        rawContent: 'Le hook useState permet de gérer le state local simplement. Utiliser useEffect pour les effets de bord et les side effects.',
        links: 8,
        tags: ['React', 'Hooks', 'JavaScript'],
        time: '1 day ago',
        rating: 3,
        status: 'Draft',
    },
    {
        id: 3,
        title: 'Global State Solutions',
        content: 'Redux vs Context API pour le **state** global dans votre architecture.',
        rawContent: 'Redux vs Context API pour le state global dans votre architecture.',
        links: 25,
        tags: ['React', 'State', 'Architecture', 'API'],
        time: '3 days ago',
        rating: 5,
        status: 'Complete',
    },
    {
        id: 4,
        title: 'Database Normalization',
        content: 'Principes de la normalisation de **Database** (1NF, 2NF, 3NF) et quand les enfreindre.',
        rawContent: 'Principes de la normalisation de Database (1NF, 2NF, 3NF) et quand les enfreindre.',
        links: 5,
        tags: ['Database', 'Architecture'],
        time: '2 weeks ago',
        rating: 4,
        status: 'Complete',
    },
    {
        id: 5,
        title: 'CSS Grid vs Flexbox',
        content: 'Comparer **CSS** Grid et Flexbox pour la mise en page moderne.',
        rawContent: 'Comparer CSS Grid et Flexbox pour la mise en page moderne.',
        links: 3,
        tags: ['CSS'],
        time: '1 month ago',
        rating: 2,
        status: 'To Review',
    },
];


// --- COMPOSANT SearchResultItem (Mis à jour pour un meilleur affichage) ---

interface SearchResultItemProps extends Note {
    highlightQuery: string;
}

const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
        new RegExp(query, 'i').test(part) ? 
        `<span class="bg-yellow-300 dark:bg-yellow-600/50 font-bold">${part}</span>` : 
        part
    ).join('');
};


const SearchResultItem: React.FC<SearchResultItemProps> = ({ title, rawContent, links, tags, time, rating, highlightQuery }) => {
    
    // Le contenu mis en forme pour le surlignage
    const highlightedContent = highlightText(rawContent, highlightQuery);

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer">
            <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 flex items-center">
                    📝 {highlightText(title, highlightQuery)}
                </h3>
                <div className="flex items-center space-x-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className={`w-4 h-4 transition-colors ${
                                star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'
                            }`}
                        />
                    ))}
                </div>
            </div>
            
            {/* Aperçu du contenu avec mise en évidence (Highlight) */}
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                <span dangerouslySetInnerHTML={{ __html: highlightedContent }} />
            </p>

            {/* Métadonnées */}
            <div className="flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                <span className="flex items-center">
                    <Link className="w-4 h-4 mr-1" /> **{links}** links
                </span>
                <span className="flex items-center">
                    <Hash className="w-4 h-4 mr-1" /> 🏷️ {tags.join(', ')}
                </span>
                <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" /> ⏱️ Updated **{time}**
                </span>
            </div>
        </div>
    );
};


// --- COMPOSANT PRINCIPAL ADVANCED SEARCH ---

const AdvancedSearch: React.FC = () => {
    // --- 1. ÉTATS DE LA RECHERCHE ---
    const [searchQuery, setSearchQuery] = useState('state'); // Requête de l'utilisateur
    const [searchTime, setSearchTime] = useState(0); // Temps de recherche simulé
    const [filters, setFilters] = useState({
        scope: { title: true, content: true, tags: true, code: false, links: false },
        selectedTags: ['React', 'State'],
        dateRange: 'All time',
        status: 'All',
    });

    // --- 2. LOGIQUE DE FILTRAGE (useMemo pour la performance) ---
    const filteredResults = useMemo(() => {
        const startTime = performance.now();
        const queryLower = searchQuery.toLowerCase().trim();
        
        let results = initialNotes.filter(note => {
            // Filtrage par portée (Scope Filtering)
            let matchesQuery = false;
            if (queryLower) {
                if (filters.scope.title && note.title.toLowerCase().includes(queryLower)) matchesQuery = true;
                if (filters.scope.content && note.rawContent.toLowerCase().includes(queryLower)) matchesQuery = true;
                if (filters.scope.tags && note.tags.some(tag => tag.toLowerCase().includes(queryLower))) matchesQuery = true;
                // Ignorer code et links pour la simulation simple
            } else {
                matchesQuery = true; // Si pas de requête, tous les résultats correspondent à la requête
            }

            if (!matchesQuery) return false;

            // Filtrage par Tags sélectionnés
            if (filters.selectedTags.length > 0) {
                const matchesTags = filters.selectedTags.every(filterTag => 
                    note.tags.map(t => t.toLowerCase()).includes(filterTag.toLowerCase())
                );
                if (!matchesTags) return false;
            }

            // Filtrage par Statut
            if (filters.status !== 'All' && filters.status !== note.status) {
                return false;
            }
            
            // Filtrage par Date (Simulation simple : on filtre uniquement par la date dans une app réelle)
            // Ici, nous ignorons le filtre Date pour ne pas complexifier inutilement la simulation

            return true;
        });

        const endTime = performance.now();
        setSearchTime(Math.round(endTime - startTime));
        
        return results;

    }, [searchQuery, filters]); // Dépendances: Recalculer si la requête ou les filtres changent

    // --- 3. GESTION DES HANDLERS D'ÉTAT ---

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const handleScopeToggle = (key: keyof typeof filters.scope) => {
        setFilters(prev => ({
            ...prev,
            scope: { ...prev.scope, [key]: !prev.scope[key] }
        }));
    };
    
    const handleAddTag = (tag: string) => {
        if (!filters.selectedTags.includes(tag)) {
            setFilters(prev => ({
                ...prev,
                selectedTags: [...prev.selectedTags, tag]
            }));
        }
    };
    
    const handleRemoveTag = (tagToRemove: string) => {
        setFilters(prev => ({
            ...prev,
            selectedTags: prev.selectedTags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({
            ...prev,
            status: e.target.value as 'All' | 'Complete' | 'Draft' | 'To Review'
        }));
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilters(prev => ({
            ...prev,
            dateRange: e.target.value
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 md:p-10">
            
            {/* 1. Barre de Recherche et Compteur de Résultats */}
            <div className="mb-8 flex flex-col md:flex-row md:items-center md:space-x-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notes, tags, and content..."
                        value={searchQuery}
                        onChange={handleSearchChange} // Mise à jour de la requête
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 text-lg shadow-inner"
                    />
                </div>
                <p className="mt-4 md:mt-0 text-lg font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    🎯 **{filteredResults.length} results** found in {searchTime}ms
                </p>
            </div>

            {/* 2. Panneau des Filtres Avancés */}
            <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                    <Sliders className="w-5 h-5 mr-2 text-indigo-500" /> Advanced Filters
                </h2>
                
                {/* Filtres par Contenu (Scope) */}
                <div className="flex flex-wrap gap-x-6 gap-y-3 mb-5 border-b pb-4 border-gray-100 dark:border-gray-700">
                    {(Object.keys(filters.scope) as Array<keyof typeof filters.scope>).map(key => (
                        <label key={key} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 font-medium capitalize">
                            <input 
                                type="checkbox" 
                                checked={filters.scope[key]} 
                                onChange={() => handleScopeToggle(key)}
                                className="form-checkbox text-blue-600 rounded focus:ring-blue-500" 
                            />
                            <span>{key}</span>
                        </label>
                    ))}
                </div>

                {/* Filtres Tags, Date et Statut */}
                <div className="flex flex-wrap gap-4 items-center">
                    {/* Tags sélectionnées */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">Tags:</span>
                        <div className="flex flex-wrap gap-2">
                            {filters.selectedTags.map((tag) => (
                                <span key={tag} className="px-3 py-1 text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full font-medium flex items-center">
                                    {tag}
                                    <button 
                                        onClick={() => handleRemoveTag(tag)}
                                        className="ml-1 text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-100 font-bold"
                                    >
                                        <X className="w-3 h-3"/>
                                    </button>
                                </span>
                            ))}
                            <select 
                                onChange={(e) => handleAddTag(e.target.value)}
                                value="" // Ceci permet au placeholder de revenir après la sélection
                                className="px-3 py-1 text-sm bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-full cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 border border-transparent focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="" disabled>+ Add Tag</option>
                                {ALL_TAGS.filter(tag => !filters.selectedTags.includes(tag)).map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Filtre Date */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">Date:</span>
                        <select 
                            value={filters.dateRange} 
                            onChange={handleDateChange}
                            className="p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="All time">All time</option>
                            <option value="Last Week">Last Week</option>
                            <option value="Last Month">Last Month</option>
                        </select>
                    </div>

                    {/* Filtre Statut */}
                    <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">Status:</span>
                        <select 
                            value={filters.status}
                            onChange={handleStatusChange}
                            className="p-2 border rounded-lg text-sm bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                        >
                            {ALL_STATUS.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* 3. Liste des Résultats de Recherche */}
            <section className="space-y-4">
                {filteredResults.map((note) => (
                    <SearchResultItem 
                        key={note.id} 
                        {...note} 
                        highlightQuery={searchQuery} // Passage de la requête pour le surlignage
                    />
                ))}
                
                {/* Message si aucun résultat */}
                {filteredResults.length === 0 && (
                    <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-gray-500 dark:text-gray-400">
                        <AlertTriangle className="w-8 h-8 mx-auto mb-3" />
                        <p>No results found for **"{searchQuery}"**. Try different filters or a broader query.</p>
                    </div>
                )}
            </section>
            
        </div>
    );
};

export default AdvancedSearch;