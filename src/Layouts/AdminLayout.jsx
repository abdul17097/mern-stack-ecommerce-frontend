import React, { useState } from "react";
import { Header } from "../components/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import Login from "../pages/Login";
import { UploadProduct } from "../components/UploadProduct";

const AdminLayout = () => {
  const { user } = useSelector((state) => state.user);
  const { productDialog } = useSelector((state) => state.product);
  const [sidebarToggle, setSidebarToggle] = useState(false);
  return (
    <div className="flex">
      {user?.role === "admin" ? (
        <>
          <Sidebar sidebarToggle={sidebarToggle} />
          <div className="flex flex-col w-full">
            <Header
              role={"admin"}
              setSidebarToggle={setSidebarToggle}
              sidebarToggle={sidebarToggle}
            />
            <main className="p-7 bg-[#F4F2FF] h-[100vh]">
              <Outlet />
            </main>
            {productDialog && <UploadProduct />}
          </div>
        </>
      ) : (
        <div className="flex flex-col w-full">You Can't access admin panel</div>
      )}
    </div>
  );
};

export default AdminLayout;
