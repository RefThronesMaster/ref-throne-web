const RefThroneABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "torTokenContractAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "userHistoryContractAddress",
        type: "address",
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
        indexed: false,
        internalType: "uint256",
        name: "throneId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum RefThrone.Status",
        name: "status",
        type: "uint8",
      },
    ],
    name: "ThroneStatus",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "benefitType",
        type: "string",
      },
    ],
    name: "addBenefitType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "serviceType",
        type: "string",
      },
    ],
    name: "addServiceType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "throneId",
        type: "uint256",
      },
    ],
    name: "approveThrone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "throneId",
        type: "uint256",
      },
    ],
    name: "cancelThrone",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "claimAllGas",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllOwnedThrones",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "serviceType",
            type: "string",
          },
          {
            internalType: "string",
            name: "benefitType",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "benefitAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "referrer",
            type: "address",
          },
          {
            internalType: "string",
            name: "referralCode",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "torAmount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "linkUrl",
            type: "string",
          },
          {
            internalType: "enum RefThrone.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct RefThrone.Throne[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllThronesInReview",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "serviceType",
            type: "string",
          },
          {
            internalType: "string",
            name: "benefitType",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "benefitAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "referrer",
            type: "address",
          },
          {
            internalType: "string",
            name: "referralCode",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "torAmount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "linkUrl",
            type: "string",
          },
          {
            internalType: "enum RefThrone.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct RefThrone.Throne[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBenefitTypes",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBlastContractAddress",
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
    name: "getOwnedThroneCount",
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
    name: "getServiceTypes",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "throneId",
        type: "uint256",
      },
    ],
    name: "getThroneById",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "serviceType",
            type: "string",
          },
          {
            internalType: "string",
            name: "benefitType",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "benefitAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "referrer",
            type: "address",
          },
          {
            internalType: "string",
            name: "referralCode",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "torAmount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "linkUrl",
            type: "string",
          },
          {
            internalType: "enum RefThrone.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct RefThrone.Throne",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "address_",
        type: "address",
      },
    ],
    name: "getThronesByAddress",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "serviceType",
            type: "string",
          },
          {
            internalType: "string",
            name: "benefitType",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "benefitAmount",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "referrer",
            type: "address",
          },
          {
            internalType: "string",
            name: "referralCode",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "torAmount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "linkUrl",
            type: "string",
          },
          {
            internalType: "enum RefThrone.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
        ],
        internalType: "struct RefThrone.Throne[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "address_",
        type: "address",
      },
    ],
    name: "getTorDepositedByAddress",
    outputs: [
      {
        internalType: "uint256",
        name: "torAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTorTokenContractAddress",
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
    name: "getTotalTorDeposited",
    outputs: [
      {
        internalType: "uint256",
        name: "torAmount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserHistoryContractAddress",
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
    inputs: [
      {
        internalType: "uint256",
        name: "throneId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "serviceType",
        type: "string",
      },
      {
        internalType: "string",
        name: "benefitType",
        type: "string",
      },
      {
        internalType: "string",
        name: "linkUrl",
        type: "string",
      },
    ],
    name: "modifyThroneInReview",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "readGasParams",
    outputs: [
      {
        internalType: "uint256",
        name: "etherSeconds",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "etherBalance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastUpdated",
        type: "uint256",
      },
      {
        internalType: "enum GasMode",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "throneId",
        type: "uint256",
      },
    ],
    name: "rejectThrone",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "serviceType",
        type: "string",
      },
      {
        internalType: "string",
        name: "benefitType",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "benefitAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "referralCode",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "torAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "linkUrl",
        type: "string",
      },
    ],
    name: "requestDepositForThrone",
    outputs: [
      {
        internalType: "uint256",
        name: "throneId",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "blastContractAddress",
        type: "address",
      },
    ],
    name: "setBlastContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "torTokenContractAddress",
        type: "address",
      },
    ],
    name: "setTorTokenContractAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "userHistoryContractAddress",
        type: "address",
      },
    ],
    name: "setUserHistoryContractAddress",
    outputs: [],
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "throneId",
        type: "uint256",
      },
    ],
    name: "withdrawFromThrone",
    outputs: [
      {
        internalType: "bool",
        name: "success",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

export default RefThroneABI;
