import Button from "components/Button";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { shortenString } from "utils";

export default function Card({ nft }: { nft: any }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center w-[298px] sm:mx-10 mx-0 cursor-pointer">
      <img src={nft.logo} alt={""} className="rounded-[12px] z-10" />
      <div className="relative w-full rounded-[12px] -mt-[98px] gradient-border-hover">
        <div className="w-[calc(100%-4px)] rounded-[12px] bg-[#FFFFFF1A] ml-0.5 p-[114px_16px_24px_16px]">
          <div className="flex justify-between font-lg font-semibold">
            <div>{shortenString(nft.name, 20)}</div>
            <div>{nft.price}</div>
          </div>
          <Link to={"/buynft"}>
            <Button
              type={"primary"}
              className="font-lg font-semibold w-full mt-5"
              border={"1px"}
              itemClassName="py-3.5 w-full hover:bg-[linear-gradient(90deg,#4FC0FF_0%,#C23FFF_100%)] hover:!shadow-none"
            >
              {t("actions.Buy now")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
