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
  OwnerGroupContract,
  RefThroneContract,
  RefThroneTypesContract,
  TORTokenContract,
  UserContract,
  UserHistoryContract,
} from "@/libs/web3/contracts";
import Image from "next/image";
import { Footer, Header } from "@/components";
import { Button } from "@/components/common";
import { MyDialogProvider } from "./MyDialogProvider";

const connectors: [MetaMask, Web3ReactHooks][] = [[metaMask, hooks]];

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Web3ReactProvider connectors={connectors}>
      <Suspense>
        <MyWeb3Provider>{children}</MyWeb3Provider>
      </Suspense>
    </Web3ReactProvider>
  );
};

type TMyWeb3Context = {
  account?: string | null;
  web3?: Web3 | null;
  getBalance: () => Promise<string>;
  contracts: {
    OwnerGroup: Contract<ContractAbi> | null;
    RefThrone: Contract<ContractAbi> | null;
    RefThroneTypes: Contract<ContractAbi> | null;
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
  updateTs: (value?: string | number) => void;
  ts?: string | number;
};

export const MyWeb3Context = React.createContext<TMyWeb3Context>({
  account: null,
  getBalance: async () => "0",
  contracts: {
    OwnerGroup: null,
    RefThrone: null,
    RefThroneTypes: null,
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
  updateTs: (value?: string | number) => {},
  ts: undefined,
});

const { useAccounts, useChainId } = hooks;

export const MyWeb3Provider = ({ children }: { children: React.ReactNode }) => {
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

  const [ts, setTs] = React.useState<string | number>();

  const updateTs = React.useCallback(
    (value?: string | number) => {
      setTs(value);
    },
    [setTs]
  );

  const signedIn = React.useMemo(() => {
    return (
      (CHAIN_IDS.BLAST_SEPOLIA == chainId ||
        CHAIN_IDS.BLAST_MAINNET == chainId) &&
      defaultAccount
    );
  }, [defaultAccount, chainId]);

  React.useEffect(() => {
    if (!window.ethereum?.isMetaMask) {
      window.open("https://metamask.io/", "_blank");
    } else {
      if (connector?.provider) {
        try {
          setWeb3(new Web3(connector.provider));
        } catch (err) {
          console.error(err);
        }
      }
    }
  }, [connector?.provider]);

  const getBalance = React.useCallback(async () => {
    if (web3 && defaultAccount) {
      try {
        return (await web3.eth.getBalance(defaultAccount)).toString();
      } catch (err) {
        console.error(err);
        return "0";
      }
    }
    return "0";
  }, [web3, defaultAccount]);

  const contractOwnerGroup = React.useMemo(() => {
    if (web3) {
      console.log({ ownerGroupContract: OwnerGroupContract.ADDRESS });
      return new web3.eth.Contract(
        OwnerGroupContract.ABI,
        OwnerGroupContract.ADDRESS
      );
    }
    return null;
  }, [web3]);

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

  const contractRefThroneTypes = React.useMemo(() => {
    if (web3) {
      console.log({ refThroneTypesContract: RefThroneTypesContract.ADDRESS });
      return new web3.eth.Contract(
        RefThroneTypesContract.ABI,
        RefThroneTypesContract.ADDRESS
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
    <MyWeb3Context.Provider
      value={{
        account: defaultAccount,
        getBalance,
        web3,
        contracts: {
          OwnerGroup: contractOwnerGroup,
          EthTreasury: contractEthTreasury,
          TORToken: contractTORToken,
          RefThrone: contractRefThrone,
          RefThroneTypes: contractRefThroneTypes,
          UserHistory: contractUserHistory,
          User: contractUser,
        },
        utils: {
          toWei,
          fromWei,
          toBN,
        },
        updateTs,
        ts,
      }}
    >
      <MyDialogProvider>
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
      </MyDialogProvider>
    </MyWeb3Context.Provider>
  );
};
