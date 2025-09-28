import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// UI Utilities
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Formatting Utilities
export function formatPrice(amount: number, currency: string = "ARS"): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("es-AR").format(num);
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}

// Product Utilities
export function generateStars(rating: number): string {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    "★".repeat(fullStars) + (hasHalfStar ? "☆" : "") + "☆".repeat(emptyStars)
  );
}

export function calculateInstallments(
  price: number,
  installments: number = 12,
): number {
  return price / installments;
}

export function calculateDiscount(
  originalPrice: number,
  currentPrice: number,
): number {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

// Validation Utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
