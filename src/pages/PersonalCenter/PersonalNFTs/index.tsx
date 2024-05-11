import { ConfirmSVG, CopySVG, LinkSVG } from "assets/svgs";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEllipsis } from "utils/functions";
import { useAccount } from "wagmi";
import { useContext, useEffect, useState } from "react";
import Button from "components/Button";
import SearchInput from "components/SearchInput";
import Dropdown from "components/Dropdown";
import StyledImage from "components/StyledImage";
import MyCollection from "./MyCollection";
import {
  useUserInfo,
  useUserListedCollections,
  useUserOwnedCollections,
  useUserTransactionHistory,
} from "state/hooks";
import ListedCollections from "./ListedCollection";
import TransactionHistory from "./TransactionHistory";
import { tokens } from "config/tokens";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";
import zh from "javascript-time-ago/locale/zh";
import bg from "javascript-time-ago/locale/bg";
import de from "javascript-time-ago/locale/de";
import es from "javascript-time-ago/locale/es";
import fr from "javascript-time-ago/locale/fr";
import hi from "javascript-time-ago/locale/hi";
import it from "javascript-time-ago/locale/it";
import ja from "javascript-time-ago/locale/ja";
import ko from "javascript-time-ago/locale/ko";
import pr from "javascript-time-ago/locale/es-PR";
import rm from "javascript-time-ago/locale/rm";
import ru from "javascript-time-ago/locale/ru";
import tk from "javascript-time-ago/locale/tk";
import { useTranslation } from "react-i18next";
import { ProjectContext } from "contexts/ProjectContext";
import { useUserData } from "hooks/useUserData";

TimeAgo.addLocale(en);
TimeAgo.addLocale(zh);
TimeAgo.addLocale(bg);
TimeAgo.addLocale(de);
TimeAgo.addLocale(es);
TimeAgo.addLocale(fr);
TimeAgo.addLocale(hi);
TimeAgo.addLocale(it);
TimeAgo.addLocale(ja);
TimeAgo.addLocale(ko);
TimeAgo.addLocale(pr);
TimeAgo.addLocale(rm);
TimeAgo.addLocale(ru);
TimeAgo.addLocale(tk);

// Create formatter (English).
let timeAgo = new TimeAgo([
  "en-US",
  "zh-ZH",
  "bg-BG",
  "de-DE",
  "es-ES",
  "fr-FR",
  "hi-HI",
  "it-IT",
  "ja-JA",
  "ko-KO",
  "pr-PR",
  "rm-RM",
  "ru-RU",
  "tk-TK",
]);

export default function PersonalNFTs() {
  useUserData();

  const { type } = useParams();
  const { t } = useTranslation();

  const filters = [
    { name: t("mycollection.My collection"), link: "mycollection" },
    { name: t("mycollection.Listed"), link: "listed" },
    { name: t("mycollection.Sale"), link: "sale" },
    { name: t("mycollection.Offers made"), link: "offersmade" },
    { name: t("mycollection.Offers received"), link: "offersreceived" },
    { name: t("mycollection.Transaction History"), link: "transactionhistory" },
  ];
  const { address: account }: any = useAccount();
  const userInfo = useUserInfo();

  const [isCopied, setIsCopied] = useState(false);
  const [criteria, setCriteria] = useState("");
  const navigate = useNavigate();

  const history = useUserTransactionHistory();
  const myCollections = useUserOwnedCollections();
  const listedCollections = useUserListedCollections();

  let myCollectionCount = 0,
    listedCollectionCount = 0;

  Object.keys(myCollections).map(
    (key) =>
      (myCollectionCount += Number(
        isNaN(myCollections[key].balance) ? 0 : myCollections[key].balance
      ))
  );

  Object.keys(listedCollections).map(
    (key) => (
      (listedCollectionCount += Number(listedCollections[key].balance)),
      (myCollectionCount += listedCollections[key].nfts.filter(
        (nft: any) => nft.type === "auction"
      ).length)
    )
  );

  const { lang } = useContext(ProjectContext);

  const wrappedLists: any = history
    .filter(
      (tx: any) =>
        tx.type.toLowerCase() === type || type === "transactionhistory"
    )
    .map((tx: any) => {
      let currency: any = Object.keys(tokens[813]).find(
        (key, i) => tokens[813][key].address.toLowerCase() === tx.currency
      );
      currency = tokens[813][currency];
      return {
        ...tx,
        address: tx.assetContract,
        nftId: "#" + tx.tokenId,
        amount: {
          currency: currency,
          value: (tx.price / Math.pow(10, currency.decimals)).toFixed(2),
        },
        date: timeAgo.format(tx.timestamp * 1000),
      };
    });

  const counts = [
    myCollectionCount,
    listedCollectionCount,
    wrappedLists.length,
    wrappedLists.length,
    wrappedLists.length,
    wrappedLists.length,
  ];

  const onCopyAddress = (address: string) => {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
    navigator.clipboard.writeText(address);
  };

  useEffect(() => {
    if (lang === "zhcn") {
      TimeAgo.addDefaultLocale(zh);
      timeAgo = new TimeAgo(["zh-ZH", "en-US"]);
    } else {
      TimeAgo.addDefaultLocale(en);
      timeAgo = new TimeAgo(["en-US", "zh-ZH"]);
    }
  }, [lang]);

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
        <div className="flex justify-between items-center  sm:flex-row flex-col">
          <div className="flex items-center sm:mb-0 mb-6">
            <Link
              className="relative cursor-pointer hover:opacity-70 [&>div:nth-child(2)]:hover:!opacity-100 mr-4"
              to={"/personaldata"}
            >
              <StyledImage
                src={userInfo?.avatar ?? ""}
                onError={(e: any) =>
                  (e.target.src =
                    "/images/personalcenter/personaldata/avatar.png")
                }
                alt={""}
                className="!w-[60px] !h-[60px] rounded-full"
              />
              <div className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] opacity-0">
                {LinkSVG}
              </div>
            </Link>

            <div>
              <div className="flex items-center">
                <div className="font-semibold text-[32px] mr-5 leading-[1.2]">
                  {userInfo.nickname}
                </div>
              </div>
              <div className="flex items-center justify-between text-lg text-[#C4C4C4]">
                <div>{isCopied ? "Copied" : getEllipsis(account)}</div>
                <div
                  className="w-5 flex justify-center cursor-pointer"
                  onClick={() => onCopyAddress(account)}
                >
                  {isCopied ? ConfirmSVG : CopySVG}
                </div>
              </div>
            </div>
          </div>
          <div className="flex xs:flex-row flex-col xs:items-start items-center">
            <Link to={"/createnft"}>
              <Button type={"secondary"} className="mr-3 w-[162px] h-[44px]">
                {t("actions.Create NFT")}
              </Button>
            </Link>
            <Link to={"/createcollection"} className="xs:mt-0 mt-4">
              <Button
                type={"primary"}
                border="1px"
                itemClassName="p-[8px_16px]"
                className="h-[44px]"
              >
                {t("actions.Create a collection")}
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-7 xl:items-center items-end flex justify-between xl:flex-row flex-col-reverse">
          <div className="md:flex hidden">
            {filters.map((data, i) => {
              return (
                <Link key={i} to={`/personalnfts/${data.link}`}>
                  <Button
                    type="category"
                    className={`h-[36px] !rounded-lg mr-3 whitespace-nowrap ${
                      data.link === type?.toLowerCase()
                        ? "!bg-white !text-black font-semibold"
                        : ""
                    }`}
                  >
                    {data.name}
                    {data.link === type?.toLowerCase() ? (
                      <span className="text-sm">{`(${counts[i]})`}</span>
                    ) : (
                      ""
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>
          <div className="relative z-10 md:hidden block">
            <Dropdown
              values={filters.map((filter) => filter.name)}
              value={filters.indexOf(
                filters.find(
                  (data: any) =>
                    data.link.replaceAll(" ", "").toLowerCase() === type
                ) as any
              )}
              setValue={(i: any) =>
                navigate(`/personalnfts/${filters[i].link}`)
              }
              className="w-[280px] text-base"
            />
          </div>
          <div className="xl:mb-0 mb-4 w-full flex justify-end">
            <SearchInput
              criteria={criteria}
              setCriteria={setCriteria}
              placeholder={t("searchInput.Search NFT more...")}
              isCategory={false}
              className="!text-base w-full max-w-[440px]"
              inputClassName="!p-3"
            />
          </div>
        </div>
        <div className="mt-[30px]" />
        {type === "mycollection" ? (
          <MyCollection criteria={criteria} />
        ) : type === "listed" ? (
          <ListedCollections />
        ) : (
          <TransactionHistory history={wrappedLists} />
        )}
      </div>
    </div>
  );
}
