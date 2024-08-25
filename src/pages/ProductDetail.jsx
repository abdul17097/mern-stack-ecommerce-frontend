import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../utils/SummaryApi";

import displayCurrency from "../utils/displayCurrency";
import { MdDiscount, MdOutlineStar } from "react-icons/md";
import { TbBrandBeats } from "react-icons/tb";
import { BiSolidCategoryAlt } from "react-icons/bi";
import VerticalCardProduct from "../components/VerticalCardProduct";
import { addToCart } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
const ProductDetail = () => {
  const [product, setProduct] = useState({ category: "", productImages: [] });
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState(product?.productImages[0]);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });
  const [showZoomImage, setShowZoomImage] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.getSingleProduct.url, {
      method: SummaryApi.getSingleProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: id,
      }),
    });
    const data = await response.json();
    if (data.success) {
      setProduct(data.product);
      setLoading(false);
      setActiveImage(data.product.productImages[0]);
    }
  };
  useEffect(() => {
    fetchData();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [id]);

  const price = product?.price || 0;
  const sellingPrice = product?.sellingPrice || 0;
  const discount = ((price - sellingPrice) / price) * 100;
  const handleZoomImage = useCallback(
    (e) => {
      const { left, width, top, height } = e.target.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({
        x,
        y,
      });
      setShowZoomImage(true);
    },
    [zoomImageCoordinate]
  );
  const handleAddToCart = () => {
    if (user) {
      dispatch(addToCart(product));
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="relative py-6 md:py-20   scroll-smooth">
      <div className="flex flex-col container mx-auto lg:flex-row gap-20">
        <div className="flex flex-col lg:flex-row  gap-20">
          {loading ? (
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              <div className="flex flex-row lg:flex-col  gap-3">
                <div className="w-20 h-20 bg-slate-200 animate-pulse "></div>
                <div className="w-20 h-20 bg-slate-200 animate-pulse "></div>
                <div className="w-20 h-20 bg-slate-200 animate-pulse "></div>
                <div className="w-20 h-20 bg-slate-200 animate-pulse "></div>
              </div>
              <div className="bg-slate-200 h-[200px] max-w-96 lg:h-96 lg:w-96">
                <img
                  src=""
                  className="w-full h-full mix-blend-multiply object-scale-down"
                  alt=""
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col-reverse lg:flex-row gap-4">
              <div className="flex flex-row lg:flex-col gap-3">
                {product?.productImages.map((imageUrl, index) => (
                  <div className="w-20 h-20 bg-slate-200" key={index}>
                    <img
                      src={imageUrl}
                      className="w-full h-full mix-blend-multiply object-scale-down cursor-pointer"
                      alt=""
                      onClick={() => setActiveImage(imageUrl)}
                      onMouseEnter={() => setActiveImage(imageUrl)}
                    />
                  </div>
                ))}
              </div>
              <div className="relative">
                <div
                  className="bg-slate-200 h-[300px] max-w-96 lg:h-96 lg:w-96"
                  onMouseMove={(e) => handleZoomImage(e)}
                  onMouseLeave={() => setShowZoomImage(false)}
                >
                  <img
                    src={activeImage}
                    className="w-full h-full mix-blend-multiply object-scale-down"
                    alt=""
                  />
                </div>
                {showZoomImage && (
                  <div className="absolute top-4 left-[400px] overflow-hidden hidden md:block bg-slate-200 h-[300px] max-w-96 min-h-[300px] lg:h-96 lg:w-96">
                    <div
                      className="w-full h-full mix-blend-multiply object-scale-down scale-150"
                      style={{
                        backgroundImage: `url(${activeImage})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                          zoomImageCoordinate.y * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {loading ? (
          <div className=" w-full max-w-[550px] py-4 flex flex-col gap-1">
            <div className="flex justify-between gap-4">
              <div className="flex items-center  text-white bg-slate-200 py-4 rounded-md px-20 animate-pulse"></div>
              <div className="flex w-full max-w-[150px] items-end bg-slate-200 py-4 rounded-md px-18 animate-pulse "></div>
            </div>
            <div className="flex justify-between gap-3">
              <div className="bg-slate-200 py-4 rounded-md px-20 animate-pulse"></div>
              <div className="w-full flex   max-w-[150px] bg-slate-200 py-4  animate-pulse rounded-md px-18"></div>
            </div>

            <div className="flex gap-20 my-2 ">
              <div className="flex items-center gap-2 w-48 bg-slate-200 py-4 rounded-md px-18 animate-pulse"></div>
              <div className="flex items-center gap-2 w-48 bg-slate-200 py-4 rounded-md px-18 animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p className="font-bold w-48 bg-slate-200 py-4 rounded-md px-18 animate-pulse"></p>
              <div className="flex gap-1 w-28 bg-slate-200 py-4 rounded-md px-18 animate-pulse"></div>
            </div>
            <div className="flex gap-4 my-3">
              <button className="w-48 bg-slate-200 py-6 rounded-md px-18 animate-pulse "></button>
              <button className="w-48 bg-slate-200 py-6 rounded-md px-18 animate-pulse "></button>
            </div>
            <div className="flex flex-col gap-2 ">
              <h2 className="text-xl font-bold w-48 bg-slate-200 py-4 rounded-md px-18 animate-pulse"></h2>
              <p className="w-full bg-slate-200 py-4 rounded-md px-18 animate-pulse"></p>
              <p className="w-full bg-slate-200 py-4 rounded-md px-18 animate-pulse"></p>
              <p className="w-full bg-slate-200 py-4 rounded-md px-18 animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className=" w-full max-w-[550px] py-4 flex flex-col gap-1">
            <div className="flex justify-between">
              <div className="flex items-center bg-[#d03dbd] px-3 rounded-full gap-1 py-1 text-white">
                <MdDiscount />
                <span className="text-sm ">{Math.floor(discount)} OFF</span>
              </div>
              <div className="flex w-full max-w-[150px] items-end ">
                <span className="line-through text-sm font-semibold   text-slate-500">
                  {displayCurrency(product?.price)}
                </span>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="max-w-[300px]">
                <h1 className="text-xl lg:text-2xl font-bold line-clamp-3 w-full capitalize  text-ellipsis">
                  {product?.productName}
                </h1>
              </div>
              <div className="w-full flex   max-w-[150px]">
                <span className="text-xl font-bold">
                  {displayCurrency(product?.sellingPrice)}
                </span>
              </div>
            </div>

            <div className="flex gap-20 my-2 ">
              <div className="flex items-center gap-2">
                <BiSolidCategoryAlt className="text-xl" />
                <span className="capitalize text-slate-700 font-semibold">
                  Category -- {product?.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TbBrandBeats className="text-xl" />
                <span className="capitalize font-semibold text-slate-700 ">
                  Brand -- {product?.brandName}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 my-2">
              <p className="font-bold">Rating</p>
              <div className="flex py-1">
                <MdOutlineStar className="text text-[#FFA800]" />
                <MdOutlineStar className="text text-[#FFA800]" />
                <MdOutlineStar className="text text-[#FFA800]" />
                <MdOutlineStar className="text text-[#FFA800]" />
                <MdOutlineStar className="text text-[#FFA800]" />
              </div>
            </div>
            <div className="flex gap-4 my-3">
              <button className="border-2 hover:bg-[#AE1C9A] hover:text-white transition-all border-[#AE1C9A] text-[#AE1C9A] min-w-[100px] w-full max-w-[120px] md:min-w-[150px] py-2 px-3 rounded md:max-w-[200px] font-semibold  focus:outline-none md:text-lg ">
                Buy
              </button>
              <button
                onClick={() => handleAddToCart(product?._id)}
                className="bg-[#AE1C9A] hover:bg-white hover:text-[#AE1C9A] transition-all border-2 border-[#AE1C9A] text-white w-full  max-w-[120px] min-w-[100px] md:min-w-[150px] py-2 px-3 rounded md:max-w-[200px] font-semibold  focus:outline-none md:text-lg "
              >
                Add To Cart
              </button>
            </div>
            <div className="flex flex-col gap-2 ">
              <h2 className="text-xl font-bold">Description:</h2>
              <p className="text-justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reiciendis dolore qui voluptas magni dolorem. Tempora quo
                perspiciatis sunt vel sapiente dolorem, ipsa tempore at rerum
                voluptatem, quidem rem consequatur! Adipisci.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="my-10 w-full ">
        {product.category && (
          <VerticalCardProduct
            category={product?.category}
            heading={"Recommended Product"}
            limit={4}
          />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
