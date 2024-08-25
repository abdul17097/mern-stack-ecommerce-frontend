import React, { useEffect, useRef, useState } from "react";
import SummaryApi from "../utils/SummaryApi";
import displayCurrency from "../utils/displayCurrency";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link } from "react-router-dom";
import { addToCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";
import { MdOutlineStar } from "react-icons/md";
const SearchProducts = ({ products, loading }) => {
  const loadingList = new Array(10).fill(null);
  const dispatch = useDispatch();
  const scrollElement = useRef();
  const handleAddToCard = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    const selectedCartItem = products?.filter((item) => item._id === id);
    dispatch(addToCart(selectedCartItem[0]));
  };
  return (
    <div className="container relative mx-auto py-6 pb-20">
      <h1 className="text-2xl font-semibold capitalize mb-5">
        Search Results : {products?.length}
      </h1>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {loading &&
          loadingList?.map((_, index) => (
            <div
              className="bg-[#FFFFFF] rounded-2xl overflow-hidden  w-full min-h-[410px] max-h-[410px] 
            md:min-w-[200px] md:max-w-[350px]"
            >
              <div className="h-full min-h-[280px] rounded-t-2xl max-h-[280px] px-1 py-5 bg-slate-200 animate-pulses"></div>
              <div className="px-5 pt-1 relative  h-[calc(410px-280px)] ">
                <div className="flex py-3 px-16 rounded animate-pulse w-fit bg-slate-200"></div>
                <h2 className="py-3 px-28 rounded animate-pulse w-fit bg-slate-200 my-1 "></h2>
                <div className="text-lg flex gap-2">
                  <span className="py-3 px-10 rounded animate-pulse w-fit bg-slate-200"></span>
                  <span className="py-3 px-10 rounded animate-pulse w-fit bg-slate-200"></span>
                </div>
                <div className="flex justify-end items-end absolute bottom-0 right-0">
                  <button className="rounded-br-2xl rounded-tl-[1.9rem] font-bold bg-slate-200 hover:bg-[#AE1C9A] px-20 py-5 animate-pulse"></button>
                </div>
              </div>
            </div>
          ))}
        {products?.map((product, index) => (
          <Link
            to={`/product-detail/${product._id}`}
            className="bg-[#FFFFFF] rounded-2xl overflow-hidden w-full min-h-[410px] max-h-[410px] 
            md:min-w-[200px] md:max-w-[350px]"
          >
            <div className="h-full min-h-[280px] rounded-t-2xl max-h-[280px] px-1 py-5 bg-white ">
              <img
                src={product.productImages[0]}
                alt=""
                className="mix-blend-multiply  object-scale-down w-full hover:scale-105 transition-all delay-75 ease-in h-full"
              />
            </div>
            <div className="px-5 pt-1 relative  h-[calc(410px-280px)] ">
              <div className="flex py-1">
                <MdOutlineStar className="text text-[#FFA800]" />
                <MdOutlineStar className="text text-[#FFA800]" />
                <MdOutlineStar className="text text-[#FFA800]" />
                <MdOutlineStar className="text text-[#FFA800]" />
                <MdOutlineStar className="text text-[#FFA800]" />
              </div>
              <h2 className="font-semibold capitalize text-lg text-ellipsis line-clamp-1 ">
                {product?.productName}
              </h2>
              <div className="text-lg flex gap-2">
                <span className="line-through text-slate-400">
                  {displayCurrency(product.price)}
                </span>
                <span className="">
                  {displayCurrency(product.sellingPrice)}
                </span>
              </div>
              <div className="flex justify-end items-end absolute bottom-0 right-0">
                <button
                  onClick={(e) => handleAddToCard(e, product._id)}
                  className="rounded-br-2xl rounded-tl-[1.9rem] px-6 py-2 font-bold bg-[#F0D4EC] hover:bg-[#AE1C9A] text-[#AE1C9A] transition-all hover:text-white  delay-150 ease-in"
                >
                  Add To Car
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchProducts;
