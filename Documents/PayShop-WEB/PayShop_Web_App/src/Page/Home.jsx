import React, { useEffect, useState } from "react";
// Komponen
import Carousel from "../Component/Carousel";
import NavBar_PayShop from "../Component/NavBar_PayShop";
import NavBarLogin from "../Component/NavBarLogin";
import Iklan from "../Component/Iklan";
import { Footer } from "../Component/Footer";
import Category from "../Component/Category ";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Card from "../Component/Card";
import Rekomendasi from "../Component/Rekomendasi";
import DropDown from "../Component/DropDown";
import instance from "../api/Instance";
// Image
import Jaket_keren from "../assets/Jaket_keren.jpg";
import Rekomendasi_Beneran from "../Component/Rekomendasi_Beneran";
// Icon

const Home = () => {
  // Kondisi Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { id } = useParams();
  // Untuk Navigate
  const navigate = useNavigate();

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

  // untuk validasi token User login/ jika gk ada token akan mental ke login lagi
    useEffect(() => {
      const checkUserToken = () => {
        const userToken = localStorage.getItem("token");
        if (!userToken || userToken === "undefined") {
          return navigate("/");
        }
      };
      checkUserToken();
    }, []);
  // _____________END VALIDASI____________

  return (
    <div className="bg-[#] w-full h-auto flex flex-col gap- ">
      {/* _________Navbar_________ */}

      {isLoggedIn ? (
        <nav className="w-full h-auto fixed z-10">
          <NavBar_PayShop />
        </nav>
      ) : (
        <nav className="w-full h-auto fixed z-10">
          <NavBarLogin />
        </nav>
      )}

      {/* _________Konten_________ */}
      <main className="bg-[#f5f5f5] w-full h-full flex flex-col justify-center items-center gap-5 mt-[55px]  pt-[20px]  ">
        {/* WARP Konten*/}
        <section className="max-w-[1140px] h-auto bg-[#] flex justify-center gap-5 flex-wrap ">
          {/* Carousel */}
          <section className="w-[100%] h-auto pb-[20px] bg-[#] flex justify-center items-center ">
            <Carousel />
          </section>
          {/* Kategori */}
          <div className="w-full h-full shadow-[0px_3px_10px_2px_rgba(0,0,0,0.1)] gap-3 rounded-[10px] ">
            <Category />
          </div>

          {/* Card */}
          <Rekomendasi_Beneran />
          <div className="w-full h-full shadow-[0px_3px_10px_2px_rgba(0,0,0,0.1)] gap-3 rounded-[10px] ">
            <Iklan />
          </div>   
          <Rekomendasi />
          {/* <Rekomendasi /> */}
        </section>
      </main>

      {/* _________Footer_________ */}
      <footer className="w-full h-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Home;
