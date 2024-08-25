import React, { useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import displayCurrency from "../utils/displayCurrency";

import Carousel from "./Carousel";
const ProductBanner = () => {
  return (
    <div className="md:h-[90vh]  px-10 lg:px-20 border w-full flex gradient-color">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col items-start gap-14 md:py-20 py-10 col-span-1">
          <div className="">
            <span className="rounded bg-[#FFC728] py-1 px-2">
              Free Shipping - Order over {displayCurrency(15000000)}
            </span>
            <h2 class="weight-animation leading-loose text-3xl md:text-5xl lg:text-7xl ">
              <span className="text-5xl md:text-6xl font-semibold">
                Limited Time Offer!{" "}
              </span>
              <br className="hidden lg:block" />
              <span className="lg:text-8xl text-5xl text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">
                Up To 50% OFF
              </span>
            </h2>
          </div>
          <p className="text-xl">
            Introduced a new model for online grocery shopping and convenient
            home delivery.
          </p>
          <Link
            to={"/category-product"}
            className="border-2 border-[#AE1C9A] text-[#AE1C9A] hover:bg-[#AE1C9A] hover:text-white rounded transition-all px-4 py-2 "
          >
            Explore Store
          </Link>
        </div>
        <div className="md:h-[90vh] flex items-center px-10 col-span-1">
          <Carousel />
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;
