"use client";

import React from "react";

import { Web3ContextProvider } from "@/libs/web3/components/Web3ContextProvider";

interface IAccountContext {
  accounts: [];
  // setLoading: (loading: boolean) => void;
  reqAccounts: () => void;
  loadAccounts: () => void;
  getPermissions: () => void;
}

export const AccountContext = React.createContext<IAccountContext>({
  accounts: [],
  reqAccounts: () => {},
  loadAccounts: () => {},
  getPermissions: () => {},
});

export const AccountProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
    loadAccounts();
    return () => {};
  }, [loadAccounts]);

  return (
    <AccountContext.Provider
      value={{ accounts, reqAccounts, loadAccounts, getPermissions }}
    >
      <Web3ContextProvider>{children}</Web3ContextProvider>
    </AccountContext.Provider>
  );
};
