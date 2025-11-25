import React from 'react';
import { Mail, Github } from 'lucide-react';

const ContactSection: React.FC = () => (
  <section id="contact" className="py-20 bg-gray-800/30">
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Travaillons <span className="text-indigo-400">Ensemble</span>
        </h2>
        <p className="text-xl text-gray-400">
          En recherche active d'un stage pour perfectionner mes compétences.
        </p>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Disponible pour un stage</h3>
            <p className="text-gray-400 mb-6">
              Passionné par le développement web et toujours à la recherche de nouveaux défis. 
              Je suis disponible pour un stage à partir de [date] pour une durée de [nombre] mois.
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-5 h-5 text-indigo-400" />
                <span>votre.email@domain.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Github className="w-5 h-5 text-indigo-400" />
                <span>github.com/votreusername</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Votre nom" 
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
            />
            <input 
              type="email" 
              placeholder="Votre email" 
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
            />
            <textarea 
              placeholder="Votre message..." 
              rows={4}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 transition-colors duration-300"
            ></textarea>
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1">
              Envoyer le message
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ContactSection;