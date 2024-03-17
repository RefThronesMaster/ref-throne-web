"use client";

import Image from "next/image";
import {AttendIcon, Button, ProgressCircleIcon} from "@/components/common";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

import {useWeb3React} from "@web3-react/core";
import {hooks} from "@/libs/web3/connectors/metamask";
import {CHAIN_IDS, getAddChainParameters} from "@/libs/web3/chains";
import {MyAccountContext} from "@/app/MyAccountProvider";
import {MyDialogContext} from "@/app/MyDialogProvider";

const MENU = {
	"/referrals": "Referral Thrones",
	"/swap": "TOR Swap",
	"/leaderboard": "Leaderboard",
	"/dashboard": "My Dashboard",
	"/guides": "Guides",
	"/torg": "TORG Token",
};
const {useChainId} = hooks;

type TAttendButton = {
	signedIn?: boolean;
};

export const AttendButton = ({signedIn = false}: TAttendButton) => {
	const {open, close} = React.useContext(MyDialogContext);

	const {account, contracts} = React.useContext(MyAccountContext);
	const [transacting, setTransacting] = React.useState<boolean>(false);

	const handleDailyCheck = React.useCallback(async () => {
		if (account) {
			try {
				setTransacting(true);
				const already = await contracts.UserHistory?.methods
					.checkDuplicateCheckIn(account)
					.call<boolean>();

				if (!already) {
					await contracts.UserHistory?.methods
						.doDailyCheckIn()
						.send({from: account});

					open({
						title: "Daily Check",
						children: <center>Welcome to visit again today.</center>,
					});
				} else {
					open({
						title: "Daily Check",
						children: <center>You have already visited.</center>,
					});
				}
			} catch (err) {
			} finally {
				setTransacting(false);
			}
		}
	}, [account, contracts.UserHistory]);

	return (
		<Button
			className="lg:ml-8 text-center w-[36px] h-[36px]"
			disabled={!signedIn}
			onClick={handleDailyCheck}
		>
			{transacting && (
				<ProgressCircleIcon className="animate-spin" color="stroke-primary" />
			)}
			{!transacting && (
				<AttendIcon
					className={
						"w-[32px] h-[32px]" +
						(signedIn ? " fill-primary" : " fill-secondary")
					}
				/>
			)}
		</Button>
	);
};

export const Header = () => {
	const pathname = usePathname();
	const {connector} = useWeb3React();
	const chainId = useChainId();
	const {account, getBalance, contracts} = React.useContext(MyAccountContext);

	const signedIn = React.useMemo(() => {
		return Boolean(CHAIN_IDS.BLAST_SEPOLIA == chainId && account);
	}, [account, chainId]);

	React.useEffect(() => {
		if (account) {
			getBalance().then((balance) => {
				balance && console.log(balance);
			});
		}
	}, [account, getBalance]);

	const handleConnect = React.useCallback(async () => {
		if (!window.ethereum?.isMetaMask) {
			window.open("https://metamask.io/", "_blank");
			return;
		} else {
			if (CHAIN_IDS.BLAST_SEPOLIA == chainId) {
				if (connector?.deactivate) {
					await connector.deactivate();
				} else {
					await connector.resetState();
				}
				connector?.connectEagerly;
			} else {
				await connector.activate(
					getAddChainParameters(CHAIN_IDS.BLAST_SEPOLIA)
				);
			}
		}
	}, [connector, chainId]);

	return (
		<nav className="flex flex-wrap items-center justify-between">
			<Link href={"/"}>
				<Image
					alt="header_logo"
					src="/assets/images/tor_logo.png"
					width={200}
					height={72}
					style={{
						objectFit: "cover",
					}}
					priority={true}
				/>
			</Link>
			<div className="flex lg:inline-flex items-center justify-between w-full lg:w-fit">
				<div className="lg:inline-block">
					{Object.entries(MENU).map((item) => {
						const [url, title] = item;
						if (url == "/guides") {
							return (
								<Link
									key={url}
									href={"https://docs.refthrones.click/"}
									target="_blank"
								>
									<Button
										color="text"
										className={
											"text-base py-2 lg:py-1 px-6 lg:px-4" +
											(pathname.includes(url) || pathname == url
												? " text-primary"
												: "")
										}
										disabled={!signedIn}
									>
										{title}
									</Button>
								</Link>
							);
						} else if (url == "/torg") {
							return (
								<Link
									key={url}
									href={
										"https://docs.refthrones.click/7.-governance-token-tentatively-torg"
									}
									target="_blank"
								>
									<Button
										color="text"
										className={
											"text-base py-2 lg:py-1 px-6 lg:px-4" +
											(pathname.includes(url) || pathname == url
												? " text-primary"
												: "")
										}
										disabled={!signedIn}
									>
										{title}
									</Button>
								</Link>
							);
						}
						return (
							<Link key={url} href={url}>
								<Button
									color="text"
									className={
										"text-base py-2 lg:py-1 px-6 lg:px-4" +
										(pathname.includes(url) || pathname == url
											? " text-primary"
											: "")
									}
									disabled={!signedIn}
								>
									{title}
								</Button>
							</Link>
						);
					})}
				</div>

				<AttendButton signedIn={signedIn} />
				<Button
					className={
						"lg:ml-4 bg-yellow-300 rounded-sm text-black active:bg-amber-400 w-[180px] h-[36px] text-sm font-bold"
					}
					onClick={handleConnect}
				>
					{signedIn
						? `${account?.substring(0, 8)}...${account?.substring(
								account?.length - 4
						  )}`
						: "Connect Wallet"}
				</Button>
			</div>
		</nav>
	);
};
