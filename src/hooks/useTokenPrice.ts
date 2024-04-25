import { useEffect, useState } from "react";
import useRefresh from "./useRefresh";
import axios from "axios";
import { isAddress } from "utils/functions";
import { tokens } from "config/tokens";

const useTokenPrice = (address: any, chainId: any) => {
  const { fastRefresh } = useRefresh();
  const [price, setPrice] = useState(0);

  async function fetchPrice() {
    try {
      if (address === "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE") {
        const { data: response } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/qitmeer-network`
        );
        setPrice(response.market_data.current_price.usd);
      } else if (address.toLowerCase() === tokens[813].dim.address.toLowerCase()) setPrice(0);
      else setPrice(1);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (!isAddress(address)) return;
    fetchPrice();
  }, [address, chainId, fastRefresh]);
  return price;
};

export default useTokenPrice;
