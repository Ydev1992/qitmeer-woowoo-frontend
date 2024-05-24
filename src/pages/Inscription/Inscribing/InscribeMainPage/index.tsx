import { useTranslation } from "react-i18next";
import { useState } from "react";
import Preview from "./Preview";

import InscribingTabs from "./InscribingTabs";

export default function Inscribing() {
  const { t } = useTranslation();
  return (
    <>
      <div className="max-w-[1240px]  md:flex grid z-10 mx-auto">
        <InscribingTabs />
        <Preview />
      </div>
    </>
  );
}
