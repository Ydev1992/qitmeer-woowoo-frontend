import { useTranslation } from "react-i18next";
import Brc20State from "../Interfaces/Brc20State";

import "./preview.css";
import ImageState from "../Interfaces/ImageState";

interface MyComponentProps {
  inscMode: string;
  brc20State: Brc20State;
  imageState: ImageState;
}

const Preview: React.FC<MyComponentProps> = ({
  inscMode,
  brc20State,
  imageState,
}) => {
  const { t } = useTranslation();
  const { op, tick, mintCount, mintAmount } = brc20State;

  const getPreviewList = () => {
    let prevList = [];
    for (let i = 0; i < mintCount; i++) {
      prevList.push(
        <p
          key={i}
          className="rounded-lg p-[8px] my-1 bg-white bg-opacity-10"
        >{`{"p": "brc-20", "op": "${op}", "tick": "${tick}", "amt": "${mintAmount}"}`}</p>
      );
    }
    return prevList;
  };

  return (
    <div
      className={`${inscMode === "IMAGE" ? "md:w-[30.7%]" : "md:w-1/2"} w-full`}
    >
      <div className=" relative mb-4 text-[24px] py-0.5 ">Preview</div>
      {inscMode === "IMAGE" ? (
        <div className="">
          {imageState.imageURL === null || imageState.imageURL === "" ? (
            <div className="bg-[#2C2C2C] rounded-t-xl flex flex-col h-[400px]">
              <div className="flex flex-col m-auto">
                <img
                  src="images/inscription/uploadImageAlt.png"
                  className="w-[36px] h-[36px] my-5 mx-auto"
                ></img>
                <p className="text-[#A0A0A0] my-5 text-[18px] font-Mont mx-auto">
                  Preview your BTC NFT here
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#2C2C2C] rounded-t-xl flex flex-col h-[400px]">
              <img
                src={imageState.imageURL as string}
                className="w-full h-full object-cover"
                alt="Preview"
              ></img>
            </div>
          )}
          <div className="bg-[#434343] flex rounded-b-xl h-[28px]">
            <img
              src="images/cryptoImage.png"
              className="w-[16px] ml-[20px] my-auto h-[16px]"
            ></img>
          </div>
        </div>
      ) : (
        <div
          id="inscriptionPrevList"
          className=" h-[600px] inscriptionPrevList md:h-[420px] overflow-y-auto"
        >
          {getPreviewList()}
        </div>
      )}
    </div>
  );
};

export default Preview;
