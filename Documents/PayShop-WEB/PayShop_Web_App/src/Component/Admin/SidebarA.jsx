import React, { useState } from "react";
import videoFile from "../Admin/asset/Final_halal.mp4";
import { RiDashboardLine } from "react-icons/ri";
import { BiBox, BiBookAdd, BiListUl, BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Product from "../../Page/admin/Product";
import { IoMdClose } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";

export const SidebarA = () => {
  const [show, setShow] = useState(false);

  const active = ({ isActive }) => {
    return isActive
      ? "bg-[#FBE285] text-[#ffff] max-w-[180px] rounded-tl-bl-[] h-auto flex items-center gap-2 px-4 py-1 rounded-r-[10px] transition-[200ms]"
      : "bg-[#] text-[#C6C4CD] max-w-max h-auto flex items-center gap-2 px-4 py-1 hover:scale-[1.06] transition-[200ms] ";
  };
  //
  const logOut = () => {
    localStorage.removeitem("token");
    localStorage.removeItem("userName");
  };

  return (
    <div className="w-[250px] h-[100vh] py-5 pl-5 bg-[#F2F7F9] ">
      {/* _________Sidebar_________ */}
      <nav className="w-[250px] h-full bg-[#FFFFFF] rounded-2xl">
        {/* Logo */}
        <NavLink
          to={"/Home"}
          className="w-full h-[140px] bg-[#] flex justify-center items-center"
        >
          <video
            className="w-[160px]"
            src={videoFile}
            autoPlay
            muted
            loop
            type="video/webm"
          ></video>
        </NavLink>

        {/* ___________List Dashboard___________ */}

        <div className="bg- W-full max-h-[486px] h-full flex flex-col justify-between gap-5 py-5">
          {/* Dashboard */}
          <div className="bg- W-full h-auto bg- flex flex-col gap-5">
            <NavLink to={"/Dashboard/Home"} className={active}>
              <span>
                <RiDashboardLine className="text-[#] text-[20px] " />
              </span>
              <h1 className="text-[18px] text-[#]">Dashboard</h1>
            </NavLink>
            {/* Product */}
            <NavLink to={"/Dashboard/Product"} className={active}>
              <span>
                <BiBox className="text-[#] text-[20px] " />
              </span>
              <h1 className="text-[18px] text-[#]">Product</h1>
            </NavLink>
            {/* Add Product */}
            <NavLink to={"/Dashboard/AddProduct"} className={active}>
              <span>
                <BiBookAdd className="text-[#] text-[20px] " />
              </span>
              <h1 className="text-[18px] text-[#]">Add Product</h1>
            </NavLink>
            {/* Categories */}
            <NavLink to={"/Dashboard/AddCategoriesA"} className={active}>
              <span>
                <BiListUl className="text-[#] text-[20px]" />
              </span>
              <h1 className="text-[18px] text-[#]">Categories</h1>
            </NavLink>
            {/* Rekomendasi */}
            <NavLink to={"/Dashboard/RekomendasiA/:id"} className={active}>
              <span>
                <AiOutlineLike className="text-[#] text-[20px]" />
              </span>
              <h1 className="text-[18px] text-[#]">Rekomendasi</h1>
            </NavLink>
          </div>

          {/* LogOut BTN */}
          <div className="bg- w-full h-auto">
            <NavLink
              onClick={() => setShow(true)}
              className="bg-[#] w-full h-auto flex items-center gap-2 px-4 py-1"
            >
              <span>
                <BiLogOut className="text-[#C6C4CD] text-[20px] " />
              </span>
              <h1 className="text-[18px] text-[#C6C4CD]">Log Out</h1>
            </NavLink>
          </div>
        </div>
        {/* Logout Logic */}
        {show ? (
          <div className="w-full h-full top-0 z-50 bg-black bg-opacity-50  flex justify-center items-center absolute w-full h-screen">
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
      </nav>
    </div>
  );
};
