import React, { useEffect, useState } from "react";

import { RiDashboardLine } from "react-icons/ri";
import { SidebarA } from "../../Component/Admin/SidebarA";
import { NavbarA } from "../../Component/Admin/NavbarA";
import instance from "../../api/Instance";
import UserName from "../../Component/UserName";
import { useNavigate } from "react-router";

export const Dashboard = () => {
  const username = localStorage.getItem("userName");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

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

  //____________________API
  useEffect(() => {
    //
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/dashboard",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
        setData(response.data);
        console.log(response.data);
        // console.log("data kontol");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  //
  return (
    <div className="w-full h-[100vh] flex flex-row overflow-hidden bg-[#F2F7F9]">
      {/* Sidebar */}
      <div>
        <SidebarA />
      </div>
      {/* warp isi dashboard response */}
      <main className="w-full flex flex-col overflow-hidden bg-[#] m-5 ml-10 rounded-2xl gap-5">
        {/* Nama Page */}
        <div className="w-full h-[70px] py-2 bg-[#ffffff] border-b-[1px] flex justify-between items-center px-5 rounded-2xl">
          <h1 className="text-[#9896A4] text-[23px] font-medium">Dashboard</h1>

          <span className="text-[#9896A4] w-[230px] flex items-center justify-between bg- text-[20px] font-bold">
            Hello <UserName />
          </span>
        </div>
        {/* Konten dasboard */}
        <div className="w-full h-full flex flex-row justify-center items-center overflow-hidden bg-[#ffffff] rounded-2xl p-5 ">
          {/* Warp scroll X Table */}
          <div className="w-full  max-h-[600px] h-full bg-[#]">
            {/* Data */}
            <div
              // key={item.}
              className="w-full h-auto bg-[#] flex flex-col gap-5 "
            >
              {/*  */}
              <div className="w-[40%] h-[85px] rounded-[15px] flex items-center justify-between bg-[#E0C6F3] hover:bg-[#d8a2ff] hover:scale-[1.05] transition-[200ms] ">
                <h1 className="text-[#fff] text-[20px] font-semibold pl-5">
                  Jumlah User
                </h1>
                <hr className="border-[1px] border-[#fffe] mt-[6px]" />
                <div className="w-[25%] h-full bg-[#B9E8F2]  flex items-center justify-center rounded-[15px]">
                  <h1 className="text-[#fff] text-[45px] font-bold">
                    {data["jumlah user"]}
                  </h1>
                </div>
              </div>
              {/*  */}
              <div className="w-[40%] h-[85px] rounded-[15px] flex items-center justify-between bg-[#FBCBDA] hover:bg-[#ffb4cb] hover:scale-[1.05] transition-[200ms] ">
                <h1 className="text-[#fff] text-[22px] font-semibold  pl-5">
                  Jumlah Product
                </h1>
                <div className="w-[25%] h-full bg-[#E0C6F3] flex items-center justify-center rounded-[15px]">
                  <h1 className="text-[#fff] text-[45px] font-bold">
                    {data["jumlah produk"]}
                  </h1>
                </div>
              </div>
              {/*  */}
              <div className="w-[40%] h-[85px] rounded-[15px] flex items-center justify-between bg-[#B9E8F2] hover:bg-[#91ebff] hover:scale-[1.05] transition-[200ms] ">
                <h1 className="text-[#fff] text-[20px] font-semibold pl-5">
                  Jumlah Kategori
                </h1>
                <hr className="border-[1px] border-[#fffe] mt-[6px]" />
                <div className="w-[25%] h-full bg-[#F9CADA] flex items-center justify-center rounded-[15px]">
                  <h1 className="text-[#fff] text-[45px] font-bold">
                    {data["jumlah produk"]}
                  </h1>
                </div>
              </div>
            </div>
            {/*  */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
