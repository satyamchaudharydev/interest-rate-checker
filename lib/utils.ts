import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatChartData = (data: any) => {
  const chartData = Object.entries(data)
    .map(([rate, count]) => {
      return {
        rate: Number(rate),
        count: count,
      };
    })
    .sort((a, b) => a.rate - b.rate);
  return chartData;
};

export const calculateLoanAmount = (price: number) => {
  const precentage = 20;
  return price - (price * precentage) / 100;

}