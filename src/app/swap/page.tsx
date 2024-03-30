"use client";

import Image from "next/image";
import { MyAccountContext } from "@/app/MyAccountProvider";
import React, { ChangeEvent } from "react";
import { Button, Input, ProgressCircleIcon } from "@/components/common";
import { EthTreasuryContract } from "@/libs/web3/contracts";
import { RpcError } from "web3";
import { ethToTor } from "@/libs/web3/utils";

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

const Deposit = React.memo(function FnDeposit() {
  const [value, setValue] = React.useState<string>("0.0000");
  const { account, getBalance, web3, contracts, utils } =
    React.useContext(MyAccountContext);
  const [message, setMessage] = React.useState<string>("");
  const [depositFeeRate, setDepositFeeRate] = React.useState<number>(1);
  const [transacting, setTransacting] = React.useState<boolean>(false);
  const [ethBalance, setEthBalance] = React.useState<number>(-1);

  const getDepositFeeRate = React.useCallback(() => {
    contracts.EthTreasury?.methods
      ._depositFeeRate()
      .call<number>()
      .then((rate) => {
        setDepositFeeRate(Number(rate));
      })
      .catch((err) => console.error(err));
  }, [contracts.EthTreasury]);

  const getMyEthBalance = React.useCallback(async () => {
    try {
      const balance = await getBalance();
      if (balance) {
        setEthBalance(Number(utils?.fromWei(balance)) || -1);
      } else {
        setEthBalance(-1);
      }
    } catch (err) {
      console.log(err);
    }
  }, [getBalance, utils?.fromWei]);

  React.useEffect(() => {
    getDepositFeeRate();
  }, [getDepositFeeRate]);

  React.useEffect(() => {
    getMyEthBalance();
  }, [getMyEthBalance]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let { value: newValue } = event.target;

      setMessage("");
      if (newValue == "") {
        newValue = "0.0000";
      }
      const floatVal = parseFloat(newValue);

      if (!Number.isNaN(floatVal) && floatVal >= 0) {
        setValue(newValue);
        if (floatVal > ethBalance) {
          setMessage("must be less than you own");
        }
      }
    },
    [ethBalance]
  );

  const transact = React.useCallback(
    async (total: string) => {
      if (account && web3) {
        try {
          console.log("start contract");
          setTransacting(true);

          const gasPrice = await web3.eth.getGasPrice();

          await web3.eth.sendTransaction({
            to: EthTreasuryContract.ADDRESS,
            from: account,
            value: total,
            gasPrice: gasPrice,
            gasLimit: 2000000,
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
      const floatVal = parseFloat(value);
      const tor = ethToTor(floatVal);
      const stringVal = floatVal.toString();
      return tor
        .toFixed(stringVal.length > 3 ? stringVal.length - 3 : stringVal.length)
        .replace(/\.?0+$/, "");
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
        setEthBalance(Number(utils.fromWei(balance.toString())) || 0);
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
        <div className="flex justify-end px-2 text-sm text-camo-300">
          Available:{" "}
          {ethBalance >= 0
            ? Intl.NumberFormat("en-US", {
                minimumFractionDigits: 4,
                maximumFractionDigits: 18,
              }).format(ethBalance)
            : "-"}{" "}
          ETH
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
              className="mt-5 mb-2 py-1 w-full chakra-petch-bold rounded-md bg-yellow-100 active:bg-amber-200 disabled:cursor-not-allowed text-black disabled:bg-camo-300 disabled:text-gray-500"
              disabled={
                parseFloat(value) <= 0 ||
                parseFloat(value) > ethBalance ||
                transacting
              }
              onClick={handleTransaction}
            >
              {transacting && (
                <ProgressCircleIcon
                  className="animate-spin inline-block mr-2"
                  color="text-yellow-100"
                  bgColor="text-gray-300"
                />
              )}
              <span>{transacting ? "Transacting" : "Send transaction"}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});

const Withdraw = React.memo(function FnWithdraw() {
  const [value, setValue] = React.useState<string>("0.0000");
  const { account, getBalance, web3, contracts, utils } =
    React.useContext(MyAccountContext);
  const [message, setMessage] = React.useState<string>("");
  const [withdrawFeeRate, setWithdrawFeeRate] = React.useState<number>(2);
  const [transacting, setTransacting] = React.useState<boolean>(false);
  const [targetEth, setTargetEth] = React.useState<number>(0);
  const [targetFeeEth, setTargetFeeEth] = React.useState<number>(0);

  const [torBalance, setTorBalance] = React.useState<number>(-1);

  const getMyTorBalance = React.useCallback(() => {
    contracts.TORToken?.methods
      .balanceOf(account)
      .call<BigInt>()
      .then((result) => {
        if (result) {
          setTorBalance(Number(utils?.fromWei(result.toString()) || -1));
        }
      })
      .catch((err) => {
        console.log(err?.data);
        setTorBalance(-1);
      });
  }, [contracts.EthTreasury, utils?.fromWei]);

  const getWithdrawFeeRate = React.useCallback(() => {
    contracts.EthTreasury?.methods
      ._withdrawFeeRate()
      .call<number>()
      .then((rate) => {
        setWithdrawFeeRate(Number(rate));
      })
      .catch((err) => console.error(err));
  }, [contracts.EthTreasury]);

  React.useEffect(() => {
    getWithdrawFeeRate();
  }, [getWithdrawFeeRate]);

  React.useEffect(() => {
    getMyTorBalance();
  }, [getMyTorBalance]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      let { value: newValue } = event.target;

      setMessage("");
      if (newValue == "") {
        newValue = "0.0000";
      }

      const floatVal = parseFloat(newValue);

      if (!Number.isNaN(floatVal) && floatVal >= 0) {
        setValue(newValue);

        const ethWei =
          (BigInt(utils.toWei(newValue)) / BigInt(10000)) * BigInt(2);
        const feeWei = (ethWei / BigInt(100)) * BigInt(withdrawFeeRate);
        setTargetFeeEth(Number(utils.fromWei(feeWei.toString())) || -1);
        setTargetEth(Number(utils.fromWei(ethWei.toString())) || -1);

        if (floatVal > torBalance) {
          setMessage("must be less than you own");
        }
      }
    },
    [utils?.toWei, utils?.fromWei, torBalance, withdrawFeeRate]
  );

  const transact = React.useCallback(
    async (total: string) => {
      if (account) {
        try {
          console.log("start contract");
          setMessage("");
          setTransacting(true);

          const allowance = await contracts.TORToken?.methods
            .allowance(account, EthTreasuryContract.ADDRESS)
            .call<bigint>();

          if (!allowance || allowance < BigInt(total)) {
            console.log("need approve");
            await contracts.TORToken?.methods
              .approve(
                EthTreasuryContract.ADDRESS,
                BigInt("1267650600228229401496703205376")
              )
              .send({ from: account });
            console.log("approved");
          }

          const result = await contracts.EthTreasury?.methods
            .withdraw(total)
            .send({
              from: account,
            });

          setValue("0");

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

  const handleTransaction = React.useCallback(async () => {
    try {
      const torWei = BigInt(utils.toWei(value));
      await transact(torWei.toString());
    } catch (err) {}
  }, [utils?.toWei, value, transact]);

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
          Available:{" "}
          {torBalance >= 0
            ? Intl.NumberFormat("en-US", {
                minimumFractionDigits: 4,
                maximumFractionDigits: 18,
              }).format(torBalance)
            : "-"}{" "}
          TOR
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
                {targetEth >= 0
                  ? Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 18,
                    }).format(targetEth)
                  : "-"}
              </span>
            </div>

            <div className="mt-3 w-full flex justify-between items-center ">
              <span className="text-sm">Exchange Rate</span>
              <span className="text-sm">5,000 TOR = 1 ETH</span>
            </div>
            <div className="mt-1 w-full flex justify-between items-center">
              <span className="text-sm">Withdraw Fee ({withdrawFeeRate}%)</span>
              <span className="text-sm">
                {targetFeeEth >= 0
                  ? Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 4,
                      maximumFractionDigits: 18,
                    }).format(targetFeeEth)
                  : "-"}{" "}
                ETH
              </span>
            </div>
            <Button
              className="mt-5 mb-2 py-1 w-full chakra-petch-bold rounded-md bg-yellow-100 active:bg-amber-200 disabled:cursor-not-allowed text-black disabled:bg-camo-300 disabled:text-gray-500"
              disabled={
                parseFloat(value) <= 0 ||
                parseFloat(value) > torBalance ||
                transacting
              }
              onClick={handleTransaction}
            >
              {transacting && (
                <ProgressCircleIcon
                  className="animate-spin inline-block mr-2"
                  color="text-yellow-100"
                  bgColor="text-gray-300"
                />
              )}
              <span>{transacting ? "Transacting" : "Send transaction"}</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
});
