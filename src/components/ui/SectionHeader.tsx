// src/components/ui/SectionHeader.tsx
// Componente reutilizable para el header de cada sección.
// Lo usan: AboutSection, ExperienceSection, SkillsSection y todas las demás.

import { Box, Typography } from "@mui/material";
import { tokens } from "../../theme/theme";

interface SectionHeaderProps {
  tag: string; // ej: "01. Sobre mí"
  title: string; // ej: "¿Quién soy?"
  centered?: boolean; // para secciones que quieren el header centrado
}

const SectionHeader = ({
  tag,
  title,
  centered = false,
}: SectionHeaderProps) => (
  <Box
    sx={{
      mb: { xs: 4, md: 6 },
      textAlign: centered ? "center" : "left",
    }}
  >
    {/* Tag de sección — fuente mono, color amber */}
    <Typography variant="subtitle1" sx={{ mb: 1 }}>
      {tag}
    </Typography>

    {/* Título grande con Bebas Neue */}
    <Typography
      variant="h2"
      component="h2"
      sx={{
        color: tokens.color.text.primary,
        display: "inline-block",
      }}
    >
      {title}
    </Typography>

    {/* Línea decorativa bajo el título */}
    <Box
      sx={{
        mt: 1.5,
        width: "60px",
        height: "3px",
        background: `linear-gradient(90deg, ${tokens.color.amber[500]}, transparent)`,
        borderRadius: tokens.radius.full,
        mx: centered ? "auto" : 0,
      }}
      aria-hidden="true"
    />
  </Box>
);

export default SectionHeader;
