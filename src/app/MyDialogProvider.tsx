"use client";

import React, {Suspense} from "react";
import Web3, {
	BaseWeb3Error,
	Contract,
	ContractAbi,
	RpcError,
	Web3ContractError,
	Web3WSProviderError,
} from "web3";
import {Web3ReactHooks, useWeb3React} from "@web3-react/core";
import {Web3ReactProvider} from "@web3-react/core";
import type {MetaMask} from "@web3-react/metamask";
import {hooks, metaMask} from "@/libs/web3/connectors/metamask";
import {CHAIN_IDS, getAddChainParameters} from "@/libs/web3/chains";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {
	EthTreasuryContract,
	RefThroneContract,
	TORTokenContract,
	UserContract,
	UserHistoryContract,
} from "@/libs/web3/contracts";
import Image from "next/image";
import {ConfirmDialog, Footer, Header, TConfirmDialogProps} from "@/components";
import {Button} from "@/components/common";

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
