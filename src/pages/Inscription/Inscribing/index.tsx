import { useTranslation } from "react-i18next";
import { useState } from "react";

import Tabs from "./Tabs";

export default function Inscribing() {
  const { t } = useTranslation();
  return (
    <>
      <div className="relative px-3 pt-[80px] z-0 pb-[80px]  overflow-hidden">
        <img
          src={"/images/home/vectors/1.png"}
          alt={""}
          className="absolute top-0 left-0"
        />
        <img
          src={"/images/home/vectors/2.png"}
          alt={""}
          className="absolute top-[267px] left-0"
        />
        <img
          src={"/images/home/vectors/3.png"}
          alt={""}
          className="absolute top-[1357px] left-0"
        />
        <img
          src={"/images/home/vectors/4.png"}
          alt={""}
          className="absolute top-[2184px] left-0"
        />
        <div className="max-w-[1240px] relative z-10 mx-auto">
          <div className="flex font-mont text-[18px]">
            <a className="text-[#A0A0A0]" href="/inscription">
              Market
            </a>
            <span className="mx-3">{">"}</span>
            <a className="text-white" href="/createInscription">
              Inscribe
            </a>
          </div>
          <Tabs />
        </div>
      </div>
    </>
  );
}
