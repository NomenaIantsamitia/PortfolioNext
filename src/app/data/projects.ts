import { Project } from '../types';

export const projects: Project[] = [
  {
    title: 'BookTrack',
    description:
      'Application e-commerce complète avec panier, paiement et dashboard admin.',
    technologies: ['Next.js', 'TypeScript', 'NestJS', 'Prisma', 'PostgreSQL'],
    imageSrc: '/book.png',
    videoSrc: 'https://wpamm0tsfccygdbr.public.blob.vercel-storage.com/lv_0_20260822135652.mp4',
    demoLink: 'https://frontend-book-track.vercel.app/',
    status: 'soon',
    githubFrontend: 'https://github.com/NomenaIantsamitia/Book',
    featured: true,
  },
//https://wpamm0tsfccygdbr.public.blob.vercel-storage.com/admin.mp4
//https://wpamm0tsfccygdbr.public.blob.vercel-storage.com/livrur-client.mp4 
{
    title: 'AquaVital',
    description:
      'Plateforme e-commerce multilingue pour la vente d\'eau minérale — web et mobile, du stock à la livraison.',
    technologies: ['React', 'React Native', 'Laravel', 'MySQL', 'i18n'],
    imageSrc: '/aquavital.png',
    videoSrc: 'https://wpamm0tsfccygdbr.public.blob.vercel-storage.com/livrur-client.mp4',
    videos: [
      {
        label: 'Client & Livreur',
        src: 'https://wpamm0tsfccygdbr.public.blob.vercel-storage.com/livrur-client.mp4',
        isDefault: true,
      },
      {
        label: 'Admin',
        src: 'https://wpamm0tsfccygdbr.public.blob.vercel-storage.com/admin.mp4',
      },
    ],
    demoLink: 'https://frontend-book-track.vercel.app/',
    status: 'soon',
    githubFrontend: 'https://github.com/NomenaIantsamitia/Book',
    platforms: ['web'],
    featured: true,
  },
  {
    title: 'MaintenaPro',
    description:
      'La plateforme ultime pour la gestion des maintenances, techniciens et équipements.',
    technologies: ['React', 'Express.js', 'Socket.io', 'Prisma', 'PostgreSQL'],
    imageSrc: '/maintenaPro.png',
    demoLink: 'https://front-maitena-pro.vercel.app',
    githubFrontend: 'https://github.com/NomenaIantsamitia/MaintenaPro',
    featured: false,
  },
  {
    title: 'Tic-tac-toe Pro',
    description:
      'Un jeu de Morpion moderne et interactif développé avec HTML5, CSS3 et JavaScript ES6+.',
    technologies: ['HTML5', 'CSS3', 'JavaScript ES6+'],
    imageSrc: '/tic-tac.png',
    demoLink: 'https://nomenaiantsamitia.github.io/jeu-tic-tac-toe/',
    githubLink: 'https://github.com/NomenaIantsamitia/jeu-tic-tac-toe',
    featured: false,
  },
  {
    title: 'ReadWiseAI',
    description:
      'Assistant de lecture intelligent alimenté par l’IA pour résumer, annoter et explorer vos documents.',
    technologies: ['Next.js', 'OpenAI', 'TypeScript', 'Tailwind'],
    imageSrc: '/ReadWise.png',
    // demoLink & github à mettre à jour
    featured: false,
  },
];