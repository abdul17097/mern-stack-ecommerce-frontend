import React, { useEffect, useState } from "react";
import signin from "../assest/signin.gif";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../utils/SummaryApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../store/userSlice";
import { loginUser } from "../store/userSlice";

const Login = () => {
  const [eye, setEye] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { success, loading, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/dashboard");
    }
    console.log(user?.role);
    if (user?.role === "general") {
      navigate("/");
    }
  }, [user]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    if (!email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    dispatch(loginUser(data));
  };
  return (
    <div className="w-full flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm p-5 mx-2 gap-3 bg-white rounded-lg border shadow-lg"
      >
        <div className="m-auto">
          <img src={signin} alt="" className="rounded-full w-20 h-20" />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Email:</label>
          <input
            type="text"
            onChange={handleChange}
            value={data.email}
            name="email"
            className="bg-slate-100 p-2 rounded focus:outline-none"
            placeholder="enter email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Password:</label>
          <div className="flex justify-between bg-slate-100 p-2 rounded items-center">
            <input
              onChange={handleChange}
              value={data.password}
              name="password"
              type={eye ? "text" : "password"}
              className=" w-full bg-transparent focus:outline-none"
              placeholder="enter password"
            />
            <span className="cursor-pointer">
              {eye ? (
                <FaEyeSlash
                  className="text-xl text-slate-500"
                  onClick={() => setEye(!eye)}
                />
              ) : (
                <MdOutlineRemoveRedEye
                  className="text-xl text-slate-500"
                  onClick={() => setEye(!eye)}
                />
              )}
            </span>
          </div>
          <Link
            to="/forgot-password"
            className="flex justify-end text-[#AE1C9A] hover:text-[#AE1C9A] cursor-pointer hover:underline"
          >
            Forgot Password ?
          </Link>
        </div>
        <div className="m-auto my-4">
          <Button text={loading ? "Login..." : "Login"} />
        </div>
        <p className="">
          Don't have account?{" "}
          {
            <Link
              to="/sign-up"
              className="text-[#AE1C9A] hover:text-[#AE1C9A] hover:underline"
            >
              Sign up
            </Link>
          }
        </p>
      </form>
    </div>
  );
};

export default Login;
