import React, { useEffect, useState } from "react";
// Komponen
import { Footer } from "./Footer";
import NavBar_PayShop_Profile from "./NavBar_PayShop_Profile";
import UserName from "./UserName";
//
import instance from "../api/Instance";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const [username, setUsername] = useState();
  const [no_hp, setNo_hp] = useState();
  const [tgl_lhr, setTgl_lhr] = useState();
  const [gender, setGender] = useState();
  const [alamat, setAlamat] = useState();

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

        setProfile(response.data.data);
        setUsername(response.data.data.username);
        setNo_hp(response.data.data.no_hp);
        // console.log(response.data.data.no_hp);
        setTgl_lhr(response.data.data.tgl_lhr);
        setGender(response.data.data.gender);
        setAlamat(response.data.data.alamat);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const EditProfile = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("username", username);
    data.append("no_hp", no_hp);
    data.append("tgl_lhr", tgl_lhr);
    data.append("gender", gender);
    data.append("alamat", alamat);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/update-profile",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Berhasil Edit Profile",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <form
        onSubmit={EditProfile}
        className="w-full min-h-[100vh] flex flex-col  justify-between gap-[50px] bg-[#F2F7F9]"
      >
        <div>
          <NavBar_PayShop_Profile />
        </div>
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
              <div className=" w-full h-[50px] rounded-2xl flex justify-between items-center pl-5 bg-[#fff]">
                <h1 className="text-[#9896A4] text-[20px] font-bold">
                  Edit Profile
                </h1>
                <div className="bg- w-[130px] h-full flex items-center justify-between mr-5">
                  <button
                    type="submit"
                    className="w-[60px] h-[25px]  bg-[#FBE285] hover:bg-[#fdda5a] rounded-lg font-semibold text-[#fefefe] text-[13px]  "
                  >
                    Save
                  </button>
                  <NavLink
                    to={"/profile"}
                    className="w-[60px] h-[25px] bg-[#FBCBDA] hover:bg-[#ffa8c3] rounded-lg font-semibold text-[#fefefe] text-[13px] flex justify-center items-center "
                  >
                    Batal
                  </NavLink>
                </div>
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
                  <input
                    value={no_hp}
                    onChange={(e) => setNo_hp(e.target.value)}
                    className="text-[#537684] font-semibold border-[1px] rounded-lg p-1"
                  ></input>
                  {/* _________________________ */}
                  <h1 className="text-[#53768470] font-semibold">
                    Tanggal Lahir
                  </h1>
                  <input
                    value={tgl_lhr}
                    onChange={(e) => setTgl_lhr(e.target.value)}
                    className="text-[#537684] font-semibold border-[1px] rounded-lg p-1"
                  ></input>
                  {/* _________________________ */}
                  <h1 className="font-semibold text-[#53768470]">
                    Jenis Kelamin
                  </h1>
                  <input
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className=" text-[#537684] font-semibold border-[1px] rounded-lg p-1"
                  ></input>
                </main>
                {/*  */}
                <main className="bg-[#] w-[300px] h-full flex flex-col justify-between items-center gap-5">
                  <div className="w-[200px] h-[200px] bg-[#D9D9D9] rounded-[200px] overflow-hidden">
                    <img
                      src={profile.gambar}
                      alt="image"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <NavLink></NavLink>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className=" text-[#537684] font-semibold border-[1px] rounded-lg p-1"
                  ></input>
                </main>
              </div>
            </div>
          </div>
        </main>
        {/* Footer */}
        <Footer />
      </form>
    </>
  );
};
