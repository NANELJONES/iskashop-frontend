import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHero from "../../components/Shop/DashboardHero";

const ShopDashboardPage = () => {
  return (
        <div>
        
          <div className="admin_container_div flex w-full">
           
              <DashboardSideBar active={1} />
       
        <div className="w-full">
          <DashboardHeader />
          <DashboardHero />
        </div>
          </div>
        </div>
  );
};

export default ShopDashboardPage;
