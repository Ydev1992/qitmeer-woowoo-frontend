import { useTranslation } from "react-i18next";

const InscribingText = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="cursor-pointer" onClick={(e) => {}}>
        <div className=" relative mb-4 py-0.5 ">Inscribing Text</div>
      </div>
    </>
  );
};

export default InscribingText;
