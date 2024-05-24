import { useTranslation } from "react-i18next";

const Preview = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-300 md:w-1/2 w-full">
      <div className=" relative mb-4 py-0.5 ">Preview</div>
    </div>
  );
};

export default Preview;
