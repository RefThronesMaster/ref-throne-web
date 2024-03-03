"use client";

import React, { Suspense } from "react";
import Web3, {
  BaseWeb3Error,
  Contract,
  ContractAbi,
  RpcError,
  Web3ContractError,
  Web3WSProviderError,
} from "web3";
import { Web3ReactHooks, useWeb3React } from "@web3-react/core";
import { Web3ReactProvider } from "@web3-react/core";
import type { MetaMask } from "@web3-react/metamask";
import { hooks, metaMask } from "@/libs/web3/connectors/metamask";
import { CHAIN_IDS, getAddChainParameters } from "@/libs/web3/chains";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  EthTreasuryContract,
  RefThroneContract,
  TORTokenContract,
  UserContract,
  UserHistoryContract,
} from "@/libs/web3/contracts";
import Image from "next/image";
import { Footer, Header } from "@/components";
import { Button } from "@/components/common";

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, hooks]];

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Suspense>
        <MyAccountProvider>{children}</MyAccountProvider>
      </Suspense>
    </Web3ReactProvider>
  );
};

type TMyAccountContext = {
  account?: string | null;
  web3?: Web3 | null;
  getBalance: () => Promise<string>;
  contracts: {
    RefThrone: Contract<ContractAbi> | null;
    TORToken: Contract<ContractAbi> | null;
    EthTreasury: Contract<ContractAbi> | null;
    UserHistory: Contract<ContractAbi> | null;
    User: Contract<ContractAbi> | null;
  };
  utils: {
    fromWei: (value: string | number) => string;
    toWei: (value: string | number) => string;
    toBN: (value: string | number) => bigint;
  };
};

export const MyAccountContext = React.createContext<TMyAccountContext>({
  account: null,
  getBalance: async () => "0",
  contracts: {
    RefThrone: null,
    TORToken: null,
    EthTreasury: null,
    UserHistory: null,
    User: null,
  },
  utils: {
    fromWei: (value: string | number) => "0",
    toWei: (value: string | number) => "0",
    toBN: (value: string | number) => BigInt(0),
  },
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
      return "0";
    } else {
      if (connector?.provider) {
        try {
          const web3 = new Web3(connector.provider);
          setWeb3(web3);
          if (defaultAccount) {
            try {
              return (await web3.eth.getBalance(defaultAccount)).toString();
            } catch (err) {
              console.error(err);
              return "0";
            }
          }
        } catch (err) {
          console.error(err);
          return "0";
        }
      }
      return "0";
    }
  }, [connector, defaultAccount]);

  const contractRefThrone = React.useMemo(() => {
    if (web3) {
      console.log({ refThroneContract: RefThroneContract.ADDRESS });
      return new web3.eth.Contract(
        RefThroneContract.ABI,
        RefThroneContract.ADDRESS
      );
    }
    return null;
  }, [web3]);

  const contractEthTreasury = React.useMemo(() => {
    if (web3) {
      console.log({ ethTreasuryContract: EthTreasuryContract.ADDRESS });
      return new web3.eth.Contract(
        EthTreasuryContract.ABI,
        EthTreasuryContract.ADDRESS
      );
    }
    return null;
  }, [web3]);

  const contractTORToken = React.useMemo(() => {
    if (web3) {
      console.log({ torTokenContract: TORTokenContract.ADDRESS });
      return new web3.eth.Contract(
        TORTokenContract.ABI,
        TORTokenContract.ADDRESS
      );
    }
    return null;
  }, [web3]);

  const contractUserHistory = React.useMemo(() => {
    if (web3) {
      console.log({ userHistoryContract: UserHistoryContract.ADDRESS });
      return new web3.eth.Contract(
        UserHistoryContract.ABI,
        UserHistoryContract.ADDRESS
      );
    }
    return null;
  }, [web3]);

  const contractUser = React.useMemo(() => {
    if (web3) {
      console.log({ userContract: UserContract.ADDRESS });
      return new web3.eth.Contract(UserContract.ABI, UserContract.ADDRESS);
    }
    return null;
  }, [web3]);

  // React.useEffect(() => {
  //   if (signedIn) {
  //     // const lastPage = searchParams.get("p");

  //   //   if (lastPage) {
  //   //     router.replace(`/${lastPage}`);
  //   //   } else {
  //   //     router.replace("/referrals");
  //   //   }
  //   // } else {
  //   //   if (
  //   //     pathname.startsWith("/referrals") ||
  //   //     pathname.startsWith("/dashboard") ||
  //   //     pathname.startsWith("/swap")
  //   //   ) {
  //   //     router.replace("/");
  //   //   }
  //     // if (pathname == "/") {
  //     //   router.replace("/");
  //     // } else {
  //     //   router.replace(`/?p=${pathname.substring(1)}`);
  //     // }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [signedIn]);

  const toWei = React.useCallback(
    (value: string | number) => {
      try {
        if (web3) {
          const wei = web3.utils.toWei(value, "ether");
          return wei;
        }
      } catch (err) {
        // console.log(err);
      }
      return "";
    },
    [web3]
  );

  const fromWei = React.useCallback(
    (value: string | number) => {
      try {
        if (web3) {
          return web3.utils.fromWei(value, "ether");
        }
      } catch (err) {
        // console.log(err);
      }
      return "";
    },
    [web3]
  );

  const toBN = React.useCallback(
    (value: string | number) => {
      try {
        if (web3) {
          return web3.utils.toBigInt(value);
        }
      } catch (err) {
        // console.log(err);
      }
      return BigInt(0);
    },
    [web3]
  );

  const handleConnect = React.useCallback(async () => {
    if (!window.ethereum?.isMetaMask) {
      window.open("https://metamask.io/", "_blank");
      return;
    } else {
      const actId = getAddChainParameters(CHAIN_IDS.BLAST_SEPOLIA);
      try {
        await connector.activate(actId);
      } catch (err: any) {
        connector.deactivate && connector.deactivate(actId);
        if (err.code == -32002) {
          connector.provider?.request({
            method: "wallet_requestPermissions",
            params: [{ eth_accounts: {} }],
          });
        }
      }
    }
  }, [connector]);

  return (
    <MyAccountContext.Provider
      value={{
        account: defaultAccount,
        getBalance,
        web3,
        contracts: {
          EthTreasury: contractEthTreasury,
          TORToken: contractTORToken,
          RefThrone: contractRefThrone,
          UserHistory: contractUserHistory,
          User: contractUser,
        },
        utils: {
          toWei,
          fromWei,
          toBN,
        },
      }}
    >
      <>
        <Header />
        {signedIn ? (
          children
        ) : (
          <>
            <div className="mt-10">
              <div className="flex items-center justify-center">
                <Image
                  src="/assets/images/concept.png"
                  width={650}
                  height={360}
                  alt="tor_concept"
                  className="w-full md:max-w-[480px] lg:max-w-[640px]"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <div className="mt-6 text-center">
                <h2 className="text-lg text-primary chakra-petch-medium">
                  Connect your wallet and get the best Referral Codes!
                </h2>

                <Button
                  className="mt-6 lg:ml-4 bg-yellow-300 rounded-sm text-black active:bg-amber-400 w-[180px] h-[36px] text-sm font-bold"
                  onClick={handleConnect}
                >
                  Connect Wallet
                </Button>
              </div>
            </div>
          </>
        )}
        <Footer />
      </>
    </MyAccountContext.Provider>
  );
};
