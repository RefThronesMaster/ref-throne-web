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
} from "@/common/components";

const SampleRecords: TService[] = [
  {
    service: "Binance",
    serviceType: "CEX",
    referrer: "0xC2334441231233",
    referral_code: "HBD887JH",
    benefit: "30",
    benefitType: "% discount on fees",
    price: 20000,
    link: "https://hhydasdasdasda.co.kr",
  },
  {
    service: "OKX",
    serviceType: "CEX",
    referrer: "0x98HASDSADB7D",
    referral_code: "NMO187hJ",
    benefit: "200",
    benefitType: "USDT",
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
  benefitType?: string;
  price: number;
  link: string;
};

export default function PageReferral() {
  // const { web3Client, account } = React.useContext(AppContext);
  const onChange = React.useCallback((event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  }, []);

  const [open, setOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<TService | undefined>();
  // const { chainId, account, isActive } = useWeb3React();

  React.useEffect(() => {
    // web3Client?.eth.
    // console.log(web3Client?.eth.defaultAccount);
  }, []);
  // console.log(account);
  // console.log({ chainId, account, isActive });
  const Columns: DataRowProps[] = React.useMemo(
    () =>
      [
        {
          field: "service",
          displayName: "Throne",
          width: 140,
          value: (row: TService) => row.service,
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
          field: "referral_code",
          displayName: "Referral Code",
          width: 130,
          value: (row: TService) => row.referral_code,
        },
        {
          field: "benefit",
          displayName: "Benefit",
          width: 150,
          value: (row: TService) => `${row.benefit} ${row.benefitType}`,
        },
        {
          field: "price",
          displayName: "Price of the throne",
          width: 170,
          value: (row: TService) => (
            <div className="flex items-center">
              <span>{row.price}</span>
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
          field: "link",
          displayName: "Link [Verified]",
          width: "*",
          value: (row: TService) =>
            `${row.link.substring(0, 16)}...${row.link.substring(
              row.link.length - 6
            )}`,
        },
      ] as DataRowProps[],
    []
  );

  const handleClose = React.useCallback(() => {
    setOpen(false);
    setSelected(undefined);
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
      <UsurpReferralModal open={open} data={selected} onClose={handleClose} />
    </div>
  );
}

type ModalProps = {
  open: boolean;
  onClose?: () => void;
};
type UsurpReferralModal = ModalProps & {
  data?: TService;
};

type TFormUsurpReferral = {
  benefit: number;
  deposit: number;
  referral_code: string;
  url: string;
};

const initFormUsurpReferral = {
  benefit: 0,
  deposit: 0,
  referral_code: "",
  url: "",
} as const;

export const UsurpReferralModal = ({
  open,
  data,
  onClose,
}: UsurpReferralModal) => {
  const [formData, setFormData] = React.useState<TFormUsurpReferral>(
    initFormUsurpReferral
  );

  React.useEffect(() => {
    return () => {
      setFormData(initFormUsurpReferral);
    };
  }, [open, data]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      if ((id == "benefit" || id == "deposit") && parseFloat(value) <= 0) {
        setFormData((oldValue) => ({ ...oldValue, [id]: 0 }));
      } else {
        setFormData((oldValue) => ({ ...oldValue, [id]: value }));
      }
    },
    []
  );

  const disabled = React.useMemo(() => {
    if (!formData.url) return true;
    if (!formData.referral_code) return true;
    if (formData.benefit <= 0) return true;
    if (formData.deposit <= 0) return true;

    return false;
  }, [formData]);

  return open ? (
    <Dialog
      title={"Usurp the Referral Throne"}
      onClose={onClose}
      btnConfirm={{
        label: "Register",
        disabled: disabled,
        btnClass:
          "border-camo-500 bg-camo-500 text-primary chakra-petch-medium rounded-md w-[180px] py-1 active:bg-camo-300 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-300",
      }}
    >
      <DataInfo label={"Service"} value={data?.service} />
      <DataInfo label={"Service Type"} value={data?.serviceType} />
      <DataInfo label={"Benefit Type"} value={data?.benefitType} />
      <DataInfo label={"Currnet Benefit"} value={data?.benefit} />
      <DataInfo label={"Current Deposited TOR"} value={"undefined TOR"} />
      <InputData
        id="benefit"
        label="New Benefit"
        className="pl-2 text-right"
        value={formData.benefit}
        onChange={handleChange}
        type="number"
      />
      <InputData
        id="deposit"
        label="New TOR Deposit"
        className="pl-2 text-right"
        value={formData.deposit}
        onChange={handleChange}
        type="number"
      />
      <InputData
        id="referral_code"
        label="New Referral Code"
        className="pl-2"
        value={formData.referral_code}
        onChange={handleChange}
        type="text"
      />
      <InputData
        id="url"
        label="New Referral URL"
        className="pl-2"
        value={formData.url}
        onChange={handleChange}
        type="text"
      />
    </Dialog>
  ) : (
    <></>
  );
};

type DataInfoProps = {
  label: string;
  value: string | number | React.ReactNode;
};

export const DataInfo = React.memo(function FnDataInfo({
  label,
  value,
}: DataInfoProps) {
  return (
    <div className="mt-1">
      <label>
        <span className="text-camo-400 mr-4">{label}:</span>
        <span>{value}</span>
      </label>
    </div>
  );
});

type InputDataProps = DataInfoProps & {
  id?: string;
  className?: string;
  type?: HTMLInputTypeAttribute;
  value: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const InputData = ({
  id,
  className,
  label,
  type,
  value,
  onChange,
}: InputDataProps) => (
  <div className="mt-1">
    <label className="flex items-center">
      <span className="text-primary mr-4">{label}:</span>
      <Input
        className={
          "flex-grow rounded-sm border border-primary bg-transparent" +
          (className ? ` ${className}` : "")
        }
        id={id}
        type={type}
        value={value}
        onChange={onChange}
      />
    </label>
  </div>
);
