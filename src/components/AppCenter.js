//import system
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useMemo } from "react";

//import libararies
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

//import src
import Dashboard from "../pages/dashboard";
import Layout from "./common/Layout";
import { themeSettings } from "../theme";
import { useSelector } from "react-redux";
import Data from "./table/Data";
import products from "../data/products";
import cupons from "../data/cupons";
import materials from "../data/materials";
import offices from "../data/offices";
import users from "../data/users";
import Accounts from "../pages/accounts";
import Login from "../pages/login";
import { Product } from "./addNew/product";

function AppCenter() {
  const { mode, accessToken } = useSelector((state) => state.global);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  if (!accessToken) {
    return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/*" element={<Navigate to="/login" />} exact />
              <Route path="/login" element={<Login />} />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
  if (accessToken) {
    return (
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route element={<Layout />}>
                <Route path="/*" element={<Navigate to="/dashboard" />} exact />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Data value={products} />} />
                <Route path="/products/add" element={<Product />} />
                <Route path="/materials" element={<Data value={materials} />} />
                <Route path="/products/:productsId" element={<Product />} />
                <Route path="/offices" element={<Data value={offices} />} />
                <Route path="/products/:officeId" element={<Product />} />
                <Route path="/cupons" element={<Data value={cupons} />} />
                <Route path="/products/:cuponId" element={<Product />} />
                <Route path="/users" element={<Data value={users} />} />
                <Route path="/products/:userId" element={<Product />} />
                <Route path="/settings" element={<Accounts />} />
              </Route>
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    );
  }
}

export default AppCenter;
