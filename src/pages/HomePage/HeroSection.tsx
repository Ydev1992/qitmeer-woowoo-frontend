import Button from "components/Button";
import Notification from "components/Notification";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSigner } from "wagmi";

export default function HeroSection() {
  const { t } = useTranslation();
  const { data: signer } = useSigner();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between">
      <div className="mt-[50px] mr-3">
        <div className="text-[40px] font-semibold leading-[1.2]">
            <br />
          {t("home.Create, Trade, Collect")}
          {/*{t("home.Buy & Sell NFTS")}*/}
        </div>
        <div className="mt-4 text-[#C4C4C4] font-lg max-w-[673px] leading-[1.9]">
          {t(
            "home.Woowow Leads the NFT Innovation Road"
          )}
        </div>
        <div className="mt-12 flex xs:flex-row flex-col">
          <Button
            type={"secondary"}
            className="w-[162px] mr-3 font-lg xs:mb-0 mb-2"
            onClick={() => {
              if (!signer)
                toast(
                  <Notification
                    type={"fail"}
                    msg={"Please link to the wallet to create your NFT"}
                  />
                );
              else navigate("/createnft");
            }}
          >
            {t("actions.Create NFT")}
          </Button>
          {/* <Button type={'primary'} className='w-[162px]' border={'1px'} itemClassName='font-lg w-[calc(100%-2px)] p-3'>
            {t('Explore')}
          </Button> */}
        </div>
      </div>
      <div className="mt-6 relative lg:block hidden">
        <div className="absolute bg-[#FFFFFF33] backdrop-blur rounded-lg p-[8px_38px] font-lg font-semibold leading-[1.9] -left-[70px] bottom-[30px]">
          2000+{t("home.Creators")}
        </div>
        <img src={"/images/home/hero.png"} alt={""} />
      </div>
    </div>
  );
}
