import Button from "components/Button";
import { useTranslation } from "react-i18next";

export default function BackToTop() {
  const { t } = useTranslation();
  return (
    <div className="w-full backdrop-blur bg-[#FFFFFF1A] pr-3">
      <div className="w-full max-w-[1330px] mx-auto h-[65px] flex justify-end items-center">
        <Button
          type={"primary"}
          border={"2px"}
          className="h-fit"
          itemClassName="p-[8px_24px] bg-transparent w-[calc(100%-4px)] text-lg"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          {t("actions.Back to top")}
        </Button>
      </div>
    </div>
  );
}
