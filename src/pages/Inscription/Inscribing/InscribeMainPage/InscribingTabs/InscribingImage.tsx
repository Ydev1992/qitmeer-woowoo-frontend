import { useTranslation } from "react-i18next";

const InscribingImage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="cursor-pointer" onClick={(e) => {}}>
        <div className=" relative mb-4 py-0.5 ">Inscribing Image</div>
      </div>
    </>
  );
};

export default InscribingImage;
