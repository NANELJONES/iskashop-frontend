import React, { useState } from "react";
import { AiOutlineFolderAdd, AiOutlineGift } from "react-icons/ai";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { VscNewFile } from "react-icons/vsc";
import { CiMoneyBill, CiSettings } from "react-icons/ci";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";
import { HiOutlineReceiptRefund } from "react-icons/hi";
import { AiOutlineLogin } from "react-icons/ai";
import { FaPaperPlane } from "react-icons/fa";

import axios from "axios";
import { server } from "../../../server";

const DashboardSideBar = ({ active }) => {
  const [isOpen, setIsOpen] = useState(false);

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout`,{
      withCredentials: true,
      headers: {
        'Access-Control-Allow-Origin': 'https://iskashop-backend.vercel.app/', 
        'Content-Type': 'application/json',
        'token': localStorage.getItem('token')
    }
    });

    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
      {/* Toggle Button - Only visible on small/medium screens */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed right-4 top-4 z-[60] bg-primary_color p-2 rounded-full shadow-lg"
      >
        <RxDashboard size={24} color="white" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[40] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`w-full no_scroll md:w-[300px] 800px:w-[300px] h-screen flex flex-col gap-2 shadow-sm overflow-y-auto fixed md:relative top-0 z-[50] bg-text_color
        ${isOpen ? 'right-0' : '-right-full md:right-0'} transition-all duration-300 ease-in-out`}>
      {/* single item */}
      <div className="bg-primary_color p-6">
        <p className="text-text_color text-[1em]">Vendor</p>
        <h6 className="text-text_color text-[2em]">Dashboard</h6>
      </div>
      <div className={`w-full flex items-center p-4 ${active === 1 ? " bg-primary_color" : "none"}`}>
        <Link to="/dashboard" className="flex w-full items-center" >
          <RxDashboard
            size={25}
            color={`${active === 1 ? "rgb(255,255,255)" : "#17637C"}`}
          />
          <h5
            className={`pl-2 text-[16px] font-[400] ${
              active === 1 ? " text-text_color " : "text-primary_color"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className={`w-full flex items-center p-4 ${active === 2 ? " bg-primary_color" : "none"}`}>
        <Link to="/dashboard-orders" className="w-full flex items-center">
          <FiShoppingBag
            size={25}
            color={`${active === 2 ? "rgb(255,255,255)" : "#17637C"}`}
          />
          <h5
            className={`pl-2 text-[16px] font-[400] ${
              active === 2 ? " text-text_color " : "text-primary_color"
            }`}
          >
            All Orders
          </h5>
        </Link>
      </div>

      <div className={`w-full flex items-center p-4 ${active === 3 ? " bg-primary_color" : "none"}`}>
        <Link to="/dashboard-products" className="w-full flex items-center">
          <FiPackage size={25} color={`${active === 3 ? "rgb(255,255,255)" : "#17637C"}`} />
          <h5
            className={`pl-2 text-[16px] font-[400] ${
              active === 3 ? " text-text_color " : "text-primary_color"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className={`w-full flex items-center p-4 ${active === 4 ? " bg-primary_color" : "none"}`}>
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <AiOutlineFolderAdd
            size={25}
            color={`${active === 4 ? "rgb(255,255,255)" : "#17637C"}`}
          />
          <h5
            className={`pl-2 text-[16px] font-[400] ${
              active === 4 ? "text-text_color" : "text-primary_color"
            }`}
          >
            Create Product
          </h5>
        </Link>
      </div>

      {/* <div className="w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={25}
            color={`${active === 5 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div> */}

      {/* <div className="w-full flex items-center p-4">
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <VscNewFile
            size={25}
            color={`${active === 6 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div> */}

      {/* <div className="w-full flex items-center p-4">
        <Link
          to="/dashboard-withdraw-money"
          className="w-full flex items-center"
        >
          <CiMoneyBill
            size={25}
            color={`${active === 7 ? "crimson" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[16px] font-[400] ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Withdraw Money
          </h5>
        </Link>
      </div> */}

      <div className={`w-full flex items-center p-4 ${active === 8 ? " bg-primary_color" : "none"}`}>
        <Link to="/shop-remittance" className="w-full flex items-center">
          <CiMoneyBill
            size={25}
            color={`${active === 8 ? "rgb(255,255,255)" : "#17637C"}`}
          />
          <h5
            className={`pl-2 text-[16px] font-[400] ${
              active === 8 ? "text-text_color" : "text-primary_color"
            }`}
          >
            Remittance
          </h5>
        </Link>
      </div>

      <div className={`w-full flex items-center p-4 ${active === 9 ? " bg-primary_color" : "none"}`}>
        <Link to="/dashboard-coupouns" className="w-full flex items-center">
          <AiOutlineGift
            size={25}
            color={`${active === 9 ? "rgb(255,255,255)" : "#17637C"}`}
          />
          <h5
            className={`pl-2 text-[16px] font-[400] ${
              active === 9 ? "text-text_color" : "text-primary_color"
            }`}
          >
            Discount Codes
          </h5>
        </Link>
      </div>

      <div className={`w-full flex items-center p-4 ${active === 10 ? " bg-primary_color" : "none"}`}>
        <Link to="/shop-promotions" className="w-full flex items-center">
          <FaPaperPlane
            size={25}
            color={`${active === 10 ? "rgb(255,255,255)" : "#17637C"}`}
          />
          <h5
            className={`pl-2 text-[16px] font-[400] ${
              active === 10 ? "text-text_color" : "text-primary_color"
            }`}
          >
            Promotions
          </h5>
        </Link>
      </div>

      <div className={`w-full flex items-center p-4 ${active === 11 ? " bg-primary_color" : "none"}`}>
        <Link to="/shop-settings" className="w-full flex items-center">
          <CiSettings
            size={25}
            color={`${active === 11 ? "rgb(255,255,255)" : "#17637C"}`}
          />
          <h5
            className={`pl-2 text-[16px] font-[400] ${
              active === 11 ? "text-text_color" : "text-primary_color"
            }`}
          >
            Account Profile
          </h5>
        </Link>
      </div>



     
      <div className={`w-full flex items-center p-4`}>
        <div 
          className="w-full flex items-center cursor-pointer"
          onClick={logoutHandler}
        >
         <AiOutlineLogin
            size={20}
            color={active === 9 ? "rgb(255,255,255)" : "#17637C"}
          />
          <h5
            className={`pl-2 text-[16px] font-[400] text-primary_color`}
          >
            Logout
          </h5>
        </div>
      </div>



      {/* logo */}
<Link to="/">
        <img className="w-full w-max-w-[150px] md:w-full" src="/iska_logo.png" alt="" />
</Link>
  

    </div>
    </>
  );
};

export default DashboardSideBar;
