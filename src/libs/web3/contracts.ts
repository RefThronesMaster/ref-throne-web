import { ContractAbi } from "web3";
import {
  EthTreasuryABI,
  OwnerGroupABI,
  RefThroneABI,
  RefThroneTypesABI,
  TorTokenABI,
  UserABI,
  UserHistoryABI,
} from "./abi";

export type TContract = {
  ADDRESS: string;
  ABI: ContractAbi;
};

export const TORTokenContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_TOR_TOKEN_CONTRACT_ADDRESS,
  ABI: TorTokenABI,
};

export const OwnerGroupContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_OWNER_GROUP_CONTRACT_ADDRESS,
  ABI: OwnerGroupABI,
};

export const RefThroneContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_REF_THRONE_CONTRACT_ADDRESS,
  ABI: RefThroneABI,
};

export const RefThroneTypesContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_REF_THRONE_TYPES_CONTRACT_ADDRESS,
  ABI: RefThroneTypesABI,
};

export const EthTreasuryContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_ETH_TREASURY_CONTRACT_ADDRESS,
  ABI: EthTreasuryABI,
};

export const UserHistoryContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_USER_HISTORY_CONTRACT_ADDRESS,
  ABI: UserHistoryABI,
};

export const UserContract: TContract = {
  ADDRESS: process.env.NEXT_PUBLIC_USER_CONTRACT_ADDRESS,
  ABI: UserABI,
};
