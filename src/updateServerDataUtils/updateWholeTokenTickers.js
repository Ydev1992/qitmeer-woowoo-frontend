import axios from "axios";

export const updateWholeTokenTickers = async () => {
  const response =
    await axios.post("/api/updateServerData/tokenTickers");
  return response;
};
