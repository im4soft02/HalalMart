import React, { useState } from "react";
import { SidebarA } from "../../Component/Admin/SidebarA";
import { CiImageOn } from "react-icons/ci";
import { NavLink } from "react-router-dom";

const AddCategoriesA = () => {
  const [photo, setPhoto] = useState();
  const [image, setImage] = useState();

  //handel Image drop file
  const fileChangeHandler = (e) => {
    setPhoto(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="w-full h-[100vh] flex flex-row overflow-hidden bg-[#F2F7F9]">
      {/* Sidebar */}
      <div>
        <SidebarA />
      </div>
      {/* Tabel BG response */}
      <main className="w-full flex flex-col overflow-hidden bg-[#] m-5 ml-10 rounded-2xl gap-5">
        {/* Nama Page */}
        <div className="w-full h-[70px] py-2 bg-[#ffffff] border-b-[1px] flex justify-between items-center px-5 rounded-2xl">
          <h1 className="text-[#9896A4] text-[23px] font-medium">
            Add Category
          </h1>
        </div>
        {/* Form Categories */}
        <div className="w-full h-auto bg- ">
          <form className="flex gap-5">
            {/* kiri */}
            <div className="w-[50%] min-h-max h-full bg-[#ffffff] flex flex-col p-5 gap-3 rounded-xl">
              {/* Product name */}
              <h1 className="text-[18px] text-[#537684] font-medium">
                Category Name
              </h1>
              <div className="w-full h-auto bg-[#] flex justify-between ">
                <input
                  type="text"
                  placeholder="Category Name"
                  className="w-[100%] h-[50px] rounded-md border-[1px] px-3 border-[#bfbfbfee] placeholder-[#7ae7ff]"
                />
              </div>

              {/* _______________________________________ */}
              {/* Button Form */}
              <div className="w-full h-[50px]">
                <button className="w-full h-full bg-[#FBCBDA] rounded-lg font-semibold text-[#fefefe]">
                  Add Category
                </button>
              </div>
            </div>
            {/* kanan */}
            <div className="w-[50%] h-[500px] bg-[#ffffff] flex flex-col p-5 gap-3 rounded-xl">
              <table className="w-full max-h-[100px] h-auto bg-[ffffffee] border-separate border-spacing-y-3">
                <thead className="bg-[#DEC7F3] w-[50%] text-[#fefe] text-[17px]  ">
                  <tr className="border-y-4">
                    <th className="bg-[#] w-[120px] h-[10px] text-left pl-3 py-2  ">
                      Category Name
                    </th>
                    <th className="bg-[#] w-[0px] h-auto text-center ">
                      Action
                    </th>
                  </tr>
                </thead>
                {/* ---------------------------- */}
                <tbody className="bg-[#F2F7F9] ">
                  <tr className="">
                    <td className=" text-left pl-3 py-2 text-[#474747ee]">
                      Makanan
                    </td>
                    <td className="w-[px] h-auto bg-[#]">
                      <span className="w-full h-auto flex justify-evenly bg-[#]">
                        {/* Edit */}
                        <NavLink
                          to={""}
                          className="w-[60px] h-[20px] bg-[#B9E8F2] rounded-[5px] text-center text-[11px] text-[#fefe] font-semibold flex justify-center items-center "
                        >
                          <h1>Edit</h1>
                        </NavLink>
                        {/* Delete */}
                        <NavLink className="w-[60px] h-[20px] bg-[#FBCBDA]  rounded-[5px] text-center text-[11px] text-[#fefe] font-semibold flex justify-center items-center">
                          <h1>Delete</h1>
                        </NavLink>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </form>
          {/* ---------------END FORM------------- */}
        </div>
        {/*  */}
      </main>
    </div>
  );
};

export default AddCategoriesA;
