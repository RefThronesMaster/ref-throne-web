export type Color = "primary" | "secondary" | "text";

export const ColorSet = {
  primary: "#fcfc03",
  secondary: "#404833",
} as const;

export type TService = {
  id: BigInt;
  benefitAmount: BigInt;
  benefitType: "USDT";
  linkUrl: string;
  name: string;
  referralCode: string;
  referrer: string;
  serviceType: "CEX" | "DEX";
  status: BigInt;
  torAmount: BigInt;
  timestamp: BigInt;
};

export type TBenefit = "Fee discount" |
  "USDT" |
  "USDC" |
  "BTC" |
  "ETH"

export type TBenefitLabel = {
  [key in TBenefit]: string
}

export const BENEFIT_LABEL: TBenefitLabel = {
  "Fee discount": "% Fee discount",
  "USDT": "USDT",
  "USDC": "USDC",
  "BTC": "BTC",
  "ETH": "ETH",
}