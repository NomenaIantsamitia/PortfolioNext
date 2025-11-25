import React from 'react';
import { Skill } from '../types';

const SkillCard: React.FC<Skill> = ({ name, icon: Icon, level }) => (
  <div className="group p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-indigo-500 transition-all duration-300 hover:transform hover:-translate-y-2">
    <div className="flex items-center justify-between mb-4">
      <Icon className="w-8 h-8 text-indigo-400" />
      <span className="text-sm font-semibold text-indigo-400">{level}%</span>
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div 
        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${level}%` }}
      ></div>
    </div>
  </div>
);

export default SkillCard;