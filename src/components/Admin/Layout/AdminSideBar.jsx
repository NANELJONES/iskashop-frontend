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
import { IoMdLogOut } from "react-icons/io";

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
 
  // { id: 8, name: "Settings", icon: AiOutlineSetting, path: "/profile" },
];


const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
const AdminSideBar = ({ active, setActive }) => {
  // Initialize isMenuOpen based on screen width
  const [isMenuOpen, setIsMenuOpen] = React.useState(window.innerWidth >= 768);

  // Update isMenuOpen when window is resized
  React.useEffect(() => {
    const handleResize = () => {
      setIsMenuOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* sidebar menu button */}
      <div 
        className="absolute right-[1em] top-[1em] bg-primary_color w-[3em] md:hidden p-4 rounded-md shadow-md cursor-pointer" 
        onClick={toggleMenu}
      >
        <RxDashboard className="text-text_color text-[1em]" />
      </div>

      {/* whole menu */}
      {(isMenuOpen || window.innerWidth >= 768) && (
        <div className="w-full h-[90vh] sticky top-2 min-h-[400px] w-[80px] 800px:w-[330px] mt-[2.3em] custom_scrollbar-2 overflow-y-auto lg:mt-0 shadow-sm rounded-[10px] lg:rounded-none shadow-sm">
          <div className="hidden lg:block bg-primary_color p-6">
            <h6 className="text-text_color">Admin</h6>
            <h2 className="text-text_color "> Panel</h2>
          </div>

          <div className="p-2 ">
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
                    }`}
                  >
                    {item.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="p-2  bg-primary_red w-[90%] mx-auto " onClick={handleLogout}>
            <div className="flex px-4 py-2 items-center cursor-pointer w-full rounded-md lg:rounded-none">
              <IoMdLogOut size={20} className="text-text_color" />
              <span className="pl-3 text-text_color">Logout</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSideBar;
