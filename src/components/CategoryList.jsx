import React, { useEffect, useState } from "react";
import SummaryApi from "../utils/SummaryApi";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, setCategoryList } from "../store/productSlice";
const CategoryList = () => {
  // const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);
  const dispatch = useDispatch();
  const { categoryList } = useSelector((state) => state.product);
  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  return (
    <div className="container mx-auto py-5 w-full bg-[#F8F8F8]">
      <div className="flex w-full justify-between items-center py-8 ">
        <h1 className="text-2xl md:text-3xl font-bold font-sans  capitalize">
          Our Categories
        </h1>
        <Link to={`/category-product/?category=`} className="text-xl font-bold">
          View All
        </Link>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6  gap-5">
        {/* {loading &&
          categoryLoading?.map((_, index) => (
            <div
              key={index}
              className="w-16 h-16 md:w-20 md:h-20 p-4 bg-slate-200 animate-pulse rounded-full overflow-hidden"
            ></div>
          ))} */}
        {categoryList?.map((item, index) => (
          <Link
            to={`/category-product/?category=${item.category}`}
            className="flex flex-col gap-1 items-center cursor-pointer min-w-[9rem] py-8 max-w-[20rem] min-h-[4rem] max-h-[12rem] bg-[#F3E7F1] rounded-xl group hover:border hover:border-[#AE1C9A] transition-all"
            key={item.category}
          >
            <div className="w-full h-full min-w-[4rem] max-w-[9rem] min-h-[4rem] max-h-[6rem] px-2">
              <img
                src={item.productImages[0]}
                alt=""
                className="w-full group-hover:scale-125 transition-all h-full object-scale-down mix-blend-multiply"
              />
            </div>
            <p className="capitalize text-lg">{item?.category}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
