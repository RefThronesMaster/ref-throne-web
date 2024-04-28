import type { AddEthereumChainParameter } from "@web3-react/types";

const ETH: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Ether",
  symbol: "ETH",
  decimals: 18,
};

const TOR: AddEthereumChainParameter["nativeCurrency"] = {
  name: "Tor",
  symbol: "TOR",
  decimals: 18,
};

interface BasicChainInformation {
  urls: string[];
  name: string;
}

interface ExtendedChainInformation extends BasicChainInformation {
  nativeCurrency: AddEthereumChainParameter["nativeCurrency"];
  blockExplorerUrls: AddEthereumChainParameter["blockExplorerUrls"];
}

function isExtendedChainInformation(
  chainInformation: BasicChainInformation | ExtendedChainInformation
): chainInformation is ExtendedChainInformation {
  return !!(chainInformation as ExtendedChainInformation).nativeCurrency;
}

export function getAddChainParameters(
  chainId: number
): AddEthereumChainParameter | number {
  const chainInformation = CHAINS[chainId];
  if (isExtendedChainInformation(chainInformation)) {
    return {
      chainId,
      chainName: chainInformation.name,
      nativeCurrency: chainInformation.nativeCurrency,
      rpcUrls: chainInformation.urls,
      blockExplorerUrls: chainInformation.blockExplorerUrls,
    };
  } else {
    return chainId;
  }
}

type ChainConfig = {
  [chainId: number]: BasicChainInformation | ExtendedChainInformation;
};
export enum CHAIN_IDS {
  BLAST_MAINNET = 81457,
  BLAST_SEPOLIA = 168587773,
}

export const MAINNET_CHAINS: ChainConfig = {
  [CHAIN_IDS.BLAST_MAINNET]: {
    urls: ["https://rpc.blast.io"],
    name: "Blast Mainnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://blastscan.io"],
  },
};

export const TESTNET_CHAINS: ChainConfig = {
  [CHAIN_IDS.BLAST_SEPOLIA]: {
    urls: ["https://sepolia.blast.io"],
    name: "Blast Sepolia Testnet",
    nativeCurrency: ETH,
    blockExplorerUrls: ["https://testnet.blastscan.io"],
  },
};

export const CHAINS: ChainConfig = {
  ...MAINNET_CHAINS,
  ...TESTNET_CHAINS,
};

export const URLS: { [chainId: number]: string[] } = Object.keys(
  CHAINS
).reduce<{ [chainId: number]: string[] }>((accumulator, chainId) => {
  const validURLs: string[] = CHAINS[Number(chainId)].urls;

  if (validURLs.length) {
    accumulator[Number(chainId)] = validURLs;
  }

  return accumulator;
}, {});
