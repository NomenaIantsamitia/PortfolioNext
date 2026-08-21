import React from 'react';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const ProjectsSection: React.FC = () => (
  <section id="projets" className="py-20 bg-gray-900">
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Mes <span className="text-indigo-400">Projets</span>
        </h2>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Une sélection de mes réalisations les plus significatives, alliant
          design et performance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;