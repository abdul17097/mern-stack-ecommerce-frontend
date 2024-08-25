import React, { useState, useRef } from "react";
import signin from "../assest/signin.gif";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaEyeSlash } from "react-icons/fa";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../utils/SummaryApi";
import { toast } from "react-toastify";
import uploadImage from "../utils/uploadImage";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  });
  const navigate = useNavigate();
  const picRef = useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleImageUpload = async (e) => {
    console.log(e.target.files[0]);
    setUploadLoading(true);
    const image = await uploadImage(e.target.files[0]);
    setData({ ...data, profilePic: image });
    setUploadLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword, profilePic } = data;
    if (!name || !email || !password || !confirmPassword || !profilePic) {
      toast.error("Please fill all the fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password should be Same");
      return;
    }
    const response = await fetch(SummaryApi.signup.url, {
      method: SummaryApi.signup.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
    if (result.success) {
      toast.success(result.message);
      navigate("/login");
    } else {
      toast.error(result.message);
    }
  };
  return (
    <div className="w-full flex justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm p-5 mx-2 gap-3 bg-white rounded-lg border shadow-lg"
      >
        <div className="m-auto ">
          <div className="relative w-20 h-20">
            {uploadLoading && (
              <div className="absolute w-full h-full flex justify-center font-semibold rounded-full items-center top-0 left-0 text-xs">
                Upload ...
              </div>
            )}
            <img
              src={data.profilePic ? data.profilePic : signin}
              alt=""
              onClick={() => picRef.current.click()}
              className="rounded-full w-full h-full shadow cursor-pointer object-fill z-[999]"
            />
            <input
              type="file"
              accept="image/*"
              hidden
              ref={picRef}
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Name:</label>
          <input
            type="text"
            onChange={handleChange}
            value={data.name}
            name="name"
            className="bg-slate-100 p-2 rounded focus:outline-none"
            placeholder="Enter Name"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Email:</label>
          <input
            type="text"
            onChange={handleChange}
            value={data.email}
            name="email"
            className="bg-slate-100 p-2 rounded focus:outline-none"
            placeholder="Enter Email"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Password:</label>
          <div className="flex justify-between bg-slate-100 p-2 rounded items-center">
            <input
              onChange={handleChange}
              value={data.password}
              name="password"
              type={showPassword ? "text" : "password"}
              className=" w-full bg-transparent focus:outline-none"
              placeholder="Enter Password"
            />
            <span className="cursor-pointer">
              {showPassword ? (
                <FaEyeSlash
                  className="text-xl text-slate-500"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <MdOutlineRemoveRedEye
                  className="text-xl text-slate-500"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Password:</label>
          <div className="flex justify-between bg-slate-100 p-2 rounded items-center">
            <input
              onChange={handleChange}
              value={data.confirmPassword}
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className=" w-full bg-transparent focus:outline-none"
              placeholder="Enter Confirm Password"
            />
            <span className="cursor-pointer">
              {showConfirmPassword ? (
                <FaEyeSlash
                  className="text-xl text-slate-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              ) : (
                <MdOutlineRemoveRedEye
                  className="text-xl text-slate-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                />
              )}
            </span>
          </div>
        </div>
        <div className="m-auto my-3">
          <Button text="Sign UP" />
        </div>
        <p className="">
          Already have account?{" "}
          {
            <Link
              to="/login"
              className="text-red-500 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          }
        </p>
      </form>
    </div>
  );
};

export default SignUp;
