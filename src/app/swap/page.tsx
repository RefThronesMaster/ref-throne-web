"use client";

import Image from "next/image";
import { MyAccountContext } from "@/app/MyAccountProvider";
import React, { ChangeEvent } from "react";
import { Button, Input } from "@/common/components";
import { Decimal } from "decimal.js";
import { EthTreasuryContract } from "@/libs/web3/abi";
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
  const [value, setValue] = React.useState<number>(0);
  const { account, getBalance, web3 } = React.useContext(MyAccountContext);
  const [message, setMessage] = React.useState<string>("");
  const [depositFeeRate, setDepositFeeRate] = React.useState<number>(1);

  React.useEffect(() => {
    if (web3) {
      const contract = new web3.eth.Contract(
        EthTreasuryContract.ABI,
        EthTreasuryContract.ADDRESS
      );

      contract.methods
        ._depositFeeRate()
        .call<number>()
        .then((rate) => {
          setDepositFeeRate(Number(rate));
        })
        .catch((err) => console.error(err));
    }
  }, [web3]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const parsedValue = parseFloat(value);
      setValue(parsedValue >= 0 ? parsedValue : 0);
      setMessage("");
    },
    []
  );

  const handleTransaction = React.useCallback(async () => {
    if (web3) {
      try {
        const balance = await getBalance();
        if (balance) {
          const deposit = Number(web3.utils.toWei(value, "ether"));
          if (deposit > balance) {
            setMessage("not enough your balance");
          } else {
            console.log("start contract");
          }
        }
      } catch (err) {}
    }
  }, [value, getBalance, web3]);

  const depositFeeWei = React.useMemo(() => {
    if (web3) {
      return (Number(web3.utils.toWei(value, "ether")) * depositFeeRate) / 100;
    }

    return Math.floor(value * Number("10000000000000000") * depositFeeRate);
  }, [value, depositFeeRate, web3]);

  const depositFeeEth = React.useMemo(() => {
    if (web3) {
      return Number(web3.utils.fromWei(depositFeeWei, "ether"));
    }
    return depositFeeWei / Number("1000000000000000000");
  }, [depositFeeWei, web3]);

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
              step={0.01}
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
                {new Decimal(value * 5000).toString()}
              </span>
            </div>

            <div className="mt-3 w-full flex justify-between items-center ">
              <span className="text-sm">Exchange Rate</span>
              <span className="text-sm">1 ETH = 5,000 TOR</span>
            </div>
            <div className="mt-1 w-full flex justify-between items-center">
              <span className="text-sm">Deposit Fee ({depositFeeRate}%)</span>
              <span className="text-sm">{depositFeeEth.toString()} ETH</span>
              {/* <span className="text-sm">
                {new Decimal(value * 0.01).toString()} ETH
              </span> */}
            </div>
            <Button
              className="mt-5 mb-2 py-1 w-full chakra-petch-bold rounded-md bg-yellow-100 active:bg-amber-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-200 text-black"
              disabled={value <= 0}
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

const Withdraw = () => {
  const [value, setValue] = React.useState<number>(0);
  const { account, getBalance, web3 } = React.useContext(MyAccountContext);
  const [message, setMessage] = React.useState<string>("");
  const [withdrawFeeRate, setWithdrawFeeRate] = React.useState<number>(2);

  React.useEffect(() => {
    if (web3) {
      const contract = new web3.eth.Contract(
        EthTreasuryContract.ABI,
        EthTreasuryContract.ADDRESS
      );

      contract.methods
        ._withdrawFeeRate()
        .call<number>()
        .then((rate) => {
          setWithdrawFeeRate(Number(rate));
        })
        .catch((err) => console.error(err));
    }
  }, [web3]);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const parsedValue = parseFloat(value);

      setValue(parsedValue >= 0 ? parsedValue : 0);
      setMessage("");
    },
    []
  );

  const withdrawFee = React.useMemo(() => {
    if (web3) {
      const wei = web3.utils.toWei(value, "ether");
      console.log(wei);
    }
    // console.log(value);

    return 0;
  }, [value, withdrawFeeRate, web3]);

  const handleTransaction = React.useCallback(() => {
    console.log(value);
  }, [value]);

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
              step={0.01}
              placeholder="0.00"
              value={value}
              onChange={handleChange}
            />
          </label>
        </div>
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
                {new Decimal((value * 2) / 1000000).toString()}
              </span>
            </div>

            <div className="mt-3 w-full flex justify-between items-center ">
              <span className="text-sm">Exchange Rate</span>
              <span className="text-sm">5,000 TOR = 1 ETH</span>
            </div>
            <div className="mt-1 w-full flex justify-between items-center">
              <span className="text-sm">Withdraw Fee ({withdrawFeeRate}%)</span>
              <span className="text-sm">
                {new Decimal((value * 2) / 10000).toString()} ETH
              </span>
            </div>
            <Button
              className="mt-5 mb-2 py-1 w-full chakra-petch-bold rounded-md bg-yellow-100 active:bg-amber-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-200 text-black"
              disabled={value <= 0}
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
