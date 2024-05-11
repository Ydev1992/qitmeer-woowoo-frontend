import TotalAnalyze from "./TotalAnalyze";
import AnalyzeBadge from "./AnalyzeBadge";
import Tabs from "./Tabs";
import ConfirmPopupDialog from "./components/ConfirmPopupDialog";

export default function CreateInscription() {
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
        <TotalAnalyze />
        <AnalyzeBadge />
        <Tabs />
      </div>
    </div>
  );
}
