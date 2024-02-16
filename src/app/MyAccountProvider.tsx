"use client";

import React from "react";
import Web3 from "web3";
import { Web3ReactHooks, useWeb3React } from "@web3-react/core";
import { Web3ReactProvider } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { hooks, metaMask } from "@/libs/web3/connectors/metamask";
import { CHAIN_IDS } from "@/libs/web3/chains";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

const { useAccounts, useChainId } = hooks;

export const MyAccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { connector } = useWeb3React();
  const accounts = useAccounts();
  const chainId = useChainId();
  const defaultAccount = React.useMemo(
    () => (accounts?.length ? accounts[0] : null),
    [accounts]
  );
  const [web3, setWeb3] = React.useState<Web3 | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const signedIn = React.useMemo(() => {
    return CHAIN_IDS.BLAST_SEPOLIA == chainId && defaultAccount;
  }, [defaultAccount, chainId]);

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
              return Number(await web3.eth.getBalance(defaultAccount));
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

  React.useEffect(() => {
    if (signedIn) {
      const query = searchParams.get("p");

      if (query) {
        router.replace(query);
      } else {
        router.replace("/referrals");
      }
    } else {
      if (pathname == "/") {
        router.replace("/");
      } else {
        router.replace(`/?p=${pathname}`);
      }
    }
  }, [signedIn]);

  return (
    <MyAccountContext.Provider
      value={{ account: defaultAccount, getBalance, web3 }}
    >
      {children}
    </MyAccountContext.Provider>
  );
};
