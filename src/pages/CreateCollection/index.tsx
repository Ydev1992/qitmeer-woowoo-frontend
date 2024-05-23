import { ChevronLeftSVG } from "assets/svgs";
import RequireIcon from "components/RequireIcon";
import StyledInput from "components/StyledInput";
import Dropzone from "react-dropzone";
import { useCallback, useContext, useEffect, useState } from "react";
import Button from "components/Button";
import Dropdown from "components/Dropdown";
import LoadingText from "components/LoadingText";
import { Puff } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import RequireAlert from "components/RequireAlert";
import { getCollectionFactoryContract } from "utils/contracts";
import { useWeb3React } from "contexts/wagmi";
import { useAccount, useSigner } from "wagmi";
import { ProjectContext } from "contexts/ProjectContext";
import { handleWalletError } from "utils";
import { useDispatch } from "react-redux";
import {
  fetchETHBalanceAsync,
  fetchUserCollectionBalanceAsync,
  fetchUserCreatedCollectionsAsync,
  fetchUserInfoAsync,
} from "state/user";
import { fetchListingsAsync } from "state/marketplace";
import { fetchCreatedCollectionsByName } from "state/marketplace/fetchMarketPlaceInfo";
import Notification from "components/Notification";
import { useTranslation } from "react-i18next";
import { useUserFetchData } from "hooks/useUserData";
import { useMarketFetchData } from "hooks/useMarketData";

let searchTimeout: any;

export default function CreateCollection() {
  const [name, setName] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNameLoading, setIsNameLoading] = useState(false);

  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [royalty, setRoyalty] = useState("");
  const [selectedClassification, setSelectedClassification] = useState<any>([]);
  const [network, setNetwork] = useState(0);

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState("");
  const [localLogo, setLocalLogo] = useState("");

  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [uploadedBanner, setUploadedBanner] = useState("");
  const [localBanner, setLocalBanner] = useState("");

  const [confirmClicked, setConfirmClicked] = useState(false);

  const { chainId }: any = useWeb3React();
  const { data: signer } = useSigner();
  const { address: account } = useAccount();
  const { pending, setPending, jwtToken }: any = useContext(ProjectContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { fetchInfos: fetchUserInfos } = useUserFetchData();
  const { fetchInfos: fetchMarketInfos } = useMarketFetchData();

  const dispatch: any = useDispatch();

  const showError = useCallback((errorMsg: string) => {
    if (errorMsg) toast(<Notification type={"fail"} msg={errorMsg} />);
  }, []);

  const classifications = [
    t("categories.New Floor Price"),
    t("categories.PFP"),
    t("categories.Photography"),
    t("categories.Cartoon/Anime"),
    t("categories.Music"),
    t("categories.3D"),
    t("categories.Ticket / Pass"),
  ];

  const onLoadLogoImage = async (acceptedFiles: any[]) => {
    setIsUploadingLogo(true);
    try {
      const [File] = acceptedFiles;
      const formData = new FormData();
      formData.append("file", File);
      const url = await axios.post(`/api/uploads`, formData, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setUploadedLogo(url.data.path);
      setLocalLogo(URL.createObjectURL(File));
    } catch (e) {
      console.log(e);
    }
    setIsUploadingLogo(false);
  };

  const onLoadBannerImage = async (acceptedFiles: any[]) => {
    setIsUploadingBanner(true);
    try {
      const [File] = acceptedFiles;
      const formData = new FormData();
      formData.append("file", File);
      const url = await axios.post(`/api/uploads`, formData, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setUploadedBanner(url.data.path);
      setLocalBanner(URL.createObjectURL(File));
    } catch (e) {
      console.log(e);
    }
    setIsUploadingBanner(false);
  };

  async function onConfirm() {
    try {
      setConfirmClicked(true);
      if (
        !name ||
        !isNameValid ||
        !uploadedLogo ||
        !uploadedBanner ||
        !symbol ||
        !description ||
        name.length > 20 ||
        symbol.length > 10 ||
        description.length > 500
      )
        return;
      setPending(true);
      const factoryContract = getCollectionFactoryContract(signer, chainId);
      const collectionAddress = await factoryContract.callStatic.createClone(
        name,
        symbol,
        account,
        Number(royalty ?? 0) * 100,
        name
      );
      console.log("collectionAddress:", collectionAddress);
      const tx = await factoryContract.createClone(
        name,
        symbol,
        account,
        Number(royalty ?? 0) * 100,
        name
      );
      toast(
        <Notification
          type={"loading"}
          msg="Transaction submitted"
          txhash={tx.hash}
        />
      );
      await tx.wait();
      await axios.post(
        `/api/collections`,
        {
          address: collectionAddress.toLowerCase(),
          logo: uploadedLogo,
          banner: uploadedBanner,
          description,
          classification: selectedClassification.map(
            (index: any) => classifications[index]
          ),
        },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      toast(
        <Notification
          type={"success"}
          msg="Collection successfully created."
          txhash={tx.hash}
        />
      );
      fetchUserInfos(account as `0x${string}`, chainId);
      fetchMarketInfos(chainId);

      navigate("/personalnfts/mycollection");
    } catch (e) {
      console.log(e);
      handleWalletError(e, showError);
    }
    setPending(false);
  }

  useEffect(() => {
    if (!chainId) return;
    if (searchTimeout != undefined) clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      if (name === "") return;
      setIsNameLoading(true);
      setIsNameValid(false);
      const collections = await fetchCreatedCollectionsByName(name, chainId);
      if (!collections.length) setIsNameValid(true);
      setIsNameLoading(false);
    }, 500);
  }, [name, chainId]);

  return (
    <div className="relative px-3 py-[80px] z-0 tracking-normal overflow-hidden min-h-screen">
      <img
        src={"/images/buynft/vectors/1.png"}
        alt={""}
        className="absolute top-0 left-0 w-full"
      />
      <img
        src={"/images/buynft/vectors/2.png"}
        alt={""}
        className="absolute top-[267px] left-0 w-full"
      />
      <div className="max-w-[1240px] relative z-10 mx-auto mt-[50px]">
        <div className="flex">
          <Link to={"/personalnfts/mycollection"} className="mt-3.5">
            {ChevronLeftSVG}
          </Link>
          <div className="ml-4">
            <div className="text-[32px] font-semibold">
              {t("actions.Create a collection")}
            </div>
            <div className="text-[#C4C4C4]">
              {t(
                "createCollection.Create, plan, and manage an exclusive NFT series for sharing and sales."
              )}
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1000px] mx-auto text-[#858585]">
          <div className="mt-12">
            <div className="text-xl">
              {t("createCollection.Logo Image")}
              <RequireIcon />
            </div>
            <div className="mt-3">
              <Dropzone
                maxFiles={1}
                accept={["image/png", "image/jpeg", "image/gif"] as any}
                onDrop={(acceptedFiles) => onLoadLogoImage(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="primary-shadow flex bg-[#FFFFFF1A] backdrop-blur rounded-lg w-full cursor-pointer items-center justify-center border border-dashed border-transparent bg-[#202023] transition hover:border-white"
                  >
                    <input {...getInputProps()} />
                    {isUploadingLogo ? (
                      <div className="flex h-[200px] w-full flex-col items-center justify-center">
                        <Puff
                          width={45}
                          height={45}
                          color={"#ffffff9e"}
                          secondaryColor="black"
                        />
                        <div className="mt-2 text-sm text-[#ffffff9e]">
                          <LoadingText text={t("loading.Uploading Image")} />
                        </div>
                      </div>
                    ) : localLogo ? (
                      <div className="rounded w-[200px] h-[200px] flex justify-center items-center overflow-hidden p-4">
                        <img
                          src={localLogo}
                          alt={""}
                          className="w-full rounded"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center h-[58px]">
                        <div className="gradient-text text-[32px] w-fit">+</div>
                        <div className="text-[#858585] text-sm ml-2 font-pingfang">
                          {t(
                            "createCollection.Supports JPG/PNG, with files smaller than 2M"
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <RequireAlert
              text="Require upload image"
              value={!confirmClicked || uploadedLogo}
            />
          </div>
          <div className="mt-6">
            <div className="text-xl">
              {t("createCollection.Banner Image")}
              <RequireIcon />
            </div>
            <div className="mt-3">
              <Dropzone
                maxFiles={1}
                accept={["image/png", "image/jpeg", "image/gif"] as any}
                onDrop={(acceptedFiles) => onLoadBannerImage(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <div
                    {...getRootProps()}
                    className="primary-shadow flex  bg-[#FFFFFF1A] backdrop-blur rounded-lg w-full cursor-pointer items-center justify-center border border-dashed border-transparent bg-[#202023] transition hover:border-white"
                  >
                    <input {...getInputProps()} />
                    {isUploadingBanner ? (
                      <div className="flex h-[200px] w-full flex-col items-center justify-center">
                        <Puff
                          width={45}
                          height={45}
                          color={"#ffffff9e"}
                          secondaryColor="black"
                        />
                        <div className="mt-2 text-sm text-[#ffffff9e]">
                          <LoadingText text={t("loading.Uploading Image")} />
                        </div>
                      </div>
                    ) : localBanner ? (
                      <div className="rounded w-full h-[200px] flex justify-center items-center overflow-hidden">
                        <img
                          src={localBanner}
                          alt={""}
                          className="w-full rounded"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center h-[58px]">
                        <div className="gradient-text text-[32px] w-fit">+</div>
                        <div className="text-[#858585] text-sm ml-2 font-pingfang">
                          {t(
                            "createCollection.Supports JPG/PNG, with files smaller than 2M"
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <RequireAlert
              text="Require upload image"
              value={!confirmClicked || uploadedBanner}
            />
          </div>
          <div className="mt-6">
            <div className="text-xl mb-2">
              {t("createCollection.My Series Name")}
              <RequireIcon />
            </div>
            <StyledInput
              value={name}
              setValue={setName}
              className="border-[#656565] text-white"
              isValid={name && isNameValid}
              maxLength={20}
              pending={isNameLoading}
              requireText={
                !isNameValid
                  ? "requireText.Name already existed"
                  : "requireText.Please input field"
              }
            />
            <div className="font-pingfang">
              {t(
                "createCollection.The name cannot be changed after creating a collection."
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xl mb-2">
              {t("createCollection.Token symbol")}
              <RequireIcon />
            </div>
            <StyledInput
              value={symbol}
              setValue={setSymbol}
              className="border-[#656565] text-white"
              isValid={!confirmClicked || symbol}
              maxLength={10}
            />
            <div className="font-pingfang">
              {t(
                `createCollection.The symbol will be used to create your smart contract and cannot be changed after creating the collection.When others view your smart contract, the token symbol will be displayed on the blockbrowser.`
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xl mb-2">
              {t("createCollection.Description")}
              <RequireIcon />
            </div>
            <StyledInput
              value={description}
              setValue={setDescription}
              className="border-[#656565] text-white"
              isValid={!confirmClicked || description}
              maxLength={500}
            />
            <div className="font-pingfang">
              {t(
                `createCollection.The symbol will be used to create your smart contract and cannot be changed after creating the collection.When others view your smart contract, the token symbol will be displayed on the blockbrowser.`
              )}
            </div>
          </div>

          <div className="mt-6">
            <div className="text-xl mb-2">
              {t("createCollection.Classification")}
              <RequireIcon />
            </div>
            <div className="flex flex-wrap">
              {classifications.map((data, i: number) => {
                return (
                  <Button
                    type={"category"}
                    className={`mr-3 mb-3 ${
                      selectedClassification.includes(i)
                        ? "!bg-white !text-black font-semibold"
                        : ""
                    }`}
                    onClick={() => {
                      const temp: any = [...selectedClassification];
                      const index = temp.indexOf(i);
                      if (index === -1) temp.push(i);
                      else temp.splice(index, 1);
                      setSelectedClassification(temp);
                    }}
                  >
                    {data}
                  </Button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 z-10 relative">
            <div className="text-xl mb-2">
              {t("createNFT.Network")}
              <RequireIcon />
            </div>
            <Dropdown
              values={["Qitmeer"]}
              value={network}
              setValue={setNetwork}
            />
          </div>

          <div className="mt-6">
            <div className="text-xl mb-2">
              {t("createCollection.Royalty")}
              <RequireIcon />
            </div>
            <StyledInput
              type={"number"}
              value={royalty}
              setValue={setRoyalty}
              className="border-[#656565] text-white"
              suffix="%"
              decimals={2}
            />
            <div className="font-pingfang">
              {t(
                "createCollection.Charge a handling fee when a user resells a project originally created by you. You can set a ratio of less than 10%, which cannot be changed after creating a collection."
              )}
            </div>
          </div>

          <div className="mt-16">
            <Button
              type={"secondary"}
              className="w-full h-[48px]"
              onClick={() => onConfirm()}
              disabled={pending}
              pending={pending}
            >
              {t("actions.Confirm")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
