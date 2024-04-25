import { DiscordOutlineSVG, EmailOutlineSVG, LinkSVG, TelegramOutlineSVG } from "assets/svgs";
import axios from "axios";
import Button from "components/Button";
import Notification from "components/Notification";
import StyledInput from "components/StyledInput";
import { ProjectContext } from "contexts/ProjectContext";
import { useWeb3React } from "contexts/wagmi";
import { useUserFetchData } from "hooks/useUserData";
import { useContext, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useUserInfo } from "state/hooks";
import { useAccount } from "wagmi";

export default function PersonalData() {
  const [name, setName] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [email, setEmail] = useState("");
  const [discord, setDiscord] = useState("");
  const [telegram, setTelegram] = useState("");
  const [uploadUrl, setUploadedUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [confirmClicked, setConfirmClicked] = useState(false);

  const { address: account }: any = useAccount();
  const userInfo = useUserInfo();
  const { t } = useTranslation();
  const { jwtToken } = useContext(ProjectContext);
  const { fetchInfos: fetchUserInfos } = useUserFetchData();
  const { chainId }: any = useWeb3React();

  const stringifiedUserInfo = JSON.stringify(userInfo);

  useEffect(() => {
    setName(userInfo?.nickname);
    setIntroduction(userInfo?.bio);
    setUploadedImage(userInfo?.avatar ?? "");
    setEmail(userInfo?.email);
    setDiscord(userInfo?.discord);
    setTelegram(userInfo?.telegram);
  }, [stringifiedUserInfo]);

  async function onLoadAvatar(acceptedFiles: any[]) {
    try {
      const [File] = acceptedFiles;
      const formData = new FormData();
      formData.append("file", File);
      const url = await axios.post(`/api/uploads`, formData, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      setUploadedUrl(url.data.path);
      setUploadedImage(URL.createObjectURL(File));
    } catch (e) {
      console.log(e);
    }
  }

  async function onConfirm() {
    try {
      setConfirmClicked(true);
      await axios.patch(
        `/api/users/${account.toLowerCase()}`,
        {
          avatar: uploadUrl,
          nickname: name,
          bio: introduction,
          email,
          discord,
          telegram,
        },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      toast(<Notification type={"success"} msg="Successfully Updated" />);
      fetchUserInfos(account, chainId);
    } catch (e) {
      console.log(e);
      toast(<Notification type={"error"} msg="There is problem in update" />);
    }
  }

  return (
    <div className="relative px-3 py-[80px] z-0 tracking-normal overflow-hidden">
      <img src={"/images/buynft/vectors/1.png"} alt={""} className="absolute top-0 left-0 w-full" />
      <img
        src={"/images/buynft/vectors/2.png"}
        alt={""}
        className="absolute top-[267px] left-0 w-full"
      />
      <div className="max-w-[800px] relative z-10 mx-auto mt-[50px]">
        <div className="font-semibold text-[32px] leading-[1]">{t("menus.Personal data")}</div>
        <div className="mt-10">
          <div className="text-[#858585] leading-1">{t("personalData.Photo")}</div>
          <div className="flex items-center mt-6">
            <Dropzone
              maxFiles={1}
              accept={["image/png", "image/jpeg", "image/gif"] as any}
              onDrop={(acceptedFiles) => onLoadAvatar(acceptedFiles)}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="cursor-pointer transition hover:opacity-70 relative [&>div]:hover:!opacity-100"
                >
                  <input {...getInputProps()} />
                  <img
                    src={uploadedImage}
                    alt={""}
                    className="rounded-full w-[68px] h-[68px] "
                    onError={(e: any) =>
                      (e.target.src = "/images/personalcenter/personaldata/avatar.png")
                    }
                  />
                  <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] opacity-0">
                    {LinkSVG}
                  </div>
                </div>
              )}
            </Dropzone>

            <div className="ml-6">
              <div className="gradient-text font-semibold w-fit underline">
                {t("personalData.Select photos")}
              </div>
              <div className="text-xs text-[#999999]">
                {t("personalData.Supports JPG/PNG, with files smaller than 100MB")}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-9 w-full leading-1 md:flex-row flex-col">
          <div className="w-full md:max-w-[340px] max-w-full flex flex-col mr-10">
            <div>
              <div className="text-[#C4C4C4] mb-3">{t("personalData.Nickname")}</div>
              <StyledInput
                value={name}
                setValue={(e: any) => {
                  if (!e.includes(" ")) setName(e);
                }}
                maxLength={20}
              />
            </div>
            <div className="mt-[46px] flex-1 flex flex-col">
              <div className="text-[#C4C4C4] mb-3">{t("personalData.Brief introduction")}</div>
              <div className="md:flex-1 flex-none md:h-fit h-[120px]">
                <StyledInput
                  value={introduction}
                  setValue={setIntroduction}
                  type={"textara"}
                  className="h-full"
                />
              </div>
            </div>
          </div>
          <div className="w-full md:max-w-[340px] max-w-full md:mt-0 mt-10">
            <div className="text-[#858585] mb-4">{t("personalData.Social media")}</div>
            <div>
              <div className="mb-3 flex items-center">
                <div className="text-[#C4C4C4] mr-3">{EmailOutlineSVG}</div>
                <div className="text-[#999999]">Email</div>
              </div>
              <StyledInput value={email} setValue={setEmail} />
            </div>
            <div className="mt-4">
              <div className="mb-3 flex items-center">
                <div className="text-[#999999] mr-3">{DiscordOutlineSVG}</div>
                <div className="text-[#999999]">Discord</div>
              </div>
              <StyledInput value={discord} setValue={setDiscord} />
            </div>
            <div className="mt-4">
              <div className="mb-3 flex items-center">
                <div className="text-[#999999] mr-3">{TelegramOutlineSVG}</div>
                <div className="text-[#999999]">Telegram</div>
              </div>
              <StyledInput value={telegram} setValue={setTelegram} />
            </div>
          </div>
        </div>
        <div className="md:mt-20 mt-10">
          <Button
            type={"secondary"}
            className="w-full md:max-w-[340px] max-w-full"
            onClick={() => onConfirm()}
          >
            {t("actions.Confirm")}
          </Button>
        </div>
      </div>
    </div>
  );
}
