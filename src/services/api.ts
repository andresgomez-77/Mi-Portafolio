import type { Project, Experience, Skill, Education } from "../types/index";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const apiFetch = async <T>(endpoint: string): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}`);
  }
  return response.json() as Promise<T>;
};

/**
 * Wrapper para llamadas autenticadas del admin.
 * Centraliza headers + manejo de error para no repetir el mismo
 * try/catch + fetch en cada componente del panel admin.
 */
const authFetch = async <T>(
  endpoint: string,
  token: string,
  options: RequestInit = {},
): Promise<T> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message =
      body && typeof body === "object" && "message" in body
        ? String((body as { message: unknown }).message)
        : `Error ${response.status}`;
    throw new Error(message);
  }

  return response.json() as Promise<T>;
};

export const projectsApi = {
  getAll: () => apiFetch<Project[]>("/api/projects"),
};

// Tipos de entrada: nunca incluyen `_id` (lo genera Mongo) ni `order`
// (lo calcula el backend — ver POST/PATCH /reorder en projects.ts).
export type ProjectInput = Omit<Project, "_id" | "order">;

export const projectsAdminApi = {
  create: (token: string, payload: ProjectInput) =>
    authFetch<Project>("/api/projects", token, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  update: (token: string, id: string, payload: Partial<ProjectInput>) =>
    authFetch<Project>(`/api/projects/${id}`, token, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  remove: (token: string, id: string) =>
    authFetch<{ message: string }>(`/api/projects/${id}`, token, {
      method: "DELETE",
    }),

  /** orderedIds: array completo de _id en el orden final deseado */
  reorder: (token: string, orderedIds: string[]) =>
    authFetch<Project[]>("/api/projects/reorder", token, {
      method: "PATCH",
      body: JSON.stringify({ orderedIds }),
    }),
};

type UploadSignature = {
  signature: string;
  timestamp: number;
  folder: string;
  apiKey: string;
  cloudName: string;
};

export const uploadApi = {
  getSignature: (token: string) =>
    authFetch<UploadSignature>("/api/upload/signature", token, {
      method: "POST",
    }),
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

export type ContactPayload = {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
};

export const contactApi = {
  send: async (payload: ContactPayload): Promise<void> => {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      const message =
        body && typeof body === "object" && "message" in body
          ? String((body as { message: unknown }).message)
          : "No se pudo enviar el mensaje";
      throw new Error(message);
    }
  },
};