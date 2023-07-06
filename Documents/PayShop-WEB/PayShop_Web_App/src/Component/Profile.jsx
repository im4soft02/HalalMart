import React, { useEffect, useState } from "react";
import NavBar_PayShop_Profile from "./NavBar_PayShop_Profile";
import { Footer } from "./Footer";
import { NavLink } from "react-router-dom";
import UserName from "./UserName";
import instance from "../api/Instance";
import { AiFillEdit } from "react-icons/ai";
import EditPhoto from "./EditPhoto";
import { IoMdCloseCircleOutline } from "react-icons/io";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [showPhoto, setShowPhoto] = useState(false);

  //   ________API Profile______
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
        setProfile(response.data.data);
        // setShowPhoto(response.data.data.gambar);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div className="w-full min-h-[100vh] flex flex-col  justify-between gap-[50px] bg-[#F2F7F9]">
        <navbar>
          <NavBar_PayShop_Profile />
        </navbar>
        <main className="w-full h-[400px] flex justify-center  bg-[#]">
          <div className="w-[900px] min-h-[400px] flex gap-5 bg-[#]">
            {/* List side */}
            <div className="w-[230px] h-full flex flex-col rounded-2xl bg-[#fffe]">
              <div className="w-full h-[72px] flex justify-center items-center bg-">
                <UserName />
              </div>
              <hr />
              <div className="w-full h-auto flex flex-col gap-3 pl-5 pt-5 text-[#53768470] font-semibold">
                <NavLink to={"/profile/EditProfile"}>Edit Profile</NavLink>
                <NavLink>Pesanan Saya</NavLink>
              </div>
            </div>
            {/* Warp Profile */}
            <div className=" w-[660px] h-full flex flex-col gap-5 bg-[#]">
              {/* Name */}
              <div className=" w-full h-[50px] rounded-2xl flex items-center pl-5 bg-[#ffffffee]">
                <h1 className="text-[#9896A4] text-[20px] font-bold">
                  My Profile
                </h1>
              </div>
              {/* Profile */}
              <div className=" w-full h-[330px] flex justify-between rounded-2xl p-5 bg-[#ffffff]">
                <main className="bg-[#] w-[300px] h-full flex flex-col justify-between">
                  <h1 className="text-[#53768470] font-semibold">Email</h1>
                  <h1 className="text-[#537684] font-semibold">
                    {profile.email}
                  </h1>
                  <h1 className="text-[#53768470] font-semibold">
                    Nomor Telpon
                  </h1>
                  <h1 className="text-[#537684] font-semibold">
                    {profile.no_hp}
                  </h1>
                  <h1 className="text-[#53768470] font-semibold">
                    Tanggal Lahir
                  </h1>
                  <h1 className="text-[#537684] font-semibold">
                    {profile.tgl_lhr}
                  </h1>
                  <h1 className="text-[#53768470] font-semibold">
                    Jenis Kelamin
                  </h1>
                  <h1 className="text-[#537684] font-semibold">
                    {profile.gender}
                  </h1>
                </main>
                {/*  */}
                <main className="bg-[#] w-[300px] h-full flex flex-col justify-center items-center gap-5">
                  {/* _______________________ */}
                  <button
                    onClick={() => setShowPhoto((prev) => !prev)}
                    className="w-[40px] h-[40px] bg-[#FBE285] hover:bg-[#fadd74] rounded-full flex items-center justify-center absolute top-[360px] left-[995px] hover:scale-[1.09] transition-[200ms]"
                  >
                    <AiFillEdit className="text-[20px] text-[#537684]" />
                  </button>
                  {showPhoto && (
                    <div className=" absolute w-[700px]  bg-[#] justify-center items-center left-[500px] top-[170px]">
                      <div className="max-w-[430px] w-full h-[400px] bg-[#daf3fd] rounded-xl flex justify-center flex-col items-center gap-4">
                        <div className="w-[400px] h-auto flex justify-end bg  ">
                          {/* <button  onClick={() => setShowPhoto(false)}>
                            <IoMdCloseCircleOutline className="text-[24px] text-[#FBE285]" />
                          </button> */}
                        </div>{" "}
                        <div className="w-[400px] h-auto">
                          <EditPhoto setShowPhoto={setShowPhoto} />
                        </div>
                      </div>
                    </div>
                  )}
                  {/* _____________________________ */}
                  <div className="w-[200px] h-[200px] bg-[#D9D9D9] rounded-[200px] overflow-hidden">
                    <img
                      src={profile.gambar}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <NavLink></NavLink>
                  <h1 className="text-[#537684] font-semibold">
                    {profile.username}
                  </h1>
                </main>
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Profile;
