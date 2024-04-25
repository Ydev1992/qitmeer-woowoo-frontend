import { ChevronLeftSVG } from "assets/svgs";
import RequireIcon from "components/RequireIcon";
import StyledInput from "components/StyledInput";
import Dropzone from "react-dropzone";
import { useCallback, useContext, useState } from "react";
import Button from "components/Button";
import Dropdown from "components/Dropdown";
import { NFT_STORAGE } from "config/constants";
import LoadingText from "components/LoadingText";
import { Puff } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectContext } from "contexts/ProjectContext";
import { handleWalletError } from "utils";
import RequireAlert from "components/RequireAlert";
import { getCollectionContract } from "utils/contracts";
import { useWeb3React } from "contexts/wagmi";
import { useAccount, useSigner } from "wagmi";
import { useUserCreatedCollections } from "state/hooks";
import { useDispatch } from "react-redux";
import { fetchUserCollectionBalanceAsync } from "state/user";
import Notification from "components/Notification";
import { useTranslation } from "react-i18next";

export default function CreateNFT() {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");
  const [traitTypes, setTraitTypes] = useState([""]);
  const [values, setValues] = useState([""]);
  // const [tax, setTax] = useState(0);
  // const [selectedClassification, setSelectedClassification] = useState(0);
  const [network, setNetwork] = useState(0);
  const [collection, setCollection] = useState(0);

  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [uploadedLogo, setUploadedLogo] = useState<any>("");
  const [localLogo, setLocalLogo] = useState("");

  const [confirmClicked, setConfirmClicked] = useState(false);

  const { pending, setPending }: any = useContext(ProjectContext);
  const { chainId } = useWeb3React();
  const { data: signer } = useSigner();
  const { address: account } = useAccount();
  const navigate = useNavigate();

  const { t } = useTranslation();

  const dispatch: any = useDispatch();

  const showError = useCallback((errorMsg: string) => {
    if (errorMsg) toast(<Notification type={"fail"} msg={errorMsg} />);
  }, []);

  const onLoadLogoImage = async (acceptedFiles: any) => {
    setIsUploadingLogo(true);
    try {
      const [File] = acceptedFiles;
      setUploadedLogo(File);
      setLocalLogo(URL.createObjectURL(File));
    } catch (e) {
      handleWalletError(e, showError);
      console.log(e);
    }
    setIsUploadingLogo(false);
  };

  const collections = useUserCreatedCollections();

  async function onConfirm() {
    try {
      setConfirmClicked(true);
      if (!name || !uploadedLogo || !description || name.length > 10 || description.length > 100)
        return;
      setPending(true);
      const nftContract = getCollectionContract(collections[collection].address, signer, chainId);

      let newTokenId = Number(await nftContract.totalSupply()) + 1;
      while (true as any) {
        try {
          await nftContract.tokenByIndex(newTokenId);
          newTokenId += 1;
        } catch (e) {
          break;
        }
      }

      const path = await NFT_STORAGE.store({
        name,
        description,
        image: uploadedLogo,
        attributes: traitTypes
          .filter((type, i) => type)
          .map((type, i) => {
            return {
              trait_type: type,
              value: values[i],
            };
          }),
      });
      const tx = await nftContract.mint(account, newTokenId, path.url);
      toast(<Notification type={"loading"} msg="Transaction submitted" txhash={tx.hash} />);
      await tx.wait();
      toast(<Notification type={"success"} msg="NFT Minted Successfully" txhash={tx.hash} />);
      dispatch(fetchUserCollectionBalanceAsync(account));
      navigate(`/nft/813/${collections[collection].address}/${newTokenId}`);
    } catch (e) {
      console.log(e);
      handleWalletError(e, showError);
    }
    setPending(false);
  }

  console.log(values);
  return (
    <div className="relative px-3 py-[80px] z-0 tracking-normal overflow-hidden min-h-screen">
      <img src={"/images/buynft/vectors/1.png"} alt={""} className="absolute top-0 left-0 w-full" />
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
            <div className="text-[32px] font-semibold">{t("actions.Create NFT")}</div>
          </div>
        </div>
        <div className="w-full max-w-[1000px] mx-auto text-[#858585]">
          <div className="mt-12">
            <div className="text-xl">
              {t("createNFT.Import pictures")}
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
                        <Puff width={45} height={45} color={"#ffffff9e"} secondaryColor="black" />
                        <div className="mt-2 text-sm text-[#ffffff9e]">
                          <LoadingText text={t("loading.Uploading Image")} />
                        </div>
                      </div>
                    ) : localLogo ? (
                      <div className="rounded w-[200px] h-[200px] flex justify-center items-center overflow-hidden p-4">
                        <img src={localLogo} alt={""} className="w-full rounded" />
                      </div>
                    ) : (
                      <div className="flex items-center h-[58px]">
                        <div className="gradient-text text-[32px] w-fit">+</div>
                        <div className="text-[#858585] text-sm ml-2 font-pingfang">
                          {t("createNFT.Supports JPG/PNG, with files smaller than 2M")}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Dropzone>
            </div>
            <RequireAlert text={"Require Upload Image"} value={!confirmClicked || uploadedLogo} />
          </div>

          <div className="mt-7">
            <div className="text-xl mb-2">
              {t("createNFT.My NFT Name")}
              <RequireIcon />
            </div>
            <StyledInput
              value={name}
              setValue={setName}
              className="border-[#656565] text-white"
              isValid={!confirmClicked || name}
              maxLength={10}
            />
          </div>

          <div className="mt-7">
            <div className="text-xl mb-2">
              {t("createNFT.Description")}
              <RequireIcon />
            </div>
            <StyledInput
              value={description}
              setValue={setDescription}
              className="border-[#656565] text-white"
              isValid={!confirmClicked || description}
              maxLength={100}
            />
          </div>

          <div className="mt-7 z-20 relative">
            <div className="text-xl mb-2">
              {t("createNFT.Network")}
              <RequireIcon />
            </div>
            <Dropdown values={["Qitmeer"]} value={network} setValue={setNetwork} />
          </div>

          <div className="mt-7 z-10 relative">
            <div className="text-xl mb-2">
              {t("createNFT.Collection")}
              <RequireIcon />
            </div>
            <Dropdown
              values={[
                ...collections.map((data: any) => data.name),
                t("actions.Create a collection"),
              ]}
              value={collection}
              setValue={(e: any) => {
                if (e === collections.length) {
                  navigate("/createcollection");
                } else setCollection(e);
              }}
            />
            <div className="font-pingfang">
              {t(
                "createNFT.Select a collection for your project, once selected and cast, it cannot be modified.If you need a new collection, please create a collection."
              )}
            </div>
          </div>

          <div className="mt-7">
            <div className="text-xl mb-2">{t("createNFT.Characteristic")}</div>
            {traitTypes.map((type, i) => {
              return (
                <div className="flex sm:flex-row flex-col mb-2 text-white" key={i}>
                  <StyledInput
                    value={type}
                    setValue={(e: any) => {
                      const temp = [...traitTypes];
                      temp[i] = e;
                      setTraitTypes(temp);
                    }}
                    placeholder={t("createNFT.Attribute")}
                    className="border-[#333131]"
                    maxLength={10}
                  />
                  <div className="sm:mr-2 mr-0 sm:mb-0 mb-2" />
                  <StyledInput
                    value={values[i]}
                    setValue={(e: any) => {
                      const temp = [...values];
                      temp[i] = e;
                      setValues(temp);
                    }}
                    placeholder={t("createNFT.Value")}
                    className="border-[#656565]"
                    maxLength={10}
                  />
                  <div
                    className="text-center text-4xl cursor-pointer hover:text-white transition mx-4 mt-1 text-[#858585]"
                    onClick={() => {
                      const _traitTypes = [...traitTypes];
                      _traitTypes.splice(i, 1);
                      setTraitTypes(_traitTypes);
                      const _values = [...values];
                      _values.splice(i, 1);
                      setValues(_values);
                    }}
                  >
                    -
                  </div>
                </div>
              );
            })}
            <div
              className="cursor-pointer mt-2 hover:text-white transition flex items-center"
              onClick={() => {
                setTraitTypes([...traitTypes, ""]);
                setValues([...values, ""]);
              }}
            >
              <span className="text-4xl">+</span>&nbsp;
              <span className="text-xl">{t("createNFT.Add attributes?")}</span>
            </div>
          </div>

          <div className="mt-16 flex">
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
