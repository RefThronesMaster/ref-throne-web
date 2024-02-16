import { ContractAbi } from "web3";

export type TContract = {
  ADDRESS: string;
  ABI: ContractAbi;
};

export const TORTokenContract: TContract = {
  ADDRESS: "0xcc6E4AC4C748F4aD235e1a3Bde52Eec0C5C62A2F",
  ABI: [
    {
      inputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "symbol",
          type: "string",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
      ],
      name: "OwnableInvalidOwner",
      type: "error",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "OwnableUnauthorizedAccount",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [],
      name: "_name",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "_symbol",
      outputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
      ],
      name: "allowance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "approve",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "balanceOf",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transfer",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          internalType: "address",
          name: "recipient",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "transferFrom",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as ContractAbi,
};
// const a: AbiOutput;

export const RefThroneContract: TContract = {
  ADDRESS: "0x6D0dFC88dF5A12760E3Bd1F73c4c707E19799558",
  ABI: [
    {
      name: "requestDepositForThrone",
      inputs: [
        { name: "name", type: "string" },
        { name: "serviceType", type: "string" },
        { name: "benefitType", type: "string" },
        { name: "benefitAmount", type: "uint256" },
        { name: "referralCode", type: "string" },
        { name: "torAmount", type: "uint256" },
        { name: "linkUrl", type: "string" },
      ],
      outputs: [{ name: "throneId", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      name: "withdrawFromThrone",
      inputs: [{ name: "throneId", type: "uint256" }],
      outputs: [{ name: "success", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      name: "modifyThroneInReview",
      inputs: [
        { name: "throneId", type: "uint256" },
        { name: "name", type: "string" },
        { name: "serviceType", type: "string" },
        { name: "benefitType", type: "string" },
        { name: "linkUrl", type: "string" },
      ],
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      name: "approveThrone",
      inputs: [{ name: "throneId", type: "uint256" }],
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      name: "rejectThrone",
      inputs: [{ name: "throneId", type: "uint256" }],
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      name: "getAllOwnedThrones",
      inputs: [],
      outputs: [
        {
          name: "ownedThrones",
          type: "tuple[]",
          components: [
            { name: "id", type: "uint256" },
            { name: "name", type: "string" },
            { name: "serviceType", type: "string" },
            { name: "benefitType", type: "string" },
            { name: "benefitAmount", type: "uint256" },
            { name: "referrer", type: "address" },
            { name: "referralCode", type: "string" },
            { name: "torAmount", type: "uint256" },
            { name: "linkUrl", type: "string" },
            { name: "status", type: "uint8" },
            { name: "timestamp", type: "uint256" },
          ],
        },
      ],
      payable: false,
      type: "function",
    },
    {
      name: "getAllThronesInReview",
      inputs: [],
      outputs: [
        {
          name: "thronesInReview",
          type: "tuple[]",
          components: [
            { name: "id", type: "uint256" },
            { name: "name", type: "string" },
            { name: "serviceType", type: "string" },
            { name: "benefitType", type: "string" },
            { name: "benefitAmount", type: "uint256" },
            { name: "referrer", type: "address" },
            { name: "referralCode", type: "string" },
            { name: "torAmount", type: "uint256" },
            { name: "linkUrl", type: "string" },
            { name: "status", type: "uint8" },
            { name: "timestamp", type: "uint256" },
          ],
        },
      ],
      payable: false,
      type: "function",
    },
    {
      name: "getServiceTypes",
      inputs: [],
      outputs: [{ name: "serviceTypes", type: "string[]" }],
      payable: false,
      type: "function",
    },
    {
      name: "getBenefitTypes",
      inputs: [],
      outputs: [{ name: "benefitTypes", type: "string[]" }],
      payable: false,
      type: "function",
    },
    {
      name: "getThroneById",
      inputs: [{ name: "throneId", type: "uint256" }],
      outputs: [
        {
          name: "thrones",
          type: "tuple[]",
          components: [
            { name: "id", type: "uint256" },
            { name: "name", type: "string" },
            { name: "serviceType", type: "string" },
            { name: "benefitType", type: "string" },
            { name: "benefitAmount", type: "uint256" },
            { name: "referrer", type: "address" },
            { name: "referralCode", type: "string" },
            { name: "torAmount", type: "uint256" },
            { name: "linkUrl", type: "string" },
            { name: "status", type: "uint8" },
            { name: "timestamp", type: "uint256" },
          ],
        },
      ],
      payable: false,
      type: "function",
    },
    {
      name: "getThroneByAddress",
      inputs: [{ name: "address_", type: "address" }],
      outputs: [
        {
          name: "thrones",
          type: "tuple[]",
          components: [
            { name: "id", type: "uint256" },
            { name: "name", type: "string" },
            { name: "serviceType", type: "string" },
            { name: "benefitType", type: "string" },
            { name: "benefitAmount", type: "uint256" },
            { name: "referrer", type: "address" },
            { name: "referralCode", type: "string" },
            { name: "torAmount", type: "uint256" },
            { name: "linkUrl", type: "string" },
            { name: "status", type: "uint8" },
            { name: "timestamp", type: "uint256" },
          ],
        },
      ],
      payable: false,
      type: "function",
    },
    {
      name: "getTorDepositedByAddress",
      inputs: [{ name: "address_", type: "address" }],
      outputs: [{ name: "torAmount", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      name: "getTotalTorDeposited",
      inputs: [],
      outputs: [{ name: "torAmount", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      name: "addServiceType",
      inputs: [{ name: "serviceType", type: "string" }],
      outputs: [],
      payable: false,
      type: "function",
    },
    {
      name: "addBenefitType",
      inputs: [{ name: "benefitType", type: "string" }],
      outputs: [],
      payable: false,
      type: "function",
    },
  ] as ContractAbi,
};

export const EthTreasuryContract: TContract = {
  ADDRESS: "0x7f53Ea7151043E5596D437C4E116416398EEF7Ee",
  ABI: [
    {
      name: "_depositFeeRate",
      inputs: [],
      outputs: [{ name: "depositFeeRate", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      name: "_withdrawFeeRate",
      inputs: [],
      outputs: [{ name: "withdrawFeeRate", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      name: "_totalEthBalance",
      inputs: [],
      outputs: [{ name: "totalEthBalance", type: "uint256" }],
      payable: false,
      type: "function",
    },

    {
      name: "getTorTokenBalance",
      inputs: [{ name: "account", type: "address" }],
      outputs: [{ name: "getTorTokenBalance", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      name: "getContractEthBalance",
      inputs: [],
      outputs: [{ name: "getContractEthBalance", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      name: "_totalTorBalance",
      inputs: [],
      outputs: [{ name: "totalTorBalance", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "tokenAmount",
          type: "uint256",
        },
      ],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ] as ContractAbi,
};

export const UserHistoryContract: TContract = {
  ADDRESS: "0x6d7a265813ECc0af098C45A42e7D826a784b1312",
  ABI: [
    {
      name: "checkDuplicateCheckIn",
      inputs: [{ name: "account", type: "address" }],
      outputs: [{ name: "checkDuplicateCheckIn", type: "bool" }],
      payable: false,
      type: "function",
    },
    {
      name: "doDailyCheckIn",
      inputs: [],
      outputs: [],
      payable: false,
      type: "function",
    },
  ] as ContractAbi,
};
