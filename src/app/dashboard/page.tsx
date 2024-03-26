"use client";

import React, { ChangeEvent } from "react";
import {
  Button,
  DataRowProps,
  DataTable,
  Modal,
  Input,
  OwnedIcon,
  ProgressCircleIcon,
  SORT,
  SwordIcon,
} from "@/components/common";

import { MyAccountContext } from "../MyAccountProvider";
import {
  BENEFIT_TYPE_LABEL,
  LabelActType,
  LabelThroneStatus,
  TActVal,
  TThrone,
  TUserInfo,
  ThroneStatus,
  UsurpReferralDialog,
} from "@/components";
import dayjs from "dayjs";
import Link from "next/link";
import { MyDialogContext } from "../MyDialogProvider";

const BindCode = () => {
  const { open, close } = React.useContext(MyDialogContext);
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
        open({
          title: "Bind Invitation Code",
          children: <center>Binding Invitation Code Successful.</center>,
        });
        setInvitationCode("");
      } catch (err) {
        open({
          title: "Bind Invitation Code",
          children: <center>Binding Invitation Code Failed.</center>,
        });
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
  const { open, close } = React.useContext(MyDialogContext);
  const [myInvitationCode, setMyInvitationCode] = React.useState<string>("");

  const { contracts, account } = React.useContext(MyAccountContext);
  const [transacting, setTransacting] = React.useState<boolean>(false);

  const getMyInvitaionCode = React.useCallback(
    async (account: string) => {
      try {
        const result = await contracts.User?.methods
          .getInvitaionCode(account)
          .call<string>();

        if (result) {
          setMyInvitationCode(result);
        }
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
          open({
            title: "Generate Invitation Code",
            children: <center>Generating Invitation Code Successful.</center>,
          });
          getMyInvitaionCode(account);
        }
      } catch (err) {
        open({
          title: "Generate Invitation Code",
          children: <center>Generating Invitation Code Failed.</center>,
        });

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

const defaultThroneSort: SORT = {
  field: "timestamp",
  order: "DESC",
};

type StatusButtonProps = {
  status: number;
  onClick?: () => void;
};

const StatusButton = React.memo(function FnStatusButton({
  status,
  onClick,
}: StatusButtonProps) {
  switch (status) {
    case ThroneStatus.InReview:
      return (
        <Button className="mx-1" onClick={() => {}}>
          <OwnedIcon className="w-6 h-6 fill-red-600 stroke-red-600" />
        </Button>
      );
    case ThroneStatus.Owned:
      return (
        <Button className="mx-1" onClick={() => {}}>
          <OwnedIcon className="w-6 h-6 fill-red-600 stroke-red-600" />
        </Button>
      );
    case ThroneStatus.Lost:
      return (
        <Button className="mx-1" onClick={onClick}>
          <SwordIcon className="w-6 h-6 fill-primary" />
        </Button>
      );
    case ThroneStatus.Rejected:
      return (
        <Button className="mx-1" onClick={onClick}>
          <SwordIcon className="w-6 h-6 fill-primary" />
        </Button>
      );
  }
  return <></>;
});

const MyThrones = () => {
  const { contracts, utils, account } = React.useContext(MyAccountContext);
  const [sort, setSort] = React.useState<SORT>(defaultThroneSort);
  // const [data, setData] = React.useState<TActVal[]>([]);

  // TODO: 임시 데이터를 실제 데이터로 할당
  const [data, setData] = React.useState<TThrone[]>([]);

  const getMyThrones = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.RefThrone?.methods
          .getAllOwnedThrones(account, 1, 100)
          .call<TThrone[]>();
        console.log({ result });
        setData(result ?? []);
        console.log({ result });
      } catch (err) {
        console.log(err);
        // setData([]);
      }
    }
  }, [contracts.RefThrone, utils, account]);

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
  const [openUsurpDialog, setOpenUsurpDialog] = React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<BigInt | undefined>();

  const handleUsurpDialogClose = React.useCallback(() => {
    setOpenUsurpDialog(false);
    setSelectedId(undefined);
  }, []);

  const Columns: DataRowProps[] = React.useMemo(
    () =>
      [
        {
          field: "name",
          displayName: "Throne",
          width: 140,
          sortable: true,
          value: (row: TThrone) => <span>{row.name}</span>,
        },
        {
          field: "serviceType",
          displayName: "Service Type",
          width: 140,
          sortable: true,
          value: (row: TThrone) => row.serviceType,
        },
        {
          field: "referralCode",
          displayName: "Referral Code",
          width: 130,
          value: (row: TThrone) => row.referralCode,
        },
        {
          field: "benefitAmount",
          displayName: "Benefit",
          width: "*",
          value: (row: TThrone) =>
            `${utils?.fromWei(row.benefitAmount.toString())} ${
              BENEFIT_TYPE_LABEL[row.benefitType]
            }`,
        },
        {
          field: "torAmount",
          displayName: "Price of the throne",
          width: 150,
          value: (row: TThrone) => (
            <span>
              {Intl.NumberFormat("en-US").format(
                Number(utils?.fromWei(row.torAmount.toString()))
              )}{" "}
              TOR
            </span>
          ),
        },
        {
          field: "linkUrl",
          displayName: "Link [Verified]",
          width: 170,
          value: (row: TThrone) => {
            const url = row.linkUrl?.startsWith("http")
              ? row.linkUrl
              : `https://${row.linkUrl}`;
            return (
              <Link href={url} target="_blank">
                {url.length > 30
                  ? `${url.substring(0, 16)}...${url.substring(url.length - 6)}`
                  : url}
              </Link>
            );
          },
        },
        {
          field: "timestamp",
          displayName: "Date",
          width: 220,
          sortable: true,
          value: (row: TThrone) => (
            <span>
              {dayjs(new Date(Number(row.timestamp) * 1000)).format(
                "YYYY.MM.DD HH:mm:ss Z"
              )}
            </span>
          ),
        },
        {
          field: "status",
          displayName: "Status",
          width: 80,
          value: (row: TThrone) => {
            let labelColor = "text-white";
            switch (Number(row.status)) {
              case ThroneStatus.InReview:
                labelColor = "text-[#0367FC]";
                break;
              case ThroneStatus.Owned:
                labelColor = "text-[#FCFC03]";
                break;
              case ThroneStatus.Owned:
                labelColor = "text-[#FC033F]";
                break;
            }
            return (
              <div className="flex items-center">
                <span className={labelColor + " mr-1"}>
                  {LabelThroneStatus[row.status]}
                </span>
                <StatusButton
                  status={Number(row.status)}
                  onClick={() => {
                    setOpenUsurpDialog(true);
                    setSelectedId(row.id);
                  }}
                />
              </div>
            );
          },
        },
      ] as DataRowProps[],
    []
  );

  const handleSort = React.useCallback(
    (a: TThrone, b: TThrone) => {
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
    getMyThrones();
  }, [contracts.RefThrone]);
  return (
    <>
      <DataTable
        columns={Columns}
        data={data.sort(handleSort)}
        sort={sort}
        onChangeSort={handleChangeSort}
      />
      <UsurpReferralDialog
        open={openUsurpDialog}
        dataId={selectedId}
        onClose={handleUsurpDialogClose}
      />
    </>
  );
};

const defaultHistorySort: SORT = {
  field: "timestamp",
  order: "DESC",
};

type LiveAccumPointProps = {
  data: TActVal;
};

const LiveAccumPoint = React.memo(function FnLiveAccumPoint({
  data,
}: LiveAccumPointProps) {
  const [timestamp, setTimestamp] = React.useState<number>(
    Number(data.timestamp)
  );
  const [livePoint, setLivePoint] = React.useState<number>(
    Number(data.total_points)
  );

  // 컴포넌트가 마운트 되었을때 실행됩니다.
  React.useEffect(() => {
    // 100ms 마다 호출됩니다.
    const timer = setInterval(() => {
      // TODO: 수식을 까먹었는데 알려주시면 감사하겠습니다.
      setLivePoint(livePoint + (new Date().valueOf() - timestamp) / 10000);
    }, 100);

    // 컴포넌트가 언마운트 되었을때 실행됩니다.
    return () => {
      clearInterval(timer);
    };
  }, [setLivePoint, data]);

  return <div>{Intl.NumberFormat("en-US").format(livePoint)}</div>;
});

const MyHistories = () => {
  const { contracts, utils, account } = React.useContext(MyAccountContext);
  const [sort, setSort] = React.useState<SORT>(defaultHistorySort);
  // const [data, setData] = React.useState<TActVal[]>([]);

  // TODO: 임시 데이터를 실제 데이터로 할당
  const [data, setData] = React.useState<TActVal[]>([
    {
      act_type: 1,
      timestamp: BigInt(new Date().valueOf()),
      activity_points: BigInt(150),
      deposit_points: BigInt(63),
      tor_balance: BigInt(12000),
      tor_changes: BigInt(5000),
      total_points: BigInt(1393),
    },
    {
      act_type: 2,
      timestamp: BigInt(1647312000000),
      activity_points: BigInt(100),
      deposit_points: BigInt(930),
      tor_balance: BigInt(7000),
      tor_changes: BigInt(3000),
      total_points: BigInt(1180),
    },
  ]);

  const getMyHistories = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.UserHistory?.methods
          .getHistory(account)
          .call<TActVal[]>();

        setData(result ?? []);
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
          width: 220,
          value: (row: TActVal) => (
            <span>
              {dayjs(new Date(Number(row.timestamp) * 1000)).format(
                "YYYY.MM.DD HH:mm:ss Z"
              )}
            </span>
          ),
        },
        {
          field: "act_type",
          displayName: "Activity Type",
          width: 140,
          value: (row: TActVal) => LabelActType[Number(row.act_type)],
        },
        {
          field: "tor_changes",
          displayName: "TOR Changes",
          width: 140,
          value: (row: TActVal) => (
            <span>
              {`${row.act_type == 2 ? "- " : ""}${Intl.NumberFormat(
                "en-US"
              ).format(Number(utils.fromWei(Number(row.tor_changes))))}`}
            </span>
          ),
        },
        {
          field: "tor_balance",
          displayName: "TOR Balance",
          width: 130,
          value: (row: TActVal) => (
            <span>
              {`${Intl.NumberFormat("en-US").format(
                Number(utils.fromWei(Number(row.tor_balance)))
              )}`}
            </span>
          ),
        },
        {
          field: "activity_points",
          displayName: "Activity Points",
          width: 150,
          value: (row: TActVal) => (
            <span>
              {`${Intl.NumberFormat("en-US").format(
                Number(utils.fromWei(Number(row.activity_points)))
              )}`}
            </span>
          ),
        },
        {
          field: "deposit_points",
          displayName: "Deposit Points",
          width: 170,
          value: (row: TActVal) => (
            <span>
              {`${Intl.NumberFormat("en-US").format(
                Number(utils.fromWei(Number(row.deposit_points)))
              )}`}
            </span>
          ),
        },
        {
          field: "total_points",
          displayName: "Total Accumulated Points",
          width: "*",
          value: (row: TActVal, index: number) => (
            <span>
              {Intl.NumberFormat("en-US").format(
                Number(utils.fromWei(Number(row.total_points)))
              )}
            </span>
          ),
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
  // console.log(data);
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
          <MyThrones />
          {/* <Image
            src="/assets/images/mythrones.png"
            width={1439}
            height={331}
            alt="tor_concept"
            className="w-full"
            style={{ objectFit: "contain" }}
          /> */}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-lg text-primary chakra-petch-bold">
          My Activity History
        </h2>
        <div className="flex items-center justify-center">
          <MyHistories />
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

// type DialogProps = {
//   open: boolean;
// };

// export const UsurpReferralDialog = ({ open }: DialogProps) => {
//   return <Modal title={"Usurp the Referral Throne"}>asdsadad</Modal>;
// };
