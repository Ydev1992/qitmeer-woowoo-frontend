import { useContext } from "react";
import { RefreshContext } from "../contexts/RefreshContext";

const useRefresh = () => {
  const { fast, slow, low, sfast } = useContext(RefreshContext);
  return { fastRefresh: fast, slowRefresh: slow, lowRefresh: low, secondRefresh: sfast };
};

export default useRefresh;
