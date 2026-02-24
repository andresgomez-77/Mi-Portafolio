// src/components/ui/StatCard.tsx
// Componente pequeño reutilizable — muestra un número animado + label
// Aprenderás: componentes con props tipadas en TypeScript

import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import useCountUp from "../../hooks/useCountUp";

interface StatCardProps {
  // El número puede ser "6+" o "∞" — guardamos el valor numérico separado
  value: number | null; // null para "∞" (no se puede contar)
  suffix?: string; // "+" en "6+"
  symbol?: string; // "∞" cuando no hay número
  label: string;
  trigger: boolean; // viene del useInView del padre
  delay?: number; // delay en ms para escalonar la animación
}

const StatCard = ({
  value,
  suffix = "",
  symbol,
  label,
  trigger,
  delay = 0,
}: StatCardProps) => {
  // Solo usamos useCountUp si hay un número real
  const count = useCountUp({
    end: value ?? 0,
    duration: 1200,
    trigger: trigger && value !== null,
  });

  // Lo que se muestra: número animado + sufijo, o el símbolo especial
  const displayValue = symbol ?? `${count}${suffix}`;

  return (
    <Box
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: tokens.radius.md,
        border: `1px solid ${tokens.color.border.subtle}`,
        backgroundColor: alpha(tokens.color.bg.surface, 0.6),
        textAlign: "center",
        transition: `all ${tokens.transition.normal}`,
        // Delay de entrada — cada stat aparece escalonado
        transitionDelay: `${delay}ms`,
        "&:hover": {
          borderColor: alpha(tokens.color.amber[500], 0.35),
          boxShadow: tokens.shadow.glow,
          transform: "translateY(-4px)",
        },
      }}
    >
      <Typography
        sx={{
          fontFamily: tokens.font.display,
          fontSize: { xs: "2rem", md: "2.8rem" },
          lineHeight: 1,
          color: tokens.color.amber[500],
          mb: 0.5,
        }}
      >
        {displayValue}
      </Typography>

      <Typography
        sx={{
          fontFamily: tokens.font.mono,
          fontSize: "0.65rem",
          color: tokens.color.text.muted,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default StatCard;
