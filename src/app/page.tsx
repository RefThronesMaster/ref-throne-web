"use client";

import Image from "next/image";
import { AccountContext } from "./AccountProvider";
import React, { ChangeEvent } from "react";
import { Button, Input, Search } from "@/common/components";
import { DataTable, DataRowProps } from "@/common/components/DataTable";

const Columns: DataRowProps[] = [
  { field: "throne", displayName: "Throne", value: (row) => row["throne"] },
  {
    field: "service",
    displayName: "Service Type",
    value: (row) => row["service"],
  },
  {
    field: "referrer",
    displayName: "Referrer",
    value: (row) => row["referrer"],
  },
  {
    field: "referral_code",
    displayName: "Referral Code",
    value: (row) => row["referral_code"],
  },
  { field: "benefit", displayName: "Benefit", value: (row) => row["benefit"] },
  {
    field: "price",
    displayName: "Price of the throne",
    value: (row) => row["price"],
  },
  {
    field: "link",
    displayName: "Link [Verified]",
    value: (row) => row["link"],
  },
];

const SampleRecords = [
  {
    throne: "Binance",
    service: "CEX",
    referrer: "0xC2334441231233",
    referral_code: "HBD887JH",
    benefit: "30% discount on fees",
    price: 20000,
    link: "https://hhydasdasdasda.co.kr",
  },
  {
    throne: "OKX",
    service: "CEX",
    referrer: "0x98HASDSADB7D",
    referral_code: "NMO187hJ",
    benefit: "200 USDT",
    price: 15000,
    link: "https://okxd.asssdsd.co.kr",
  },
];

export default function MainPage() {
  const { accounts, reqAccounts, getPermissions } =
    React.useContext(AccountContext);
  const onChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center">
        <Image
          src="/assets/images/concept.png"
          width={650}
          height={360}
          alt="tor_concept"
          className="w-full md:max-w-[320px] lg:max-w-[480px]"
          style={{ objectFit: "cover" }}
        />
        <div className="md:max-w-[calc(100%_-_340px)] lg:max-w-[calc(100%_-_500px)] md:ml-[20px] mt-2 md:mt-0">
          <h2 className="text-lg text-primary chakra-petch-medium">
            Thrones of Referral
          </h2>
          <p className="mt-4 md:mt-6">
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
        <div>
          <Search
            id="search_referral"
            className="mt-2 px-2 py-1 bg-transparent"
            onChange={onChange}
          />
          <DataTable columns={Columns} data={SampleRecords} />
        </div>
      </div>
    </div>
  );
}
