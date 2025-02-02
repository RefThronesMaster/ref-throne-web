"use client";

import Image from "next/image";
import React, { ChangeEvent } from "react";
import {
  Button,
  Search,
  SwordIcon,
  DataTable,
  DataRowProps,
} from "@/components/common";
import { TThrone, UsurpReferralDialog, NewReferralDialog } from "@/components";
import { MyWeb3Context } from "../MyWeb3Provider";
import { BENEFIT_TYPE_LABEL } from "@/components/types";
import Link from "next/link";

type SORT = {
  field: string;
  order: "ASC" | "DESC";
};

const defaultSort: SORT = {
  field: "torAmount",
  order: "DESC",
};

export default function PageReferral() {
  const [openUsurpDialog, setOpenUsurpDialog] = React.useState<boolean>(false);
  const [openNewDialog, setOpenNewDialog] = React.useState<boolean>(false);
  const [selectedId, setSelectedId] = React.useState<BigInt | undefined>();
  const [search, setSearch] = React.useState<string>("");
  const { contracts, account, utils } = React.useContext(MyWeb3Context);

  const [sort, setSort] = React.useState<SORT>(defaultSort);

  const handleSearch = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
    },
    []
  );

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

  const [data, setData] = React.useState<TThrone[]>([]);

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
        case "torAmount":
          return front.torAmount.valueOf() - back.torAmount.valueOf() >
            BigInt(0)
            ? 1
            : -1;
        case "benefitAmount":
          return front.benefitAmount.valueOf() - back.benefitAmount.valueOf() >
            BigInt(0)
            ? 1
            : -1;
        case "name":
          return front.name > back.name ? 1 : -1;
        case "serviceType":
          return front.serviceType > back.serviceType ? 1 : -1;
        default:
          return 0;
      }
    },
    [sort]
  );

  const getAllOwnedThrones = React.useCallback(async () => {
    try {
      const result = await contracts.RefThrone?.methods
        .getAllOwnedThrones()
        .call<TThrone[]>();
      setData(result ?? []);
    } catch (err) {
      console.log(err);
    }
  }, [contracts.RefThrone]);

  React.useEffect(() => {
    getAllOwnedThrones();
  }, [getAllOwnedThrones]);

  const Columns: DataRowProps[] = React.useMemo(
    () =>
      [
        {
          field: "name",
          displayName: "Throne",
          width: 140,
          sortable: true,
          value: (row: TThrone) => row.name,
        },
        {
          field: "serviceType",
          displayName: "Service Type",
          width: 140,
          sortable: true,
          value: (row: TThrone) => row.serviceType,
        },
        {
          field: "referrer",
          displayName: "Referrer",
          width: 140,
          value: (row: TThrone) =>
            `${row.referrer.substring(0, 5)}...${row.referrer.substring(
              row.referrer.length - 2
            )}`,
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
          width: 150,
          sortable: true,
          value: (row: TThrone) =>
            `${utils?.fromWei(row.benefitAmount.toString())} ${
              BENEFIT_TYPE_LABEL[row.benefitType]
            }`,
        },
        {
          field: "torAmount",
          displayName: "Price of the throne",
          width: 170,
          sortable: true,
          value: (row: TThrone) => (
            <div className="flex items-center">
              <span>
                {Intl.NumberFormat("en-US").format(
                  Number(utils?.fromWei(row.torAmount.toString()))
                )}{" "}
                TOR
              </span>
              <Button
                className="mx-1"
                onClick={() => {
                  setOpenUsurpDialog(true);
                  setSelectedId(row.id);
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
      ] as DataRowProps[],
    [utils?.fromWei]
  );

  const handleUsurpDialogClose = React.useCallback(() => {
    setOpenUsurpDialog(false);
    setSelectedId(undefined);
  }, []);

  const handleNewDialogClose = React.useCallback(() => {
    setOpenNewDialog(false);
  }, []);

  const openNewReferral = React.useCallback(() => {
    setOpenNewDialog(true);
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
          <div className="mt-2 flex flex-wrap justify-between items-center">
            <Search
              id="search_referral"
              className="w-full max-w-[calc(100%_-_220px)] shrink px-2 py-1 bg-transparent"
              onChange={handleSearch}
            />
            <Button className="w-[190px] py-1" onClick={openNewReferral}>
              + Create New Throne
            </Button>
          </div>
          <DataTable
            columns={Columns}
            data={data
              .filter(
                (item) =>
                  item.referralCode
                    .toUpperCase()
                    .includes(search.toUpperCase()) ||
                  item.serviceType
                    .toUpperCase()
                    .includes(search.toUpperCase()) ||
                  item.name.toUpperCase().includes(search.toUpperCase())
              )
              .sort(handleSort)}
            sort={sort}
            onChangeSort={handleChangeSort}
          />
        </div>
      </div>
      <UsurpReferralDialog
        open={openUsurpDialog}
        dataId={selectedId}
        onClose={handleUsurpDialogClose}
      />
      <NewReferralDialog open={openNewDialog} onClose={handleNewDialogClose} />
    </div>
  );
}
