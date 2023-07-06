import React, { useEffect, useState } from "react";
// Image
import Jaket_keren from "../assets/Jaket_keren.jpg";
// Icon
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import instance from "../api/Instance";
import numeral from "numeral";

const Card = ({ id }) => {
  //   const { id } = useParams();
  //
  const [data, setData] = useState([]);

  //
  useEffect(() => {
    //
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/read_rekomendasi",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };

      instance
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setData(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, []);
  //

  return (
    <div className="w-full h-[270px] flex flex-row overflow-x-auto bg-[#] gap-[9px] scrollbar-thin scrollbar-track-[#d2ecff] scrollbar-thumb-[#E0C6F3] ">
      {data?.map((item) => {
        return (
          <NavLink
            key={item.id}
            to={`/Detail/${item.id}`}
            className=" min-w-[170px]  h-[250px] bg- rounded-[10px] flex flex-col justify-center  shadow-[0px_3px_10px_2px_rgba(0,0,0,0.1)] cursor-pointer hover:scale-[1.03] transition-[100ms]  "
          >
            {/* Img */}
            <div className="w-full h-[230px] bg-">
              <img
                className="w-[100%] h-[160px] rounded-t-[10px] "
                src={item.gambar}
                alt="gk ada"
              />
            </div>
            {/* Nama produk dan harga */}
            <div className="w-[100%]  h-full rounded-b-[10px] bg-white px-2  flex flex-col justify-evenly">
              <h1 className="text-[12px] font-semibold text-[#537684]">
                {item.nama}
              </h1>
              <h1 className="text-[15px] font-semibold text-[#cf8dff]">
                Rp. {numeral(item.harga).format("0,0")}
              </h1>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Card;
