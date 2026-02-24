import { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { alpha } from "@mui/material/styles";
import { tokens } from "../../theme/theme";
import { personalInfo } from "../../data/portfolioData";
import type { NavLink } from "./Navbar.types";

/** Navigation links with indices for visual numbering */
const NAV_LINKS: NavLink[] = [
  { index: "01", label: "Sobre mí", href: "#sobre-mi" },
  { index: "02", label: "Experiencia", href: "#experiencia" },
  { index: "03", label: "Skills", href: "#skills" },
  { index: "04", label: "Proyectos", href: "#proyectos" },
  { index: "05", label: "Formación", href: "#formacion" },
  { index: "06", label: "Contacto", href: "#contacto" },
];

const SCROLL_THRESHOLD = 60;
const DRAWER_WIDTH = 280;

/** Animation variants for navbar entrance and link sequencing */
const navbarVariants: Variants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const linkVariants: Variants = {
  hidden: { y: -10, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const linksContainerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.3 } },
};

/**
 * Individual navigation link component with independent hover state.
 * Uses React state instead of CSS hover to ensure index numbers
 * display reliably on hover (MUI sx doesn't propagate reliably).
 */
interface NavLinkItemProps {
  link: NavLink;
  isActive: boolean;
  onClick: (href: string) => void;
}

const NavLinkItem = ({ link, isActive, onClick }: NavLinkItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const show = isActive || isHovered;

  return (
    <motion.div variants={linkVariants}>
      <Box
        component="a"
        href={link.href}
        onClick={(e) => {
          e.preventDefault();
          onClick(link.href);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={`Ir a sección ${link.label}`}
        aria-current={isActive ? "true" : undefined}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick(link.href);
          }
        }}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 1.5,
          py: 0.5,
          borderRadius: tokens.radius.sm,
          cursor: "pointer",
          position: "relative",
          transition: `all ${tokens.transition.fast}`,
          /* Animated underline on active/hover state */
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-2px",
            left: "50%",
            transform: "translateX(-50%)",
            width: show ? "60%" : "0%",
            height: "2px",
            backgroundColor: tokens.color.amber[500],
            borderRadius: tokens.radius.full,
            transition: `width ${tokens.transition.normal}`,
            boxShadow: show
              ? `0 0 8px ${alpha(tokens.color.amber[500], 0.6)}`
              : "none",
          },
        }}
      >
        {/* Número de sección — opacity controlada por estado React */}
        <Typography
          sx={{
            fontFamily: tokens.font.mono,
            fontSize: "0.6rem",
            color: tokens.color.amber[500],
            lineHeight: 1,
            mb: "1px",
            opacity: show ? 1 : 0,
            transition: `opacity ${tokens.transition.fast}`,
            letterSpacing: "0.1em",
          }}
        >
          {link.index}
        </Typography>

        {/* Link text (shows on hover) */}
        <Typography
          sx={{
            fontFamily: tokens.font.body,
            fontSize: "0.82rem",
            fontWeight: isActive ? 500 : 400,
            color: show ? tokens.color.amber[500] : tokens.color.text.muted,
            transition: `color ${tokens.transition.fast}`,
            lineHeight: 1,
            whiteSpace: "nowrap",
          }}
        >
          {link.label}
        </Typography>
      </Box>
    </motion.div>
  );
};

/**
 * Main navigation bar component.
 * Handles responsive layout, scroll effects, and mobile menu drawer.
 */
const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > SCROLL_THRESHOLD);

      const sections = NAV_LINKS.map(
        (link) => document.querySelector(link.href) as HTMLElement | null,
      );
      const current = sections
        .filter(Boolean)
        .reverse()
        .find((s) => s!.getBoundingClientRect().top <= 120);

      if (current) setActiveSection(`#${current.id}`);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileToggle = useCallback(() => setMobileOpen((p) => !p), []);

  const handleNavClick = useCallback((href: string) => {
    setMobileOpen(false);
    document
      .querySelector(href)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navbarVariants}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1100 }}
      >
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: isScrolled
              ? alpha(tokens.color.bg.base, 0.85)
              : "transparent",
            backdropFilter: isScrolled ? "blur(12px)" : "none",
            borderBottom: isScrolled
              ? `1px solid ${tokens.color.border.subtle}`
              : "1px solid transparent",
            transition: `all ${tokens.transition.normal}`,
          }}
        >
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{
                height: isScrolled ? 64 : 80,
                transition: `height ${tokens.transition.normal}`,
                justifyContent: "space-between",
              }}
            >
              {/* Logo/Brand with hover effect */}
              <motion.div variants={linkVariants}>
                <Box
                  component="a"
                  href="#inicio"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick("#inicio");
                  }}
                  aria-label="Ir al inicio"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    "&:hover .logo-text": { color: tokens.color.amber[500] },
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: tokens.font.mono,
                      fontSize: "1.4rem",
                      fontWeight: 300,
                      color: tokens.color.amber[500],
                      lineHeight: 1,
                    }}
                  >
                    &lt;
                  </Typography>
                  <Typography
                    className="logo-text"
                    sx={{
                      fontFamily: tokens.font.display,
                      fontSize: "1.5rem",
                      fontWeight: 400,
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
                      fontSize: "1.4rem",
                      fontWeight: 300,
                      color: tokens.color.amber[500],
                      lineHeight: 1,
                    }}
                  >
                    /&gt;
                  </Typography>
                </Box>
              </motion.div>

              {/* Horizontal navigation links (desktop only) */}
              {!isMobile && (
                <motion.div
                  variants={linksContainerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Box
                    component="nav"
                    aria-label="Navegación principal"
                    sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    {NAV_LINKS.map((link) => (
                      <NavLinkItem
                        key={link.href}
                        link={link}
                        isActive={activeSection === link.href}
                        onClick={handleNavClick}
                      />
                    ))}
                    {/* Download CV button */}
                    <motion.div variants={linkVariants}>
                      <Button
                        component="a"
                        href={personalInfo.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        size="small"
                        startIcon={<DownloadIcon sx={{ fontSize: "0.9rem" }} />}
                        aria-label="Descargar CV"
                        sx={{
                          ml: 1.5,
                          fontSize: "0.78rem",
                          padding: "6px 16px",
                          borderColor: tokens.color.amber[500],
                          color: tokens.color.amber[500],
                          fontFamily: tokens.font.mono,
                          "&:hover": {
                            backgroundColor: alpha(
                              tokens.color.amber[500],
                              0.1,
                            ),
                            boxShadow: tokens.shadow.glow,
                            borderColor: tokens.color.amber[400],
                          },
                        }}
                      >
                        CV
                      </Button>
                    </motion.div>
                  </Box>
                </motion.div>
              )}

              {/* Mobile hamburger menu toggle (visible on small screens) */}
              {isMobile && (
                <motion.div variants={linkVariants}>
                  <IconButton
                    onClick={handleMobileToggle}
                    aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-drawer"
                    size="medium"
                    sx={{
                      color: tokens.color.amber[500],
                      border: `1px solid ${alpha(tokens.color.amber[500], 0.5)}`,
                      borderRadius: tokens.radius.sm,
                      padding: "6px",
                      backgroundColor: alpha(tokens.color.bg.base, 0.25),
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {mobileOpen ? (
                        <motion.div
                          key="close"
                          initial={{ rotate: -90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: 90, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          style={{ display: "flex" }}
                        >
                          <CloseIcon fontSize="small" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="menu"
                          initial={{ rotate: 90, opacity: 0 }}
                          animate={{ rotate: 0, opacity: 1 }}
                          exit={{ rotate: -90, opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          style={{ display: "flex" }}
                        >
                          <MenuIcon fontSize="small" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </IconButton>
                </motion.div>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </motion.div>

      {/* Sliding drawer menu for mobile navigation */}
      <Drawer
        id="mobile-drawer"
        anchor="right"
        open={mobileOpen}
        onClose={handleMobileToggle}
        aria-label="Menú de navegación mobile"
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { md: "none" },
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            backgroundColor: tokens.color.bg.surface,
            borderLeft: `1px solid ${tokens.color.border.subtle}`,
            backdropFilter: "blur(20px)",
            padding: "24px 16px",
          },
          "& .MuiBackdrop-root": {
            backgroundColor: alpha(tokens.color.bg.base, 0.7),
            backdropFilter: "blur(4px)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            sx={{
              fontFamily: tokens.font.display,
              fontSize: "1.3rem",
              color: tokens.color.text.primary,
            }}
          >
            <Box component="span" sx={{ color: tokens.color.amber[500] }}>
              &lt;
            </Box>
            AG
            <Box component="span" sx={{ color: tokens.color.amber[500] }}>
              /&gt;
            </Box>
          </Typography>
          <IconButton
            onClick={handleMobileToggle}
            aria-label="Cerrar menú"
            size="small"
            sx={{ color: tokens.color.text.muted }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 2 }} />

        <List disablePadding>
          {NAV_LINKS.map((link, idx) => {
            const isActive = activeSection === link.href;
            return (
              <motion.div
                key={link.href}
                initial={{ x: 30, opacity: 0 }}
                animate={
                  mobileOpen ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }
                }
                transition={{
                  duration: 0.3,
                  delay: mobileOpen ? idx * 0.06 : 0,
                  ease: "easeOut",
                }}
              >
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <ListItemButton
                    component="a"
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    aria-label={`Ir a ${link.label}`}
                    aria-current={isActive ? "true" : undefined}
                    sx={{
                      borderRadius: tokens.radius.sm,
                      py: 1.2,
                      px: 1.5,
                      backgroundColor: isActive
                        ? alpha(tokens.color.amber[500], 0.08)
                        : "transparent",
                      borderLeft: isActive
                        ? `2px solid ${tokens.color.amber[500]}`
                        : "2px solid transparent",
                      transition: `all ${tokens.transition.fast}`,
                      "&:hover": {
                        backgroundColor: alpha(tokens.color.amber[500], 0.06),
                        borderLeftColor: tokens.color.amber[500],
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        fontFamily: tokens.font.mono,
                        fontSize: "0.65rem",
                        color: tokens.color.amber[500],
                        mr: 1.5,
                        letterSpacing: "0.1em",
                        minWidth: "20px",
                      }}
                    >
                      {link.index}
                    </Typography>
                    <ListItemText
                      primary={link.label}
                      primaryTypographyProps={{
                        fontFamily: tokens.font.body,
                        fontSize: "0.95rem",
                        fontWeight: isActive ? 500 : 400,
                        color: isActive
                          ? tokens.color.amber[500]
                          : tokens.color.text.secondary,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </motion.div>
            );
          })}
        </List>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={mobileOpen ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ delay: NAV_LINKS.length * 0.06 + 0.1, duration: 0.3 }}
        >
          <Box sx={{ mt: 3, px: 1 }}>
            <Button
              component="a"
              href={personalInfo.cv}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              fullWidth
              startIcon={<DownloadIcon />}
              aria-label="Descargar CV"
              sx={{
                fontFamily: tokens.font.mono,
                fontSize: "0.8rem",
                borderColor: tokens.color.amber[500],
                color: tokens.color.amber[500],
                "&:hover": {
                  backgroundColor: alpha(tokens.color.amber[500], 0.1),
                  boxShadow: tokens.shadow.glow,
                },
              }}
            >
              Descargar CV
            </Button>
          </Box>
        </motion.div>

        <Box sx={{ mt: "auto", pt: 3, display: "flex", gap: 1, px: 1 }}>
          {[
            { href: personalInfo.github, label: "GitHub", text: "GH" },
            { href: personalInfo.linkedin, label: "LinkedIn", text: "LI" },
          ].map((s) => (
            <IconButton
              key={s.label}
              component="a"
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              size="small"
            >
              <Box
                component="span"
                sx={{
                  fontFamily: tokens.font.mono,
                  fontSize: "0.7rem",
                  color: tokens.color.text.muted,
                }}
              >
                {s.text}
              </Box>
            </IconButton>
          ))}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
