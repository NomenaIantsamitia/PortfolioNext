'use client'
import React, { useState } from 'react';
import {
  Mail,
  Github,
  MapPin,
  Calendar,
  User,
  Building2,
  MessageSquare,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Circle,
} from 'lucide-react';

const OPPORTUNITIES = [
  { value: 'stage', label: 'Stage' },
  { value: 'emploi', label: 'Emploi' },
  { value: 'projet', label: 'Projet' },
];

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
      setErrorMessage('Veuillez remplir tous les champs obligatoires (nom, email, message).');
      return;
    }

    if (!emailValide(emailTrim)) {
      setErrorMessage("L'adresse email n'est pas valide.");
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
      // On appelle maintenant notre propre route API (Next.js), qui utilise Resend en interne
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Une erreur est survenue.');
      }

      setSuccessMessage('Merci pour votre message ! Je vous répondrai dans les plus brefs délais. À bientôt !');
      setNom('');
      setEmail('');
      setOrganisation('');
      setMessage('');
      setOpportunite('stage');
      setTimeout(() => setSuccessMessage(''), 4000);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'Erreur de connexion. Vérifiez votre internet.'
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="relative py-20 sm:py-28 overflow-hidden bg-gray-950">
      {/* Décor cohérent avec le hero : halos + grille subtile */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(99,102,241,0.10),transparent_50%),radial-gradient(circle_at_85%_90%,rgba(217,70,239,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-gray-400 mb-5 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/40">
            <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400 animate-pulse" />
            <span>disponible immédiatement</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Travaillons <span className="text-indigo-400">Ensemble</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Ouverte aux opportunités de stage et d'emploi en développement web
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Colonne infos */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-1">Nomena Misedratiana</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Passionnée par le développement web, à la recherche d'une équipe où continuer à
                apprendre et livrer un travail solide.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
              <InfoRow icon={<MapPin className="w-4 h-4" />} text="Remote ou sur site" />
              <InfoRow icon={<Calendar className="w-4 h-4" />} text="Disponible immédiatement" />
              <a
                href="mailto:nomena.misedratiana05@gmail.com"
                className="col-span-2 md:col-span-1"
              >
                <InfoRow
                  icon={<Mail className="w-4 h-4" />}
                  text="nomena.misedratiana05@gmail.com"
                  clickable
                  breakAll
                />
              </a>
              <a
                href="https://github.com/nomenamisedratiana05"
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 md:col-span-1"
              >
                <InfoRow
                  icon={<Github className="w-4 h-4" />}
                  text="github.com/NomenaIantsamitia"
                  clickable
                />
              </a>
            </div>
          </div>

          {/* Colonne formulaire */}
          <div className="md:col-span-3 bg-gray-900/60 border border-gray-800 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="mb-5">
              <span className="block text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
                Type de demande
              </span>
              <div className="inline-flex p-1 bg-gray-800/70 rounded-xl border border-gray-700">
                {OPPORTUNITIES.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setOpportunite(opt.value);
                      clearMessages();
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      opportunite === opt.value
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <Field
                icon={<User className="w-4 h-4" />}
                label="Nom"
                placeholder="Votre nom"
                value={nom}
                onChange={(v) => {
                  setNom(v);
                  clearMessages();
                }}
              />
              <Field
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                type="email"
                placeholder="vous@exemple.com"
                value={email}
                onChange={(v) => {
                  setEmail(v);
                  clearMessages();
                }}
              />
            </div>

            <div className="mb-4">
              <Field
                icon={<Building2 className="w-4 h-4" />}
                label="Entreprise / Organisation (optionnel)"
                placeholder="Nom de votre structure"
                value={organisation}
                onChange={(v) => {
                  setOrganisation(v);
                  clearMessages();
                }}
              />
            </div>

            <div className="mb-6">
              <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
                <MessageSquare className="w-3.5 h-3.5" />
                Message
              </label>
              <textarea
                rows={4}
                placeholder="Parlez-moi de votre projet..."
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  clearMessages();
                }}
                className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
              />
            </div>

            <button
              onClick={envoyerMessage}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-indigo-900/30 hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Envoyer le message
                </>
              )}
            </button>

            <div
              className={`grid transition-all duration-300 ${
                errorMessage || successMessage ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                {errorMessage && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 text-sm">
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}
                {successMessage && (
                  <div className="flex items-start gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-sm">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{successMessage}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoRow: React.FC<{
  icon: React.ReactNode;
  text: string;
  clickable?: boolean;
  breakAll?: boolean;
}> = ({ icon, text, clickable, breakAll }) => (
  <div
    className={`flex items-center gap-3 p-3 rounded-xl border border-gray-800 bg-gray-900/40 text-sm text-gray-300 h-full ${
      clickable ? 'hover:border-indigo-400/50 hover:text-indigo-200 transition-colors duration-200' : ''
    }`}
  >
    <span className="shrink-0 w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
      {icon}
    </span>
    <span className={breakAll ? 'break-all' : ''}>{text}</span>
  </div>
);

const Field: React.FC<{
  icon: React.ReactNode;
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}> = ({ icon, label, placeholder, value, onChange, type = 'text' }) => (
  <div>
    <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-gray-500 mb-2">
      {icon}
      {label}
    </label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 bg-gray-800/70 border border-gray-700 rounded-xl text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
    />
  </div>
);

export default ContactSection;