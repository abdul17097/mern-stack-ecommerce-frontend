import React, { useEffect, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import mobileIcon1 from "../assest/icons/mobileIcon1.png";
import { setProductDialog } from "../store/productSlice";
import { AiOutlineDashboard } from "react-icons/ai";
import { TbUsersGroup } from "react-icons/tb";
import { BiPurchaseTag } from "react-icons/bi";
import { IoCartOutline } from "react-icons/io5";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { CiLogin } from "react-icons/ci";
import { logoutUser } from "../store/userSlice";
const Sidebar = ({ sidebarToggle }) => {
  const { user } = useSelector((state) => state.user);
  const { productDialog } = useSelector((state) => state.product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const links = [
    {
      icon: <AiOutlineDashboard />,
      name: "Dashboard",
      url: "/dashboard",
      action: "",
    },
    {
      icon: <TbUsersGroup />,
      name: "Customers",
      url: "/dashboard/users",
      action: "",
    },
    {
      icon: <IoCartOutline />,
      name: "Products",
      url: "/dashboard/products",
      action: "",
    },
    {
      icon: <MdOutlineAddShoppingCart />,
      name: "Add Product",
      url: "",
      action: true,
    },
    {
      icon: <BiPurchaseTag />,
      name: "Orders",
      url: "",
      action: "",
    },
    {
      icon: <BiCategory />,
      name: "Categories & Brands",
      url: "/dashboard",
      action: "",
    },
  ];

  const handleLogout = async () => {
    dispatch(logoutUser());
    if (!user) {
      navigate("/");
    }
  };
  return (
    <div
      className={`w-full pb-2 lg:pb-4 fixed top-0 left-0 lg:relative flex flex-col justify-between  h-[100vh] transition-all ease-in-out duration-300 bg-white ${
        sidebarToggle
          ? "max-w-10  items-center lg:max-w-16"
          : "max-w-72 left-[0px]"
      }  pt-4 text-white`}
    >
      <div className="flex flex-col justify-between gap-10 py-4">
        <div className="flex flex-col items-center w-full relative">
          {sidebarToggle ? (
            <img src={mobileIcon1} alt="" className="w-8 h-8 " />
          ) : (
            <img src="/logo.webp" alt="" className="w-[100px] lg:w-[120px]" />
          )}
        </div>
        <ul
          className={`py-5 ${
            sidebarToggle ? "px-0 items-center" : "px-7"
          } flex justify-center pt-10 flex-col gap-3`}
        >
          {links?.map(({ icon, name, url, action }, index) => (
            <li key={index}>
              <Link
                to={url}
                onClick={() => {
                  action && dispatch(setProductDialog(true));
                }}
                className="px-4 group borders relative rounded hover:bg-[#845CF0] group: hover:text-white text-black py-2 flex items-center gap-4"
              >
                <div className="text-xl text-slate-600 group-hover:text-white">
                  {icon}
                </div>
                <span className={`${sidebarToggle ? "hidden" : "block"}`}>
                  {name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-full py-10">
        <ul
          className={`py-5 ${
            sidebarToggle ? "px-0 items-center" : "px-7"
          } flex justify-center pt-10 flex-col gap-3`}
        >
          <li>
            <Link
              to={""}
              onClick={() => {
                action && dispatch(setProductDialog(true));
              }}
              className="px-4 group borders relative rounded hover:bg-[#845CF0] group: hover:text-white text-black py-2 flex items-center gap-4"
            >
              <div className="text-xl text-slate-600 group-hover:text-white">
                <CiSettings />
              </div>
              <span className={`${sidebarToggle ? "hidden" : "block"}`}>
                Setting
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={""}
              onClick={() => {
                action && dispatch(setProductDialog(true));
              }}
              className="px-4 group borders relative rounded hover:bg-[#845CF0] group: hover:text-white text-black py-2 flex items-center gap-4"
            >
              <div
                onClick={handleLogout}
                className="text-xl text-slate-600 group-hover:text-white"
              >
                <CiLogin />
              </div>
              <span className={`${sidebarToggle ? "hidden" : "block"}`}>
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
