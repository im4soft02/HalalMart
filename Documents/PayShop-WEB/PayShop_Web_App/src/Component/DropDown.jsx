import React from "react";
import Dashboard from "../Page/admin/Dashboard";
import FooterA from "./Admin/FooterA";
import Logout from "./Logout";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";

const DropDown = ({ setShow }) => {
  const role = localStorage.getItem("role");
  return (
    <>
      <div className=" h-[130px] flex justify-end bg-">
        <div className="Dropdown bg-[#fefefe] w-[130px] py-[23px] h-auto p-3 rounded-lg absolute ">
          <ul className="flex flex-col gap-1">
            {/* jika role ===  ( artinya sama dengan atau isi nya sama )  makata tampilkan validasi yangd isebelakanan  && */}
            {role === "admin" && (
              <NavLink
                to={"/Dashboard/Home"}
                className="cursor-pointer hover:bg-[#B9E8F2] rounded-[5px] px-1 font-bold text-[#FBE285] hover:text-[#fefefe]"
              >
                Dashboard
              </NavLink>
            )}
            <NavLink
              to={"/Profile"}
              className="cursor-pointer hover:bg-[#B9E8F2]  rounded-[5px] px-1 font-bold text-[#FBE285] hover:text-[#fefefe]"
            >
              Profile
            </NavLink>
            <li className="cursor-pointer hover:bg-[#B9E8F2] hover:text-[#fefefe]  rounded-[5px] px-1">
              <Logout setShow={setShow} />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DropDown;
