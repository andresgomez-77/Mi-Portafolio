// src/components/sections/AboutSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// ABOUT SECTION
//
// Layout: foto izquierda / texto + stats derecha
// Animaciones: fade + slide al entrar al viewport
// ─────────────────────────────────────────────────────────────────────────────

import { Box, Container, Typography, Chip, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import { motion, type Variants } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import { personalInfo } from "../../data/portfolioData";
import useInView from "../../hooks/useInView";
import StatCard from "../ui/StatCard";

// ── Tecnologías principales a mostrar como chips ──────────────────────────────
// Separado del portfolioData porque son solo las "highlight skills"
// que quieres mostrar en el About, no todas
const HIGHLIGHT_SKILLS = [
  "React",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "Git",
  "APIs REST",
  "Scrum",
];

// ── VARIANTES ─────────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const slideLeftVariants: Variants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideRightVariants: Variants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fadeUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
const AboutSection = () => {
  // useInView: detecta cuando la sección entra al viewport
  // Le pasamos el tipo HTMLElement que esperamos (div en este caso)
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box
      component="section"
      id="sobre-mi"
      aria-label="Sección sobre mí"
      ref={ref} // ← conectamos el ref al elemento raíz de la sección
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: tokens.color.bg.base,
        position: "relative",
        // Línea decorativa superior
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
          variants={containerVariants}
          initial="hidden"
          // animate se activa cuando inView cambia a true
          animate={inView ? "visible" : "hidden"}
        >
          {/* ── HEADER DE SECCIÓN ───────────────────────────────────────────── */}
          <motion.div variants={fadeUpVariants}>
            <SectionHeader tag="01. Sobre mí" title="¿Quién soy?" />
          </motion.div>

          {/* ── GRID PRINCIPAL ──────────────────────────────────────────────── */}
          <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
            {/* ── COLUMNA FOTO ──────────────────────────────────────────────── */}
            <Grid size={{ xs: 12, md: 5 }}>
              <motion.div variants={slideLeftVariants}>
                <PhotoBlock />
              </motion.div>
            </Grid>

            {/* ── COLUMNA TEXTO ─────────────────────────────────────────────── */}
            <Grid size={{ xs: 12, md: 7 }}>
              <motion.div variants={slideRightVariants}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  {/* Metadata: ubicación y rol actual */}
                  <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <LocationOnIcon
                        sx={{
                          fontSize: "0.9rem",
                          color: tokens.color.amber[500],
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: tokens.font.mono,
                          fontSize: "0.78rem",
                          color: tokens.color.text.muted,
                        }}
                      >
                        {personalInfo.location}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                      }}
                    >
                      <WorkIcon
                        sx={{
                          fontSize: "0.9rem",
                          color: tokens.color.amber[500],
                        }}
                      />
                      <Typography
                        sx={{
                          fontFamily: tokens.font.mono,
                          fontSize: "0.78rem",
                          color: tokens.color.text.muted,
                        }}
                      >
                        ActionTracker Solutions SL
                      </Typography>
                    </Box>
                  </Box>

                  {/* Descripción */}
                  <Typography
                    variant="body1"
                    sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                  >
                    {personalInfo.description}
                  </Typography>

                  {/* ── STATS ─────────────────────────────────────────────── */}
                  <Grid container spacing={2}>
                    {[
                      { value: 6, suffix: "+", label: "Proyectos", delay: 0 },
                      { value: 2, suffix: "+", label: "Años dev", delay: 100 },
                      {
                        value: null,
                        symbol: "∞",
                        label: "Curiosidad",
                        delay: 200,
                      },
                    ].map((stat) => (
                      <Grid key={stat.label} size={{ xs: 4 }}>
                        <StatCard
                          value={stat.value}
                          suffix={stat.suffix}
                          symbol={stat.symbol}
                          label={stat.label}
                          trigger={inView}
                          delay={stat.delay}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  {/* ── CHIPS DE SKILLS HIGHLIGHT ─────────────────────────── */}
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: tokens.font.mono,
                        fontSize: "0.7rem",
                        color: tokens.color.text.muted,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        mb: 1.5,
                      }}
                    >
                      Stack principal
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                      role="list"
                      aria-label="Tecnologías principales"
                    >
                      {HIGHLIGHT_SKILLS.map((skill, idx) => (
                        <motion.div
                          key={skill}
                          role="listitem"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={
                            inView
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0.8 }
                          }
                          transition={{
                            delay: 0.4 + idx * 0.05,
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        >
                          <Chip
                            label={skill}
                            size="small"
                            aria-label={`Tecnología: ${skill}`}
                          />
                        </motion.div>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </Box>
  );
};

// ── SUBCOMPONENTE: Header de sección ─────────────────────────────────────────
// Lo reutilizaremos en TODAS las secciones — misma estructura, diferente texto
// Lo ponemos aquí temporalmente, luego lo moveremos a ui/SectionHeader.tsx

interface SectionHeaderProps {
  tag: string; // ej: "01. Sobre mí"
  title: string; // ej: "¿Quién soy?"
  centered?: boolean;
}

export const SectionHeader = ({
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

    {/* Título grande */}
    <Typography
      variant="h2"
      component="h2"
      sx={{
        color: tokens.color.text.primary,
        position: "relative",
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

// ── SUBCOMPONENTE: Bloque de foto ─────────────────────────────────────────────
const PhotoBlock = () => (
  <Box
    sx={{
      position: "relative",
      maxWidth: { xs: "280px", md: "360px" },
      mx: { xs: "auto", md: 0 },
    }}
  >
    {/* Marco decorativo desplazado — se crea con ::before del wrapper */}
    <Box
      sx={{
        position: "relative",
        // El marco es un pseudo-elemento del Box
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          borderRadius: tokens.radius.lg,
          border: `2px solid ${tokens.color.amber[500]}`,
          transform: "translate(12px, 12px)",
          transition: `transform ${tokens.transition.normal}`,
          zIndex: 0,
        },
        "&:hover::before": {
          transform: "translate(6px, 6px)",
        },
      }}
    >
      {/* Contenedor de la imagen */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          borderRadius: tokens.radius.lg,
          overflow: "hidden",
          // Overlay sutil sobre la imagen
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `linear-gradient(
              135deg,
              ${alpha(tokens.color.amber[500], 0.08)} 0%,
              transparent 50%
            )`,
            transition: `opacity ${tokens.transition.normal}`,
          },
          "&:hover::after": {
            opacity: 0,
          },
          "&:hover img": {
            transform: "scale(1.03)",
            filter: "grayscale(0%)",
          },
        }}
      >
        <Box
          component="img"
          src={personalInfo.photo}
          alt="Foto de Andrés Felipe Gómez Pinzón"
          loading="lazy"
          sx={{
            width: "100%",
            height: { xs: "320px", md: "420px" },
            objectFit: "cover",
            objectPosition: "top center",
            display: "block",
            // Empieza con un toque de grayscale para efecto editorial
            filter: "grayscale(15%)",
            transition: `all ${tokens.transition.slow}`,
          }}
        />
      </Box>
    </Box>

    {/* Badge flotante — "2+ años dev" */}
    <Box
      sx={{
        position: "absolute",
        bottom: "-16px",
        right: "-16px",
        zIndex: 2,
        px: 2,
        py: 1.5,
        borderRadius: tokens.radius.md,
        backgroundColor: tokens.color.amber[500],
        boxShadow: tokens.shadow.glowStrong,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "80px",
      }}
      aria-label="2 o más años en desarrollo"
    >
      <Typography
        sx={{
          fontFamily: tokens.font.display,
          fontSize: "1.8rem",
          lineHeight: 1,
          color: tokens.color.text.inverse,
          fontWeight: 400,
        }}
      >
        2+
      </Typography>
      <Typography
        sx={{
          fontFamily: tokens.font.mono,
          fontSize: "0.6rem",
          color: alpha(tokens.color.text.inverse, 0.8),
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          lineHeight: 1.3,
          textAlign: "center",
        }}
      >
        años
        <br />
        dev
      </Typography>
    </Box>
  </Box>
);

export default AboutSection;
