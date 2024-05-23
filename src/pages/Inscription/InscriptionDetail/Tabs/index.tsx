import React, { useState } from "react";

import BRCCardList from "./BRCCardList";

import { Brc20Token } from "../Brc20TokenInterface";

interface TabsProps {
  brc20Token: Brc20Token;
}

const Tabs: React.FC<TabsProps> = ({ brc20Token }) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-7">
      <div className="flex border-b-gray-500 border-b-2">
        <button
          className={`px-4 py-2 font-Mont text-lg font-semibold  focus:outline-none ${
            activeTab === 1 ? "active:text-white" : "text-gray-500"
          }`}
          onClick={() => handleTabClick(1)}
        >
          Market
        </button>
        <button
          className={`px-4 py-2 font-Mont text-lg font-semibold  focus:outline-none ${
            activeTab === 2 ? "active:text-white" : "text-gray-500"
          }`}
          onClick={() => handleTabClick(2)}
        >
          My Order
        </button>
      </div>
      <div className="mt-2 p-4">
        {activeTab === 1 && <BRCCardList brc20Token={brc20Token} />}
        {activeTab === 2 && <div>Content for Tab 2</div>}
      </div>
    </div>
  );
};

export default Tabs;
