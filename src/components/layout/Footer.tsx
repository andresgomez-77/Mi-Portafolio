// src/components/layout/Footer.tsx
// ─────────────────────────────────────────────────────────────────────────────
// FOOTER — Cierre del portafolio
//
// Concepto nuevo:
//   → new Date().getFullYear() para el año dinámico
//   → window.scrollTo para volver arriba suavemente
//   → useState + useEffect para mostrar el botón al scrollear
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Divider,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { motion, AnimatePresence } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import { personalInfo } from "../../data/portfolioData";

// ── Links de navegación rápida ────────────────────────────────────────────────
const FOOTER_NAV = [
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Experiencia", href: "#experiencia" },
  { label: "Skills", href: "#skills" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Formación", href: "#formacion" },
  { label: "Contacto", href: "#contacto" },
];

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
const Footer = () => {
  // Mostrar botón "volver arriba" después de scrollear
  const [showBackTop, setShowBackTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  // Año actual dinámico — nunca hay que actualizarlo manualmente
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      aria-label="Pie de página"
      sx={{
        backgroundColor: tokens.color.bg.surface,
        position: "relative",
        // Línea decorativa superior
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: `linear-gradient(
            90deg,
            transparent 0%,
            ${tokens.color.amber[500]} 30%,
            ${tokens.color.coral[500]} 70%,
            transparent 100%
          )`,
        },
      }}
    >
      <Container maxWidth="xl">
        {/* ── CONTENIDO PRINCIPAL ─────────────────────────────────────────── */}
        <Box
          sx={{
            pt: { xs: 6, md: 8 },
            pb: { xs: 4, md: 5 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr 1fr" },
            gap: { xs: 5, md: 6 },
          }}
        >
          {/* ── COLUMNA 1: Logo + descripción ─────────────────────────────── */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Logo */}
            <Box
              component="a"
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleScrollTop();
              }}
              aria-label="Volver al inicio"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                width: "fit-content",
                "&:hover .logo-letters": {
                  color: tokens.color.amber[500],
                },
              }}
            >
              <Typography
                sx={{
                  fontFamily: tokens.font.mono,
                  fontSize: "1.3rem",
                  color: tokens.color.amber[500],
                  lineHeight: 1,
                }}
              >
                &lt;
              </Typography>
              <Typography
                className="logo-letters"
                sx={{
                  fontFamily: tokens.font.display,
                  fontSize: "1.4rem",
                  color: tokens.color.text.primary,
                  mx: "2px",
                  transition: `color ${tokens.transition.fast}`,
                  letterSpacing: "0.05em",
                }}
              >
                AG
              </Typography>
              <Typography
                sx={{
                  fontFamily: tokens.font.mono,
                  fontSize: "1.3rem",
                  color: tokens.color.amber[500],
                  lineHeight: 1,
                }}
              >
                /&gt;
              </Typography>
            </Box>

            {/* Tagline */}
            <Typography
              sx={{
                fontFamily: tokens.font.body,
                fontSize: "0.85rem",
                color: tokens.color.text.muted,
                lineHeight: 1.7,
                maxWidth: "280px",
              }}
            >
              Ingeniero Electrónico y Desarrollador Frontend construyendo
              interfaces que importan.
            </Typography>

            {/* Badge disponibilidad */}
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.8,
                px: 1.2,
                py: 0.5,
                width: "fit-content",
                borderRadius: tokens.radius.full,
                border: `1px solid ${alpha(tokens.color.amber[500], 0.25)}`,
                backgroundColor: alpha(tokens.color.amber[500], 0.05),
              }}
              aria-label="Disponible para trabajar"
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor: "#34D399",
                  boxShadow: "0 0 6px #34D399",
                  "@keyframes footerPulse": {
                    "0%, 100%": { opacity: 1 },
                    "50%": { opacity: 0.4 },
                  },
                  animation: "footerPulse 2s ease-in-out infinite",
                }}
                aria-hidden="true"
              />
              <Typography
                sx={{
                  fontFamily: tokens.font.mono,
                  fontSize: "0.65rem",
                  color: tokens.color.text.muted,
                  letterSpacing: "0.1em",
                }}
              >
                Disponible para trabajar
              </Typography>
            </Box>
          </Box>

          {/* ── COLUMNA 2: Navegación rápida ──────────────────────────────── */}
          <Box>
            <Typography
              sx={{
                fontFamily: tokens.font.mono,
                fontSize: "0.65rem",
                color: tokens.color.text.muted,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Navegación
            </Typography>

            <Box
              component="nav"
              aria-label="Navegación del footer"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {FOOTER_NAV.map((link) => (
                <Box
                  key={link.href}
                  component="a"
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  aria-label={`Ir a ${link.label}`}
                  sx={{
                    fontFamily: tokens.font.body,
                    fontSize: "0.85rem",
                    color: tokens.color.text.muted,
                    width: "fit-content",
                    position: "relative",
                    transition: `color ${tokens.transition.fast}`,
                    // Línea que se expande al hover
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      bottom: "-1px",
                      left: 0,
                      width: "0%",
                      height: "1px",
                      backgroundColor: tokens.color.amber[500],
                      transition: `width ${tokens.transition.normal}`,
                    },
                    "&:hover": {
                      color: tokens.color.amber[500],
                      "&::after": { width: "100%" },
                    },
                  }}
                >
                  {link.label}
                </Box>
              ))}
            </Box>
          </Box>

          {/* ── COLUMNA 3: Contacto ───────────────────────────────────────── */}
          <Box>
            <Typography
              sx={{
                fontFamily: tokens.font.mono,
                fontSize: "0.65rem",
                color: tokens.color.text.muted,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              Contacto
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
              {/* Email */}
              <Box
                component="a"
                href={`mailto:${personalInfo.email}`}
                aria-label={`Enviar email a ${personalInfo.email}`}
                sx={{
                  fontFamily: tokens.font.mono,
                  fontSize: "0.78rem",
                  color: tokens.color.text.muted,
                  transition: `color ${tokens.transition.fast}`,
                  "&:hover": { color: tokens.color.amber[500] },
                }}
              >
                {personalInfo.email}
              </Box>

              {/* Ubicación */}
              <Typography
                sx={{
                  fontFamily: tokens.font.mono,
                  fontSize: "0.78rem",
                  color: tokens.color.text.muted,
                }}
              >
                {personalInfo.location}
              </Typography>

              {/* Redes sociales */}
              <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                {[
                  {
                    label: "GitHub",
                    icon: <GitHubIcon fontSize="small" />,
                    href: personalInfo.github,
                  },
                  {
                    label: "LinkedIn",
                    icon: <LinkedInIcon fontSize="small" />,
                    href: personalInfo.linkedin,
                  },
                  {
                    label: "Email",
                    icon: <EmailIcon fontSize="small" />,
                    href: `mailto:${personalInfo.email}`,
                  },
                ].map((social) => (
                  <Tooltip
                    key={social.label}
                    title={social.label}
                    placement="top"
                    arrow
                  >
                    <IconButton
                      component="a"
                      href={social.href}
                      target={social.label !== "Email" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      size="small"
                      sx={{
                        border: `1px solid ${tokens.color.border.subtle}`,
                        borderRadius: tokens.radius.sm,
                        color: tokens.color.text.muted,
                        padding: "6px",
                        transition: `all ${tokens.transition.fast}`,
                        "&:hover": {
                          borderColor: tokens.color.amber[500],
                          color: tokens.color.amber[500],
                          backgroundColor: alpha(tokens.color.amber[500], 0.08),
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ── DIVIDER ─────────────────────────────────────────────────────── */}
        <Divider sx={{ borderColor: tokens.color.border.subtle }} />

        {/* ── COPYRIGHT ───────────────────────────────────────────────────── */}
        <Box
          sx={{
            py: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 0.8,
          }}
        >
          <Typography
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.72rem",
              color: tokens.color.text.muted,
            }}
          >
            © {currentYear}
          </Typography>

          <Typography
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.72rem",
              color: tokens.color.text.muted,
            }}
          >
            · Diseñado y desarrollado con
          </Typography>

          <FavoriteIcon
            sx={{
              fontSize: "0.75rem",
              color: tokens.color.coral[500],
              // Latido del corazón
              "@keyframes heartbeat": {
                "0%, 100%": { transform: "scale(1)" },
                "25%": { transform: "scale(1.3)" },
                "50%": { transform: "scale(1)" },
                "75%": { transform: "scale(1.15)" },
              },
              animation: "heartbeat 1.5s ease-in-out infinite",
            }}
            aria-label="amor"
          />

          <Typography
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.72rem",
              color: tokens.color.text.muted,
            }}
          >
            por{" "}
            <Box
              component="span"
              sx={{
                color: tokens.color.amber[500],
                fontWeight: 500,
              }}
            >
              Andrés Gómez
            </Box>
          </Typography>
        </Box>
      </Container>

      {/* ── BOTÓN VOLVER ARRIBA ──────────────────────────────────────────────── */}
      {/*
        AnimatePresence anima la entrada y salida del botón.
        Aparece cuando el usuario ha scrolleado más de 400px.
      */}
      <AnimatePresence>
        {showBackTop && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              position: "fixed",
              bottom: "2rem",
              right: "2rem",
              zIndex: 999,
            }}
          >
            <Tooltip title="Volver arriba" placement="left" arrow>
              <IconButton
                onClick={handleScrollTop}
                aria-label="Volver al inicio de la página"
                sx={{
                  width: "44px",
                  height: "44px",
                  backgroundColor: tokens.color.amber[500],
                  color: tokens.color.text.inverse,
                  borderRadius: tokens.radius.sm,
                  boxShadow: tokens.shadow.glowStrong,
                  transition: `all ${tokens.transition.normal}`,
                  "&:hover": {
                    backgroundColor: tokens.color.amber[400],
                    transform: "translateY(-4px)",
                    boxShadow: tokens.shadow.glowStrong,
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${tokens.color.amber[500]}`,
                    outlineOffset: "3px",
                  },
                }}
              >
                <KeyboardArrowUpIcon />
              </IconButton>
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

export default Footer;
