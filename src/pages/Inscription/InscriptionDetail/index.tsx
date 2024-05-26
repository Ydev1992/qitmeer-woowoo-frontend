import TotalAnalyze from "./TotalAnalyze";
import AnalyzeBadge from "./AnalyzeBadge";
import Tabs from "./Tabs";
import { useLocation } from "react-router-dom";
import ConfirmPopupDialog from "./components/ConfirmPopupDialog";

import { Brc20Token } from "./Brc20TokenInterface";

export default function InscriptionDetail() {
  const location = useLocation();
  const { state } = location as { state: { brc20Token: Brc20Token } };

  return (
    <div className="relative px-3 py-[80px] z-0 overflow-hidden">
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
        <TotalAnalyze brc20Token={state.brc20Token} />
        <AnalyzeBadge brc20Token={state.brc20Token} />
        <Tabs brc20Token={state.brc20Token} />
      </div>
    </div>
  );
}
