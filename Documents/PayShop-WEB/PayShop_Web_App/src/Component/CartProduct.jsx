import React, { useEffect, useState } from "react";

import { NavLink, useParams } from "react-router-dom";
import instance from "../api/Instance";

const CartProduct = ({ data, jumlah_pesanan, }) => {
  const { id } = useParams();
  // untuk mengatur BTN jumlah
  const [produk, setProduk] = useState([]);
  const [quantity, setQuantity] = useState(0);

  // Quantity Increment/Decrement in Hooks - Start
  const HandleIncrement = () => {
    setQuantity((prevCount) => prevCount + 1);
  };

  const HandleDecrement = () => {
    // if disini saat quantity  1  maka tidak bisa di kurang lagi jdi tidak akan minus
    if (quantity > 1) {
      setQuantity((prevCount) => prevCount - 1);
    }
  };
  //__________ END Quantity __________\\

  useEffect(() => {
    const fetchProducts = () => {
      //MAP DATA DARI PRODUK ID
      const productIds = data.map((item) => item.produk_id);
      //
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `/produk`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: productIds,
      };
      console.log("ini id produk", productIds);
      instance
        .request(config)
        .then((response) => {
          // console.log(JSON.stringify(response.data.data));
          //   console.log("DI BAWAH INI DATA PRODUK CARTPRODUK");
          //   setProduk(response.data);
          //   console.log(response.data);
          // console.log("data kontol");
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchProducts();
  }, []);

  return (
    <div className="w-full  h-auto bg-[#ffffff] flex flex-col gap-5 p-3">
      {data?.map((item) => {
        return (
          <div key={item.id} className="w-full  bg-[#]">
            <div className="w-full md:h-[90px] lg:h-[100px] xl:h-[120px] rounded-lgn bg-[#ececec57] flex flex-row p-3 gap-5 rounded-md">
              {/* img */}
              <div className="max-w-[20%] xl:w-[14%] h-full bg-[#] overflow-hidden rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]">
                <img
                  src={item.gambar}
                  alt="kosong"
                  className="w-[100px] h-auto"
                />
              </div>
              {/* Name & price */}
              <div className="md:w-[100%]  xl:w-[100%] xl:h-[95px] flex xl:flex- justify-between bg-[#]">
                {/* Product Name */}
                <div className="md:w-[100%] lg:w-[100%] bg-[#]">
                  <h1 className="text-[14px] lg:text-[18px] xl:text-[18px] text-[#585858ee]">
                    {item.nama}
                  </h1>
                </div>
                {/* Price & count*/}
                <div className="md:w-[100%] xl:w-[28%] xl:h-[95px] flex xl:flex-col justify-between bg-[#]">
                  {/* Price */}
                  <div className="w-full h-auto bg-[#] flex ">
                    <h1 className="text-[15px] lg:text-[17px] xl:text-[14px] font-extrabold text-[#D00B0B]">
                      Rp. {item.total_harga}
                    </h1>
                  </div>
                  {/* count */}
                  <div className="bg- flex w-[40%] xl:w-full justify-between datas-center gap-3 xl:gap-0">
                    <button
                      className="bg-[#D00B0B] w-[20px] h-[25px] lg:w-[25px] lg:h-[30px] xl:w-[30px] xl:h-[35px] rounded-md lg:rounded-lg text-[#ffffff]"
                      onClick={() => HandleDecrement(data.id)}
                    >
                      -
                    </button>
                    <p> {quantity} </p>
                    <button
                      className="bg-[#D00B0B] w-[20px] h-[25px] lg:w-[25px] lg:h-[30px] xl:w-[30px] xl:h-[35px] rounded-md lg:rounded-lg text-[#ffffff]"
                      onClick={() => HandleIncrement(data.id)}
                    >
                      +
                    </button>
                    <h1>Jumlah Produk : {item.jumlah}</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartProduct;
