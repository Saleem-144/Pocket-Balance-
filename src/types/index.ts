export interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: TransactionCategory;
}

export type TransactionCategory = 'incoming' | 'payments' | 'personal' | 'savings';

export interface FinancialData {
  transactions: Transaction[];
  totalIncome: number;
  totalPayments: number;
  totalPersonal: number;
  totalSavings: number;
  remainingBalance: number;
}

export interface BudgetAdvice {
  advice: string;
  suggestions: string[];
  riskLevel: 'low' | 'medium' | 'high';
}
