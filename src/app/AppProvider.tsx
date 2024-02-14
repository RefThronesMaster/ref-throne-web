"use client";

import React from "react";
import Web3 from "web3";
import { Web3ReactHooks, useWeb3React } from "@web3-react/core";
import { Web3ReactProvider } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { hooks, metaMask } from "@/libs/web3/connectors/metamask";
import { CHAIN_IDS } from "@/libs/web3/chains";

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, hooks]];

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <MyAccountProvider>{children}</MyAccountProvider>
    </Web3ReactProvider>
  );
};

type TMyAccountContext = {
  account?: string | null;
  web3?: Web3 | null;
  getBalance: () => Promise<number | null>;
};

export const MyAccountContext = React.createContext<TMyAccountContext>({
  account: null,
  getBalance: async () => null,
});

const { useAccounts } = hooks;

export const MyAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connector } = useWeb3React();
  const accounts = useAccounts();
  const defaultAccount = React.useMemo(
    () => (accounts?.length ? accounts[0] : null),
    [accounts]
  );
  const [web3, setWeb3] = React.useState<Web3 | null>(null);

  React.useEffect(() => {}, []);

  const getBalance = React.useCallback(async () => {
    if (!window.ethereum?.isMetaMask) {
      window.open("https://metamask.io/", "_blank");
      return null;
    } else {
      if (connector?.provider) {
        try {
          const web3 = new Web3(connector.provider);
          setWeb3(web3);
          if (defaultAccount) {
            try {
              return Number(
                await web3.eth.getBalance(defaultAccount)
              ).valueOf();
            } catch (err) {
              console.error(err);
              return null;
            }
          }
        } catch (err) {
          console.error(err);
          return null;
        }
      }
      return null;
    }
  }, [connector, defaultAccount]);

  React.useEffect(() => {}, []);

  // if (accounts?.length) {
  //   web3.eth.getBalance(accounts[0]).then((res) => console.log({ res }));
  // }
  return (
    <MyAccountContext.Provider
      value={{ account: defaultAccount, getBalance, web3 }}
    >
      {children}
    </MyAccountContext.Provider>
  );
};
