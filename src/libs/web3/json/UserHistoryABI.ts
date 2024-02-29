const UserHistoryABI = [
  {
    inputs: [],
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
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "checkDuplicateCheckIn",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "doDailyCheckIn",
    outputs: [],
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
    name: "getHistory",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "enum UserHistory.ActType",
            name: "act_type",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "tor_changes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tor_balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "count_invitee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activity_points",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deposit_points",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "total_points",
            type: "uint256",
          },
        ],
        internalType: "struct UserHistory.ActVals[]",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "page",
        type: "uint256",
      },
    ],
    name: "getHistory",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "enum UserHistory.ActType",
            name: "act_type",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "tor_changes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tor_balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "count_invitee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activity_points",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deposit_points",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "total_points",
            type: "uint256",
          },
        ],
        internalType: "struct UserHistory.ActVals[]",
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
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "page",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "count_per_page",
        type: "uint256",
      },
    ],
    name: "getHistory",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "enum UserHistory.ActType",
            name: "act_type",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "tor_changes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tor_balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "count_invitee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activity_points",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deposit_points",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "total_points",
            type: "uint256",
          },
        ],
        internalType: "struct UserHistory.ActVals[]",
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
        name: "account",
        type: "address",
      },
    ],
    name: "getHistoryLength",
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
        name: "account",
        type: "address",
      },
    ],
    name: "getLastHistory",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "enum UserHistory.ActType",
            name: "act_type",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "tor_changes",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tor_balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "count_invitee",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "activity_points",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "deposit_points",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "total_points",
            type: "uint256",
          },
        ],
        internalType: "struct UserHistory.ActVals",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getMyRank",
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
        name: "account",
        type: "address",
      },
    ],
    name: "getMyRank",
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
    name: "getRank",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "point",
            type: "uint256",
          },
        ],
        internalType: "struct UserHistory.RankVals[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getRewardRates",
    outputs: [
      {
        internalType: "uint16[8]",
        name: "",
        type: "uint16[8]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getWhiteListContract",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
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
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tor_changes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tor_balance",
        type: "uint256",
      },
    ],
    name: "setDepositActivity",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "setGenCodeActivity",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "setInviteeActivity",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "setInviterActivity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum UserHistory.ActType",
        name: "act_type",
        type: "uint8",
      },
      {
        internalType: "uint16",
        name: "rate_value",
        type: "uint16",
      },
    ],
    name: "setRewardRate",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "setThroneActivity",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "setUsurpActivity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "ref_contract",
        type: "address",
      },
    ],
    name: "setWhiteListContract",
    outputs: [],
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
      {
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tor_changes",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "tor_balance",
        type: "uint256",
      },
    ],
    name: "setWithdrawActivity",
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
];

export default UserHistoryABI;
