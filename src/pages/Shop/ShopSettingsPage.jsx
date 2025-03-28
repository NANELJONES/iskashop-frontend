import React from "react";
import Footer from "../../components/Layout/Footer";
import ShopSettings from "../../components/Shop/ShopSettings";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import ShopInfo from "../../components/Shop/ShopInfo";

const ShopSettingsPage = () => {
  return (
    <div>

      <div className="admin_container_div flex w-full">
      
          <DashboardSideBar active={11} />
      
       <div className="w-full">
       <DashboardHeader />
       <ShopSettings /> 
     
       </div>
      </div>
    </div>
  );
};

export default ShopSettingsPage;
