import React from "react";
import CardR from "./CardR";
import { JsonServer } from "../database/JsonServer";

const Rekomendasi_Beneran = () => {
  return (
    <section className=" bg-[#] w-full h-auto relative flex flex-wrap  gap-3  mb-[]">
      {/* All Product */}
      <div className="bg-[#fff] w-full h-[50px] flex items-center justify-center rounded-lg shadow-[0px_3px_10px_2px_rgba(0,0,0,0.1)]">
        <h1 className="font-semibold text-[#cf8dff]">Rekomendasi</h1>
      </div>
      {/* Card */}
      <div id="Card" className="bg-[#] w-full h-auto flex flex-warp   ">
        {/* <JsonServer /> */}
        <CardR />
      </div>
    </section>
  );
};

export default Rekomendasi_Beneran;
