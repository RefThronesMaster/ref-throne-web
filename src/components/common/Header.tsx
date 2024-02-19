"use client";

import Image from "next/image";
import { AttendIcon, Button } from ".";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { useWeb3React } from "@web3-react/core";
import { hooks } from "@/libs/web3/connectors/metamask";
import { CHAIN_IDS, getAddChainParameters } from "@/libs/web3/chains";
import { MyAccountContext } from "@/app/MyAccountProvider";

const MENU = {
  "/referrals": "Referral Thrones",
  "/swap": "TOR Swap",
  "/dashboard": "My Dashboard",
  "/guides": "Guides",
  "/torg": "TORG Token",
};
const { useChainId } = hooks;

export const Header = () => {
  const pathname = usePathname();
  const { connector } = useWeb3React();
  const chainId = useChainId();
  const { account, getBalance, contracts } = React.useContext(MyAccountContext);

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

  const handleDailyCheck = React.useCallback(() => {}, [contracts.UserHistory]);

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
            if (url == "/guides") {
              return (
                <Link
                  key={url}
                  href={"https://docs.refthrones.click/"}
                  target="_blank"
                >
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
            } else if (url == "/torg") {
              return (
                <Link
                  key={url}
                  href={
                    "https://docs.refthrones.click/7.-governance-token-tentatively-torg"
                  }
                  target="_blank"
                >
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
            }
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

        <Button
          className="lg:ml-8"
          disabled={!signedIn}
          onClick={handleDailyCheck}
        >
          <AttendIcon className="w-[32px] h-[32px] fill-primary" />
        </Button>
        <Button
          className={
            "lg:ml-4 bg-yello-300 rounded-sm text-black active:bg-amber-400 w-[180px] h-[36px] text-sm font-bold"
          }
          onClick={handleConnect}
        >
          {signedIn
            ? `${account?.substring(0, 8)}...${account?.substring(
                account?.length - 4
              )}`
            : "Connect Wallet"}
        </Button>
      </div>
    </nav>
  );
};
