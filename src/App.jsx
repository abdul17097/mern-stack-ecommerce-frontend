import React, { useEffect } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import Footer from "./components/Footer";
import SummaryApi from "./utils/SummaryApi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import ClientLayout from "./Layouts/ClientLayout";
import AdminLayout from "./Layouts/AdminLayout";
import { Home } from "./pages/Home";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import AllProducts from "./pages/AllProducts";
import AllUsers from "./pages/AllUsers";
import CategoryProduct from "./pages/CategoryProduct";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import SearchProduct from "./pages/SearchProduct";

const App = () => {
  return (
    <>
      <Routes>
        {/* Client side Routes */}
        <Route path="/" element={<ClientLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/category-product" element={<CategoryProduct />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<SearchProduct />} />
        </Route>
        {/* Admin side Routes */}
        <Route path="/dashboard" element={<AdminLayout />}>
          <Route path="/dashboard/users" element={<AllUsers />} />
          <Route path="/dashboard/products" element={<AllProducts />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
