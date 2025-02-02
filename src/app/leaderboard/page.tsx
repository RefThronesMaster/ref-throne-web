"use client";

import React from "react";
import { DataRowProps, DataTable, SORT } from "@/components/common";

import { MyWeb3Context } from "../MyWeb3Provider";
import { TRank } from "@/components";

const TotalInfo = () => {
  const [totalEthDeposited, setTotalEthDeposited] = React.useState<string>("-");
  const [totalTorSupplied, setTotalTorSupplied] = React.useState<string>("-");
  const [totalRewards, setTotalRewards] = React.useState<string>("-");
  const [totalThrones, setTotalThrones] = React.useState<string>("-");

  const { contracts, utils, account } = React.useContext(MyWeb3Context);

  const getTotalEthBalance = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.EthTreasury?.methods
          ._totalEthBalance(account)
          .call<bigint>();

        if (result) {
          setTotalEthDeposited(
            Number(utils.fromWei(result?.toString())).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 3,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [contracts.EthTreasury, utils]);

  const getTotalTorSupplied = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.EthTreasury?.methods
          ._totalTorBalance(account)
          .call<bigint>();

        if (result) {
          setTotalTorSupplied(
            Number(utils.fromWei(result?.toString())).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 3,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [contracts.EthTreasury, utils, account]);

  const getTotalRewards = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.UserHistory?.methods
          .getTotalPoints()
          .call<bigint>();

        if (result) {
          setTotalRewards(
            Number(utils.fromWei(result?.toString())).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 3,
            })
          );
        }
      } catch (err) {
        console.log(err);
        setTotalRewards("-");
      }
    }
  }, [contracts.UserHistory, utils, account]);

  const getTotalThrones = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.RefThrone?.methods
          .getOwnedThroneCount()
          .call<bigint>();

        setTotalThrones(
          Number(utils.fromWei(result!.toString())).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          })
        );
      } catch (err) {
        console.log(err);
        setTotalThrones("-");
      }
    }
  }, [contracts.RefThrone, utils, account]);

  React.useEffect(() => {
    getTotalEthBalance();
    getTotalTorSupplied();
    getTotalRewards();
    getTotalThrones();
  }, [contracts.EthTreasury]);

  return (
    <>
      <PanelTitle
        name={"Total ETH Deposited"}
        result={`${totalEthDeposited} ETH`}
        className="w-full max-w-[90%] md:w-1/5 md:max-w-[250px]"
      />
      <PanelTitle
        name={"Total TOR Supply"}
        result={`${totalTorSupplied} TOR`}
        className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/5 md:max-w-[250px]"
      />
      <PanelTitle
        name={"Total Reward Points"}
        result={totalRewards}
        className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/5 md:max-w-[250px]"
      />
      <PanelTitle
        name={"Total Referral Thrones"}
        result={totalThrones}
        className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/5 md:max-w-[250px]"
      />
    </>
  );
};

const defaultRewardSort: SORT = {
  field: "rank",
  order: "ASC",
};

type TRewardPoint = {
  tier: string;
  rank: BigInt;
  user: string;
  ownedThrone: BigInt;
  depositedEth: BigInt;
  invitees: BigInt;
  points: BigInt;
};

const RewardPoints = () => {
  const { contracts, utils, account } = React.useContext(MyWeb3Context);
  const [sort, setSort] = React.useState<SORT>(defaultRewardSort);

  const [data, setData] = React.useState<TRank[]>([]);

  // TODO: 임시 데이터를 실제 데이터로 할당
  // const [data, setData] = React.useState<TRewardPoint[]>([
  //   {
  //     tier: "Diamond",
  //     rank: BigInt(1),
  //     user: "0x0000ff",
  //     ownedThrone: BigInt(10),
  //     depositedEth: BigInt(32),
  //     invitees: BigInt(32),
  //     points: BigInt(32),
  //   },
  //   {
  //     tier: "Platinum",
  //     rank: BigInt(11),
  //     user: "0x0003ff",
  //     ownedThrone: BigInt(13),
  //     depositedEth: BigInt(21),
  //     invitees: BigInt(21),
  //     points: BigInt(21),
  //   },
  //   {
  //     tier: "Gold",
  //     rank: BigInt(31),
  //     user: "0x0043ff",
  //     ownedThrone: BigInt(4),
  //     depositedEth: BigInt(15),
  //     invitees: BigInt(15),
  //     points: BigInt(15),
  //   },
  // ]);

  // Reward Points Leaderboard
  const getRanks = React.useCallback(async () => {
    if (account) {
      try {
        const results = await contracts.UserHistory?.methods
          .getRank()
          .call<TRank[]>();

        console.log({ getRank: results });
        setData(
          results?.map((item, index) => {
            const result: TRank = {
              ...item,
              tier: "",
              rank: index + 1,
            };
            if (result.rank > 200) {
              result.tier = "Stone";
            } else if (result.rank > 100) {
              result.tier = "Bronze";
            } else if (result.rank > 50) {
              result.tier = "Silver";
            } else if (result.rank > 30) {
              result.tier = "Gold";
            } else if (result.rank > 10) {
              result.tier = "Platinum";
            } else {
              result.tier = "Diamond";
            }
            return result;
          }) ?? []
        );
      } catch (err) {
        console.log(err);
        setData([]);
      }
    }
  }, [contracts.UserHistory, utils, account]);

  const handleChangeSort = React.useCallback(
    (fieldName: string) => {
      const newSort: SORT = {
        field: fieldName,
        order: "DESC",
      };

      if (sort.field == fieldName && sort.order == "DESC") {
        newSort.order = "ASC";
      }
      setSort(newSort);
    },
    [sort]
  );

  const Columns: DataRowProps[] = React.useMemo(
    () =>
      [
        {
          field: "tier",
          displayName: "Tier",
          width: 140,
          value: (row: TRank) => {
            return <span>{row.tier}</span>;
          },
        },
        {
          field: "rank",
          displayName: "Rank",
          width: 140,
          sortable: true,
          value: (row: TRank) => <span>{row.rank}</span>,
        },
        {
          field: "user",
          displayName: "User",
          width: 130,
          value: (row: TRank) => (
            <span>{`${row.account.substring(0, 8)}...${row.account.substring(
              row.account.length - 4
            )}`}</span>
          ),
        },
        {
          field: "point",
          displayName: "Points",
          width: 130,
          value: (row: TRank) => (
            <span>
              {Intl.NumberFormat("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 10,
              }).format(Number(utils.fromWei(row.point?.toString())))}
            </span>
          ),
        },
      ] as DataRowProps[],
    [utils?.fromWei]
  );
  // const Columns: DataRowProps[] = React.useMemo(
  //   () =>
  //     [
  //       {
  //         field: "tier",
  //         displayName: "Tier",
  //         width: 140,
  //         value: (row: TRewardPoint) => <span>{row.tier}</span>,
  //       },
  //       {
  //         field: "rank",
  //         displayName: "Rank",
  //         width: 140,
  //         sortable: true,
  //         value: (row: TRewardPoint) => <span>{Number(row.rank)}</span>,
  //       },
  //       {
  //         field: "user",
  //         displayName: "User",
  //         width: 130,
  //         value: (row: TRewardPoint) => <span>{Number(row.user)}</span>,
  //       },
  //       {
  //         field: "ownedThrone",
  //         displayName: "Owned Thrones",
  //         width: 130,
  //         value: (row: TRewardPoint) => <span>{Number(row.ownedThrone)}</span>,
  //       },
  //       {
  //         field: "depositedEth",
  //         displayName: "Depoisted ETH",
  //         width: "*",
  //         value: (row: TRewardPoint) => <span>{Number(row.depositedEth)}</span>,
  //       },
  //       {
  //         field: "invitees",
  //         displayName: "Invitees",
  //         width: 130,
  //         value: (row: TRewardPoint) => <span>{Number(row.invitees)}</span>,
  //       },
  //       {
  //         field: "points",
  //         displayName: "Points",
  //         width: 130,
  //         value: (row: TRewardPoint) => <span>{Number(row.points)}</span>,
  //       },
  //     ] as DataRowProps[],
  //   [utils?.fromWei]
  // );

  const handleSort = React.useCallback(
    (a: TRank, b: TRank) => {
      let front, back;
      if (sort.order == "ASC") {
        front = a;
        back = b;
      } else {
        front = b;
        back = a;
      }

      switch (sort.field) {
        case "rank":
          return front.rank.valueOf() - back.rank.valueOf() > BigInt(0)
            ? 1
            : -1;
        default:
          return 0;
      }
    },
    [sort]
  );

  React.useEffect(() => {
    getRanks();
  }, [getRanks]);
  return (
    <>
      <DataTable
        columns={Columns}
        data={data.sort(handleSort)}
        sort={sort}
        onChangeSort={handleChangeSort}
      />
    </>
  );
};

export default function PageLeaderboard() {
  return (
    <div className="mt-10 w-full">
      <div className="mt-6">
        <div className="mt-4 flex flex-wrap justify-center md:justify-between">
          <TotalInfo />
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-lg text-primary chakra-petch-bold">
          Reward Points Leaderboard
        </h2>
        <div className="flex items-center justify-center">
          <RewardPoints />
        </div>
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
