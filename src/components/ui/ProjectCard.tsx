// src/components/ui/ProjectCard.tsx

import { useRef } from "react";
import { Box, Typography, Chip, IconButton, Tooltip } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import type { Project } from "../../data/portfolioData";

interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
}

const BADGE_COLORS: Record<string, string> = {
  featured: tokens.color.amber[500],
  personal: tokens.color.coral[500],
  default: tokens.color.text.muted,
};

const ProjectCard = ({ project, index, inView }: ProjectCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [6, -6]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
    springConfig,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const badgeColor = BADGE_COLORS[project.badgeType ?? "default"];

  return (
    /*
      FIX altura simétrica:
      Para que todas las cards del grid tengan el mismo alto necesitamos
      height: 100% en TODOS los niveles del árbol:
        grid cell → motion.div (outer) → motion.div (inner) → Box article
      Sin esto, el motion.div colapsa al contenido y las cards quedan
      con alturas diferentes según cuánto texto tengan.
    */
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      }}
      style={{ perspective: 1000, height: "100%" }} // ← FIX
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          height: "100%",
        }} // ← FIX
      >
        <Box
          component="article"
          aria-label={`Proyecto: ${project.title}`}
          sx={{
            borderRadius: tokens.radius.lg,
            border: `1px solid ${tokens.color.border.subtle}`,
            backgroundColor: tokens.color.bg.surface,
            overflow: "hidden",
            transition: `border-color ${tokens.transition.normal}, box-shadow ${tokens.transition.normal}`,
            height: "100%", // ← ya estaba, pero ahora tiene efecto real
            display: "flex",
            flexDirection: "column",
            "&:hover": {
              borderColor: alpha(tokens.color.amber[500], 0.35),
              boxShadow: tokens.shadow.glow,
            },
            ...(project.featured && {
              borderColor: alpha(tokens.color.amber[500], 0.2),
            }),
          }}
        >
          {/* IMAGEN — altura fija para todas las cards */}
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              height: "200px", // fija: todas las imágenes miden lo mismo
              flexShrink: 0, // no se comprime aunque el contenido sea largo
              "&:hover .img-overlay": { opacity: 1 },
              "&:hover .project-img": {
                transform: "scale(1.06)",
                filter: "brightness(0.5)",
              },
            }}
          >
            <Box
              component="img"
              src={project.image}
              alt={`Captura del proyecto ${project.title}`}
              loading="lazy"
              className="project-img"
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: `all ${tokens.transition.slow}`,
                display: "block",
              }}
            />

            {/* Overlay hover */}
            <Box
              className="img-overlay"
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                opacity: 0,
                transition: `opacity ${tokens.transition.normal}`,
              }}
              aria-hidden="true"
            >
              <Tooltip title="Ver código" placement="top" arrow>
                <IconButton
                  component="a"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver código de ${project.title} en GitHub`}
                  sx={{
                    backgroundColor: alpha(tokens.color.bg.base, 0.9),
                    border: `1px solid ${tokens.color.border.default}`,
                    color: tokens.color.text.primary,
                    backdropFilter: "blur(8px)",
                    "&:hover": {
                      backgroundColor: tokens.color.amber[500],
                      color: tokens.color.text.inverse,
                      borderColor: tokens.color.amber[500],
                    },
                  }}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {project.demoUrl && (
                <Tooltip title="Ver demo" placement="top" arrow>
                  <IconButton
                    component="a"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver demo de ${project.title}`}
                    sx={{
                      backgroundColor: alpha(tokens.color.bg.base, 0.9),
                      border: `1px solid ${tokens.color.border.default}`,
                      color: tokens.color.text.primary,
                      backdropFilter: "blur(8px)",
                      "&:hover": {
                        backgroundColor: tokens.color.amber[500],
                        color: tokens.color.text.inverse,
                        borderColor: tokens.color.amber[500],
                      },
                    }}
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            {/* Badge */}
            <Box
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                px: 1.2,
                py: 0.4,
                borderRadius: tokens.radius.full,
                backgroundColor: alpha(badgeColor, 0.15),
                border: `1px solid ${alpha(badgeColor, 0.4)}`,
              }}
              aria-label={`Tipo: ${project.badge}`}
            >
              <Typography
                sx={{
                  fontFamily: tokens.font.mono,
                  fontSize: "0.6rem",
                  color: badgeColor,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {project.badge}
              </Typography>
            </Box>
          </Box>

          {/* CONTENIDO — flexGrow empuja links al fondo */}
          <Box
            sx={{
              p: 2.5,
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              gap: 1.5,
            }}
          >
            <Typography
              variant="h3"
              component="h3"
              sx={{
                fontSize: "1rem",
                fontWeight: 600,
                color: tokens.color.text.primary,
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </Typography>

            {/*
              FIX descripción: altura mínima fija para que cards con
              descripciones cortas no queden con el footer subido.
              Todas las descripciones ocupan el mismo espacio.
            */}
            <Typography
              variant="body2"
              sx={{
                fontSize: "0.82rem",
                flexGrow: 1,
                lineHeight: 1.7,
                // Limitar a 3 líneas con ellipsis para uniformidad
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                minHeight: "calc(0.82rem * 1.7 * 3)", // 3 líneas exactas
              }}
            >
              {project.description}
            </Typography>

            {/* Tags */}
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}
              role="list"
              aria-label="Tecnologías usadas"
            >
              {project.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  role="listitem"
                  aria-label={tag}
                />
              ))}
            </Box>

            {/* Links footer de la card */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                pt: 1,
                borderTop: `1px solid ${tokens.color.border.subtle}`,
                mt: "auto",
              }}
            >
              <Box
                component="a"
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Código de ${project.title}`}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: tokens.color.text.muted,
                  fontFamily: tokens.font.mono,
                  fontSize: "0.72rem",
                  transition: `color ${tokens.transition.fast}`,
                  "&:hover": { color: tokens.color.amber[500] },
                }}
              >
                <GitHubIcon sx={{ fontSize: "0.85rem" }} /> Código
              </Box>

              {project.demoUrl && (
                <Box
                  component="a"
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Demo de ${project.title}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    color: tokens.color.text.muted,
                    fontFamily: tokens.font.mono,
                    fontSize: "0.72rem",
                    transition: `color ${tokens.transition.fast}`,
                    "&:hover": { color: tokens.color.amber[500] },
                  }}
                >
                  <OpenInNewIcon sx={{ fontSize: "0.85rem" }} /> Demo
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  );
};

export default ProjectCard;
