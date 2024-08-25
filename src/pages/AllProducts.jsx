import React, { useEffect, useState } from "react";
import { UploadProduct } from "../components/UploadProduct";
import SummaryApi from "../utils/SummaryApi";
import AdminProductCard from "../components/AdminProductCard";
import { RiDeleteBin6Line } from "react-icons/ri";
import { fetchProduct, setProductDialog } from "../store/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import moment from "moment";

const AllProducts = () => {
  // const [productDialog, setProductDialog] = useState(false);
  // const [products, setAllProducts] = useState([]);
  const { products, productDialog } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct());
  }, [dispatch]);
  return (
    <div className="w-full flex flex-col relative h-full ">
      <div className="ml-auto p-3 bg-white w-full ">
        <button
          onClick={() => dispatch(setProductDialog(true))}
          className="px-5 text-lg hover:border-[#AE1C9A] hover:text-[#AE1C9A] ml-auto transition-all duration-100 py-2 flex items-center rounded border-2 border-[#AE1C9A] bg-[#AE1C9A] hover:bg-transparent focus:outline-none text-white font-semibold"
        >
          Add Product
        </button>
      </div>
      <div className="flex justify-between flex-wrap gap-y-4 overflow-y-scroll">
        {/* {products?.map((product, index) => (
          <AdminProductCard
            product={product}
            key={index}
            productDialog={productDialog}
          />
        ))} */}
        <table className="w-full userTable bg-white">
          <thead className="">
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created At</th>
            <th>Action</th>
          </thead>
          <tbody>
            {products?.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="text-ellipsis max-w-[12rem] border border-black line-clamp-1 uppercase">
                  {product.productName}
                </td>
                <td className="">name</td>
                <td className="uppercase">name</td>
                <td>{moment(product.updatedAt).format("l ")}</td>
                <td className="flex items-center">
                  <button className="">
                    <CiEdit className="text-2xl rounded-full p-1 cursor-pointer transition-all duration-100 ease-in hover:bg-green-500 hover:text-white" />
                  </button>
                  <button className="">
                    <RiDeleteBin6Line className="text-2xl rounded-full p-1 cursor-pointer transition-all duration-100 ease-in hover:bg-green-500 hover:text-white" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
