import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import productCategory from "../utils/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/uploadImage";
import { IoCloseCircleOutline } from "react-icons/io5";
import DisplayProduct from "./DisplayProduct";
import { toast } from "react-toastify";
import SummaryApi from "../utils/SummaryApi";
const AdminEditProduct = ({ product, onClose }) => {
  console.log(product);

  const [data, setData] = useState({
    ...product,
    productName: product?.productName,
    brandName: product?.brandName,
    category: product?.category,
    productImages: product?.productImages || [],
    description: product?.description,
    price: product?.price,
    sellingPrice: product?.sellingPrice,
  });
  const [displayFullScreenImage, setDisplayFullScreenImage] = useState(false);
  const [fullScreenImage, setFullScreenImage] = useState();
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleImageUpload = async (event) => {
    console.log(event.target.files[0].name);
    const uploadImageCloudinary = await uploadImage(event.target.files[0]);
    setData({
      ...data,
      productImages: [...data.productImages, uploadImageCloudinary],
    });
  };
  const handleDelete = (event, index) => {
    event.stopPropagation();
    const newProductImages = [...data.productImages];
    newProductImages.splice(index, 1);
    setData({
      ...data,
      productImages: newProductImages,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      productName,
      brandName,
      category,
      productImages,
      description,
      price,
      sellingPrice,
    } = data;
    if (
      !productName ||
      !brandName ||
      !category ||
      !productImages ||
      !description ||
      !price ||
      !sellingPrice
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    const response = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    });
    const res = await response.json();
    if (res.success) {
      toast.success(res.message);
      onClose();
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="fixed w-full h-[100vh] flex items-center  justify-center top-0 left-0 right-0 bottom-0">
      <div className="w-full max-w-[35%] h-[80%] bg-white p-4 flex z-[999]">
        <div className="bg-white w-full flex flex-col">
          <div className="flex w-full pl-4 mb-4">
            <h1 className="font-bold text-lg">Edit Product</h1>
            <div className="ml-auto">
              <button
                onClick={() => {
                  onClose();
                }}
                className="text-2xl border p-1 rounded-lg hover:scale-105 shadow"
              >
                <IoMdClose />
              </button>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex overflow-y-scroll h-full max-h-[68vh] flex-col gap-4 px-4 "
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="">Product Name:</label>
              <input
                type="text"
                onChange={handleChange}
                value={data.productName}
                name="productName"
                className="bg-slate-100 py-2 px-2 rounded focus:outline-none"
                placeholder="Enter product name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Brand Name:</label>
              <input
                type="text"
                onChange={handleChange}
                value={data.brandName}
                name="brandName"
                className="bg-slate-100 py-2 px-2 rounded focus:outline-none"
                placeholder="Enter brand name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Category:</label>
              <select
                name="category"
                value={data.category}
                id=""
                className="bg-slate-100 py-2 px-2 rounded focus:outline-none capitalize"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {productCategory.map((category, index) => (
                  <option value={category.value} className="capitalize">
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Product Image:</label>
              <label htmlFor="uploadImage">
                <div className="bg-slate-100 py-2 text-slate-700 cursor-pointer px-2 rounded flex flex-col justify-center items-center focus:outline-none h-48">
                  <span className="">
                    <FaCloudUploadAlt className="text-3xl" />
                  </span>
                  <p className="">Upload Image</p>
                  <input
                    type="file"
                    className="hidden"
                    id="uploadImage"
                    onChange={handleImageUpload}
                  />
                </div>
              </label>
              {data.productImages.length > 0 && (
                <div className="py-3 flex gap-3 rounded">
                  {data.productImages.map((image, index) => (
                    <div
                      className="relative group cursor-move"
                      onClick={() => {
                        setDisplayFullScreenImage(true);
                        setFullScreenImage(image);
                      }}
                    >
                      <img
                        key={index}
                        src={image}
                        alt=""
                        className="object-contain w-28 rounded bg-slate-100"
                      />
                      <div
                        className="absolute top-0 right-0 m-1 border"
                        onClick={(event) => handleDelete(event, index)}
                      >
                        <IoCloseCircleOutline className="text-2xl text-red-500 group-hover:block cursor-pointer hidden" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {data.productImages.length === 0 && (
                <p className="text-red-500">* Please upload an image.</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Price:</label>
              <input
                type="number"
                onChange={handleChange}
                value={data.price}
                name="price"
                className="bg-slate-100 py-2 px-2 rounded focus:outline-none"
                placeholder="Enter product price"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Selling Price:</label>
              <input
                type="number"
                onChange={handleChange}
                value={data.sellingPrice}
                name="sellingPrice"
                className="bg-slate-100 py-2 px-2 rounded focus:outline-none"
                placeholder="Enter product selling price"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Description:</label>
              <textarea
                onChange={handleChange}
                rows={3}
                value={data.description}
                name="description"
                className="bg-slate-100 py-2 px-2 rounded focus:outline-none"
                placeholder="Enter product description"
              ></textarea>
            </div>
            <button className="bg-red-500 px-12 hover:scale-105 transition-all  duration-100 py-2 flex items-center rounded-lg justify-center text-white hover:bg-red-600 focus:outline-none">
              Update Product
            </button>
          </form>
          {displayFullScreenImage && (
            <DisplayProduct
              image={fullScreenImage}
              onClose={() => setDisplayFullScreenImage(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEditProduct;
