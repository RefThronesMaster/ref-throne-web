"use client";

import Image from "next/image";
import { DiscordIcon, GithubIcon, TwitterIcon } from "./common";
import Link from "next/link";

export const Footer = () => {
  return (
    <div className="flex w-full items-end justify-between mt-10">
      <div>
        <Image
          alt="footer_logo"
          src="/assets/images/tor_logo.png"
          width={200}
          height={72}
          // layout="responsive"
          // sizes="(min-width: 800px) 243px,
          // 		 120px"
          style={{
            // height: "auto",
            objectFit: "cover",
          }}
          priority={true}
        />
        <span>©2024 RefThrones. All rights reserved</span>
      </div>
      <div className="flex flex-wrap items-end justify-end">
        <a href="https://github.com/RefThrones" target="_blank">
          <GithubIcon className="w-8 h-8 fill-primary" />
        </a>
        <a href="https://twitter.com/RefThrones" target="_blank">
          <TwitterIcon className="w-8 h-8 fill-primary ml-4" />
        </a>
        <a href="https://discord.com" target="_blank">
          <DiscordIcon className="w-8 h-8 fill-primary ml-4" />
        </a>

        <Image
          src="https://assets-global.website-files.com/65a6baa1a3f8ed336f415cb4/65bc152b599bdd962b5f813c_Built%20on%20Blast%20Logo%20Small%20Dark.svg"
          alt="BUILT ON BLAST SMALL WORDMARK INVERSE"
          className="mt-2 sm:mt-0 ml-4 md:ml-14"
          width={173}
          height={44}
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
};
