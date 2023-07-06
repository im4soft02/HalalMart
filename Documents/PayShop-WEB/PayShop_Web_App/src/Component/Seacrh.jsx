import React from "react";
import { HiSearch } from "react-icons/hi";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Seacrh = () => {
  return (
    <>
      {/* Bungkus search res */}
      <div>
        <div className="w-full sm:w-[100%] h-[40px] bg- flex justify-center  ">
          {/* Search Icon */}
          <span className="p-[10px] flex justify-center items-center bg-[#F2F7F9]  font-bold text-[15px] text-white rounded-l-[7px]">
            <HiSearch className="text-[20px] font-[20px] text-[#537684] " />
          </span>
          <input
            type="text"
            className="bg-[#F2F7F9] text-[#5b5b5b] w-[500%]  sm:w-[80%] h-full rounded-r-[7px] outline-none "
          />
        </div>
      </div>
    </>
  );
};

export default Seacrh;
