import { formatUnits } from "ethers/lib/utils.js";
import { getEllipsis } from "utils/functions";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

export default function BidHistory({ bids, currency }: { bids: any; currency: any }) {
  return (
    <div>
      <div className="font-semibold text-2xl mt-9">Offers</div>

      <div className="flex mt-2 justify-between text-sm border-b border-[#656565] py-[15px] text-[#C4C4C4]">
        <div className="w-[80px]">From</div>
        <div className="w-[120px] text-center">Price</div>
        <div className="w-[150px] text-right">Time</div>
      </div>
      <div>
        {bids.map((data: any, i: number) => {
          return (
            <div
              key={i}
              className="flex justify-between items-center text-sm py-5 border-b border-[#656565]"
            >
              <div className="text-[#C4C4C4] w-20 gradient-text w-fit font-bold">
                {getEllipsis(data.bidder, 4, 6)}
              </div>

              <div className="w-[120px] overflow-hidden whitespace-nowrap text-ellipsis text-center">
                {Number(formatUnits(data.bidAmount, currency.decimals)).toFixed(2)}{" "}
                {currency.symbol}
              </div>

              <div className="w-[150px] text-end overflow-hidden whitespace-nowrap text-ellipsis">
                {timeAgo.format(data.timestamp * 1000)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
