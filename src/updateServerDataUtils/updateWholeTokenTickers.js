import axios from "axios";

export const updateWholeTokenTickers = async () => {
  const response =
    (await axios.post) < any > "/api/updateServerData/tokenTickers";
  return response;
};
