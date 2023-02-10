//import system
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";

//import libararies
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

//import src
import Dashboard from "../pages/dashboard";
import Layout from "./Layout";
import Products from "../pages/products";
import Users from "../pages/users";
import Materials from "../pages/materials";
import Offices from "../pages/offices";
import Cupons from "../pages/cupons";
import Settings from "../pages/settings";
import { themeSettings } from "../theme";
import { useSelector } from "react-redux";

function AppCenter() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/materials" element={<Materials />} />
              <Route path="/offices" element={<Offices />} />
              <Route path="/cupons" element={<Cupons />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default AppCenter;
