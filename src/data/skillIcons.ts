// src/data/skillIcons.ts
// ─────────────────────────────────────────────────────────────────────────────
// MAPEO DE ÍCONOS PARA SKILLS
// Responsabilidad única: conectar el nombre de una skill con su ícono de MUI.
//
// ¿Por qué separado de portfolioData.ts?
// → portfolioData.ts no debería saber de dónde vienen los íconos.
//   Si mañana cambias MUI por react-icons, solo tocas ESTE archivo.
// ─────────────────────────────────────────────────────────────────────────────

import type { SvgIconProps } from "@mui/material";

import HtmlIcon from "@mui/icons-material/Html";
import CssIcon from "@mui/icons-material/Css";
import JavascriptIcon from "@mui/icons-material/Javascript";
import CodeIcon from "@mui/icons-material/Code";
import TerminalIcon from "@mui/icons-material/Terminal";
import MemoryIcon from "@mui/icons-material/Memory";
import BuildIcon from "@mui/icons-material/Build";
import StorageIcon from "@mui/icons-material/Storage";
import CloudIcon from "@mui/icons-material/Cloud";
import GitHubIcon from "@mui/icons-material/GitHub";
import SpeedIcon from "@mui/icons-material/Speed";
import SettingsIcon from "@mui/icons-material/Settings";
import DnsIcon from "@mui/icons-material/Dns";
import BackupIcon from "@mui/icons-material/Backup";
import LanguageIcon from "@mui/icons-material/Language";
import TranslateIcon from "@mui/icons-material/Translate";

type SkillIconComponent = React.ComponentType<SvgIconProps>;
const skillIconsMap: Record<string, SkillIconComponent> = {
  // Frontend / Backend
  HTML5: HtmlIcon,
  CSS3: CssIcon,
  JavaScript: JavascriptIcon,
  React: CodeIcon,
  TypeScript: CodeIcon,
  "Node.js": TerminalIcon,
  "Java / Spring Boot": CodeIcon,

  // Ingeniería
  "C++": MemoryIcon,
  Arduino: MemoryIcon,
  Matlab: BuildIcon,
  Java: CodeIcon,

  // Habilidades Técnicas
  Bootstrap: CodeIcon,
  "APIs REST": SettingsIcon,
  PostgreSQL: StorageIcon,
  MongoDB: StorageIcon,
  Docker: CloudIcon,
  Git: GitHubIcon,
  "SQL Optimization": SpeedIcon,

  // DevOps y Bases de Datos
  PostGIS: DnsIcon,
  MySQL: StorageIcon,
  Pentaho: SettingsIcon,
  Linux: TerminalIcon,
  Kubernetes: CloudIcon,
  Rancher: CloudIcon,
  Jenkins: BuildIcon,
  AWS: BackupIcon,

  // Idiomas
  Español: LanguageIcon,
  Inglés: TranslateIcon,
};
export const getSkillIcon = (skillName: string): SkillIconComponent => {
  return skillIconsMap[skillName] ?? CodeIcon;
};
