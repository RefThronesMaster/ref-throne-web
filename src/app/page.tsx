"use client";

import Image from "next/image";
import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";
import {
  Button,
  Search,
  SwordIcon,
  DataTable,
  DataRowProps,
  Dialog,
  Input,
} from "@/common/components";
import { CHAIN_IDS, getAddChainParameters } from "@/libs/web3/chains";
import { hooks } from "@/libs/web3/connectors/metamask";
import { useWeb3React } from "@web3-react/core";

const SampleRecords: TService[] = [
  {
    service: "Binance",
    serviceType: "CEX",
    referrer: "0xC2334441231233",
    referral_code: "HBD887JH",
    benefit: "30",
    benefitType: "% discount on fees",
    price: 20000,
    link: "https://hhydasdasdasda.co.kr",
  },
  {
    service: "OKX",
    serviceType: "CEX",
    referrer: "0x98HASDSADB7D",
    referral_code: "NMO187hJ",
    benefit: "200",
    benefitType: "USDT",
    price: 15000,
    link: "https://okxd.asssdsd.co.kr",
  },
];

type TService = {
  service: string;
  serviceType: "CEX" | "DEX";
  referrer: string;
  referral_code: string;
  benefit: string;
  benefitType?: string;
  price: number;
  link: string;
};

const {
  useChainId,
  useAccounts,
  useIsActivating,
  useIsActive,
  useProvider,
  useENSNames,
} = hooks;

export default function PageMain() {
  const { connector } = useWeb3React();
  const onChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);
  const chainId = useChainId();

  React.useEffect(() => {
    // web3Client?.eth.
    // console.log(web3Client?.eth.defaultAccount);
  }, []);

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
