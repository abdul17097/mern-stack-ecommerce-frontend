import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../utils/SummaryApi";
import { FaStar, FaStarHalf } from "react-icons/fa6";
import { MdOutlineStar } from "react-icons/md";
import { useSelector } from "react-redux";
import displayCurrency from "../utils/displayCurrency";
import { BiSolidCategory } from "react-icons/bi";
const CategoryProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryList } = useSelector((state) => state.product);
  const url = new URLSearchParams(location.search);
  const urlCategoryListInArray = url.getAll("category");
  const urlCategoryListObject = {};
  urlCategoryListInArray.forEach((category) => {
    urlCategoryListObject[category] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterSelectedCategory, setFilterSelectedCategory] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterToggle, setFilterToggle] = useState(false);
  const loadingList = new Array(4).fill(null);

  const getFilterCategory = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.filterCategoryProduct.url, {
      method: SummaryApi.filterCategoryProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: filterSelectedCategory,
      }),
    });
    const data = await response.json();
    setLoading(false);

    setFilterProduct(data.product);
  };

  useEffect(() => {
    getFilterCategory();
  }, [filterSelectedCategory]);
  const handleCategory = (e) => {
    const { name, value, checked } = e.target;
    setSelectCategory({ ...selectCategory, [name]: checked });
  };
  useEffect(() => {
    const arrayOfCategories = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
      })
      .filter((el) => el);

    setFilterSelectedCategory(arrayOfCategories);
    const urlFormate = arrayOfCategories.map((el, index) => {
      if (arrayOfCategories.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });
    navigate(`/category-product/?${urlFormate.join("")}`);
  }, [selectCategory, navigate]);

  const handleSortProduct = (e) => {
    const { value } = e.target;
    console.log(value == "lowprice");
    if (value == "lowprice") {
      const productsAscending = [...filterProduct].sort(
        (a, b) => a.price - b.price
      );
      setFilterProduct(productsAscending);
    }

    if (value == "highprice") {
      const productsDescending = [...filterProduct].sort(
        (a, b) => b.price - a.price
      );
      setFilterProduct(productsDescending);
    }
  };
  return (
    <div className="container mx-auto border bg-[#f7f5f5] pb-20">
      <div
        className="cursor-pointer flex items-center gap-2 md:hidden rounded-lg bg-white py-3 px-3"
        onClick={() => setFilterToggle(!filterToggle)}
      >
        <BiSolidCategory className="text-4xl hover:border border-slate-300 rounded text-[#797979]" />
        <span className="text-lg  font-semibold text-[#AE1C9A]">Filter</span>
      </div>
      <div className="grid grid-cols-1 relative md:grid-cols-4 py-8 md:gap-2 lg:gap-8">
        <div
          className={`abosolute top-0 md:relative md:col-span-1 h-[80vh] ${
            filterToggle ? "flex" : "hidden"
          } bg-white rounded-lg md:py-8  px-6 gap-8 md:flex flex-col`}
        >
          <div className="flex flex-col gap-2">
            <h2 className="pb-5 capitalize text-sm font-bold md:text-xl text-black">
              Product Categories
            </h2>
            <div className="flex flex-col gap-5">
              {categoryList?.map((category, index) => (
                <div className="flex gap-4" key={index}>
                  <input
                    type="checkbox"
                    name={category.category}
                    value={category.category}
                    id=""
                    className="text-xl"
                    checked={selectCategory[category.category]}
                    onChange={handleCategory}
                  />
                  <span className="capitalize">{category.category} </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-3 flex flex-col gap-5 md:gap-4">
          <div className="flex justify-between bg-[#FFFFFF] py-8 px-3 md:px-6 rounded-lg text-sm">
            <div className="flex gap-2">
              <span className="font-semibold">Results:</span>
              {/* <span className="">1-16 of </span> */}
              <span className="">66 </span>
            </div>
            <div className="flex gap-2 items-center">
              <label htmlFor="" className="">
                Sort by:
              </label>
              <select
                className="px-2 border rounded py-1 focus:outline-none"
                onChange={handleSortProduct}
              >
                <option value="" disabled>
                  Default
                </option>
                <option value="lowprice">Low Price</option>
                <option value="highprice">High Price</option>
              </select>
            </div>
          </div>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-full min-h-[50vh] max-h-[80vh] scrollbar md:overflow-y-scroll ">
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
            {filterProduct?.map((product, index) => (
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
      </div>
    </div>
  );
};

export default CategoryProduct;
