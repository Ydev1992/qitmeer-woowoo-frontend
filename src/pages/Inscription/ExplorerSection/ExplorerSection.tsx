import Button from "components/Button";
import Notification from "components/Notification";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSigner } from "wagmi";

export default function ExplorerSection() {
  const { t } = useTranslation();
  const { data: signer } = useSigner();
  const navigate = useNavigate();

  let content: any[] = [];
  for (let i = 0; i < 3; i++) {
    content.push(
      <div
        key={i}
        className="relative w-[300px] cursor-pointer gradient-border-hover "
      >
        <div className="relative h-[234px] bg-[#FFFFFF1A] rounded-[12px] ml-0.5 overflow-hidden p-[10px_12px]">
          <div className="relative top-[50%] ">
            <div className="flex flex-row justify-between">
              <p className="text-white text-[18px] font-[600] leading-[30px] tracking-[0.9px]">
                ABCD
              </p>
              <p className="text-white text-[18px] font-[600] leading-[30px] tracking-[0.9px]">
                ABCD
              </p>
            </div>
            <div className="mt-[20px]">
              <Button
                type={"secondary"}
                className="w-full mr-3 font-lg xs:mb-0 mb-2"
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
                {"Buy Now"}
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-[-100px] w-full flex justify-center items-center z-20">
          <div className="w-[217px] h-[196px] rounded-md overflow-hidden">
            <img src={`/images/inscription/explorer/image${i + 1}.png`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full relative rounded-[12px] bg-[#FFFFFF19]">
      <div className="absolute top-[24px] left-[24px]">
        <p className="text-white text-[24px] font-[600] leading-[30px] tracking-[1.2px]">
          Explorer
        </p>
      </div>
      <div className="absolute top-[24px] right-[24px]">
        <p className="text-white text-[18px] font-[400] leading-[30px] tracking-[0.9px] underline">
          See All
        </p>
      </div>
      <div className="w-full pt-[100px] h-[458px] flex flex-row gap-[80px] justify-center items-center">
        {content}
      </div>
    </div>
  );
}
