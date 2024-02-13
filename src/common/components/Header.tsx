"use client";

import Image from "next/image";
import { Button } from ".";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AppContext, AppProvider } from "@/app/AppProvider";
import { ABI } from "@/libs/web3/abi";
import { useWeb3React } from "@web3-react/core";
import { hooks, metaMask } from "@/libs/web3/connectors/metamask";
import {
  CHAIN_IDS,
  TESTNET_CHAINS,
  getAddChainParameters,
} from "@/libs/web3/chains";
import Web3 from "web3";

const MENU = {
  "/": "Referral Thrones",
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
  const accounts = useAccounts();
  const isActivating = useIsActivating();
  const isActive = useIsActive();

  const provider = useProvider();
  const ENSNames = useENSNames(provider);

  console.log({
    chainId,
    accounts,
    isActivating,
    isActive,
    provider,
    ENSNames,
  });

  // React.useEffect(() => {
  //   void metaMask
  //     .connectEagerly()
  //     .then((res) => {
  //       console.log({ res });
  //     })
  //     .catch(() => {
  //       console.debug("Failed to connect eagerly to metamask");
  //     });
  // }, []);

  // console.log({ connector });
  // const { account, connect, disconnect, web3Client } =
  //   React.useContext(AppContext);
  // const { chainId, account, isActive } = useWeb3React();
  // const handleConnect = React.useCallback(() => {
  //   if (account) {
  //     disconnect();
  //   } else {
  //     connect();
  //   }
  // }, [account, connect, disconnect]);

  const handleConnect = React.useCallback(async () => {
    if (CHAIN_IDS.BLAST_SEPOLIA == chainId) {
      // connector.provider
      //   ?.request({ method: "eth_accounts" })
      //   .then((res) => console.log({ res }));
      const web3 = new Web3(connector.provider);
      const contract = new web3.eth.Contract(
        ABI,
        "0x3A9bb1987B486c6C1518879683F84a8da5E73A36"
      );
      contract.methods
        ._totalEthBalance()
        .call()
        .then((res) => console.log(res));
      // connector.provider
      //   ?.request({
      //     method: "totalSupply",
      //     params: {
      //       address: "0xF7a2a089fb174f7e3d283b8d314B099f299324b3",
      //     },
      //   })
      //   .then((res) => console.log({ res }));
      // if (connector?.deactivate) {
      //   await connector.deactivate();
      // } else {
      //   await connector.resetState();
      // }
      // connector?.connectEagerly
      console.log("is available disconnect?");
    } else {
      await connector.activate(getAddChainParameters(CHAIN_IDS.BLAST_SEPOLIA));
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
      <div className="flex lg:inline-block items-center justify-between w-full lg:w-fit">
        <div className="lg:inline-block">
          {Object.entries(MENU).map((item) => {
            const [url, title] = item;
            return (
              <Link key={url} href={url}>
                <Button
                  color="text"
                  className={
                    "text-base py-2 lg:py-1 px-6 lg:px-4" +
                    ((url != "/" && pathname.includes(url)) || pathname == url
                      ? " text-primary"
                      : "")
                  }
                >
                  {title}
                </Button>
              </Link>
            );
          })}
        </div>
        {/* <ConnectionOptions isConnectionActive={isActive} /> */}
        <Button
          className="lg:ml-8 bg-yellow-300 text-black active:bg-amber-400"
          style={{ width: 180, height: 36 }}
          onClick={handleConnect}
        >
          {chainId == CHAIN_IDS.BLAST_SEPOLIA ? "Disconnect" : "Connect"} Wallet
        </Button>
      </div>
    </nav>
  );
};
