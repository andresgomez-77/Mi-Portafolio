/**
 * Projects showcase section with tag-based filtering.
 * Features dynamic project filtering and animated transitions.
 */

import { useState, useMemo, useEffect } from "react";
import { Box, Container, Typography, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import { projectsFallback } from "../../data/portfolioData";
import SectionHeader from "../ui/SectionHeader";
import ProjectCard from "../ui/ProjectCard";
import useInView from "../../hooks/useInView";
import { projectsApi } from "../../services/api";
import type { Project } from "../../types/index";

/**
 * Projects section component.
 * Displays filtered projects based on selected tags with smooth animations.
 */
const ProjectsSection = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  /** Extract unique project tags for filter buttons */
  const ALL_TAGS = [
    "Todos",
    ...Array.from(new Set(projects.flatMap((p) => p.tags))),
  ];
  useEffect(() => {
    projectsApi
      .getAll()
      .then((data) => setProjects(data))
      .catch(() => setProjects(projectsFallback))
      .finally(() => setLoading(false));
  }, []);
  /** Compute filtered projects based on active tag selection */
  const filteredProjects = useMemo(() => {
    if (activeFilter === "Todos") return projects;
    return projects.filter((p) => p.tags.includes(activeFilter));
  }, [activeFilter, projects]);

  return (
    <Box
      component="section"
      id="proyectos"
      aria-label="Sección de proyectos"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: tokens.color.bg.surface,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background: `linear-gradient(
            90deg,
            transparent,
            ${tokens.color.border.default},
            transparent
          )`,
        },
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Section title and description */}
          <motion.div
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
            }}
          >
            <SectionHeader tag="04. Proyectos" title="Lo que he construido" />
          </motion.div>

          {/* Filter tags for project selection */}
          <motion.div
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                mb: 5,
              }}
              role="group"
              aria-label="Filtrar proyectos por tecnología"
            >
              {ALL_TAGS.map((tag) => {
                const isActive = activeFilter === tag;
                return (
                  <Chip
                    key={tag}
                    label={tag}
                    onClick={() => setActiveFilter(tag)}
                    aria-pressed={isActive}
                    aria-label={`Filtrar por ${tag}`}
                    sx={{
                      fontFamily: tokens.font.mono,
                      fontSize: "0.72rem",
                      letterSpacing: "0.05em",
                      cursor: "pointer",
                      /* Highlighted style for active filter */
                      backgroundColor: isActive
                        ? tokens.color.amber[500]
                        : alpha(tokens.color.bg.raised, 0.8),
                      color: isActive
                        ? tokens.color.text.inverse
                        : tokens.color.text.secondary,
                      borderColor: isActive
                        ? tokens.color.amber[500]
                        : tokens.color.border.default,
                      fontWeight: isActive ? 600 : 400,
                      transition: `all ${tokens.transition.fast}`,
                      "&:hover": {
                        backgroundColor: isActive
                          ? tokens.color.amber[400]
                          : alpha(tokens.color.amber[500], 0.1),
                        borderColor: tokens.color.amber[500],
                        color: isActive
                          ? tokens.color.text.inverse
                          : tokens.color.amber[500],
                      },
                    }}
                  />
                );
              })}
            </Box>
          </motion.div>

          {/* Projects grid with animated filter transitions */}
          {/*
            AnimatePresence with mode="wait" ensures smooth exit animation
            of old content before new content animates in on filter change.
            key={activeFilter} forces remount to trigger animations.
          */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredProjects.length > 0 ? (
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "1fr",
                      sm: "repeat(2, 1fr)",
                      lg: "repeat(3, 1fr)",
                    },
                    gap: 3,
                    alignItems: "stretch", // FIX: todas las celdas se estiran a la misma altura
                  }}
                >
                  {filteredProjects.map((project, idx) => (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      index={idx}
                      inView={inView}
                    />
                  ))}
                </Box>
              ) : (
                // Empty state when no projects match selected filter
                <Box
                  sx={{
                    textAlign: "center",
                    py: 10,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: tokens.font.display,
                      fontSize: "3rem",
                      color: tokens.color.border.default,
                    }}
                    aria-hidden="true"
                  >
                    404
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: tokens.font.mono,
                      fontSize: "0.82rem",
                      color: tokens.color.text.muted,
                    }}
                  >
                    // no projects found with filter "{activeFilter}"
                  </Typography>
                  <Box
                    component="button"
                    onClick={() => setActiveFilter("Todos")}
                    sx={{
                      mt: 1,
                      px: 2,
                      py: 0.8,
                      background: "none",
                      border: `1px solid ${tokens.color.border.default}`,
                      borderRadius: tokens.radius.sm,
                      color: tokens.color.amber[500],
                      fontFamily: tokens.font.mono,
                      fontSize: "0.75rem",
                      cursor: "pointer",
                      transition: `all ${tokens.transition.fast}`,
                      "&:hover": {
                        borderColor: tokens.color.amber[500],
                        backgroundColor: alpha(tokens.color.amber[500], 0.06),
                      },
                      "&:focus-visible": {
                        outline: `2px solid ${tokens.color.amber[500]}`,
                        outlineOffset: "3px",
                      },
                    }}
                    aria-label="Ver todos los proyectos"
                  >
                    ver todos →
                  </Box>
                </Box>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
