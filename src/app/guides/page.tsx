"use client";

import Image from "next/image";
import { AccountContext } from "@/app/AccountProvider";
import React from "react";

export default function Home() {
  const { accounts, reqAccounts, getPermissions } =
    React.useContext(AccountContext);

  return (
    <div className="mt-10">
      <div className="flex">guides</div>
    </div>
  );
}
