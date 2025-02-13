import React from "react";
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
  return (
    <div
      className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
      style={{
        backgroundImage:
          "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
      }}
    >
      <div className={`${styles.section} w-[90%] flex flex-col items-center 800px:w-[60%]`}>
        <h1
          className={`text-[35px] leading-[1.2] text-center 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
        >
          Welcome to  <br /> Iska Shop
        </h1>
        <p className="pt-5 text-center text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
          assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
          quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
          <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
        </p>
        <div className="flex ">
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-text_color font-[Poppins] bg-primary_color p-4 rounded-lg text-[12px]">
                    Become a Vendor
                 </span>
            </div>
        </Link>
        <Link to="/products" className="inline-block">
            <div className={`${styles.button} mt-5`}>
                 <span className="text-text_color font-[Poppins] bg-primary_color p-4 rounded-lg text-[12px]">
                    Shop for products
                 </span>
            </div>
        </Link>

        </div>
      </div>
    </div>
  );
};

export default Hero;
