/**
 * Skills showcase section with categorized tabs.
 * Displays competencies grouped by technology domain with skill level indicators.
 */

import { useState, useMemo } from "react";
import { Box, Container, Tabs, Tab, Typography } from "@mui/material";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import {
  skills,
  skillCategories,
  getSkillsByCategory,
} from "../../data/portfolioData";
import type { SkillCategory } from "../../data/portfolioData";
import SectionHeader from "../ui/SectionHeader";
import SkillBar from "../ui/SkillBar";
import useInView from "../../hooks/useInView";

/** Emoji icons for skill category tab labels */
const CATEGORY_ICONS: Record<SkillCategory, string> = {
  "Frontend / Backend": "⚡",
  Ingeniería: "🔧",
  "Habilidades Técnicas": "💻",
  "DevOps y Bases de Datos": "⚙️",
  Idiomas: "🌍",
};

/** Animation variants for section entrance */
const fadeUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Animación del panel de skills al cambiar de tab
const panelVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

/**
 * Skills section component.
 * Displays skills categorized by technology domain with tab navigation.
 */
const SkillsSection = () => {
  /** Track which skill category tab is currently active */
  const [activeTab, setActiveTab] = useState<SkillCategory>(skillCategories[0]);

  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  /** Memoize category skills to avoid recalculation on other state changes */
  const currentSkills = useMemo(
    () => getSkillsByCategory(activeTab),
    [activeTab],
  );

  /** Calculate total and average skill levels across all categories */
  const totalSkills = skills.length;
  const avgLevel = useMemo(
    () => Math.round(skills.reduce((acc, s) => acc + s.level, 0) / totalSkills),
    [totalSkills],
  );

  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: SkillCategory,
  ) => {
    setActiveTab(newValue);
  };

  return (
    <Box
      component="section"
      id="skills"
      aria-label="Sección de habilidades técnicas"
      ref={ref}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: tokens.color.bg.base,
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
          {/* ── HEADER ──────────────────────────────────────────────────────── */}
          <motion.div variants={fadeUpVariants}>
            <SectionHeader tag="03. Skills" title="Lo que sé hacer" />
          </motion.div>

          {/* ── RESUMEN GLOBAL ───────────────────────────────────────────────── */}
          <motion.div variants={fadeUpVariants}>
            <Box
              sx={{
                display: "flex",
                gap: { xs: 2, md: 4 },
                mb: 5,
                flexWrap: "wrap",
              }}
            >
              {/* Total skills */}
              <Box
                sx={{
                  px: 2.5,
                  py: 1.5,
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${tokens.color.border.subtle}`,
                  backgroundColor: alpha(tokens.color.bg.surface, 0.6),
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: tokens.font.display,
                    fontSize: "2rem",
                    lineHeight: 1,
                    color: tokens.color.amber[500],
                  }}
                >
                  {totalSkills}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: tokens.font.mono,
                    fontSize: "0.65rem",
                    color: tokens.color.text.muted,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    lineHeight: 1.4,
                  }}
                >
                  Tech
                  <br />
                  skills
                </Typography>
              </Box>

              {/* Nivel promedio */}
              <Box
                sx={{
                  px: 2.5,
                  py: 1.5,
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${tokens.color.border.subtle}`,
                  backgroundColor: alpha(tokens.color.bg.surface, 0.6),
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: tokens.font.display,
                    fontSize: "2rem",
                    lineHeight: 1,
                    color: tokens.color.amber[500],
                  }}
                >
                  {avgLevel}%
                </Typography>
                <Typography
                  sx={{
                    fontFamily: tokens.font.mono,
                    fontSize: "0.65rem",
                    color: tokens.color.text.muted,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    lineHeight: 1.4,
                  }}
                >
                  Nivel
                  <br />
                  promedio
                </Typography>
              </Box>

              {/* Categorías */}
              <Box
                sx={{
                  px: 2.5,
                  py: 1.5,
                  borderRadius: tokens.radius.md,
                  border: `1px solid ${tokens.color.border.subtle}`,
                  backgroundColor: alpha(tokens.color.bg.surface, 0.6),
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: tokens.font.display,
                    fontSize: "2rem",
                    lineHeight: 1,
                    color: tokens.color.amber[500],
                  }}
                >
                  {skillCategories.length}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: tokens.font.mono,
                    fontSize: "0.65rem",
                    color: tokens.color.text.muted,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    lineHeight: 1.4,
                  }}
                >
                  Áreas
                  <br />
                  técnicas
                </Typography>
              </Box>
            </Box>
          </motion.div>

          {/* ── TABS DE CATEGORÍA ────────────────────────────────────────────── */}
          <motion.div variants={fadeUpVariants}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable" // scroll horizontal en mobile
              scrollButtons="auto"
              allowScrollButtonsMobile
              aria-label="Categorías de habilidades"
              sx={{ mb: 4 }}
            >
              {skillCategories.map((category) => (
                <Tab
                  key={category}
                  value={category} // value en string, no en índice
                  label={
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.8,
                      }}
                    >
                      <span aria-hidden="true">{CATEGORY_ICONS[category]}</span>
                      <span>{category}</span>
                    </Box>
                  }
                  id={`tab-${category}`}
                  aria-controls={`panel-${category}`}
                />
              ))}
            </Tabs>
          </motion.div>

          {/* ── PANEL DE SKILLS ──────────────────────────────────────────────── */}
          {/*
            AnimatePresence con mode="wait":
            → Espera a que el panel salga antes de mostrar el nuevo
            → La key={activeTab} le dice a Framer que es un elemento nuevo
              cuando cambia el tab, forzando la animación de salida/entrada
          */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab} // ← clave para forzar re-animación
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="tabpanel"
              id={`panel-${activeTab}`}
              aria-labelledby={`tab-${activeTab}`}
            >
              <Box
                sx={{
                  display: "grid",
                  // Bento grid: 2 columnas en mobile, 3 en tablet, 4 en desktop
                  gridTemplateColumns: {
                    xs: "1fr 1fr",
                    sm: "repeat(3, 1fr)",
                    lg: "repeat(4, 1fr)",
                  },
                  gap: 2,
                }}
                role="list"
                aria-label={`Habilidades de ${activeTab}`}
              >
                {currentSkills.map((skill, idx) => (
                  <SkillBar
                    key={skill.name}
                    skill={skill}
                    trigger={inView}
                    delay={idx * 60} // 60ms entre cada skill
                  />
                ))}
              </Box>

              {/* Mensaje si la categoría está vacía */}
              {currentSkills.length === 0 && (
                <Box
                  sx={{
                    textAlign: "center",
                    py: 6,
                    color: tokens.color.text.muted,
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: tokens.font.mono,
                      fontSize: "0.85rem",
                    }}
                  >
                    // sin skills en esta categoría
                  </Typography>
                </Box>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </Container>
    </Box>
  );
};

export default SkillsSection;
