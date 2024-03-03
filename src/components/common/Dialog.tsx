"use client";

import React, { MouseEvent } from "react";
import { Button } from "@/components/common/Button";

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
  const wrapperRef = React.createRef<HTMLDivElement>();
  const beforeRef = React.useRef<HTMLElement>();

  const handleWrapper = React.useCallback((evt: MouseEvent<HTMLElement>) => {
    evt.stopPropagation();
  }, []);

  const handleMouseDown = React.useCallback(
    (event: MouseEvent<HTMLElement>) => {
      beforeRef.current = event.target as HTMLElement;
    },
    []
  );

  const handleMouseUp = React.useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (
        beforeRef.current == wrapperRef.current &&
        beforeRef.current == (event.target as HTMLElement)
      ) {
        onClose && onClose();
      }
      beforeRef.current = undefined;
    },
    [wrapperRef, onClose]
  );

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 flex items-center justify-center w-full h-screen z-[98] backdrop-blur-sm bg-white/30 touch-none"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div
        className="w-[calc(100%_-_32px)] md:max-w-[480px] border border-white bg-black text-white rounded-lg p-4"
        onClick={handleWrapper}
        onMouseUp={handleWrapper}
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
