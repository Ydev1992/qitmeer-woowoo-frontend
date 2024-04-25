import { LangSVG } from "assets/svgs";
import LangModal from "components/Modals/LangModal";
import { ProjectContext } from "contexts/ProjectContext";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Lang() {
  const langs = [
    { name: "English", code: "en" },
    { name: "中文", code: "zhcn" },
  ];
  const [open, setOpen] = useState(false);

  const { i18n, t } = useTranslation();
  const { onLang, lang } = useContext(ProjectContext);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      <LangModal open={open} setOpen={setOpen} />
      <div
        className="text-white cursor-pointer lg:block hidden hover:shadow-white relative"
        onClick={() => setOpen(true)}
      >
        {LangSVG}
        {/* <div
        className={`absolute backdrop-blur bg-[#FFFFFF1A] rounded-lg p-[8px_16px] left-[50%] -translate-x-[50%] top-10 w-[120px] ${
          open ? "" : "hidden"
        }`}
        ref={menuRef}
      >
        {langs.map((lang, i) => (
          <div
            key={i}
            className="my-2 relative before:content-[''] before:absolute before:w-0 before:-bottom-0.5 before:h-[1px] before:bg-white before:transition-all hover:before:w-full w-fit before:duration-300"
            onClick={() => onLang(lang.code)}
          >
            {lang.name}
          </div>
        ))}
      </div> */}
      </div>
    </>
  );
}
