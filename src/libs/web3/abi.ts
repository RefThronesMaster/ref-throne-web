import { AbiFragment, AbiOutput, ContractAbi } from "web3";

export const TORTokenContract = {
  ADDRESS: "0xF7a2a089fb174f7e3d283b8d314B099f299324b3",
  ABI: [
    {
      name: "balanceOf",
      inputs: [{ name: "address", type: "string" }],
      outputs: [{ name: "balanceOf", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      name: "totalSupply",
      inputs: [],
      outputs: [{ name: "totalSupply", type: "uint256" }],
      payable: false,
      type: "function",
    },
    {
      name: "_name",
      inputs: [],
      outputs: [{ name: "name", type: "string" }],
      payable: false,
      type: "function",
    },
    {
      name: "_symbol",
      inputs: [],
      outputs: [{ name: "symbol", type: "string" }],
      payable: false,
      type: "function",
    },
  ] as ContractAbi,

};
// const a: AbiOutput;

export const RefThroneContract = {
  ADDRESS: "0xD6c408780a0A87A62671B70C2ab3fbB2e463C4Ab",
  ABI: [
    {
      name: "getAllOwnedThrones",
      inputs: [],
      outputs: [
        {
          name: "getAllOwnedThrones",
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
            {
              name: "status",
              type: "uint8",
            },
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
      outputs: [{ name: "getServiceTypes", type: "string[]" }],
      payable: false,
      type: "function",
    },
    {
      name: "getBenefitTypes",
      inputs: [],
      outputs: [{ name: "getBenefitTypes", type: "string[]" }],
      payable: false,
      type: "function",
    },
  ] as ContractAbi,
};

export const EthTreasuryContract = {
  ADDRESS: "0x3A9bb1987B486c6C1518879683F84a8da5E73A36",
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
      name: "_totalTorBalance",
      inputs: [],
      outputs: [{ name: "totalTorBalance", type: "uint256" }],
      payable: false,
      type: "function",
    },
  ] as ContractAbi,
};
