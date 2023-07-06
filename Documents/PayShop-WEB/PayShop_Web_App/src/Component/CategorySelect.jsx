import axios from "axios";
import React, { useEffect, useState } from "react";
import instance from "../api/Instance";

const CategorySelect = ({ onChangeKategori }) => {
  const [kategori, setKategori] = useState([]);

  const handleKategori = (e) => {
    const CategoryPilih = e.target.value;
    onChangeKategori(CategoryPilih);
  };

  useEffect(() => {
    //
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/read-kategori",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    instance
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setKategori(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <h1 className="text-[18px] text-[#537684] font-medium">Categories</h1>
      <select
        name="cars"
        id="cars"
        onChange={handleKategori}
        className="w-[100%] h-[50px] rounded-md border-[1px] px-3 border-[#bfbfbfee]"
      >
        {kategori.map((item) => (
          <option key={item.id} onChange={handleKategori} value={item.id}>
            {item.nama}
          </option>
        ))}
      </select>
    </>
  );
};

export default CategorySelect;
