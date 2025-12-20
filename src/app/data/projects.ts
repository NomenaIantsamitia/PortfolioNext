import { Project } from "../types";
export const projects: Project[] = [
  {
    title: 'BookTrack',
    description: 'Application e-commerce complète avec panier, paiement et dashboard admin.',
    technologies: ['Next.js', 'TypeScript', 'NestJS', 'Prisma','PostgreSQL'],
    imageSrc: '/book.png',
    demoLink: 'https://frontend-book-track.vercel.app/',
    githubLink: 'https://github.com/NomenaIantsamitia/Book',
    featured: false
  },
  {
    title: 'MaintenaPro',
    description: 'La plateforme ultime pour la gestion des maintenances, techniciens et équipements',
    technologies: ['React', 'Express.js', 'Socket.io', 'Prisma',"PostgreSql"],
    imageSrc: '/maintenaPro.png',
    demoLink: 'https://front-maitena-pro.vercel.app',
    githubLink: 'https://github.com/NomenaIantsamitia/MaintenaPro',
    featured: false
  },
  {
    title: 'Tic-tac-toe Pro',
    description: 'Un jeu de Morpion (Tic-Tac-Toe) moderne et interactif développé avec HTML5, CSS3 et JavaScript ES6+.',
    technologies: ['HTML5', 'CSS3', 'JavaScript ES6+'],
    imageSrc: '/tic-tac.png',
    demoLink: 'https://nomenaiantsamitia.github.io/jeu-tic-tac-toe/',
    githubLink: 'https://github.com/NomenaIantsamitia/jeu-tic-tac-toe',
    featured: false
  },
];