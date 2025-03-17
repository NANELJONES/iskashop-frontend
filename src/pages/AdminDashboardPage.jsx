import React from "react";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AdminDashboardMain from "../components/Admin/AdminDashboardMain";
import LayoutContainer from "../components/Admin/Layout/LayoutContainer";

const AdminDashboardPage = () => {
  return (
    <div>

  
      
      <div className="w-full  ">

        <div className="flex gap-[2em] items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={1} />
          </div>
         <div className="w-full">
         <AdminHeader />
         <AdminDashboardMain />
         </div>
        </div>


      </div>

     
    </div>
  );
};

export default AdminDashboardPage;
