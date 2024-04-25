import Collections from "./Collections";
import { useUserListedCollections, useUserListedNFTsByCollection } from "state/hooks";
import { useEffect, useState } from "react";

export default function ListedCollections() {
  const [selectedCollection, setSelectedCollection] = useState("");
  const nfts = useUserListedNFTsByCollection(selectedCollection);
  const collections = useUserListedCollections();

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
