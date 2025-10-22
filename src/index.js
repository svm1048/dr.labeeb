import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Custom theme with your color palette
const theme = createTheme({
  palette: {
    primary: {
      main: "#ff69b4", // Pink
    },
    secondary: {
      main: "#00cba9", // Green
    },
    warning: {
      main: "#ff8c00", // Orange
    },
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
