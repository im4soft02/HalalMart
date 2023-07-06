import React from "react";
import Card from "./Card";
import { JsonServer } from "../database/JsonServer";

const Rekomendasi = () => {

    
  return (
    <section className=" bg-[#] w-full h-auto relative flex flex-wrap  gap-3  mb-[30px]">
      {/* All Product */}
      <div className="bg-[#fff] w-full h-[50px] flex items-center justify-center rounded-lg shadow-[0px_3px_10px_2px_rgba(0,0,0,0.1)]">
        <h1 className="font-semibold text-[#ffafc8]">Semua Produk</h1>
      </div>
      {/* Card */}
      <div id="Card" className="bg-[#] w-full h-auto flex flex-warp  ">
        {/* <JsonServer /> */}
        <Card />
      </div>
    </section>
  );
};

export default Rekomendasi;
