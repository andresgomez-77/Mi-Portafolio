import type { Project, Experience, Skill, Education } from "../types/index";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const apiFetch = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  return response.json() as Promise<T>;
};
export const projectsApi = {
  getAll: () => apiFetch<Project[]>("/api/projects"),
};

export const experiencesApi = {
  getAll: () => apiFetch<Experience[]>("/api/experiences"),
};

export const skillsApi = {
  getAll: () => apiFetch<Skill[]>("/api/skills"),
};

export const educationApi = {
  getAll: () => apiFetch<Education[]>("/api/education"),
};
