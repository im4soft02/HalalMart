import React, { useEffect, useState } from "react";
import { SidebarA } from "../../Component/Admin/SidebarA";
import { CiImageOn } from "react-icons/ci";
import Product from "./Product";
import instance from "../../api/Instance";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const EditProduct = () => {
  // untuk menambah input
  const { id } = useParams();
  const navigate = useNavigate();
  //   const [category, setCategory] = useState();
  //   const [categories, setCategories] = useState([]);
  const [nama, setNama] = useState();
  const [keterangan, setKeterangan] = useState();
  const [harga, setHarga] = useState();
  const [stock, setStock] = useState();
  const [gambar, setGambar] = useState(null);
  const [image, setImage] = useState(null);

  const [data, setData] = useState([]);

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

  //   Show data yang mau di edit
  useEffect(() => {
    const getData = (e) => {
      //
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `/detailproduk/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: data,
      };

      instance
        .request(config)
        .then((response) => {
          console.log("Data yang mau di edit product_id berhasil di ambil ");
          console.log(response.data);
          setNama(response.data.message.nama);
          setHarga(response.data.message.harga);
          setStock(response.data.message.stock);
          setKeterangan(response.data.message.keterangan);
          setImage(response.data.message.gambar);
          fetch(response.data.message.gambar)
            .then((response) => response.blob())
            .then((res) => {
              const file = new File([res], "image", { type: res.type });
              setGambar(file);
            });

          //   console.log("asw");
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getData();
  }, []);

  // Handle bawah ini akan berjalan Ketika form di Submit / biasa nya make kata ( handleSbumit ) untuk keterangan nya
  const EditProductButton = (e) => {
    e.preventDefault();

    //
    let data = new FormData();
    data.append("nama", nama);
    // data.append("category", category);
    data.append("keterangan", keterangan);
    data.append("harga", harga);
    data.append("stock", stock);
    data.append("gambar", gambar);
    //_______________________________________/
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/update/${id}`,
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
        // setNama(response.data);
        console.log(response.data);
        navigate("/Dashboard/Product");
      })
      .catch((error) => {
        console.log(error);
        console.log("asw error");
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
      <div className="w-full flex flex-col overflow-hidden bg-[#] m-5 ml-10 rounded-2xl gap-5">
        {/* Warp scroll X Table */}
        <div className="w-full max-h-[600px] h-full bg-[#] flex flex-col gap-5">
          {/* Nama Page */}
          <div className="w-full h-[70px] py-2 bg-[#ffffff]  flex justify-between items-center px-5 rounded-2xl">
            <div className="w-full h-auto py-2 bg-[#]  ">
              <h1 className="text-[#9896A4] text-[23px] font-medium">
                Add Product
              </h1>
            </div>
          </div>
          <div className="w-full h-auto bg- ">
            <form onSubmit={EditProductButton} className="flex gap-5">
              {/* Kiri */}
              <div className="w-[50%] h-[500px] bg-[#ffffff] flex flex-col p-5 gap-3 rounded-xl">
                {/* Product name */}
                <h1 className="text-[18px] text-[#616161ee] font-medium">
                  Product Name
                </h1>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-[100%] h-[50px] rounded-md border-[1px] px-3 border-[#bfbfbfee]"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />

                {/* <h1 className="text-[18px] text-[#616161ee] font-medium">
                  Categories
                </h1> */}
                {/* <select
                  name="cars"
                  id="cars"
                  className="w-[100%] h-[50px] rounded-md border-[1px] px-3 border-[#bfbfbfee]"
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select> */}
                {/* _________________End Category_________________ */}
                {/* Description */}
                <h1 className="text-[18px] text-[#616161ee] font-medium">
                  Description
                </h1>
                <textarea
                  type="text"
                  placeholder="Deskripsi"
                  className="w-[100%] h-[220px] text- rounded-md border-[1px] px-3 border-[#bfbfbfee] pb-[170px]"
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                />
              </div>

              {/* Kanan */}
              <div className="w-[50%] h-[500px] bg-[#ffffff] flex flex-col p-5 gap-3 rounded-xl">
                {/* Product Price & Quantity */}
                <h1 className="text-[18px] text-[#616161ee] font-medium">
                  Price & Stock
                </h1>
                <div className="w-full h-auto bg-[#] flex justify-between ">
                  <input
                    type="tel"
                    placeholder="Price"
                    className="w-[45%] h-[50px] rounded-md border-[1px] px-3 border-[#bfbfbfee]"
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="w-[45%] h-[50px] rounded-md border-[1px] px-3 border-[#bfbfbfee]"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                {/* Product Image */}
                <h1 className="text-[18px] text-[#616161ee] font-medium">
                  Add image
                </h1>
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
                      className="w-[100%] h-[260px] flex justify-center items-center flex-col cursor-pointer rounded-xl bg-[#ff99b9] hover:bg-[#FBCBDA] hover:text-[#fefefe]"
                    >
                      <span>
                        <CiImageOn className="text-4xl" />
                      </span>
                      <p>Masukkan Gambar</p>
                      <p>file must be : jpg, jpeg, png.</p>
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
                    Edit Product
                  </button>
                </div>
              </div>
            </form>
            {/* ---------------END FORM------------- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
