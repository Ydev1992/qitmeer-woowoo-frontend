import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SearchSVG, SortOptionSVG, FavoriteSVG } from "assets/svgs";
import { DogeSVG, BitcoinSVG } from "assets/Token";
import { useNavigate } from "react-router-dom";
import CollectionCarousel from "pages/HomePage/CollectionCarousel";

import { SkeletonComponent } from "components/SkeletonComponent";

import { useDispatch, useSelector } from "react-redux";
import { fetchBrc20Tokens } from "state/inscription";
import { RootState, AppDispatch } from "state";

import "./style.css";
export default function TokenListSection() {
  const [isTimeOptionOpened, setIsTimeOptionOpened] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<Number>(1);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  let abortController = new AbortController();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  let brc20Tokens = useSelector(
    (state: RootState) => state.inscription.brc20Tokens
  );

  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  const skeletonContent: any[] = [];
  for (let i = 1; i <= 10; ++i)
    skeletonContent.push(
      <tr key={i}>
        <td className="text-center">
          <SkeletonComponent className="w-full h-[30px]" />
        </td>
        <td className="text-center">
          <SkeletonComponent className="w-full h-[30px]" />
        </td>
        <td className="text-center">
          <SkeletonComponent className="w-full h-[30px]" />
        </td>
        <td className="text-center">
          <SkeletonComponent className="w-full h-[30px]" />
        </td>
        <td className="text-center">
          <SkeletonComponent className="w-full h-[30px]" />
        </td>
        <td className="text-center">
          <SkeletonComponent className="w-full h-[30px]" />
        </td>
        <td className="text-center">
          <SkeletonComponent className="w-full h-[30px]" />
        </td>
        <td className="text-center">
          <SkeletonComponent className="w-full h-[30px]" />
        </td>
      </tr>
    );

  let tableBodyContent: any[] = [];

  const calcTableBodyContent = () => {
    tableBodyContent = [];

    brc20Tokens.map((brc20Token, index) => {
      tableBodyContent.push(
        <tr
          key={index}
          onClick={() => {
            navigate("/inscriptionDetail", {
              state: { brc20Token },
            });
          }}
          className="cursor-pointer  hover:bg-gray-400 hover:bg-opacity-10"
        >
          <td>
            <div className="pr-[20px]">
              <p className="txt-white font-[700]">{i++}</p>
            </div>
          </td>

          <td>
            <div className="flex flex-row gap-[6px]">
              <div className="flex justify-center items-center">
                <img src={brc20Token.logoUrl} className="w-[30px] h-[30px]" />
              </div>
              <p className="txt-gray font-[600]">{brc20Token.slug}</p>
            </div>
          </td>

          <td>
            <div className="flex flex-row gap-[4px]">
              <div className="flex justify-center items-center">
                {BitcoinSVG}
              </div>
              <p className="txt-white font-[500]">
                {myRoundBy10_4(Number(brc20Token.totalVolume)).toString()}
              </p>
            </div>
            <div className="mt-1">
              <p className="txt-gray font-[400]">
                ${" "}
                {myRoundBy10_2(
                  Number(brc20Token.totalVolume) * Number(brc20Token.BTCPrice)
                ).toString()}
              </p>
            </div>
          </td>

          <td>
            <div className="flex flex-row gap-[4px]">
              <p className="txt-white mx-auto font-[500]">
                {myRoundBy10_6(Number(brc20Token.floorPrice) * 1e8).toString()}{" "}
                sats
              </p>
            </div>
            <div className="mt-1 flex">
              <p className="txt-gray mx-auto font-[400]">
                $ {myRoundBy10_2(Number(brc20Token.lastPrice)).toString()}
              </p>
            </div>
          </td>

          <td>
            <div className="flex flex-row gap-[4px]">
              <div className="flex justify-center items-center">
                {BitcoinSVG}
              </div>
              <p className="txt-white font-[500]">
                {myRoundBy10_4(
                  Number(brc20Token.marketCap) / Number(brc20Token.BTCPrice)
                ).toString()}{" "}
                BTC
              </p>
            </div>
            <div className="mt-1">
              <p className="txt-gray font-[400]">
                {" "}
                ${" "}
                {Number(brc20Token.marketCap) >= 1e7
                  ? myRoundBy10_2(
                      Number(brc20Token.marketCap) * 1e-6
                    ).toString() + "M"
                  : myRoundBy10_2(
                      Number(brc20Token.marketCap) * 1e-3
                    ).toString() + "K"}
              </p>
            </div>
          </td>

          <td>
            <div>
              <p
                className={
                  "font-[500] " +
                  getColorForChangeRateText(
                    brc20Token.oneDayRate,
                    brc20Token.sevenDaysRate,
                    brc20Token.thirtyDaysRate
                  )
                }
              >
                {currentTime === 1
                  ? myRoundBy10_2(brc20Token.oneDayRate).toString()
                  : currentTime === 7
                  ? myRoundBy10_2(brc20Token.sevenDaysRate).toString()
                  : currentTime === 30
                  ? myRoundBy10_2(brc20Token.thirtyDaysRate).toString()
                  : "--"}
                {currentTime === -1 ? "" : "%"}
              </p>
            </div>
          </td>

          <td>
            <div>
              <p className="txt-white font-[400]">
                {brc20Token.transactionCount.toString()}
              </p>
            </div>
          </td>

          <td>
            <div className="gap-[4px]">
              <p className="txt-white font-[500] text-right">
                {brc20Token.holder.toString()}
              </p>
            </div>
            <div className="mt-1">
              <p className="txt-green font-[500] text-right">+{10}%</p>
            </div>
          </td>

          <td>
            <div className="pl-[30px]">{FavoriteSVG}</div>
          </td>
        </tr>
      );
    });
    console.log(tableBodyContent);
  };

  useEffect(() => {
    const fetchData = async () => {
      // abortController.abort();
      // const newAbortController = new AbortController();
      // abortController = newAbortController;

      setIsLoading(true);

      await dispatch(fetchBrc20Tokens(searchTerm));
      // calcTableBodyContent();
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch, searchTerm]);

  const myRoundBy10_6 = (x: Number) => {
    return Math.round(Number(x) * 10 ** 6) / 10 ** 6;
  };

  const myRoundBy10_4 = (x: Number) => {
    return Math.round(Number(x) * 10 ** 4) / 10 ** 4;
  };

  const myRoundBy10_2 = (x: Number) => {
    return Math.round(Number(x) * 10 ** 2) / 10 ** 2;
  };

  const getColorForChangeRateText = (
    oneD: Number,
    sevenD: Number,
    thirtyD: Number
  ) => {
    switch (currentTime) {
      case 1:
        if (Number(oneD) >= 0) return "txt-green";
        return "txt-red";
      case 7:
        if (Number(sevenD) >= 0) return "txt-green";
        return "txt-red";
      case 30:
        if (Number(thirtyD) >= 0) return "txt-green";
        return "txt-red";
      case -1:
        return "txt-white";
    }
  };

  const { t } = useTranslation();
  let i = 1;

  const handleTimeDropdownClicked = () => {
    setIsTimeOptionOpened(!isTimeOptionOpened);
  };

  const handleTimeSelected = (time: Number) => {
    setIsTimeOptionOpened(false);
    setCurrentTime(time);
  };

  const getTextForCurrentTime = () => {
    switch (currentTime) {
      case 1:
        return "24H";
      case 7:
        return "7D";
      case 30:
        return "30D";
      default:
        return "24H";
    }
  };

  return (
    <div className=" w-full flex flex-col gap-8 justify-center items-center">
      {/* Table Title & Actions */}
      <div className="w-full flex flex-row justify-between ">
        <p className="text-white text-[24px] font-semibold leading-[30px] tracking-[1.2px] min-w-[200px]">
          BRC-20
        </p>
        <div className="flex flex-row gap-2">
          <div className="relative">
            <div
              onClick={() => handleTimeDropdownClicked()}
              className="flex cursor-pointer text-[14px] py-[10px] justify-center items-center rounded-[4px] border-[1px] border-[#767676] backdrop-blur-[8px] min-w-[79px]"
            >
              {getTextForCurrentTime()}&nbsp;
              <img src="images/Add_BRC-20/VectorArrowBottom.png"></img>
            </div>
            <div
              className={`${
                isTimeOptionOpened ? "block" : "hidden"
              } absolute rounded-md top-11 left-0 w-[79px] z-20 bg-black border-[1px] border-[#767676]`}
            >
              <div
                onClick={() => handleTimeSelected(1)}
                className="cursor-pointer my-1 flex text-left"
              >
                <p className="pl-[10px] my-auto w-[144px] font-poppins text-white text-[16px]">
                  24H
                </p>
              </div>
              <div
                onClick={() => handleTimeSelected(7)}
                className="cursor-pointer my-1 flex text-left"
              >
                <p className="pl-[10px] my-auto w-[144px] font-poppins text-white text-[16px]">
                  7D
                </p>
              </div>
              <div
                onClick={() => handleTimeSelected(30)}
                className="cursor-pointer my-1 flex text-left"
              >
                <p className="pl-[10px] my-auto w-[144px] font-poppins text-white text-[16px]">
                  30D
                </p>
              </div>
            </div>
          </div>
          <div
            onClick={() => setCurrentTime(-1)}
            className="flex text-[14px] py-[10px] cursor-pointer justify-center items-center rounded-[4px] border-transparent bg-white bg-opacity-10 backdrop-blur-[8px] min-w-[64px]"
          >
            All
          </div>
          <div className="flex text-[14px] py-[10px] justify-center items-center rounded-[4px] border-transparent bg-white bg-opacity-10 backdrop-blur-[8px] min-w-[130px]">
            In casting
          </div>
          <div className="bg-white text-[14px] bg-opacity-10 backdrop-blur flex items-center p-[8px_26px] relative rounded-[4px] min-w-[182px]">
            <div className="mr-2">{SearchSVG}</div>
            <input
              type={"text"}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              placeholder="Search coin"
              className="bg-transparent flex-1 outline-none border-none leading-[1.6] min-w-0"
            />
          </div>
        </div>
      </div>
      {/* Table body */}
      <div className="w-full overflow-x-auto z-10">
        <table className="w-full token-list-table">
          <thead className="w-full">
            <tr>
              <td className="min-w-[50px]">
                <div className="flex">
                  <p>No</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </td>
              <td className="min-w-[150px]">
                <div className="flex">
                  <p>Coins</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </td>
              <td className="min-w-[150px]">
                <div className="flex">
                  <p>Transaction volume</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </td>

              <th className="min-w-[200px]">
                <div className="flex">
                  <p>Price</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </th>

              <th className="min-w-[150px]">
                <div className="flex">
                  <p>Market value</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </th>

              <th className="min-w-[100px]">
                <div className="flex">
                  <p>Rise and fall range</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </th>
              <th className="min-w-[100px]">
                <div className="flex">
                  <p>Number of transactions</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </th>
              <th colSpan={2} className="min-w-[100px]">
                <div className="flex">
                  <p>Holders</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {!isLoading
              ? brc20Tokens.map((brc20Token, index) => {
                  return (
                    <tr
                      key={index}
                      onClick={() => {
                        navigate("/inscriptionDetail", {
                          state: { brc20Token },
                        });
                      }}
                      className="cursor-pointer  hover:bg-gray-400 hover:bg-opacity-10"
                    >
                      <td>
                        <div className="pr-[20px]">
                          <p className="txt-white font-[700]">{i++}</p>
                        </div>
                      </td>

                      <td>
                        <div className="flex flex-row gap-[6px]">
                          <div className="flex justify-center items-center">
                            <img
                              src={brc20Token.logoUrl}
                              className="w-[30px] h-[30px]"
                            />
                          </div>
                          <p className="txt-gray font-[600]">
                            {brc20Token.slug}
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="flex flex-row gap-[4px]">
                          <div className="flex justify-center items-center">
                            {BitcoinSVG}
                          </div>
                          <p className="txt-white font-[500]">
                            {myRoundBy10_4(
                              Number(brc20Token.totalVolume)
                            ).toString()}
                          </p>
                        </div>
                        <div className="mt-1">
                          <p className="txt-gray font-[400]">
                            ${" "}
                            {myRoundBy10_2(
                              Number(brc20Token.totalVolume) *
                                Number(brc20Token.BTCPrice)
                            ).toString()}
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="flex flex-row gap-[4px]">
                          <p className="txt-white mx-auto font-[500]">
                            {myRoundBy10_6(
                              Number(brc20Token.floorPrice) * 1e8
                            ).toString()}{" "}
                            sats
                          </p>
                        </div>
                        <div className="mt-1 flex">
                          <p className="txt-gray mx-auto font-[400]">
                            ${" "}
                            {myRoundBy10_2(
                              Number(brc20Token.lastPrice)
                            ).toString()}
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="flex flex-row gap-[4px]">
                          <div className="flex justify-center items-center">
                            {BitcoinSVG}
                          </div>
                          <p className="txt-white font-[500]">
                            {myRoundBy10_4(
                              Number(brc20Token.marketCap) /
                                Number(brc20Token.BTCPrice)
                            ).toString()}{" "}
                            BTC
                          </p>
                        </div>
                        <div className="mt-1">
                          <p className="txt-gray font-[400]">
                            {" "}
                            ${" "}
                            {Number(brc20Token.marketCap) >= 1e7
                              ? myRoundBy10_2(
                                  Number(brc20Token.marketCap) * 1e-6
                                ).toString() + "M"
                              : myRoundBy10_2(
                                  Number(brc20Token.marketCap) * 1e-3
                                ).toString() + "K"}
                          </p>
                        </div>
                      </td>

                      <td>
                        <div>
                          <p
                            className={
                              "font-[500] " +
                              getColorForChangeRateText(
                                brc20Token.oneDayRate,
                                brc20Token.sevenDaysRate,
                                brc20Token.thirtyDaysRate
                              )
                            }
                          >
                            {currentTime === 1
                              ? myRoundBy10_2(brc20Token.oneDayRate).toString()
                              : currentTime === 7
                              ? myRoundBy10_2(
                                  brc20Token.sevenDaysRate
                                ).toString()
                              : currentTime === 30
                              ? myRoundBy10_2(
                                  brc20Token.thirtyDaysRate
                                ).toString()
                              : "--"}
                            {currentTime === -1 ? "" : "%"}
                          </p>
                        </div>
                      </td>

                      <td>
                        <div>
                          <p className="txt-white font-[400]">
                            {brc20Token.transactionCount.toString()}
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="gap-[4px]">
                          <p className="txt-white font-[500] text-right">
                            {brc20Token.holder.toString()}
                          </p>
                        </div>
                        <div className="mt-1">
                          <p className="txt-green font-[500] text-right">
                            +{10}%
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="pl-[30px]">{FavoriteSVG}</div>
                      </td>
                    </tr>
                  );
                })
              : skeletonContent}
          </tbody>
        </table>
      </div>
    </div>
  );
}
