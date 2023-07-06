import React from "react";
import PayLogo from "../assets/Halal/logo_halalfull.png";

export const Footer = () => {
  return (
    <footer className="w-full h-auto bg-[#E0C6F3]">
      <footer className=" rounded-lg h-[] bg-[#] ">
        <div className="w-[85%]  mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <a className="flex items-center mb-4 sm:mb-0">
              <img src={PayLogo} className="h-12 bg mr-3" alt="Flowbite Logo" />
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-[#537684] sm:mb-0 ">
              <li>
                <a
                  href="#"
                  className="mr-4  font-bold hover:underline md:mr-6 "
                >
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-[#537684] sm:mx-auto :border-gray-700 lg:my-8" />
          <span className="block text-sm text-[#537684] sm:text-center ">
            © 2023
            <a className="hover:underline">PITmart</a>. All Rights Reserved.
          </span>
        </div>
      </footer>
    </footer>
  );
};
