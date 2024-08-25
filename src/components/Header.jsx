import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { HiUser } from "react-icons/hi";
import { CiShoppingCart } from "react-icons/ci";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import { IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../store/userSlice";
import { FaAngleDown } from "react-icons/fa";
export const Header = ({ role, setSidebarToggle, sidebarToggle }) => {
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const activeUrl = pathname.split("/").pop();
  const { user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [searchInput, setSearchInput] = useState("");
  const [isHeaderBlurred, setIsHeaderBlurred] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const history = useLocation();
  useEffect(() => {
    // if (user === null) {
    //   navigate("/");
    // }
    if (history.pathname !== "/search") {
      setSearchInput("");
    }
  }, [user, history]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsHeaderBlurred(true);
      } else {
        setIsHeaderBlurred(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
  }, []);
  const handleLogout = async () => {
    dispatch(logoutUser());
    if (!user) {
      navigate("/");
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    const searchQuery = e.target.value;
    if (searchQuery) {
      navigate(`/search?search=${searchQuery}`);
      setSearchInput(searchQuery);
      console.log(searchQuery);
    } else {
      navigate("/search");
      setSearchInput("");
    }
  };
  return (
    <header
      className={`h-16 md:h-20 ${
        role === "admin"
          ? "bg-white w-full px-8 border-b"
          : `bg-[#EEF0FC] w-full  shadow-md fixed top-0 z-[999] ${
              isHeaderBlurred &&
              "backdrop-filter backdrop-blur-lg bg-opacity-40"
            } `
      }`}
    >
      <div
        className={`h-full w-full relative flex justify-between container mx-auto items-center md:px-0 px-4 ${
          role === "admin" ? "px-7" : "md:px-10"
        }`}
      >
        <div className="w-full max-w-sm">
          {role === "admin" ? (
            <div className="flex items-center gap-5">
              <button
                onClick={() => setSidebarToggle(!sidebarToggle)}
                className="capitalize font-bold text-lg text-slate-700 focus:outline-none"
              >
                <RxHamburgerMenu className="text-xl" />
              </button>
              <h2 className="capitalize font-semibold">{activeUrl}</h2>
            </div>
          ) : (
            <Link to={"/"} className="flex items-center gap-1">
              <img src="/logo.webp" alt="" className="w-[100px] lg:w-[120px]" />
            </Link>
          )}
        </div>
        {user?.role === "general" && (
          <div
            className={`absolute top-20 left-0 w-full lg:relative lg:top-0 z-[999] ${
              searchToggle ? "flex transition-all" : "hidden"
            } lg:flex items-center justify-between lg:w-full hover:shadow  lg:max-w-lg pl-4 py-2 rounded-lg border bg-[#FFFFFF]`}
          >
            <input
              type="text"
              placeholder="I'm shopping for..."
              className="w-full bg-transparent focus:outline-none"
              value={searchInput}
              onChange={handleSearch}
            />
            <div className="text-3xl min-w-[50px] cursor-pointer h-8 border-l flex justify-center items-center rounded-r-full">
              <CiSearch />
            </div>
          </div>
        )}
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="lg:hidden">
            <div
              className="bg-white p-2 text-xl rounded-full"
              onClick={() => setSearchToggle(!searchToggle)}
            >
              <CiSearch />
            </div>
          </div>
          {user?.role === "general" && (
            <Link to={"/cart"} className="relative">
              <CiShoppingCart className="bg-white p-2 text-4xl rounded-full" />
              <div className="absolute top-[-10px] right-[-8px] bg-[#AE1C9A] rounded-full text-white w-5 h-5 flex justify-center items-center">
                <p className="text-xs">{cartItems?.length}</p>
              </div>
            </Link>
          )}
          <div
            className="relative flex justify-center items-center text-[#797979]"
            onClick={() => setMenuDisplay(!menuDisplay)}
          >
            {user?.profilePic ? (
              <div className="flex items-center gap-2">
                <img
                  src={user.profilePic}
                  alt=""
                  className="w-10 rounded-full h-10"
                />
                {/* <CiUser className="bg-white p-2 text-4xl rounded-full object-scale-down text-black" /> */}
                <p className="text-sm text-black font-semibold">{user.name}</p>
                <FaAngleDown />
              </div>
            ) : (
              <CiUser className="bg-white p-2 text-4xl rounded-full text-black" />
            )}
            {menuDisplay && (
              <div className="absolute z-[999] top-12 hover:text-slate-500 w-screen max-w-52 bg-white py-1 px-2 rounded transition-all duration-200 ease-in">
                <nav>
                  <div className="">
                    {user?.role === "admin" && (
                      <div className="flex items-center gap-1">
                        <CiUser className="bg-white p-2 text-4xl rounded-full text-black" />
                        <Link to="/dashboard" className="whitespace-nowrap ">
                          Dashboard
                        </Link>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-slate-400">
                      {user ? (
                        <>
                          <IoIosLogOut className="bg-white p-2 text-4xl rounded-full" />
                          <button
                            onClick={handleLogout}
                            className="whitespace-nowrap "
                          >
                            Logout
                          </button>
                        </>
                      ) : (
                        <>
                          <IoIosLogOut className="bg-white p-2 text-4xl rounded-full" />
                          <Link to={"/login"} className="whitespace-nowrap ">
                            Login
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                </nav>
              </div>
            )}
          </div>

          {/* <div className="">
            {user ? (
              <button
                className="border border-[#AE1C9A] text-[#AE1C9A] text-sm md:text-md py-1 px-2 md:px-4 md:py-1 flex items-center rounded-full hover:text-white hover:bg-[#AE1C9A] transition-all  focus:outline-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <Button text="Login" link="/login" />
            )}
          </div> */}
        </div>
      </div>
    </header>
  );
};
