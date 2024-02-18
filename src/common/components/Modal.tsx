import React, { ChangeEvent } from "react";
import { DataInfo, InputData, Dialog, SelectData } from ".";
import type { TService } from ".";
import { MyAccountContext } from "@/app/MyAccountProvider";
import { RefThroneContract } from "@/libs/web3/abi";
import { BENEFIT_LABEL, TBenefit } from "@/common/components/types";

type ModalProps = {
  open: boolean;
  onClose?: () => void;
};

type UsurpReferralModal = ModalProps & {
  // data?: TService;
  dataId?: BigInt;
};

type TFormReferral = {
  benefitAmount: number;
  torAmount: number;
  referralCode: string;
  linkUrl: string;
};

const initFormUsurpReferral = {
  benefitAmount: 0,
  torAmount: 0,
  referralCode: "",
  linkUrl: "",
} as const;

// const defaultData: TService = {
//   id: BigInt(-1),
//   benefitAmount: BigInt(0),
//   serviceType: "CEX",
//   benefitType: "USDT",
//   status: BigInt(-1),
//   timestamp: BigInt(-1),
//   torAmount: BigInt(-1),
//   linkUrl: "",
//   name: "",
//   referralCode: "",
//   referrer: "",
// };

export const UsurpReferralModal = ({
  open,
  dataId,
  onClose,
}: UsurpReferralModal) => {
  const { account, utils, contracts } = React.useContext(MyAccountContext);
  const [formData, setFormData] = React.useState<TFormReferral>(
    initFormUsurpReferral
  );
  const [transacting, setTransacting] = React.useState<boolean>(false);
  const [data, setData] = React.useState<TService | undefined>();

  const getThroneById = React.useCallback(
    async (id: BigInt) => {
      try {
        const result = await contracts.RefThrone?.methods
          .getThroneById(id)
          .call<TService>();
        setData(result);
      } catch (err) {
        console.log(err);
      }
    },
    [contracts.RefThrone]
  );

  React.useEffect(() => {
    if (open && dataId) {
      getThroneById(dataId);
    }

    return () => {
      setData(undefined);
      setFormData(initFormUsurpReferral);
    };
  }, [open, dataId, getThroneById]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      if (
        (id == "benefitAmount" || id == "torAmount") &&
        parseFloat(value) <= 0
      ) {
        setFormData((oldValue) => ({ ...oldValue, [id]: 0 }));
      } else {
        setFormData((oldValue) => ({ ...oldValue, [id]: value }));
      }
    },
    []
  );

  const disabled = React.useMemo(() => {
    if (!formData.linkUrl) return true;
    if (!formData.referralCode) return true;
    if (formData.benefitAmount <= 0) return true;
    if (formData.torAmount <= 0) return true;

    const currentBenefitAmount = BigInt(data?.benefitAmount.toString() ?? "");
    const newBenefitAmount = BigInt(utils.toWei(formData.benefitAmount));
    const currentTorAmount = BigInt(data?.torAmount.toString() ?? "");
    const newTorAmount = BigInt(utils.toWei(formData.torAmount));

    if (
      newBenefitAmount > currentBenefitAmount ||
      (newBenefitAmount == currentBenefitAmount &&
        newTorAmount > currentTorAmount)
    ) {
      return false;
    }

    return true;
  }, [formData, data, utils]);

  const transact = React.useCallback(
    async (data?: TService, formData?: TFormReferral) => {
      if (data && formData && account) {
        try {
          setTransacting(true);
          const torAmount = utils.toWei(formData?.torAmount);

          const allowance = await contracts.TORToken?.methods
            .allowance(account, RefThroneContract.ADDRESS)
            .call<bigint>();
          console.log({ torAmount });

          if (!allowance || allowance < BigInt(torAmount)) {
            console.log("need approve");
            await contracts.TORToken?.methods
              .approve(
                RefThroneContract.ADDRESS,
                BigInt("1267650600228229401496703205376")
              )
              .send({ from: account });
            console.log("approved");
          }

          await contracts.RefThrone?.methods
            .requestDepositForThrone(
              data?.name,
              data?.serviceType,
              data?.benefitType,
              utils.toWei(formData?.benefitAmount),
              formData?.referralCode,
              torAmount,
              formData?.linkUrl
            )
            .send({ from: account });
          return true;
        } catch (err) {
          console.log(err);
        } finally {
          setTransacting(false);
        }
      }
      return false;
    },

    [contracts.RefThrone, account, utils, setTransacting]
  );

  const handleSubmit = React.useCallback(() => {
    transact(data, formData).then((success) => {
      success && onClose && onClose();
    });
  }, [formData, data, transact, onClose]);

  return open ? (
    <Dialog
      title={"Usurp the Referral Throne"}
      onClose={onClose}
      btnConfirm={{
        label: transacting ? "Transacting" : "Register",
        onClick: handleSubmit,
        disabled: transacting || disabled,
        btnClass:
          "border-camo-500 bg-camo-500 text-primary chakra-petch-medium rounded-md w-[180px] py-1 active:bg-camo-300 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-500",
      }}
    >
      <DataInfo label={"Service"} value={data?.name ?? "-"} />
      <DataInfo label={"Service Type"} value={data?.serviceType ?? "-"} />
      <DataInfo label={"Benefit Type"} value={data?.benefitType ?? "-"} />
      <DataInfo
        label={"Current Benefit"}
        value={data ? utils.fromWei(data?.benefitAmount.toString() ?? "") : "-"}
      />
      <DataInfo
        label={"Current Deposited TOR"}
        value={
          data ? `${utils.fromWei(data?.torAmount.toString() ?? "")} TOR` : "-"
        }
      />
      <InputData
        id="benefitAmount"
        label="New Benefit"
        className="pl-2 text-right"
        value={formData.benefitAmount}
        onChange={handleChange}
        type="number"
      />
      <InputData
        id="torAmount"
        label="New TOR Deposit"
        className="pl-2 text-right"
        value={formData.torAmount}
        onChange={handleChange}
        type="number"
      />
      <InputData
        id="referralCode"
        label="New Referral Code"
        className="pl-2"
        value={formData.referralCode}
        onChange={handleChange}
        type="text"
      />
      <InputData
        id="linkUrl"
        label="New Referral URL"
        className="pl-2"
        value={formData.linkUrl}
        onChange={handleChange}
        type="text"
      />
    </Dialog>
  ) : (
    <></>
  );
};

type TNewFormReferral = TFormReferral & {
  name: "";
  serviceType: string;
  benefitType: string;
};

const initFormNewReferral = {
  name: "",
  serviceType: "",
  benefitType: "",
  benefitAmount: 0,
  torAmount: 0,
  referralCode: "",
  linkUrl: "",
} as const;

export const NewReferralModal = ({ open, onClose }: ModalProps) => {
  const { account, utils, contracts } = React.useContext(MyAccountContext);
  const [formData, setFormData] =
    React.useState<TNewFormReferral>(initFormNewReferral);
  const [transacting, setTransacting] = React.useState<boolean>(false);

  React.useEffect(() => {
    return () => {
      setFormData(initFormNewReferral);
    };
  }, [open]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      if (
        (id == "benefitAmount" || id == "torAmount") &&
        parseFloat(value) <= 0
      ) {
        setFormData((oldValue) => ({ ...oldValue, [id]: 0 }));
      } else {
        setFormData((oldValue) => ({ ...oldValue, [id]: value }));
      }
    },
    []
  );

  const handleSelectChange = React.useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { id, value } = event.target;
      setFormData((oldValue) => ({ ...oldValue, [id]: value }));
    },
    []
  );

  const disabled = React.useMemo(() => {
    if (!formData.linkUrl) return true;
    if (!formData.referralCode) return true;
    if (formData.benefitAmount <= 0) return true;
    if (formData.torAmount <= 0) return true;

    return false;
  }, [formData]);

  const transact = React.useCallback(
    async (formData?: TNewFormReferral) => {
      if (formData && account) {
        try {
          setTransacting(true);
          const torAmount = utils.toWei(formData?.torAmount);

          const allowance = await contracts.TORToken?.methods
            .allowance(account, RefThroneContract.ADDRESS)
            .call<bigint>();
          console.log({ torAmount });

          if (!allowance || allowance < BigInt(torAmount)) {
            console.log("need approve");
            await contracts.TORToken?.methods
              .approve(
                RefThroneContract.ADDRESS,
                BigInt("1267650600228229401496703205376")
              )
              .send({ from: account });
            console.log("approved");
          }

          await contracts.RefThrone?.methods
            .requestDepositForThrone(
              formData.name,
              formData.serviceType,
              formData.benefitType,
              utils.toWei(formData?.benefitAmount),
              formData?.referralCode,
              torAmount,
              formData?.linkUrl
            )
            .send({ from: account });
          return true;
        } catch (err) {
          console.log(err);
        } finally {
          setTransacting(false);
        }
      }
      return false;
    },

    [contracts.RefThrone, account, utils, setTransacting]
  );

  const handleSubmit = React.useCallback(() => {
    transact(formData).then((success) => {
      success && onClose && onClose();
    });
  }, [formData, transact, onClose]);

  return open ? (
    <Dialog
      title={"Create New Referral Throne"}
      onClose={onClose}
      btnConfirm={{
        label: transacting ? "Transacting" : "Register",
        onClick: handleSubmit,
        disabled: transacting || disabled,
        btnClass:
          "border-camo-500 bg-camo-500 text-primary chakra-petch-medium rounded-md w-[180px] py-1 active:bg-camo-300 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-500",
      }}
    >
      <InputData
        id="name"
        label="New Service"
        className="pl-2 text-right"
        value={formData.name}
        onChange={handleChange}
        type="text"
      />
      <InputData
        id="serviceType"
        label="Service Type"
        className="pl-2 text-right"
        value={formData.serviceType}
        onChange={handleChange}
        type="text"
      />
      <SelectData
        id="benefitType"
        label="Benefit Type"
        className="pl-2"
        value={formData.benefitType}
        onChange={handleSelectChange}
        options={Object.keys(BENEFIT_LABEL).map((key: string) => ({
          label: BENEFIT_LABEL[key as TBenefit],
          value: key,
        }))}
      />
      <InputData
        id="benefitAmount"
        label="Benefit"
        className="pl-2 text-right"
        value={formData.benefitAmount}
        onChange={handleChange}
        type="number"
      />
      <InputData
        id="torAmount"
        label="TOR Deposit"
        className="pl-2 text-right"
        value={formData.torAmount}
        onChange={handleChange}
        type="number"
      />
      <InputData
        id="referralCode"
        label="New Referral Code"
        className="pl-2"
        value={formData.referralCode}
        onChange={handleChange}
        type="text"
      />
      <InputData
        id="linkUrl"
        label="New Referral URL"
        className="pl-2"
        value={formData.linkUrl}
        onChange={handleChange}
        type="text"
      />
    </Dialog>
  ) : (
    <></>
  );
};
