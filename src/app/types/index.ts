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
  imageSrc: string;
  demoLink: string;
  githubLink: string;
  featured: boolean;
}