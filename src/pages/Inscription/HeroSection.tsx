import Button from "components/Button";
import Notification from "components/Notification";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSigner, useAccount } from "wagmi";
import { ethers } from "ethers";

import { updateWholeTokenTickers } from "../../updateServerDataUtils/updateWholeTokenTickers";

export default function HeroSection() {
  const { t } = useTranslation();
  const { data: signer } = useSigner();
  const navigate = useNavigate();

  const { address: _account, isConnected } = useAccount();

  return (
    <div className="flex justify-between">
      <div className="mt-[50px] mr-3">
        <div className="text-[40px] font-semibold leading-[1.2] max-w-[673px]">
          <br />
          {t("inscription.Marketplace for Creators Buy&Sell NFTS")}
        </div>
        <div className="mt-4 text-[#C4C4C4] font-lg max-w-[673px] leading-[1.9]">
          {t(
            "inscription.Inscribe, buy, and sell Ordinals NFTs & inscriptions on Bitcoin"
          )}
        </div>
        <div className="mt-12 flex xs:flex-row flex-col">
          <Button
            type={"secondary"}
            className="w-[162px] mr-3 font-lg xs:mb-0 mb-2"
            onClick={() => {
              // if (!signer)
              //   toast(
              //     <Notification
              //       type={"fail"}
              //       msg={"Please link to the wallet to create your NFT"}
              //     />
              //   );
              // else navigate("/createnft");
              navigate("/createInscription");
            }}
          >
            {t("actions.Inscription")}
          </Button>
          {isConnected &&
            _account ===
              ethers.utils.getAddress(
                "0x7e1d7990e8a7f2cefb68a5b80e3f5189036726e4"
              ) && (
              <Button
                type={"secondary"}
                className="w-[162px] mr-3 font-lg xs:mb-0 mb-2"
                onClick={() => {
                  const result = updateWholeTokenTickers();
                }}
              >
                Update Server
              </Button>
         )}
        </div>
      </div>
      <div className="mt-6 relative lg:block hidden w-[450px] min-w-[450px] h-[370px]">
        <div className="absolute left-0 bottom-0 ">
          <img src={"/images/inscription/hero2.png"} alt={""} />
        </div>
        <div className="absolute right-0 top-0">
          <img src={"/images/inscription/hero1.png"} alt={""} />
        </div>

        <div className="absolute bg-[#FFFFFF33] backdrop-blur rounded-lg p-[8px_38px] font-lg font-semibold leading-[1.9] -left-[70px] bottom-[30px]">
          2000+{t("home.Creators")}
        </div>
      </div>
    </div>
  );
}
