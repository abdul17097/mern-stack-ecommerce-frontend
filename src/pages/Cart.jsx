import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartCardProduct from "../components/CartCardProduct";
import displayCurrency from "../utils/displayCurrency";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const Cart = () => {
  const { cartItems, totalPrice, totalQuantity } = useSelector(
    (state) => state.cart
  );
  console.log(totalQuantity);
  return (
    <div className="w-full container py-4 md:py-20 pb-20 px-2 md:px-12">
      {cartItems?.length === 0 ? (
        <div className="w-full flex items-center mt-20 justify-center">
          <div className="flex flex-col gap-5 justify-center items-center ">
            <Link
              to={"/"}
              className="text-xs lg:text-sm font-semibold border-2 lg:col-span-2 border-[#AE1C9A] w-fit lg:py-1 py-2 h-fit rounded whitespace-nowrap text-[#AE1C9A] hover:bg-[#AE1C9A] hover:text-white transition-all lg:px-2 px-2 flex items-center gap-2"
            >
              <FaArrowRight />
              <span className="">Shopping</span>
            </Link>
            <h1 className="text-3xl font-semibold">No items in Cart</h1>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10 ">
          <div className="col-span-2">
            <div className="flex w-full flex-col lg:grid lg:grid-cols-4 my-3 md:flex-row md:items-center ">
              <Link
                to={"/"}
                className="text-xs lg:text-sm font-semibold border-2 lg:col-span-2 border-[#AE1C9A] w-fit lg:py-1 py-2 h-fit rounded whitespace-nowrap text-[#AE1C9A] hover:bg-[#AE1C9A] hover:text-white transition-all lg:px-2 px-2 flex items-center gap-2"
              >
                <FaArrowRight />
                <span className="">Shopping</span>
              </Link>
              <div className="w-full flex justify-between lg:items-center lg:col-span-2 lg:justify-between my-3">
                <h1 className="text-lg lg:text-2xl font-semibold">
                  Shoping Cart
                </h1>
                <span className="text-lg font-semibold">
                  {cartItems?.length} Items
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {cartItems.map((product) => {
                return (
                  <div className="" key={product._id}>
                    <CartCardProduct product={product} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-2 lg:col-span-1 h-fit border shadow-lg rounded">
            <div className="flex w-full bg-[#AE1C9A] justify-center mb-10 ">
              <span className="px-4 py-2 lg:py-5 rounded lg:text-xl  text-white">
                ORDER SUMMARY
              </span>
            </div>
            <div className="px-4 py-3 flex flex-col gap-3">
              {/* <h2 className="text-lg font-semibold">ORDER SUMMARY</h2> */}
              <div className="flex justify-between">
                <label htmlFor="" className="text-lg font-semibold">
                  Total Quantity
                </label>
                <span className="text-lg font-semibold">{totalQuantity}</span>
              </div>
              <div className="flex justify-between">
                <label htmlFor="" className="text-lg font-semibold">
                  Total Price
                </label>
                <span className="text-lg font-semibold">
                  {displayCurrency(totalPrice)}
                </span>
              </div>
              <div className="border-[#AE1C9A] py-2 flex justify-center border-2 bg-slate-100 hover:bg-[#AE1C9A] rounded my-5  text-[#AE1C9A] hover:text-white">
                <button className="focus:outline-none font-semibold">
                  CHECKOUT NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
