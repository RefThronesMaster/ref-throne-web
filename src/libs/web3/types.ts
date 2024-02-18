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