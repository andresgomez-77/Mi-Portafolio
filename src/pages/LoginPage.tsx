import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { adminStyles } from "../styles/adminStyles";
import { tokens } from "../theme/theme";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL ?? "http://localhost:3001"}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      if (!response.ok) {
        setError("Credenciales inválidas");
        return;
      }
      const data = (await response.json()) as { token: string };
      login(data.token);
      navigate("/admin");
    } catch {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: tokens.color.bg.base,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          p: 4,
          borderRadius: tokens.radius.lg,
          border: `1px solid ${tokens.color.border.default}`,
          backgroundColor: tokens.color.bg.surface,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        {/* Header */}
        <Box>
          <Typography
            sx={{
              fontFamily: tokens.font.mono,
              fontSize: "0.75rem",
              color: tokens.color.amber[500],
              mb: 0.5,
            }}
          >
            // admin.access
          </Typography>
          <Typography
            variant="h4"
            sx={{ color: tokens.color.text.primary, fontWeight: 700 }}
          >
            Panel Admin
          </Typography>
        </Box>

        {/* Error */}
        {error && <Alert severity="error">{error}</Alert>}

        {/* Campos */}
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />

        {/* Botón */}
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          fullWidth
          sx={adminStyles.button.primary}
        >
          {loading ? "Verificando..." : "Ingresar →"}
        </Button>
      </Box>
    </Box>
  );
};

export default LoginPage;
