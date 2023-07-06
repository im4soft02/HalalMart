import React, { useEffect, useState } from "react";
import { SidebarA } from "../../Component/Admin/SidebarA";
import { CiImageOn } from "react-icons/ci";
import Product from "./Product";
import instance from "../../api/Instance";
import axios from "axios";
import Swal from "sweetalert2";
import { Navigate, useNavigate } from "react-router";
import CategorySelect from "../../Component/CategorySelect";

const AddProduct = () => {
  const navigate = useNavigate();
  // state loading
  const [loading, setLoading] = useState(false);
  // untuk menambah input
  const [nama, setNama] = useState();
  //   const [category, setCategory] = useState();
  //   const [categories, setCategories] = useState([]);
  const [keterangan, setKeterangan] = useState();
  const [harga, setHarga] = useState();
  const [stock, setStock] = useState();
  const [gambar, setGambar] = useState();
  const [image, setImage] = useState();
  const [kategori_id, setKategori_id] = useState();

  const onChangeKategori = (kategori_id) => {
    setKategori_id(kategori_id);
    console.log(kategori_id);
  };

  //   const onChangeKategori = (kategori_id) => {
  //     setKategori_id(kategori_id);
  //   };

  //handel Image drop file = memuncul kan gambar ketika drop file
  const fileChangeHandler = (e) => {
    const file = e.target.files[0];

    //Kondisi file lebbih dari 50kb
    if (file.size > 8500 * 1024) {
      // File size greater than 50KB
      alert("File size cannot exceed 50KB");
      return;
    }
    //
    setGambar(file);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle bawah ini akan berjalan Ketika form di Submit / biasa nya make kata ( handleSbumit ) untuk keterangan nya
  const AddProductButton = (e) => {
    e.preventDefault();

    //
    let data = new FormData();
    data.append("nama", nama);
    // data.append("category", category);
    data.append("keterangan", keterangan);
    data.append("harga", harga);
    data.append("stock", stock);
    data.append("gambar", gambar);
    data.append("kategori_id", kategori_id);
    //_______________________________________/
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/create",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // Authorization: "Bearer 26|wNumYJ6xuvwh9btNcM4OdlRw2IAQn8ClijUCUtyP",
        // ...data.getHeaders(),
      },
      data: data,
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log(response.data);
        if (response.data) {
          Swal.fire("Berhasil Tambah barang");
          navigate("/Dashboard/product");
        } else {
          Swal.fire({
            title: `<span class="text-gray-600">Nama pengguna: ${response.data.name}</span>`,
            width: 600,
            padding: "1em",
            color: "#716add",
            customClass: {
              title: "custom-title-class",
              confirmButton: "custom-confirm-button-class",
            },
            background:
              "#fff url(https://sweetalert2.github.io/images/trees.png)",
            backdrop: `
               rgba(0,0,123,0.4)
               url("https://sweetalert2.github.io/images/nyan-cat.gif")
               left center
               no-repeat
             `,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //

    //______________END HANDLE SUBMIT BTN_____________
  };

  return (
    <div className="w-full h-[100vh] flex flex-row overflow-hidden bg-[#F2F7F9]">
      {/* Sidebar */}
      <div>
        <SidebarA />
      </div>
      {/* Tabel BG response */}
      <main className="w-full flex flex-col overflow-hidden bg-[#] m-5 ml-10  gap-5">
        {/* Warp scroll X Table */}
        <div className="w-full max-h-[600px] h-full bg-[#] flex flex-col gap-5">
          {/* Nama Page */}
          <div className="w-full h-[70px] py-2 bg-[#ffffff] flex justify-between items-center px-5 rounded-2xl">
            <div className="w-full h-auto py-2 bg-[#]  ">
              <h1 className="text-[#9896A4] text-[23px] font-medium">
                Add Product
              </h1>
            </div>
          </div>
          <div className="w-full h-auto bg- ">
            <form onSubmit={AddProductButton} className="flex gap-5">
              {/* Kiri */}
              <div className="w-[50%] h-[500px] bg-[#ffffff] flex flex-col p-5 gap-3 rounded-xl">
                {/* Product name */}
                <h1 className="text-[18px] text-[#537684] font-medium">
                  Product Name
                </h1>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-[100%] h-[50px] rounded-md border-[1px] px-3 border-[#bfbfbfee] placeholder-[#7ae7ff]"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
                {/* ___________________Category ___________________*/}
                <CategorySelect onChangeKategori={onChangeKategori} />
                {/* _________________End Category_________________ */}
                {/* Description */}
                <h1 className="text-[18px] text-[#537684] font-medium">
                  Description
                </h1>
                <textarea
                  type="text"
                  placeholder="Deskripsi"
                  className="w-[100%] h-[220px] text-[#3694ba] rounded-md border-[1px] px-3 border-[#bfbfbfee] pb-[170px] placeholder-[#7ae7ff]"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                />
              </div>

              {/* Kanan */}
              <div className="w-[50%] h-[500px] bg-[#ffffff] flex flex-col p-5 gap-3 rounded-xl">
                {/* Product Price & Quantity */}
                <h1 className="text-[18px] text-[#537684] font-medium">
                  Price & Stock
                </h1>
                <div className="w-full h-auto bg-[#] flex justify-between ">
                  <input
                    type="tel"
                    placeholder="Price"
                    className="w-[45%] h-[50px] rounded-md border-[1px] px-3 border-[#bfbfbfee] placeholder-[#7ae7ff]"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="w-[45%] h-[50px] rounded-md border-[1px] px-3 border-[#bfbfbfee] placeholder-[#7ae7ff]"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                {/* Product Image */}
                <h1 className="text-[18px] text-[#537684] font-medium">
                  Add image
                </h1>
                <div>
                  {image ? (
                    <img
                      className=" rounded-xl w-[100%] h-[260px] "
                      src={image}
                      alt="Product "
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
                        <CiImageOn className="text-4xl" />
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
                {/* _______________________________________ */}
                {/* ___________Submit Button Form__________ */}
                <div className="w-full h-full">
                  <button
                    type="submit"
                    className="w-full h-full bg-[#FBCBDA] hover:bg-[#ff99b9] rounded-lg font-semibold text-[#fefefe]"
                  >
                    Add Product
                  </button>
                </div>
              </div>
            </form>
            {/* ---------------END FORM------------- */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AddProduct;
