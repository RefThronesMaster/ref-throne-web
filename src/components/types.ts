export type Color = "primary" | "secondary" | "text";

export const ColorSet = {
  primary: "#fcfc03",
  secondary: "#404833",
} as const;

export type TServiceType = "DEX" | "CEX" | "MISC"

export type TBenefitType = "Fee discount" |
  "USDT" |
  "USDC" |
  "BTC" |
  "ETH" |
  "Fee Discount"

export type TThrone = {
  id: BigInt;
  name: string;
  serviceType: TBenefitType;
  benefitAmount: BigInt;
  benefitType: TBenefitType;
  torAmount: BigInt;
  linkUrl: string;
  referralCode: string;
  referrer: string;
  status: BigInt;
  timestamp: BigInt;
};


export type TBenefitTypeLabel = {
  [key in TBenefitType]: string
}

export const BENEFIT_TYPE_LABEL: TBenefitTypeLabel = {
  "Fee discount": "% Fee discount",
  "Fee Discount": "% Fee discount",
  "USDT": "USDT",
  "USDC": "USDC",
  "BTC": "BTC",
  "ETH": "ETH",
}