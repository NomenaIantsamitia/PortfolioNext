'use client'
import React, { useState } from 'react';
import { Mail, Github, MapPin, Calendar } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [opportunite, setOpportunite] = useState('stage');
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [organisation, setOrganisation] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailValide = (value: string) => {
    const v = value.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  };

  const clearMessages = () => {
    setSuccessMessage('');
    setErrorMessage('');
  };

  const envoyerMessage = async () => {
    clearMessages();

    const nomTrim = nom.trim();
    const emailTrim = email.trim();
    const organisationTrim = organisation.trim();
    const messageTrim = message.trim();

    if (!nomTrim || !emailTrim || !messageTrim) {
      setErrorMessage('⛔ Veuillez remplir tous les champs obligatoires (nom, email, message).');
      return;
    }

    if (!emailValide(emailTrim)) {
      setErrorMessage("⛔ L'adresse email n'est pas valide.");
      return;
    }

    setLoading(true);

    const data = {
      opportunite,
      nom: nomTrim,
      email: emailTrim,
      organisation: organisationTrim,
      message: messageTrim,
    };

    try {
      const res = await fetch('https://backportfolio1.onrender.com/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      try {
        await res.text();
      } catch {
        /* ignore body parsing errors */
      }

      setSuccessMessage('✅ Merci pour votre message ! Je vous répondrai dans les plus brefs délais. À bientôt !');
      setNom('');
      setEmail('');
      setOrganisation('');
      setMessage('');
      setOpportunite('stage');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      setErrorMessage('⚠️ Erreur de connexion. Vérifiez votre internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-800/30">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Travaillons <span className="text-indigo-400">Ensemble</span>
          </h2>
          <p className="text-xl text-gray-400">
            Ouvert aux opportunités de stage et d'emploi en développement web
          </p>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Disponible immédiatement</h3>
              <p className="text-gray-400 mb-6">
                Passionnée par le développement web, à la recherche d'une équipe où continuer à
                apprendre et livrer un travail solide.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <span>En remote ou sur site</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <span>Disponible immédiatement</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span className="break-all">nomena.misedratiana05@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Github className="w-5 h-5 text-indigo-400" />
                  <span>github.com/NomenaIantsamitia</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-x-4 gap-y-2 mb-2">
                {['stage', 'emploi', 'projet'].map((opt) => (
                  <label key={opt} className="flex items-center space-x-2 text-gray-300">
                    <input
                      type="radio"
                      name="opportunity"
                      value={opt}
                      checked={opportunite === opt}
                      onChange={() => {
                        setOpportunite(opt);
                        clearMessages();
                      }}
                    />
                    <span>{opt.charAt(0).toUpperCase() + opt.slice(1)}</span>
                  </label>
                ))}
              </div>

              <input
                type="text"
                placeholder="Votre nom"
                value={nom}
                onChange={(e) => {
                  setNom(e.target.value);
                  clearMessages();
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearMessages();
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="text"
                placeholder="Entreprise / Organisation"
                value={organisation}
                onChange={(e) => {
                  setOrganisation(e.target.value);
                  clearMessages();
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <textarea
                rows={4}
                placeholder="Parlez-moi de votre projet..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  clearMessages();
                }}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                onClick={envoyerMessage}
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
              >
                {loading ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {errorMessage && (
                <div className="mt-4 p-3 rounded-md bg-red-600/20 border border-red-500 text-red-100">
                  {errorMessage}
                </div>
              )}
              {successMessage && (
                <div className="mt-4 p-3 rounded-md bg-green-600/20 border border-green-500 text-green-100">
                  {successMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;