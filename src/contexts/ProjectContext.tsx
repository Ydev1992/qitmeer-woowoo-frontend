import axios from "axios";
import { ethers } from "ethers";
import { isArray } from "lodash";
import React, { useEffect, useState } from "react";
import { SiweMessage } from "siwe";
import { useConnect, useDisconnect } from "wagmi";

const ProjectContext = React.createContext({
  pending: false,
  setPending: () => {
    ("");
  },
  records: [] as any[],
  onRecords: (() => {
    ("");
  }) as any,
  lang: "en",
  onLang: (() => {
    ("");
  }) as any,
  jwtToken: "",
  setJWTToken: (() => {
    ("");
  }) as any,
  onConnect: (() => {
    ("");
  }) as any,
});

// This context maintain 2 counters that can be used as a dependencies on other hooks to force a periodic refresh
let mmPending = false;

const ProjectContextProvider = ({ children }: any) => {
  const [pending, setPending]: any = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [lang, setLang] = useState("en");
  const [jwtToken, _setJWTToken] = useState("#");

  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  async function onConnect(connector: any) {
    if (mmPending) return;
    mmPending = true;
    try {
      connect({ connector });
      if (jwtToken) {
        try {
          const { data: result }: any = await axios.post(
            "/api/auth/login",
            null,
            {
              headers: { Authorization: `Bearer ${jwtToken}` },
            }
          );
          if (result?.success) {
            mmPending = false;
            return;
          }
        } catch (e) {
          console.log(e);
        }
      }
      const options = { method: "POST" };
      const url = "/api/auth/challenge";
      const { nonce } = await fetch(url, options).then((res) => res.json());
      const [account] = await (window.ethereum as any).request({
        method: "eth_requestAccounts",
      });
      const address = ethers.utils.getAddress(account);
      const rawMessage = new SiweMessage({
        domain: window.location.host,
        address: address,
        statement: "Sign in with Qitmeer network to the Woowow.",
        uri: window.location.origin,
        version: "1",
        chainId: 813,
        nonce,
      });

      const message = rawMessage.prepareMessage();
      const signature = await (window.ethereum as any).request({
        method: "personal_sign",
        params: [message, address],
      });
      console.log("signature", signature);
      console.log("message", rawMessage);
      console.log({
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-forwarded-proto": window.location.origin,
        "x-forwarded-host": window.location.host,
      });

      const result = await fetch("/api/auth/login-siwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-forwarded-proto": window.location.origin,
          "x-forwarded-host": window.location.host,
        },
        body: JSON.stringify({ message, signature }),
      }).then((res) => res.json());

      if (result?.access_token) {
        setJWTToken(result.access_token);
      } else {
        disconnect();
      }
    } catch (e) {
      console.log(e);
      disconnect();
    }
    mmPending = false;
  }

  const getRecords = () => {
    try {
      let _records: any = localStorage.getItem(`swap-records`);
      _records = JSON.parse(_records);
      setRecords(isArray(_records) ? _records : []);
    } catch (error) {
      console.log(error);
    }
  };

  const onRecords = (nft: any, type: number) => {
    let _records: any = localStorage.getItem(`swap-records`);
    _records = JSON.parse(_records);
    _records = isArray(_records) ? _records : [];
    if (type === 1) {
      const index = _records.findIndex(
        (record: any) =>
          record.address === nft.address &&
          record.chainId === nft.chainId &&
          record.tokenId === nft.tokenId
      );
      if (index !== -1) return;
      localStorage.setItem(`swap-records`, JSON.stringify([..._records, nft]));
    }
    if (type === 2) {
      const temp: any = [..._records];
      const index = _records.findIndex(
        (record: any) =>
          record.address === nft.address &&
          record.chainId === nft.chainId &&
          record.tokenId === nft.tokenId
      );
      temp.splice(index, 1);
      localStorage.setItem(`swap-records`, JSON.stringify(temp));
    }
    getRecords();
  };

  const getLang = () => {
    const _lang = localStorage.getItem(`woowow-lang`);
    setLang(_lang ?? "en");
  };

  const onLang = (_lang: string) => {
    localStorage.setItem("woowow-lang", _lang);
    getLang();
  };

  const getJWTToken = () => {
    const token = localStorage.getItem("woowow-jwt-token");
    _setJWTToken(token as string);
  };

  const setJWTToken = (token: string) => {
    localStorage.setItem("woowow-jwt-token", token);
    _setJWTToken(token);
  };
  useEffect(() => {
    getRecords();
    getLang();
    getJWTToken();
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        pending,
        setPending,
        onRecords,
        records,
        lang,
        onLang,
        jwtToken,
        setJWTToken,
        onConnect,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectContextProvider };
