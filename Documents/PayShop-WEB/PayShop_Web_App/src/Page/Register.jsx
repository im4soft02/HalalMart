import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
// Icons
import { BsFacebook } from "react-icons/bs";
import { SiGmail } from "react-icons/si";
// IMG & mp4
import videoFile from "../assets/Halal/Final_halal.mp4";
import Gmail from "../assets/Gmail.png";
import Facebook from "../assets/Facebook.png";
import Shop from "../assets/Shop.jpg";
import PayLogo from "../assets/img/LogoPITmart.png";

// component
import NavBarLogin from "../Component/NavBarLogin";
import { Footer } from "../Component/Footer";
import instance from "../api/Instance";

const Register = () => {
  //   Navigate = untuk memanggil useNaviget di react Dom
  const Navigate = useNavigate();

  //   Email dan password
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //   const [password_confirmation, setPassword_confirmation] = useState("");
  //   API YAsir
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [no_hp, setNo_hp] = useState("");
  const [tgl_lhr, setTgl_lhr] = useState("");
  const [gender, setGender] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      no_hp === "" ||
      tgl_lhr === "" ||
      gender === ""
    ) {
      //
      // __Menampilkan pesan kesalahan jika ada field yang kosong__
      console.log("Harap isi semua input yang diperlukan");
      return;
      //
      // __
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
      //   let data = new FormData();
      //   data.append("name", name);
      //   data.append("email", email);
      //   data.append("password", password);
      //   data.append("password_confirmation", password_confirmation);
      let data = new FormData();
      data.append("username", username);
      data.append("email", email);
      data.append("password", password);
      data.append("no_hp", no_hp);
      data.append("tgl_lhr", tgl_lhr);
      data.append("gender", gender);

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/register",
        headers: {},
        data: data,
      };

      instance
        .request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          //   ambil Data untuk di consume
          localStorage.setItem("userName", response.data.name);
          localStorage.setItem("token", response.data.token);

          //   Setelah register berhasil akan langsung pindah page ke
          Navigate("/");

          // Password benar, lakukan navigasi ke halaman beranda
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Berhasil Register, Silahkan login",
            showConfirmButton: false,
            timer: 1500,
          });
          console.log("Register berhasil NAVIGATE KE LOGIN");
          // alert("REGIS BERHASIL");
        })
        .catch((error) => {
          console.log(error);
          console.log("Masih error GK BISA REGISTER");
        });
    }
  }
  return (
    <>
      <div className="  bg-[#F5F5F5] w-[100%] h-auto flex flex-col justify-center items-center gap-10">
        {/* Navbar Login */}
        <div className="w-full bg-">
          <NavBarLogin />
        </div>
        {/* Warp Login */}
        <div
          id="Warp_form"
          className="  h-[auto] scale-[0.91] sm:scale-[1] bg-[#] md:bg flex justify-center shadow-xl"
        >
          {/* OnBoarding */}
          <div className="bg-[#FEFEFE] w-[600px] h-[570px] hidden md:flex rounded-l-[10px] overflow-hidden  ">
            <img className="scale-[1.1] object-cover" src={Shop} alt="" />
          </div>
          {/* Login */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#FEFEFE] w-[300px] h-[570px] rounded-[10px] md:rounded-l-none flex flex-col items-stretch justify-evenly  "
          >
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
            <div className="w-full h-auto py-[0px] bg- flex flex-col justify-center items-center gap-2 pb-6">
              {/* input Email*/}
              <div>
                <input
                  placeholder="Nama"
                  className="h-[40px] w-[270px] bg-[#F6F6F6] rounded-[5px] p-2 text-[13px] "
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
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
              {/* konfirm Pw */}
              <div>
                <input
                  placeholder="No telpon"
                  className="h-[40px] w-[270px] bg-[#F6F6F6] rounded-[5px] p-2 text-[13px] "
                  type="tel"
                  value={no_hp}
                  onChange={(e) => setNo_hp(e.target.value)}
                />
              </div>
              {/*Tanggal Lahir */}
              <div>
                <input
                  placeholder="Tanggal Lahir"
                  className="h-[40px] w-[270px] bg-[#F6F6F6] rounded-[5px] p-2 text-[13px] text-[#8f8f8f] "
                  type="date"
                  value={tgl_lhr}
                  onChange={(e) => setTgl_lhr(e.target.value)}
                />
              </div>
              {/*  Gender  */}
              {/* <div>
                <input
                  placeholder="Gender"
                  className="h-[40px] w-[270px] bg-[#F6F6F6] rounded-[5px] p-2 text-[13px] "
                  type="input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div> */}
              {/*  */}
              <div className="w-full h-auto flex justify-between px-4">
                <div className="w-[140px] h-auto flex bg-[#] justify-center items-center gap-2">
                  <input
                    className="h-[15px] w-[20px] bg-[#F6F6F6] rounded-[5px] p-2 text-[13px]"
                    type="radio"
                    id="Laki -laki"
                    name="gender"
                    value="laki-laki"
                    checked={gender === "laki-laki"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="Laki -laki" className="text-[#9b9b9bee]">
                    Laki - Laki
                  </label>
                </div>
                <div className="w-[140px] h-auto flex bg-[#] justify- items-center gap-2">
                  <input
                    className="h-[15px] w-[20px] bg-[#F6F6F6] rounded-[5px] p-2 text-[13px]"
                    type="radio"
                    id="Perempuan"
                    name="gender"
                    value="perempuan"
                    checked={gender === "perempuan"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  <label htmlFor="Perempuan" className="text-[#9b9b9bee]">
                    Perempuan
                  </label>
                </div>
              </div>
              {/* Login With */}
              <div>
                <button
                  //   type="submit"
                  //   atau
                  onClick={handleSubmit}
                  className="h-[40px] w-[270px] bg-[#537684] 
                  hover:bg-[#588a9d] active:bg-[#5791a7] focus:outline-none rounded-[5px] font-bold text-[15px] text-white"
                >
                  Register
                </button>
              </div>
            </div>
            {/* ---------------------------------------------------- */}
            {/* Login With */}
            {/* <div className="w-full h-auto bg- flex flex-col justify-center gap-4 pb-12">
              warp Atau
              <div className="w-full h-[20px] bg- flex items-center justify-evenly  ">
                <hr className="bg-[#d2d2d2] h-[2px] w-1/3" />
                <h1 className="text-[#d2d2d2] text-[13px]">Atau</h1>
                <hr className="bg-[#d2d2d2] h-[2px] w-1/3" />
              </div>
              Warp fb and gmail
              <div className="bg- w-full h-auto flex justify-center gap-6">
                Fb
                <button className="bg-slate-50 w-2/5 h-[25px] flex justify-center items-center gap-1 p-1 rounded-[6px] border-[1.5px] border-[#d2d2d2]">
                  <span>
                    <img src={Facebook} className="w-4" alt="" />
                    <BsFacebook className="text-[#7863FE]" />
                  </span>
                  <h1 className="bg- text-gray-700 text-[11px]">Facebook</h1>
                </button>
                Gmail
                <button className="bg-slate-50 w-2/5 h-[25px] flex justify-center items-center gap-2 p-1 rounded-[6px] border-[1.5px] border-[#d2d2d2]">
                  <span>
                    <img src={Gmail} className="w-3" alt="" />
                    <SiGmail className="text-[#7863FE]" />
                  </span>
                  <h1 className="bg- text-gray-700 text-[11px]">Gmail</h1>
                </button>
              </div>
            </div> */}
            {/* Daftar */}
            <div
              id="FORM_REGISTER"
              className="w-[300px] h-[60px] bg-[#] flex items-center gap-1 justify-center"
            >
              <p className="text-[#828282]  text-[12px]">Sudah punya akun ?</p>
              <NavLink className="text-[#7863FE] text-[12px]  " to="/">
                Login
              </NavLink>
            </div>
          </form>
        </div>
        {/* Footer */}
        <footer className="w-full h-[100px] bg-[#fefefe]">
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Register;
