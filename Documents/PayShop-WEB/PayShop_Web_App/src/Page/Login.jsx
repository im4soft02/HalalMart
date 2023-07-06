import React, { useState } from "react";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
// Icons
import { BsFacebook } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
// IMG & mp4
import videoFile from "../assets/Halal/Final_halal.mp4";
import Gmail from "../assets/Gmail.png";
import Facebook from "../assets/Facebook.png";
import Shop from "../assets/Shop.jpg";
import PayLogo from "../assets/img/LogoPITmart.png";
// Component
import NavBarLogin from "../Component/NavBarLogin";
import { Footer } from "../Component/Footer";
import Swal from "sweetalert2";
import UserName from "../Component/UserName";
import instance from "../api/Instance";

export const Login = () => {
  //   Navigate = untuk memanggil useNaviget di react Dom
  const navigate = useNavigate();

  //   Email dan password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    //
    if (email === "" || password === "") {
      alert("Belum diisi email atau password nya");
    } else if (password.length < 5) {
      // Menampilkan pesan kesalahan jika password kurang dari 5 karakter
      Swal.fire("Password harus memiliki minimal 5 karakter");
      //   alert("Password harus memiliki minimal 5 karakter");
      console.log("Password terlalu pendek");
      return;
      // } else if (password !== password_confirmation) {
      //   // Menampilkan pesan kesalahan jika password konfirmasi tidak sama
      //   alert("Password konfirmasi tidak sesuai");
      //   console.log("Password tidak sama");
      //   //   _____________________________________________________________
      //   return;
    } else {
      //
      let data = new FormData();
      data.append("email", email);
      data.append("password", password);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/login",
        headers: {},
        data: data,
      };

      instance
        .request(config)
        //   jalankan then ketika berhasil login
        .then((response) => {
          console.log(JSON.stringify(response.data));
          if (response.data.token) {
            //   ambil Data untuk di consume
            localStorage.setItem("userName", response.data.message.username);
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.message.role);
            //
            Swal.fire(
              `<span class="text-gray-600">Selamat datang ${response.data.message.username}</span>`
            );
            // alert("Login berhasil UBAH NAVIGATE");
            navigate("/Home");
          } else {
            // alert("email dan password tidak sesusai");
            // Swal.fire("email dan password tidak sesusai");

            Swal.fire({
              title: `<span class="text-gray-600">Nama pengguna: ${response.data.name}</span>`,
              width: 600,
              padding: "1em",
              color: "#716add",
              customClass: {
                title: "custom-title-class",
                confirmButton: "custom-confirm-button-class",
              },
              background:
                "#fff url(https://sweetalert2.github.io/images/trees.png)",
              backdrop: `
               rgba(0,0,123,0.4)
               url("https://sweetalert2.github.io/images/nyan-cat.gif")
               left center
               no-repeat
             `,
            });
          }
        })
        // Jika error tampilkan ini
        .catch((error) => {
          console.log(error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          console.log("Masih error GK BISA LOGIN");
        });
    }
  };

  return (
    <>
      <div className="  bg-[#F5F5F5] w-[100%] h-auto flex flex-col justify-center items-center gap-10">
        {/* Navbar Login */}
        <div className="w-full bg-">
          <NavBarLogin />
        </div>
        {/* Warp Form */}
        <div
          id="Warp_form"
          className="  h-[auto] scale-[0.91] sm:scale-[1] bg-[#] md:bg flex justify-center shadow-xl"
        >
          {/* OnBoarding */}
          <div className="bg-[#FEFEFE] w-[600px] h-[570px] hidden md:flex rounded-l-[10px] overflow-hidden  ">
            <img className="scale-[1.1] object-cover" src={Shop} alt="" />
          </div>
          {/*Warp Login */}
          <div className="bg-[#fefefe] w-auto h-[570px] rounded-[10px] md:rounded-l-none flex flex-col items-stretch justify-evenly  ">
            {/* logo */}
            <div className="w-full h-[140px] bg- flex justify-center items-center">
              <video
                className="w-[160px]"
                src={videoFile}
                autoPlay
                muted
                loop
                type="video/webm"
              ></video>
              {/* <img className=" rounded-t-[10px] " src={Paylogo} alt="" /> */}
            </div>
            {/* Form Login */}
            <form
              onSubmit={handleSubmit}
              className="w-full h-auto py-[0px] bg- flex flex-col justify-center items-center gap-2 pb-6"
            >
              {/* input Email*/}
              <div>
                <input
                  placeholder="Email"
                  className="h-[40px] w-[270px] bg-[#F6F6F6] rounded-[5px] p-2 text-[13px] "
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {/* input Pw */}
              <div>
                <input
                  placeholder="Masukkan Password"
                  className="h-[40px] w-[270px] bg-[#F6F6F6] rounded-[5px] p-2 text-[13px] "
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {/* Login With */}
              <div>
                <button
                  type="submit"
                  //   atau
                  //   onClick={handleSubmit}
                  className="h-[40px] w-[270px] bg-[#537684] 
                  hover:bg-[#588a9d] active:bg-[#5791a7] focus:outline-none rounded-[6px] font-bold text-[15px] text-[#FBCBDA]"
                >
                  Login
                </button>
              </div>
              {/* Lupa Pw */}
              <div className="w-[270px] h-[20px] bg flex">
                <h1 className="text-[#7863FE] text-[12px] " to="/Register">
                  Lupa password ?
                </h1>
              </div>
            </form>
            {/* Login With */}
            <div className="w-full h-auto bg- flex flex-col justify-center gap-4 pb-12">
              {/* warp Atau */}
              <div className="w-full h-[20px] bg- flex items-center justify-evenly  ">
                <hr className="bg-[#d2d2d2] h-[2px] w-1/3" />
                <h1 className="text-[#d2d2d2] text-[13px]">Atau</h1>
                <hr className="bg-[#d2d2d2] h-[2px] w-1/3" />
              </div>
              {/* Warp fb and gmail */}
              <div className="bg- w-full h-auto flex justify-center gap-6">
                {/* Fb */}
                <button className="bg-slate-50 w-2/5 h-[25px] flex justify-center items-center gap-1 p-1 rounded-[6px] border-[1.5px] border-[#d2d2d2]">
                  <span>
                    <img src={Facebook} className="w-4" alt="" />
                    {/* <BsFacebook className="text-[#7863FE]" /> */}
                  </span>
                  <h1 className="bg- text-gray-700 text-[11px]">Facebook</h1>
                </button>
                {/* Gmail */}
                <button className="bg-slate-50 w-2/5 h-[25px] flex justify-center items-center gap-2 p-1 rounded-[6px] border-[1.5px] border-[#d2d2d2]">
                  <span>
                    <img src={Gmail} className="w-3" alt="" />
                    {/* <SiGmail className="text-[#7863FE]" /> */}
                  </span>
                  <h1 className="bg- text-gray-700 text-[11px]">Gmail</h1>
                </button>
              </div>
            </div>
            {/* Daftar */}
            <div
              id="FORM_REGISTER"
              className="w-[300px] h-[60px] bg-[#] flex items-center gap-1 justify-center"
            >
              <p className="text-[#828282]  text-[12px]">
                Belum memiliki akun ?
              </p>
              <NavLink className="text-[#7863FE] text-[12px]  " to="/Register">
                Register
              </NavLink>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="w-full h-[100px] bg-[#fefefe]">
          <Footer />
        </footer>
      </div>
    </>
  );
};
