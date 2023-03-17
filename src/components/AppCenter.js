//import system
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

//import libararies
import { CssBaseline } from "@mui/material";

//import src
import Layout from "./common/Layout";
import Products from "./table/products";
import Materials from "./table/materials";
import materials from "./table/materials/data";
import products from "./table/products/data";
import offices from "./table/offices/data";
import Login from "./login";
import { StoreContext } from "store";
import { AddProduct } from "./table/products/add";
import { AddOffice } from "./table/offices/add";
import Offices from "./table/offices";
import coupons from "./table/coupons/data";
import Accounts from "components/accounts";
import { AddMaterial } from "./table/materials/add";
import { AddCoupon } from "./table/coupons/add";
import Coupons from "./table/coupons";
import Menus from "./table/menus";
import AddMenu from "./table/menus/add";
import Staffers from "./table/staffers";
import staffers from "./table/staffers/data";
import { AddStaff } from "./table/staffers/add";
import Dashboard from "./dashboard";

function AppCenter() {
  const [state] = useContext(StoreContext);

  if (!state.accessToken) {
    return (
      <div className="app">
        <BrowserRouter>
          <CssBaseline />
          <Routes>
            <Route path="/*" element={<Navigate to="/login" />} exact />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  if (state.accessToken) {
    return (
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              {/* <Route path="/*" element={<Navigate to="/dashboard" />} exact />*/}
                <Route path="/dashboard" element={<Dashboard />} /> 
              <Route path="/*" element={<Navigate to="/settings" />} exact />
              <Route path="/menus" element={<Menus />} />
              <Route path="/menus/add" element={<AddMenu />} />
              <Route path="/products" element={<Products value={products} />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/stores" element={<Offices value={offices} />} />
              <Route path="/stores/add" element={<AddOffice />} />
              <Route
                path="/materials"
                element={<Materials value={materials} />}
              />
              <Route path="/materials/add" element={<AddMaterial />} />
              <Route path="/coupons" element={<Coupons value={coupons} />} />
              <Route path="/coupons/add" element={<AddCoupon />} />
              <Route path="/staffers" element={<Staffers value={staffers} />} />
              <Route path="/staffers/add" element={<AddStaff />} />
              <Route path="/settings" element={<Accounts />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default AppCenter;
