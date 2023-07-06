import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import Dashboard from "../Page/admin/Dashboard";
import PayLogo from "../assets/Halal/logo_halalfull.png";
import FooterA from "./Admin/FooterA";
import DropDown from "./DropDown";
import instance from "../api/Instance";

const UserName = () => {
  //   const username = localStorage.getItem("userName");
  const [profileImage, setProfileImage] = useState([]);

  useEffect(() => {
    //
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/profile",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data.data));
        console.log(response.data.data);
        setProfileImage(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      <main className="flex gap-2 justify-center items-center">
        {/* <span class="animate-ping absolute inline-flex h-[20px] w-[20px] rounded-full bg-sky-400 opacity-75"></span> */}

        <div className="w-[30px] h-[30px] overflow-hidden object-cover bg-[#fefe] rounded-[100px]">
          <img
            src={profileImage.gambar}
            alt="image"
            className="w-[30px] h-[30px] object-cover"
          />
        </div>
        <div>
          <h1 className="text-[#537684] font-bold ">{profileImage.username}</h1>
        </div>
      </main>
    </>
  );
};

export default UserName;
