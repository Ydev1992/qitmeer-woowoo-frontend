import Collections from "./Collections";
import {
  useUserOwnedCollections,
  useUserInfo,
  useUserListedNFTsByCollection,
  useUserListedCollections,
} from "state/hooks";
import { useEffect, useState } from "react";
import { useFetchUserOwnedNFTsByCollection } from "hooks/useUserData";

export default function MyCollection({ criteria }: { criteria?: string }) {
  const [selectedCollection, setSelectedCollection] = useState("");
  const ownedNFTs = useFetchUserOwnedNFTsByCollection(selectedCollection);
  const ownedCollections = useUserOwnedCollections();

  const listedNFTs = useUserListedNFTsByCollection(selectedCollection);
  const listedCollections = useUserListedCollections();

  const collections: any = {};

  Object.keys(ownedCollections).map((key, i) => {
    if (!collections[key]) collections[key] = { balance: 0 };
    collections[key] = {
      ...ownedCollections[key],
      balance: Number(collections[key].balance) + Number(ownedCollections[key].balance),
    };
  });

  Object.keys(listedCollections).map((key, i) => {
    if (!collections[key]) collections[key] = { balance: 0 };
    collections[key] = {
      ...listedCollections[key],
      balance:
        Number(isNaN(collections[key].balance) ? 0 : collections[key].balance) +
        listedCollections[key].nfts.filter((nft: any) => nft.type === "auction").length,
    };
  });

  const nfts = [...ownedNFTs, ...listedNFTs.filter((nft: any) => nft.type === "auction")];

  useEffect(() => {
    if (!collections || selectedCollection) return;
    try {
      setSelectedCollection(collections[Object.keys(collections)[0]].contractAddress);
    } catch (e) {
      ("");
    }
  }, [selectedCollection, collections]);

  return (
    <Collections
      collections={collections}
      nfts={nfts}
      selectedCollection={selectedCollection}
      setSelectedCollection={setSelectedCollection}
    />
  );
}
