import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Search from "./Seacrh";
import PayLogo from "../assets/Halal/logo_halalfull.png";
import BGheader from "../assets/img/BGheader.png";

const NavBar_PayShop = () => {
  return (
    <div
      className="
    bg-[#FFFFFF] w-full h-[55px]  drop-shadow-lg flex items-center justify-center
 "
    >
      {/* navbar */}
      <div
        className="
      bg-[#] w-[75%] h-[55px]  flex items-center justify-between
      z-10"
      >
        {/* Image */}
        <NavLink to={"/Home"} id="logo" className="bg-  bg- z-10 ">
          <img className="bg-" src={PayLogo} width="110" height="200" />
        </NavLink>
        {/* Seacrh */}

        {/* Cart shop */}
        <div className="w-[180px] bg-[#] flex justify-between gap-5">
          {/* Edit */}
          <NavLink
            to={`/`}
            className="w-[75px] h-auto bg-[#E0C6F3] hover:bg-[#ddadff] py-1 px-4 rounded-[5px] text-center text-[12px] text-[#fefe] font-semibold "
          >
            <h1>Login</h1>
          </NavLink>
          {/* Delete */}
          <NavLink
            to={"/Register"}
            className="w-[75px] h-auto bg-[#FBCBDA] hover:bg-[#feb3cb] rounded-[5px]  text-[12px] text-[#fefe] flex items-center justify-center font-semibold  hover:scale-2"
          >
            <h1>Register</h1>
          </NavLink>
        </div>
      </div>
      {/*  BG  */}
      {/* <div className=" w-full h-full bg- z-0 absolute  ">
        <img className="object-cover w-full h-full " src={BGheader} />
      </div> */}
    </div>
  );
};

export default NavBar_PayShop;
