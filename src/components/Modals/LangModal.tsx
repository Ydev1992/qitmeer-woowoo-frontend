/* eslint-disable @typescript-eslint/no-explicit-any */

import { XMarkSVG } from "assets/svgs";
import { motion } from "framer-motion";
import { Modal } from "./Modal";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ProjectContext } from "contexts/ProjectContext";

const LangModal = ({ open, setOpen }: { open: boolean; setOpen: any }) => {
  const langs = [
    { name: "English", code: "en" },
    { name: "中文", code: "zhcn" },
    { name: "日本語", code: "jp" },
    { name: "Deutsch", code: "de" },
    { name: "Español", code: "es" },
    { name: "Français", code: "fr" },
    { name: "Italiano", code: "it" },
    { name: "Português", code: "pr" },
    { name: "Română", code: "rm" },
    { name: "Polski", code: "po" },
    { name: "Nederlands", code: "nt" },
    { name: "Türkçe", code: "tk" },
    { name: "हिंदी", code: "hd" },
    { name: "български", code: "bg" },
    { name: "Русский", code: "ru" },
    { name: "한국어", code: "ko" },
  ];

  const { i18n, t } = useTranslation();
  const { onLang, lang } = useContext(ProjectContext);

  return (
    <Modal open={open} setOpen={setOpen}>
      <div className="flex min-h-full items-center justify-center p-4">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: "easeOut",
              duration: 0.15,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.75,
            transition: {
              ease: "easeIn",
              duration: 0.15,
            },
          }}
          transition={{ duration: 0.25 }}
        >
          <div className="relative w-[calc(100vw-24px)] max-w-[640px] rounded-[12px] bg-black sm:p-6 p-[24px_12px] shadow-[0px_0px_46px_0px_#FFFFFF33] border-[2px] border-[#656565]  relative">
            <div className="text-2xl font-medium tracking-normal border-b border-[#2D2D2D] pb-4">
              {t("modal.Languages")}
            </div>
            <div className="flex justify-between flex-wrap mt-4">
              {langs.map((lang, i) => (
                <div className="w-32" key={i}>
                  <div
                    className="mx-2 my-2 cursor-pointer relative w-fit before:content-[''] before:absolute before:w-0 before:-bottom-2 before:h-[1px] before:bg-white before:transition-all hover:before:w-full before:duration-500"
                    onClick={() => {
                      onLang(lang.code);
                      setOpen(false);
                    }}
                  >
                    {lang.name}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setOpen(false)} className="absolute top-6 right-6">
              <span className="sr-only">Close</span>
              {XMarkSVG}
            </button>
          </div>
        </motion.div>
      </div>
    </Modal>
  );
};

export default LangModal;
