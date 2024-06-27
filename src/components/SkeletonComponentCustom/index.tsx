import Skeleton from "react-loading-skeleton";

export const SkeletonComponent = ({
  className = "",
  count = 1,
}: {
  className?: string;
  count?: number;
}) => {
  return new Array(count)
    .fill("")
    .map((data, i) => (
      <Skeleton
        baseColor={"#3e3e3e"}
        highlightColor={"#686363"}
        className={className}
        key={i}
      />
    ));
};
