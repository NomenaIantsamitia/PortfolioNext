import React from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 font-sans antialiased">
      <Navigation />
      <main>
        <HeroSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;