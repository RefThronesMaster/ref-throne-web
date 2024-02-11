"use client";

import Image from "next/image";
import { Button } from ".";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU = {
  "/": "Referral Thrones",
  "/swap": "TOR Swap",
  "/dashboard": "Dashboard",
  "/guides": "Guides",
  "/gtor": "gTOR Token",
};

export const Header = () => {
  const pathname = usePathname();

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
        <Button
          className="lg:ml-8 bg-yellow-300 text-black active:bg-amber-400"
          style={{ width: 180, height: 36 }}
        >
          Connect Wallet
        </Button>
      </div>
    </nav>
  );
};
