"use client";

import Image from "next/image";
import React, { ChangeEvent, HTMLInputTypeAttribute } from "react";
import {
  Button,
  Search,
  SwordIcon,
  DataTable,
  DataRowProps,
  Dialog,
  Input,
  TService,
  UsurpReferralModal,
} from "@/common/components";
import { MyAccountContext } from "../MyAccountProvider";

export default function PageReferral() {
  const onChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<TService | undefined>();
  const { account, getBalance, web3, contracts, utils } =
    React.useContext(MyAccountContext);

  const [data, setData] = React.useState<TService[]>([]);

  const getAllOwnedThrones = React.useCallback(() => {
    contracts.RefThrone?.methods
      .getAllOwnedThrones()
      .call<TService[]>()
      .then((res) => {
        setData(res);
      });
  }, [contracts.RefThrone]);

  React.useEffect(() => {
    // web3Client?.eth.
    // console.log(web3Client?.eth.defaultAccount);
    getAllOwnedThrones();
  }, [getAllOwnedThrones]);

  // console.log(account);
  // console.log({ chainId, account, isActive });
  // id: BigInt;
  // benefitAmount: BigInt;
  // benefitType: "USDT";
  // linkUrl: string;
  // name: string;
  // referralCode: string;
  // referrer: string;
  // serviceType: "CEX" | "DEX";
  // statis: BigInt;
  // torAmount: BigInt;
  // timestamp: BigInt;

  const Columns: DataRowProps[] = React.useMemo(
    () =>
      [
        {
          field: "name",
          displayName: "Throne",
          width: 140,
          value: (row: TService) => row.name,
        },
        {
          field: "serviceType",
          displayName: "Service Type",
          width: 140,
          value: (row: TService) => row.serviceType,
        },
        {
          field: "referrer",
          displayName: "Referrer",
          width: 140,
          value: (row: TService) =>
            `${row.referrer.substring(0, 5)}...${row.referrer.substring(
              row.referrer.length - 2
            )}`,
        },
        {
          field: "referralCode",
          displayName: "Referral Code",
          width: 130,
          value: (row: TService) => row.referralCode,
        },
        {
          field: "benefit",
          displayName: "Benefit",
          width: 150,
          value: (row: TService) => `${row.benefitAmount} ${row.benefitType}`,
        },
        {
          field: "torAmount",
          displayName: "Price of the throne",
          width: 170,
          value: (row: TService) => (
            <div className="flex items-center">
              <span>{row.torAmount.toString()}</span>
              <Button
                className="mx-1"
                onClick={() => {
                  setOpen(true);
                  setSelected(row);
                }}
              >
                <SwordIcon className="w-6 h-6 fill-primary" />
              </Button>
            </div>
          ),
        },
        {
          field: "linkUrl",
          displayName: "Link [Verified]",
          width: "*",
          value: (row: TService) =>
            row.linkUrl.length > 30
              ? `${row.linkUrl.substring(0, 16)}...${row.linkUrl.substring(
                  row.linkUrl.length - 6
                )}`
              : row.linkUrl,
        },
      ] as DataRowProps[],
    []
  );

  const handleClose = React.useCallback(() => {
    setOpen(false);
    setSelected(undefined);
  }, []);

  const openNewReferral = React.useCallback(() => {}, []);

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
          <div className="mt-2 flex flex-wrap justify-between items-center">
            <Search
              id="search_referral"
              className="w-full max-w-[calc(100%_-_220px)] shrink px-2 py-1 bg-transparent"
              onChange={onChange}
            />
            <Button className="w-[190px] py-1" onClick={openNewReferral}>
              + Create New Throne
            </Button>
          </div>
          <DataTable columns={Columns} data={data} />
        </div>
      </div>
      <UsurpReferralModal open={open} data={selected} onClose={handleClose} />
      {/* <UsurpReferralModal open={open} data={selected} onClose={handleClose} /> */}
    </div>
  );
}
