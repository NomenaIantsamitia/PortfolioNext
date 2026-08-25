import { LucideIcon } from 'lucide-react';

export interface Skill {
  name: string;
  icon: LucideIcon;
  category: string;
  level: number;
}

export type ProjectVideo = {
  label: string;
  src: string;
  isDefault?: boolean;
};

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  imageSrc?: string;
  videoSrc?: string; // rétrocompat
  videos?: ProjectVideo[]; // multi-vidéos (Client / Admin, etc.)
  demoLink?: string;
  githubFrontend?: string;
  githubBackend?: string;
  githubLink?: string;
  featured?: boolean;
  status?: 'live' | 'soon';
  platforms?: ('web' | 'android' | 'ios')[];
}