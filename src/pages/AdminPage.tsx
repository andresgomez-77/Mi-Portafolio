import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, Typography, Button, Container } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { tokens } from "../theme/theme";
import { alpha } from "@mui/material/styles";
import { useAuth } from "../context/AuthContext";
import PrivateRoute from "../components/admin/PrivateRoute";
import { ProjectsTab } from "../components/admin/tabs/ProjectsTab";

// Tabs — los iremos reemplazando con componentes reales
const TABS = ["Projects", "Skills", "Experience", "Education"];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <PrivateRoute>
      <Box sx={{ minHeight: "100vh", backgroundColor: tokens.color.bg.base }}>
        {/* ── HEADER ────────────────────────────────────────────────── */}
        <Box
          sx={{
            borderBottom: `1px solid ${tokens.color.border.default}`,
            backgroundColor: tokens.color.bg.surface,
            px: { xs: 2, md: 4 },
            py: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Typography
              sx={{
                fontFamily: tokens.font.mono,
                fontSize: "0.7rem",
                color: tokens.color.amber[500],
              }}
            >
              // panel.admin
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: tokens.color.text.primary, fontWeight: 700 }}
            >
              Portfolio CMS
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.75rem",
              borderColor: tokens.color.border.default,
              color: tokens.color.text.secondary,
              "&:hover": {
                borderColor: "#ef4444",
                color: "#ef4444",
                backgroundColor: alpha("#ef4444", 0.06),
              },
            }}
          >
            Logout
          </Button>
        </Box>

        {/* ── TABS ──────────────────────────────────────────────────── */}
        <Box
          sx={{
            borderBottom: `1px solid ${tokens.color.border.default}`,
            backgroundColor: tokens.color.bg.surface,
            px: { xs: 2, md: 4 },
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            sx={{
              "& .MuiTab-root": {
                fontFamily: tokens.font.mono,
                fontSize: "0.8rem",
                color: tokens.color.text.muted,
              },
              "& .Mui-selected": {
                color: `${tokens.color.amber[500]} !important`,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: tokens.color.amber[500],
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab key={tab} label={tab} />
            ))}
          </Tabs>
        </Box>

        {/* ── CONTENIDO ─────────────────────────────────────────────── */}
        <Container maxWidth="xl" sx={{ py: 4 }}>
          {activeTab === 0 && <ProjectsTab />}
          {activeTab === 1 && (
            <Typography
              sx={{
                fontFamily: tokens.font.mono,
                color: tokens.color.text.muted,
              }}
            >
              // skills — coming soon
            </Typography>
          )}
          {activeTab === 2 && (
            <Typography
              sx={{
                fontFamily: tokens.font.mono,
                color: tokens.color.text.muted,
              }}
            >
              // experience — coming soon
            </Typography>
          )}
          {activeTab === 3 && (
            <Typography
              sx={{
                fontFamily: tokens.font.mono,
                color: tokens.color.text.muted,
              }}
            >
              // education — coming soon
            </Typography>
          )}
        </Container>
      </Box>
    </PrivateRoute>
  );
};

export default AdminPage;
