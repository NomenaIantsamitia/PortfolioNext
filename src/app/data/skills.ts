import {
  Code,
  Monitor,
  Layout,
  Palette,
  Server,
  Database,
  Boxes,
  Cpu,
  GitBranch,
  Github,
  Terminal,
  Smartphone,
  Container,
  HardDrive,
  TerminalSquare,
  FileCode,
  Braces,
} from 'lucide-react';
import { Skill } from '../types';

export const skills: Skill[] = [
  // ========== LANGAGES ==========
  { name: 'JavaScript (ES6+)', icon: Code, category: 'Langages', level: 92 },
  { name: 'TypeScript', icon: Cpu, category: 'Langages', level: 90 },
  //{ name: 'PHP', icon: FileCode, category: 'Langages', level: 65 },
 // { name: 'Python', icon: Braces, category: 'Langages', level: 60 },
 // { name: 'Java', icon: Code, category: 'Langages', level: 55 },

  // ========== FRONTEND ==========
  { name: 'React.js', icon: Monitor, category: 'Frontend', level: 90 },
  { name: 'Next.js', icon: Monitor, category: 'Frontend', level: 88 },
  { name: 'HTML5', icon: Layout, category: 'Frontend', level: 95 },
  { name: 'CSS3', icon: Palette, category: 'Frontend', level: 92 },
  { name: 'Tailwind CSS', icon: Palette, category: 'Frontend', level: 95 },

  // ========== MOBILE ==========
  { name: 'React Native', icon: Smartphone, category: 'Mobile', level: 82 },

  // ========== BACKEND ==========
  { name: 'Node.js', icon: Server, category: 'Backend', level: 85 },
  { name: 'NestJS', icon: Server, category: 'Backend', level: 86 },
  { name: 'Express.js', icon: Server, category: 'Backend', level: 82 },

  // ========== BASE DE DONNÉES ==========
  { name: 'PostgreSQL', icon: Database, category: 'Base de données', level: 80 },
  { name: 'MongoDB', icon: Database, category: 'Base de données', level: 78 },
  { name: 'Redis', icon: HardDrive, category: 'Base de données', level: 80 },
  { name: 'Prisma ORM', icon: Boxes, category: 'Base de données', level: 82 },
  { name: 'MySQL', icon: Database, category: 'Base de données', level: 75 },

  // ========== OUTILS ==========
  { name: 'Git', icon: GitBranch, category: 'Outils', level: 90 },
  { name: 'GitHub', icon: Github, category: 'Outils', level: 88 },
  { name: 'Docker', icon: Container, category: 'Outils', level: 85 },
  { name: 'Linux', icon: TerminalSquare, category: 'Outils', level: 82 },
  { name: 'Terminal / Bash', icon: Terminal, category: 'Outils', level: 80 },
];