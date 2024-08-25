import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SummaryApi from "../utils/SummaryApi";
import { debounce } from "lodash";
import displayCurrency from "../utils/displayCurrency";
import SearchProducts from "../components/SearchProducts";

const SearchProduct = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const { search } = useLocation();
  const [success, setSuccess] = useState(false);

  const searchData = async (query) => {
    setLoading(true);
    try {
      const response = await fetch(`${SummaryApi.searchProduct.url}${query}`, {
        method: SummaryApi.searchProduct.method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const apiResponse = await response.json();
      setProducts(apiResponse?.product || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  useEffect(() => {
    searchData(search);
  }, [search]);
  return (
    <div className="container mx-auto bg-[#F3E7F1]">
      {loading && (
        <div className="w-full flex justify-center h-[80vh] items-center">
          <p className="animate-pulse">Loading...</p>
        </div>
      )}
      {!loading && products?.length === 0 && (
        <div className="w-full flex justify-center h-[80vh] items-center">
          <p className="text-xl md:text-3xl text-red-500">No results found.</p>
        </div>
      )}
      {!loading && products?.length > 0 && (
        <div>
          {/* Render search results here */}
          <SearchProducts products={products} loading={loading} />
          {/* <div className="flex items-center md:grid md:grid-cols-4 flex-wrap  md:gap-5 gap-4   py-2 transition-all  scrollbar-none ">
            {products?.map((item, index) => (
              <Link
                to={`/product-detail/${item._id}`}
                key={index}
                className="w-full max-w-[270px]  shadow flex flex-col min-w-[270px] md:min-w-[340px] rounded  gap-3  border "
              >
                <div className=" bg-slate-200 w-full  p-3 h-[220px]">
                  <img
                    src={item.productImages[0]}
                    alt=""
                    className="w-full h-full hover:scale-105 transition-all object-scale-down mix-blend-multiply"
                  />
                </div>
                <div className="p-3 md:p-4  flex flex-col gap-1">
                  <h2 className=" font-semibold capitalize md:text-xl text-ellipsis line-clamp-1">
                    {item.productName}
                  </h2>
                  <p className="capitalize md:text-lg">{item.category}</p>
                  <div className="flex gap-3 md:gap-4  w-full ">
                    <p className="text-red-500 text-sm md:text-lg font-medium">
                      {displayCurrency(item.sellingPrice)}
                    </p>
                    <p className="line-through text-sm md:text-lg">
                      {displayCurrency(item.price)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleAddToCard(e, item._id)}
                    className="bg-red-500 mt-3 md:mt-3   py-2 px-4 text-sm md:text-lg  md:py-2 md:px-4 text-white rounded-full hover:bg-red-600 transition-all"
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
};

export default SearchProduct;
