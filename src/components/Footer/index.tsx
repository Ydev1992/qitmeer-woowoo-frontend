import {
  DimAISVG,
  DiscordSVG,
  DocSVG,
  MediumSVG,
  QitmeerSVG,
  TelegramSVG,
  TwitterSVG,
  YoutubeSVG,
} from "assets/svgs";
import BackToTop from "components/BackToTop";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export default function Footer() {
  const { t } = useTranslation();
  const partners = [
    { icon: QitmeerSVG, href: "https://www.qitmeer.io/" },
    { icon: DimAISVG, href: "https://www.dimai.ai/" },
  ]
  const socials = [
    { icon: TwitterSVG, href: "https://twitter.com/WoowowGlobal" },
    { icon: MediumSVG, href: "https://medium.com/@woowow" },
    // { icon: YoutubeSVG, href: "https://www.youtube.com/@DimAIGlobal" },
    // { icon: TelegramSVG, href: "https://t.me/DimAIOfficial" },
    // { icon: TelegramSVG, href: "https://t.me/DimAINews" },
    // { icon: DiscordSVG, href: "https://discord.gg/ffRS2QWe" },
    // { icon: DocSVG, href: "https://dimai.gitbook.io/docs/" },
  ];
  const location = useLocation();
  let path;
  if (location) {
    path = location.pathname.substring(1);
  }

  const isLG = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <>
      <BackToTop />
      <div className="bg-black pb-[30px] px-3 z-10 relative">
        <div className="flex justify-between items-center max-w-[1138px] mx-auto w-full pt-[46px] pb-[29px] flex-wrap">
          <div className="xs:border-r border-r-0 border-[#333333] h-[168px] flex justify-center flex-col xs:w-[30%] w-full lg:items-start items-center">
            <img
              src={isLG ? "/logo-horizontal.png" : "/logo.png"}
              alt={""}
              className="lg:h-20 h-28 w-fit"
            />
            <div className="text-[#848E9C] text-sm mt-4">{t("footer.All Right Reserved.")}</div>
          </div>
          <div className="md:xs:w-[30%] xs:w-[60%] w-full xs:mt-0 mt-6">
            <div className="flex text-[#848E9C] text-sm w-full max-w-[334px]">
              <a href={"/"} className="footerlink mr-10 ml-10 mb-3">
                {t("footer.Pricing")}
              </a>
            </div>
            <div className="flex text-[#848E9C] text-sm w-full max-w-[334px]">
              <a href={"/personalnfts/mycollection"} className="footerlink mr-10 ml-10 mb-3">
                {t("footer.My Collection")}
              </a>

            </div>
            <div className="flex text-[#848E9C] text-sm w-full max-w-[334px]">
              <a href={"/createcollection"} className="footerlink mr-10 ml-10 mb-3">
                {t("footer.Create a collection")}
              </a>

            </div>
            <div className="flex text-[#848E9C] text-sm w-full max-w-[334px]">
              <a href={"/createnft"} className="footerlink mr-10 ml-10 mb-3">
                {t("footer.Create NFT")}
              </a>
              {/* <a href={"#"} className="footerlink">
                {t("footer.Privacy Policy")}
              </a> */}
            </div>
          </div>
          <div className="md:xs:w-[160px] xs:w-[40%] w-full md:mt-0 mt-8 ml-10">
            <div>{t("footer.Partners")}</div>
            <div className="flex flex-wrap mt-6">
              {partners.map((data, i) => {
                return (
                    <a
                        key={i}
                        className="mr-4 mb-5 text-[#767676] hover:text-white transition [&>svg]:h-6 [&>svg]:w-6"
                        href={data.href}
                        target={"_blank"}
                    >
                      {data.icon}
                    </a>
                );
              })}
            </div>
          </div>
          <div className="md:xs:w-[160px] xs:w-[40%] w-full md:mt-0 mt-8 ml-10">
            <div>{t("footer.Find us on")}</div>
            <div className="flex flex-wrap mt-6">
              {socials.map((data, i) => {
                return (
                  <a
                    key={i}
                    className="mr-4 mb-5 text-[#767676] hover:text-white transition [&>svg]:h-6 [&>svg]:w-6"
                    href={data.href}
                    target={"_blank"}
                  >
                    {data.icon}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        <div className="h-[1px] w-full bg-[#333333] max-w-[1280px] w-full mx-auto" />
      </div>
    </>
  );
}
