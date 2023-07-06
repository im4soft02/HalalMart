import React, { useEffect, useState } from "react";
import instance from "../api/Instance";
import { BsImage } from "react-icons/bs";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const EditPhoto = ({ setShowPhoto }) => {
  const [profile, setProfile] = useState([]);
  const [gambar, setGambar] = useState(null);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  //handel Image drop file = memuncul kan gambar ketika drop file
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // API Mengambil data yang mau di edit
  useEffect(() => {
    const getData = (e) => {
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
          console.log(response.data.data.gambar);

          setImage(response.data.data.gambar);
          fetch(response.data.data.gambar)
            .then((response) => response.blob())
            .then((res) => {
              const file = new File([res], "image", { type: res.type });
              setGambar(file);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  // API EDIT Photo
  const EditPhotoProfile = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append("gambar", gambar);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/update-photo-profile",
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
        setShowPhoto(false);
        navigate("/Profile");
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // API REMOVE Photo
  const RemovePhotoProfile = (e) => {
    e.preventDefault();

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/delete-photo-profile",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Photo profile di hapus",
          showConfirmButton: false,
          timer: 1500,
        });
        setShowPhoto(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-[400px] h-auto flex bg-[#]">
      <div className="h-auto max-w-[400px] w-full">
        <form onSubmit={EditPhotoProfile}>
          {/* Product Image */}
          <h1 className="text-[18px] text-[#616161ee] font-medium"></h1>
          <div>
            {/* jika ingin menampilkan maka ganti */}
            {gambar ? (
              <img
                className="rounded-xl w-[100%] h-[260px]"
                src={image}
                alt="asw gk ada gambar"
                onClick={() => {
                  document.querySelector("#input-file").click();
                }}
              />
            ) : (
              <div
                onClick={() => {
                  document.querySelector("#input-file").click();
                }}
                className="w-[100%] h-[260px] flex justify-center items-center flex-col cursor-pointer rounded-xl bg-[#fefefe] hover:bg-[#ff99b9] text-[#7ae7ff] hover:text-[#fefefe]"
              >
                <span>
                  <BsImage className="text-4xl" />
                </span>
                <p>Ukuran gambar: maks. 1 MB</p>
                <p>Format gambar: .JPEG, .PNG</p>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              id="input-file"
              onChange={fileChangeHandler}
            />
          </div>
          <div className="w-full h-[40px] flex gap-2 mt-5">
            <button
              onClick={() => setShowPhoto(false)}
              className="w-full h-full bg-[#FBE285] hover:bg-[#ffe06f] rounded-lg font-semibold text-[#fefefe]"
            >
              Tutup
            </button>
            <button
              type="submit"
              className="w-full h-full bg-[#FBCBDA] hover:bg-[#ff99b9] rounded-lg font-semibold text-[#fefefe]"
            >
              Simpan
            </button>
            <button
              onClick={RemovePhotoProfile}
              className="w-full h-full bg-[#FBE285] hover:bg-[#ffe06f] rounded-lg font-semibold text-[#fefefe]"
            >
              Hapus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPhoto;
