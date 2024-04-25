import CollectionList from "./CollectionList";
import NFTPanel from "./NFTPanel";

export default function Collections({
  collections,
  nfts,
  selectedCollection,
  setSelectedCollection,
  
}: {
  collections: any;
  nfts: any;
  selectedCollection: any;
  setSelectedCollection: any;
}) {
  return (
    <div>
      <CollectionList
        collections={collections ? Object.keys(collections).map((key) => collections[key]) : []}
        selectedCollection={selectedCollection}
        setSelectedCollection={setSelectedCollection}
      />
      <div className="mt-[30px]" />
      <NFTPanel count={collections[selectedCollection]?.balance ?? 0} nfts={nfts} />
    </div>
  );
}
