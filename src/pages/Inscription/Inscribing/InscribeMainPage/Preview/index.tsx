import { useTranslation } from "react-i18next";

const Preview = () => {
  const { t } = useTranslation();

  const previewItem = {
    p: "brc-20",
    op: "mint",
    tick: "loli",
    amt: "1000",
  };

  const getPreviewList = () => {
    let i = 0;
    return new Array(10).map((val, index) => {
      return (
        <p>
          {++i}
          {previewItem.p}
        </p>
      );
    });
  };

  return (
    <div className="bg-gray-300 md:w-1/2 w-full">
      <div className=" relative mb-4 py-0.5 ">Preview</div>
      <div className=" h-auto md:h-[420px] ">{getPreviewList()}</div>
    </div>
  );
};

export default Preview;
