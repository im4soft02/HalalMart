import React, { useState } from "react";
import { BiHomeAlt } from "react-icons/bi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { FiPlusSquare } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { BiExit } from "react-icons/bi";
import { NavLink } from "react-router-dom";

const Logout = ({ setShow }) => {
  //   const [outButton, SetOutButton] = useState(false);
  //   const [show, setShow] = useState(false);
  const role = localStorage.getItem("role");

  const handleClick = () => {
    // setLog(true);
    setShow(true);
  };

  //
  const logOut = ({ setLog }) => {
    localStorage.removeItem("token");
    localStorage.removeItem("namaUser");
    localStorage.removeItem("role");
  };
  return (
    <>
      <NavLink onClick={handleClick}>
        <span className="text-[#FBE285] font-semibold hover:text-[#fefefe] text-[16px]">
          Logout
        </span>
      </NavLink>
    </>
  );
};

export default Logout;
