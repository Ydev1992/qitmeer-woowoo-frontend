import React, { useState } from "react";

import InscribingBrc20 from "./InscribingBrc20";
import InscribingImage from "./InscribingImage";
import InscribingText from "./InscribingText";

import Brc20State from "../Interfaces/Brc20State";
import ImageState from "../Interfaces/ImageState";
import TextState from "../Interfaces/TextState";
import { text } from "@fortawesome/fontawesome-svg-core";

interface MyComponentProps {
  brc20State: Brc20State;
  setBrc20State: (Brc20State: Brc20State) => void;
  setInscMode: (inscMode: string) => void;
  imageState: ImageState;
  setImageState: (imageState: ImageState) => void;
  textState: TextState;
  setTextState: (textState: TextState) => void;
}

const InscribingTabs: React.FC<MyComponentProps> = ({
  brc20State,
  setBrc20State,
  setInscMode,
  imageState,
  setImageState,
  textState,
  setTextState,
}) => {
  const [activeTab, setActiveTab] = useState<number>(1);

  const handleTabClick = (tab: number) => {
    setActiveTab(tab);
    switch (tab) {
      case 1:
        setInscMode("BRC-20");
        break;
      case 2:
        setInscMode("IMAGE");
        setImageState({ imageURL: null });
        break;
      case 3:
        setInscMode("TEXT");
        break;
    }
  };

  return (
    <div className="w-full">
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
        {activeTab === 1 && (
          <InscribingBrc20
            brc20State={brc20State}
            setBrc20State={setBrc20State}
          />
        )}
        {activeTab === 2 && (
          <InscribingImage
            imageState={imageState}
            setImageState={setImageState}
          />
        )}
        {activeTab === 3 && (
          <InscribingText textState={textState} setTextState={setTextState} />
        )}
      </div>
    </div>
  );
};

export default InscribingTabs;
