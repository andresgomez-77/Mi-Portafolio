import { Box, Typography, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { tokens } from "../../theme/theme";
import { alpha } from "@mui/material/styles";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: number;
  onTabChange: (tab: number) => void;
}

const TABS = ["Projects", "Skills", "Experience", "Education"];

export const AdminLayout = ({ children, activeTab, onTabChange }: AdminLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: tokens.color.bg.base }}>
      {/* Header */}
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

      {/* Tabs Navigation */}
      <Box
        sx={{
          borderBottom: `1px solid ${tokens.color.border.default}`,
          backgroundColor: tokens.color.bg.surface,
          px: { xs: 2, md: 4 },
        }}
      >
        <Box sx={{ display: "flex", gap: 1, overflow: "auto", py: 1 }}>
          {TABS.map((tab, index) => (
            <Button
              key={tab}
              onClick={() => onTabChange(index)}
              sx={{
                fontFamily: tokens.font.mono,
                fontSize: "0.8rem",
                color: activeTab === index ? tokens.color.amber[500] : tokens.color.text.muted,
                borderBottom: activeTab === index ? `2px solid ${tokens.color.amber[500]}` : "2px solid transparent",
                borderRadius: 0,
                whiteSpace: "nowrap",
                "&:hover": {
                  backgroundColor: alpha(tokens.color.amber[500], 0.1),
                },
              }}
            >
              {tab}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Content */}
      <Box sx={{ p: { xs: 2, md: 4 } }}>
        {children}
      </Box>
    </Box>
  );
};
