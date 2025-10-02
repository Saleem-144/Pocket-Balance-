import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return `PKR ${amount.toLocaleString()}`;
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case 'incoming':
      return 'text-green-600 bg-green-50';
    case 'payments':
      return 'text-red-600 bg-red-50';
    case 'personal':
      return 'text-blue-600 bg-blue-50';
    case 'savings':
      return 'text-purple-600 bg-purple-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
}

export function getCategoryIcon(category: string): string {
  switch (category) {
    case 'incoming':
      return '💰';
    case 'payments':
      return '💳';
    case 'personal':
      return '🛍️';
    case 'savings':
      return '🏦';
    default:
      return '📊';
  }
}
