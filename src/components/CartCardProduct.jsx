import React, { useState } from "react";
import displayCurrency from "../utils/displayCurrency";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
} from "../store/cartSlice";
const CartCardProduct = ({ product }) => {
  const dispatch = useDispatch();
  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };
  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };
  return (
    <div className="border relative flex h-full min-h-[120px] max-h-[130px] shadow">
      <button
        onClick={() => handleDelete(product?._id)}
        className="absolute top-0 right-0 p-1 transition-all border rounded-bl-xl hover:bg-[#AE1C9A] text-[#AE1C9A] hover:text-white"
      >
        <RxCross2 className="text-lg md:text-2xl cursor-pointer" />
      </button>
      <div className="flex  items-center p-2 w-32 bg-slate-200">
        <img
          src={product.productImages[0]}
          alt=""
          className="w-full h-full mix-blend-multiply object-scale-down"
        />
      </div>
      <div className="p-3 w-full grid md:grid-cols-2 gap-1">
        <div className="flex flex-col col-span-1">
          <h2 className="font-semibold line-clamp-1">{product.productName}</h2>
          <span className="text-sm capitalize md:text-md">
            {product.category}
          </span>
          <span className="">{displayCurrency(product.sellingPrice)}</span>
        </div>
        <div className="grid grid-cols-2  place-items-center  md:place-items-center col-span-1">
          <div className="flex md:flex-col w-full  md:gap-2">
            <label
              htmlFor=""
              className="hidden md:block font-semibold text-sm md:text-md"
            >
              Quantity
            </label>
            <div className="flex md:items-center ">
              <button
                onClick={() => handleDecrement(product._id)}
                className="border focus:outline-none border-[#AE1C9A] p-1 rounded hover:bg-[#AE1C9A] text-[#AE1C9A] transition-all hover:text-white"
              >
                <FaMinus className="" />
              </button>
              <span className="px-3">{product?.quantity}</span>
              <button
                onClick={() => handleIncrement(product._id)}
                className="border focus:outline-none border-[#AE1C9A] p-1 rounded text-white  hover:bg-slate-200 bg-[#AE1C9A] transition-all hover:text-[#AE1C9A]"
              >
                <FaPlus className="" />
              </button>
            </div>
          </div>
          <div className="flex flex-col pl-2 w-full">
            <label htmlFor="" className="font-semibold text-sm md:text-md ">
              Total
            </label>
            <span className=" text-sm lg:text-xl font-semibold">
              {displayCurrency(product.totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCardProduct;
