import { Chain, CurrentConfig } from "./config";

// Chains
// const MAINNET_CHAIN_ID = 1;
const BLAST_MAIN_ID = 1;
const BLAST_SEPOLIA_CHAIN_ID = 168587773;
// const POLYGON_CHAIN_ID = 137;

export const INPUT_CHAIN_ID =
  CurrentConfig.chain === Chain.BLAST_MAINNET ? BLAST_MAIN_ID : BLAST_SEPOLIA_CHAIN_ID;
// export const INPUT_CHAIN_ID =
//   CurrentConfig.chain === Chain.POLYGON ? POLYGON_CHAIN_ID : MAINNET_CHAIN_ID;
export const INPUT_CHAIN_URL =
  CurrentConfig.chain === Chain.BLAST_MAINNET
    ? CurrentConfig.rpc.mainnet
    : CurrentConfig.rpc.testnet;

type TYPE_CHAIN_MAP = {
  [chainId: number]: string | string[];
}

export const CHAIN_TO_URL_MAP: TYPE_CHAIN_MAP = {
  // [POLYGON_CHAIN_ID]: CurrentConfig.rpc.polygon,
  [BLAST_SEPOLIA_CHAIN_ID]: CurrentConfig.rpc.testnet,
  [BLAST_MAIN_ID]: CurrentConfig.rpc.mainnet,
};

type ChainInfo = {
  explorer: string;
  label: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: 18;
  };
  rpcUrl: string;
};

export const CHAIN_INFO: { [key: string]: ChainInfo } = {
  [BLAST_MAIN_ID]: {
    explorer: "https://etherscan.io/",
    label: "Ethereum",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrl: CurrentConfig.rpc.mainnet,
  },
  [BLAST_SEPOLIA_CHAIN_ID]: {
    explorer: "https://testnet.blastscan.io/",
    label: "Blast (Testnet)",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrl: CurrentConfig.rpc.testnet,
  },
  // [POLYGON_CHAIN_ID]: {
  //   explorer: "https://polygonscan.com/",
  //   label: "Polygon",
  //   nativeCurrency: { name: "Polygon Matic", symbol: "MATIC", decimals: 18 },
  //   rpcUrl: CurrentConfig.rpc.polygon,
  // },
};

// URLs
export const METAMASK_URL = "https://metamask.io/";
