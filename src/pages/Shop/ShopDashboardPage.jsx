import React from "react";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Shop/Layout/DashboardSideBar";
import DashboardHero from "../../components/Shop/DashboardHero";

const ShopDashboardPage = () => {
  return (
        <div>
        
          <div className="admin_container_div  w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={1} />
            </div>
        <div className="w-full">
          <DashboardHeader />
          <DashboardHero />
        </div>
          </div>
        </div>
  );
};

export default ShopDashboardPage;
