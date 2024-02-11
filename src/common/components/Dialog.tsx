"use client";

import React from "react";
import { Button } from ".";

type DialogProps = {
  // open: boolean;
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

export const Dialog = ({
  // open,
  title,
  children,
  btnConfirm,
  btnClose,
  onClose,
}: DialogProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-[99] bg-white bg-opacity-30">
      <div className="w-[calc(100%_-_32px)] md:max-w-[480px] border border-white bg-black text-white rounded-lg p-2">
        <div className="p-3 text-center text-primary text-lg chakra-petch-medium">{title}</div>
        <div className="">{children}</div>
        <div className="">
          {btnClose?.label && (
            <Button className={btnClose?.btnClass} onClick={btnClose?.onClick}>
              {btnClose.label}
            </Button>
          )}
          {btnConfirm?.label && (
            <Button
              className={btnConfirm?.btnClass}
              onClick={btnConfirm?.onClick}
            >
              {btnConfirm.label}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
