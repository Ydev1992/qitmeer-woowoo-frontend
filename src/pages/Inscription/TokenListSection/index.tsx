import React, { useEffect } from "react";
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
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const brc20Tokens = useSelector(
    (state: RootState) => state.inscription.brc20Tokens
  );
  const skeletonContent: any[] = [];
  for (let i = 1; i <= 20; ++i)
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

  useEffect(() => {
    dispatch(fetchBrc20Tokens());
  }, [dispatch]);

  const myRoundBy10_6 = (x: Number) => {
    return Math.round(Number(x) * 10 ** 6) / 10 ** 6;
  };

  const { t } = useTranslation();
  let tableBodyContent: any[] = [];
  let i = 1;
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
            <p className="txt-gray font-[600]">{brc20Token.symbol}</p>
          </div>
        </td>

        <td>
          <div className="flex flex-row gap-[4px]">
            <div className="flex justify-center items-center">{BitcoinSVG}</div>
            <p className="txt-white font-[500]">
              {brc20Token.marketCap.toString()}
            </p>
          </div>
          <div className="mt-1">
            <p className="txt-gray font-[400]">
              $ {myRoundBy10_6(Number(brc20Token.marketCap) / 60000).toString()}
            </p>
          </div>
        </td>

        <td>
          <div className="flex flex-row gap-[4px]">
            <p className="txt-white mx-auto font-[500]">
              {myRoundBy10_6(brc20Token.lastPrice).toString()}
            </p>
          </div>
          <div className="mt-1 flex">
            <p className="txt-gray mx-auto font-[400]">
              $ {myRoundBy10_6(Number(brc20Token.lastPrice) / 6000).toString()}
            </p>
          </div>
        </td>

        <td>
          <div className="flex flex-row gap-[4px]">
            <div className="flex justify-center items-center">{BitcoinSVG}</div>
            <p className="txt-white font-[500]">
              {myRoundBy10_6(brc20Token.lastPrice).toString()} BTC
            </p>
          </div>
          <div className="mt-1">
            <p className="txt-gray font-[400]">
              {" "}
              $ {myRoundBy10_6(Number(brc20Token.lastPrice) / 6000).toString()}
            </p>
          </div>
        </td>

        <td>
          <div>
            <p className="txt-red font-[500]">
              {myRoundBy10_6(Math.random() * 10 + 1)}%
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
              +{myRoundBy10_6(Math.random() * 10 + Math.random() * 10 + 2)}%
            </p>
          </div>
        </td>

        <td>
          <div className="pl-[30px]">{FavoriteSVG}</div>
        </td>
      </tr>
    );
  });

  return (
    <div className=" w-full flex flex-col gap-8 justify-center items-center">
      {/* Table Title & Actions */}
      <div className="w-full flex flex-row justify-between">
        <p className="text-white text-[24px] font-semibold leading-[30px] tracking-[1.2px] min-w-[200px]">
          BRC-20
        </p>
        <div className="flex flex-row gap-2 overflow-x-auto">
          <div className="flex text-[14px] py-[10px] justify-center items-center rounded-[4px] border-[1px] border-[#767676] backdrop-blur-[8px] min-w-[79px]">
            24H
          </div>
          <div className="flex text-[14px] py-[10px] justify-center items-center rounded-[4px] border-transparent bg-white bg-opacity-10 backdrop-blur-[8px] min-w-[64px]">
            All
          </div>
          <div className="flex text-[14px] py-[10px] justify-center items-center rounded-[4px] border-transparent bg-white bg-opacity-10 backdrop-blur-[8px] min-w-[130px]">
            In casting
          </div>
          <div className="bg-white text-[14px] bg-opacity-10 backdrop-blur flex items-center p-[8px_26px] relative rounded-[4px] min-w-[182px]">
            <div className="mr-2">{SearchSVG}</div>
            <input
              type={"text"}
              placeholder="Search coin"
              className="bg-transparent flex-1 outline-none border-none leading-[1.6] min-w-0"
            />
          </div>
        </div>
      </div>
      {/* Table body */}
      <div className="w-full overflow-x-auto">
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
            {brc20Tokens.length ? tableBodyContent : skeletonContent}
          </tbody>
        </table>
      </div>
    </div>
  );
}
