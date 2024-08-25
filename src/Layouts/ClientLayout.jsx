import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

const ClientLayout = () => {
  return (
    <div className="pt-16">
      <Header />
      <main className="min-h-[calc(100vh-130px)]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
