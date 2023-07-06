import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import numeral from "numeral";
// Img
import Mentos from "../assets/Mentos.jpg";
// Icons
import { IoIosArrowBack } from "react-icons/io";
// Component
import { Footer } from "../Component/Footer";
import NavBar_PayShop from "../Component/NavBar_PayShop";
import NavBarLogin from "../Component/NavBarLogin";
import axios from "axios";
import instance from "../api/Instance";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Detail = () => {
  const { id } = useParams();
  // Kondisi Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // untuk mengatur BTN jumlah
  const [jumlah_pesan, setJumlahPesanan] = useState(0);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //______Navbar Login /Not login
  useEffect(() => {
    // Cek token saat komponen dipasang
    const checkUserToken = () => {
      const userToken = localStorage.getItem("token");
      if (userToken && userToken !== "undefined") {
        setIsLoggedIn(true);
      }
    };
    checkUserToken();
  }, []);

  // Quantity Increment/Decrement in Hooks - Start
  const HandleIncrement = (id) => {
    setJumlahPesanan((prevCount) => {
      const updatedCount = prevCount + 1;
      return isNaN(updatedCount) ? 1 : updatedCount;
    });
  };

  const HandleDecrement = (id) => {
    // if disini saat quantity  1  maka tidak bisa di kurang lagi jdi tidak akan minus
    if (jumlah_pesan > 1) {
      setJumlahPesanan((prevCount) => {
        const updatedCount = prevCount - 1;
        return isNaN(updatedCount) || updatedCount < 1 ? 0 : updatedCount;
      });
    }
  };

  //__________ END Quantity __________\\

  // __________ Add to Cart__________\\
  const addToCart = () => {
    let data = new FormData();
    data.append("jumlah_pesan", jumlah_pesan);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/pesan/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(response.data.message);
        setJumlahPesanan(response.data.jumlah_pesan);
        setJumlahPesanan(0);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Behasil di tambah ke keranjang",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //__________ END Add To Cart __________\\

  //______________Validasi token______________

  //   useEffect(() => {
  //     const checkUserToken = () => {
  //       const userToken = localStorage.getItem("token");
  //       if (!userToken || userToken === "undefined") {
  //         return navigate("/");
  //       }
  //     };
  //     checkUserToken();
  //   }, []);
  //______________________________________

  useEffect(() => {
    const getData = () => {
      //
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `/detailproduk/${id}`,
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: data,
      };

      instance
        .request(config)
        .then((response) => {
          //   console.log(JSON.stringify(response.data));
          //   setData(response.data.message ? [response.data.message] : []);
          //   console.log([response.data.message]);
          setData(response.data.message);
          console.log(response.data.message);
          //   console.log("asw");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  return (
    <div>
      <div
        // key={item.id}
        className="bg-[#] w-full h-screen flex flex-col justify-between  gap-10 "
      >
        {/* Navbar */}
        {isLoggedIn ? (
          <nav>
            <NavBar_PayShop />
          </nav>
        ) : (
          <nav>
            <NavBarLogin />
          </nav>
        )}

        {/* Warp Detail */}

        <main className="w-full h-auto flex flex-col items-center bg-[#]  gap-4">
          {/* Back BTN ________________*/}
          <div className="max-w-[500px] xl:max-w-[1140px] w-full  md:w-[80%] h-auto bg-[#] rounded-[10px]  ">
            {/* Warp icon */}
            <NavLink
              to={"/Home"}
              className="bg-[#fefefe] max-w-min h-[40px] px-3 flex items-center rounded-[5px] cursor-pointer hover:scale-[1.05] shadow-[0px_1px_15px_0.5px_rgba(0,0,0,0.1)]"
            >
              <IoIosArrowBack className="text-[#919191]" />
              <h1 className="text-[#919191]">Back</h1>
            </NavLink>
          </div>
          {/* Detail ________________*/}
          <div
            className=" xl:max-w-[1140px] w-full h-auto flex flex-col 
              md:w-[80%] md:justify-center md:flex md:items- 
               xl:flex-row bg-[#] rounded-[10px]  gap-5"
          >
            {/* Gambar */}
            <div className="max-w-[500px] xl:max-w-[400px] w-full  h-full bg-[#] rounded-xl shadow-[0px_5px_15px_1px_rgba(0,0,0,0.1)]">
              <div className="w-full xl:max-h-[400px] h-auto overflow-hidden rounded-lg bg-black ">
                {/* <img src= alt="Jaket" className=" w-full h-auto" /> */}
                <img src={data.gambar} alt="Jaket" className=" w-full h-auto" />
              </div>
            </div>
            {/* Detail Product */}
            <div className="max-w-[500px] lg: xl:max-w-[500px] w-full max-h-[400px] h-full bg-[#fefefe] rounded-xl p-5 shadow-[0px_5px_15px_1px_rgba(0,0,0,0.1)]">
              <main className="w-full h-full bg-[#fefefe] flex flex-col gap-7 ite">
                {/* Product Name */}
                <h1 className="text-[20px] font-semibold text-[#403f3f]">
                  {data.nama}
                </h1>
                {/* Price */}
                <h1 className="text-[25px] font-extrabold text-[#D00B0B]">
                  Rp. {numeral(data.harga).format("0,0")}
                </h1>
                {/* Kotak Deskripsi */}
                <div className="w-full h-auto bg-[#] flex flex-col gap-2">
                  <nav className="w-full h-auto bg-[#E5F2FC] rounded-lg py-3 px-3">
                    <h1 className="text-[#515151] font-semibold text-[14px]">
                      Deskripsi
                    </h1>
                  </nav>
                  {/* Isi Deskripsi */}
                  <div className="w-full h-auto bg-[#] py-2 px-3">
                    <p className="text-[#333333] text-[13px]">
                      {data.keterangan}
                    </p>
                  </div>
                </div>
              </main>
            </div>
            {/* CheckOut */}
            <div className="max-w-[500px] lg:max-w-[500px] max-h-[250px] h-full flex flex-col justify-end xl:max-w-[200px] w-full  bg-[#fefefe] p-3 rounded-lg shadow-[0px_5px_15px_1px_rgba(0,0,0,0.1)]">
              <main className="w-full h-full bg-[#fefefe] flex flex-col gap-3 ">
                {/* Gambar */}
                <div className="w-full h-full bg-[#ecececee] rounded-lg"></div>
                {/* Tambah kurang */}
                <div className="bg- flex w-full h-auto justify-between items-center">
                  <button
                    className="bg-[#D00B0B] w-[30px] h-[35px] rounded-lg text-[#ffffff]"
                    onClick={() => HandleDecrement(id)}
                  >
                    -
                  </button>
                  <p> {jumlah_pesan} </p>
                  <button
                    className="bg-[#D00B0B] w-[30px] h-[35px] rounded-lg text-[#ffffff]"
                    onClick={() => HandleIncrement(id)}
                  >
                    +
                  </button>
                </div>
                {/* Kotak Deskripsi */}
                <button
                  onClick={addToCart}
                  className="w-full h-auto bg-[#D00B0B] rounded-lg py-2 px-3"
                >
                  <h1
                    //   onClick={submitAddToCart}
                    className="text-[#fefefe] font-semibold text-[14px]"
                  >
                    + Keranjang
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
    </div>
  );
};

export default Detail;
