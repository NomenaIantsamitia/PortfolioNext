import { Code, Cpu, Database, Palette, Github } from 'lucide-react';
import { Skill } from '../types';

export const skills: Skill[] = [
  { name: 'React/Next.js', icon: Code, category: 'Frontend', level: 90 },
  { name: 'TypeScript', icon: Cpu, category: 'Langages', level: 85 },
  { name: 'Node.js/Express', icon: Database, category: 'Backend', level: 80 },
  { name: 'Tailwind CSS', icon: Palette, category: 'Styling', level: 95 },
  { name: 'PostgreSQL', icon: Database, category: 'Base de données', level: 75 },
  { name: 'Git/GitHub', icon: Github, category: 'Outils', level: 88 },
];