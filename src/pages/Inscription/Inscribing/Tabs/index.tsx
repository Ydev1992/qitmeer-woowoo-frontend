import React, { useState } from "react";

import InscribeMainPage from "../InscribeMainPage";
import InscribeHistoryPage from "../InscribeHistoryPage";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-7">
      <div className="flex border-b-gray-500 border-b-2">
        <button
          className={`py-2 font-mont text-[26px] font-semibold  focus:outline-none ${
            activeTab === 1 ? "active:text-white" : "text-gray-500"
          }`}
          onClick={() => handleTabClick(1)}
        >
          Inscribe
        </button>
        <button
          className={`px-4 py-2 font-mont text-[26px] font-semibold  focus:outline-none ${
            activeTab === 2 ? "active:text-white" : "text-gray-500"
          }`}
          onClick={() => handleTabClick(2)}
        >
          History
        </button>
      </div>
      <div className="mt-2 p-4">
        {activeTab === 1 && <InscribeMainPage />}
        {activeTab === 2 && <InscribeHistoryPage />}
      </div>
    </div>
  );
};

export default Tabs;
