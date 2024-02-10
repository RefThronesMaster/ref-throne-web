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
    <nav className="flex items-center justify-between">
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
      <span>
        {Object.entries(MENU).map((item) => {
          const [url, title] = item;
          return (
            <Link key={url} href={url}>
              <Button
                color="text"
                text={title}
                className={
                  (url != "/" && pathname.includes(url)) || pathname == url
                    ? "text-primary"
                    : ""
                }
              />
            </Link>
          );
        })}
        <Button
          color="primary"
          text={"Connect Wallet"}
          style={{ width: 180, height: 36 }}
        />
      </span>
    </nav>
  );
};
