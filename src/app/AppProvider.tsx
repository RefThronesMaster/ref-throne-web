"use client";

import React from "react";
import Web3 from "web3";
import { Web3ReactHooks } from "@web3-react/core";
import { Web3ReactProvider } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { hooks, metaMask } from "@/libs/web3/connectors/metamask";

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, hooks]];

interface IAppContext {
  web3Client: Web3 | null;
  account: string | null;
  connect: () => void;
  disconnect: () => void;
}

export const AppContext = React.createContext<IAppContext>({
  web3Client: null,
  account: null,
  connect: () => {},
  disconnect: () => {},
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {}, []);

  // if (accounts?.length) {
  //   web3.eth.getBalance(accounts[0]).then((res) => console.log({ res }));
  // }
  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
};
