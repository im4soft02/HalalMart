import React, { useEffect, useState } from "react";
import { SidebarA } from "../../Component/Admin/SidebarA";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";
// Icons
import { BsTrash } from "react-icons/bs";
import { MdReportGmailerrorred } from "react-icons/md";
import instance from "../../api/Instance";
import axios from "axios";

const RekomendasiA = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [reko, setReko] = useState([]);

  //____________________API
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
        setData(response.data.rekomendasi);
        // setReko(response.data.rekomendasi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  //

  //   Handle Delete BTN
  const deleteR = (id) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/delete-rekomendasi/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
        Swal.fire("Sudah");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //

  return (
    <div className="w-full h-[100vh] flex flex-row overflow-hidden bg-[#F2F7F9]">
      {/* Sidebar */}
      <div>
        <SidebarA />
      </div>
      {/* Tabel BG response */}
      <main className="w-full bg- flex flex-col overflow-hidden  bg-[#] m-5 ml-10 rounded-2xl gap-5">
        {/* Nama Page */}
        <div className="w-full h-[70px] py-2 bg-[#ffffff]  flex justify-between items-center px-5 rounded-2xl">
          <div className="w-full h-auto py-2 bg-[#]  ">
            <h1 className="text-[#9896A4] text-[23px] font-medium">
              Rekomendasi
            </h1>
          </div>
        </div>
        {/* Konten product */}

        {/* _________Konten product_________ */}

        <main className="w-full h-full flex flex-col gap-5   overflow-x-hidden bg-[#ffffff] rounded-2xl p-5 ">
          {/* nama Product */}
          <div className="w-full h-[60px]  bg-[#DEC7F3] flex rounded-xl ">
            <div className="w-[6%] h-[60px] flex items-center justify-center bg- text-[#fffe] text-[20px] font-semibold ">
              No
            </div>
            <div className="w-[30%] h-[60px] flex items-center bg- text-[#fffe] text-[20px] font-semibold ">
              Nama Produk
            </div>
            <div className="w-[13%] h-[60px] flex items-center justify-center bg- text-[#fffe] text-[20px] font-semibold ">
              Kategori
            </div>
            <div className="w-[13%] h-[60px] flex items-center justify-center bg text-[#fffe] text-[20px] font-semibold ">
              Quantity
            </div>
            <div className="w-[13%] h-[60px] flex items-center justify-center bg text-[#fffe] text-[20px] font-semibold ">
              Harga
            </div>
            <div className="w-[25%] h-[60px] flex items-center justify-center bg- text-[#fffe] text-[20px] font-semibold ">
              Action
            </div>
          </div>
          {/* End Produk */}
          {/* Card produck Admin */}
          <div className="w-full h-full flex flex-col gap-5   overflow-x-hidden bg-[#ffffff]  ">
            {data?.map((item, asw) => {
              return (
                <nav
                  key={item.id}
                  className="w-full h-[60px] bg-[#F2F7F9] flex rounded-xl "
                >
                  <div className="w-[6%] h-[60px] flex items-center justify-center bg- text-[#537684] text-[17px] text-[#537684] font-semibold ">
                    {asw + 1}
                  </div>
                  <div className="w-[30%] h-[60px] flex items-center bg- text-[#537684] font-semibold text-[17px] text-[#537684] ">
                    {item.nama}
                  </div>
                  <div className="w-[13%] h-[60px] flex items-center justify-center bg text-[17px] text-[17px] text-[#537684] font-semibold ">
                    Kategori
                  </div>
                  <div className="w-[13%] h-[60px] flex items-center justify-center bg- text-[17px] text-[#537684] font-semibold ">
                    {item.stock}
                  </div>
                  <div className="w-[13%] h-[60px] flex items-center justify-center bg- text-[17px] text-[#537684] font-semibold ">
                    {item.harga}
                  </div>
                  <div className="w-[25%] h-[60px] flex items-center justify-center bg- text-[17px] text-[#537684] font-semibold ">
                    <span className="w-full h-auto flex justify-evenly bg-[#]">
                      {/* Delete */}
                      <button
                        onClick={() => deleteR(item.id)}
                        className="w-[70px] h-auto bg-[#B9E8F2] flex justify-center hover:bg-[#98ebfd] py-2  rounded-[5px] text-center text-[15px] text-[#ffffff] font-semibold "
                      >
                        <BsTrash onClick={() => deleteR(item.id)} />
                      </button>
                    </span>
                  </div>
                </nav>
              );
            })}
          </div>
          {/* End Card */}
        </main>
        {/* _________End Konten product_________ */}
      </main>
      {/* End */}
    </div>
  );
};

export default RekomendasiA;
