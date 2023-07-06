import React from "react";
// Corousel ( React Slick )
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
// img
import Lcarol1 from "../assets/Carol/Alfa01.webp";
import Lcarol2 from "../assets/Carol/Carol2.jpg";
import Lcarol3 from "../assets/Carol/Carol3.jpg";
import Lcarol4 from "../assets/Carol/Carol4.jpg";
import Lcarol5 from "../assets/Carol/Carol5.jpg";
import Lcarol6 from "../assets/Shop.jpg";
// Icons
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";

const Carousel = () => {
  // Prev Arrows
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        id="btn"
        // className={className}
        className="  w-[50px] h-[80px] bg-slate-900  sm:flex items-center justify-center rounded-[10px] border-2 hover:bg-orange-800  transition-[600]"
        style={{
          ...style,
          position: "absolute",
          left: "px",
          zIndex: 1,
          cursor: "pointer",
          // background: "green",
        }}
        onClick={onClick}
      >
        <IoMdArrowBack color="#fefefe" className="mt-7 ml-3 bg- text-[20px]" />
      </div>
    );
  };
  // Next Arrows
  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className="  w-[50px] h-[80px] bg-slate-900  sm:flex items-center justify-center rounded-[10px] border-2 hover:bg-orange-800  transition-[600]"
        style={{
          ...style,
          position: "absolute",
          right: "0px",
          zIndex: 1,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <IoMdArrowForward
          color="#fefefe"
          //   className="mt-7 ml-3 bg- text-[20px]"
        />
      </div>
    );
  };

  // React Slick
  const settings = {
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    // centerMode: true,
    // className: "notes-slider",

    responsive: [
      {
        breakpoint: 2111,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="w-full h-auto p-[0px] bg-[#] ">
      <Slider {...settings}>
        <div className="box w-full h-[120px] sm:h-[156px] md:h-[200px] lg:h-[280px] lg:w-[250px] bg-  relative ">
          <img
            src={Lcarol1}
            alt=""
            className=" rounded-[15px] object-cover w-full h-full"
          />
        </div>
        <div className="box w-full h-[120px] sm:h-[156px] md:h-[200px] lg:h-[280px] bg-  relative ">
          <img
            src="https://alfagift.id/_ipx/f_webp,q_70/https://cdn.takdes.net/media/bo/product/ama/banner/pm_banner_230524_kyMn.png"
            alt=""
            className=" rounded-[15px] object-cover w-full h-full"
          />
        </div>
        <div className="box w-full h-[120px] sm:h-[156px] md:h-[200px] lg:h-[280px] bg-  relative ">
          <img
            src="https://alfagift.id/_ipx/f_webp,q_70/https://cdn.takdes.net/media/bo/product/ama/banner/pm_banner_230619_wdNo.png"
            alt=""
            className=" rounded-[15px] object-cover w-full h-full"
          />
        </div>
        <div className="box w-full h-[120px] sm:h-[156px] md:h-[200px] lg:h-[280px] bg-  relative ">
          <img
            src="https://alfagift.id/_ipx/f_webp,q_80/https://cdn.takdes.net/media/bo/product/ama/banner/pm_banner_230601_8BFL.png"
            alt=""
            className=" rounded-[15px] object-cover w-full h-full"
          />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;
