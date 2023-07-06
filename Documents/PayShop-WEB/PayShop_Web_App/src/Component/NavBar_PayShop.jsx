import React, { useEffect, useRef, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Search from "./Seacrh";
import PayLogo from "../assets/Halal/logo_halalfull.png";
import BGheader from "../assets/img/BGheader.png";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";
import UserName from "./UserName";
import DropDown from "./DropDown";
import { IoMdClose } from "react-icons/io";

const NavBar_PayShop = () => {
  const [show, setShow] = useState(false);

  //   Untuk Dropdown
  const [openProfile, setOpenProfile] = useState(false);

  // Untuk LogOut
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
  };

  //  Untuk Hide Dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownElement = document.getElementById("dropdown");
      if (dropdownElement && !dropdownElement.contains(event.target)) {
        setOpenProfile(false);
      }
    };
    // NavBar_PayShop_Profile;
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="
    bg-[#ffffff] w-full h-[55px]  drop-shadow-lg flex items-center justify-center"
    >
      {/* logo search cart */}
      <div
        className="
      bg-[#] w-[84%] h-[55px]  flex items-center justify-between
      z-10  gap-2"
      >
        {/* Image */}
        <NavLink to={"/Home"} id="logo" className="bg-  hidden md:flex">
          <img className="bg-[#]" src={PayLogo} width="100" height="200" />
        </NavLink>
        {/* Seacrh */}
        <div className="max-w-[600px] w-full h-auto bg- ">
          <Search />
        </div>

        {/* warp cart & UserName  */}
        <div className="bg-[#] h-auto max-w-max flex items-center gap-5">
          {/* Cart shop */}
          <NavLink
            to={"/Cart"}
            className="bg text-[27px] text-[#537684] cursor-pointer hover:scale-[1.07] transition-[200ms] animate-bounce"
          >
            <AiOutlineShoppingCart />
          </NavLink>
          {/* UserName */}
          <button
            className="cursor-pointer hidden lg:flex"
            onClick={() => setOpenProfile((prev) => !prev)}
          >
            <UserName />
          </button>
          {openProfile && (
            <div
              id="dropdown"
              className="absolute w-full h-auto top-[60px] right-32"
            >
              <DropDown setShow={setShow} />
            </div>
          )}

          {/* Logout */}
        </div>
      </div>
      {/* show Logout*/}
      {show ? (
        <div className="w-full h-full top-0 z-50 bg- bg-opacity-50  flex justify-center items-center absolute w-full h-screen">
          <div
            id="keluar"
            className="h-[200px] w-[370px] rounded-[8px] flex flex-col
               bg-[#ffffff]"
          >
            {/* Tombol silang */}
            <div className="h-[20%] bg flex justify-end items-center px-[5px] ">
              <NavLink onClick={() => setShow(false)}>
                <IoMdClose className="text-[25px] text-[#7878789b]  hover:text-[#D00B0B] active:text-[#D00B0B] hover:scale-[1.05] " />
              </NavLink>
            </div>
            {/* Text & Button */}
            <div className="h-full flex flex-col justify-center items-center gap-9">
              {/* Text  */}
              <div>
                <h1 className=" font-bold text-[20px] flex justify-center  text-[#F9C828]">
                  Anda yakin ingin Logout?
                </h1>
              </div>
              {/* 2 Button */}
              <div className="w-full bg flex justify-evenly">
                <NavLink
                  onClick={() => setShow(false)}
                  className="w-[120px] h-[40px] bg-[#d3d3d36f] hover: text-[17px] flex justify-center items-center px-[121] py-[20px] font-extrabold rounded-[7px] text-[#a1a0a0] hover:bg-[#d3d3d3b9] hover:scale-[1.05] "
                >
                  Batal
                </NavLink>
                <NavLink
                  to="/"
                  onClick={logOut}
                  className="w-[120px] h-[40px]  bg-[#D00B0B] hover:bg-[#ff2121] text-[17px] flex justify-center items-center px-[121] py-[20px] font-extrabold rounded-[7px] text-[#FFFFFF] hover:scale-[1.05]"
                >
                  Logout
                </NavLink>
              </div>
              {/* -------------------END TOMBOL--------------------- */}
            </div>
          </div>
        </div>
      ) : null}

      {/*  BG  */}
      {/* <div className=" w-full h-full bg- z-0 absolute  ">
        <img className="object-cover w-full h-full " src={BGheader} />
      </div> */}
    </div>
  );
};

export default NavBar_PayShop;
