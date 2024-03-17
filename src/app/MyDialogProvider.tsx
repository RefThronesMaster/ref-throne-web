"use client";

import React from "react";

import {ConfirmDialog, TConfirmDialogProps} from "@/components";

type TDialogOption = Pick<
	TConfirmDialogProps,
	"title" | "children" | "onClose"
>;

type TMyDialogContext = {
	open: (options: TDialogOption) => void;
	close: () => void;
};

export const MyDialogContext = React.createContext<TMyDialogContext>({
	open: (options: TDialogOption) => {},
	close: () => {},
});

const initValues: TConfirmDialogProps = {
	open: false,
	title: "",
};

export const MyDialogProvider = ({children}: {children: React.ReactNode}) => {
	const [values, setValues] = React.useState<TConfirmDialogProps>(initValues);

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
		<MyDialogContext.Provider value={{open, close}}>
			{children}
			<ConfirmDialog
				open={values.open}
				title={values.title}
				onClose={values.onClose ?? close}
			>
				{values.children}
			</ConfirmDialog>
		</MyDialogContext.Provider>
	);
};
