"use client";

import Image from "next/image";
import { AccountContext } from "./AccountProvider";
import React, { ChangeEvent } from "react";
import {
  Button,
  Search,
  SwordIcon,
  DataTable,
  DataRowProps,
  Dialog,
} from "@/common/components";

const SampleRecords = [
  {
    service: "Binance",
    serviceType: "CEX",
    referrer: "0xC2334441231233",
    referral_code: "HBD887JH",
    benefit: "30% discount on fees",
    price: 20000,
    link: "https://hhydasdasdasda.co.kr",
  },
  {
    service: "OKX",
    serviceType: "CEX",
    referrer: "0x98HASDSADB7D",
    referral_code: "NMO187hJ",
    benefit: "200 USDT",
    price: 15000,
    link: "https://okxd.asssdsd.co.kr",
  },
];

type TService = {
  service: string;
  serviceType: "CEX" | "DEX";
  referrer: string;
  referral_code: string;
  benefit: string;
  price: number;
  link: string;
};

export default function PageMain() {
  const { accounts, reqAccounts, getPermissions } =
    React.useContext(AccountContext);
  const onChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  const Columns: DataRowProps[] = React.useMemo(
    () => [
      {
        field: "service",
        displayName: "Throne",
        value: (row: TService) => row.service,
      },
      {
        field: "serviceType",
        displayName: "Service Type",
        value: (row: TService) => row.serviceType,
      },
      {
        field: "referrer",
        displayName: "Referrer",
        value: (row: TService) => row.referrer,
      },
      {
        field: "referral_code",
        displayName: "Referral Code",
        value: (row: TService) => row.referral_code,
      },
      {
        field: "benefit",
        displayName: "Benefit",
        value: (row: TService) => row.benefit,
      },
      {
        field: "price",
        displayName: "Price of the throne",
        value: (row: TService) => (
          <div className="flex items-center justify-end">
            <span>{row.price}</span>
            <span>
              <Button
                onClick={() => {
                  console.log(row);
                }}
              >
                <SwordIcon className="ml-1 w-6 h-6 fill-primary" />
              </Button>
            </span>
          </div>
        ),
      },
      {
        field: "link",
        displayName: "Link [Verified]",
        value: (row: TService) => row.link,
      },
    ],
    []
  );

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
      {/* <UsurpReferralModal open={true} /> */}
    </div>
  );
}

type ModalProps = {
  open: boolean;
};
type UsurpReferralModal = ModalProps & {
  data?: TService;
};

export const UsurpReferralModal = ({ open, data }: UsurpReferralModal) => {
  return open ? (
    <Dialog title={"Usurp the Referral Throne"}>
      <div>
        <label>
          <span>Service</span>
          <span>{data?.service}</span>
        </label>
      </div>
      <div>
        <label>
          <span>Service Type</span>
          <span>{data?.serviceType}</span>
        </label>
      </div>
    </Dialog>
  ) : (
    <></>
  );
};
