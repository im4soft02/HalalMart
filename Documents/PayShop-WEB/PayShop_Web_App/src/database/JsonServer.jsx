import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Jaket_keren from "../assets/Jaket_keren.jpg";

export const JsonServer = () => {
  // untuk menampung data
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full h-auto flex gap-3">
      {data?.map((item, index) => {
        return (
          <NavLink
            key={index}
            to={"/Detail"}
            className=" w-[145px]  h-[200px] bg- rounded-[10px] flex flex-col justify-center  shadow-[0px_3px_10px_2px_rgba(0,0,0,0.1)] cursor-pointer hover:scale-[1.05] transition-[100ms]"
          >
            {/* Img */}
            <div>
              <img
                className="w-[145px] h-[140px] rounded-t-[10px] "
                src={item.image}
                alt="gk ada"
              />
            </div>
            {/* Nama produk dan harga */}
            <div className="w-[145px]  h-full rounded-b-[10px] bg-white px-2  flex flex-col justify-evenly">
              <h1 className="text-[12px] font-semibold text-gray-800">
                {item.name}
              </h1>
              <h1 className="text-[12px] font-semibold text-[#605AFF]">
                {item.price}
              </h1>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default JsonServer;
