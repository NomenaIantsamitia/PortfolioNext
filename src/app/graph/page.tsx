// GraphView.tsx (Composant Next.js avec Tailwind CSS)
'use client'
import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize, Search, GitGraph, FileText, Star, Link, Settings, X, Plus } from 'lucide-react';

// --- Interfaces de Simulation ---
interface GraphNodeData {
    id: number;
    name: string;
    color: string;
    rating: number; // 1 à 5
    status: string;
    tags: { name: string; color: string }[];
    connections: { name: string; type: string; color: string }[];
    x: string;
    y: string;
}

// --- Données de Simulation ---
const initialNodes: GraphNodeData[] = [
    { id: 1, name: "React", color: "bg-blue-600", rating: 4, status: "Jardin (Publié)", tags: [{ name: "React", color: "bg-blue-600" }, { name: "Front-end", color: "bg-gray-600" }], connections: [{ name: "State Management", type: "Parent", color: "text-orange-500" }], x: "10%", y: "20%" },
    { id: 2, name: "State Management", color: "bg-orange-600", rating: 5, status: "Jardin (Publié)", tags: [{ name: "React", color: "bg-blue-600" }, { name: "Architecture", color: "bg-purple-600" }, { name: "Patterns", color: "bg-yellow-600" }], connections: [{ name: "React", type: "Parent", color: "text-blue-500" }, { name: "Hooks", type: "Sibling", color: "text-purple-500" }, { name: "Redux", type: "Child", color: "text-orange-500" }, { name: "Context API", type: "Child", color: "text-orange-500" }], x: "15%", y: "45%" },
    { id: 3, name: "Hooks", color: "bg-purple-600", rating: 4, status: "Brouillon", tags: [{ name: "React", color: "bg-blue-600" }], connections: [{ name: "State Management", type: "Parent", color: "text-orange-500" }], x: "40%", y: "30%" },
    { id: 4, name: "Redux", color: "bg-orange-600", rating: 3, status: "Jardin (Publié)", tags: [{ name: "Redux", color: "bg-red-600" }], connections: [{ name: "State Management", type: "Parent", color: "text-orange-500" }], x: "5%", y: "70%" },
    { id: 5, name: "Context API", color: "bg-orange-600", rating: 4, status: "Jardin (Publié)", tags: [{ name: "React", color: "bg-blue-600" }], connections: [{ name: "State Management", type: "Parent", color: "text-orange-500" }], x: "35%", y: "75%" },
];


export default function GraphView() {
    const [selectedNodeId, setSelectedNodeId] = useState<number>(2); // Nœud "State Management" sélectionné par défaut
    const [showNoteModal, setShowNoteModal] = useState(false);
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    
    const selectedNode = initialNodes.find(n => n.id === selectedNodeId);

    // Fonction pour simuler la soumission (création de lien)
    const handleLinkSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setShowLinkModal(false);

        const form = e.currentTarget;
        const source = (form.elements.namedItem('link-source') as HTMLSelectElement).value;
        const target = (form.elements.namedItem('link-target') as HTMLSelectElement).value;
        const linkType = (form.elements.namedItem('link-type') as HTMLSelectElement).value;

        // Simulation de l'action
        console.log(`Lien créé : ${source} -> ${target} (Type: ${linkType})`);

        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 flex">
            
            {/* Notification de Confirmation (Simulée) */}
            {showNotification && (
                <div className="fixed top-4 right-4 z-50 p-4 bg-green-500 text-white rounded-lg shadow-xl flex items-center space-x-2 transition-opacity duration-300">
                    <Link className="w-5 h-5" />
                    <span>Lien créé avec succès ! (Simulation)</span>
                </div>
            )}

            {/* Modales */}
            {showNoteModal && selectedNode && (
                <NoteDisplayModal
                    noteTitle={selectedNode.name}
                    onClose={() => setShowNoteModal(false)}
                />
            )}
            {showLinkModal && selectedNode && (
                <CreateLinkModal
                    onClose={() => setShowLinkModal(false)}
                    onSubmit={handleLinkSubmit}
                    availableNodes={initialNodes}
                    defaultSource={selectedNode.name}
                />
            )}

            {/* 2. Zone Principale du Graph (80% Largeur) */}
            <main className="flex-grow bg-white dark:bg-gray-800 rounded-xl shadow-2xl mr-6 p-4 relative overflow-hidden">
                
                {/* 2.1. Barre de Contrôle du Graph */}
                <div className="flex justify-between items-center p-2 mb-3 border-b border-gray-200 dark:border-gray-700">
                    <h1 className="text-xl font-bold flex items-center">
                        <GitGraph className="w-6 h-6 mr-2 text-purple-600" /> Vue du Réseau
                    </h1>
                    <div className="flex items-center space-x-3">
                        {/* Boutons de contrôle du graph (Zoom, Search, etc.) */}
                        <button title="Rechercher un Nœud" className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            <Search className="w-5 h-5" />
                        </button>
                        <button title="Centrer" className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                            <Maximize className="w-5 h-5" />
                        </button>
                        <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg">
                            <button title="Zoom -" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-l-lg">
                                <ZoomOut className="w-5 h-5" />
                            </button>
                            <div className="w-px bg-gray-300 dark:bg-gray-600"></div>
                            <button title="Zoom +" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition rounded-r-lg">
                                <ZoomIn className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2.2. Zone de Visualisation (Simulation D3.js) */}
                <div className="h-[calc(100%-60px)] w-full flex items-center justify-center relative">
                    
                    <div className="absolute inset-0 opacity-10 dark:opacity-5 text-center text-4xl font-extrabold text-purple-300 dark:text-purple-700 pointer-events-none">
                        ZONE DE RENDU DU GRAPH D3.JS
                    </div>
                    
                    {initialNodes.map(node => (
                        <GraphNode 
                            key={node.id} 
                            name={node.name} 
                            color={node.color} 
                            x={node.x} 
                            y={node.y} 
                            selected={node.id === selectedNodeId}
                            onSelect={() => setSelectedNodeId(node.id)}
                        />
                    ))}

                    {/* Lignes de connexion simulées */}
                    <div className="absolute border-t border-dashed border-gray-400 w-[15%] transform rotate-45 pointer-events-none" style={{ top: '35%', left: '15%' }}></div>
                    <div className="absolute border-l border-dashed border-gray-400 h-[20%] transform -translate-y-1/2 pointer-events-none" style={{ top: '57%', left: '17%' }}></div>
                </div>
                
                {/* 2.3. Légende des Couleurs (Bottom Left) */}
                <div className="absolute bottom-4 left-4 p-3 bg-white dark:bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-xl text-xs border border-gray-200 dark:border-gray-700">
                    <p className="font-semibold mb-1">Légende</p>
                    <div className="flex items-center space-x-2">
                        <span className="w-3 h-3 rounded-full bg-blue-600"></span> <span>React / Front-end</span>
                        <span className="w-3 h-3 rounded-full bg-orange-600"></span> <span>State Management</span>
                        <span className="w-3 h-3 rounded-full bg-purple-600"></span> <span>Autres concepts</span>
                    </div>
                </div>

            </main>

            {/* 3. Panneau Latéral d'Information (20% Largeur) */}
            <aside className="w-80 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-5 border border-gray-100 dark:border-gray-700 shrink-0">
                
                <h2 className="text-xl font-extrabold mb-4 text-purple-600 dark:text-purple-400 border-b border-gray-200 dark:border-gray-700 pb-2">
                    🎯 Détails du Nœud
                </h2>

                {selectedNode ? (
                    <NodeDetails 
                        node={selectedNode}
                        onOpenNote={() => setShowNoteModal(true)}
                        onCreateLink={() => setShowLinkModal(true)}
                    />
                ) : (
                    <div className="text-center p-8 text-gray-500 dark:text-gray-400">
                        Sélectionnez un nœud pour voir ses détails.
                    </div>
                )}
            </aside>

        </div>
    );
}

// =====================================================================
// COMPOSANTS RÉUTILISABLES ET MODALES
// =====================================================================

// --- Composant Nœud du Graphe ---
interface GraphNodeProps {
    name: string;
    color: string;
    x: string;
    y: string;
    selected: boolean;
    onSelect: () => void;
}

const GraphNode: React.FC<GraphNodeProps> = ({ name, color, x, y, selected, onSelect }) => (
    <div 
        className={`absolute px-4 py-2 font-semibold rounded-full shadow-lg transition duration-300 border-2 cursor-pointer 
            ${color} ${selected ? 'ring-4 ring-offset-2 ring-purple-500 scale-105 border-white dark:border-gray-900 text-white' : 'text-white border-transparent hover:scale-105'}`}
        style={{ left: x, top: y, transform: 'translate(-50%, -50%)' }}
        onClick={onSelect}
        title={`Ouvrir les détails de ${name}`}
    >
        {name}
    </div>
);

// --- Composant Tags ---
const TagPill: React.FC<{ name: string; color: string }> = ({ name, color }) => (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${color} text-white`}>
        {name}
    </span>
);

// --- Composant Détails du Nœud (Panneau Latéral) ---
interface NodeDetailsProps {
    node: GraphNodeData;
    onOpenNote: () => void;
    onCreateLink: () => void;
}

const NodeDetails: React.FC<NodeDetailsProps> = ({ node, onOpenNote, onCreateLink }) => (
    <div className="space-y-4">
        <h3 className="text-2xl font-bold mb-2">{node.name}</h3>
        
        <div className="flex items-center space-x-3 text-sm">
            {/* Affichage du rating */}
            {Array.from({ length: 5 }, (_, i) => (
                <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < node.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
                />
            ))}
        </div>

        <div className="flex items-center space-x-3 text-sm">
            <Settings className="w-4 h-4 text-gray-500" />
            <span className="font-medium">Statut: **{node.status}**</span>
        </div>
        
        <hr className="border-gray-100 dark:border-gray-700"/>

        {/* Liens Connectés */}
        <h4 className="font-semibold flex items-center mb-2">
            <Link className="w-4 h-4 mr-1 text-gray-500" /> Connecté à:
        </h4>
        <ul className="text-sm space-y-1 ml-4 list-disc text-gray-700 dark:text-gray-300">
            {node.connections.map((conn, index) => (
                 <li key={index} className="truncate">
                    <span className={`font-medium ${conn.color}`}>{conn.name}</span> ({conn.type})
                </li>
            ))}
        </ul>

        {/* Tags */}
        <h4 className="font-semibold flex items-center mb-2 pt-2 border-t border-gray-100 dark:border-gray-700">
             <Settings className="w-4 h-4 mr-1 text-gray-500" /> Tags:
        </h4>
        <div className="flex flex-wrap gap-2">
            {node.tags.map((tag, index) => (
                <TagPill key={index} name={tag.name} color={tag.color} />
            ))}
        </div>

        {/* Actions Contextuelles */}
        <div className="pt-4 space-y-3">
            <button 
                onClick={onOpenNote}
                className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
                <FileText className="w-4 h-4 inline-block mr-1" /> Ouvrir la Note
            </button>
            <button 
                onClick={onCreateLink}
                className="w-full py-2 border border-purple-600 text-purple-600 font-semibold rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition"
            >
                <Link className="w-4 h-4 inline-block mr-1" /> Créer un Nouveau Lien
            </button>
        </div>
    </div>
);

// --- Modale 1 : Affichage de la Note (Simulation) ---
interface NoteDisplayModalProps {
    noteTitle: string;
    onClose: () => void;
}

const NoteDisplayModal: React.FC<NoteDisplayModalProps> = ({ noteTitle, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl h-3/4 overflow-hidden flex flex-col">
            
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center shrink-0">
                <h2 className="text-2xl font-bold text-green-600 dark:text-green-400">
                    Note: {noteTitle}
                </h2>
                <button onClick={onClose} className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                    <X className="w-6 h-6" />
                </button>
            </div>

            <div className="p-6 flex-grow overflow-y-auto">
                <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                    (Simulation d'un éditeur ou d'un rendu de contenu riche)
                </p>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg min-h-full">
                    <p className="font-semibold text-lg mb-2">Contenu Détaillé</p>
                    <p>
                        Ceci est le contenu complet de la note **"{noteTitle}"**. 
                        C'est ici que l'utilisateur lirait ou modifierait réellement sa pensée.
                        L'intégration du graphe permet de visualiser ce contenu immédiatement après la sélection d'un nœud.
                    </p>
                    <p className="mt-4">
                        *L'objectif est atteint en simulant l'ouverture d'un nouvel écran contextuel.*
                    </p>
                </div>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end shrink-0">
                 <button 
                    onClick={onClose}
                    className="px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
                >
                    Fermer la Note
                </button>
            </div>
        </div>
    </div>
);


// --- Modale 2 : Création de Lien ---
interface CreateLinkModalProps {
    onClose: () => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    availableNodes: GraphNodeData[];
    defaultSource: string;
}

const CreateLinkModal: React.FC<CreateLinkModalProps> = ({ onClose, onSubmit, availableNodes, defaultSource }) => (
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
                            Note Source
                        </label>
                        <select
                            id="link-source"
                            required
                            defaultValue={defaultSource} // La source est le nœud actuellement sélectionné
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                        >
                            {availableNodes.map(node => (
                                <option key={node.id} value={node.name}>
                                    {node.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sélection Note Cible */}
                    <div>
                        <label htmlFor="link-target" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Note Cible
                        </label>
                        <select
                            id="link-target"
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                        >
                             <option value="">-- Sélectionnez une cible --</option>
                            {availableNodes
                                .filter(node => node.name !== defaultSource) // Ne pas lier à lui-même
                                .map(node => (
                                <option key={node.id} value={node.name}>
                                    {node.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    
                    {/* Type de Lien */}
                    <div>
                        <label htmlFor="link-type" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                            Type de Relation
                        </label>
                        <select
                            id="link-type"
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-purple-500 focus:border-purple-500"
                        >
                            <option value="Référence">Référence</option>
                            <option value="Parent">Parent/Enfant</option>
                            <option value="Similaire">Similaire</option>
                            <option value="Complémentaire">Complémentaire</option>
                        </select>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-b-xl flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition">
                        Annuler
                    </button>
                    <button type="submit" className="px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition flex items-center space-x-1">
                        <Link className="w-4 h-4" />
                        <span>Confirmer le Lien</span>
                    </button>
                </div>
            </form>
        </div>
    </div>
);