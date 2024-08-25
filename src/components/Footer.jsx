import React from "react";
import { Link } from "react-router-dom";
import { FaTwitter } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";

import { BsCart3 } from "react-icons/bs";
import { RiSecurePaymentFill } from "react-icons/ri";
import { GiTargetPrize } from "react-icons/gi";
import { GiReturnArrow } from "react-icons/gi";
import displayCurrency from "../utils/displayCurrency";
const Footer = () => {
  return (
    <footer className="relative md:px-24 text-white bg-[#292C38]">
      <div className="w-full translate-y-[-50px] lg:translate-y-[-40px] flex justify-center">
        <div className="bg-[#AE1C9A] mx-5 p-5 rounded grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
          <div className="flex items-center gap-4">
            <BsCart3 className="text-4xl" />
            <div>
              <h2 className="font-bold">Free Shipping</h2>
              <p className="font-thin">
                When ordering over {displayCurrency(100000)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GiReturnArrow className="text-4xl" />
            <div>
              <h2 className="font-bold">Free Return</h2>
              <p className="font-thin">Get Return within 30 days</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <RiSecurePaymentFill className="text-4xl" />
            <div>
              <h2 className="font-bold">Secure Payment</h2>
              <p className="font-thin">100% Secure Online Payment</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <GiTargetPrize className="text-4xl" />
            <div>
              <h2 className="font-bold">Best Quality</h2>
              <p className="font-thin">Original Product Guaranteed</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  py-20 pt-10 gap-10 md:flex-row w-full justify-between items-center ">
        <div className="">
          <img src="/footer-logo.webp" alt="" className="" />
        </div>
        <div className="flex gap-5">
          <Link
            to={""}
            className="text-2xl transition-all hover:text-[#AE1C9A]"
          >
            <FaTwitter />
          </Link>
          <Link
            to={""}
            className="text-2xl transition-all hover:text-[#AE1C9A]"
          >
            <FaFacebookF />
          </Link>
          <Link
            to={""}
            className="text-2xl transition-all hover:text-[#AE1C9A]"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            to={""}
            className="text-2xl transition-all hover:text-[#AE1C9A]"
          >
            <RiInstagramFill />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
