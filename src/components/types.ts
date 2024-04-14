export type Color = "primary" | "secondary" | "text";

export const ColorSet = {
  primary: "#fcfc03",
  secondary: "#404833",
} as const;

export type TServiceType = "DEX" | "CEX" | "MISC";

export type TBenefitType =
  | "None"
  | "Fee discount"
  | "USDT"
  | "USDC"
  | "BTC"
  | "ETH"
  | "Fee Discount";

export enum ThroneStatus {
  InReview = 0,
  Owned = 1,
  Rejected = 2,
  Lost = 3,
}

export const LabelThroneStatus = ["InReview", "Owned", "Rejected", "Lost"];

export type TThrone = {
  id: BigInt;
  name: string;
  serviceType: TServiceType;
  benefitAmount: BigInt;
  benefitType: TBenefitType;
  torAmount: BigInt;
  linkUrl: string;
  referralCode: string;
  referrer: string;
  status: ThroneStatus;
  timestamp: BigInt;
};

export type TBenefitTypeLabel = {
  [key in TBenefitType]: string;
};

export const BENEFIT_TYPE_LABEL: TBenefitTypeLabel = {
  None: "None",
  "Fee discount": "% Fee discount",
  "Fee Discount": "% Fee discount",
  USDT: "USDT",
  USDC: "USDC",
  BTC: "BTC",
  ETH: "ETH",
};

export type TUserInfo = {
  nickName: string;
  telegramUrl: string;
  uTubeUrl: string;
  discordUrl: string;
  xUrl: string;
};

export enum ActType {
  DEPOSIT = 0,
  WITHDRAW = 1,
  INVITER = 2,
  INVITEE = 3,
  GEN_CODE = 4,
  DAILY = 5,
  THRONE = 6,
  USURP = 7,
}

export type TActVal = {
  timestamp: BigInt;
  act_type: ActType;
  tor_changes: BigInt;
  tor_balance: BigInt;
  activity_points: BigInt;
  deposit_points: BigInt;
  total_points: BigInt;
};

export const LabelActType = [
  "Deposit ETH",
  "Withdraw ETH",
  "Inviter",
  "Invitee",
  "Generate Code",
  "Daily Attend",
  "Throne",
  "Usurp",
];
// export const LabelActType = {
//   1: "Deposit ETH",
//   2: "Withdraw ETH",
//   3: "Inviter",
//   4: "Invitee",
//   5: "Generate Code",
//   6: "Daily Attend",
//   7: "Throne",
//   8: "Usurp",
// };

export type TRank = {
  //
  tier: string;
  rank: number;

  account: string;
  timestamp: BigInt;
  point: BigInt;
};
