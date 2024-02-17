"use client";

import React from "react";
import { DataRowProps, DataTable, Dialog } from "@/common/components";
import Image from "next/image";

const SampleLeadersRecords = [
  {
    tier: "Diamond",
    rank: 1,
    user: "0xC2334441231233",
    owned_thrones: 10,
    deposited_eth: 32,
    referrals: 32,
    points: 32,
  },
  {
    tier: "Platinum",
    rank: 11,
    user: "0x98HASDSADB7D",
    owned_thrones: 13,
    deposited_eth: 21,
    referrals: 21,
    points: 21,
  },
  {
    tier: "Gold",
    rank: 31,
    user: "0x2E123123DD",
    owned_thrones: 4,
    deposited_eth: 15,
    referrals: 15,
    points: 15,
  },
];
const SampleMyReferralsRecords = [
  {
    throne: "Binance",
    service: "CEX",
    referrer: "0xC2334441231233",
    referral_code: "HBD887JH",
    benefit: "30% discount on fees",
    price: 20000,
    link: "https://hhydasdasdasda.co.kr",
    date: 1707621971608,
    status: "active",
  },
  {
    throne: "OKX",
    service: "CEX",
    referrer: "0x98HASDSADB7D",
    referral_code: "NMO187hJ",
    benefit: "200 USDT",
    price: 15000,
    link: "https://okxd.asssdsd.co.kr",
    date: 1707601971608,
    status: "active",
  },
];

export default function PageDashboard() {
  // const { web3Client } = React.useContext(AppContext);

  const ColumnsLeaders: DataRowProps[] = React.useMemo(
    () => [
      { field: "tier", displayName: "Tier", value: (row) => row["tier"] },
      {
        field: "rank",
        displayName: "Rank",
        value: (row) => row["rank"],
      },
      {
        field: "user",
        displayName: "User",
        value: (row) => row["user"],
      },
      {
        field: "owned_thrones",
        displayName: "Owned Thrones",
        value: (row) => row["owned_thrones"],
      },
      {
        field: "deposited_eth",
        displayName: "Deposited ETH",
        value: (row) => row["deposited_eth"],
      },
      {
        field: "referrals",
        displayName: "Referrals",
        value: (row) => row["referrals"],
      },
      {
        field: "points",
        displayName: "Points",
        value: (row) => row["points"],
      },
    ],
    []
  );

  const ColumnsMyReferrals: DataRowProps[] = React.useMemo(
    () => [
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
      {
        field: "benefit",
        displayName: "Benefit",
        value: (row) => row["benefit"],
      },
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
      {
        field: "date",
        displayName: "Date",
        value: (row) => new Date(row["date"]).toUTCString(),
      },
      {
        field: "status",
        displayName: "Status",
        value: (row) => row["status"],
      },
    ],
    []
  );
  return (
    <div className="mt-10 w-full">
      <div className="flex flex-wrap justify-center md:justify-between">
        <PanelTitle
          name={"Total ETH Deposited"}
          result={"0.00 ETH"}
          className="w-full max-w-[90%] md:w-1/6 md:max-w-[170px]"
        />
        <PanelTitle
          name={"Total TOR Supply"}
          result={"0.00 TOR"}
          className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
        />
        <PanelTitle
          name={"Total Users"}
          result={0}
          className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
        />
        <PanelTitle
          name={"Total Reward Points"}
          result={0}
          className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
        />
        <PanelTitle
          name={"Total Referral Thrones"}
          result={0}
          className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
        />
      </div>
      <div className="mt-6">
        <h2 className="text-lg text-primary chakra-petch-bold">
          Reward Points Leaderboard
        </h2>
        <div>
          <DataTable columns={ColumnsLeaders} data={SampleLeadersRecords} />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg text-primary chakra-petch-bold">My Dashboard</h2>
        <div className="mt-4 flex flex-wrap justify-center md:justify-between">
          <PanelTitle
            name={"My Deposited ETH"}
            result={"0.00 ETH"}
            className="w-full max-w-[90%] md:w-1/6 md:max-w-[170px]"
          />
          <PanelTitle
            name={"My TOR"}
            result={"0.00 TOR"}
            className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
          />
          <PanelTitle
            name={"My Invitees"}
            result={0}
            className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
          />
          <PanelTitle
            name={
              <div>
                <p>My Reward Points</p>
                <p>(Realtime Estimated)</p>
              </div>
            }
            result={0}
            className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
          />
          <PanelTitle
            name={"My Tier"}
            result={"Stone"}
            className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
          />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg text-primary chakra-petch-bold">
          My Referral Thrones
        </h2>
              <div className="flex items-center justify-center">
                  <Image
                      src="/assets/images/mythrones.png"
                      width={1439}
                      height={331}
                      alt="tor_concept"
                      className="w-full"
                      style={{ objectFit: "contain" }}
                  />
              </div>
        {/*<div>*/}
        {/*  <DataTable*/}
        {/*    columns={ColumnsMyReferrals}*/}
        {/*    data={SampleMyReferralsRecords}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

type TitleProps = {
  name: string | React.ReactNode;
  result: string | number;
  className?: string;
};

const PanelTitle = ({ name, result, className }: TitleProps) => {
  return (
    <div
      className={
        "rounded-md p-2 flex flex-col items-center bg-camo-500 text-white" +
        (className ? ` ${className}` : "")
      }
    >
      <div className="flex items-center text-center min-h-[50px]">{name}</div>
      <p className="py-3">{result}</p>
    </div>
  );
};

// type ModalProps = {
//   open: boolean;
// };

// export const UsurpReferralModal = ({ open }: ModalProps) => {
//   return <Dialog title={"Usurp the Referral Throne"}>asdsadad</Dialog>;
// };
