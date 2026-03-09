// Aquí re-exportamos todos los tipos para importarlos fácil desde cualquier componente
// En lugar de: import { Skill } from '../data/portfolioData'
// Haremos:     import { Skill } from '../types'

export interface Hobby {
  icon: string;
  title: string;
  description: string;
}
export interface SocialLink {
  name: string;
  url: string;
  icon: "github" | "linkedin" | "email";
}
export interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  demoUrl?: string;
  featured?: boolean;
  badge: string;
  badgeType?: "default" | "featured" | "personal";
  order: number;
}
export interface Experience {
  _id: string;
  role: string;
  company: string;
  date: string;
  current?: boolean;
  responsibilities: string[];
  order: number;
}

export interface Skill {
  _id: string;
  name: string;
  level: number;
  category: string;
  order: number;
}

export interface Education {
  _id: string;
  title: string;
  institution: string;
  date: string;
  description: string;
  current?: boolean;
  type: "academic" | "course";
  order: number;
}
