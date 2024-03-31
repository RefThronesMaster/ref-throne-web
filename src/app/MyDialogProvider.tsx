"use client";

import React from "react";

import {
  ConfirmDialog,
  TConfirmDialogProps,
  TYesOrNoDialogProps,
  YesOrNoDialog,
} from "@/components";

type TDialogOption = Pick<
  TYesOrNoDialogProps,
  "title" | "children" | "onClose" | "onConfirm"
> & {
  modal?: "YesOrNo" | "Confirm";
};

type TMyDialogContext = {
  open: (options: TDialogOption) => void;
  close: () => void;
  setTransacting: (transacting: boolean) => void;
  transacting: boolean;
};

export const MyDialogContext = React.createContext<TMyDialogContext>({
  open: (options: TDialogOption) => {},
  close: () => {},
  setTransacting: (transacting: boolean) => {},
  transacting: false,
});

type TMyDialogState = TDialogOption & { open: boolean };

const initValues: TMyDialogState = {
  open: false,
  title: "",
};

export const MyDialogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [values, setValues] = React.useState<TMyDialogState>(initValues);
  const [transacting, setTransacting] = React.useState<boolean>(false);

  const open = React.useCallback((options: TDialogOption) => {
    setValues({
      open: true,
      ...options,
    });
  }, []);

  const close = React.useCallback(() => {
    setValues(initValues);
  }, []);

  return (
    <MyDialogContext.Provider
      value={{ open, close, setTransacting, transacting }}
    >
      {children}
      {values.modal == "YesOrNo" ? (
        <YesOrNoDialog
          open={values.open}
          title={values.title}
          onConfirm={values.onConfirm ?? close}
          transacting={transacting}
          onClose={values.onClose ?? close}
        >
          {values.children}
        </YesOrNoDialog>
      ) : (
        <ConfirmDialog
          open={values.open}
          title={values.title}
          transacting={transacting}
          onClose={values.onClose ?? close}
        >
          {values.children}
        </ConfirmDialog>
      )}
    </MyDialogContext.Provider>
  );
};
