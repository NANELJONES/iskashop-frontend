import React from "react";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { FiPackage, FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiMessageSquareDetail } from "react-icons/bi";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  return (
    <div className="w-full bg-primary_color shadow p-[3em]  flex flex-col items-start ">
    <h5 className='text-text_color'>Welcome</h5>
    <h2 className='text-text_color'>{`${seller.name} (${seller.role})`}</h2>
    { seller.adminData.shopApproval === "Pending" && <h5 className="text-text_color"> Account Status: {seller.adminData.shopApproval} Approval from IskaShop</h5>}
    { seller.adminData.shopApproval === "Approved" && <h5 className="text-text_color"> Account Status: {seller.adminData.shopApproval} Approved by IskaShop</h5>}
    { seller.adminData.shopApproval === "Rejected" && <h5 className="text-text_color"> Account Status: {seller.adminData.shopApproval} Rejected by IskaShop</h5>}

   </div>
  );
};

export default DashboardHeader;
