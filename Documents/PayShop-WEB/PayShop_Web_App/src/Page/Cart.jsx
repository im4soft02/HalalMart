import React, { useEffect, useState } from "react";
// Img
import Jaket_keren from "../assets/Jaket_keren.jpg";
// Component
// Icons
import { IoIosArrowBack } from "react-icons/io";

import NavBar_PayShop from "../Component/NavBar_PayShop";
import { Footer } from "../Component/Footer";
import { NavLink, useParams } from "react-router-dom";
import CartProduct from "../Component/CartProduct";
import axios from "axios";
import instance from "../api/Instance";
import { teal } from "@mui/material/colors";
import Swal from "sweetalert2/dist/sweetalert2.js";
import numeral from "numeral";
import { BsTrash } from "react-icons/bs";

const Cart = () => {
  const { id } = useParams();
  const [jumlah_pesanan, setJumlahPesanan] = useState(1);
  const [jumlah_Harga, setJumlah_Harga] = useState([]);
  const [harga, setHarga] = useState([]);
  const [total_harga, setTotal_harga] = useState([]);
  const [total_hargaX, setTotal_hargaX] = useState([]);
  const [stock, setStock] = useState([]);
  const [data, setData] = useState([]);
  const [Id, setId] = useState([]);

  // Quantity Increment/Decrement in Hooks - Start
  //   const HandleIncrement = (e) => {
  //     if (jumlah_pesanan < stock) {
  //       setJumlahPesanan(jumlah_pesanan + 1);
  //       const tambahTotalHarga = (jumlah_pesanan + 1) * harga;
  //       setTotal_harga(tambahTotalHarga);
  //     } else {
  //       setJumlahPesanan(stock);
  //       const tambahTotalHarga = stock * total_harga;
  //       setTotal_harga(tambahTotalHarga);
  //     }
  //   };

  //   const HandleDecrement = () => {
  //     // if disini saat quantity  1  maka tidak bisa di kurang lagi jdi tidak akan minus
  //     // jumlah_pesanan > 1
  //     //   ? setJumlahPesanan(jumlah_pesanan - 1)
  //     //   : setJumlahPesanan(1);
  //     if (jumlah_pesanan > 1) {
  //       setJumlahPesanan(jumlah_pesanan - 1);
  //       const kurangTotalHarga = (jumlah_pesanan - 1) * harga;
  //       setTotal_harga(kurangTotalHarga);
  //     } else {
  //       setJumlahPesanan(1);
  //       const kurangTotalHarga = stock * total_harga;
  //       setTotal_harga(kurangTotalHarga);
  //     }
  //   };

  //   useEffect(() => {
  //     localStorage.setItem("jumlah_pesanan", jumlah_pesanan);
  //     localStorage.setItem("total_harga", total_harga);
  //   }, [jumlah_pesanan, total_harga]);

  //______coba
  //   const HandleDecrement = (card_id) => {
  //     setData((data) =>
  //       data.map((item, indx) =>
  //         card_id === item.id ? { ...item, jumlah: item.jumlah - 1 } : item.stock
  //       )
  //     );
  //   };

  //   const HandleIncrement = (card_id) => {
  //     setData((data) =>
  //       data.map((item) =>
  //         card_id === item.id ? { ...item, jumlah: item.jumlah + 1 } : item.stock
  //       )
  //     );
  //   };
  //

  // _________________API

  //
  useEffect(() => {
    //
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/keranjang`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        // console.log(response.data.pesanan);
        setJumlah_Harga(response.data.pesanan.jumlah_harga);
        setData(response.data.pesanan_details);
        // setID(response.data.pesanan_details);
        // setJumlahPesanan(response.data.pesanan_details[0].jumlah);
        // setStock(response.data.pesanan_details[0].stock);
        // setTotal_harga(response.data.pesanan_details[0].total_harga);
        // setHarga(response.data.pesanan_details[0].harga);
        setId(response.data.pesanan_details.map((item) => ["id :", item.id]));

        // console.log(response.data.pesanan_details[0].jumlah);
        // console.log(response.data.pesanan_details[1].stock);
        // console.log("SEMUA PRODUK KERANJANG");
        // console.log(response.data.produk);
        // setProduk(response.data.produk);

        // console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [data]);

  //   _________HANYA QUANTITY________
  // Quantity Increment/Decrement in Hooks - Start
  //   const HandleIncrement = (card_id) => {
  //     setData((data) =>
  //       data.map((item) =>
  //         card_id === item.id && item.jumlah < item.stock
  //           ? { ...item, jumlah: item.jumlah + 1 }
  //           : item
  //       )
  //     );
  //   };

  //   const HandleDecrement = (card_id) => {
  //     // if disini saat quantity  1  maka tidak bisa di kurang lagi jdi tidak akan minus
  //     // jumlah_pesanan > 1
  //     //   ? setJumlahPesanan(jumlah_pesanan - 1)
  //     //   : setJumlahPesanan(1);
  //     setData((data) =>
  //       data.map((item) =>
  //         card_id === item.id && item.jumlah > 1
  //           ? { ...item, jumlah: item.jumlah - 1 }
  //           : item
  //       )
  //     );
  //   };

  const HandleIncrement = (card_id, increase) => {
    setData((data) =>
      data.map((item) =>
        card_id === item.id &&
        ((increase && item.jumlah < item.stock) ||
          (!increase && item.jumlah > 0))
          ? {
              ...item,
              jumlah: increase ? item.jumlah + 1 : item.jumlah - 1,
              total_harga: increase
                ? (item.jumlah + 1) * item.harga
                : (item.jumlah - 1) * item.harga,
            }
          : item
      )
    );
  };
  const HandleDecrement = (card_id, increase) => {
    setData((data) =>
      data.map((item) =>
        card_id === item.id &&
        ((increase && item.jumlah < item.stock) ||
          (!increase && item.jumlah > 1))
          ? {
              ...item,
              jumlah: increase ? item.jumlah + 1 : item.jumlah - 1,
              total_harga: increase
                ? (item.jumlah + 1) * item.harga
                : (item.jumlah - 1) * item.harga,
            }
          : item
      )
    );
  };

  // Delete Cart
  const deleteB = (id) => {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/delete_pesanan/${id}`,
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
          title: "Pesanan Di hapus",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //________________
  return (
    <div className="bg-[#F2F7F9] w-full min-h-screen flex flex-col justify-between gap-9 ">
      <nav>
        <NavBar_PayShop />
      </nav>

      {/* Warp Detail & BackBtn*/}
      <main className="w-full h-[530px] lg:min-h-[500px] xl:min-h-[600px] flex flex-col items-center  bg-[#] gap-4">
        {/* Back BTN*/}
        <div className="md:w-[90%] lg:w-[90%] xl:w-[80%] w-full h-auto bg-[#] rounded-[10px]  ">
          {/* Warp icon */}
          <NavLink
            to={"/Home"}
            className="bg-[#ffffff] max-w-min h-max py-2 px-3 lg:px-3  flex items-center rounded-[5px] cursor-pointer hover:scale-[1.05] shadow-[0px_1px_15px_0.5px_rgba(0,0,0,0.1)] text-[11px]"
          >
            <IoIosArrowBack className="text-[#919191]" />
            <h1 className="text-[#919191]">Back</h1>
          </NavLink>
        </div>
        {/* Detail warp*/}
        <div
          className="w-full h-full justify-between flex flex-col  lg:flex-row 
        md:w-[90%] md:justify-center md:flex xl:w-[1140px] xl:w-[80%] xl:h-full xl:flex-row bg-[#] lg:justify-between rounded-[10px] gap-5"
        >
          {/* Component Keranjang */}
          <div className="max-w-[500px] xl:max-w-[1000px] w-full max-h-[500px] h-full bg-[#] rounded-xl shadow-[0px_5px_15px_1px_rgba(0,0,0,0.1)]">
            {/* Nama Keranjang */}
            <div className="w-full h-[50px] rounded-t-xl flex items-center justify-between bg-[#DEC7F3]">
              <h1 className="text-[17px] font-semibold text-[#ffffff] ml-5 ">
                Keranjang
              </h1>
              <div className="w-[300px] h-full bg-[#] flex items-center justify-between mr-[107px]">
                <h1 className="text-[17px] bg-[#] w-[100px] h-auto flex items-center justify-center font-semibold text-[#ffffff] bg ">
                  Harga
                </h1>
                <h1 className="text-[17px] bg-[#] w-[100px] h-auto flex items-center justify-center font-semibold text-[#ffffff] bg ">
                  Jumlah
                </h1>
              </div>
            </div>
            {/* Isi keranjang */}
            <div className="w-full h-full  overflow-x-hidden rounded-b-lg bg-[#ffffff] shadow-[0px_5px_15px_1px_rgba(0,0,0,0.1)]">
              <div className="w-full h-full bg-[#] flex flex-col gap- px-3 pt-5">
                {data?.map((item) => {
                  return (
                    <div key={item.id} className="w-full h-auto  bg-[#]">
                      <div className="w-full md:h-[80px] lg:h-[100px] xl:h-[110px] rounded-lgn bg-[#f0f9fd] flex flex-row p-3  gap-5 mb-5 rounded-md shadow-[0px_3px_10px_2px_rgba(0,0,0,0.1)] hover:scale-[1.01] transition-[200ms]">
                        {/* img */}
                        <div className=" xl:w-[101px] h-full bg-[#] overflow-hidden rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]">
                          <img
                            src={item.gambar}
                            alt="Kosong"
                            className="w-[100px] h-full object-cover "
                          />
                        </div>
                        {/* Name & price */}
                        <div className="md:w-[100%]  xl:w-[100%] xl:h-[95px] flex  justify- bg-[#]">
                          {/* Product Name */}
                          <div className="md:w-[100%] lg:w-[330px] bg-[#]">
                            <h1 className="text-[14px] lg:text-[18px] xl:text-[18px] text-[#537684] font-medium ">
                              {item.nama}
                            </h1>
                          </div>
                          {/* Price & count*/}
                          <div className="md:w-[100%]   xl:h-[95px] flex  xl:w-[300px] justify-between bg-[#]">
                            {/* Price */}
                            <div className="w-[100px] h-auto bg-[#] flex items-center justify-center ">
                              <h1 className="text-[15px] lg:text-[17px] xl:text-[14px] font-extrabold text-[#537684]">
                                Rp. {numeral(item.total_harga).format("0,0")}
                              </h1>
                            </div>
                            {/* count */}
                            <div className="w-[100px] h-auto bg-[#] flex items-center justify-center ">
                              <div className="bg-[#FBCBDA] flex w-[40%] xl:w-[100px] h-[35px] xl:rounded-lg justify-between items-center gap-3 xl:gap-0">
                                <button
                                  className="bg-[#FBCBDA] w-[20px] h-[25px] lg:w-[25px] lg:h-[30px] xl:w-[30px] xl:h-[35px] rounded-md lg:rounded-lg text-[#ffffff] text-[27px] flex items-center justify-center font-semibold"
                                  onClick={() =>
                                    HandleDecrement(item.id, false)
                                  }
                                >
                                  -
                                </button>
                                <p className="text-[#fff] text-[15px] font-semibold">
                                  {item.jumlah}
                                </p>
                                <button
                                  className="bg-[#FBCBDA] w-[20px] h-[25px] lg:w-[25px] lg:h-[30px] xl:w-[30px] xl:h-[35px] rounded-md lg:rounded-lg text-[#ffffff] text-[17px] flex items-center justify-center font-semibold"
                                  onClick={() => HandleIncrement(item.id, true)}
                                >
                                  +
                                </button>
                                {/* <h1>Jumlah Produk : {item.jumlah}</h1> */}
                              </div>
                            </div>
                          </div>
                          {/* Delete BTN */}
                          <div className="w-[70px] flex items-center justify-center bg-">
                            <button
                              onClick={() => deleteB(item.id)}
                              className="w-[35px] h-[35px] bg-[#FBE285] hover:bg-[#ffdd60]  rounded-[5px]  text-[15px] text-[#ffffff] flex items-center justify-center font-semibold  hover:scale-[1.05] "
                            >
                              <BsTrash />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CheckOut Box*/}
          <div
            className="max-w-[500px] lg:max-w-[200px] xl:max-w-[200px] w-full max-h-[300px] bg-[#ffffff] p-3 rounded-lg
          shadow-[0px_5px_15px_1px_rgba(0,0,0,0.1)]"
          >
            <main className="w-full h-full bg-[#] flex flex-col gap-3 ">
              {/* Ringkasan pesanan */}
              <div className="bg-[#] flex flex-col w-full h-full justify-between items-center">
                {/* Text */}
                <div className="w-full flex bg-">
                  <h1 className="text-[15px] bg- text-[#537684]">
                    Ringkasan Pesanan
                  </h1>
                </div>
                {/* Belanja */}
                <div className="w-full h-full"> </div>
              </div>
              <hr />
              {/* Total Belanja */}
              <div className="bg- flex w-full h-auto justify-between items-center">
                <p className="text-[15px] bg- text-[#537684]">
                  Total : {numeral(jumlah_Harga).format("0,0")}
                </p>
              </div>
              {/* Kotak Deskripsi */}
              <button className="w-full h-auto bg-[#ffc2d5] hover:bg-[#ff99b9] rounded-lg py-2 px-3">
                <h1 className="text-[#FFFFFf] font-semibold text-[14px]">
                  CheckOut
                </h1>
              </button>
            </main>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full h-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Cart;
