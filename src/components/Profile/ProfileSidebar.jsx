import React from "react";
import { AiOutlineLogin, AiOutlineMessage } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineTrackChanges,
} from "react-icons/md";
import { TbAddressBook } from "react-icons/tb";
import { RxPerson } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ active, setActive, isLoading, setIsLoading }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const menuItems = [
    
    { id: 1, name: "Orders", icon: HiOutlineShoppingBag },
    { id: 2, name: "Profile", icon: RxPerson },
   
    // { id: 3, name: "Refunds", icon: HiOutlineReceiptRefund },
    // { id: 4, name: "Inbox", icon: AiOutlineMessage, onClick: () => navigate("/inbox") },
    // { id: 5, name: "Payment", icon: MdOutlineTrackChanges },
    { id: 6, name: "Security", icon: RiLockPasswordLine },
    { id: 7, name: "Addresses", icon: TbAddressBook },
    { id: 8, name: "Saved Items", icon: AiOutlineHeart },
  ];

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className="w-full mt-[2.3em] lg:mt-0 shadow-sm rounded-[10px] lg:rounded-none border border-primary_color">
      <div className="hidden lg:block bg-primary_color p-6">
        <p className="text-text_color text-[1em]">Buyer</p>
        <h6 className="text-text_color text-[2em]">Dashboard</h6>
      </div>

      <div className="p-2 ">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`${
              active === item.id ? "bg-primary_color" : "#17637C"
            } flex md:p-4 items-center justify-center md:items-start md:justify-start  py-4 rounded-md lg:rounded-none cursor-pointer w-full mb-4`}
            onClick={() => {
              setActive(item.id);
              item.onClick?.();
            }}
          >
            <item.icon
              size={20}
              className="text-primary_color "
              color={active === item.id ? "  rgb(255, 255, 255)" : "#17637C"}
            />
            <span
              className={`pl-3 ${
                active === item.id ? "text-[rgb(255,255,255)]" : "text-primary_color"
              } 800px:block hidden`}
            >
              {item.name}
            </span>
          </div>
        ))}

        {user && user?.role === "Admin" && (
          <Link to="/admin/dashboard">
            <div
              className={`${
                active === 8 ? "bg-primary_color" : "#17637C"
              } flex p-4 items-center cursor-pointer w-full mb-8`}
              onClick={() => setActive(8)}
            >
              <MdOutlineAdminPanelSettings
                size={20}
                color={active === 8 ? "rgb(255,255,255)" : "#17637C"}
              />
              <span
                className={`pl-3 ${
                  active === 8 ? "text-[rgb(255,255,255)]" : "text-primary_color"
                } 800px:block hidden`}
              >
                Admin Dashboard
              </span>
            </div>
          </Link>
        )}

        <div
          className={`${
            active === 9 ? "bg-primary_color" : "#17637C"
          } flex p-4 items-center cursor-pointer w-full mb-8`}
          onClick={logoutHandler}
        >
          <AiOutlineLogin
            size={20}
            color={active === 9 ? "rgb(255,255,255)" : "#17637C"}
          />
          <span
            className={`pl-3 ${
              active === 9 ? "text-[rgb(255,255,255)]" : "text-primary_color"
            } 800px:block hidden`}
          >
            Log out
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
