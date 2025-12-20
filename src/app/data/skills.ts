import { 
    Code, Monitor, Layout, Palette, 
    Server, Database, Boxes, Cpu, 
    GitBranch, Github, Terminal 
  } from "lucide-react";
  import { Skill } from "../types";
  
  export const skills: Skill[] = [
    // --------- FRONTEND ----------
    { name: "HTML5", icon: Layout, category: "Frontend", level: 95 },
    { name: "CSS3", icon: Palette, category: "Frontend", level: 92 },
    { name: "JavaScript (ES6+)", icon: Code, category: "Frontend", level: 90 },
    { name: "TypeScript", icon: Cpu, category: "Frontend", level: 88 },
    { name: "React.js", icon: Monitor, category: "Frontend", level: 90 },
    { name: "Next.js", icon: Monitor, category: "Frontend", level: 88 },
    { name: "Tailwind CSS", icon: Palette, category: "Frontend", level: 95 },
  
    // --------- BACKEND ----------
    { name: "Node.js", icon: Server, category: "Backend", level: 85 },
    { name: "Express.js", icon: Server, category: "Backend", level: 82 },
    { name: "NestJS", icon: Server, category: "Backend", level: 86 },
  
    // --------- DATABASES ----------
    { name: "PostgreSQL", icon: Database, category: "Base de données", level: 80 },
    { name: "MongoDB", icon: Database, category: "Base de données", level: 78 },
    { name: "MySQL", icon: Database, category: "Base de données", level: 75 },
    { name: "Prisma ORM", icon: Boxes, category: "Base de données", level: 82 },
  
    // --------- OUTILS ----------
    { name: "Git", icon: GitBranch, category: "Outils", level: 90 },
    { name: "GitHub", icon: Github, category: "Outils", level: 88 },
    { name: "Terminal / Bash", icon: Terminal, category: "Outils", level: 80 },
  ];
  