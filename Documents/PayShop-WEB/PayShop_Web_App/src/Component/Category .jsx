import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiCookingPot } from "react-icons/gi";
import instance from "../api/Instance";
// import instance from "../api/Instance";

export const Category = () => {
  const [category, setCategory] = useState();

  // _________API KATEGORI
  useEffect(() => {
    //
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/read-kategori",
      headers: {},
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    //useEffects wajib di tutup dengan DEPEDENCI ' [] ' agar tidak looping,,dan muncul di mount atau render pertama kali saja
  }, []);

  return (
    <>
      <section className="w-full h-auto bg-[#E5F2FC] flex flex-col p-[20px] gap-4 rounded-[10px] ">
        <div className="bg-[#] w-full h-[30px]  ">
          <h1 className="text-[15px] font-medium sm:text-[17px] sm:font-semibold  text-[#537684]">
            Kategori Produk
          </h1>
        </div>
        {/* Bungkus Kategori */}
        <div className="w-full h-[70px] bg-[#] flex flex-row gap-3 py-2 overflow-x-auto scrollbar-thin scrollbar-track-[#d2ecff] scrollbar-thumb-[#E0C6F3]  ">
          {category?.map((item, index) => {
            return (
              <div
                key={index}
                className=" h-[30px] sm:h-[35px] md:h-[40px] lg:h-auto xl:h-[40px] bg-[#fefefe] rounded-[5px] sm:rounded-[7px]  lg:rounded-[11px]  flex justify-center items-center gap-2 px-2  shadow-[0px_3px_6px_2px_rgba(0,0,0,0.1)] min-w-[200px] cursor-pointer hover:scale-[1.03] transition-[200ms] "
              >
                <span className="">
                  <GiCookingPot className="text-[#fd5353]" />
                  <img src="" alt="" className="w-full h-auto" />
                </span>
                <h1 className="bg- text-[#412c2c] text-[13px]  sm:text-[15px]">
                  {item.nama}
                </h1>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Category;
