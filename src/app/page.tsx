"use client";

import Image from "next/image";
import { AccountContext } from "./AccountProvider";
import React from "react";
import { Button } from "@/common/components";

export default function Home() {
  const { accounts, reqAccounts, getPermissions } =
    React.useContext(AccountContext);

  return (
    <div className="mt-10">
      <div className="flex">
        <Image
          src="/assets/images/concept.png"
          width={650}
          height={360}
          alt="tor_concept"
        />
        <div>
          <h2 className="text-lg text-primary chakra-petch-medium">
            Thrones of Referral
          </h2>
          <p className="">
            Only one verified referral code, offering the highest benefits, can
            ascend to the referral throne. Everyone is eligible to conquer the
            throne. Seize the throne and increase your referral income by taking
            it away from others.
          </p>
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg text-primary chakra-petch-medium">
          Referral Codes
        </h2>
      </div>
    </div>
  );
}
