import { useContext } from "react";
import { ProjectContext } from "contexts/ProjectContext";
import RecordNFTCard from "./RecordNFTCard";
import { useTranslation } from "react-i18next";

export default function RecordSearchList({ setCategoryOpen }: { setCategoryOpen: any }) {
  const { records } = useContext(ProjectContext);
  const { t } = useTranslation();

  return (
    <div>
      <div className="mt-6 text-lg leading-[1.2] font-medium mb-2">
        {t("searchInput.Records")}
      </div>
      <div className="flex flex-col max-h-[240px] overflow-y-scroll overflow-x-clip white-scroll w-[calc(100%+24px)] -ml-2">
        {records.length ? (
          records.map((record: any, i: number) => {
            return <RecordNFTCard key={i} nft={record} setCategoryOpen={setCategoryOpen} />;
          })
        ) : (
          <div className="ml-2">{t("searchInput.No Records")}</div>
        )}
      </div>
    </div>
  );
}
