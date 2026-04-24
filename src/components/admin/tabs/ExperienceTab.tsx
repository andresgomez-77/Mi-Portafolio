import { Box, Typography } from "@mui/material";
import { tokens } from "../../../theme/theme";

export const ExperienceTab = () => {
  return (
    <Box>
      <Typography
        sx={{
          fontFamily: tokens.font.mono,
          color: tokens.color.amber[500],
          fontSize: "1.2rem",
          mb: 2,
        }}
      >
        // experience.manage
      </Typography>
      <Typography
        sx={{
          color: tokens.color.text.muted,
          fontSize: "0.9rem",
        }}
      >
        Gestión de experiencia — coming soon
      </Typography>
    </Box>
  );
};
