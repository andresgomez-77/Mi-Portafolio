// src/components/sections/EducationSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION SECTION — Timeline de formación académica
// ─────────────────────────────────────────────────────────────────────────────

import { Box, Container, Typography, Paper } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { motion, type Variants } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import SectionHeader from "../ui/SectionHeader";
import useInView from "../../hooks/useInView";
import type { Education } from "../../types";
import { useEffect, useState } from "react";
import { educationApi } from "../../services/api";
import { educationFallback } from "../../data/portfolioData";

// ── Logos de instituciones ────────────────────────────────────────────────────
// Mapeamos el nombre de institución a su logo
// Si no hay logo, mostramos el ícono de MUI
const INSTITUTION_LOGOS: Record<string, string> = {
  SENA: "/assets/img/sena_logo.webp",
  UTS: "/assets/img/uts_logo.webp",
  "UTS — Universidad de Tecnología y Sociedad": "/assets/img/uts_logo.webp",
  Crehana: "/assets/img/crehana_logo.webp",
  "Oracle + Alura Latam": "/assets/img/alura_logo.webp",
};

// ── VARIANTES ─────────────────────────────────────────────────────────────────
const fadeUpVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Item de la timeline: entra desde el lado que le corresponde
const itemVariants = (isLeft: boolean): Variants => ({
  hidden: { x: isLeft ? -40 : 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
  },
});

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
const EducationSection = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    educationApi
      .getAll()
      .then((data) => setEducation(data))
      .catch(() => setEducation(educationFallback))
      .finally(() => setLoading(false));
  }, []);
  return (
    <Box
      component="section"
      id="formacion"
      aria-label="Sección de formación académica"
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
          {/* ── HEADER ────────────────────────────────────────────────────── */}
          <motion.div variants={fadeUpVariants}>
            <SectionHeader tag="05. Formación" title="Mi camino académico" />
          </motion.div>

          {/* ── TIMELINE ──────────────────────────────────────────────────── */}
          <Box
            sx={{
              position: "relative",
              // Línea vertical central
              "&::before": {
                content: '""',
                position: "absolute",
                // En mobile va a la izquierda, en desktop al centro
                left: { xs: "20px", md: "50%" },
                top: "24px",
                bottom: "24px",
                width: "1px",
                transform: { md: "translateX(-50%)" },
                background: `linear-gradient(
                  to bottom,
                  transparent,
                  ${tokens.color.amber[500]} 10%,
                  ${alpha(tokens.color.amber[500], 0.3)} 80%,
                  transparent
                )`,
              },
            }}
          >
            {education.map((item, idx) => {
              // Alternar izquierda/derecha en desktop
              const isLeft = idx % 2 === 0;
              return (
                <EducationItem
                  key={item._id}
                  item={item}
                  index={idx}
                  isLeft={isLeft}
                  inView={inView}
                />
              );
            })}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

// ── SUBCOMPONENTE: Item de timeline ───────────────────────────────────────────
interface EducationItemProps {
  item: Education;
  index: number;
  isLeft: boolean;
  inView: boolean;
}

const EducationItem = ({ item, index, isLeft, inView }: EducationItemProps) => {
  const logoSrc = INSTITUTION_LOGOS[item.institution];

  return (
    <motion.div
      variants={itemVariants(isLeft)}
      transition={{ delay: index * 0.12 }}
    >
      <Box
        sx={{
          display: "grid",
          // Mobile: punto izq + contenido der
          // Desktop: contenido | punto | contenido (alternado)
          gridTemplateColumns: { xs: "44px 1fr", md: "1fr 44px 1fr" },
          gap: { xs: 2, md: 3 },
          mb: { xs: 3, md: 4 },
          alignItems: "start",
        }}
      >
        {/* ── LADO IZQUIERDO (solo desktop) ─────────────────────────────── */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            justifyContent: "flex-end", pr: 2
          }}
        >
          {isLeft && (
            <EducationCard
              item={item}
              logoSrc={logoSrc}
              inView={inView}
              index={index}
            />
          )}
        </Box>

        {/* ── PUNTO CENTRAL ─────────────────────────────────────────────── */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            pt: "2px",
          }}
        >
          {/* Ícono en el punto */}
          <Box
            sx={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: item.current
                ? tokens.color.amber[500]
                : tokens.color.bg.raised,
              border: `2px solid ${
                item.current
                  ? tokens.color.amber[500]
                  : tokens.color.border.default
              }`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: item.current ? tokens.shadow.glow : "none",
              flexShrink: 0,
              transition: `all ${tokens.transition.normal}`,
              // Pulso para el item actual
              ...(item.current && {
                "@keyframes eduPulse": {
                  "0%, 100%": {
                    boxShadow: `0 0 0 0 ${alpha(tokens.color.amber[500], 0.4)}`,
                  },
                  "50%": {
                    boxShadow: `0 0 0 8px ${alpha(tokens.color.amber[500], 0)}`,
                  },
                },
                animation: "eduPulse 2s ease-in-out infinite",
              }),
            }}
            aria-hidden="true"
          >
            {/* Ícono diferente según tipo: académico o curso online */}
            {item.type === "academic" ? (
              <SchoolIcon
                sx={{
                  fontSize: "1.1rem",
                  color: item.current
                    ? tokens.color.text.inverse
                    : tokens.color.text.muted,
                }}
              />
            ) : (
              <LaptopMacIcon
                sx={{
                  fontSize: "1.1rem",
                  color: item.current
                    ? tokens.color.text.inverse
                    : tokens.color.text.muted,
                }}
              />
            )}
          </Box>

          {/* Fecha debajo del punto — solo mobile */}
          <Typography
            sx={{
              display: { xs: "block", md: "none" },
              fontFamily: tokens.font.mono,
              fontSize: "0.62rem",
              color: tokens.color.text.muted,
              letterSpacing: "0.05em",
              mt: 0.8,
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            {item.date}
          </Typography>
        </Box>

        {/* ── LADO DERECHO ──────────────────────────────────────────────── */}
        <Box>
          {/* Mobile: siempre muestra la card aquí */}
          <Box sx={{ display: { xs: "block", md: "none" }}}>
            <EducationCard
              item={item}
              logoSrc={logoSrc}
              inView={inView}
              index={index}
            />
          </Box>

          {/* Desktop: solo si es item derecho (isLeft = false) */}
          <Box sx={{ display: { xs: "none", md: "block" }, pl: 2 }}>
            {!isLeft && (
              <EducationCard
                item={item}
                logoSrc={logoSrc}
                inView={inView}
                index={index}
              />
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

// ── SUBCOMPONENTE: Card de educación ──────────────────────────────────────────
interface EducationCardProps {
  item: Education;
  logoSrc: string | undefined;
  inView: boolean;
  index: number;
}

const EducationCard = ({ item, logoSrc }: EducationCardProps) => (
  <Paper
    elevation={0}
    component="article"
    aria-label={`${item.title} — ${item.institution}`}
    sx={{
      p: { xs: 2, md: 2.5 },
      borderRadius: tokens.radius.lg,
      backgroundColor: tokens.color.bg.surface,
      border: `1px solid ${
        item.current
          ? alpha(tokens.color.amber[500], 0.2)
          : tokens.color.border.subtle
      }`,
      transition: `all ${tokens.transition.normal}`,
      maxWidth: { md: "420px" },
      // Cards izquierdas se alinean a la derecha en desktop
      width: "100%",
      "&:hover": {
        borderColor: alpha(tokens.color.amber[500], 0.35),
        boxShadow: tokens.shadow.glow,
        transform: "translateY(-3px)",
      },
    }}
  >
    {/* ── HEADER ──────────────────────────────────────────────────────────── */}
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 1.5,
        gap: 1,
      }}
    >
      <Box sx={{ flex: 1 }}>
        {/* Badge "En curso" */}
        {item.current && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              px: 1,
              py: 0.3,
              mb: 0.8,
              borderRadius: tokens.radius.full,
              backgroundColor: alpha(tokens.color.amber[500], 0.1),
              border: `1px solid ${alpha(tokens.color.amber[500], 0.3)}`,
            }}
            aria-label="Formación en curso"
          >
            <Box
              sx={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                backgroundColor: tokens.color.amber[500],
                "@keyframes dotPulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.3 },
                },
                animation: "dotPulse 1.5s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <Typography
              sx={{
                fontFamily: tokens.font.mono,
                fontSize: "0.6rem",
                color: tokens.color.amber[500],
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              En curso
            </Typography>
          </Box>
        )}

        {/* Título del programa */}
        <Typography
          variant="h4"
          component="h3"
          sx={{
            fontSize: { xs: "0.9rem", md: "0.95rem" },
            fontWeight: 600,
            color: tokens.color.text.primary,
            lineHeight: 1.3,
            mb: 0.5,
          }}
        >
          {item.title}
        </Typography>

        {/* Institución */}
        <Typography
          sx={{
            fontFamily: tokens.font.body,
            fontSize: "0.8rem",
            color: tokens.color.amber[500],
            fontWeight: 500,
          }}
        >
          {item.institution}
        </Typography>
      </Box>

      {/* Logo de la institución o ícono fallback */}
      <Box
        sx={{
          width: "44px",
          height: "44px",
          borderRadius: tokens.radius.sm,
          overflow: "hidden",
          border: `1px solid ${tokens.color.border.subtle}`,
          backgroundColor: tokens.color.bg.raised,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {logoSrc ? (
          <Box
            component="img"
            src={logoSrc}
            alt={`Logo de ${item.institution}`}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              p: "4px",
            }}
          />
        ) : // Fallback si no hay logo
        item.type === "academic" ? (
          <SchoolIcon
            sx={{ fontSize: "1.2rem", color: tokens.color.text.muted }}
          />
        ) : (
          <LaptopMacIcon
            sx={{ fontSize: "1.2rem", color: tokens.color.text.muted }}
          />
        )}
      </Box>
    </Box>

    {/* Divisor */}
    <Box
      sx={{
        height: "1px",
        backgroundColor: tokens.color.border.subtle,
        mb: 1.5,
      }}
      aria-hidden="true"
    />

    {/* Descripción */}
    <Typography
      sx={{
        fontFamily: tokens.font.body,
        fontSize: "0.82rem",
        color: tokens.color.text.secondary,
        lineHeight: 1.7,
        mb: 1.5,
      }}
    >
      {item.description}
    </Typography>

    {/* Fecha — solo desktop (en mobile va bajo el punto) */}
    <Box
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <CalendarTodayIcon
        sx={{ fontSize: "0.75rem", color: tokens.color.text.muted }}
        aria-hidden="true"
      />
      <Typography
        sx={{
          fontFamily: tokens.font.mono,
          fontSize: "0.7rem",
          color: tokens.color.text.muted,
          letterSpacing: "0.05em",
        }}
      >
        {item.date}
      </Typography>
    </Box>
  </Paper>
);

export default EducationSection;
