import { Transaction, FinancialData } from '@/types';

const STORAGE_KEY = 'pocket-balance-data';

export const storageUtils = {
  // Save transactions to localStorage
  saveTransactions: (transactions: Transaction[]): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    }
  },

  // Load transactions from localStorage
  loadTransactions: (): Transaction[] => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    }
    return [];
  },

  // Add a new transaction
  addTransaction: (transaction: Omit<Transaction, 'id'>): Transaction => {
    const transactions = storageUtils.loadTransactions();
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    transactions.push(newTransaction);
    storageUtils.saveTransactions(transactions);
    return newTransaction;
  },

  // Delete a transaction
  deleteTransaction: (id: string): void => {
    const transactions = storageUtils.loadTransactions();
    const filteredTransactions = transactions.filter(t => t.id !== id);
    storageUtils.saveTransactions(filteredTransactions);
  },

  // Calculate financial data
  calculateFinancialData: (transactions: Transaction[]): Omit<FinancialData, 'transactions'> => {
    const totalIncome = transactions
      .filter(t => t.category === 'incoming')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalPayments = transactions
      .filter(t => t.category === 'payments')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalPersonal = transactions
      .filter(t => t.category === 'personal')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalSavings = transactions
      .filter(t => t.category === 'savings')
      .reduce((sum, t) => sum + t.amount, 0);

    const remainingBalance = totalIncome - (totalPayments + totalPersonal + totalSavings);

    return {
      totalIncome,
      totalPayments,
      totalPersonal,
      totalSavings,
      remainingBalance,
    };
  },

  // Get all financial data
  getFinancialData: (): FinancialData => {
    const transactions = storageUtils.loadTransactions();
    const calculations = storageUtils.calculateFinancialData(transactions);
    
    return {
      transactions,
      ...calculations,
    };
  },
};
