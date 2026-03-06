import { v4 as uuidv4 } from "uuid";

export function generateReferralCode(): string {
  return uuidv4().split("-")[0].toUpperCase();
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export function formatPercentage(num: number): string {
  return num.toFixed(1) + "%";
}

export function calculateAgencyEarnings(
  monthlyRevenue: number,
  commissionRate: number = 20
): {
  creatorEarnings: number;
  agencyFee: number;
  onlyfansFee: number;
  totalPayout: number;
} {
  const onlyfansFee = monthlyRevenue * 0.2;
  const afterOnlyfans = monthlyRevenue - onlyfansFee;
  const agencyFee = afterOnlyfans * (commissionRate / 100);
  const creatorEarnings = afterOnlyfans - agencyFee;

  return {
    creatorEarnings,
    agencyFee,
    onlyfansFee,
    totalPayout: monthlyRevenue,
  };
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}
