"use client";

import Image from "next/image";
import { AppContext } from "@/app/AppProvider";
import React, { ChangeEvent } from "react";
import { Button, Input } from "@/common/components";
import { Decimal } from "decimal.js";
type MODE = "deposit" | "withdraw";

export default function PageSwap() {
  const { accounts, reqAccounts, getPermissions } =
    React.useContext(AppContext);
  const [mode, setMode] = React.useState<MODE>("deposit");

  return (
    <div className="mt-10 w-full flex justify-center items-center p-4">
      <div className="w-full md:max-w-[450px] rounded-md border border-white">
        <div className="px-4 py-4 flex justify-between divide-x">
          <Button
            text="Deposit"
            className={
              "chakra-petch-bold text-lg w-1/2 " +
              (mode == "deposit" ? " text-primary" : " text-camo-500")
            }
            onClick={() => setMode("deposit")}
          />
          <Button
            text="Withdraw"
            className={
              "chakra-petch-bold text-lg w-1/2" +
              (mode == "withdraw" ? " text-primary" : " text-camo-500")
            }
            onClick={() => setMode("withdraw")}
          />
        </div>
        {mode == "deposit" && <Deposit />}
        {mode == "withdraw" && <Withdraw />}
      </div>
    </div>
  );
}

const Deposit = () => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const parsedValue = parseFloat(value);
      setValue(parsedValue >= 0 ? parsedValue : 0);
    },
    []
  );

  const handleTransaction = React.useCallback(() => {
    console.log(value);
  }, [value]);

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
              <span className="text-sm">Deposit Fee (1%)</span>
              <span className="text-sm">
                {new Decimal(value * 0.01).toString()} ETH
              </span>
            </div>
            <Button
              className="mt-5 mb-2 py-1 w-full chakra-petch-bold rounded-md bg-yellow-100 active:bg-amber-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-200 text-black"
              text="Send transaction"
              disabled={value <= 0}
              onClick={handleTransaction}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const Withdraw = () => {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = React.useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const parsedValue = parseFloat(value);

      setValue(parsedValue >= 0 ? parsedValue : 0);
    },
    []
  );

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
              <span className="text-sm">Deposit Fee (2%)</span>
              <span className="text-sm">
                {new Decimal((value * 2) / 10000).toString()} ETH
              </span>
            </div>
            <Button
              className="mt-5 mb-2 py-1 w-full chakra-petch-bold rounded-md bg-yellow-100 active:bg-amber-200 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-200 text-black"
              text="Send transaction"
              disabled={value <= 0}
              onClick={handleTransaction}
            />
          </div>
        </div>
      </div>
    </>
  );
};
