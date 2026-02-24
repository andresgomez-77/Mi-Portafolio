// src/components/sections/ContactSection.tsx
// ─────────────────────────────────────────────────────────────────────────────
// CONTACT SECTION
//
// Conceptos nuevos:
//   → useCallback para memoizar la función de validación
//   → Estados de UI: idle, loading, success, error
//   → Formulario accesible con aria-describedby y aria-invalid
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import SendIcon from "@mui/icons-material/Send";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import { motion, type Variants } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import { personalInfo, socialLinks } from "../../data/portfolioData";
import SectionHeader from "../ui/SectionHeader";
import useInView from "../../hooks/useInView";
import useForm from "../../hooks/useForm";

// ── Constantes del formulario ─────────────────────────────────────────────────
const MAX_MESSAGE_LENGTH = 500;

const INITIAL_VALUES = {
  nombre: "",
  email: "",
  asunto: "",
  mensaje: "",
};

// ── Función de validación ─────────────────────────────────────────────────────
// Separada del componente para que useCallback no la recree
const validateForm = (values: Record<string, string>) => {
  const errors: Record<string, string> = {};

  if (!values.nombre.trim()) {
    errors.nombre = "El nombre es requerido";
  } else if (values.nombre.trim().length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres";
  }

  if (!values.email.trim()) {
    errors.email = "El email es requerido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Ingresa un email válido";
  }

  if (!values.asunto.trim()) {
    errors.asunto = "El asunto es requerido";
  } else if (values.asunto.trim().length < 4) {
    errors.asunto = "El asunto debe tener al menos 4 caracteres";
  }

  if (!values.mensaje.trim()) {
    errors.mensaje = "El mensaje es requerido";
  } else if (values.mensaje.trim().length < 10) {
    errors.mensaje = "El mensaje debe tener al menos 10 caracteres";
  } else if (values.mensaje.length > MAX_MESSAGE_LENGTH) {
    errors.mensaje = `Máximo ${MAX_MESSAGE_LENGTH} caracteres`;
  }

  return errors;
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

const slideVariants = (direction: "left" | "right"): Variants => ({
  hidden: { x: direction === "left" ? -40 : 40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
});

// ── COMPONENTE PRINCIPAL ──────────────────────────────────────────────────────
const ContactSection = () => {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.05 });

  // Función de envío — en producción aquí conectarías Formspree, EmailJS, etc.
  // useCallback evita que se recree en cada render
  const handleSubmit = useCallback(async (values: Record<string, string>) => {
    // Simulamos un delay de red para ver el estado loading
    await new Promise((resolve) => setTimeout(resolve, 1800));

    // En producción reemplaza esto con tu servicio de email:
    // await emailjs.send(serviceId, templateId, values)
    // await fetch("https://formspree.io/f/xxx", { method: "POST", body: ... })
    console.log("Formulario enviado:", values);
  }, []);

  const form = useForm({
    initialValues: INITIAL_VALUES,
    validate: validateForm,
    onSubmit: handleSubmit,
  });

  const charsLeft = MAX_MESSAGE_LENGTH - form.values.mensaje.length;

  return (
    <Box
      component="section"
      id="contacto"
      aria-label="Sección de contacto"
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
            <SectionHeader tag="07. Contacto" title="¡Hablemos!" centered />
          </motion.div>

          {/* ── GRID PRINCIPAL ──────────────────────────────────────────────── */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1.4fr" },
              gap: { xs: 4, md: 8 },
              alignItems: "start",
            }}
          >
            {/* ── COLUMNA INFO ──────────────────────────────────────────── */}
            <motion.div variants={slideVariants("left")}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {/* Intro */}
                <Typography
                  variant="body1"
                  sx={{ fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  ¿Tienes un proyecto en mente o quieres hablar de una
                  oportunidad laboral? Estoy disponible y con muchas ganas de
                  sumar.{" "}
                  <Box
                    component="span"
                    sx={{ color: tokens.color.amber[500], fontWeight: 600 }}
                  >
                    Escríbeme
                  </Box>{" "}
                  😊
                </Typography>

                {/* Links de contacto */}
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  role="list"
                  aria-label="Formas de contacto"
                >
                  {[
                    {
                      icon: <EmailIcon />,
                      label: "Email",
                      value: personalInfo.email,
                      href: `mailto:${personalInfo.email}`,
                    },
                    {
                      icon: <GitHubIcon />,
                      label: "GitHub",
                      value: "andresgomez-77",
                      href: personalInfo.github,
                    },
                    {
                      icon: <LinkedInIcon />,
                      label: "LinkedIn",
                      value: "Andrés Gómez",
                      href: personalInfo.linkedin,
                    },
                  ].map((link) => (
                    <Box
                      key={link.label}
                      component="a"
                      href={link.href}
                      target={link.label !== "Email" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      aria-label={`Contactar por ${link.label}`}
                      role="listitem"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        borderRadius: tokens.radius.md,
                        border: `1px solid ${tokens.color.border.subtle}`,
                        backgroundColor: alpha(tokens.color.bg.raised, 0.4),
                        transition: `all ${tokens.transition.normal}`,
                        "&:hover": {
                          borderColor: alpha(tokens.color.amber[500], 0.4),
                          backgroundColor: alpha(tokens.color.amber[500], 0.04),
                          transform: "translateX(6px)",
                          "& .contact-icon": {
                            color: tokens.color.amber[500],
                            backgroundColor: alpha(
                              tokens.color.amber[500],
                              0.12,
                            ),
                          },
                        },
                      }}
                    >
                      {/* Ícono */}
                      <Box
                        className="contact-icon"
                        sx={{
                          width: "42px",
                          height: "42px",
                          borderRadius: tokens.radius.sm,
                          backgroundColor: alpha(tokens.color.bg.overlay, 0.6),
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: tokens.color.text.muted,
                          flexShrink: 0,
                          transition: `all ${tokens.transition.normal}`,
                        }}
                        aria-hidden="true"
                      >
                        {link.icon}
                      </Box>

                      {/* Texto */}
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: tokens.font.mono,
                            fontSize: "0.65rem",
                            color: tokens.color.text.muted,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            lineHeight: 1,
                            mb: 0.4,
                          }}
                        >
                          {link.label}
                        </Typography>
                        <Typography
                          sx={{
                            fontFamily: tokens.font.body,
                            fontSize: "0.88rem",
                            color: tokens.color.text.primary,
                            fontWeight: 500,
                          }}
                        >
                          {link.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Redes sociales */}
                <Box sx={{ display: "flex", gap: 1.5, pt: 1 }}>
                  {socialLinks.map((social) => (
                    <Tooltip
                      key={social.name}
                      title={social.name}
                      placement="top"
                      arrow
                    >
                      <IconButton
                        component="a"
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        sx={{
                          border: `1px solid ${tokens.color.border.default}`,
                          borderRadius: tokens.radius.sm,
                          padding: "10px",
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
                        {social.icon === "github" && (
                          <GitHubIcon fontSize="small" />
                        )}
                        {social.icon === "linkedin" && (
                          <LinkedInIcon fontSize="small" />
                        )}
                        {social.icon === "email" && (
                          <EmailIcon fontSize="small" />
                        )}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </motion.div>

            {/* ── FORMULARIO ────────────────────────────────────────────── */}
            <motion.div variants={slideVariants("right")}>
              <Box
                component="form"
                onSubmit={form.handleSubmit}
                noValidate
                aria-label="Formulario de contacto"
                sx={{
                  p: { xs: 2.5, md: 3.5 },
                  borderRadius: tokens.radius.lg,
                  border: `1px solid ${tokens.color.border.subtle}`,
                  backgroundColor: alpha(tokens.color.bg.surface, 0.6),
                  backdropFilter: "blur(8px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2.5,
                }}
              >
                {/* ── ESTADO: SUCCESS ──────────────────────────────────── */}
                {form.status === "success" ? (
                  <SuccessState onReset={form.reset} />
                ) : form.status === "error" ? (
                  <ErrorState onReset={() => form.reset()} />
                ) : (
                  <>
                    {/* ── FILA: nombre + email ──────────────────────────── */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 2,
                      }}
                    >
                      <TextField
                        label="Nombre"
                        value={form.values.nombre}
                        onChange={(e) =>
                          form.handleChange("nombre", e.target.value)
                        }
                        onBlur={() => form.handleBlur("nombre")}
                        error={form.touched.nombre && !!form.errors.nombre}
                        helperText={form.touched.nombre && form.errors.nombre}
                        inputProps={{
                          "aria-describedby": "error-nombre",
                          "aria-invalid":
                            form.touched.nombre && !!form.errors.nombre,
                          maxLength: 80,
                        }}
                        disabled={form.status === "loading"}
                        autoComplete="name"
                        required
                      />

                      <TextField
                        label="Email"
                        type="email"
                        value={form.values.email}
                        onChange={(e) =>
                          form.handleChange("email", e.target.value)
                        }
                        onBlur={() => form.handleBlur("email")}
                        error={form.touched.email && !!form.errors.email}
                        helperText={form.touched.email && form.errors.email}
                        inputProps={{
                          "aria-describedby": "error-email",
                          "aria-invalid":
                            form.touched.email && !!form.errors.email,
                        }}
                        disabled={form.status === "loading"}
                        autoComplete="email"
                        required
                      />
                    </Box>

                    {/* Asunto */}
                    <TextField
                      label="Asunto"
                      value={form.values.asunto}
                      onChange={(e) =>
                        form.handleChange("asunto", e.target.value)
                      }
                      onBlur={() => form.handleBlur("asunto")}
                      error={form.touched.asunto && !!form.errors.asunto}
                      helperText={form.touched.asunto && form.errors.asunto}
                      inputProps={{
                        "aria-describedby": "error-asunto",
                        "aria-invalid":
                          form.touched.asunto && !!form.errors.asunto,
                        maxLength: 120,
                      }}
                      disabled={form.status === "loading"}
                      required
                    />

                    {/* Mensaje + contador */}
                    <Box>
                      <TextField
                        label="Mensaje"
                        multiline
                        rows={5}
                        value={form.values.mensaje}
                        onChange={(e) =>
                          form.handleChange("mensaje", e.target.value)
                        }
                        onBlur={() => form.handleBlur("mensaje")}
                        error={form.touched.mensaje && !!form.errors.mensaje}
                        helperText={form.touched.mensaje && form.errors.mensaje}
                        inputProps={{
                          "aria-describedby": "counter-mensaje error-mensaje",
                          "aria-invalid":
                            form.touched.mensaje && !!form.errors.mensaje,
                          maxLength: MAX_MESSAGE_LENGTH,
                        }}
                        disabled={form.status === "loading"}
                        required
                      />

                      {/* Contador de caracteres */}
                      <Typography
                        id="counter-mensaje"
                        sx={{
                          fontFamily: tokens.font.mono,
                          fontSize: "0.68rem",
                          textAlign: "right",
                          mt: 0.5,
                          // Cambia de color cuando se acerca al límite
                          color:
                            charsLeft < 50
                              ? tokens.color.coral[500]
                              : tokens.color.text.muted,
                          transition: `color ${tokens.transition.fast}`,
                        }}
                        aria-live="polite"
                      >
                        {charsLeft} caracteres restantes
                      </Typography>
                    </Box>

                    {/* Botón submit */}
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={form.status === "loading"}
                      aria-label="Enviar mensaje"
                      endIcon={
                        form.status === "loading" ? (
                          <CircularProgress size={16} color="inherit" />
                        ) : (
                          <SendIcon />
                        )
                      }
                      sx={{ mt: 0.5 }}
                    >
                      {form.status === "loading"
                        ? "Enviando..."
                        : "Enviar mensaje"}
                    </Button>
                  </>
                )}
              </Box>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

// ── SUBCOMPONENTE: Estado éxito ───────────────────────────────────────────────
const SuccessState = ({ onReset }: { onReset: () => void }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      py: 6,
      textAlign: "center",
    }}
    role="status"
    aria-live="polite"
    aria-label="Mensaje enviado exitosamente"
  >
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      <CheckCircleIcon
        sx={{
          fontSize: "3.5rem",
          color: "#34D399",
          filter: "drop-shadow(0 0 12px rgba(52, 211, 153, 0.5))",
        }}
        aria-hidden="true"
      />
    </motion.div>

    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <Typography
        sx={{
          fontFamily: tokens.font.display,
          fontSize: "1.8rem",
          color: tokens.color.text.primary,
        }}
      >
        ¡Mensaje enviado!
      </Typography>
      <Typography
        sx={{
          fontFamily: tokens.font.body,
          fontSize: "0.88rem",
          color: tokens.color.text.muted,
          mt: 0.5,
        }}
      >
        Te responderé lo antes posible 🚀
      </Typography>
    </motion.div>

    <Button
      variant="outlined"
      size="small"
      onClick={onReset}
      startIcon={<RefreshIcon />}
      aria-label="Enviar otro mensaje"
      sx={{ mt: 1 }}
    >
      Enviar otro mensaje
    </Button>
  </Box>
);

// ── SUBCOMPONENTE: Estado error ───────────────────────────────────────────────
const ErrorState = ({ onReset }: { onReset: () => void }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      py: 6,
      textAlign: "center",
    }}
    role="alert"
    aria-live="assertive"
    aria-label="Error al enviar el mensaje"
  >
    <ErrorOutlineIcon
      sx={{ fontSize: "3rem", color: tokens.color.coral[500] }}
      aria-hidden="true"
    />

    <Box>
      <Typography
        sx={{
          fontFamily: tokens.font.body,
          fontSize: "1rem",
          fontWeight: 600,
          color: tokens.color.text.primary,
        }}
      >
        Algo salió mal
      </Typography>
      <Typography
        sx={{
          fontFamily: tokens.font.body,
          fontSize: "0.85rem",
          color: tokens.color.text.muted,
          mt: 0.5,
        }}
      >
        Intenta de nuevo o escríbeme directamente a{" "}
        <Box
          component="a"
          href={`mailto:${personalInfo.email}`}
          sx={{ color: tokens.color.amber[500] }}
        >
          {personalInfo.email}
        </Box>
      </Typography>
    </Box>

    <Button
      variant="outlined"
      size="small"
      onClick={onReset}
      startIcon={<RefreshIcon />}
      aria-label="Intentar de nuevo"
    >
      Intentar de nuevo
    </Button>
  </Box>
);

export default ContactSection;
