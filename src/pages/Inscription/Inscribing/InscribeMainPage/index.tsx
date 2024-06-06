import { useTranslation } from "react-i18next";
import { useState } from "react";
import Preview from "./Preview";

import InscribingTabs from "./InscribingTabs";

import Brc20State from "./Interfaces/Brc20State";
import ImageState from "./Interfaces/ImageState";

export default function Inscribing() {
  const { t } = useTranslation();

  const [inscMode, setInscMode] = useState<string>("BRC-20");

  const [brc20State, setBrc20State] = useState<Brc20State>({
    op: "mint",
    tick: "",
    mintCount: 1,
    mintAmount: 1000,
  });

  const [imageState, setImageState] = useState<ImageState>({
    imageURL: null,
  });

  return (
    <>
      <div className="max-w-[1240px]  md:flex grid z-10 mx-auto">
        <div className="md:w-1/2 mr-10  w-full">
          <InscribingTabs
            brc20State={brc20State}
            setBrc20State={setBrc20State}
            imageState={imageState}
            setImageState={setImageState}
            setInscMode={setInscMode}
          />
        </div>
        <Preview
          inscMode={inscMode}
          brc20State={brc20State}
          imageState={imageState}
        />
      </div>
    </>
  );
}
