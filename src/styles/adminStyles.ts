import { tokens } from "../theme/theme";
import { alpha } from "@mui/material/styles";

export const adminStyles = {
  input: {
    "& .MuiOutlinedInput-root": {
      fontFamily: tokens.font.mono,
      color: `${tokens.color.text.primary} !important`, // ← color del texto
      backgroundColor: tokens.color.bg.raised, // ← fondo del input
      "& fieldset": { borderColor: tokens.color.border.default },
      "&:hover fieldset": { borderColor: tokens.color.amber[500] },
      "&.Mui-focused fieldset": { borderColor: tokens.color.amber[500] },
    },
    "& .MuiInputLabel-root": {
      color: tokens.color.text.muted, // ← color del label normal
      fontFamily: tokens.font.mono,
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: tokens.color.amber[500], // ← color del label al escribir
    },
  },
  card: {
    p: 4,
    width: "100%",
    maxWidth: "420px", // ancho fijo
    borderRadius: tokens.radius.lg,
    border: `1px solid ${tokens.color.border.subtle}`,
    backgroundColor: tokens.color.bg.surface,
    transition: `all ${tokens.transition.normal}`,
    "&:hover": {
      borderColor: alpha(tokens.color.amber[500], 0.3),
    },
  },
  button: {
    primary: {
      backgroundColor: `${tokens.color.amber[500]} !important`,
      color: `${tokens.color.text.inverse} !important`,
      fontFamily: tokens.font.mono,
      fontWeight: 600,
      py: 1.5,
      "&:hover": {
        backgroundColor: `${tokens.color.amber[400]} !important`,
      },
      "&.Mui-disabled": {
        backgroundColor: `${tokens.color.amber[500]} !important`,
        opacity: 0.4,
        color: `${tokens.color.text.inverse} !important`,
      },
    },
  },
};
