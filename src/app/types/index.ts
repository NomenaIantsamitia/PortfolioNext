import { LucideIcon } from 'lucide-react';

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: string;
  level: number;
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageSrc?: string;
  videoSrc?: string;
  demoLink?: string;
  githubFrontend?: string;
  githubBackend?: string;
  githubLink?: string;
  featured?: boolean;
  status?: 'live' | 'soon'; // NOUVEAU — défaut 'live'
}