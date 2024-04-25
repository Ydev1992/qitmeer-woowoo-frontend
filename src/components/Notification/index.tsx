import { CloseSVG, ConfirmSVG, CrossCircleSVG, WhiteLoadingSVG } from "assets/svgs";
import { toast } from "react-toastify";
import { getBlockExplorerLink, getEllipsis } from "utils/functions";

const Notification = ({ type, msg, txhash }: { type: string; msg: string; txhash?: any }) => {
  const icons: any = {
    loading: <div className="[&>svg]:w-5 [&>svg]:h-5">{WhiteLoadingSVG}</div>,
    success: <div className="text-[#05C28C] [&>svg]:w-5 [&>svg]:h-5">{ConfirmSVG}</div>,
    fail: <div className="text-[#E3493F] [&>svg]:w-5 [&>svg]:h-5">{CrossCircleSVG}</div>,
  };
  return (
    <div className="bg-black text-white rounded border border-[#656565] p-4 tracking-tight">
      <div className="flex justify-between ">
        <div className="flex">
          <div className="mt-0.5">{icons[type]}</div>
          <div className="ml-4">{msg}</div>
        </div>
        <div className="text-[#929292] ml-4 mt-1.5 [&>svg]:h-3 [&>svg]:w-3 transition hover:text-white">
          {CloseSVG}
        </div>
      </div>
      {txhash ? (
        <a
          href={getBlockExplorerLink(txhash, "transaction")}
          target="_blank"
          className="text-[#929292] text-sm underline ml-9 font-semibold"
        >
          <span className="tracking-normal font-bold">View Tx</span>: {getEllipsis(txhash, 6, 4)}
        </a>
      ) : (
        ""
      )}
    </div>
  );
};

export default Notification;
