"use client";

import Image from "next/image";
import { MyAccountContext } from "@/app/MyAccountProvider";
import React, { ChangeEvent } from "react";
import { Button, Input } from "@/common/components";
import { Decimal } from "decimal.js";
import {
  EthTreasuryContract,
  RefThroneContract,
  TORTokenContract,
} from "@/libs/web3/abi";
import { RpcError } from "web3";
import { ethToTor, torToEth } from "@/libs/web3/utils";
import { Truculenta } from "next/font/google";

type MODE = "deposit" | "withdraw";

export default function PageSwap() {
  const [mode, setMode] = React.useState<MODE>("deposit");

  return (
    <div className="mt-10 w-full flex justify-center items-center p-4">
      <div className="w-full md:max-w-[450px] rounded-md border border-white">
        <div className="px-4 py-4 flex justify-between divide-x">
          <Button
            className={
              "chakra-petch-bold text-lg w-1/2 " +
              (mode == "deposit" ? " text-primary" : " text-camo-500")
            }
            onClick={() => setMode("deposit")}
          >
            Deposit
          </Button>
          <Button
            className={
              "chakra-petch-bold text-lg w-1/2" +
              (mode == "withdraw" ? " text-primary" : " text-camo-500")
            }
            onClick={() => setMode("withdraw")}
          >
            Withdraw
          </Button>
        </div>
        {mode == "deposit" && <Deposit />}
        {mode == "withdraw" && <Withdraw />}
      </div>
    </div>
  );
}

const Deposit = () => {
  const [value, setValue] = React.useState<string>("0.0000");
  const { account, getBalance, web3, contracts, utils } =
    React.useContext(MyAccountContext);
  const [message, setMessage] = React.useState<string>("");
  const [depositFeeRate, setDepositFeeRate] = React.useState<number>(1);
  const [transacting, setTransacting] = React.useState<boolean>(false);

  React.useEffect(() => {
    contracts.EthTreasury?.methods
      ._depositFeeRate()
      .call<number>()
      .then((rate) => {
        setDepositFeeRate(Number(rate));
      })
      .catch((err) => console.error(err));
  }, [contracts.EthTreasury]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setMessage("");
      if (parseFloat(value) < 0) {
        setValue("0.0000");
      } else {
        setValue(value);
      }
    },
    []
  );

  const transact = React.useCallback(
    async (total: string) => {
      if (account && web3) {
        try {
          console.log("start contract");
          setTransacting(true);

          await web3.eth.sendTransaction({
            to: EthTreasuryContract.ADDRESS,
            from: account,
            value: total,
          });

          setValue("0.0000");
        } catch (err: any) {
          console.log("error transaction");
          if (err?.message?.includes("Internal JSON-RPC")) {
            setMessage(
              (err.data as RpcError).message.replace("execution reverted: ", "")
            );
          }
          console.log(err?.data);
        } finally {
          console.log("end transaction");
          setTransacting(false);
        }
      }
    },
    [web3, setMessage, account]
  );

  const receivedTor = React.useMemo(() => {
    try {
      const tor = ethToTor(parseFloat(value));
      return tor.toFixed(value.length - 3).replace(/\.?0+$/, "");
    } catch (err) {
      console.log(err);
    }
    return "-";
  }, [value]);

  const depositFeeWei = React.useMemo(() => {
    try {
      const feeWei =
        (BigInt(utils.toWei(value)) / BigInt(100)) * BigInt(depositFeeRate);

      return feeWei;
    } catch (err) {
      console.log(err);
    }
    return BigInt(0);
  }, [value, depositFeeRate, utils]);

  const depositFeeEth = React.useMemo(() => {
    try {
      return utils.fromWei(depositFeeWei.toString());
    } catch (err) {
      console.log(err);
    }
    return "-";
  }, [depositFeeWei, utils]);

  const handleTransaction = React.useCallback(async () => {
    try {
      const balance = await getBalance();
      if (balance) {
        const deposit = BigInt(utils.toWei(value));
        const total = deposit + depositFeeWei;

        if (total > BigInt(balance)) {
          setMessage("not enough your balance");
        } else {
          setMessage("");
          transact(total.toString());
        }
      }
    } catch (err) {}
  }, [value, getBalance, depositFeeWei, utils, transact]);

  return (
    <>
      <div className="p-4">
        <div className="py-2">
          <span className="py-2 px-4">You send</span>
          <label
            htmlFor="eth_val"
            className="flex items-center border border-primary rounded-lg py-2 px-3 mt-1"
          >
            <span>
              <Image
                src="/assets/images/icon_eth.png"
                alt="icon_eth"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
              />
            </span>
            <span className="px-2">ETH</span>
            <Input
              id="eth_val"
              className="w-full h-full py-1 text-right chakra-petch-regular text-white placeholder:text-camo-300 bg-transparent"
              type={"number"}
              step={0.0001}
              placeholder="0.00"
              value={value}
              onChange={handleChange}
            />
          </label>
        </div>
        {message && (
          <div className="flex justify-end px-2 text-red-400">
            <span>{message}</span>
          </div>
        )}
        <div className="mt-3 bg-camo-500 rounded-lg py-2">
          <span className="py-2 px-4">You receive</span>
          <div className="px-4">
            <div className="flex items-center border border-camo-700 bg-camo-700 rounded-lg py-2 px-3 mt-1">
              <span>
                <Image
                  src="/assets/images/icon_tor.png"
                  alt="icon_tor"
                  width={36}
                  height={36}
                  style={{ objectFit: "contain" }}
                />
              </span>
              <span className="px-2">TOR</span>
              <span
                id="tor_val"
                className="w-full h-full py-1 text-right chakra-petch-regular text-white placeholder:text-camo-300 bg-transparent"
              >
                {receivedTor}
              </span>
            </div>

            <div className="mt-3 w-full flex justify-between items-center ">
              <span className="text-sm">Exchange Rate</span>
              <span className="text-sm">1 ETH = 5,000 TOR</span>
            </div>
            <div className="mt-1 w-full flex justify-between items-center">
              <span className="text-sm">Deposit Fee ({depositFeeRate}%)</span>
              <span className="text-sm">{depositFeeEth} ETH</span>
              {/* <span className="text-sm">
                {(value * 0.01).toFixed(18).replace(/\.?0+$/, "")} ETH
              </span> */}
            </div>
            <Button
              className="mt-5 mb-2 py-1 w-full chakra-petch-bold rounded-md bg-yellow-100 active:bg-amber-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-200 text-black"
              disabled={parseFloat(value) <= 0 || transacting}
              onClick={handleTransaction}
            >
              {transacting ? "Transacting" : "Send transaction"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

const Withdraw = () => {
  const [value, setValue] = React.useState<string>("0");
  const { account, getBalance, web3, contracts, utils } =
    React.useContext(MyAccountContext);
  const [message, setMessage] = React.useState<string>("");
  const [withdrawFeeRate, setWithdrawFeeRate] = React.useState<number>(2);
  const [transacting, setTransacting] = React.useState<boolean>(false);
  const [torBalanceWei, setTorBalanceWei] = React.useState<string>("");

  const getMyTorBalance = React.useCallback(async () => {
    try {
      const result = await contracts.EthTreasury?.methods
        ._totalTorBalance()
        .call();
      return result?.toString() ?? "";
    } catch (err: any) {
      console.log(err?.data);
      return "";
    }
  }, [contracts.EthTreasury]);

  React.useEffect(() => {
    contracts.EthTreasury?.methods
      ._withdrawFeeRate()
      .call<number>()
      .then((rate) => {
        setWithdrawFeeRate(Number(rate));
      })
      .catch((err) => console.error(err));
    getMyTorBalance().then((result) => {
      setTorBalanceWei(result);
    });
  }, [contracts.EthTreasury, getMyTorBalance]);

  const getAvailableBalance = React.useCallback(
    async (amount: string) => {
      if (account) {
        try {
          const allowance = await contracts.TORToken?.methods
            .allowance(account, TORTokenContract.ADDRESS)
            .call<bigint>();

          console.log({ allowance });
          // if (allowance && allowance.valueOf() > 0) {
          //   return true;
          // }
          await contracts.TORToken?.methods
            .approve(TORTokenContract.ADDRESS, amount)
            .send({ from: account });
          console.log("confirmed");
          return true;
        } catch (err: any) {
          if (err?.message?.includes("Internal JSON-RPC")) {
            setMessage(
              (err.data as RpcError).message.replace("execution reverted: ", "")
            );
          }
        }
      }
      return false;
    },
    [contracts.TORToken, account]
  );

  const torBalance = React.useMemo(() => {
    try {
      return utils.fromWei(torBalanceWei);
    } catch (err) {}
    return 0;
  }, [torBalanceWei, utils]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setMessage("");
      if (parseFloat(value) < 0) {
        setValue("0");
      } else {
        setValue(value);
      }
    },
    []
  );

  const transact = React.useCallback(
    async (total: string) => {
      if (account) {
        try {
          console.log("start contract");
          setMessage("");
          setTransacting(true);

          if (await getAvailableBalance(total)) {
            const result = await contracts.EthTreasury?.methods
              .withdraw(total)
              .call({
                from: account,
              });

            console.log({ result });
            setValue("0");
          }

          // .catch(() => {
          //   setMessage("not enough your balance");
          // });
        } catch (err: any) {
          console.log("error transaction");
          if (err?.message?.includes("Internal JSON-RPC")) {
            setMessage(
              (err.data as RpcError).message.replace("execution reverted: ", "")
            );
          }
          console.log(err);
        } finally {
          console.log("end transaction");
          setTransacting(false);
        }
      }
    },
    [contracts.EthTreasury, setMessage, account, utils]
  );

  const receivedEthWei = React.useMemo(() => {
    // 1ETH = 5000TOR
    return (BigInt(utils.toWei(value)) / BigInt(10000)) * BigInt(2);
  }, [value, utils]);

  const receivedEth = React.useMemo(() => {
    try {
      return utils.fromWei(receivedEthWei.toString()) || "-";
    } catch (err) {}
    return "-";
  }, [receivedEthWei, utils]);

  const withdrawFeeWei = React.useMemo(() => {
    const feeWei = (receivedEthWei / BigInt(100)) * BigInt(withdrawFeeRate);
    return feeWei;
  }, [receivedEthWei, withdrawFeeRate]);

  const withdrawFeeEth = React.useMemo(() => {
    return utils.fromWei(withdrawFeeWei.toString());
  }, [withdrawFeeWei, utils]);

  const withdrawTorWei = React.useMemo(() => {
    return BigInt(utils.toWei(value));
  }, [value, utils]);

  const withdrawTorFeeWei = React.useMemo(() => {
    return (withdrawTorWei / BigInt(100)) * BigInt(withdrawFeeRate);
  }, [withdrawTorWei, withdrawFeeRate]);

  const handleTransaction = React.useCallback(async () => {
    try {
      const total = withdrawTorWei + withdrawTorFeeWei;
      transact(total.toString());

      // if (total > BigInt(balance)) {
      //   setMessage("not enough your balance");
      // } else {
      // }
    } catch (err) {}
  }, [withdrawTorWei, withdrawTorFeeWei, transact]);

  return (
    <>
      <div className="p-4">
        <div className="py-2">
          <span className="py-2 px-4">You send</span>
          <label
            htmlFor="tor_val"
            className="flex items-center border border-primary rounded-lg py-2 px-3 mt-1"
          >
            <span>
              <Image
                src="/assets/images/icon_tor.png"
                alt="icon_tor"
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
              />
            </span>
            <span className="px-2">TOR</span>
            <Input
              id="tor_val"
              className="w-full h-full py-1 text-right chakra-petch-regular text-white placeholder:text-camo-300 bg-transparent"
              type={"number"}
              step={0.1}
              placeholder="0.00"
              value={value}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex justify-end px-2 text-sm text-camo-300">
          Available: {torBalance} TOR
        </div>
        {message && (
          <div className="flex justify-end px-2 text-red-400">
            <span>{message}</span>
          </div>
        )}
        <div className="mt-3 bg-camo-500 rounded-lg py-2">
          <span className="py-2 px-4">You receive</span>
          <div className="px-4">
            <div className="flex items-center border border-camo-700 bg-camo-700 rounded-lg py-2 px-3 mt-1">
              <span>
                <Image
                  src="/assets/images/icon_eth.png"
                  alt="icon_eth"
                  width={36}
                  height={36}
                  style={{ objectFit: "contain" }}
                />
              </span>
              <span className="px-2">ETH</span>
              <span
                id="eth_val"
                className="w-full h-full py-1 text-right chakra-petch-regular text-white placeholder:text-camo-300 bg-transparent"
              >
                {receivedEth}
              </span>
            </div>

            <div className="mt-3 w-full flex justify-between items-center ">
              <span className="text-sm">Exchange Rate</span>
              <span className="text-sm">5,000 TOR = 1 ETH</span>
            </div>
            <div className="mt-1 w-full flex justify-between items-center">
              <span className="text-sm">Withdraw Fee ({withdrawFeeRate}%)</span>
              <span className="text-sm">{withdrawFeeEth} ETH</span>
            </div>
            <Button
              className="mt-5 mb-2 py-1 w-full chakra-petch-bold rounded-md bg-yellow-100 active:bg-amber-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-200 text-black"
              disabled={parseFloat(value) <= 0 || transacting}
              onClick={handleTransaction}
            >
              Send transaction
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
