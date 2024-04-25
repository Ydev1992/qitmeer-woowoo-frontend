import axios from "axios";
import Button from "components/Button";
import { useEffect, useState } from "react";
import { shortenString } from "utils";

export default function CollectionCard({
  collection,
  isSelected,
  setSelectedCollection,
}: {
  collection: any;
  isSelected: boolean;
  setSelectedCollection: any;
}) {
  const [logo, setLogo] = useState("");

  const stringifiedCollection = JSON.stringify(collection);
  useEffect(() => {
    axios
      .get(`/api/collections/${collection.contractAddress.toLowerCase()}`)
      .then((result) => {
        setLogo(result.data?.logo ?? "");
      })
      .catch((e) => console.log(e));
  }, [stringifiedCollection]);

  return (
    <Button
      border={isSelected ? "1px" : "0px"}
      itemClassName="p-[12px_16px]"
      className="backdrop-blur !bg-[#FFFFFF1A] mr-4 mb-2"
      onClick={() => setSelectedCollection(collection.contractAddress)}
      type={"primary"}
    >
      <img
        src={logo}
        onError={(e: any) => (e.target.src = "/images/defaultcollection.jpg")}
        alt={""}
        className="w-[30px] h-[30px] rounded-full"
      />
      <div className="ml-2 flex flex-col items-start">
        <div className="text-sm font-bold flex">
          <div className="max-w-[160px] overflow-hidden text-ellipsis whitespace-nowrap">
            {shortenString(collection.name, 20)}
          </div>
          ({collection.balance})
        </div>
        <div className="text-xs font-medium">$0</div>
      </div>
    </Button>
  );
}
