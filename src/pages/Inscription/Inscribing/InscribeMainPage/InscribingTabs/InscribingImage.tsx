import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import axios from "axios";

import { useRef } from "react";

import ImageState from "../Interfaces/ImageState";
import ImageConfirmDialog from "../components/ImageConfirmDialog";

interface MyComponentProps {
  imageState: ImageState;
  setImageState: (imageState: ImageState) => void;
}

const InscribingImage: React.FC<MyComponentProps> = ({
  imageState,
  setImageState,
}) => {
  const { t } = useTranslation();

  const [confirmDialogShow, setConfirmDialogShow] = useState<boolean>(false);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  //related Image
  const [fileName, setFileName] = useState<string>("");
  const [fileType, setFileType] = useState<string>("");
  const [fileSize, setFileSize] = useState<number>(0);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileType(file.type);
      setFileSize(file.size);

      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result);
        setImageState({ imageURL: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadDivClicked = () => {
    if (preview) return;
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("/api/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleConfirmClicked = () => {
    setConfirmDialogShow(true);
  };

  const handleConfirmOkClicked = () => {
    setConfirmDialogShow(false);
  };

  const handleDeleteImage = () => {
    setPreview("");
    setImageState({ imageURL: null });
  };

  return (
    <>
      <div>
        <div className="font-Mont text-white mt-1">
          {preview ? (
            <>
              <div className={`w-[95%] relative rounded-3xl flex h-[244px]`}>
                <img
                  src={preview as string}
                  className="w-1/4 rounded-l-3xl border-none blur-sm"
                  alt="Preview"
                ></img>
                <div className="backdrop-blur-sm absolute rounded-l-3xl left-0 bg-white/10 w-1/4 h-full"></div>

                <img
                  src={preview as string}
                  className="w-1/2 mx-auto"
                  alt="Preview"
                ></img>
                <img
                  src={preview as string}
                  className="w-1/4 rounded-r-3xl border-none blur-sm"
                  alt="Preview"
                ></img>
                <div className="backdrop-blur-sm absolute rounded-r-3xl right-0 bg-white/10 w-1/4 h-full"></div>
              </div>
              <div className="w-[95%] flex mt-5 justify-between bg-white bg-opacity-[15%] rounded-xl">
                <div className="font-Mont p-3">
                  <p className="text-white text-[14px]">{fileName}</p>
                  <p className="text-[12px] mt-1 text-[#A0A0A0]">
                    {Math.round(fileSize / 1024)} KB
                  </p>
                </div>
                <div
                  onClick={() => {
                    handleDeleteImage();
                  }}
                  className="my-auto mr-3 text-[30px] cursor-pointer"
                >
                  &times;
                </div>
              </div>
            </>
          ) : (
            <div
              onClick={() => {
                handleUploadDivClicked();
              }}
              className={`w-[95%] flex ${
                preview || "cursor-pointer"
              } h-[244px] border-2 border-[#A0A0A0] rounded-xl border-dashed`}
            >
              <div className=" text-center  m-auto flex flex-col ">
                <img
                  src="images/inscription/uploadIcon.png"
                  className="w-[30px] my-2 h-[30px] m-auto"
                ></img>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div className="flex mx-auto">
                  <p className="cursor-pointer border-b border-[#703FFF] mr-5 text-[18px] flex flex-wrap bg-gradient-to-r from-[#4FC0FF] to-[#C23FFF] text-transparent bg-clip-text">
                    Upload a photo
                  </p>
                  <p className="text-[18px] text-[#A0A0A0]">Upload a photo</p>
                </div>
                <p className="text-[#A0A0A0] text-[14px]">
                  Supported file types:PNG,JPEG,GIF,Max size:300KB
                </p>
              </div>
            </div>
          )}
          <p className="text-[14px] mt-7">Recipient address</p>
          <input
            type="text"
            defaultValue={
              "bc1p7uxsmqw6rflmtu8u450grhnf9x6au9mcn88crkzk75jas686qxyq4ad3wv"
            }
            className="m-2 w-[95%] rounded-xl text-[14px] border border-[#767676] text-center p-2 bg-transparent outline-none"
          />
          <p>
            Minimum UTXO value : 330 sats{" "}
            <span className="bg-gradient-to-r text-[15px] from-[#4FC0FF] to-[#C23FFF] font-bold bg-clip-text text-transparent">
              {" View more > "}{" "}
            </span>
          </p>
        </div>
        <div className="mt-10 text-white text-[18px] font-Mont flex justify-center w-[60%] items-center ">
          <button
            className="overflow-auto border-2 w-[45%] border-gray-500 rounded-2xl m-2 cursor-pointer p-3"
            onClick={() => {}}
          >
            Cancel
          </button>
          <button
            disabled={
              imageState.imageURL === null || imageState.imageURL === ""
            }
            onClick={() => handleConfirmClicked()}
            className={`${
              imageState.imageURL === null
                ? "bg-gray-500"
                : "bg-gradient-to-r cursor-pointer"
            } overflow-auto w-[45%] border-none from-[#4FC0FF] to-[#C23FFF] rounded-2xl border-2 m-2  md:flex-grow p-3`}
          >
            Confirm
          </button>
        </div>
      </div>
      <ImageConfirmDialog
        isOpenBuy={confirmDialogShow}
        setIsOpenBuy={setConfirmDialogShow}
        handleBuyOkClick={handleConfirmOkClicked}
        imageState={imageState}
      />
    </>
  );
};

export default InscribingImage;
