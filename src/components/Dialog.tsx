import React, { ChangeEvent } from "react";
import { DataInfo, InputData, Modal, SelectData } from "@/components/common";

import { MyAccountContext } from "@/app/MyAccountProvider";
import { RefThroneContract } from "@/libs/web3/contracts";
import {
  BENEFIT_TYPE_LABEL,
  TBenefitType,
  TThrone,
  TServiceType,
} from "@/components/types";

type DialogProps = {
  open: boolean;
  onClose?: () => void;
};

type UsurpReferralDialog = DialogProps & {
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

export const UsurpReferralDialog = ({
  open,
  dataId,
  onClose,
}: UsurpReferralDialog) => {
  const { account, utils, contracts } = React.useContext(MyAccountContext);
  const [formData, setFormData] = React.useState<TFormReferral>(
    initFormUsurpReferral
  );
  const [transacting, setTransacting] = React.useState<boolean>(false);
  const [data, setData] = React.useState<TThrone | undefined>();

  const getThroneById = React.useCallback(
    async (id: BigInt) => {
      try {
        const result = await contracts.RefThrone?.methods
          .getThroneById(id)
          .call<TThrone>();
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
      if (id == "benefitAmount" || id == "torAmount") {
        const floatVal = parseFloat(value);
        if (!Number.isNaN(floatVal) && floatVal >= 0) {
          setFormData((oldValue) => ({ ...oldValue, [id]: value }));
        }
      } else {
        setFormData((oldValue) => ({ ...oldValue, [id]: value }));
      }
    },
    []
  );

  const disabled = React.useMemo(() => {
    if (!formData.linkUrl) return true;
    if (!formData.referralCode) return true;
    if (formData.benefitAmount < 0) return true;
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
    async (data?: TThrone, formData?: TFormReferral) => {
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
    <Modal
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
    </Modal>
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

export const NewReferralDialog = ({ open, onClose }: DialogProps) => {
  const { account, utils, contracts } = React.useContext(MyAccountContext);
  const [formData, setFormData] =
    React.useState<TNewFormReferral>(initFormNewReferral);
  const [serviceTypes, setServiceTypes] = React.useState<TServiceType[]>([]);
  const [benefitTypes, setBenefitTypes] = React.useState<TBenefitType[]>([]);
  const [transacting, setTransacting] = React.useState<boolean>(false);

  const getServiceTypes = React.useCallback(async () => {
    try {
      const result = await contracts.RefThrone?.methods
        .getServiceTypes()
        .call<TServiceType[]>();
      setServiceTypes(result ?? []);
    } catch (err) {
      console.log(err);
    }
  }, [contracts]);

  const getBenefitTypes = React.useCallback(async () => {
    try {
      const result = await contracts.RefThrone?.methods
        .getBenefitTypes()
        .call<TBenefitType[]>();
      setBenefitTypes(result ?? []);
    } catch (err) {
      console.log(err);
    }
  }, [contracts]);

  React.useEffect(() => {
    getServiceTypes();
    getBenefitTypes();
    return () => {
      setFormData(initFormNewReferral);
    };
  }, [open, getServiceTypes, getBenefitTypes]);

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
    <Modal
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
        className="pl-2"
        value={formData.name}
        onChange={handleChange}
        type="text"
      />
      <SelectData
        id="serviceType"
        label="Service Type"
        className="pl-2"
        value={formData.serviceType}
        onChange={handleSelectChange}
        options={serviceTypes.map((type) => ({
          label: type,
          value: type,
        }))}
      />
      <SelectData
        id="benefitType"
        label="Benefit Type"
        className="pl-2"
        value={formData.benefitType}
        onChange={handleSelectChange}
        options={benefitTypes.map((type) => ({
          label: BENEFIT_TYPE_LABEL[type],
          value: type,
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
    </Modal>
  ) : (
    <></>
  );
};

export type TConfirmDialogProps = DialogProps & {
  disabled?: boolean;
  title: string | React.ReactNode;
  children?: React.ReactNode;
  transacting?: boolean;
};

export const ConfirmDialog = ({
  open,
  onClose,
  title,
  transacting,
  children,
}: TConfirmDialogProps) => {
  return open ? (
    <Modal
      title={title}
      onClose={transacting ? () => {} : onClose}
      btnConfirm={{
        label: "Confirm",
        onClick: onClose,
        disabled: transacting,
        btnClass:
          "border-camo-500 bg-camo-500 text-primary chakra-petch-medium rounded-md w-[180px] py-1 active:bg-camo-300 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-500",
      }}
    >
      {children}
    </Modal>
  ) : (
    <></>
  );
};

export type TYesOrNoDialogProps = TConfirmDialogProps & {
  onConfirm?: () => void;
};

export const YesOrNoDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  transacting,
  children,
}: TYesOrNoDialogProps) => {
  console.log({ transacting });
  return open ? (
    <Modal
      title={title}
      onClose={onClose}
      transacting={transacting}
      btnConfirm={{
        label: "Yes",
        onClick: onConfirm,
        btnClass:
          "border-camo-500 bg-camo-500 text-primary chakra-petch-medium rounded-md w-[180px] py-1 active:bg-camo-300 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-500",
      }}
      btnClose={{
        label: "No",
        onClick: onClose,
        btnClass:
          "border-camo-500 bg-camo-500 text-primary chakra-petch-medium rounded-md w-[180px] py-1 active:bg-camo-300 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-500",
      }}
    >
      {children}
    </Modal>
  ) : (
    <></>
  );
};
