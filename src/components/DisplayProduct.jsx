import React from "react";
import { IoMdClose } from "react-icons/io";

const DisplayProduct = ({ onClose, image }) => {
  console.log(image);
  return (
    <div className="absolute top-0 left-0 bottom-0 right-0  flex justify-center items-center">
      <div className="w-full max-w-[40vw] h-full relative bg-white max-h-[80vh] border">
        <button
          onClick={onClose}
          className="text-2xl w-fit ml-auto absolute right-0 m-2 border p-1 rounded-lg hover:scale-105 shadow"
        >
          <IoMdClose />
        </button>
        <img src={image} alt="" className="w-full h-full object-fill" />
      </div>
    </div>
  );
};

export default DisplayProduct;
