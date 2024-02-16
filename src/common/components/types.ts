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
