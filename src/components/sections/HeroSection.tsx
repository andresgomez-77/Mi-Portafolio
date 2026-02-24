// src/components/sections/HeroSection.tsx

import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { motion, type Variants } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import { personalInfo } from "../../data/portfolioData";
import useTypewriter from "../../hooks/useTypewriter";
import TerminalWidget from "../ui/TerminalWidget";
import VisitorCounter from "../ui/VisitorCounter";

// ── VARIANTES ─────────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const titleVariants: Variants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: 0.4,
    },
  },
};

// ── MINI STATS ────────────────────────────────────────────────────────────────
const MINI_STATS = [
  { value: "6+", label: "Proyectos" },
  { value: "2+", label: "Años dev" },
  { value: "∞", label: "Curiosidad" },
];

// ── COMPONENTE ────────────────────────────────────────────────────────────────
const HeroSection = () => {
  const { displayText, isTyping } = useTypewriter({
    words: personalInfo.roles,
    typeSpeed: 75,
    deleteSpeed: 45,
    pauseTime: 2200,
  });

  const scrollTo = (id: string) =>
    document
      .querySelector(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Box
      component="section"
      id="inicio"
      aria-label="Sección de inicio"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <HeroBackground />

      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/*
            LAYOUT:
            - Desktop: dos columnas con gap fijo. La derecha tiene width fijo
              para que no se estire dejando espacio vacío.
            - Mobile: una columna.
          */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "1fr auto" },
              gap: { xs: 6, lg: "80px" },
              alignItems: "center",
              py: { xs: 4, md: 6 },
              minHeight: "calc(100vh - 80px)", // ocupa exactamente lo que hay sin navbar
            }}
          >
            {/* ── IZQUIERDA ─────────────────────────────────────────────── */}
            <Box sx={{ maxWidth: { lg: "580px" } }}>
              {/* Badge */}
              <motion.div variants={fadeUpVariants}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.5,
                    py: 0.6,
                    mb: 2.5,
                    borderRadius: tokens.radius.full,
                    border: `1px solid ${alpha(tokens.color.amber[500], 0.3)}`,
                    backgroundColor: alpha(tokens.color.amber[500], 0.06),
                  }}
                >
                  <Box
                    sx={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      backgroundColor: "#34D399",
                      boxShadow: "0 0 6px #34D399",
                      "@keyframes pulse": {
                        "0%, 100%": { opacity: 1, transform: "scale(1)" },
                        "50%": { opacity: 0.5, transform: "scale(0.8)" },
                      },
                      animation: "pulse 2s ease-in-out infinite",
                    }}
                    aria-hidden="true"
                  />
                  <Typography
                    sx={{
                      fontFamily: tokens.font.mono,
                      fontSize: "0.7rem",
                      color: tokens.color.text.secondary,
                      letterSpacing: "0.1em",
                    }}
                  >
                    Disponible para trabajar
                  </Typography>
                </Box>
              </motion.div>

              {/* Greeting */}
              <motion.div variants={fadeUpVariants}>
                <Typography
                  sx={{
                    fontFamily: tokens.font.mono,
                    fontSize: { xs: "0.75rem", md: "0.85rem" },
                    color: tokens.color.text.muted,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    mb: 0.5,
                  }}
                >
                  Hola, soy
                </Typography>
              </motion.div>

              {/* Nombre */}
              <Box sx={{ overflow: "hidden" }}>
                <motion.div variants={titleVariants}>
                  <Typography
                    variant="h1"
                    component="h1"
                    sx={{
                      fontSize: {
                        xs: "clamp(3rem, 12vw, 5rem)",
                        md: "clamp(4rem, 9vw, 7.5rem)",
                      },
                      lineHeight: 0.9,
                      color: tokens.color.text.primary,
                      ml: { lg: "-0.03em" },
                    }}
                  >
                    {personalInfo.name}
                  </Typography>
                </motion.div>
              </Box>

              {/* Apellido outline */}
              <Box sx={{ overflow: "hidden" }}>
                <motion.div variants={titleVariants}>
                  <Typography
                    variant="h1"
                    component="span"
                    sx={{
                      fontSize: {
                        xs: "clamp(3rem, 12vw, 5rem)",
                        md: "clamp(4rem, 9vw, 7.5rem)",
                      },
                      lineHeight: 0.9,
                      color: "transparent",
                      WebkitTextStroke: `1.5px ${alpha(tokens.color.amber[500], 0.6)}`,
                      display: "block",
                      mb: 2.5,
                    }}
                  >
                    {personalInfo.lastName}
                  </Typography>
                </motion.div>
              </Box>

              {/* Línea */}
              <motion.div variants={lineVariants} style={{ originX: 0 }}>
                <Box
                  sx={{
                    width: { xs: "60px", md: "100px" },
                    height: "2px",
                    background: `linear-gradient(90deg, ${tokens.color.amber[500]}, transparent)`,
                    mb: 2.5,
                  }}
                  aria-hidden="true"
                />
              </motion.div>

              {/* Typewriter */}
              <motion.div variants={fadeUpVariants}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mb: 2.5,
                    minHeight: "1.8rem",
                  }}
                  aria-live="polite"
                  aria-label={`Rol: ${displayText}`}
                >
                  <Typography
                    sx={{
                      fontFamily: tokens.font.mono,
                      fontSize: { xs: "0.95rem", md: "1.1rem" },
                      color: tokens.color.amber[500],
                    }}
                    aria-hidden="true"
                  >
                    _
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: tokens.font.mono,
                      fontSize: { xs: "0.95rem", md: "1.1rem" },
                      color: tokens.color.text.secondary,
                    }}
                  >
                    {displayText}
                  </Typography>
                  <Box
                    sx={{
                      width: "2px",
                      height: "1.1em",
                      backgroundColor: tokens.color.amber[500],
                      ml: "1px",
                      "@keyframes blink": {
                        "0%, 100%": { opacity: 1 },
                        "50%": { opacity: 0 },
                      },
                      animation: !isTyping
                        ? "blink 1s step-end infinite"
                        : "none",
                    }}
                    aria-hidden="true"
                  />
                </Box>
              </motion.div>

              {/* Descripción */}
              <motion.div variants={fadeUpVariants}>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 2.5,
                    fontSize: { xs: "0.88rem", md: "0.96rem" },
                    lineHeight: 1.75,
                  }}
                >
                  {personalInfo.description}
                </Typography>
              </motion.div>

              {/* Contador de visitas */}
              <motion.div variants={fadeUpVariants}>
                <Box sx={{ mb: 3 }}>
                  <VisitorCounter />
                </Box>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUpVariants}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 3 }}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowForwardIcon />}
                    onClick={() => scrollTo("#proyectos")}
                    aria-label="Ver proyectos"
                  >
                    Ver proyectos
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => scrollTo("#contacto")}
                    aria-label="Contacto"
                  >
                    Contáctame
                  </Button>
                </Box>
              </motion.div>

              {/* Redes */}
              <motion.div variants={fadeUpVariants}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box
                    sx={{
                      width: "28px",
                      height: "1px",
                      backgroundColor: tokens.color.border.strong,
                    }}
                    aria-hidden="true"
                  />
                  {[
                    {
                      href: personalInfo.github,
                      icon: <GitHubIcon fontSize="small" />,
                      label: "GitHub",
                    },
                    {
                      href: personalInfo.linkedin,
                      icon: <LinkedInIcon fontSize="small" />,
                      label: "LinkedIn",
                    },
                    {
                      href: `mailto:${personalInfo.email}`,
                      icon: <EmailIcon fontSize="small" />,
                      label: "Email",
                    },
                  ].map((s) => (
                    <Tooltip
                      key={s.label}
                      title={s.label}
                      placement="top"
                      arrow
                    >
                      <IconButton
                        component="a"
                        href={s.href}
                        target={s.label !== "Email" ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        size="small"
                        sx={{
                          border: `1px solid ${tokens.color.border.default}`,
                          borderRadius: tokens.radius.sm,
                          padding: "7px",
                          transition: `all ${tokens.transition.normal}`,
                          "&:hover": {
                            borderColor: tokens.color.amber[500],
                            color: tokens.color.amber[500],
                            backgroundColor: alpha(
                              tokens.color.amber[500],
                              0.08,
                            ),
                            transform: "translateY(-3px)",
                            boxShadow: tokens.shadow.glow,
                          },
                        }}
                      >
                        {s.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </motion.div>
            </Box>

            {/* ── DERECHA: Terminal + Stats — solo desktop ──────────────── */}
            {/*
              "auto" en gridTemplateColumns hace que esta columna tome
              exactamente el ancho de su contenido — sin espacio vacío.
            */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                flexDirection: "column",
                gap: 2,
                width: "360px", // ancho fijo — terminal siempre igual
                flexShrink: 0,
              }}
            >
              {/* Terminal */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.6,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1] as const,
                }}
              >
                <TerminalWidget />
              </motion.div>

              {/* Mini stats en fila */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 1.5,
                }}
              >
                {MINI_STATS.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 1.2 + idx * 0.1,
                      duration: 0.5,
                      ease: "easeOut",
                    }}
                  >
                    <Box
                      sx={{
                        p: "14px 10px",
                        borderRadius: tokens.radius.md,
                        border: `1px solid ${tokens.color.border.subtle}`,
                        backgroundColor: "#0D1117", // mismo fondo que la terminal
                        textAlign: "center",
                        transition: `all ${tokens.transition.normal}`,
                        "&:hover": {
                          borderColor: alpha(tokens.color.amber[500], 0.4),
                          boxShadow: tokens.shadow.glow,
                          transform: "translateY(-3px)",
                        },
                      }}
                    >
                      <Typography
                        sx={{
                          fontFamily: tokens.font.display,
                          fontSize: "1.6rem",
                          lineHeight: 1,
                          color: tokens.color.amber[500],
                          mb: 0.3,
                        }}
                      >
                        {stat.value}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: tokens.font.mono,
                          fontSize: "0.55rem",
                          color: tokens.color.text.muted,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }}
                      >
                        {stat.label}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <Box
        sx={{
          position: "absolute",
          bottom: "1.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0.4,
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <Box
            component="button"
            onClick={() => scrollTo("#sobre-mi")}
            aria-label="Ir a la siguiente sección"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") scrollTo("#sobre-mi");
            }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0.4,
              background: "none",
              border: "none",
              cursor: "pointer",
              color: tokens.color.text.muted,
              p: 0,
              "@keyframes bounce": {
                "0%, 100%": { transform: "translateY(0)" },
                "50%": { transform: "translateY(5px)" },
              },
              "& .arr": { animation: "bounce 2s ease-in-out infinite" },
              "&:hover": { color: tokens.color.amber[500] },
            }}
          >
            <Typography
              sx={{
                fontFamily: tokens.font.mono,
                fontSize: "0.58rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              scroll
            </Typography>
            <KeyboardArrowDownIcon
              className="arr"
              sx={{ fontSize: "1.1rem" }}
            />
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

// ── FONDO ─────────────────────────────────────────────────────────────────────
const HeroBackground = () => (
  <Box
    aria-hidden="true"
    sx={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}
  >
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        backgroundImage: `radial-gradient(circle, ${alpha(tokens.color.amber[500], 0.07)} 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
        "@keyframes gridDrift": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(40px)" },
        },
        animation: "gridDrift 8s linear infinite",
      }}
    />
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        background: `
        radial-gradient(ellipse 70% 60% at 15% 50%, ${alpha(tokens.color.amber[500], 0.05)} 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 85% 75%, ${alpha(tokens.color.coral[500], 0.03)} 0%, transparent 50%)
      `,
      }}
    />
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "25%",
        background: `linear-gradient(to bottom, transparent, ${tokens.color.bg.base})`,
      }}
    />
  </Box>
);

export default HeroSection;
