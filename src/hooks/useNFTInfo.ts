import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchNFTInfoAsync } from "state/marketplace";
import { useNFTData } from "state/hooks";

const useNFTInfo = (chainId: any, address: any, tokenId: any) => {
  const info = useNFTData(chainId, address, tokenId);

  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(fetchNFTInfoAsync(address, tokenId, chainId));
  }, [address, chainId, tokenId]);

  return info;
};

export default useNFTInfo;
