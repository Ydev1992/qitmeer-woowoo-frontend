import CollectionCard from "./CollectionCard";

export default function CollectionList({
  collections,
  selectedCollection,
  setSelectedCollection,
}: {
  collections: any;
  selectedCollection: any;
  setSelectedCollection: any;
}) {
  return (
    <div className="flex flex-wrap">
      {collections.map((collection: any, i: number) => {
        return (
          <CollectionCard
            key={i}
            collection={collection}
            setSelectedCollection={setSelectedCollection}
            isSelected={selectedCollection === collection.contractAddress}
          />
        );
      })}
    </div>
  );
}
