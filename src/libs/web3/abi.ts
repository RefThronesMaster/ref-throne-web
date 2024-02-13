import { AbiFragment, AbiOutput } from "web3";

export const TORTokenContract = {
  ADDRESS: "0xF7a2a089fb174f7e3d283b8d314B099f299324b3",
  ABI: [
    {
      name: "balanceOf",
      inputs: [{ name: "address", type: "string" }],
      outputs: { type: "uint256" },
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      name: "totalSupply",
      inputs: [],
      outputs: [{ type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      name: "_name",
      inputs: [],
      outputs: [{ type: "string" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      name: "_symbol",
      inputs: [],
      outputs: [{ type: "string" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
// const a: AbiOutput;

export const RefThroneContract = {
  ADDRESS: "0xD6c408780a0A87A62671B70C2ab3fbB2e463C4Ab",
  ABI: [
    // {
    //   name: "Throne",
    //   outputs: [
    //     { name: "id", type: "uint256" },
    //     { name: "serviceType", type: "string" },
    //     { name: "benefitType", type: "string" },
    //     { name: "benefitAmount", type: "uint256" },
    //     { name: "referrer", type: "string" },
    //     { name: "referralCode", type: "string" },
    //     { name: "torAmount", type: "uint256" },
    //     { name: "linkUrl", type: "string" },
    //     { name: "status", type: "string" },
    //     { name: "timestamp", type: "uint256" },
    //   ],
    //   constant: true,
    //   payable: false,
    // },
    {
      name: "getAllOwnedThrones",
      inputs: [],
      outputs: [
        {
          name: "result",
          type: "tuple[]",
          components: [
            { name: "id", type: "uint256" },
            { name: "serviceType", type: "string" },
            { name: "benefitType", type: "string" },
            { name: "benefitAmount", type: "uint256" },
            { name: "referrer", type: "address" },
            // { name: "referralCode", type: "string" },
            { name: "torAmount", type: "uint256" },
            { name: "linkUrl", type: "string" },
            {
              name: "status",
              type: "enum",
            },
            { name: "timestamp", type: "uint256" },
          ],
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      name: "getServiceTypes",
      inputs: [],
      outputs: [{ name: "result", type: "string[]" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      name: "getBenefitTypes",
      inputs: [],
      outputs: [{ name: "result", type: "string[]" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};

export const EthTreasuryContract = {
  ADDRESS: "0x3A9bb1987B486c6C1518879683F84a8da5E73A36",
  ABI: [
    {
      name: "getEthBalance",
      inputs: [],
      outputs: [{ type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      name: "_totalEthBalance",
      inputs: [],
      outputs: [{ type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      name: "_totalTorBalance",
      inputs: [],
      outputs: [{ type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ],
};
