import React, { ChangeEvent } from "react";
import { DataInfo, InputData, Dialog } from ".";
import type { TService } from ".";

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

export const NewReferralModal = ({
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
