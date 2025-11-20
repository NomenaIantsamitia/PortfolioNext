// Dashboard.tsx
'use client'
import React, { useState } from 'react';
import { Home, Search, GitGraph, Settings, Plus, Star, Bell, X, Link } from 'lucide-react';

// Interfaces pour les données du Garden
interface Note {
    id: number;
    title: string;
    content: string;
    time: string;
    rating: number;
}

interface StatsCardData {
    label: string;
    value: string;
}

// Initialisation des données (pour simuler la BDD)
const initialNotes: Note[] = [
    { id: 1, title: "Modèles React", content: "Les patrons de conception pour les composants réutilisables.", time: "2h", rating: 4 },
    { id: 2, title: "Conception de Base de Données", content: "Principes de normalisation et d'optimisation des requêtes.", time: "1 jour", rating: 5 },
    { id: 3, title: "Croissance de Carrière", content: "Objectifs et stratégies de développement professionnel.", time: "3 jours", rating: 3 },
    { id: 4, title: "Algorithmes de Tri", content: "Implémentation et complexité de Quicksort et Mergesort.", time: "5 jours", rating: 4 },
];

export default function Dashboard() {
    const [showNotification, setShowNotification] = useState(false);
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false); // Nouvelle modale pour les liens
    const [notes, setNotes] = useState<Note[]>(initialNotes);
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

    // Fonction pour ouvrir la modale de création de note
    const handleNewNote = () => {
        setSelectedNoteId(null); // Assure qu'on est en mode création
        setShowNoteModal(true);
    };

    // Fonction pour ouvrir la vue détaillée d'une note
    const handleOpenNote = (id: number) => {
        setSelectedNoteId(id);
        // Dans une app réelle, ici on naviguerait vers /notes/[id]
    };
  
    // Fonction appelée à la soumission d'une NOUVELLE NOTE
    const handleNoteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowNoteModal(false); 
        
        // --- Logique d'ajout de note réelle ---
        const form = e.currentTarget;
        const newNote: Note = {
            id: Date.now(), // ID unique simple
            title: (form.elements.namedItem('note-title') as HTMLInputElement).value || "Nouvelle Note sans titre",
            content: (form.elements.namedItem('note-content') as HTMLTextAreaElement).value,
            time: "juste maintenant",
            rating: 3,
        };
        
        setNotes([newNote, ...notes]); // Ajout en tête de liste
        setSelectedNoteId(newNote.id); // Ouvre la nouvelle note
        // ------------------------------------

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    // Fonction appelée à la soumission d'un NOUVEAU LIEN (Simulation)
    const handleLinkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowLinkModal(false);

        // Récupération des données du formulaire (Simulation)
        const form = e.currentTarget;
        const source = (form.elements.namedItem('link-source') as HTMLSelectElement).value;
        const target = (form.elements.namedItem('link-target') as HTMLSelectElement).value;

        alert(`Lien créé : ${source} est lié à ${target}. (Simulation de la BDD)`
        );

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    // Si une note est sélectionnée, on affiche la vue détaillée à la place du Dashboard
    if (selectedNoteId !== null) {
        const note = notes.find(n => n.id === selectedNoteId);
        return note ? (
            <NoteDetailView 
                note={note} 
                onClose={() => setSelectedNoteId(null)}
                // Simule l'édition en ouvrant la modale de note avec des données pré-remplies
                onEdit={() => { /* Logique d'édition complexe ici */ alert("Simulation d'ouverture de l'éditeur pour la modification."); }}
            />
        ) : (
            <div className="text-center p-8">Note introuvable.</div>
        );
    }
    
    // Rendu du Dashboard principal
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 sm:p-8">

            {/* Modales */}
            {showNoteModal && (
                <NewNoteModal 
                    onClose={() => setShowNoteModal(false)}
                    onSubmit={handleNoteSubmit}
                />
            )}
            {showLinkModal && (
                <CreateLinkModal
                    onClose={() => setShowLinkModal(false)}
                    onSubmit={handleLinkSubmit}
                    availableNotes={notes}
                />
            )}

            {/* Notification de Confirmation (Simulée) */}
            {showNotification && (
                <div className="fixed top-4 right-4 z-50 p-4 bg-green-500 text-white rounded-lg shadow-xl flex items-center space-x-2 transition-opacity duration-300">
                    <Bell className="w-5 h-5" />
                    <span>Action effectuée avec succès ! (Simulation)</span>
                </div>
            )}

            {/* Barre de Navigation Supérieure (Reste inchangé) */}
            <nav className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
                <div className="flex items-center space-x-2 text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400">
                    <Home className="w-6 h-6" />
                    <span>Jardin Numérique</span>
                </div>
                <div className="flex items-center space-x-4 sm:space-x-6 text-gray-500 dark:text-gray-400">
                    <button className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition text-sm sm:text-base">
                        <Search className="w-4 h-4 sm:w-5 sm:h-5 mr-1" /> Rechercher
                    </button>
                    {/* Nouveau bouton pour créer un lien */}
                    <button 
                        onClick={() => setShowLinkModal(true)}
                        className="flex items-center hover:text-purple-600 dark:hover:text-purple-400 transition text-sm sm:text-base">
                        <Link className="w-4 h-4 sm:w-5 sm:h-5 mr-1" /> Créer Lien
                    </button>
                    <button className="flex items-center hover:text-green-600 dark:hover:text-green-400 transition text-sm sm:text-base">
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 mr-1" /> Réglages
                    </button>
                </div>
            </nav>

            {/* En-tête de Bienvenue (Reste inchangé) */}
            <header className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                <h1 className="text-2xl sm:text-3xl font-extrabold mb-1">
                    Bienvenue, <span className="text-green-600 dark:text-green-400">John</span>!
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    Dernière activité : **{notes.length} notes** • Aujourd'hui : **2 nouveaux liens**
                </p>
            </header>

            {/* Contenu Principal - Disposition en Grille */}
            <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                <section className="lg:col-span-2 space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <StatsCard title="Statistiques" icon="📈" color="blue" data={[
                            { label: 'Notes Totales', value: notes.length.toString() },
                            { label: 'Mots-clés Uniques', value: '45' },
                            { label: 'Liens Créés', value: '2k' },
                        ]} />
                        <StatsCard title="Liens Récents" icon="🔗" color="yellow" data={[
                            { label: 'React', value: 'Composants' },
                            { label: 'État', value: 'Gestion' },
                            { label: 'Base de Données', value: 'Jointures SQL' },
                        ]} />
                        <StatsCard title="Mots-clés Populaires" icon="🏷️" color="red" data={[
                            { label: 'React', value: '(25)' },
                            { label: 'API', value: '(18)' },
                            { label: 'CSS', value: '(12)' },
                        ]} />
                    </div>
                    {/* Passage de la liste des notes et de la fonction d'ouverture */}
                    <RecentNotesBlock notes={notes} onOpenNote={handleOpenNote} /> 
                </section>

                <aside className="lg:col-span-1 space-y-6 sm:space-y-8">
                    <QuickActionCard onAction={handleNewNote} />
                    <GraphPreviewCard onAction={() => alert("Action: Ouvrir la Vue Graphique")} />
                </aside>
            </main>

            {/* Bouton "Nouvelle Note" (Flottant) - Ouvre la modale */}
            <button 
                onClick={handleNewNote}
                className="fixed bottom-6 right-8 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 flex items-center space-x-2 z-40"
                title="Créer une nouvelle note rapidement"
            >
                <Plus className="w-6 h-6" />
                <span className="font-semibold hidden sm:inline">Nouvelle Note</span>
            </button>
        </div>
    );
}

// =====================================================================
// NOUVEAU COMPOSANT : VUE DÉTAILLÉE DE LA NOTE (Simulation de Page)
// =====================================================================

interface NoteDetailViewProps {
    note: Note;
    onClose: () => void;
    onEdit: () => void;
}

const NoteDetailView: React.FC<NoteDetailViewProps> = ({ note, onClose, onEdit }) => (
    <div className="min-h-screen bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-4 sm:p-8">
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
            <h1 className="text-3xl font-extrabold text-green-600 dark:text-green-400">{note.title}</h1>
            <div className="flex space-x-4">
                <button 
                    onClick={onEdit} 
                    className="flex items-center px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Modifier
                </button>
                <button 
                    onClick={onClose} 
                    className="flex items-center px-4 py-2 text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                    <X className="w-4 h-4 mr-1" /> Retour au Dashboard
                </button>
            </div>
        </header>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Dernière mise à jour : **{note.time}**
        </p>

        <div className="prose dark:prose-invert max-w-none p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-inner">
            <h3 className="text-xl font-bold">Contenu</h3>
            <p>{note.content}</p>
            <p className="mt-4 italic">
                Ceci est la vue détaillée de la note. Dans un projet réel, le contenu serait affiché via un éditeur de Markdown ou un composant de rendu riche.
            </p>
            <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-lg font-semibold">Liens associés (Simulés)</h4>
                <ul className="list-disc list-inside ml-4 text-sm">
                    <li>Lien vers **{note.id === 1 ? 'Base de Données' : 'Modèles React'}**</li>
                    <li>Lien vers **Documentation API**</li>
                </ul>
            </div>
        </div>
    </div>
);


// =====================================================================
// NOUVEAU COMPOSANT : MODALE DE CRÉATION DE LIEN
// =====================================================================

interface CreateLinkModalProps {
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    availableNotes: Note[];
}

const CreateLinkModal: React.FC<CreateLinkModalProps> = ({ onClose, onSubmit, availableNotes }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 flex items-center">
                    <Link className="w-5 h-5 mr-2" /> Créer un Lien
                </h2>
                <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={onSubmit}>
                <div className="p-6 space-y-4">
                    {/* Sélection Note Source */}
                    <div>
                        <label htmlFor="link-source" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Note Source (D'où vient le lien)
                        </label>
                        <select
                            id="link-source"
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                        >
                            {availableNotes.map(note => (
                                <option key={note.id} value={note.title}>
                                    {note.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sélection Note Cible */}
                    <div>
                        <label htmlFor="link-target" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Note Cible (Où mène le lien)
                        </label>
                        <select
                            id="link-target"
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                        >
                            {availableNotes.map(note => (
                                <option key={note.id} value={note.title}>
                                    {note.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        Annuler
                    </button>
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition flex items-center space-x-1">
                        <Link className="w-4 h-4" />
                        <span>Relier les Notes</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
);


// =====================================================================
// COMPOSANTS ISOLÉS (Adaptés pour l'état des notes)
// =====================================================================

const baseCardClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border border-gray-100 dark:border-gray-700 transition duration-300 hover:shadow-lg";

// --- StatsCard (inchangé, sauf données dynamiques) ---
interface StatsCardProps {
    title: string;
    icon: string;
    color: 'blue' | 'yellow' | 'red';
    data: StatsCardData[];
}
const colorMap = {
    blue: "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30",
    yellow: "text-yellow-500 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30",
    red: "text-red-500 dark:text-red-400 bg-red-50 dark:bg-red-900/30",
};

const StatsCard: React.FC<StatsCardProps> = ({ title, icon, color, data }) => (
    <div className={baseCardClasses}>
        <div className="flex items-center mb-4">
            <div className={`p-2 rounded-lg ${colorMap[color]} mr-3`}>
                <span role="img" aria-label={title}>{icon}</span>
            </div>
            <h3 className="text-lg font-semibold">{title}</h3>
        </div>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            {data.map((item, index) => (
                <li key={index} className="flex justify-between items-center">
                    <span className="truncate">{item.label}:</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">{item.value}</span>
                </li>
            ))}
        </ul>
    </div>
);

// --- RecentNotesBlock (Adapté pour utiliser l'état réel et l'action d'ouverture) ---
interface RecentNotesBlockProps {
    notes: Note[];
    onOpenNote: (id: number) => void;
}

const RecentNotesBlock: React.FC<RecentNotesBlockProps> = ({ notes, onOpenNote }) => (
    <div className={baseCardClasses}>
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 dark:border-gray-700 pb-3">
            <h3 className="text-xl font-bold flex items-center">
                <span role="img" aria-label="Horloge" className="mr-2">🕒</span> Notes Récentes
            </h3>
            <button 
                onClick={() => alert("Action: Afficher toutes les notes")}
                className="text-green-600 dark:text-green-400 hover:underline text-sm font-medium"
            >
                Voir tout ({notes.length})
            </button>
        </div>
        <ul className="space-y-3">
            {/* Utilisation des 4 dernières notes */}
            {notes.slice(0, 4).map((note) => (
                <li 
                    key={note.id} 
                    onClick={() => onOpenNote(note.id)} // L'action OUVRE la vue détaillée
                    className="flex justify-between items-center py-2 px-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition"
                >
                    <div className="flex flex-col">
                        <span className="font-medium text-lg hover:text-green-600 dark:hover:text-green-400">{note.title}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">MàJ: {note.time}</span>
                    </div>
                    <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                            <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < note.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                            />
                        ))}
                    </div>
                </li>
            ))}
        </ul>
    </div>
);

// --- QuickActionCard (inchangé) ---
interface QuickActionCardProps {
    onAction: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ onAction }) => (
    <div className={`${baseCardClasses} bg-green-50 dark:bg-green-900/20`}>
        <h3 className="text-xl font-bold mb-3 text-green-700 dark:text-green-300">Action Express</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Créez rapidement une nouvelle note ou révisez vos brouillons.
        </p>
        <button 
            onClick={onAction}
            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
        >
            <Plus className="w-4 h-4 inline-block mr-1" /> Commencer à Écrire
        </button>
        <hr className="my-4 border-green-200 dark:border-green-700" />
        <button 
            onClick={() => alert("Action: Afficher la liste des brouillons")}
            className="text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 block w-full text-center transition"
        >
            Voir mes brouillons (3)
        </button>
    </div>
);

// --- GraphPreviewCard (inchangé) ---
interface GraphPreviewCardProps {
    onAction: () => void;
}

const GraphPreviewCard: React.FC<GraphPreviewCardProps> = ({ onAction }) => (
    <div className={baseCardClasses}>
        <h3 className="text-xl font-bold mb-4 flex items-center">
            <GitGraph className="w-5 h-5 mr-2 text-purple-500" /> Aperçu du Garden
        </h3>
        <div className="h-48 w-full bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center relative overflow-hidden">
            <div className="absolute w-20 h-20 bg-blue-500 rounded-full opacity-30 animate-pulse"></div>
            <div className="absolute top-4 left-4 w-5 h-5 bg-red-500 rounded-full"></div>
            <div className="absolute bottom-6 right-6 w-8 h-8 bg-green-500 rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-6 h-6 bg-yellow-500 rounded-full"></div>
            <span className="absolute bottom-2 right-3 text-xs font-medium text-gray-600 dark:text-gray-300">2145 connexions</span>
        </div>
        <button 
            onClick={onAction}
            className="w-full mt-4 py-2 px-4 border border-purple-500 text-purple-500 font-semibold rounded-lg hover:bg-purple-500 hover:text-white transition duration-200"
        >
            Ouvrir Vue Garden
        </button>
    </div>
);

// --- NewNoteModal (Reste inchangé) ---
interface NewNoteModalProps {
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const NewNoteModal: React.FC<NewNoteModalProps> = ({ onClose, onSubmit }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg transition-all transform duration-300 scale-100">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 flex items-center">
                    <Plus className="w-5 h-5 mr-2" /> Créer une Nouvelle Note
                </h2>
                <button 
                    onClick={onClose} 
                    className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Fermer la modale"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            <form onSubmit={onSubmit}>
                <div className="p-6 space-y-4">
                    <div>
                        <label htmlFor="note-title" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Titre de la Note
                        </label>
                        <input
                            type="text"
                            id="note-title"
                            required
                            placeholder="Ex: Architecture de microservices"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="note-content" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Contenu Initial
                        </label>
                        <textarea
                            id="note-content"
                            rows={6}
                            required
                            placeholder="Commencez à écrire ici..."
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500 resize-none"
                        ></textarea>
                    </div>

                    <div>
                        <label htmlFor="note-tags" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Mots-clés (séparés par des virgules)
                        </label>
                        <input
                            type="text"
                            id="note-tags"
                            placeholder="Ex: tech, devops, cloud"
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-green-500 focus:border-green-500"
                        />
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl flex justify-end space-x-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition flex items-center space-x-1"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Créer la Note</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
);