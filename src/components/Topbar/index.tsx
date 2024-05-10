import ConnectButton from "components/ConnectButton";
import SearchInput from "components/SearchInput";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";
import { useAccount, useConnect, useDisconnect, useSigner } from "wagmi";
import { useWeb3React } from "contexts/wagmi";
import { SUPPORTED_CHAIN_IDS } from "config/constants/networks";
import { toast } from "react-toastify";
import axios from "axios";
import { useSwitchNetwork } from "hooks/useSwitchNetwork";
import Notification from "components/Notification";
import Lang from "components/Lang";
import { ProjectContext } from "contexts/ProjectContext";

export default function Topbar() {
  const [criteria, setCriteria] = useState("");
  const { t } = useTranslation();

  const { data: signer } = useSigner();
  const { address: _account } = useAccount();
  const { disconnect } = useDisconnect();
  const { connectors } = useConnect();

  const { chainId } = useWeb3React();
  const { switchNetwork } = useSwitchNetwork();
  const { onConnect, jwtToken } = useContext(ProjectContext);

  const account = signer ? _account : "";

  useEffect(() => {
    if (jwtToken === "#" || account) return;
    if (!SUPPORTED_CHAIN_IDS.includes(chainId)) {
      disconnect();
      try {
        switchNetwork(813);
      } catch (e: any) {
        console.log(e);
        toast(<Notification type={"error"} msg={e.message} />);
      }
    } else onConnect(connectors[0]);
  }, [chainId, jwtToken, account]);

  async function validateAccount(account: any) {
    try {
      await axios.get(`/api/users/${account.toLowerCase()}`);
    } catch (e) {
      await axios.post(
        `/api/users`,
        {
          wallet: account.toLowerCase(),
        },
        { headers: { Authorization: `Bearer ${jwtToken}` } }
      );
      console.log(e);
    }
  }

  useEffect(() => {
    if (account) {
      if (localStorage.getItem("woowow-jwt-token")) validateAccount(account);
    }
  }, [account]);

  return (
    <div className="bg-[#FFFFFF1A] w-full absolute z-[100] ">
      <div className="px-3 relative">
        <div className="absolute w-full h-full left-0 top-0 backdrop-blur" />
        <div className="w-full max-w-[1367px] mx-auto h-16 flex items-center justify-between relative z-10">
          <div className="flex items-center w-full mr-3">
            <Link
              className="font-medium text-[26px] mr-[26px] flex items-center"
              to={"/"}
            >
              <img src={"/logo.png"} alt="logo" className="h-12 mr-4" />
            </Link>
            <SearchInput
              criteria={criteria}
              setCriteria={setCriteria}
              placeholder={t(
                "searchInput.Search NFTs,Collections,Creators or more"
              )}
              className={"flex-1 lg:block hidden"}
              isCategory={true}
            />
            <Link
              to={"/"}
              className="mx-6 text-lg font-semibold lg:block hidden"
            >
              {t("topbar.Marketplace")}
            </Link>

            <Link
              to={"/inscription"}
              className="mx-6 text-lg font-semibold lg:block hidden"
            >
              {t("topbar.Inscription")}
            </Link>
          </div>
          <div className="flex items-center">
            <div className="xs:block hidden lg:mr-6 mr-12">
              <ConnectButton  />
            </div>
            <Lang />
            <Hamburger criteria={criteria} setCriteria={setCriteria} />
          </div>
        </div>
      </div>
    </div>
  );
}
