import Notification from "components/Notification";
import { ConnectorNames } from "config/constants/wallets";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useAccount, useSwitchNetwork as useSwitchNetworkWallet } from "wagmi";

export function useSwitchNetworkLocal() {
  return useCallback((chainId: number) => {
    // window.location.reload();
  }, []);
}

export function useSwitchNetwork() {
  const [loading, setLoading] = useState(false);
  const {
    switchNetworkAsync: _switchNetworkAsync,
    isLoading: _isLoading,
    switchNetwork: _switchNetwork,
    ...switchNetworkArgs
  } = useSwitchNetworkWallet();

  const { isConnected, connector } = useAccount();

  const switchNetworkLocal = useSwitchNetworkLocal();
  const isLoading = _isLoading || loading;

  const switchNetworkAsync = useCallback(
    async (chainId: number) => {
      if (isConnected && typeof _switchNetworkAsync === "function") {
        if (isLoading) return;
        setLoading(true);
        return _switchNetworkAsync(chainId)
          .then((c) => {
            // well token pocket
            if (window.ethereum?.isTokenPocket === true) {
              switchNetworkLocal(chainId);
              window.location.reload();
            }
            return c;
          })
          .catch(() => {
            // TODO: review the error
            toast(
              <Notification
                type={"error"}
                msg="Error connecting, please retry and confirm in wallet!"
              />
            );
          })
          .finally(() => setLoading(false));
      }
      return new Promise(() => {
        switchNetworkLocal(chainId);
      });
    },
    [isConnected, _switchNetworkAsync, isLoading, setLoading, switchNetworkLocal]
  );

  const switchNetwork = useCallback(
    (chainId: number) => {
      if (isConnected && typeof _switchNetwork === "function") {
        return _switchNetwork(chainId);
      }
      return switchNetworkLocal(chainId);
    },
    [_switchNetwork, isConnected, switchNetworkLocal]
  );

  const canSwitch = useMemo(
    () =>
      isConnected
        ? !!_switchNetworkAsync &&
          connector?.id !== ConnectorNames.WalletConnect &&
          !(typeof window !== "undefined" && window.ethereum?.isMathWallet)
        : true,
    [_switchNetworkAsync, isConnected, connector]
  );

  return {
    ...switchNetworkArgs,
    switchNetwork,
    switchNetworkAsync,
    isLoading,
    canSwitch,
  };
}
