// Settings.tsx - Composant Next.js
'use client'
import { Settings, Download, Upload, Palette, FileText, Link, Database, Save, ServerOff, Monitor, Zap } from 'lucide-react';
// Note: Utilisation des icônes Lucide pour Tailwind CSS

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8">
      
      {/* Barre d'Action Supérieure */}
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <h1 className="text-xl font-semibold flex items-center">
            <Settings className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" /> Paramètres Globaux
        </h1>
        <div className="flex items-center space-x-4">
            <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm">
                <Download className="w-4 h-4 mr-2" /> Exporter les Données
            </button>
            <button className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm">
                <Upload className="w-4 h-4 mr-2" /> Importer les Données
            </button>
        </div>
      </header>

      {/* Contenu Principal - Sections de Paramètres */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* SECTION 1: Apparence */}
        <SettingsBlock title="Apparence" icon={<Palette className="w-5 h-5" />} color="text-yellow-600 dark:text-yellow-400">
            <div className="space-y-4">
                <SettingRow label="Thème">
                    <ThemeSelector />
                </SettingRow>
                <SettingRow label="Taille de la Police">
                    <select defaultValue="medium" className="settings-select">
                        <option value="small">Petite</option>
                        <option value="medium">Moyenne</option>
                        <option value="large">Grande</option>
                    </select>
                </SettingRow>
                <SettingRow label="Famille de Police">
                    <select defaultValue="inter" className="settings-select">
                        <option value="inter">Inter (Sans Serif)</option>
                        <option value="serif">Serif (Times New Roman)</option>
                        <option value="mono">Monospace (Code)</option>
                    </select>
                </SettingRow>
                <SettingRow label="Largeur de l'Éditeur">
                    <select defaultValue="800px" className="settings-select">
                        <option value="600px">600px</option>
                        <option value="800px">800px</option>
                        <option value="full">Pleine Largeur</option>
                    </select>
                </SettingRow>
                <SaveButton label="Sauvegarder l'Apparence" />
            </div>
        </SettingsBlock>

        {/* SECTION 2: Préférences de l'Éditeur */}
        <SettingsBlock title="Préférences de l'Éditeur" icon={<FileText className="w-5 h-5" />} color="text-green-600 dark:text-green-400">
            <div className="space-y-4">
                <SettingRow label="Auto-sauvegarde">
                    <ToggleSwitch id="autosave" defaultChecked={true} />
                </SettingRow>
                <SettingRow label="Intervalle de Sauvegarde">
                    <select defaultValue="5s" className="settings-select">
                        <option value="2s">2 secondes</option>
                        <option value="5s">5 secondes</option>
                        <option value="10s">10 secondes</option>
                    </select>
                </SettingRow>
                <SettingRow label="Taille de la Tabulation">
                    <select defaultValue="2sp" className="settings-select">
                        <option value="2sp">2 espaces</option>
                        <option value="4sp">4 espaces</option>
                        <option value="tab">Tabulation</option>
                    </select>
                </SettingRow>
                <SettingRow label="Retour à la Ligne">
                    <ToggleSwitch id="linewrap" defaultChecked={true} />
                </SettingRow>
                <SaveButton label="Sauvegarder les Préférences" />
            </div>
        </SettingsBlock>

        {/* SECTION 3: Comportement des Liens */}
        <SettingsBlock title="Comportement des Liens" icon={<Link className="w-5 h-5" />} color="text-purple-600 dark:text-purple-400">
            <div className="space-y-4">
                <SettingRow label="Création de Liens Auto">
                    <ToggleSwitch id="autolink" defaultChecked={true} />
                </SettingRow>
                <SettingRow label="Style de Lien">
                    <select defaultValue="double_brackets" className="settings-select">
                        <option value="double_brackets">Double Crochets [[note]]</option>
                        <option value="markdown">Markdown Standard [note](lien)</option>
                        <option value="wiki">Wikilink [[note|titre]]</option>
                    </select>
                </SettingRow>
                <SettingRow label="Ouvrir les Liens dans">
                    <RadioGroup options={['Même Onglet', 'Nouvel Onglet']} defaultSelected="Même Onglet" />
                </SettingRow>
                <SaveButton label="Sauvegarder les Réglages des Liens" />
            </div>
        </SettingsBlock>
        
        {/* SECTION 4: Gestion des Données (Pleine Largeur) */}
        <div className="lg:col-span-3">
            <SettingsBlock title="Gestion des Données et Sauvegarde" icon={<Database className="w-5 h-5" />} color="text-red-600 dark:text-red-400">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Bloc Info */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg space-y-2 text-sm">
                            <h3 className="font-bold border-b border-gray-200 dark:border-gray-600 pb-1 mb-2">Statistiques Actuelles</h3>
                            <p>Taille de la Base de Données: <span className="font-semibold text-red-600 dark:text-red-400">15.2 MB</span></p>
                            <p>Nombre de Notes: 150 • Liens: 2,145 • Tags: 45</p>
                            <p>Dernière Sauvegarde: <span className="font-semibold">2 heures ago</span></p>
                        </div>
                        
                        {/* Bloc Actions */}
                        <div className="flex flex-col space-y-3">
                            <button className="settings-button bg-blue-600 hover:bg-blue-700 text-white">
                                <Download className="w-4 h-4 mr-2" /> Sauvegarder Maintenant
                            </button>
                            <button className="settings-button border border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20">
                                <ServerOff className="w-4 h-4 mr-2" /> Vider le Cache & Index
                            </button>
                            <button className="settings-button border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                Réinitialiser les Données Démo
                            </button>
                        </div>
                    </div>
                </div>
            </SettingsBlock>
        </div>

      </div>
    </div>
  );
}

// --- Composants Réutilisables ---

// Conteneur de Section de Paramètres
const SettingsBlock = ({ title, icon, color, children }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
        <h2 className={`text-xl font-bold mb-4 flex items-center ${color}`}>
            {icon}
            <span className="ml-2">{title}</span>
        </h2>
        <hr className="mb-4 border-gray-100 dark:border-gray-700" />
        {children}
    </div>
);

// Ligne de Réglage (Label + Contrôle)
const SettingRow = ({ label, children }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-b-0">
        <label className="text-gray-700 dark:text-gray-300 font-medium text-sm">{label}</label>
        {children}
    </div>
);

// Bouton de Sauvegarde
const SaveButton = ({ label }) => (
    <button className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition flex items-center justify-center">
        <Save className="w-4 h-4 mr-2" /> {label}
    </button>
);

// Sélecteur de Thème (Light/Dark/System)
const ThemeSelector = () => (
    <div className="flex space-x-2 text-sm">
        <label className="flex items-center space-x-1 cursor-pointer">
            <input type="radio" name="theme" defaultChecked={false} />
            <span className="text-gray-600 dark:text-gray-400 flex items-center"><Zap className="w-4 h-4 mr-1"/> Clair</span>
        </label>
        <label className="flex items-center space-x-1 cursor-pointer">
            <input type="radio" name="theme" defaultChecked={true} />
            <span className="text-gray-600 dark:text-gray-400 flex items-center"><Zap className="w-4 h-4 mr-1"/> Sombre</span>
        </label>
        <label className="flex items-center space-x-1 cursor-pointer">
            <input type="radio" name="theme" defaultChecked={false} />
            <span className="text-gray-600 dark:text-gray-400 flex items-center"><Monitor className="w-4 h-4 mr-1"/> Système</span>
        </label>
    </div>
);

// Toggle Switch (Bascule Oui/Non)
const ToggleSwitch = ({ id, defaultChecked }) => (
    <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" id={id} defaultChecked={defaultChecked} className="sr-only peer" />
        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
    </label>
);

// Groupe de Boutons Radio
const RadioGroup = ({ options, defaultSelected }) => (
    <div className="flex space-x-3 text-sm">
        {options.map((option) => (
            <label key={option} className="flex items-center space-x-1 cursor-pointer">
                <input type="radio" name="link_tab_open" defaultChecked={option === defaultSelected} className="text-blue-600 focus:ring-blue-500" />
                <span className="text-gray-700 dark:text-gray-300">{option}</span>
            </label>
        ))}
    </div>
);