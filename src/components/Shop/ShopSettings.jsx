import React, { useState } from "react";

import { Link } from "react-router-dom";
import BusinessInfo from "./BusinessInfo";

import { ChangePassword } from "./ChangePassword";

const ShopSettings = () => {
  const [activeTab, setActiveTab] = useState("business");

  return (
    <div className="w-full min-h-screen">
      {/* Tabs */}
      <div className="w-full  mb-6">
        <br/>
        <div className="flex gap-4 ">
          <button
            className={`px-4 py-2 text-[1em] font-medium ${
              activeTab === "business"
                ? "text-primary_color bg-primary_color text-text_color "
                : "text-primary_color hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("business")}
          >
            Business Info
          </button>
          <button
            className={`px-4 py-2 text-[1em] font-medium ${
              activeTab === "security"
                ? "text-primary_color bg-primary_color text-text_color "
                : "text-primary_color hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("security")}
          >
            Security
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "business" && <BusinessInfo  changeTab={setActiveTab}/>}
      {activeTab === "security" && <ChangePassword  />}
    </div>
  );
};

export default ShopSettings;