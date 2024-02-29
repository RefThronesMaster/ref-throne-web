import { ContractAbi } from "web3";
import {
  EthTreasuryABI,
  RefThroneABI,
  TorTokenABI,
  UserABI,
  UserHistoryABI,
} from "./json";

export type TContract = {
  ADDRESS: string;
  ABI: ContractAbi;
};

export const TORTokenContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_TOR_TOKEN_CONTRACT_ADDRESS,
  ABI: TorTokenABI as ContractAbi,
};

export const RefThroneContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_REF_THRONE_CONTRACT_ADDRESS,
  ABI: RefThroneABI as ContractAbi,
};

export const EthTreasuryContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_ETH_TREASURY_CONTRACT_ADDRESS,
  ABI: EthTreasuryABI as ContractAbi,
};

export const UserHistoryContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_USER_HISTORY_CONTRACT_ADDRESS,
  ABI: UserHistoryABI as ContractAbi,
};

export const UserContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_USER_CONTRACT_ADDRESS,
  ABI: UserABI as ContractAbi,
};
