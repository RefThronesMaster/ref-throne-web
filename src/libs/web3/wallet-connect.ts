// import { initializeConnector } from "@web3-react/core";
// import { WalletConnect } from "@web3-react/walletconnect-v2";

// import { Connection, ConnectionType, onConnectionError } from "./connections";
// import { CHAIN_TO_URL_MAP } from "./constants";
// import { CurrentConfig } from "./config";
// const MAINNET_CHAIN_ID = 1;
// const POLYGON_CHAIN_ID = 137;

// export function buildWalletConnectConnector() {
//   const [web3WalletConnect, web3WalletConnectHooks] =
//     initializeConnector<WalletConnect>(
//       (actions) =>
//         new WalletConnect({
//           actions,
//           options: {
//             projectId: '',
//             // rpcMap: {
//             //   [POLYGON_CHAIN_ID]: "",
//             //   [MAINNET_CHAIN_ID]: ''
//             // },
//             showQrModal: true
//           },
//           onError: onConnectionError,
//         })
//     );
//   const walletConnectConnection: Connection = {
//     connector: web3WalletConnect,
//     hooks: web3WalletConnectHooks,
//     type: ConnectionType.WALLET_CONNECT,
//   };
//   return walletConnectConnection;
// }
