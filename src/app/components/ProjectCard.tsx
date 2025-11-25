import React from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { Project } from '../types';

const ProjectCard: React.FC<Project> = ({ 
  title, 
  description, 
  technologies, 
  demoLink, 
  githubLink,
  featured 
}) => (
  <div className={`group relative bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-500 ${
    featured ? 'lg:col-span-2' : ''
  }`}>
    {featured && (
      <div className="absolute top-4 left-4 z-10 flex items-center space-x-1 bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 rounded-full">
        <Sparkles className="w-4 h-4 text-white" />
        <span className="text-sm font-semibold text-white">Projet Phare</span>
      </div>
    )}
    
    <div className="relative h-48 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 z-10"></div>
      <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900"></div>
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech) => (
          <span 
            key={tech}
            className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex space-x-4">
        <a 
          href={demoLink}
          className="flex items-center space-x-2 text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-300"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Voir le projet</span>
        </a>
        <a 
          href={githubLink}
          className="flex items-center space-x-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 px-4 py-2 rounded-lg transition-all duration-300"
        >
          <Github className="w-4 h-4" />
          <span>Code source</span>
        </a>
      </div>
    </div>
  </div>
);

export default ProjectCard;