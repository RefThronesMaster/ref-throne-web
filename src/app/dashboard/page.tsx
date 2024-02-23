"use client";

import React, { ChangeEvent } from "react";
import {
  Button,
  DataRowProps,
  DataTable,
  Dialog,
  Input,
} from "@/components/common";
import Image from "next/image";
import { MyAccountContext } from "../MyAccountProvider";

export default function PageDashboard() {
  const { contracts, utils, account } = React.useContext(MyAccountContext);
  const [invitationCode, setInvitationCode] = React.useState<string>("");

  const [myTotalEthDeposited, setMyTotalEthDeposited] =
    React.useState<string>("-");
  const [myTotalTorDeposited, setMyTotalTorDeposited] =
    React.useState<string>("-");

  const [myInvitees, setMyInvitees] = React.useState<any[] | null>(null);

  const [myInvitationCode, setMyInvitationCode] = React.useState<
    string | null
  >();

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

  const getMyInfo = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.User?.methods.getUserInfo().call();

        if (result) {
          console.log({ userInfo: result });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [contracts.User, utils, account]);

  const getMyInvitees = React.useCallback(async () => {
    try {
      const result = await contracts.User?.methods.getInvitees().call<any[]>();
      console.log({ invitees: result });
      if (result) {
        setMyInvitees(result || "");
      }
    } catch (err) {
      console.log(err);
    }
  }, [contracts.User, utils]);

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

  const bindingInvitationCode = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.User?.methods
          .addInvitee(invitationCode)
          .send({ from: account });

        console.log({ result });
        setInvitationCode("");
      } catch (err) {
        console.log(err);
      }
    }
  }, [contracts.User, invitationCode, account]);

  const getMyInvitaionCode = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.User?.methods
          .getInvitaionCode(account)
          .call<string>();

        if (result) setMyInvitationCode(result);
      } catch (err) {
        console.log(err);
      }
    }
  }, [contracts.User, account]);

  const getMyHistories = React.useCallback(async () => {
    if (account) {
      try {
        console.log({ account });
        const result = await contracts.UserHistory?.methods
          .getHistory(account)
          .call({ from: account });

        console.log({ histories: result });
      } catch (err) {
        console.log(err);
      }
    }
  }, [contracts.UserHistory, account]);

  const generateMyInvitationCode = React.useCallback(async () => {
    if (account) {
      try {
        const result = await contracts.User?.methods
          .generateInvitationCode()
          .send({ from: account });

        if (result) {
          getMyInvitaionCode();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [contracts.User, account]);

  React.useEffect(() => {
    getMyInfo();
    getMyTotalEthBalance();
    getMyTotalTorBalance();
    getMyInvitees();
    getMyInvitaionCode();
    getMyHistories();
  }, []);

  const handleInputChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInvitationCode(value);
    },
    []
  );

  return (
    <div className="mt-10 w-full">
      <div className="mt-6">
        <h2 className="text-lg text-primary chakra-petch-bold">My Dashboard</h2>
        <div className="mt-4 flex flex-wrap justify-center md:justify-between">
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
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg text-primary chakra-petch-bold">My Inviter</h2>
        <div className="mt-4">
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
              className="w-[180px] h-[32px] chakra-petch-bold rounded-md bg-yello-300 text-black"
              onClick={bindingInvitationCode}
            >
              Bind Invitation Code
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg text-primary chakra-petch-bold">
          My Invitations
        </h2>
        <div className="mt-4">
          {myInvitationCode ? (
            <span>My Code: {myInvitationCode}</span>
          ) : (
            <Button
              className="w-[240px] h-[32px] chakra-petch-bold rounded-md bg-yello-300 text-black disabled:bg-yello-100 disabled:text-gray-300"
              disabled={myInvitees == null}
              onClick={generateMyInvitationCode}
            >
              Create My Invitation Code
            </Button>
          )}
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
