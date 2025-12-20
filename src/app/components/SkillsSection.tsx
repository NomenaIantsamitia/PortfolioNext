'use client'
import React from 'react';
import { skills } from '../data/skills';
import StarSkillCard from './StarSkillCard';

const SkillsSection: React.FC = () => {
  const categories = Array.from(new Set(skills.map(skill => skill.category)));
  
  return (
    <section id="competences" className="py-20 bg-gray-800/30">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mes <span className="text-indigo-400">Compétences</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Un éventail de technologies modernes pour créer des applications web performantes et élégantes.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-bold text-white mb-8 border-l-4 border-indigo-500 pl-4">
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills
                .filter(skill => skill.category === category)
                .map((skill) => (
                //  <SkillCard key={skill.name} {...skill} />
              // <CircularSkillCard key={skill.name} {...skill} />

<StarSkillCard key={skill.name} {...skill} />
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;