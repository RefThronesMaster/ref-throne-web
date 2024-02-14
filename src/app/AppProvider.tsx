"use client";

import { ABI } from "@/libs/web3/abi";
import React from "react";
import Web3 from "web3";

// import { Web3ContextProvider } from "@/libs/web3/components/Web3ContextProvider";
// import { Connector } from "@web3-react/types";
// import {
//   ConnectionType,
//   PRIORITIZED_CONNECTORS,
//   getConnection,
// } from "@/libs/web3/connections";
// import { Web3ReactProvider } from "@web3-react/core";
import { Web3ReactHooks } from "@web3-react/core";
import { Web3ReactProvider } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
// import { Web3ContextProvider } from "@/libs/web3/components/Web3ContextProvider";
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

  return (
    <Web3ReactProvider connectors={connectors}>{children}</Web3ReactProvider>
  );
};
// export const AppProvider = ({ children }: { children: React.ReactNode }) => {
//   const [web3Client, setWeb3Client] = React.useState<Web3 | null>(null);
//   const [account, setAccount] = React.useState<string | null>(null);

//   const connect = React.useCallback(async () => {
//     if (window?.ethereum) {
//       const web3 = new Web3({
//         // wallet,
//       });
//       try {
//         const accounts = await web3.eth.getAccounts();
//         web3.eth.defaultCommon = {
//           customChain: {
//             name: "blaset-testnet",
//             chainId: 168587773,
//             networkId: 1,
//           },
//         };
//         if (accounts.length > 0) {
//           setAccount(accounts[0]);
//           setWeb3Client(web3);
//         }
//       } catch (err) {
//         console.log(err);
//         setAccount(null);
//         setWeb3Client(null);
//       }
//     }
//   }, []);

//   const disconnect = React.useCallback(() => {
//     setWeb3Client(null);
//     setAccount(null);
//   }, []);

//   React.useEffect(() => {
//     window.Buffer = Buffer;
//     connect();
//     // connectEagerly();
//     return () => {};
//   }, [connect]);

//   // console.log(account);

//   React.useEffect(() => {}, [web3Client]);

//   return (
//     <AppContext.Provider value={{ web3Client, account, connect, disconnect }}>
//       {children}
//     </AppContext.Provider>
//   );
// };
