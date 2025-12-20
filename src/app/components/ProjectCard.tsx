'use client'
import React from 'react';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { Project } from '../types';
import Image from 'next/image';

const ProjectCard: React.FC<Project> = ({ 
  title, 
  description, 
  technologies, 
  imageSrc,
  demoLink, 
  githubLink,
  featured 
}) => (
  <div className={`group relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-indigo-400/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10 ${
    featured ? 'lg:col-span-2' : ''
  }`}>
    {featured && (
      <div className="absolute top-4 left-4 z-20 flex items-center space-x-1 bg-gradient-to-r from-indigo-500 to-purple-500 px-3 py-1 rounded-full shadow-lg">
        <Sparkles className="w-4 h-4 text-white" />
        <span className="text-sm font-semibold text-white">Projet Phare</span>
      </div>
    )}
    
    <div className="relative h-48 overflow-hidden">
      {imageSrc ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-60"></div>
          <div className="relative w-full h-full">
            <Image 
              src={imageSrc} 
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 flex items-center justify-center">
          <div className="text-gray-400 text-center">
            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
              <span className="text-2xl">📁</span>
            </div>
            <p className="text-sm">Image non disponible</p>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-all duration-500 z-20"></div>
    </div>
    
    <div className="p-6 relative z-10">
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-300 mb-4 leading-relaxed line-clamp-3">
        {description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech, index) => (
          <span 
            key={tech}
            className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-sm font-medium border border-gray-600/50 hover:bg-indigo-500/20 hover:border-indigo-400/50 hover:text-indigo-200 transition-all duration-300 cursor-default"
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {tech}
          </span>
        ))}
      </div>
      
      <div className="flex space-x-3">
        <a 
          href={demoLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 px-4 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 flex-1 justify-center group/btn"
        >
          <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          <span className="font-medium">Voir le projet</span>
        </a>
        
        <a 
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-400 hover:text-white border border-gray-600 hover:border-gray-400 px-4 py-2.5 rounded-lg transition-all duration-300 hover:bg-gray-700/50 flex-1 justify-center group/btn"
        >
          <Github className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
          <span className="font-medium">Code source</span>
        </a>
      </div>
    </div>
    
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
  </div>
);

export default ProjectCard;