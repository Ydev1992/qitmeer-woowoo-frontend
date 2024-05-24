import React, { useState } from "react";

import InscribingBrc20 from "./InscribingBrc20";
import InscribingImage from "./InscribingImage";
import InscribingText from "./InscribingText";

const InscribingTabs = () => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <div className="md:w-1/2 w-full">
      <div className="flex">
        <button
          className={`font-mont mx-1 text-[18px] text-white rounded-sm p-3 bg-white   focus:outline-none ${
            activeTab === 1 ? "bg-opacity-20" : "bg-opacity-10"
          }`}
          onClick={() => handleTabClick(1)}
        >
          Brc-20
        </button>
        <button
          className={`px-4 py-2 mx-1 font-mont text-white bg-white text-[18px]  focus:outline-none ${
            activeTab === 2 ? "bg-opacity-20" : "bg-opacity-10"
          }`}
          onClick={() => handleTabClick(2)}
        >
          Image
        </button>
        <button
          className={`px-4 py-2 mx-1 font-mont bg-white text-white text-[18px] focus:outline-none ${
            activeTab === 3 ? "bg-opacity-20" : "bg-opacity-10"
          }`}
          onClick={() => handleTabClick(3)}
        >
          Text
        </button>
      </div>
      <div className="mt-2 p-4">
        {activeTab === 1 && <InscribingBrc20 />}
        {activeTab === 2 && <InscribingImage />}
        {activeTab === 3 && <InscribingText />}
      </div>
    </div>
  );
};

export default InscribingTabs;
