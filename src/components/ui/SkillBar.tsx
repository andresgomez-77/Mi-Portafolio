// src/components/ui/SkillBar.tsx

import { Box, Typography, LinearProgress } from "@mui/material";
import { motion } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import { getSkillIcon } from "../../data/skillIcons";
import useCountUp from "../../hooks/useCountUp";
import type { Skill } from "../../types";

interface SkillBarProps {
  skill: Skill;
  trigger: boolean;
  delay?: number;
}

const SkillBar = ({ skill, trigger, delay = 0 }: SkillBarProps) => {
  const IconComponent = getSkillIcon(skill.name);

  const count = useCountUp({
    end: skill.level,
    duration: 1000,
    trigger,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ delay: delay / 1000, duration: 0.5, ease: "easeOut" }}
      // FIX: overflow hidden en el wrapper de motion para contener la barra
      style={{ overflow: "hidden" }}
    >
      <Box
        sx={{
          p: 2,
          borderRadius: tokens.radius.md,
          border: `1px solid ${tokens.color.border.subtle}`,
          backgroundColor: alpha(tokens.color.bg.raised, 0.5),
          transition: `all ${tokens.transition.normal}`,
          // FIX: overflow hidden en el Box también para evitar que la barra
          // se salga en el eje horizontal durante la animación
          overflow: "hidden",
          "&:hover": {
            borderColor: alpha(tokens.color.amber[500], 0.3),
            backgroundColor: alpha(tokens.color.bg.raised, 0.8),
            transform: "translateY(-2px)",
          },
        }}
        role="listitem"
      >
        {/* Header: ícono + nombre + porcentaje */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1.2,
            gap: 1,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: 0 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "30px",
                height: "30px",
                borderRadius: tokens.radius.sm,
                backgroundColor: alpha(tokens.color.amber[500], 0.08),
                flexShrink: 0,
              }}
              aria-hidden="true"
            >
              <IconComponent
                sx={{ fontSize: "1rem", color: tokens.color.amber[500] }}
              />
            </Box>

            <Typography
              sx={{
                fontFamily: tokens.font.body,
                fontSize: "0.85rem",
                fontWeight: 500,
                color: tokens.color.text.primary,
                // FIX: evita que nombres largos rompan el layout
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {skill.name}
            </Typography>
          </Box>

          <Typography
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.75rem",
              color: tokens.color.amber[500],
              letterSpacing: "0.05em",
              flexShrink: 0,
            }}
            aria-label={`${skill.level} por ciento`}
          >
            {count}%
          </Typography>
        </Box>

        {/* Barra de progreso */}
        <Box
          sx={{ position: "relative", overflow: "hidden", borderRadius: "4px" }}
        >
          <LinearProgress
            variant="determinate"
            value={trigger ? skill.level : 0}
            aria-label={`Nivel de ${skill.name}`}
            aria-valuenow={skill.level}
            aria-valuemin={0}
            aria-valuemax={100}
            sx={{
              "& .MuiLinearProgress-bar": {
                transition: trigger
                  ? `transform ${900 + delay * 0.5}ms cubic-bezier(0.16, 1, 0.3, 1)` // easeOutExpo — sin overshoot
                  : "none",
              },
            }}
          />
        </Box>
      </Box>
    </motion.div>
  );
};

export default SkillBar;
