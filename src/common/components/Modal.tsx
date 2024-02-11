"use client";

import React from "react";
import { Button, Dialog } from ".";

type DialogProps = {
  open: boolean;
  title: string | React.ReactNode;
  children?: React.ReactNode;
  btnConfirm?: {
    label?: string | React.ReactNode;
    btnClass?: string;
    onClick?: () => void;
  };
  btnClose?: {
    label?: string | React.ReactNode;
    btnClass?: string;
    onClick?: () => void;
  };
  onClose?: () => void;
};

// export const UsurpReferralModal = () => {
//   return <Dialog>asdsadad</Dialog>;
// };
