import { Box, Container, Typography, Chip, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BusinessIcon from "@mui/icons-material/Business";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { motion, type Variants } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import { experiences } from "../../data/portfolioData";
import type { Experience } from "../../data/portfolioData";
import SectionHeader from "../ui/SectionHeader";
import useInView from "../../hooks/useInView";

const COMPANY_TECH: Record<string, string[]> = {
  "ActionTracker Solutions SL": [
    "React",
    "TypeScript",
    "JavaScript",
    "PostgreSQL",
    "PostGIS",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "Rancher",
    "Git",
    "Scrum",
    "APIs REST",
    "Linux",
  ],
};

// ── VARIANTES ─────────────────────────────────────────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};

const fadeUpVariants: Variants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const slideVariants: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
const ExperienceSection = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  return (
    <Box
      component="section"
      id="experiencia"
      aria-label="Sección de experiencia profesional"
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
          background: `linear-gradient(90deg, transparent, ${tokens.color.border.default}, transparent)`,
        },
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUpVariants}>
            <SectionHeader
              tag="02. Experiencia"
              title="Experiencia profesional"
            />
          </motion.div>

          {/* Línea vertical de la timeline */}
          <Box
            sx={{
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                left: { xs: "20px", md: "50%" },
                top: 0,
                bottom: 0,
                width: "1px",
                transform: { md: "translateX(-50%)" },
                background: `linear-gradient(to bottom, transparent, ${tokens.color.amber[500]}, ${alpha(tokens.color.amber[500], 0.2)}, transparent)`,
              },
            }}
          >
            {experiences.map((experience, idx) => (
              <ExperienceItem
                key={experience.id}
                experience={experience}
                index={idx}
                inView={inView}
                isLeft={idx % 2 === 0}
              />
            ))}
          </Box>

          {experiences.length === 0 && (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography
                sx={{
                  fontFamily: tokens.font.mono,
                  fontSize: "0.85rem",
                  color: tokens.color.text.muted,
                }}
              >
                // próximamente...
              </Typography>
            </Box>
          )}
        </motion.div>
      </Container>
    </Box>
  );
};

// ── SUBCOMPONENTE: Punto de la timeline ───────────────────────────────────────
const TimelineDot = ({ experience }: { experience: Experience }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      pt: "2px",
      flexShrink: 0,
    }}
  >
    <Box
      aria-hidden="true"
      sx={{
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: experience.current
          ? tokens.color.amber[500]
          : tokens.color.bg.raised,
        border: `2px solid ${experience.current ? tokens.color.amber[500] : tokens.color.border.default}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: experience.current ? tokens.shadow.glow : "none",
        ...(experience.current && {
          "@keyframes timelinePulse": {
            "0%, 100%": {
              boxShadow: `0 0 0 0 ${alpha(tokens.color.amber[500], 0.4)}`,
            },
            "50%": {
              boxShadow: `0 0 0 8px ${alpha(tokens.color.amber[500], 0)}`,
            },
          },
          animation: "timelinePulse 2s ease-in-out infinite",
        }),
      }}
    >
      <FiberManualRecordIcon
        sx={{
          fontSize: "0.7rem",
          color: experience.current
            ? tokens.color.text.inverse
            : tokens.color.text.muted,
        }}
      />
    </Box>
  </Box>
);

// ── SUBCOMPONENTE: Item de la timeline ────────────────────────────────────────
// FIX: separamos desktop y mobile en dos grids independientes.
// Antes el mismo Box aparecía en ambas columnas porque la lógica
// de display/gridColumn se pisaba.
interface ExperienceItemProps {
  experience: Experience;
  index: number;
  inView: boolean;
  isLeft: boolean;
}

const ExperienceItem = ({
  experience,
  index,
  inView,
  isLeft,
}: ExperienceItemProps) => {
  const techStack = COMPANY_TECH[experience.company] ?? [];

  return (
    <motion.div variants={slideVariants} transition={{ delay: index * 0.15 }}>
      {/* ── DESKTOP: 3 columnas, card alterna izq/der ─────────────────────── */}
      <Box
        sx={{
          display: { xs: "none", md: "grid" },
          gridTemplateColumns: "1fr 44px 1fr",
          gap: 4,
          mb: 6,
          alignItems: "start",
        }}
      >
        {/* Columna izquierda — solo si isLeft */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {isLeft && (
            <ExperienceCard
              experience={experience}
              techStack={techStack}
              inView={inView}
              index={index}
            />
          )}
        </Box>

        {/* Punto central */}
        <TimelineDot experience={experience} />

        {/* Columna derecha — solo si !isLeft */}
        <Box>
          {!isLeft && (
            <ExperienceCard
              experience={experience}
              techStack={techStack}
              inView={inView}
              index={index}
            />
          )}
        </Box>
      </Box>

      {/* ── MOBILE: 2 columnas, punto izq + card der ─────────────────────── */}
      <Box
        sx={{
          display: { xs: "grid", md: "none" },
          gridTemplateColumns: "44px 1fr",
          gap: 2,
          mb: 4,
          alignItems: "start",
        }}
      >
        <TimelineDot experience={experience} />
        <ExperienceCard
          experience={experience}
          techStack={techStack}
          inView={inView}
          index={index}
        />
      </Box>
    </motion.div>
  );
};

// ── SUBCOMPONENTE: Card ───────────────────────────────────────────────────────
interface ExperienceCardProps {
  experience: Experience;
  techStack: string[];
  inView: boolean;
  index: number;
}

const ExperienceCard = ({
  experience,
  techStack,
  inView,
  index,
}: ExperienceCardProps) => (
  <Paper
    elevation={0}
    component="article"
    aria-label={`Experiencia en ${experience.company}`}
    sx={{
      p: { xs: 2.5, md: 3 },
      width: "100%",
      borderRadius: tokens.radius.lg,
      backgroundColor: tokens.color.bg.surface,
      border: `1px solid ${tokens.color.border.subtle}`,
      transition: `all ${tokens.transition.normal}`,
      "&:hover": {
        borderColor: alpha(tokens.color.amber[500], 0.3),
        boxShadow: tokens.shadow.glow,
        transform: "translateY(-4px)",
      },
    }}
  >
    {/* Header */}
    <Box sx={{ mb: 2.5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 1,
          mb: 1.5,
        }}
      >
        {experience.current && (
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.6,
              px: 1.2,
              py: 0.4,
              borderRadius: tokens.radius.full,
              backgroundColor: alpha(tokens.color.amber[500], 0.1),
              border: `1px solid ${alpha(tokens.color.amber[500], 0.3)}`,
            }}
            aria-label="Trabajo actual"
          >
            <Box
              sx={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: tokens.color.amber[500],
                "@keyframes badgePulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.4 },
                },
                animation: "badgePulse 1.5s ease-in-out infinite",
              }}
              aria-hidden="true"
            />
            <Typography
              sx={{
                fontFamily: tokens.font.mono,
                fontSize: "0.65rem",
                color: tokens.color.amber[500],
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Actual
            </Typography>
          </Box>
        )}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <CalendarTodayIcon
            sx={{ fontSize: "0.75rem", color: tokens.color.text.muted }}
            aria-hidden="true"
          />
          <Typography
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.72rem",
              color: tokens.color.text.muted,
              letterSpacing: "0.05em",
            }}
          >
            {experience.date}
          </Typography>
        </Box>
      </Box>

      <Typography
        variant="h3"
        component="h3"
        sx={{
          fontSize: { xs: "1rem", md: "1.15rem" },
          color: tokens.color.text.primary,
          mb: 0.5,
          fontWeight: 600,
        }}
      >
        {experience.role}
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <BusinessIcon
          sx={{ fontSize: "0.85rem", color: tokens.color.amber[500] }}
          aria-hidden="true"
        />
        <Typography
          sx={{
            fontFamily: tokens.font.body,
            fontSize: "0.85rem",
            color: tokens.color.amber[500],
            fontWeight: 500,
          }}
        >
          {experience.company}
        </Typography>
      </Box>
    </Box>

    <Box
      sx={{
        height: "1px",
        backgroundColor: tokens.color.border.subtle,
        mb: 2.5,
      }}
      aria-hidden="true"
    />

    {/* Responsabilidades */}
    <Box
      component="ul"
      aria-label="Responsabilidades"
      sx={{
        listStyle: "none",
        p: 0,
        m: 0,
        mb: 2.5,
        display: "flex",
        flexDirection: "column",
        gap: 1.5,
      }}
    >
      {experience.responsibilities.map((item, idx) => (
        <motion.li
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{
            delay: 0.3 + index * 0.1 + idx * 0.06,
            duration: 0.4,
            ease: "easeOut",
          }}
          style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}
        >
          <CheckCircleOutlineIcon
            sx={{
              fontSize: "0.9rem",
              color: tokens.color.amber[500],
              mt: "3px",
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          <Typography
            sx={{
              fontFamily: tokens.font.body,
              fontSize: "0.85rem",
              color: tokens.color.text.secondary,
              lineHeight: 1.7,
            }}
          >
            {item}
          </Typography>
        </motion.li>
      ))}
    </Box>

    {/* Tech stack */}
    {techStack.length > 0 && (
      <Box>
        <Typography
          sx={{
            fontFamily: tokens.font.mono,
            fontSize: "0.65rem",
            color: tokens.color.text.muted,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            mb: 1,
          }}
        >
          Tech stack
        </Typography>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", gap: 0.8 }}
          role="list"
          aria-label="Tecnologías utilizadas"
        >
          {techStack.map((tech) => (
            <Chip
              key={tech}
              label={tech}
              size="small"
              role="listitem"
              aria-label={`Tecnología: ${tech}`}
            />
          ))}
        </Box>
      </Box>
    )}
  </Paper>
);

export default ExperienceSection;
