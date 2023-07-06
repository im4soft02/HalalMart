import React, { useEffect, useState } from "react";
import { SidebarA } from "../../Component/Admin/SidebarA";
import { NavLink, useParams } from "react-router-dom";
// Icons
import { BsTrash } from "react-icons/bs";
import { MdReportGmailerrorred } from "react-icons/md";
import instance from "../../api/Instance";
import axios from "axios";
import Swal from "sweetalert2";
import { AiOutlineLike } from "react-icons/ai";

const Product = () => {
  //   const { id } = useParams();

  const [data, setData] = useState([]);

  //____________________API
  useEffect(() => {
    //
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/read",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data.data));
        setData(response.data.data);

        console.log(response.data.data);
        // console.log("data kontol");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //

  //   Handle Delete BTN
  const deleteB = (id) => {
    let config = {
      method: "post",
      url: `/delete/${id}`,
      headers: {
        // untuk mengambil token dari local storage
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    // ______________________END DELETE______________________

    instance
      .request(config)
      .then((response) => {
        console.log(response.data);
        // console.log(JSON.stringify(response.data));
        const newData = data.filter((item) => item.id !== id);
        setData(newData);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //

  //_____API ADD REKOMENDASI
  const AddRekomendasi = (id) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/tambah_rekomendasi/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil Tambah rekomendasi",
          showConfirmButton: false,
          timer: 1500,
        });
        
        console.log("berhasil di tambah ke rekomendasi");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-[100vh] flex flex-row overflow-hidden  bg-[#F2F7F9]">
      {/* Sidebar */}
      <div>
        <SidebarA />
      </div>
      {/* Tabel BG response */}
      <main className="w-full bg- flex flex-col overflow-hidden   bg-[#] m-5 ml-10 rounded-2xl gap-5">
        {/* Nama Page */}
        <div className="w-full h-[70px] py-2 bg-[#ffffff]  flex justify-between items-center px-5 rounded-2xl">
          <div className="w-full h-auto py-2 bg-[#]  ">
            <h1 className="text-[#9896A4] text-[23px] font-medium">Product</h1>
          </div>
        </div>
        {/* Konten product */}

        {/* _________Konten product_________ */}

        <main className="w-full h-full flex flex-col gap-5   overflow-x-hidden bg-[#ffffff] rounded-2xl p-5 scrollbar-thin scrollbar-track-[#d2ecff] scrollbar-thumb-[#E0C6F3] ">
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
            <div className="w-[35%] h-[60px] flex items-center justify-center bg- text-[#fffe] text-[20px] font-semibold ">
              Action
            </div>
          </div>
          {/* End Produk */}
          {/* Card produck Admin */}
          <div className="w-full h-full flex flex-col gap-5 overflow-x-hidden scrollbar-thin scrollbar-track-[#d2ecff] scrollbar-thumb-[#E0C6F3] bg-[#ffffff]  ">
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
                    {item.kategori_id}
                  </div>
                  <div className="w-[13%] h-[60px] flex items-center justify-center bg- text-[17px] text-[#537684] font-semibold ">
                    {item.stock}
                  </div>
                  <div className="w-[13%] h-[60px] flex items-center justify-center bg- text-[17px] text-[#537684] font-semibold ">
                    {item.harga}
                  </div>
                  <div className="w-[35%] h-[60px] flex items-center justify-center bg-[#] text-[17px] text-[#537684] font-semibold ">
                    <span className="w-full h-auto flex justify-evenly bg-[#] gap-3">
                      {/* Edit */}
                      <NavLink
                        to={`/Dashboard/EditWisata/${item.id}`}
                        className="w-[85px] h-auto bg-[#B9E8F2] hover:bg-[#98ebfd] py-1 px-4 rounded-[5px] text-center text-[15px] text-[#ffffff] font-semibold "
                      >
                        <h1>Edit</h1>
                      </NavLink>
                      {/* Delete */}
                      <button
                        onClick={() => deleteB(item.id)}
                        className="w-[85px] h-auto bg-[#FBCBDA] hover:bg-[#ffb2ca]  rounded-[5px]  text-[15px] text-[#ffffff] flex items-center justify-center font-semibold  hover:scale-2"
                      >
                        <BsTrash onClick={() => deleteB(item.id)} />
                      </button>
                      <button
                        onClick={() => AddRekomendasi(item.id)}
                        className="w-[85px] h-auto bg-[#FBE285] hover:bg-[#ffde69]  rounded-[5px]  text-[15px] text-[#ffffff] flex items-center justify-center font-semibold  hover:scale-2"
                      >
                        <AiOutlineLike
                          onClick={() => AddRekomendasi(item.id)}
                        />
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

export default Product;
