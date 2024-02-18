"use client";

import Image from "next/image";
import React from "react";
import { Button } from "@/components/common";
import { CHAIN_IDS, getAddChainParameters } from "@/libs/web3/chains";
import { useWeb3React } from "@web3-react/core";

export default function PageMain() {
  const { connector } = useWeb3React();

  React.useEffect(() => {}, []);
  console.log({ envs: process.env });
  const handleConnect = React.useCallback(async () => {
    if (!window.ethereum?.isMetaMask) {
      window.open("https://metamask.io/", "_blank");
      return;
    } else {
      try {
        await connector.activate(
          getAddChainParameters(CHAIN_IDS.BLAST_SEPOLIA)
        );
      } catch (err) {
        console.log(err);
      }
    }
  }, [connector]);

  return (
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
  );
}
