import React from "react";
import { WagmiConfig, WagmiConfigProps } from "wagmi";
import { Provider, WebSocketProvider } from "@wagmi/core";

export function WagmiProvider(props: any) {
  return <WagmiConfig client={props.client}>{props.children}</WagmiConfig>;
}
