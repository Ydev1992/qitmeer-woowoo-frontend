import React from "react";
import { useTranslation } from "react-i18next";
import { SearchSVG, SortOptionSVG, FavoriteSVG } from "assets/svgs";
import { DogeSVG, BitcoinSVG } from "assets/Token";
import CollectionCarousel from "pages/HomePage/CollectionCarousel";

import "./style.css";
export default function TokenListSection() {
  const { t } = useTranslation();
  let tableBodyContent: any[] = [];
  for (let i = 0; i < 8; i++)
    tableBodyContent.push(
      <tr key={i}>
        <td>
          <div className="pr-[20px]">
            <p className="txt-white font-[700]">{i}</p>
          </div>
        </td>

        <td>
          <div className="flex flex-row gap-[6px]">
            <div className="flex justify-center items-center">{BitcoinSVG}</div>
            <p className="txt-gray font-[600]">DOGE</p>
          </div>
        </td>

        <td>
          <div className="flex flex-row gap-[4px]">
            <div className="flex justify-center items-center">{BitcoinSVG}</div>
            <p className="txt-white font-[500]">2.91 BTC</p>
          </div>
          <div className="mt-1">
            <p className="txt-gray font-[400]">$ 14,678.123</p>
          </div>
        </td>

        <td>
          <div className="flex flex-row gap-[4px]">
            <p className="txt-white font-[500]">0.00000058 BTC</p>
          </div>
          <div className="mt-1">
            <p className="txt-gray font-[400]">$ 4,678.123</p>
          </div>
        </td>

        <td>
          <div className="flex flex-row gap-[4px]">
            <div className="flex justify-center items-center">{BitcoinSVG}</div>
            <p className="txt-white font-[500]">2.91 BTC</p>
          </div>
          <div className="mt-1">
            <p className="txt-gray font-[400]">$ 14,678.123</p>
          </div>
        </td>

        <td>
          <div>
            <p className="txt-red font-[500]">-2.91%</p>
          </div>
        </td>

        <td>
          <div>
            <p className="txt-white font-[400]">72</p>
          </div>
        </td>

        <td>
          <div className="gap-[4px]">
            <p className="txt-white font-[500] text-right">38</p>
          </div>
          <div className="mt-1">
            <p className="txt-green font-[500] text-right">+5.55%</p>
          </div>
        </td>

        <td>
          <div className="pl-[30px]">{FavoriteSVG}</div>
        </td>
      </tr>
    );
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
              <td colSpan={2} className="min-w-[150px]">
                <div>
                  <p>Coins</p>
                </div>
              </td>
              <td className="min-w-[150px]">
                <div>
                  <p>Transaction volume</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </td>

              <th className="min-w-[200px]">
                <div>
                  <p>Price</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </th>

              <th className="min-w-[150px]">
                <div>
                  <p>Market value</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </th>

              <th className="min-w-[100px]">
                <div>
                  <p>Rise and fall range</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </th>
              <th className="min-w-[100px]">
                <div>
                  <p>Number of transactions</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </th>
              <th colSpan={2} className="min-w-[100px]">
                <div>
                  <p>Holders</p>
                  <span>{SortOptionSVG}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{tableBodyContent}</tbody>
        </table>
      </div>
    </div>
  );
}
