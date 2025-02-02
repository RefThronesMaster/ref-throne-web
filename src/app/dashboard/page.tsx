"use client";

import React, { ChangeEvent, useContext } from "react";
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

import { MyWeb3Context } from "../MyWeb3Provider";
import {
  BENEFIT_TYPE_LABEL,
  ConfirmDialog,
  LabelActType,
  LabelThroneStatus,
  TActVal,
  TThrone,
  TUserInfo,
  ThroneStatus,
  UsurpReferralDialog,
  YesOrNoDialog,
} from "@/components";
import dayjs from "dayjs";
import Link from "next/link";
import { MyDialogContext } from "../MyDialogProvider";

const BindCode = () => {
  const { open, close } = React.useContext(MyDialogContext);
  const [binded, setBinded] = React.useState<boolean>(false);

  const [invitationCode, setInvitationCode] = React.useState<string>("");
  const { contracts, account, updateTs, ts } = React.useContext(MyWeb3Context);
  const [transacting, setTransacting] = React.useState<boolean>(false);
  // Invitation code binded
  const getMyInviterCode = React.useCallback(async () => {
    if (account) {
      try {
        const getMyInviterCode = await contracts.User?.methods
          .getMyInviterCode()
          .call<string>({ from: account });

        // console.log({ getMyInviterCode });
        if (getMyInviterCode) {
          setInvitationCode(getMyInviterCode);
          setBinded(true);
        } else {
          setInvitationCode("");
          setBinded(false);
        }
      } catch (err) {
        console.log(err);
        setInvitationCode("");
        setBinded(false);
      } finally {
      }
    }
  }, [contracts.User, account, ts]);

  const bindingInvitationCode = React.useCallback(async () => {
    if (account && invitationCode?.trim()) {
      try {
        setTransacting(true);

        const addInvitee = await contracts.User?.methods
          .addInvitee(invitationCode?.trim())
          .call({ from: account });

        console.log({ addInvitee });

        if (addInvitee) {
          open({
            title: "Bind Invitation Code",
            children: <center>Binding Invitation Code Successful.</center>,
          });
          updateTs(dayjs().valueOf());
        } else {
          open({
            title: "Bind Invitation Code",
            children: <center>Binding Invitation Code Failed.</center>,
          });
        }
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
  }, [contracts.User, invitationCode, account, updateTs]);

  const handleInputChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInvitationCode(value);
    },
    []
  );

  React.useEffect(() => {
    getMyInviterCode();
  }, [getMyInviterCode]);

  return (
    <>
      {binded ? (
        <label>Invitation code binded: {invitationCode}</label>
      ) : (
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
              className="w-[180px] h-[32px] chakra-petch-bold rounded-md bg-yellow-300 text-black disabled:bg-camo-300 disabled:text-gray-500"
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
      )}
    </>
  );
};

const MyInvitationCode = () => {
  const { open, close } = React.useContext(MyDialogContext);
  const [myInvitationCode, setMyInvitationCode] = React.useState<string>("");

  const { contracts, account, ts } = React.useContext(MyWeb3Context);
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
  }, [contracts.User, account, ts]);

  return (
    <>
      {myInvitationCode ? (
        <span>My Code: {myInvitationCode}</span>
      ) : (
        <Button
          className="w-[240px] h-[32px] chakra-petch-bold rounded-md bg-yellow-300 text-black disabled:bg-camo-300 disabled:text-gray-500"
          onClick={generateMyInvitationCode}
          disabled={transacting}
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

type TPanelTitleProps = {
  name: string | React.ReactNode;
  result: string | number;
  className?: string;
};

const PanelTitle = ({ name, result, className }: TPanelTitleProps) => {
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

type TLiveAccumPointPanelTitle = Omit<TPanelTitleProps, "result"> & {
  result?: TActVal;
};

const LiveAccumPointPanelTitle = React.memo(
  function FnLiveAccumPointPanelTitle({
    name,
    result,
    className,
  }: TLiveAccumPointPanelTitle) {
    const { utils } = useContext(MyWeb3Context);
    const [livePoint, setLivePoint] = React.useState<number>(0);

    // 컴포넌트가 마운트 되었을때 실행됩니다.
    React.useEffect(() => {
      // 100ms 마다 호출됩니다.
      const timer = setInterval(() => {
        if (result) {
          const realEst =
            Number(utils.fromWei(result.total_points.toString())) +
            Number(
              utils.fromWei(
                (
                  ((new Date().valueOf() / 1000 - Number(result.timestamp)) *
                    Number(result.tor_balance)) /
                  2000000
                ).toFixed(0)
              )
            );

          setLivePoint(realEst);
        }
        // 200ms 마다 업데이트
      }, 200);

      // 컴포넌트가 언마운트 되었을때 실행됩니다.
      return () => {
        clearInterval(timer);
        setLivePoint(0);
      };
    }, [setLivePoint, result, utils]);

    return (
      <div
        className={
          "rounded-md p-2 flex flex-col items-center bg-camo-500 text-white" +
          (className ? ` ${className}` : "")
        }
      >
        <div className="flex items-center text-center min-h-[50px]">{name}</div>
        <p className="py-3">
          {Intl.NumberFormat("en-US", {
            minimumFractionDigits: 5,
            maximumFractionDigits: 5,
          }).format(livePoint)}
        </p>
      </div>
    );
  }
);

const MyInfo = () => {
  const [myTotalEthDeposited, setMyTotalEthDeposited] =
    React.useState<string>("-");
  const [myTotalTorDeposited, setMyTotalTorDeposited] =
    React.useState<string>("-");

  const [myInvitees, setMyInvitees] = React.useState<any[] | null>(null);
  const { contracts, utils, account, ts } = React.useContext(MyWeb3Context);
  const [myInfo, setMyInfo] = React.useState<TUserInfo | undefined>();
  const [myLastAct, setMyLastAct] = React.useState<TActVal | undefined>();

  const [myRank, setMyRank] = React.useState<string>("-");

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

  const getMyRank = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.UserHistory?.methods
          .getMyRank(account)
          .call<bigint>();

        if (result) {
          if (result > BigInt(200)) {
            setMyRank("Stone");
          } else if (result > BigInt(100)) {
            setMyRank("Bronze");
          } else if (result > BigInt(50)) {
            setMyRank("Silber");
          } else if (result > BigInt(30)) {
            setMyRank("Gold");
          } else if (result > BigInt(10)) {
            setMyRank("Platinum");
          } else {
            setMyRank("Diamond");
          }
        } else {
          setMyRank("Stone");
        }
      } catch (err) {
        console.log(err);
        setMyRank("-");
      }
    }
  }, [contracts.UserHistory, utils, account]);

  const getMyInvitees = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.User?.methods
          .getInvitees()
          .call<any[]>({ from: account });

        // console.log({ getMyInvitees: result });

        if (result) {
          setMyInvitees(result || []);
        }
      } catch (err) {
        setMyInvitees(null);
        console.log(err);
      }
    }
  }, [contracts.User, utils, account]);

  const getMyTotalEthBalance = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.EthTreasury?.methods
          .getSwappedUserEthBalance(account)
          .call<bigint>();

        setMyTotalEthDeposited(
          Number(utils.fromWei(result?.toString() ?? "0n")).toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 5,
            }
          )
        );
      } catch (err) {
        console.log(err);
        setMyTotalEthDeposited("-");
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
          setMyTotalTorDeposited(
            Number(utils.fromWei(result!.toString())).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 5,
            })
          );
        } else {
          setMyTotalTorDeposited(
            Number(utils.fromWei("0")).toLocaleString("en-US", {
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
    getMyRank();
  }, [contracts.UserHistory, ts]);

  React.useEffect(() => {
    getMyTotalEthBalance();
    getMyTotalTorBalance();
  }, [contracts.EthTreasury]);

  const getMyLastAct = React.useCallback(async () => {
    if (account) {
      try {
        const results = await contracts.UserHistory?.methods
          .getHistory(account, 1, 1)
          .call<TActVal[]>();

        if (results && results[0]) {
          setMyLastAct(results[0]);
        }
      } catch (err) {
        setMyLastAct(undefined);
      }
    }
  }, [contracts.UserHistory, utils, account]);

  React.useEffect(() => {
    getMyLastAct();
  }, [contracts.UserHistory, ts]);

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
      <LiveAccumPointPanelTitle
        name={
          <div>
            <p>My Reward Points</p>
            <p>(Realtime Estimated)</p>
          </div>
        }
        result={myLastAct}
        className="w-full max-w-[90%] mt-3 md:mt-0 md:w-1/6 md:max-w-[170px]"
      />
      <PanelTitle
        name={"My Tier"}
        result={myRank}
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
        <Button className="mx-1" onClick={onClick}>
          <OwnedIcon className="w-6 h-6 fill-red-600 stroke-red-600" />
        </Button>
      );
    case ThroneStatus.Owned:
      return (
        <Button className="mx-1" onClick={onClick}>
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

const MyThrones = React.memo(function FnMyTHornes() {
  const { contracts, utils, account } = React.useContext(MyWeb3Context);
  const { open, setTransacting, close } = React.useContext(MyDialogContext);
  const [sort, setSort] = React.useState<SORT>(defaultThroneSort);

  const [data, setData] = React.useState<TThrone[]>([]);

  const getMyThrones = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.RefThrone?.methods
          .getThronesByAddress(account)
          // .getAllOwnedThrones(account)
          .call<TThrone[]>();

        setData(result ?? []);
      } catch (err: any) {
        setData([]);
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

  const handleWithdrawThroneById = React.useCallback(
    async (throneId: string) => {
      if (account && throneId) {
        try {
          setTransacting(true);
          const result = await contracts.RefThrone?.methods
            .withdrawFromThrone(throneId)
            .send({ from: account });
          console.log({ withdrawFromThrone: result });
        } catch (err) {
          console.log(err);
        } finally {
          setTransacting(false);
          close();
        }
      }
    },
    [contracts.RefThrone, account]
  );

  // const handleWithdrawThrone = React.useCallback(() => {
  //   setOpenWithdrawDialog(false);
  //   setSelectedId(undefined);
  // }, [selectedId]);

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
                  status={Number(row.status.toString())}
                  onClick={() => {
                    switch (Number(row.status.toString())) {
                      case ThroneStatus.InReview:
                      case ThroneStatus.Owned:
                        open({
                          modal: "YesOrNo",
                          title: "Withdraw Throne",
                          onConfirm: () =>
                            handleWithdrawThroneById(row.id.toString()),
                          children: (
                            <center>
                              Do you want to withdraw this throne?
                            </center>
                          ),
                        });
                        break;
                      case ThroneStatus.Lost:
                      case ThroneStatus.Rejected:
                        setSelectedId(row.id);
                        setOpenUsurpDialog(true);
                        break;
                      default:
                        break;
                    }
                  }}
                />
              </div>
            );
          },
        },
      ] as DataRowProps[],
    [utils?.fromWei]
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
  }, [getMyThrones]);
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
});

const defaultHistorySort: SORT = {
  field: "timestamp",
  order: "DESC",
};

const MyHistories = React.memo(function FnMyHistories() {
  const { contracts, utils, account, ts } = React.useContext(MyWeb3Context);
  const [sort, setSort] = React.useState<SORT>(defaultHistorySort);
  const [data, setData] = React.useState<TActVal[]>([]);

  const getMyHistories = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.UserHistory?.methods
          .getHistory(account)
          .call<TActVal[]>();

        setData(result ?? []);
      } catch (err) {
        setData([]);
      }
    }
  }, [contracts.UserHistory, account]);

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
              {`${row.act_type == 1 ? "- " : ""}${Intl.NumberFormat(
                "en-US"
              ).format(Number(utils.fromWei(row.tor_changes?.toString())))}`}
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
                Number(utils.fromWei(row.tor_balance?.toString()))
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
                Number(utils.fromWei(row.activity_points?.toString()))
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
                Number(utils.fromWei(row.deposit_points?.toString()))
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
                Number(utils.fromWei(row.total_points?.toString()))
              )}
            </span>
          ),
        },
      ] as DataRowProps[],
    [utils?.fromWei]
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
  }, [getMyHistories, ts]);

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
});

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
