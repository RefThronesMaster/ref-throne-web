"use client";

import React, { ChangeEvent } from "react";
import {
  Button,
  DataRowProps,
  DataTable,
  Dialog,
  Input,
  ProgressCircleIcon,
  SORT,
} from "@/components/common";
import Image from "next/image";
import { MyAccountContext } from "../MyAccountProvider";
import { TActVal, TUserInfo } from "@/components";

const BindCode = () => {
  const [invitationCode, setInvitationCode] = React.useState<string>("");
  const { contracts, account } = React.useContext(MyAccountContext);
  const [transacting, setTransacting] = React.useState<boolean>(false);

  const bindingInvitationCode = React.useCallback(async () => {
    if (account) {
      try {
        setTransacting(true);
        const result = await contracts.User?.methods
          .addInvitee(invitationCode)
          .send({ from: account });

        console.log({ result });
        setInvitationCode("");
      } catch (err) {
        console.log(err);
      } finally {
        setTransacting(false);
      }
    }
  }, [contracts.User, invitationCode, account]);

  const handleInputChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInvitationCode(value);
    },
    []
  );

  return (
    <>
      <label htmlFor="invitationCode">
        Bind invitation code & Earn reward points
      </label>
      <div className="flex flex-wrap justify-between">
        <Input
          className="w-full max-w-[calc(100%_-_200px)] py-1 px-2 chakra-petch-regular rounded-sm text-white placeholder:text-camo-300 bg-camo-700 border border-gray-400"
          id="invitationCode"
          type="text"
          value={invitationCode}
          onChange={handleInputChange}
        />
        <Button
          className="w-[180px] h-[32px] chakra-petch-bold rounded-md bg-yellow-300 text-black disabled:bg-camo-300 disabled:text-gray-300"
          onClick={bindingInvitationCode}
          disabled={!invitationCode || transacting}
        >
          {transacting && (
            <ProgressCircleIcon
              className="animate-spin inline-block mr-1 w-[20px] h-[20px]"
              color="text-yellow-100"
              bgColor="text-gray-300"
            />
          )}
          <span>{transacting ? "Binding..." : "Bind Invitation Code"}</span>
        </Button>
      </div>
    </>
  );
};

const MyInvitationCode = () => {
  const [myInvitationCode, setMyInvitationCode] = React.useState<string>("");

  const { contracts, account } = React.useContext(MyAccountContext);
  const [transacting, setTransacting] = React.useState<boolean>(false);

  const getMyInvitaionCode = React.useCallback(
    async (account: string) => {
      try {
        const result = await contracts.User?.methods
          .getInvitaionCode(account)
          .call<string>();

        if (result) setMyInvitationCode(result);
      } catch (err) {
        console.log(err);
      }
    },
    [contracts.User]
  );

  const generateMyInvitationCode = React.useCallback(async () => {
    if (account) {
      try {
        setTransacting(true);
        const result = await contracts.User?.methods
          .generateInvitationCode()
          .send({ from: account });

        if (result) {
          getMyInvitaionCode(account);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setTransacting(false);
      }
    }
  }, [contracts.User, account]);

  React.useEffect(() => {
    contracts.User && account && getMyInvitaionCode(account);
  }, [contracts.User, account]);

  return (
    <>
      {myInvitationCode ? (
        <span>My Code: {myInvitationCode}</span>
      ) : (
        <Button
          className="w-[240px] h-[32px] chakra-petch-bold rounded-md bg-yellow-300 text-black disabled:bg-camo-300 disabled:text-gray-300"
          onClick={generateMyInvitationCode}
          disabled={!transacting}
        >
          {transacting && (
            <ProgressCircleIcon
              className="animate-spin inline-block mr-1 w-[20px] h-[20px]"
              color="text-yellow-100"
              bgColor="text-gray-300"
            />
          )}
          <span>
            {transacting ? "Creating..." : "Create My Invitation Code"}
          </span>
        </Button>
      )}
    </>
  );
};

const MyInfo = () => {
  const [myTotalEthDeposited, setMyTotalEthDeposited] =
    React.useState<string>("-");
  const [myTotalTorDeposited, setMyTotalTorDeposited] =
    React.useState<string>("-");

  const [myInvitees, setMyInvitees] = React.useState<any[] | null>(null);
  const { contracts, utils, account } = React.useContext(MyAccountContext);
  const [myInfo, setMyInfo] = React.useState<TUserInfo | undefined>();

  const getMyInfo = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.User?.methods
          .getUserInfo()
          .call<TUserInfo>();

        setMyInfo(result);
      } catch (err) {
        setMyInfo(undefined);
        console.log(err);
      }
    }
  }, [contracts.User, utils, account]);

  const getMyInvitees = React.useCallback(async () => {
    try {
      const result = await contracts.User?.methods.getInvitees().call<any[]>();
      console.log({ getMyInvitees: result });

      if (result) {
        setMyInvitees(result || []);
      }
    } catch (err) {
      setMyInvitees(null);
      console.log(err);
    }
  }, [contracts.User, utils]);

  const getMyTotalEthBalance = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.EthTreasury?.methods
          .getSwappedUserEthBalance(account)
          .call<bigint>();

        if (result) {
          console.log({ eth: result });
          setMyTotalEthDeposited(
            Number(utils.fromWei(result?.toString())).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 5,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [contracts.EthTreasury, utils]);

  const getMyTotalTorBalance = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.EthTreasury?.methods
          .getSwappedUserTorBalance(account)
          .call<bigint>();

        if (result) {
          console.log({ tor: result });
          setMyTotalTorDeposited(
            Number(utils.fromWei(result?.toString())).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 5,
            })
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [contracts.EthTreasury, utils, account]);

  React.useEffect(() => {
    getMyInvitees();
    getMyInfo();
  }, [contracts.User]);

  React.useEffect(() => {
    getMyTotalEthBalance();
    getMyTotalTorBalance();
  }, [contracts.EthTreasury]);

  return (
    <>
      <PanelTitle
        name={"My Deposited ETH"}
        result={myTotalEthDeposited}
        className="w-full max-w-[90%] md:w-1/6 md:max-w-[170px]"
      />
      <PanelTitle
        name={"My TOR"}
        result={myTotalTorDeposited}
        className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
      />
      <PanelTitle
        name={"My Invitees"}
        result={myInvitees ? myInvitees.length : "-"}
        className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
      />
      <PanelTitle
        name={
          <div>
            <p>My Reward Points</p>
            <p>(Realtime Estimated)</p>
          </div>
        }
        result={"-"}
        className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
      />
      <PanelTitle
        name={"My Tier"}
        result={"Stone"}
        className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
      />
    </>
  );
};

const defaultHistorySort: SORT = {
  field: "timestamp",
  order: "DESC",
};

const MyHistories = () => {
  const { contracts, utils, account } = React.useContext(MyAccountContext);
  const [sort, setSort] = React.useState<SORT>(defaultHistorySort);
  // const [data, setData] = React.useState<TActVal[]>([]);
  const [data, setData] = React.useState<TActVal[]>([
    {
      act_type: 1,
      timestamp: BigInt(new Date().valueOf()),
      activity_points: BigInt(1),
      deposit_points: BigInt(1),
      tor_balance: BigInt(1),
      tor_changes: BigInt(1),
      total_points: BigInt(1),
    },
  ]);

  const getMyHistories = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.UserHistory?.methods
          .getHistory(account, 1, 100)
          .call<TActVal[]>();

        setData(result ?? []);
        console.log({ result });
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
          field: "timestamp",
          displayName: "Date",
          width: 140,
          sortable: true,
          value: (row: TActVal) => row.timestamp,
        },
        {
          field: "act_type",
          displayName: "Activity Type",
          width: 140,
          sortable: true,
          value: (row: TActVal) => row.act_type,
        },
        {
          field: "tor_changes",
          displayName: "TOR Changes",
          width: 140,
          value: (row: TActVal) => row.tor_changes,
        },
        {
          field: "tor_balance",
          displayName: "TOR Balance",
          width: 130,
          value: (row: TActVal) => row.tor_balance,
        },
        {
          field: "activity_points",
          displayName: "Activity Points",
          width: 150,
          value: (row: TActVal) => row.activity_points,
        },
        {
          field: "deposit_points",
          displayName: "Deposit Points",
          width: 170,
          value: (row: TActVal) => row.deposit_points,
        },
        {
          field: "total_points",
          displayName: "Total Accumulated Points",
          width: "*",
          value: (row: TActVal) => row.total_points,
        },
      ] as DataRowProps[],
    []
  );

  const handleSort = React.useCallback(
    (a: TActVal, b: TActVal) => {
      let front, back;
      if (sort.order == "ASC") {
        front = a;
        back = b;
      } else {
        front = b;
        back = a;
      }

      switch (sort.field) {
        case "timestamp":
          return front.timestamp.valueOf() - back.timestamp.valueOf() >
            BigInt(0)
            ? 1
            : -1;
        default:
          return 0;
      }
    },
    [sort]
  );

  React.useEffect(() => {
    getMyHistories();
  }, [contracts.UserHistory]);

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

export default function PageDashboard() {
  return (
    <div className="mt-10 w-full">
      <div className="mt-6">
        <div className="mt-4 flex flex-wrap justify-center md:justify-between">
          <MyInfo />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg text-primary chakra-petch-bold">My Inviter</h2>
        <div className="mt-4">
          <BindCode />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg text-primary chakra-petch-bold">
          My Invitations
        </h2>
        <div className="mt-4">
          <MyInvitationCode />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg text-primary chakra-petch-bold">
          My Referral Thrones
        </h2>
        <div className="flex items-center justify-center">
          <MyHistories />
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
