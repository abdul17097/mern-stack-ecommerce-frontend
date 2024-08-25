import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, color, link }) => {
  return link ? (
    <Link
      to="/login"
      className="bg-[#AE1C9A] px-4 py-1 flex items-center rounded-full text-white hover:bg-[#AE1C9A] focus:outline-none"
    >
      {text}
    </Link>
  ) : (
    <button className="bg-[#AE1C9A] px-12 hover:bg-transparent hover:text-[#AE1C9A] border hover:border-[#AE1C9A] transition-all duration-100 py-2 flex items-center rounded-full text-white hover:bg-[#AE1C9A] focus:outline-none">
      {text}
    </button>
  );
};

export default Button;
