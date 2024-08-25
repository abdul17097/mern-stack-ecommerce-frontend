import React, { useEffect, useRef, useState } from "react";
import SummaryApi from "../utils/SummaryApi";
import displayCurrency from "../utils/displayCurrency";
import { GrNext, GrPrevious } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { MdOutlineStar } from "react-icons/md";
const HorizontalCardProduct = ({ category, heading, limit }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(6).fill(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const scrollElement = useRef();
  useEffect(() => {
    const fectchCategoryProduct = async () => {
      setLoading(true);
      const response = await fetch(SummaryApi.categoryProduct.url, {
        method: SummaryApi.categoryProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category, limit }),
      });
      const apiResponse = await response.json();
      setProduct(apiResponse.product);
      setLoading(false);
    };

    fectchCategoryProduct();
  }, []);
  const nextBtn = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const previousBtn = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  const handleAddToCard = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      const selectedCartItem = product?.filter((item) => item._id === id);
      dispatch(addToCart(selectedCartItem[0]));
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="container relative mx-auto py-10 bg-[#F3E7F1] bg-gradient-to-r from-[#FBD7E9] to-[#FFD7AB]">
      <div className="flex w-full justify-between items-center py-8 ">
        <h1 className="text-2xl md:text-3xl font-bold font-sans  capitalize">
          {heading}
        </h1>
        <Link
          to={`/category-product/?category=${category}`}
          className="text-xl font-bold"
        >
          View All
        </Link>
      </div>
      <div className="flex md:justify-between justify-center gap-8 flex-wrap overflow-hidden">
        {loading &&
          loadingList?.map((_, index) => (
            <div
              key={index}
              className="bg-white relative rounded-2xl  lg:py-5 lg:pl-5  flex flex-col lg:flex-row  lg:min-h-[210px] lg:max-h-[210px] lg:min-w-[420px] lg:max-w-[420px] min-h-[410px] max-h-[410px] min-w-[280px] max-w-[300px]"
            >
              <div className="h-full animate-pulse min-h-[280px] max-h-[280px]  lg:w-[180px] lg:min-h-full lg:max-h-full lg:bg-slate-200 border px-1 py-5 bg-slate-200 mb-2 rounded "></div>
              <div className="px-5 pt-0 lg:pt-3 relative lg:h-full lg:w-[calc(420px-180px)] lg:flex lg:flex-col lg:justify-center h-[calc(410px-280px)] ">
                <div className="flex py-1">
                  <span className=" py-2 lg:py-3 rounded animate-pulse bg-slate-200 px-16"></span>
                </div>
                <span className=" py-0 lg:py-3 rounded animate-pulse bg-slate-200 px-20"></span>
                <div className="text-lg pt-2 flex gap-4">
                  <span className=" py-3 lg:py-3 rounded animate-pulse bg-slate-200 px-7 lg:px-10"></span>
                  <span className=" py-3 lg:py-3 rounded animate-pulse bg-slate-200 px-7 lg:px-10"></span>
                </div>
              </div>
              <div className="flex justify-end items-end absolute bottom-0 right-0">
                <button className="rounded-br-2xl rounded-tl-[1.9rem] px-16 py-5 font-bold animate-pulse bg-slate-200 transition-all hover:text-white  delay-150 ease-in"></button>
              </div>
            </div>
          ))}
        {product?.map((product, index) => (
          <Link
            to={`/product-detail/${product._id}`}
            className="bg-white relative rounded-2xl hover:border hover:border-[#AE1C9A] lg:py-5 lg:pl-5 flex flex-col lg:flex-row  lg:min-h-[210px] lg:max-h-[210px] min-h-[410px] max-h-[410px] md:min-w-[200px] md:max-w-[350px] lg:min-w-[200px] lg:max-w-[300px] xl:min-w-[300px] xl:max-w-[450px]"
          >
            <div className="h-full min-h-[280px] rounded-t-2xl max-h-[280px]  lg:w-[180px] lg:min-h-full lg:max-h-full lg:bg-[#F9EDF7] px-1 py-5 bg-white ">
              <img
                src={product.productImages[0]}
                alt=""
                className="mix-blend-multiply object-scale-down w-full hover:scale-105 transition-all delay-75 ease-in h-full"
              />
            </div>
            <div className="px-5 pt-3 relative lg:h-full lg:w-[calc(420px-180px)] lg:flex lg:flex-col lg:justify-center h-[calc(410px-280px)] ">
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
              <div className="text-lg flex gap-4">
                <span className="line-through text-slate-400">$31.99</span>
                <span className="">$15.99</span>
              </div>
            </div>
            <div className="flex justify-end items-end absolute bottom-0 right-0">
              <button
                onClick={(e) => handleAddToCard(e, product._id)}
                className="rounded-br-2xl rounded-tl-[1.9rem] px-6 py-2 font-bold bg-[#F0D4EC] hover:bg-[#AE1C9A] text-[#AE1C9A] transition-all hover:text-white  delay-150 ease-in"
              >
                Add To Car
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* <div
        className="flex flex-wrap items-center  w-full  gap-1 md:gap-5  h-74 py-2 transition-all"
        ref={scrollElement}
      >
        <button
          onClick={previousBtn}
          className="bg-white absolute left-0 p-2 md:flex hidden rounded-full z-[999]"
        >
          <GrPrevious className="text-2xl" />
        </button>
        <button
          onClick={nextBtn}
          className="bg-white absolute right-0 p-2 md:flex hidden rounded-full z-[999]"
        >
          <GrNext className="text-2xl" />
        </button>
        {loading &&
          loadingList?.map((_, index) => (
            <div
              key={index}
              className="w-full  shadow flex min-w-[280px] md:min-w-[380px] rounded  h-36 md:h-[200px] border "
            >
              <div className="w-[170px] p-2 bg-slate-200 animate-pulse"></div>
              <div className="p-3 md:px-4 md:py-2 w-[calc(280px-120px)] border md:w-[calc(400px-170px)] md:gap-3 flex flex-col gap-1">
                <h2 className="bg-slate-200 py-3 md:py-5 rounded-md animate-pulse w-full"></h2>
                <p className="py-3 md:py-5 w-full bg-slate-200 animate-pulse"></p>
                <div className="flex gap-2 md:gap-4  w-full items-center ">
                  <p className="py-3 bg-slate-200  w-full animate-pulse"></p>
                  <p className="w-full bg-slate-200 py-3 animate-pulse"></p>
                </div>
                <div className="w-full m-auto">
                  <button className="  bg-slate-200 py-4 w-full px-4 animate-pulse md:px-5  md:py-5 text-white rounded-full transition-all"></button>
                </div>
              </div>
            </div>
          ))}
        {product?.map((item, index) => (
          <Link
            to={`/product-detail/${item._id}`}
            key={index}
            className="w-full shadow flex min-w-[280px] md:min-w-[380px] rounded h-36 md:h-[200px] border"
          >
            <div className="w-[170px] p-2 bg-slate-200">
              <img
                src={item.productImages[0]}
                alt=""
                className="w-full h-full hover:scale-110 transition-all object-scale-down mix-blend-multiply"
              />
            </div>
            <div className="p-3 md:px-4 md:py-2 w-[calc(280px-120px)] md:w-[calc(320px-170px)] md:gap-3  flex flex-col gap-1">
              <h2 className=" font-semibold md:text-xl text-ellipsis line-clamp-1">
                {item.productName}
              </h2>
              <p className="capitalize md:text-xl">{item.category}</p>
              <div className="flex gap-2 md:gap-4  w-full items-center ">
                <p className="text-red-500 text-xs md:text-lg font-medium">
                  {displayCurrency(item.sellingPrice)}
                </p>
                <p className="line-through text-xs md:text-md">
                  {displayCurrency(item.price)}
                </p>
              </div>
              <button
                onClick={(e) => handleAddToCard(e, item._id)}
                className="bg-red-500 md:mt-3 md:w-[170px] py-2 px-4 text-sm md:text-lg text-nowrap md:py-1 md:px-8 text-white rounded-full hover:bg-red-600 transition-all"
              >
                Add to Cart
              </button>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
};

export default HorizontalCardProduct;
