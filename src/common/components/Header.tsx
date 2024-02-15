"use client";

import Image from "next/image";
import { AttendIcon, Button } from ".";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  EthTreasuryContract,
  RefThroneContract,
  TORTokenContract,
} from "@/libs/web3/abi";
import { useWeb3React } from "@web3-react/core";
import { hooks, metaMask } from "@/libs/web3/connectors/metamask";
import {
  CHAIN_IDS,
  TESTNET_CHAINS,
  getAddChainParameters,
} from "@/libs/web3/chains";
import Web3, { ContractAbi } from "web3";
import { MyAccountContext } from "@/app/MyAccountProvider";

const MENU = {
  "/referrals": "Referral Thrones",
  "/swap": "TOR Swap",
  "/dashboard": "Dashboard",
  "/guides": "Guides",
  "/gtor": "gTOR Token",
};
const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export const Header = () => {
  const pathname = usePathname();
  const { connector } = useWeb3React();
  const chainId = useChainId();
  const { account, getBalance } = React.useContext(MyAccountContext);

  const signedIn = React.useMemo(() => {
    return CHAIN_IDS.BLAST_SEPOLIA == chainId && account;
  }, [account, chainId]);

  React.useEffect(() => {
    if (account) {
      getBalance().then((balance) => {
        balance && console.log(balance);
      });
    }
  }, [account, getBalance]);

  const handleConnect = React.useCallback(async () => {
    if (!window.ethereum?.isMetaMask) {
      window.open("https://metamask.io/", "_blank");
      return;
    } else {
      if (CHAIN_IDS.BLAST_SEPOLIA == chainId) {
        // const web3 = new Web3(connector.provider);
        // // const contract = new web3.eth.Contract(
        // //   RefThroneContract.ABI,
        // //   RefThroneContract.ADDRESS
        // // );
        // // contract.methods
        // //   .getServiceTypes()
        // //   .call()
        // //   .then((res) => console.log({ getServiceTypes: res }))
        // //   .catch((err) => console.log({ getServiceTypes: err }));
        // // contract.methods
        // //   .getBenefitTypes()
        // //   .call()
        // //   .then((res) => console.log({ getBenefitTypes: res }))
        // //   .catch((err) => console.log({ getBenefitTypes: err }));
        // // contract.methods
        // //   .getAllOwnedThrones()
        // //   .call({})
        // //   .then((res) => console.log({ getAllOwnedThrones: res }))
        // //   .catch((err) => console.log({ getAllOwnedThrones: err }));
        // // contract.methods
        // //   ._totalEthBalance()
        // //   .call()
        // //   .then((res) => console.log({ _totalEthBalance: res }));
        // const contract = new web3.eth.Contract(
        //   EthTreasuryContract.ABI as ContractAbi,
        //   EthTreasuryContract.ADDRESS
        // );

        // contract.methods
        //   ._depositFeeRate()
        //   .call<number>()
        //   .then((res) => {
        //     console.log({ _depositFeeRate: res });
        //   })
        //   .catch((err) => console.log({ _depositFeeRate: err }));
        // contract.methods
        //   ._withdrawFeeRate()
        //   .call()
        //   .then((res) => console.log({ _withdrawFeeRate: res }))
        //   .catch((err) => console.log({ _withdrawFeeRate: err }));
        // const contract = new web3.eth.Contract(
        //   TORTokenContract.ABI,
        //   TORTokenContract.ADDRESS
        // );
        // contract.methods
        //   ._name()
        //   .call()
        //   .then((res) => console.log({ name: res }));
        // contract.methods
        //   ._symbol()
        //   .call()
        //   .then((res) => console.log({ symbol: res }));
        // contract.methods
        //   .totalSupply()
        //   .call()
        //   .then((res) => console.log({ totalSupply: res }));

        if (connector?.deactivate) {
          await connector.deactivate();
        } else {
          await connector.resetState();
        }
        connector?.connectEagerly;
      } else {
        await connector.activate(
          getAddChainParameters(CHAIN_IDS.BLAST_SEPOLIA)
        );
      }
    }
  }, [connector, chainId]);

  // React.useEffect(() => {
  //   if (web3Client) {
  //     const contract = new web3Client.eth.Contract(
  //       ABI,
  //       // "0xDEBFe2b66662AaB932F9Dacb9C76ff047dF4CCa2"
  //       "0xF7a2a089fb174f7e3d283b8d314B099f299324b3"
  //     );
  //     contract.methods
  //       // .getBenefitTypes()
  //       .totalSupply()
  //       .call()
  //       .then((res) => console.log(res))
  //       .catch((err) => console.error(err));
  //   }
  // }, [web3Client]);
  // console.log({ chainId, account, isActive });
  // console.log(accounts);

  // React.useEffect(() => {
  //   if (accounts?.length) {
  //   }
  // }, [accounts]);
  return (
    <nav className="flex flex-wrap items-center justify-between">
      <Image
        alt="header_logo"
        src="/assets/images/tor_logo.png"
        width={200}
        height={72}
        style={{
          objectFit: "cover",
        }}
        priority={true}
      />
      <div className="flex lg:inline-flex items-center justify-between w-full lg:w-fit">
        <div className="lg:inline-block">
          {Object.entries(MENU).map((item) => {
            const [url, title] = item;
            return (
              <Link key={url} href={url}>
                <Button
                  color="text"
                  className={
                    "text-base py-2 lg:py-1 px-6 lg:px-4" +
                    (pathname.includes(url) || pathname == url
                      ? " text-primary"
                      : "")
                  }
                  disabled={!signedIn}
                >
                  {title}
                </Button>
              </Link>
            );
          })}
        </div>

        <Button className="lg:ml-8">
          <AttendIcon className="w-[32px] h-[32px] fill-primary" />
        </Button>
        <Button
          className="lg:ml-4 bg-yellow-300 rounded-sm text-black active:bg-amber-400"
          style={{ width: 180, height: 36 }}
          onClick={handleConnect}
        >
          {chainId == CHAIN_IDS.BLAST_SEPOLIA ? "Disconnect" : "Connect"} Wallet
        </Button>
      </div>
    </nav>
  );
};
