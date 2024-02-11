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
    disabled?: boolean;
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
  const handleWrapper = React.useCallback((evt: any) => {
    evt.stopPropagation();
  }, []);

  return (
    <div
      className="fixed top-0 left-0 flex items-center justify-center w-full h-screen z-[98] backdrop-blur-sm bg-white/30 touch-none"
      onClick={onClose}
    >
      <div
        className="w-[calc(100%_-_32px)] md:max-w-[480px] border border-white bg-black text-white rounded-lg p-4"
        onClick={handleWrapper}
      >
        <div className="p-1 text-center text-primary text-lg chakra-petch-medium">
          {title}
        </div>
        <div className="my-4">{children}</div>
        <div className="text-center">
          {btnClose?.label && (
            <Button className={btnClose?.btnClass} onClick={btnClose?.onClick}>
              {btnClose.label}
            </Button>
          )}
          {btnConfirm?.label && (
            <Button
              className={btnConfirm?.btnClass}
              disabled={btnConfirm?.disabled}
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
