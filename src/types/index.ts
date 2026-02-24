// Aquí re-exportamos todos los tipos para importarlos fácil desde cualquier componente
// En lugar de: import { Skill } from '../data/portfolioData'
// Haremos:     import { Skill } from '../types'

export type {
  Skill,
  Project,
  Experience,
  Education,
  SocialLink,
} from "../data/portfolioData";
