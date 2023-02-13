//import system
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";

//import libararies
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

//import src
import Dashboard from "../pages/dashboard";
import Layout from "./Layout";
import Settings from "../pages/settings";
import { themeSettings } from "../theme";
import { useSelector } from "react-redux";
import Data from "./Data";
import products from "../data/products";
import cupons from "../data/cupons";
import materials from "../data/materials";
import offices from "../data/offices";
import users from "../data/users";

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
              <Route path="/products" element={<Data value={products} />} />
              <Route path="/materials" element={<Data value={materials} />} />
              <Route path="/offices" element={<Data value={offices} />} />
              <Route path="/cupons" element={<Data value={cupons} />} />
              <Route path="/users" element={<Data value={users} />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default AppCenter;
