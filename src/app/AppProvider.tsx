"use client";

import React from "react";

import { Web3ContextProvider } from "@/libs/web3/components/Web3ContextProvider";
import { Connector } from "@web3-react/types";
import {
  ConnectionType,
  PRIORITIZED_CONNECTORS,
  getConnection,
} from "@/libs/web3/connections";
import { Web3ReactProvider } from "@web3-react/core";

interface IAppContext {
  accounts: [];
  // setLoading: (loading: boolean) => void;
  reqAccounts: () => void;
  loadAccounts: () => void;
  getPermissions: () => void;
}

export const AppContext = React.createContext<IAppContext>({
  accounts: [],
  reqAccounts: () => {},
  loadAccounts: () => {},
  getPermissions: () => {},
});

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly();
    } else {
      await connector.activate();
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`);
  }
}

const connectEagerly = async () => {
  await connect(getConnection(ConnectionType.NETWORK).connector);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [accounts, setAccounts] = React.useState<any>([]);

  const reqAccounts = React.useCallback(async () => {
    if (window.ethereum?.isMetaMask) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts);
      } catch (error: any) {
        if (error?.code == 4001) {
          // User rejected request
        }
        console.log(error);
        // setError(error);
      }
    } else {
      console.log("need metamask");
    }
  }, [setAccounts]);

  const getPermissions = React.useCallback(async () => {
    if (window.ethereum?.isMetaMask) {
      try {
        const results = await window.ethereum.request({
          method: "wallet_getPermissions",
        });
        console.log(results);
      } catch (error: any) {
        if (error?.code == 4001) {
          // User rejected request
        }
        console.log(error);
        // setError(error);
      }
    } else {
      console.log("need metamask");
    }
  }, []);

  const loadAccounts = React.useCallback(async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        setAccounts(accounts);
      } catch (error: any) {
        if (error?.code == 4001) {
          // User rejected request
        }
        console.log(error);
        // setError(error);
      }
    }
  }, [setAccounts]);

  React.useEffect(() => {
    window.Buffer = Buffer;
    if (window?.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      console.log("autoRefreshOnNetworkChange off");
    }
    // loadAccounts();
    connectEagerly();
    return () => {};
  }, [loadAccounts]);

  return (
    <AppContext.Provider
      value={{ accounts, reqAccounts, loadAccounts, getPermissions }}
    >
      <Web3ReactProvider
        connectors={Object.values(PRIORITIZED_CONNECTORS).map((connector) => [
          connector.connector,
          connector.hooks,
        ])}
      >
        {children}
      </Web3ReactProvider>
    </AppContext.Provider>
  );
};
