import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import { Login } from "./Page/Login";
import Register from "./Page/Register";
import Cart from "./Page/Cart";
import Detail from "./Page/Detail";
import MasterLayout from "./Page/admin/MasterLayout";
import { Dashboard } from "./Page/admin/Dashboard";
import Product from "./Page/admin/Product";
import AddProduct from "./Page/admin/AddProduct";
import EditProduct from "./Page/admin/EditProduct";
import Profile from "./Component/Profile";
import { Category } from "@mui/icons-material";
import AddCategoriesA from "./Page/admin/AddCategoriesA";
import { EditProfile } from "./Component/EditProfile";
import Rekomendasi from "./Component/Rekomendasi";
import RekomendasiA from "./Page/admin/RekomendasiA";
// import AdminPrivatRoute from "./Routes/AdminPrivatRoute";
// import Categories from "./Page/admin/CategoriesA";

const App = () => {
  return (
    <>
      {/* <h1>adadawdawdda</h1> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Profile/EditProfile" element={<EditProfile />} />
          <Route path="/Detail/:id" element={<Detail />} />
          <Route path="/MasterLayout" element={<MasterLayout />} />
          <Route path="/Dashboard/Home" element={<Dashboard />} />
          <Route path="/Dashboard/Product" element={<Product />} />
          <Route path="/Dashboard/AddProduct" element={<AddProduct />} />
          <Route path="/Dashboard/EditWisata/:id" element={<EditProduct />} />
          <Route
            path="/Dashboard/RekomendasiA/:id"
            element={<RekomendasiA />}
          />
          <Route
            path="/Dashboard/AddCategoriesA"
            element={<AddCategoriesA />}
          />
          <Route path="/Category" element={<Category />} />
          {/* <AdminPrivatRoute path="/admin/dashboard" element={<Dashboard />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
