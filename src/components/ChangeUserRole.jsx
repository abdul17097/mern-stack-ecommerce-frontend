import React, { useState } from "react";
import { ROLE } from "../utils/role";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import SummaryApi from "../utils/SummaryApi";
const ChangeUserRole = ({ userData, dialog, setDialog }) => {
  const [role, setRole] = useState(null);
  const { id, name, email } = userData && userData;
  const updateUserRole = async () => {
    const response = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role: role,
        userId: id,
      }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
    }
  };
  return (
    <div
      className={`absolute backdrop-blur-sm  top-0 w-full h-full ${
        dialog ? "flex" : "hidden"
      } justify-center items-center`}
    >
      <div className="p-4 flex flex-col gap-1 w-full max-w-sm bg-white rounded-lg shadow-lg">
        <div className="ml-auto">
          <button
            className="text-2xl border p-1 rounded-lg hover:scale-105 shadow"
            onClick={() => setDialog(false)}
          >
            <IoMdClose />
          </button>
        </div>
        <h1 className="font-bold pb-4 text-xl">Change User Role</h1>
        <p className="">Name: {name}</p>
        <p className="">Email: {email}</p>
        <div className="flex justify-between items-center my-3">
          <p className="">Role</p>
          <select
            name=""
            id=""
            className="w-[6rem]  p-1 rounded border shadow-lg capitalize focus:outline-none "
            onChange={(e) => setRole(e.target.value)}
          >
            <option
              className="capitalize p-1 rounded-lg focus:outline-none"
              disabled
            >
              Select
            </option>
            {Object.values(ROLE)?.map((role, index) => (
              <option
                className="capitalize p-1 rounded-lg focus:outline-none"
                key={index}
                value={role}
              >
                {role}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={updateUserRole}
          className="border w-fit m-auto rounded-3xl bg-red-500 shadow-lg hover:bg-red-600 text-white py-2 transition-all duration-100 ease-in px-5"
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
