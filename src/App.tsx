// src/App.tsx
// Este es el componente raíz — el "contenedor" de toda la aplicación.
// Aquí conectamos el tema de MUI y las rutas.

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme/theme";
import HomePage from "./pages/HomePage";

// ThemeProvider → aplica nuestro tema personalizado a TODOS los componentes MUI
// CssBaseline  → resetea los estilos del navegador (como un reset.css automático)
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HomePage />
    </ThemeProvider>
  );
};

export default App;
