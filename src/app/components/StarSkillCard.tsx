'use client'
import React from 'react';
import { Skill } from '../types';
import { Star } from 'lucide-react';

const StarSkillCard: React.FC<Skill> = ({ name, icon: Icon, level }) => {
  const stars = Math.ceil(level / 20);

  return (
    <div className="group relative p-4 bg-gray-900/60 rounded-xl border border-gray-700 hover:border-fuchsia-500/60 transition-all duration-300 hover:shadow-lg hover:shadow-fuchsia-500/10 overflow-hidden">
      <div className="flex items-center gap-3 mb-3">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-fuchsia-500/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-fuchsia-400 group-hover:text-fuchsia-300 transition-colors" />
        </div>
        <h3
          className="flex-1 min-w-0 text-sm font-semibold text-white truncate"
          title={name}
        >
          {name}
        </h3>
        <span className="shrink-0 text-sm font-bold text-indigo-400">
          {level}%
        </span>
      </div>

      <div className="flex gap-0.5 mb-3">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < stars
                ? 'text-yellow-400 fill-yellow-400/80'
                : 'text-gray-700 fill-gray-700'
            }`}
          />
        ))}
      </div>

      <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 transition-all duration-1000 ease-out"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
};

export default StarSkillCard;