/**
 * Main portfolio page component.
 * Orchestrates all sections: hero, about, experience, skills, projects, education, and contact.
 */

import { Box } from "@mui/material";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import EducationSection from "../components/sections/EducationSection";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/layout/Footer";
/** Navbar height responsive breakpoints */
const NAVBAR_HEIGHT = { xs: "64px", md: "80px" };

/**
 * Layout wrapper for all sections with proper main content spacing.
 */
const HomePage = () => (
  <>
    <Navbar />
    <Box component="main" sx={{ paddingTop: NAVBAR_HEIGHT }}>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <EducationSection />
      <ContactSection />
      <Footer />
    </Box>
  </>
);

export default HomePage;
