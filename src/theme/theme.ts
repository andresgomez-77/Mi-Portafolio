// TEMA GLOBAL — "Engineering Noir"
// Este archivo define TODO el sistema de diseño: colores, tipografía, espaciado, sombras y overrides de componentes MUI.
import { createTheme, alpha } from "@mui/material/styles";

// ── 1. TOKENS DE DISEÑO ───────────────────────────────────────────────────────
// Los "tokens" son los valores primitivos del diseño.
// Úsalos para construir el tema — no pongas valores hardcodeados en componentes.
const tokens = {
  color: {
    // Fondos — capas de profundidad
    bg: {
      base:    "#08090A", // fondo raíz, casi negro puro
      surface: "#0F1114", // cards, modals
      raised:  "#161920", // elementos elevados, inputs
      overlay: "#1E2228", // tooltips, dropdowns
    },

    // Bordes sutiles para separar sin ruido visual
    border: {
      subtle:  "#1E2228",
      default: "#2A2F3A",
      strong:  "#3D4455",
    },

    // Paleta principal — Amber (dorado energético)
    amber: {
      50:  "#FFFBEB",
      100: "#FEF3C7",
      300: "#FCD34D",
      400: "#FBBF24",
      500: "#F5A623", // ← primario principal
      600: "#D97706",
      700: "#B45309",
    },

    // Acento secundario — Coral (para highlights puntuales)
    coral: {
      400: "#FF8C5A",
      500: "#FF6B35", // ← acento secundario
      600: "#E85A24",
    },

    // Texto — jerarquía clara
    text: {
      primary:   "#F0F0F0", // títulos, texto importante
      secondary: "#A0AAB8", // texto de apoyo
      muted:     "#4A5568", // placeholder, texto desactivado
      inverse:   "#08090A", // texto sobre fondo claro (ej: botón filled)
    },
  },

  // Sistema de fuentes
  font: {
    display: '"Bebas Neue", "Impact", sans-serif',   // títulos impactantes
    body:    '"DM Sans", "Helvetica Neue", sans-serif', // lectura cómoda
    mono:    '"JetBrains Mono", "Fira Code", monospace', // código, métricas
  },

  // Escala de espaciado (base 8px)
  spacing: {
    xs:  "4px",   // spacing(0.5)
    sm:  "8px",   // spacing(1)
    md:  "16px",  // spacing(2)
    lg:  "24px",  // spacing(3)
    xl:  "32px",  // spacing(4)
    xxl: "48px",  // spacing(6)
    "3xl": "64px", // spacing(8)
  },

  // Radio de bordes
  radius: {
    sm:   "6px",
    md:   "12px",
    lg:   "16px",
    xl:   "24px",
    full: "9999px",
  },

  // Sombras con tinte amber para coherencia visual
  shadow: {
    sm:    "0 2px 8px rgba(0,0,0,0.4)",
    md:    "0 4px 20px rgba(0,0,0,0.5)",
    lg:    "0 8px 40px rgba(0,0,0,0.6)",
    glow:  "0 0 20px rgba(245,166,35,0.25)",
    glowStrong: "0 0 40px rgba(245,166,35,0.4)",
  },

  // Transiciones estándar
  transition: {
    fast:   "0.15s ease",
    normal: "0.3s ease",
    slow:   "0.5s ease",
    spring: "0.4s cubic-bezier(0.34, 1.56, 0.64, 1)", 
  },
} as const;

// ── 2. CREAR EL TEMA MUI ──────────────────────────────────────────────────────
const theme = createTheme({

  // ── PALETA ──────────────────────────────────────────────────────────────────
  palette: {
    mode: "dark",

    primary: {
      main:        tokens.color.amber[500],
      light:       tokens.color.amber[300],
      dark:        tokens.color.amber[700],
      contrastText: tokens.color.text.inverse,
    },

    secondary: {
      main:        tokens.color.coral[500],
      light:       tokens.color.coral[400],
      dark:        tokens.color.coral[600],
      contrastText: tokens.color.text.inverse,
    },

    background: {
      default: tokens.color.bg.base,
      paper:   tokens.color.bg.surface,
    },

    text: {
      primary:   tokens.color.text.primary,
      secondary: tokens.color.text.secondary,
      disabled:  tokens.color.text.muted,
    },

    divider: tokens.color.border.subtle,

    // Colores de estado — mantenemos accesibilidad
    error:   { main: "#F87171" },
    warning: { main: "#FBBF24" },
    info:    { main: "#60A5FA" },
    success: { main: "#34D399" },
  },

  // ── TIPOGRAFÍA ───────────────────────────────────────────────────────────────
  typography: {
    fontFamily: tokens.font.body,

    // h1 — Solo para el nombre en el Hero (gigante, impactante)
    h1: {
      fontFamily:    tokens.font.display,
      fontSize:      "clamp(4rem, 12vw, 10rem)", // escala fluida con viewport
      fontWeight:    400,
      lineHeight:    0.9,
      letterSpacing: "-0.02em",
      textTransform: "uppercase",
    },

    // h2 — Títulos de sección ("Experiencia", "Skills", etc.)
    h2: {
      fontFamily:    tokens.font.display,
      fontSize:      "clamp(2.5rem, 6vw, 5rem)",
      fontWeight:    400,
      lineHeight:    1,
      letterSpacing: "-0.01em",
      textTransform: "uppercase",
    },

    // h3 — Subtítulos de cards y subsecciones
    h3: {
      fontFamily:    tokens.font.body,
      fontSize:      "clamp(1.2rem, 2.5vw, 1.5rem)",
      fontWeight:    600,
      lineHeight:    1.3,
      letterSpacing: "-0.01em",
    },

    // h4 — Títulos de items pequeños
    h4: {
      fontFamily:    tokens.font.body,
      fontSize:      "1.1rem",
      fontWeight:    600,
      lineHeight:    1.4,
    },

    // h5, h6 — Labels y metadata
    h5: {
      fontFamily:    tokens.font.body,
      fontSize:      "0.95rem",
      fontWeight:    500,
    },
    h6: {
      fontFamily:    tokens.font.body,
      fontSize:      "0.85rem",
      fontWeight:    500,
    },

    // body1 — Texto de párrafos principal
    body1: {
      fontFamily:  tokens.font.body,
      fontSize:    "1rem",
      lineHeight:  1.8,
      fontWeight:  400,
      color:       tokens.color.text.secondary,
    },

    // body2 — Texto de apoyo, descripciones de cards
    body2: {
      fontFamily:  tokens.font.body,
      fontSize:    "0.875rem",
      lineHeight:  1.7,
      fontWeight:  400,
      color:       tokens.color.text.secondary,
    },

    // subtitle1 — Labels de sección ("01. Experiencia")
    subtitle1: {
      fontFamily:    tokens.font.mono,
      fontSize:      "0.8rem",
      fontWeight:    400,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color:         tokens.color.amber[500],
    },

    // subtitle2 — Fechas, metadatos
    subtitle2: {
      fontFamily:    tokens.font.mono,
      fontSize:      "0.75rem",
      fontWeight:    400,
      letterSpacing: "0.1em",
      color:         tokens.color.text.muted,
    },

    // caption — Textos muy pequeños, tooltips
    caption: {
      fontFamily:  tokens.font.mono,
      fontSize:    "0.7rem",
      lineHeight:  1.5,
      color:       tokens.color.text.muted,
    },

    // overline — Tags de tecnología, badges
    overline: {
      fontFamily:    tokens.font.mono,
      fontSize:      "0.7rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      fontWeight:    500,
    },
  },

  // ── FORMA ────────────────────────────────────────────────────────────────────
  shape: {
    borderRadius: 12, // MUI usa este valor como base para todos sus componentes
  },

  // ── OVERRIDE DE COMPONENTES MUI ───────────────────────────────────────────────
  // Aquí personalizamos cómo se ve cada componente MUI en todo el proyecto.
  components: {

    // ── CssBaseline: reset global ──────────────────────────────────────────────
    MuiCssBaseline: {
      styleOverrides: {
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
        html: {
          scrollBehavior: "smooth",
          fontSize: "16px",
        },
        body: {
          backgroundColor: tokens.color.bg.base,
          color: tokens.color.text.primary,
          fontFamily: tokens.font.body,
          overflowX: "hidden",
          // Scrollbar personalizada
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            background: tokens.color.bg.base,
          },
          "&::-webkit-scrollbar-thumb": {
            background: tokens.color.amber[500],
            borderRadius: "10px",
          },
        },
        // Selección de texto con color de marca
        "::selection": {
          backgroundColor: alpha(tokens.color.amber[500], 0.3),
          color: tokens.color.text.primary,
        },
        // Anclas sin estilo por defecto
        "a": {
          color: "inherit",
          textDecoration: "none",
        },
      },
    },

    // ── Button ─────────────────────────────────────────────────────────────────
    MuiButton: {
      defaultProps: {
        disableElevation: true, // sin sombra por defecto
      },
      styleOverrides: {
        root: {
          fontFamily:    tokens.font.body,
          fontWeight:    600,
          fontSize:      "0.875rem",
          textTransform: "none",     // sin MAYÚSCULAS automáticas
          borderRadius:  tokens.radius.sm,
          padding:       "10px 28px",
          transition:    `all ${tokens.transition.normal}`,
          letterSpacing: "0.02em",

          // Efecto hover con glow amber
          "&:hover": {
            transform:  "translateY(-2px)",
            boxShadow:  tokens.shadow.glow,
          },

          // Sin outline feo al hacer focus con teclado — usamos ring propio
          "&:focus-visible": {
            outline:       `2px solid ${tokens.color.amber[500]}`,
            outlineOffset: "3px",
          },
        },

        // Variante filled (contained)
        contained: {
          background: `linear-gradient(135deg, ${tokens.color.amber[500]}, ${tokens.color.amber[600]})`,
          color: tokens.color.text.inverse,
          "&:hover": {
            background: `linear-gradient(135deg, ${tokens.color.amber[400]}, ${tokens.color.amber[500]})`,
          },
        },

        // Variante outlined
        outlined: {
          borderColor: tokens.color.amber[500],
          color:       tokens.color.amber[500],
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth:     "1.5px",
            backgroundColor: alpha(tokens.color.amber[500], 0.08),
          },
        },

        // Variante text
        text: {
          color: tokens.color.amber[500],
          "&:hover": {
            backgroundColor: alpha(tokens.color.amber[500], 0.06),
            transform: "none",
            boxShadow: "none",
          },
        },
      },
    },

    // ── Card ───────────────────────────────────────────────────────────────────
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "none",  // quita el gradiente que MUI añade en dark mode
          backgroundColor: tokens.color.bg.surface,
          border:          `1px solid ${tokens.color.border.subtle}`,
          borderRadius:    tokens.radius.lg,
          transition:      `all ${tokens.transition.normal}`,
          "&:hover": {
            borderColor: alpha(tokens.color.amber[500], 0.3),
            boxShadow:   tokens.shadow.glow,
          },
        },
      },
    },

    // ── Chip (para tags de tecnologías) ────────────────────────────────────────
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily:    tokens.font.mono,
          fontSize:      "0.7rem",
          letterSpacing: "0.05em",
          borderRadius:  tokens.radius.sm,
          height:        "26px",
          border:        `1px solid ${tokens.color.border.default}`,
          backgroundColor: alpha(tokens.color.amber[500], 0.06),
          color:         tokens.color.text.secondary,
          transition:    `all ${tokens.transition.fast}`,
          "&:hover": {
            backgroundColor: alpha(tokens.color.amber[500], 0.12),
            borderColor:     alpha(tokens.color.amber[500], 0.4),
            color:           tokens.color.amber[500],
          },
        },
      },
    },

    // ── TextField (formulario de contacto) ─────────────────────────────────────
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            fontFamily:      tokens.font.body,
            fontSize:        "0.9rem",
            backgroundColor: tokens.color.bg.raised,
            borderRadius:    tokens.radius.md,
            transition:      `all ${tokens.transition.normal}`,

            "& fieldset": {
              borderColor: tokens.color.border.default,
              borderWidth: "1px",
              transition:  `border-color ${tokens.transition.fast}`,
            },
            "&:hover fieldset": {
              borderColor: tokens.color.border.strong,
            },
            "&.Mui-focused fieldset": {
              borderColor: tokens.color.amber[500],
              borderWidth: "1.5px",
              boxShadow:   `0 0 0 3px ${alpha(tokens.color.amber[500], 0.1)}`,
            },
          },
          "& .MuiInputLabel-root": {
            fontFamily: tokens.font.body,
            fontSize:   "0.875rem",
            color:      tokens.color.text.muted,
            "&.Mui-focused": {
              color: tokens.color.amber[500],
            },
          },
          "& .MuiOutlinedInput-input": {
            color: tokens.color.text.primary,
            "&::placeholder": {
              color:   tokens.color.text.muted,
              opacity: 1,
            },
          },
        },
      },
    },

    // ── LinearProgress (barras de skills) ──────────────────────────────────────
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height:          6,
          borderRadius:    tokens.radius.full,
          backgroundColor: tokens.color.bg.raised,
          overflow:        "visible", // permite que el glow se vea
        },
        bar: {
          borderRadius: tokens.radius.full,
          background:   `linear-gradient(90deg, ${tokens.color.amber[600]}, ${tokens.color.amber[400]})`,
          boxShadow:    `0 0 8px ${alpha(tokens.color.amber[500], 0.5)}`,
        },
      },
    },

    // ── Tab (navegación de skills) ─────────────────────────────────────────────
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily:    tokens.font.mono,
          fontSize:      "0.75rem",
          fontWeight:    400,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color:         tokens.color.text.muted,
          minHeight:     "44px",
          padding:       "8px 20px",
          borderRadius:  `${tokens.radius.sm} ${tokens.radius.sm} 0 0`,
          transition:    `all ${tokens.transition.fast}`,
          "&.Mui-selected": {
            color:           tokens.color.amber[500],
            backgroundColor: alpha(tokens.color.amber[500], 0.06),
          },
          "&:hover": {
            color:           tokens.color.text.primary,
            backgroundColor: alpha(tokens.color.text.primary, 0.04),
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${tokens.color.border.subtle}`,
          minHeight: "44px",
        },
        indicator: {
          backgroundColor: tokens.color.amber[500],
          height:          "2px",
          borderRadius:    `${tokens.radius.full} ${tokens.radius.full} 0 0`,
          boxShadow:       `0 0 8px ${alpha(tokens.color.amber[500], 0.6)}`,
        },
      },
    },

    // ── Tooltip ────────────────────────────────────────────────────────────────
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontFamily:      tokens.font.mono,
          fontSize:        "0.72rem",
          backgroundColor: tokens.color.bg.overlay,
          border:          `1px solid ${tokens.color.border.default}`,
          borderRadius:    tokens.radius.sm,
          padding:         "6px 10px",
          color:           tokens.color.text.primary,
          backdropFilter:  "blur(8px)",
        },
        arrow: {
          color: tokens.color.bg.overlay,
        },
      },
    },

    // ── Divider ────────────────────────────────────────────────────────────────
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: tokens.color.border.subtle,
        },
      },
    },

    // ── AppBar (Navbar) ────────────────────────────────────────────────────────
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          backgroundColor: "transparent",
          boxShadow:       "none",
        },
      },
    },

    // ── IconButton ─────────────────────────────────────────────────────────────
    MuiIconButton: {
      styleOverrides: {
        root: {
          color:      tokens.color.text.muted,
          transition: `all ${tokens.transition.fast}`,
          "&:hover": {
            color:           tokens.color.amber[500],
            backgroundColor: alpha(tokens.color.amber[500], 0.08),
          },
          "&:focus-visible": {
            outline:       `2px solid ${tokens.color.amber[500]}`,
            outlineOffset: "2px",
          },
        },
      },
    },
  },
});

// ── 3. EXPORTAR TOKENS PARA USAR EN COMPONENTES ───────────────────────────────
// Los componentes pueden importar tokens directamente para valores específicos (ej: color de fondo de un card) sin tener que usar el hook useTheme.
export { tokens };
export default theme;