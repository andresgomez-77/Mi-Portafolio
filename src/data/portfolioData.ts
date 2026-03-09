import type {
  Project,
  Experience,
  Education,
  Skill,
  Hobby,
  SocialLink,
} from "../types/index";

// ── 2. INFORMACIÓN PERSONAL ───────────────────────────────────────────────────
export const personalInfo = {
  name: "Andrés Felipe",
  lastName: "Gómez Pinzón",
  roles: [
    "Desarrollador Frontend 💻",
    "Ingeniero Electrónico ⚡",
    "Full Stack en progreso 🚀",
    "Admin de Bases de Datos 🗄️",
  ],
  holder:
    "Ingeniero Electrónico | Desarrollador Frontend / Full Stack (React, TypeScript) | Administrador de Bases de Datos | Coordinador Técnico de Proyectos",
  // Descripción que aparece en "Sobre mí" — actualizada con tu experiencia real
  description:
    "Ingeniero Electrónico con experiencia en desarrollo Frontend y Full Stack, administración operativa de bases de datos SQL y NoSQL, e integración de sistemas mediante APIs REST. He participado en el desarrollo y validación de interfaces con React, JavaScript y TypeScript, así como en la gestión de PostgreSQL y PostGIS en entornos Linux. Cuento con experiencia coordinando equipos técnicos multidisciplinarios bajo metodologías ágiles como Scrum.",
  location: "Colombia 🇨🇴",
  email: "andresgomez-77@hotmail.com",
  available: true,
  photo: "/assets/img/cara.png",
  cv: "/assets/doc/C.V. - Andrés Felipe Gómez P.pdf",
  github: "https://github.com/andresgomez-77",
  linkedin: "https://www.linkedin.com/in/andresfgomezp/",
  // Stats del "Sobre mí"
  stats: [
    { number: "6+", label: "Proyectos" },
    { number: "2+", label: "Años dev" },
    { number: "∞", label: "Curiosidad" },
  ],
};

// ── 3. EXPERIENCIA PROFESIONAL ────────────────────────────────────────────────
export const experiencesFallback: Experience[] = [
  {
    _id: "1",
    role: "Coordinador de Desarrollo de Proyectos",
    company: "ActionTracker Solutions SL",
    date: "Junio 2023 - Actual",
    current: true,
    responsibilities: [
      "Coordinación técnica de equipos Frontend, Backend, GIS, QA y análisis de datos bajo metodologías ágiles (Scrum).",
      "Participación en el desarrollo y validación de interfaces frontend con React, JavaScript y TypeScript, integradas con servicios backend mediante APIs REST.",
      "Gestión de repositorios en GitHub utilizando Gitflow (branches, issues, merges y releases).",
      "Administración de bases de datos SQL y NoSQL (PostgreSQL, PostGIS, MySQL, MongoDB), incluyendo esquemas, tablas, índices, particiones y control de integridad.",
      "Ejecución de respaldos (backups), restauración, monitoreo de disponibilidad y optimización de consultas SQL.",
      "Coordinación de despliegues con Docker, Kubernetes y Rancher, asegurando estabilidad de los entornos productivos.",
      "Soporte y mantenimiento de bases de datos en aplicaciones productivas, colaborando con equipos de desarrollo y operaciones.",
    ],
    order: 1,
  },
];

// ── 4. SKILLS ─────────────────────────────────────────────────────────────────
// Los skills están agrupados por categoría.
// El componente SkillsSection los va a filtrar por category para mostrarlos.
export const skillsFallback: Skill[] = [
  {
    _id: "1",
    name: "HTML5",
    level: 100,
    category: "Frontend / Backend",
    order: 1,
  },
  {
    _id: "2",
    name: "CSS3",
    level: 100,
    category: "Frontend / Backend",
    order: 2,
  },
  {
    _id: "3",
    name: "JavaScript",
    level: 85,
    category: "Frontend / Backend",
    order: 3,
  },
  {
    _id: "4",
    name: "React",
    level: 80,
    category: "Frontend / Backend",
    order: 4,
  },
  {
    _id: "5",
    name: "TypeScript",
    level: 80,
    category: "Frontend / Backend",
    order: 5,
  },
  {
    _id: "6",
    name: "Node.js",
    level: 65,
    category: "Frontend / Backend",
    order: 6,
  },
  {
    _id: "7",
    name: "Java / Spring Boot",
    level: 30,
    category: "Frontend / Backend",
    order: 7,
  },

  { _id: "8", name: "C++", level: 70, category: "Ingeniería", order: 8 },
  { _id: "9", name: "Arduino", level: 75, category: "Ingeniería", order: 9 },
  { _id: "10", name: "Matlab", level: 60, category: "Ingeniería", order: 10 },
  { _id: "11", name: "Java", level: 50, category: "Ingeniería", order: 11 },

  {
    _id: "12",
    name: "Bootstrap",
    level: 85,
    category: "Habilidades Técnicas",
    order: 12,
  },
  {
    _id: "13",
    name: "APIs REST",
    level: 85,
    category: "Habilidades Técnicas",
    order: 13,
  },
  {
    _id: "14",
    name: "PostgreSQL",
    level: 85,
    category: "Habilidades Técnicas",
    order: 14,
  },
  {
    _id: "15",
    name: "MongoDB",
    level: 75,
    category: "Habilidades Técnicas",
    order: 15,
  },
  {
    _id: "16",
    name: "Docker",
    level: 80,
    category: "Habilidades Técnicas",
    order: 16,
  },
  {
    _id: "17",
    name: "Git",
    level: 95,
    category: "Habilidades Técnicas",
    order: 17,
  },
  {
    _id: "18",
    name: "SQL Optimization",
    level: 90,
    category: "Habilidades Técnicas",
    order: 18,
  },

  {
    _id: "19",
    name: "PostGIS",
    level: 90,
    category: "DevOps y Bases de Datos",
    order: 19,
  },
  {
    _id: "20",
    name: "MySQL",
    level: 90,
    category: "DevOps y Bases de Datos",
    order: 20,
  },
  {
    _id: "21",
    name: "Pentaho",
    level: 70,
    category: "DevOps y Bases de Datos",
    order: 21,
  },
  {
    _id: "22",
    name: "Linux",
    level: 75,
    category: "DevOps y Bases de Datos",
    order: 22,
  },
  {
    _id: "23",
    name: "Kubernetes",
    level: 70,
    category: "DevOps y Bases de Datos",
    order: 23,
  },
  {
    _id: "24",
    name: "Rancher",
    level: 85,
    category: "DevOps y Bases de Datos",
    order: 24,
  },
  {
    _id: "25",
    name: "Jenkins",
    level: 75,
    category: "DevOps y Bases de Datos",
    order: 25,
  },
  {
    _id: "26",
    name: "AWS",
    level: 60,
    category: "DevOps y Bases de Datos",
    order: 26,
  },

  { _id: "27", name: "Español", level: 100, category: "Idiomas", order: 27 },
  { _id: "28", name: "Inglés", level: 65, category: "Idiomas", order: 28 },
];
// ── 5. PROYECTOS ──────────────────────────────────────────────────────────────
export const projectsFallback: Project[] = [
  {
    _id: "1",
    title: "Encriptador de Texto",
    description:
      "Aplicación web que encripta y desencripta mensajes usando lógica de sustitución de caracteres. Primer challenge de Alura.",
    image: "/assets/img/Encriptador.png",
    tags: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/andresgomez-77/challenge-encriptador-oracle",
    demoUrl: "https://andresgomez-77.github.io/challenge-encriptador-oracle/",
    badge: "Challenge Alura",
    badgeType: "default",
    order: 1,
  },
  {
    _id: "2",
    title: "Juego del Ahorcado",
    description:
      "Juego interactivo con temática siniestra, música de suspenso y controles de audio. Diseñado para ser inmersivo.",
    image: "/assets/img/ahorcado.jpg",
    tags: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/andresgomez-77/Juego-del-Ahorcado",
    demoUrl: "https://andresgomez-77.github.io/Juego-del-Ahorcado/",
    badge: "Challenge Alura",
    badgeType: "default",
    order: 2,
  },
  {
    _id: "3",
    title: "Tienda Virtual",
    description:
      "E-commerce de materiales de construcción. En proceso de actualización a stack moderno con autenticación y panel admin.",
    image: "/assets/img/e-commerce.png",
    tags: ["Tailwind CSS", "TypeScript", "React", "Supabase", "Next.js"],
    githubUrl: "https://github.com/andresgomez-77/E-commerce",
    demoUrl: "https://andresgomez-77.github.io/E-commerce/",
    featured: true,
    badge: "Destacado",
    badgeType: "featured",
    order: 3,
  },
  {
    _id: "4",
    title: "Conversor de Moneda",
    description:
      "Convierte pesos colombianos a distintas divisas y unidades de masa. Desarrollado en Java con Eclipse IDE.",
    image: "/assets/img/Conversor.png",
    tags: ["Java", "Eclipse IDE"],
    githubUrl: "https://github.com/andresgomez-77/Conversor-de-Moneda",
    badge: "Challenge Alura",
    badgeType: "default",
    order: 4,
  },
  {
    _id: "5",
    title: "Hotel Alura",
    description:
      "Sistema de reservas hoteleras en Java. Controla el flujo de reservas y huéspedes con interfaz gráfica Swing.",
    image: "/assets/img/hotelAlura.png",
    tags: ["Java", "MySQL", "Swing"],
    githubUrl: "https://github.com/andresgomez-77/hotel-alura",
    badge: "Challenge Alura",
    badgeType: "default",
    order: 5,
  },
  {
    _id: "6",
    title: "StarJeak Streaming",
    description:
      "Plataforma de entretenimiento con secciones de streaming, música y juegos. Mi primer proyecto web completo.",
    image: "/assets/img/Sin titulo.png",
    tags: ["HTML", "CSS"],
    githubUrl: "https://github.com/andresgomez-77/Starjeak",
    demoUrl: "https://andresgomez-77.github.io/Starjeak/",
    badge: "Personal",
    badgeType: "personal",
    order: 6,
  },
];

// ── 6. FORMACIÓN ──────────────────────────────────────────────────────────────
export const educationFallback: Education[] = [
  {
    _id: "1",
    title: "Técnico en Sistemas",
    institution: "SENA",
    date: "Nov 2012",
    description: "Base en tecnología e informática.",
    type: "academic",
    order: 1,
  },
  {
    _id: "2",
    title: "Tecnólogo en Electrónica",
    institution: "UTS",
    date: "Mar 2019",
    description:
      "Circuitos electrónicos, sistemas embebidos y diseño de hardware.",
    type: "academic",
    order: 2,
  },
  {
    _id: "3",
    title: "Ingeniería en Electrónica",
    institution: "UTS — Universidad de Tecnología y Sociedad",
    date: "Jun 2020",
    description:
      "Título profesional. Arduino, PLCs y Matlab para ingeniería de sistemas.",
    type: "academic",
    order: 3,
  },
  {
    _id: "4",
    title: "Desarrollo Web Front-End: HTML y CSS",
    institution: "Crehana",
    date: "Jun 2022",
    description:
      "Primer paso formal en desarrollo web, fundamentos de HTML5 y CSS3.",
    type: "course",
    order: 4,
  },
  {
    _id: "5",
    title: "Programa Oracle ONE + Alura",
    institution: "Oracle + Alura Latam",
    date: "Feb 2023",
    description:
      "Formación intensiva en programación, desarrollo front-end y back-end con proyectos reales.",
    current: false,
    type: "course",
    order: 5,
  },
];

// ── 7. HOBBIES ────────────────────────────────────────────────────────────────
export const hobbies: Hobby[] = [
  {
    icon: "🎧",
    title: "Música",
    description: "Escuchar buenos temas en cualquier momento",
  },
  {
    icon: "🎮",
    title: "Videojuegos",
    description: "Aventuras épicas en mundos virtuales",
  },
  {
    icon: "⚽",
    title: "Fútbol",
    description: "El deporte que une a todo el mundo",
  },
  {
    icon: "🎾",
    title: "Tenis",
    description: "Deporte de precisión y estrategia",
  },
  {
    icon: "🍳",
    title: "Cocinar",
    description: "Experimentar con sabores y recetas nuevas",
  },
  {
    icon: "🏖️",
    title: "Naturaleza",
    description: "Pasear y desconectar al aire libre",
  },
];

// ── 8. REDES SOCIALES ─────────────────────────────────────────────────────────
export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/andresgomez-77", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/andresfgomezp/",
    icon: "linkedin",
  },
  { name: "Email", url: "mailto:andresgomez-77@hotmail.com", icon: "email" },
];
