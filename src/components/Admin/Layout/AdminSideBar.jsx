import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { GrWorkshop } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { CiDeliveryTruck } from "react-icons/ci";
import { AiOutlineSetting } from "react-icons/ai";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHandbag } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { MdInsights } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa";
import { CiFlag1 } from "react-icons/ci";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { RiErrorWarningFill } from "react-icons/ri";

const menuItems = [
  { id: 1, name: "Dashboard", icon: RxDashboard, path: "/admin/dashboard" },
  { id: 2, name: "Orders", icon: FiShoppingBag, path: "/admin-orders" },
  { id: 3, name: "Vendors", icon: GrWorkshop, path: "/admin-sellers" },
  { id: 4, name: "Buyers", icon: HiOutlineUserGroup, path: "/admin-users" },
  { id: 5, name: "All Products", icon: BsHandbag, path: "/admin-products" },
  { id: 6, name: "Categories", icon: BiCategoryAlt, path: "/admin-categories" },
  { id: 7, name: "Deliveries", icon: CiDeliveryTruck, path: "/admin-deliveries" },
  { id: 8, name: "Promotions", icon: FaPaperPlane , path: "/admin-promotions" },
  { id: 9, name: "Insight", icon: MdInsights , path: "/admin-insights" },
  { id: 10, name: "Banner", icon: CiFlag1, path: "/admin-banners" },
 
  { id: 11, name: "Financials", icon: CiMoneyBill, path: "/admin-financials" },
 
  { id: 12, name: "Disputes Resolutions", icon: RiErrorWarningFill, path: "/admin-dispute-resolutions" },
 
  { id: 8, name: "Settings", icon: AiOutlineSetting, path: "/profile" },
];

const AdminSideBar = ({ active, setActive }) => {
  return (
    <div className="w-full mt-[2.3em] lg:mt-0 shadow-sm rounded-[10px] lg:rounded-none border border-primary_color">
      <div className="hidden lg:block bg-primary_color p-6">
        <h6 className="text-text_color text-[2em]">Admin Panel</h6>
      </div>

      <div className="p-2">
        {menuItems.map((item) => (
          <Link to={item.path} key={item.id}>
            <div
              className={`${
                active === item.id ? "bg-primary_color" : "#17637C"
              } flex p-4 items-center cursor-pointer w-full mb-4 rounded-md lg:rounded-none`}
              onClick={() => setActive(item.id)}
            >
              <item.icon
                size={20}
                color={active === item.id ? "rgb(255,255,255)" : "#17637C"}
              />
              <span
                className={`pl-3 ${
                  active === item.id
                    ? "text-[rgb(255,255,255)]"
                    : "text-primary_color"
                } 800px:block hidden`}
              >
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminSideBar;
