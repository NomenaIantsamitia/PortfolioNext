import { Project } from "../types";
export const projects: Project[] = [
  {
    title: 'Plateforme E-commerce',
    description: 'Application e-commerce complète avec panier, paiement et dashboard admin.',
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
    imageSrc: '/projects/ecommerce.jpg',
    demoLink: '#',
    githubLink: '#',
    featured: true
  },
  {
    title: 'Application de Gestion de Tâches',
    description: 'Outil de productivité avec drag & drop, notifications et collaboration en temps réel.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    imageSrc: '/projects/taskapp.jpg',
    demoLink: '#',
    githubLink: '#',
    featured: false
  },
  {
    title: 'Portfolio Artistique',
    description: 'Galerie portfolio interactive pour artiste avec animations Canvas et 3D.',
    technologies: ['Three.js', 'React', 'Framer Motion'],
    imageSrc: '/projects/portfolio.jpg',
    demoLink: '#',
    githubLink: '#',
    featured: true
  },
];